import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import vm from 'node:vm';

const rootArgument=process.argv.indexOf('--root');
if(rootArgument!==-1)assert(process.argv[rootArgument+1],'--root requires a directory');
const root=rootArgument===-1?path.resolve(import.meta.dirname,'..'):path.resolve(process.argv[rootArgument+1]);
const origin='https://automikulski.pl';
const read=file=>fs.readFileSync(path.join(root,file),'utf8');
const text=html=>html.replace(/<[^>]*>/g,' ').replace(/&amp;/g,'&').replace(/&nbsp;/g,' ').replace(/\s+/g,' ').trim();
const attributes=tag=>Object.fromEntries([...tag.matchAll(/([^\s=<>/]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g)].map(m=>[m[1].toLowerCase(),m[2]??m[3]??m[4]]));
const tags=(html,name)=>[...html.matchAll(new RegExp('<'+name+'\\b[^>]*>','gi'))].map(m=>attributes(m[0]));
const singleMeta=(html,key,file)=>{
  const values=tags(html,'meta').filter(m=>(m.name??m.property)===key);
  assert.equal(values.length,1,`${file}: expected exactly one ${key} meta tag`);
  assert(values[0].content?.trim(),`${file}: empty ${key}`);
  return values[0].content;
};
const urls=[...read('sitemap.xml').matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);
assert.equal(new Set(urls).size,urls.length,'duplicate sitemap entries');
assert(urls.length>0,'empty sitemap');
const titles=new Set(),descriptions=new Set();
const documents=new Map();
for(const url of urls){
  const parsed=new URL(url);
  assert.equal(parsed.origin,origin,`foreign sitemap URL: ${url}`);
  assert(!parsed.search&&!parsed.hash,`sitemap URL contains query or fragment: ${url}`);
  const pathname=parsed.pathname;
  assert(pathname.endsWith('/'),`sitemap page must use its canonical trailing slash: ${url}`);
  const file=path.join(pathname.replace(/^\//,''),'index.html');
  const html=read(file);
  assert.equal((html.match(/<h1\b/g)||[]).length,1,`${file}: expected one H1`);
  const canonical=tags(html,'link').filter(l=>l.rel?.toLowerCase().split(/\s+/).includes('canonical'));
  assert.equal(canonical.length,1,`${file}: expected exactly one canonical link`);
  assert.equal(canonical[0].href,url,`${file}: canonical does not match sitemap URL`);
  const title=text(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]??'');
  assert(title,`${file}: empty title`);
  assert(!titles.has(title),`${file}: duplicate title`);titles.add(title);
  const description=singleMeta(html,'description',file);
  assert(!descriptions.has(description),`${file}: duplicate meta description`);descriptions.add(description);
  assert.equal(singleMeta(html,'og:url',file),url,`${file}: og:url does not match canonical`);
  assert(!/<meta name="robots" content="[^"]*noindex/.test(html),`${file}: unexpectedly noindex`);
  const ids=[...html.matchAll(/\sid="([^"]+)"/g)].map(m=>m[1]);
  assert.equal(new Set(ids).size,ids.length,`${file}: duplicate HTML ids`);
  const json=[...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m=>JSON.parse(m[1]));
  const entities=json.flatMap(j=>j['@graph']||[j]);
  for(const webpage of entities.filter(e=>e['@type']==='WebPage'))assert.equal(webpage.url,url,`${file}: WebPage.url does not match canonical`);
  const faqs=entities.filter(e=>e['@type']==='FAQPage').flatMap(e=>e.mainEntity);
  assert.equal(faqs.length,(html.match(/<details class="faq-item">/g)||[]).length,`${file}: visible FAQ count differs from JSON-LD`);
  for(const q of faqs){
    const visible=[...html.matchAll(/<details class="faq-item"><summary>([\s\S]*?)<\/summary><div class="faq-body">([\s\S]*?)<\/div><\/details>/g)].find(m=>text(m[1])===q.name);
    assert(visible,`${file}: FAQ question is not visible: ${q.name}`);
    assert.equal(text(visible[2]),q.acceptedAnswer.text,`${file}: FAQ answer mismatch`);
  }
  if(html.includes('data-page-type=')){
    assert(/<script src="\/assets\/site.js[^\"]*" defer><\/script>/.test(html),`${file}: missing shared script`);
    assert(html.includes('id="analytics-choice"'),`${file}: missing analytics choice`);
    assert(html.includes('tel:+48517936676'),`${file}: missing company phone`);
  }
  for(const a of tags(html,'a')){
    if(a.href?.startsWith(origin+'/'))assert.fail(`${file}: internal anchor must use a relative URL for safe previews: ${a.href}`);
  }
  documents.set(pathname,{html,ids:new Set(ids),destinations:new Set()});
}
for(const [pathname,doc] of documents){
  const refs=[...doc.html.matchAll(/<(?:a|link|script)\b[^>]*(?:href|src)="([^"]+)"/g)].map(m=>m[1]);
  for(const ref of refs){
    const target=new URL(ref,origin+pathname);
    if(target.origin!==origin)continue;
    const targetPath=target.pathname;
    const file=targetPath.endsWith('/')?path.join(targetPath.replace(/^\//,''),'index.html'):targetPath.replace(/^\//,'');
    assert(fs.existsSync(path.join(root,file)),`${pathname}: missing link target ${ref}`);
    if(documents.has(targetPath)){
      doc.destinations.add(targetPath);
      if(target.hash)assert(documents.get(targetPath).ids.has(decodeURIComponent(target.hash.slice(1))),`${pathname}: missing anchor ${ref}`);
    }
  }
}
const visited=new Set(),queue=['/'];
while(queue.length){const current=queue.shift();if(visited.has(current))continue;visited.add(current);for(const next of documents.get(current).destinations)if(!visited.has(next))queue.push(next);}
for(const p of documents.keys())assert(visited.has(p),`orphan page: ${p}`);
new vm.Script(read('assets/site.js'));
for(const file of ['gpt-zwykly.html','holmech/test.html','hybryda.html','index-astra.html','index-gemini.html','inxex2.html','old-index.html','test.html','test2.html','test3.html']){
  assert(tags(read(file),'meta').some(m=>m.name==='robots'&&m.content.split(',').map(v=>v.trim()).includes('noindex')),`${file}: old/test page lost noindex`);
}
console.log(`Validated ${documents.size} sitemap pages: actual canonical tags, unique titles/descriptions, Open Graph URLs, JSON-LD, internal links, anchors, FAQ parity, old-page noindex and homepage reachability.`);
