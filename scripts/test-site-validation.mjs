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
  ['preview navigation escaping to production','index.html',home.replace('href="/skup-aut-zabrze/"','href="https://automikulski.pl/skup-aut-zabrze/"'),'internal anchor must use a relative URL']
];
for(const [label,file,changed,expected] of cases){
  const target=path.join(fixture,file),original=fs.readFileSync(target,'utf8');
  fs.writeFileSync(target,changed);
  const result=validate();
  fs.writeFileSync(target,original);
  assert.notEqual(result.status,0,`${label}: broken fixture unexpectedly passed`);
  assert((result.stderr+result.stdout).includes(expected),`${label}: unexpected failure: ${result.stderr}`);
}
console.log(`Passed: valid baseline and ${cases.length} isolated regressions for canonical, metadata and preview navigation. No production files were changed.`);
