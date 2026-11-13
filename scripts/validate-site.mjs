import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {validateRealizations} from './render-realizations.mjs';

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
assert.equal(urls.length,20,'expected the 20 retained sitemap URLs');
const unoffered=/(?:\b24\s*(?:h\b|godzin)|całodob\w*|pomoc(?:y|ą)?\s+drogow\w*|wynaj\w*\s+lawet\w*|transport\w*\s+(?:samochod\w*\s+)?na\s+zlecenie|(?:wyłącznie|samego)\s+(?:transport\w*|przewoz\w*))/iu;
const withoutDisclaimers=value=>value.replace(/Nie\s+(?:świadczymy|oferujemy|działa(?:my)?)\b[^.!?]*(?:[.!?]|$)/giu,'');
const assertOffer=(value,file)=>assert(!unoffered.test(withoutDisclaimers(value)),`${file}: unoffered roadside, standalone transport or round-the-clock claim`);
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
  assert(!html.includes('{{'),`${file}: unresolved template tokens`);
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
  for(const value of [title,description,singleMeta(html,'og:title',file),singleMeta(html,'og:description',file),text(html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1]||'')])assertOffer(value,file);
  const visible=text(html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,'').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,'').replace(/<summary\b[^>]*>[\s\S]*?<\/summary>/gi,''));
  assertOffer(visible,file);
  const serviceSelect=html.match(/<select\b[^>]*id="serviceRequest"[^>]*>([\s\S]*?)<\/select>/)?.[1]||'';
  assert.deepEqual(tags(serviceSelect,'option').map(o=>o.value),['skup','demontaz'],`${file}: unsupported form service`);
  assert(!html.includes('data-page-type="transport"'),`${file}: obsolete standalone transport page type`);
  assert.equal(tags(html,'form').find(f=>f.id==='leadForm')?.method,'post',`${file}: fallback must not put contact fields into a GET URL`);
  const robotDirectives=singleMeta(html,'robots',file).toLowerCase().split(',').map(s=>s.trim());
  assert(!robotDirectives.includes('noindex')&&!robotDirectives.includes('none'),`${file}: unexpectedly noindex`);
  const ids=[...html.matchAll(/\sid="([^"]+)"/g)].map(m=>m[1]);
  assert.equal(new Set(ids).size,ids.length,`${file}: duplicate HTML ids`);
  const json=[...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m=>JSON.parse(m[1]));
  const entities=json.flatMap(j=>j['@graph']||[j]);
  for(const entity of entities.filter(e=>['Service','LocalBusiness'].includes(e['@type'])))assertOffer([entity.name,entity.description,entity.serviceType,entity.potentialAction?.name].filter(Boolean).join('. '),file);
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
    if(a.href?.startsWith('tel:'))assert.equal(a.href,'tel:+48517936676',`${file}: unauthorized phone number`);
    if(a.href?.startsWith('sms:'))assert.equal(a.href,'sms:+48517936676',`${file}: unauthorized SMS number`);
    if(a.href?.startsWith(origin+'/'))assert.fail(`${file}: internal anchor must use a relative URL for safe previews: ${a.href}`);
  }
  documents.set(pathname,{html,ids:new Set(ids),destinations:new Set()});
}
for(const [pathname,doc] of documents){
  const refs=[...doc.html.matchAll(/<(?:a|link|script|img|source)\b[^>]*(?:href|src)="([^"]+)"/g)].map(m=>m[1]);
  for(const tag of [...tags(doc.html,'source'),...tags(doc.html,'img')])if(tag.srcset)refs.push(...tag.srcset.split(',').map(v=>v.trim().split(/\s+/)[0]));
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
for(const file of ['assets/valuation.js','assets/form-config.js'])new vm.Script(read(file));
const formConfig=read('assets/form-config.js');
const configScope={window:{},URL};
vm.runInNewContext(formConfig,configScope);
vm.runInNewContext(read('assets/valuation.js'),configScope);
const config=configScope.window.AUTO_MIKULSKI_FORM;
if(config.enabled){
  assert(configScope.window.AutoMikulskiValuation.canSend(config),'active form requires an approved provider endpoint and privacy notice');
  assert(fs.existsSync(path.join(root,config.privacyNoticeUrl.replace(/^\//,''),'index.html')),'active form requires its published privacy notice');
}
validateRealizations(JSON.parse(read('data/realizations.json')),root);
for(const file of ['gpt-zwykly.html','holmech/test.html','hybryda.html','index-astra.html','index-gemini.html','inxex2.html','old-index.html','test.html','test2.html','test3.html']){
  const archive=read(file);
  assert(tags(archive,'meta').some(m=>m.name==='robots'&&m.content.split(',').map(v=>v.trim()).includes('noindex')),`${file}: old/test page lost noindex`);
  assert.equal(tags(archive,'script').length,0,`${file}: archive must not run historical analytics or scripts`);
  assert.equal(tags(archive,'form').length,0,`${file}: archive must not collect contact data`);
  assert(tags(archive,'a').some(a=>a.href==='/'),`${file}: archive needs a link to the current website`);
  for(const link of tags(archive,'a').filter(a=>a.href?.startsWith('tel:')))assert.equal(link.href,'tel:+48517936676',`${file}: unauthorized archive phone`);
  assertOffer(text(archive),file);
}
console.log(`Validated ${documents.size} sitemap pages: actual canonical tags, unique titles/descriptions, Open Graph URLs, JSON-LD, internal links, anchors, FAQ parity, old-page noindex and homepage reachability.`);
