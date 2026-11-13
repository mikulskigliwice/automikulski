import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const escape=v=>v.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const template=fs.readFileSync(path.join(root,'partials/valuation-form.html'),'utf8').trim();
const urls=[...fs.readFileSync(path.join(root,'sitemap.xml'),'utf8').matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1]);
let count=0;
for(const url of urls){
  const file=path.join(root,new URL(url).pathname.replace(/^\//,''),'index.html');const source=fs.readFileSync(file,'utf8');
  if(!source.includes('<!-- valuation:start -->'))throw new Error('Missing valuation markers in '+file);
  const type=source.match(/data-page-type="([^"]+)"/)?.[1],city=type==='city'?source.match(/data-page-city="([^"]+)"/)?.[1]||'':'';
  const service=new URL(url).pathname==='/skup-aut-do-zlomowania-gliwice/'?'demontaz':'skup';
  const values={CITY_VALUE:escape(city),FORM_HEADING:'Opisz samochód do wyceny.',CONDITION_PLACEHOLDER:'Czy odpala? Co jest uszkodzone? Gdzie stoi samochód?',SELECT_SKUP:service==='skup'?'selected':'',SELECT_DEMONTAZ:service==='demontaz'?'selected':''};
  const form=template.replace(/\{\{([A-Z_]+)\}\}/g,(_,key)=>{if(!(key in values))throw new Error('Unknown form token '+key);return values[key];});
  const output=source.replace(/<!-- valuation:start -->[\s\S]*?<!-- valuation:end -->/,'<!-- valuation:start -->'+form+'<!-- valuation:end -->');
  if(output!==source)fs.writeFileSync(file,output);count++;
}
console.log('Synchronized valuation form on '+count+' pages. Backend configuration was not enabled.');
