import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import vm from 'node:vm';

const root=path.resolve(import.meta.dirname,'..');
const script=fs.readFileSync(path.join(root,'assets/site.js'),'utf8');
class Element{
  constructor(){this.listeners=new Map();this.hidden=true;this.value='';this.textContent='';this.href='';}
  addEventListener(name,handler){this.listeners.set(name,handler);}
  setAttribute(){}
  focus(){}
  select(){}
  setCustomValidity(){}
  reportValidity(){return true;}
  fire(type,event={}){return this.listeners.get(type)?.(event);}
}
function page(savedConsent,modern=false){
  const elements=new Map();
  const get=id=>{if(!elements.has(id))elements.set(id,new Element());return elements.get(id);};
  const events=new Map(),scripts=[],storage=new Map();
  if(savedConsent)storage.set('automikulski-analytics-v1',savedConsent);
  const document={
    body:{dataset:{pageCity:'Mikołów',pageType:'city'}},cookie:'',
    getElementById:get,querySelector:selector=>get(selector),
    addEventListener:(type,handler)=>events.set(type,handler),
    createElement:()=>new Element(),head:{appendChild:element=>scripts.push(element)}
  };
  const window={matchMedia:()=>({matches:false,addEventListener(){}})};
  const localStorage={getItem:key=>storage.get(key)??null,setItem:(key,value)=>storage.set(key,value)};
  window.document=document;
  const context={document,window,localStorage,location:{hostname:'automikulski.pl'},navigator:{clipboard:{writeText:async()=>{}}}};
  vm.createContext(context);
  if(modern)vm.runInContext(fs.readFileSync(path.join(root,'assets/valuation.js'),'utf8'),context);
  vm.runInContext(script,context);
  const click=href=>{
    const link={getAttribute:()=>href,closest:selector=>selector==='section[id]'?{id:'kontakt'}:null};
    events.get('click')({target:{closest:()=>link}});
  };
  const analyticsEvents=()=>Array.from(window.dataLayer??[]).map(v=>Array.from(v)).filter(v=>v[0]==='event');
  return {get,click,window,scripts,analyticsEvents};
}
const noConsent=page();
noConsent.click('tel:+48517936676');
assert.equal(noConsent.scripts.length,0,'must not load analytics without consent');
assert.equal(noConsent.analyticsEvents().length,0,'must not record contact without consent');
const denied=page('denied');denied.click('tel:+48517936676');assert.equal(denied.scripts.length,0);
const active=page();
active.get('analytics-accept').fire('click');
assert.equal(active.scripts.length,1,'analytics should load once after opt-in');
active.click('tel:+48517936676');
active.click('sms:+48517936676');
active.click('mailto:automikulski@gmail.com?body=PRIVATE-MESSAGE');
assert.deepEqual(active.analyticsEvents().map(e=>e[1]),['phone_click','sms_click','email_click']);
active.get('city').value='PRIVATE-CITY';active.get('phone').value='600123456';active.get('car').value='PRIVATE-CAR';active.get('condition').value='PRIVATE-CONDITION';
active.get('leadForm').fire('submit',{preventDefault(){}});
assert.equal(active.analyticsEvents().at(-1)[1],'valuation_draft','local draft must not be counted as a delivered lead');
const payload=JSON.stringify(active.analyticsEvents());
for(const value of ['PRIVATE-MESSAGE','PRIVATE-CITY','600123456','PRIVATE-CAR','PRIVATE-CONDITION'])assert(!payload.includes(value),'form data leaked to analytics: '+value);
assert.equal(active.analyticsEvents()[0][2].page_city,'Mikołów');
const count=active.analyticsEvents().length;
active.get('analytics-reject').fire('click');active.click('tel:+48517936676');
assert.equal(active.analyticsEvents().length,count,'recording must stop after consent is withdrawn');
assert.equal(active.window['ga-disable-G-2TNQWT3SF9'],true);
const remembered=page('granted');assert.equal(remembered.scripts.length,1);remembered.get('analytics-accept').fire('click');assert.equal(remembered.scripts.length,1,'repeated consent must not load a second analytics script');
const enhanced=page('granted',true);
for(const [id,value] of Object.entries({city:'PRIVATE-CITY',phone:'600123456',brand:'PRIVATE-BRAND',car:'PRIVATE-MODEL',contactName:'PRIVATE-NAME',condition:'PRIVATE-DESCRIPTION',serviceRequest:'skup'}))enhanced.get(id).value=value;
await enhanced.get('leadForm').fire('submit',{preventDefault(){}});
assert.equal(enhanced.analyticsEvents().at(-1)[1],'valuation_draft');
const enhancedPayload=JSON.stringify(enhanced.analyticsEvents());
for(const value of ['PRIVATE-CITY','600123456','PRIVATE-BRAND','PRIVATE-MODEL','PRIVATE-NAME','PRIVATE-DESCRIPTION'])assert(!enhancedPayload.includes(value),'enhanced form data leaked to analytics');
assert(!enhanced.analyticsEvents().some(e=>e[1]==='valuation_received'),'disabled backend must not claim accepted leads');
enhanced.get('analytics-reject').fire('click');const enhancedCount=enhanced.analyticsEvents().length;
await enhanced.get('leadForm').fire('submit',{preventDefault(){}});assert.equal(enhanced.analyticsEvents().length,enhancedCount);
console.log('Passed: opt-in, denial, remembered consent, withdrawal, contact events, draft semantics, and no form data in analytics.');
