import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';

const source=path.resolve(import.meta.dirname,'..');
const fixture=fs.mkdtempSync(path.join(os.tmpdir(),'automikulski-validation-'));
const validator=path.join(import.meta.dirname,'validate-site.mjs');
// Fixtures are isolated from both the working repository and production.
for(const name of fs.readdirSync(source)){
  if(name==='.git')continue;
  fs.cpSync(path.join(source,name),path.join(fixture,name),{recursive:true});
}
function validate(){return spawnSync(process.execPath,[validator,'--root',fixture],{encoding:'utf8'});}
const clean=validate();assert.equal(clean.status,0,clean.stderr||clean.stdout);
const home=fs.readFileSync(path.join(fixture,'index.html'),'utf8');
const other=fs.readFileSync(path.join(fixture,'skup-aut-zabrze/index.html'),'utf8');
const cases=[
  ['wrong canonical while a normal home link still exists','index.html',home.replace('rel="canonical" href="https://automikulski.pl/"','rel="canonical" href="https://automikulski.pl/wrong/"'),'canonical does not match'],
  ['missing canonical while a normal home link still exists','index.html',home.replace(/<link rel="canonical"[^>]*>/,''),'exactly one canonical'],
  ['duplicate canonical','index.html',home.replace('</head>','<link rel="canonical" href="https://automikulski.pl/"></head>'),'exactly one canonical'],
  ['duplicate title','skup-aut-zabrze/index.html',other.replace(/<title>.*?<\/title>/,home.match(/<title>.*?<\/title>/)[0]),'duplicate title'],
  ['duplicate description','skup-aut-zabrze/index.html',other.replace(/<meta name="description"[^>]*>/,home.match(/<meta name="description"[^>]*>/)[0]),'duplicate meta description'],
  ['wrong Open Graph URL','index.html',home.replace('property="og:url" content="https://automikulski.pl/"','property="og:url" content="https://automikulski.pl/wrong/"'),'og:url does not match'],
  ['preview navigation escaping to production','index.html',home.replace('href="/skup-aut-zabrze/"','href="https://automikulski.pl/skup-aut-zabrze/"'),'internal anchor must use a relative URL'],
  ['noindex with reversed attribute order','index.html',home.replace(/<meta name="robots"[^>]*>/,'<meta content="NOINDEX, follow" name="robots">'),'unexpectedly noindex'],
  ['unauthorized contact phone','index.html',home.replace('href="tel:+48517936676"','href="tel:+48690626260"'),'unauthorized phone number'],
  ['false round-the-clock title','index.html',home.replace(/<title>.*?<\/title>/,'<title>Pomoc drogowa 24h Gliwice</title>'),'unoffered roadside'],
  ['standalone transport form option','index.html',home.replace('<select id="serviceRequest" name="service">','<select id="serviceRequest" name="service"><option value="transport">Transport na zlecenie</option>'),'unoffered roadside'],
  ['unsupported form service with a neutral label','index.html',home.replace('<select id="serviceRequest" name="service">','<select id="serviceRequest" name="service"><option value="transport">Inna sprawa</option>'),'unsupported form service'],
  ['false roadside schema','index.html',home.replace(/"serviceType":"[^"]*"/,'"serviceType":"Pomoc drogowa 24h"'),'unoffered roadside']
];
for(const [label,file,changed,expected] of cases){
  const target=path.join(fixture,file),original=fs.readFileSync(target,'utf8');
  assert.notEqual(changed,original,`${label}: fixture mutation had no effect`);
  fs.writeFileSync(target,changed);
  const result=validate();
  fs.writeFileSync(target,original);
  assert.notEqual(result.status,0,`${label}: broken fixture unexpectedly passed`);
  assert((result.stderr+result.stdout).includes(expected),`${label}: unexpected failure: ${result.stderr}`);
}
console.log(`Passed: valid baseline and ${cases.length} isolated regressions for canonical, metadata, indexing, phone and preview navigation. No production files were changed.`);
