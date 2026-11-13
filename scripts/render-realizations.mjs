import fs from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';

const escape=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function validateRealizations(data,root){
  if(data.version!==1||!Array.isArray(data.items))throw new Error('Unsupported realizations data');
  const ids=new Set();
  for(const item of data.items){
    if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.id||'')||ids.has(item.id))throw new Error('Invalid or duplicate realization id');ids.add(item.id);
    if(item.approvedForPublication!==true||item.platesAndPersonalDataChecked!==true)throw new Error('Each realization requires publication approval and privacy review');
    for(const key of ['brand','model','city','condition','description','service'])if(typeof item[key]!=='string'||!item[key].trim()||item[key].length>700)throw new Error('Missing or overlong realization '+key);
    if(item.year!=null&&(!Number.isInteger(item.year)||item.year<1886||item.year>new Date().getFullYear()+1))throw new Error('Invalid realization year');
    if(!['skup','demontaz'].includes(item.service))throw new Error('Invalid realization service');
    if(!Array.isArray(item.photos)||!item.photos.length||item.photos.length>5)throw new Error('Realization requires one to five approved photos');
    for(const photo of item.photos){
      if(!/^\/assets\/realizations\/[a-zA-Z0-9/_-]+\.(?:jpg|jpeg|png|webp)$/.test(photo.src||'')||photo.src.includes('..'))throw new Error('Photo must be an approved local image');
      if(typeof photo.alt!=='string'||!photo.alt.trim()||photo.alt.length>180)throw new Error('Photo requires useful alt');
      if(!fs.existsSync(path.join(root,photo.src.slice(1))))throw new Error('Missing realization image '+photo.src);
    }
  }
  return data.items;
}
export function renderRealizations(items,city=''){
  const selected=(city?items.filter(i=>i.city===city):items).slice(0,6);
  if(!selected.length)return '';
  const labels={skup:'Skup samochodu',demontaz:'Organizacja przekazania do stacji'};
  const cards=selected.map(i=>'<article class="realization-card"><div class="realization-photos">'+i.photos.map(p=>'<img src="'+escape(p.src)+'" alt="'+escape(p.alt)+'" loading="lazy" decoding="async" width="960" height="640">').join('')+'</div><div class="realization-copy"><p class="eyebrow">'+escape(i.city)+' · '+labels[i.service]+'</p><h3>'+escape(i.brand)+' '+escape(i.model)+(i.year?' · '+i.year:'')+'</h3><p><strong>Stan:</strong> '+escape(i.condition)+'</p><p>'+escape(i.description)+'</p></div></article>').join('');
  return '<section class="section realizations" id="realizacje"><div class="wrap"><div class="section-head"><div><p class="eyebrow">Nasze realizacje</p><h2>Skupione i odebrane samochody.</h2></div><p>Rzeczywiste zgłoszenia i odbiory opisane przez Auto Mikulski.</p></div><div class="realization-grid">'+cards+'</div></div></section>';
}
export function buildRealizations(root){
  const items=validateRealizations(JSON.parse(fs.readFileSync(path.join(root,'data/realizations.json'),'utf8')),root);
  const urls=[...fs.readFileSync(path.join(root,'sitemap.xml'),'utf8').matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1]);
  let pages=0;
  for(const url of urls){
    const file=path.join(root,new URL(url).pathname.replace(/^\//,''),'index.html');
    const source=fs.readFileSync(file,'utf8');
    if(!source.includes('<!-- realizations:start -->'))continue;
    const city=source.match(/data-page-city="([^"]+)"/)?.[1]||'';
    const type=source.match(/data-page-type="([^"]+)"/)?.[1];
    const markup=renderRealizations(items,type==='city'?city:'');
    const output=source.replace(/<!-- realizations:start -->[\s\S]*?<!-- realizations:end -->/,'<!-- realizations:start -->'+markup+'<!-- realizations:end -->');
    if(output!==source)fs.writeFileSync(file,output);
    pages++;
  }
  return {approvedItems:items.length,pages};
}
if(process.argv[1]&&import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href){
  const arg=process.argv.indexOf('--root');const root=arg===-1?path.resolve(import.meta.dirname,'..'):path.resolve(process.argv[arg+1]);
  console.log(JSON.stringify(buildRealizations(root)));
}
