import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import vm from 'node:vm';

const root=path.resolve(import.meta.dirname,'..');
const script=fs.readFileSync(path.join(root,'assets/service-intents.js'),'utf8');
const link=intent=>({dataset:{valuationService:intent},listeners:new Map(),addEventListener(name,fn){this.listeners.set(name,fn);},click(){this.listeners.get('click')?.();}});
const links=[link('skup'),link('demontaz'),link('transport')],events=[];
const service={value:'skup',focused:false,dispatchEvent(event){events.push(event);},focus(){this.focused=true;}};
vm.runInNewContext(script,{document:{getElementById:id=>id==='serviceRequest'?service:null,querySelectorAll:()=>links},Event});
links[1].click();assert.equal(service.value,'demontaz');assert.equal(events.length,1);assert.equal(events[0].type,'change');assert.equal(events[0].bubbles,true);assert(service.focused);
links[1].click();assert.equal(events.length,1,'same intent must not invalidate an existing draft');
links[0].click();assert.equal(service.value,'skup');assert.equal(events.length,2);
links[2].click();assert.equal(service.value,'skup');assert.equal(events.length,2,'unsupported transport must never become a form intent');
assert.doesNotThrow(()=>vm.runInNewContext(script,{document:{getElementById:()=>null}}),'missing form must not break other pages');

const urls=[...fs.readFileSync(path.join(root,'sitemap.xml'),'utf8').matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1]);
let cityCount=0,dualHeroes=0;
const plain=s=>s.replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim();
for(const url of urls){
  const file=path.join(root,new URL(url).pathname,'index.html'),s=fs.readFileSync(file,'utf8');
  const nav=s.match(/<nav class="nav" id="main-nav"[\s\S]*?<\/nav>/)?.[0]||'';
  assert(/>Skup aut<\/a>/.test(nav),url+': missing purchase navigation');
  assert(/href="\/skup-aut-do-zlomowania-gliwice\/"[^>]*>Złomowanie<\/a>/.test(nav),url+': missing direct scrap navigation');
  assert.equal((s.match(/<script src="\/assets\/service-intents.js[^\"]*" defer><\/script>/g)||[]).length,1,url+': intent helper must be loaded once');
  const intents=[...s.matchAll(/data-valuation-service="([^"]+)"/g)].map(m=>m[1]);
  assert(intents.includes('skup')&&intents.includes('demontaz'),url+': both choices must be visible');
  assert(intents.every(i=>['skup','demontaz'].includes(i)),url+': unsupported choice');
  const group=s.match(/<div class="intent-actions"[^>]*>([\s\S]*?)<\/div>/)?.[1]||'';
  assert.equal((group.match(/class="btn btn-outline"/g)||[]).length,2,url+': choices must use the same presentation');
  if(url==='https://automikulski.pl/'||s.includes('data-page-type="city"')){
    const h1=plain(s.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/)?.[1]||'');
    assert(/skup aut/i.test(h1)&&/złomowanie/i.test(h1),url+': hero must name both services');dualHeroes++;
  }
  if(s.includes('data-page-type="city"')){
    cityCount++;
    const graph=JSON.parse(s.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1])['@graph'];
    const org=graph.find(e=>e['@type']==='Service'&&e['@id']===url+'#organizacja-zlomowania');
    assert(org,url+': missing truthful organization service');
    assert.equal(org.provider['@id'],'https://automikulski.pl/#localbusiness');
    const visible=plain(s.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g,''));
    assert(visible.includes(org.description),url+': schema describes text that is not visible');
    assert(s.includes('class="local-cassation"'),url+': missing useful local explanation');
  }
}
assert.equal(cityCount,13);assert.equal(dualHeroes,14);
console.log('Passed: supported intent selection, bubbling change, preserved same-intent draft and safe missing form; two navigation paths on 20 URLs, equal CTA styles, 14 dual-service heroes and 13 visible local service descriptions.');
