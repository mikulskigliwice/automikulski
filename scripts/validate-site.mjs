import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import vm from 'node:vm';

const root=path.resolve(import.meta.dirname,'..');
const origin='https://automikulski.pl';
const read=file=>fs.readFileSync(path.join(root,file),'utf8');
const text=html=>html.replace(/<[^>]*>/g,' ').replace(/&amp;/g,'&').replace(/&nbsp;/g,' ').replace(/\s+/g,' ').trim();
const urls=[...read('sitemap.xml').matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);
assert.equal(new Set(urls).size,urls.length,'duplicate sitemap entries');
const documents=new Map();
for(const url of urls){
  const pathname=new URL(url).pathname;
  const file=path.join(pathname.replace(/^\//,''),'index.html');
  const html=read(file);
  assert.equal((html.match(/<h1\b/g)||[]).length,1,`${file}: expected one H1`);
  assert(html.includes(`href="${url}"`),`${file}: missing canonical URL`);
  assert(!/<meta name="robots" content="[^"]*noindex/.test(html),`${file}: unexpectedly noindex`);
  const ids=[...html.matchAll(/\sid="([^"]+)"/g)].map(m=>m[1]);
  assert.equal(new Set(ids).size,ids.length,`${file}: duplicate HTML ids`);
  const json=[...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m=>JSON.parse(m[1]));
  const entities=json.flatMap(j=>j['@graph']||[j]);
  const faqs=entities.filter(e=>e['@type']==='FAQPage').flatMap(e=>e.mainEntity);
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
console.log(`Validated ${documents.size} sitemap pages: canonical URLs, internal links, anchors, visible FAQ data and reachability from the homepage.`);
