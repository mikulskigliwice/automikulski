import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url),api=require('../assets/valuation.js');
const config={enabled:true,provider:'formspree',endpoint:'https://formspree.io/f/example',privacyNoticeApproved:true,privacyNoticeUrl:'/polityka-prywatnosci/'};
const data={contact:'TEST',phone:'000000000',city:'TEST',brand:'TEST',model:'TEST',year:'2020',state:'nieodpalające',service:'skup',condition:'TEST — not a real customer'};
assert(!api.canSend({}));assert(!api.canSend({...config,enabled:false}));assert(!api.canSend({...config,privacyNoticeApproved:false}));assert(!api.canSend({...config,privacyNoticeUrl:''}));assert(api.canSend(config));
for(const endpoint of ['http://formspree.io/f/example','https://formspree.io.evil.example/f/example','https://user:pass@formspree.io/f/example','https://formspree.io/f/example?copy=1','https://example.com/f/id'])assert(!api.canSend({...config,endpoint}));
assert.equal(api.validatePayload(data),'');assert(api.validatePayload({...data,phone:'abc'}));assert(api.validatePayload({...data,brand:''}));assert(api.validatePayload({...data,year:'9999'}));
assert.equal(api.validatePayload({...data,service:'demontaz'}),'');
assert(api.validatePayload({...data,service:'transport'}),'standalone transport is not offered');
assert.throws(()=>api.draft({...data,service:'transport'}));
const good=new File(['jpeg-test-fixture'],'test.jpg',{type:'image/jpeg'});
assert(api.validatePayload({...data,website:'spam.example'}));
assert.equal(api.validateFiles([good]),'');assert(api.validateFiles([new File(['bad'],'x.svg',{type:'image/svg+xml'})]));assert(api.validateFiles(Array(6).fill(good)));assert(api.validateFiles([{type:'image/jpeg',size:6*1024*1024}]));assert(api.validateFiles(Array(5).fill({type:'image/jpeg',size:5*1024*1024})));
let calls=0;
const fetchImpl=async(url,request)=>{calls++;assert.equal(url,config.endpoint);assert.equal(request.method,'POST');assert.equal(request.credentials,'omit');assert.equal(request.body.get('phone'),data.phone);assert.equal(request.body.getAll('photos').length,1);return {ok:true,status:200,json:async()=>({next:'/thanks'})};};
await assert.rejects(api.sendSubmission(data,[good],{...config,enabled:false},{fetchImpl}));assert.equal(calls,0,'disabled configuration must never transmit');
assert.deepEqual(await api.sendSubmission(data,[good],config,{fetchImpl}),{accepted:true});assert.equal(calls,1);
await assert.rejects(api.sendSubmission({...data,website:'spam.example'},[good],config,{fetchImpl}));assert.equal(calls,1,'honeypot must stop transmission');
// Acceptance follows the provider's documented HTTP contract, not a mocked
// JSON field: successful empty responses need not expose a JSON body either.
for(const response of [{ok:true,status:200},{ok:true,status:202,json:async()=>({next:'/thanks'})},{ok:true,status:204,json:async()=>{throw new Error('No JSON body');}}])assert.deepEqual(await api.sendSubmission(data,[],config,{fetchImpl:async()=>response}),{accepted:true});
for(const response of [{ok:false,status:400,json:async()=>({ok:true})},{ok:false,status:422,json:async()=>({errors:[{message:'Invalid'}]})},{ok:false,status:429},{ok:false,status:413},{ok:false,status:500,json:async()=>{throw new Error('HTML error');}}])await assert.rejects(api.sendSubmission(data,[],config,{fetchImpl:async()=>response}));
await assert.rejects(api.sendSubmission({...data,service:'transport'},[],config,{fetchImpl:async()=>{throw new Error('Must never send unsupported service');}}));
await assert.rejects(api.sendSubmission(data,[],config,{fetchImpl:async()=>{throw new Error('network offline');}}));
assert(api.draft(data).includes('TEST'));assert(!api.draft(data).includes('Zgłoszenie przyjęte'));
console.log('Passed: disabled backend never sends; approved services; endpoint and privacy gates; fields and photos; documented HTTP acceptance without JSON-ok dependency; HTTP and network failures. Only mocked network was used; no real account was tested.');
