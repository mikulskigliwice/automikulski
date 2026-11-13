(function(global){
  'use strict';
  const limits=Object.freeze({files:5,fileBytes:5*1024*1024,totalBytes:20*1024*1024});
  const imageTypes=new Set(['image/jpeg','image/png','image/webp']);
  function validEndpoint(endpoint){
    try{const u=new URL(endpoint);return u.protocol==='https:'&&u.hostname==='formspree.io'&&/^\/f\/[a-zA-Z0-9]+$/.test(u.pathname)&&!u.search&&!u.hash&&!u.username&&!u.password;}
    catch{return false;}
  }
  function canSend(config={}){
    const notice=config.privacyNoticeUrl||'';
    return config.enabled===true&&config.provider==='formspree'&&validEndpoint(config.endpoint)&&config.privacyNoticeApproved===true&&/^\/(?!\/)[a-zA-Z0-9/_-]+\/$/.test(notice);
  }
  function validateFiles(files=[]){
    if(files.length>limits.files)return 'Dodaj maksymalnie 5 zdjęć.';
    let total=0;
    for(const file of files){
      if(!imageTypes.has(file.type))return 'Wybierz zdjęcia JPG, PNG lub WebP.';
      if(!Number.isFinite(file.size)||file.size<=0||file.size>limits.fileBytes)return 'Każde zdjęcie musi mieć od 1 bajta do 5 MB.';
      total+=file.size;
    }
    return total>limits.totalBytes?'Łączny rozmiar zdjęć nie może przekroczyć 20 MB.':'';
  }
  function validatePayload(data,files=[]){
    if(String(data.website||'').trim())return 'Nie można przygotować tego zgłoszenia. Zadzwoń: 517 936 676.';
    if(!validPhone(data.phone))return 'Podaj poprawny numer telefonu.';
    if(!data.city?.trim()||!data.brand?.trim()||!data.model?.trim())return 'Podaj miasto odbioru, markę i model auta.';
    if(data.year&&(!/^\d{4}$/.test(data.year)||Number(data.year)<1886||Number(data.year)>new Date().getFullYear()+1))return 'Sprawdź rok produkcji lub pozostaw to pole puste.';
    const lengths={contact:100,city:100,brand:80,model:160,condition:1500};
    for(const [field,max] of Object.entries(lengths))if(String(data[field]||'').length>max)return 'Skróć zbyt długie dane w formularzu.';
    if(!['skup','demontaz','transport'].includes(data.service))return 'Wybierz rodzaj zgłoszenia.';
    return validateFiles(files);
  }
  function validPhone(value=''){const digits=value.replace(/\D/g,'');return digits.length>=7&&digits.length<=15&&/^[+\d\s().-]+$/.test(value);}
  function draft(data){
    const services={skup:'Wycena i skup auta',demontaz:'Organizacja przekazania do stacji demontażu',transport:'Transport samochodu'};
    return 'Dzień dobry, proszę o kontakt.\n\nSprawa: '+services[data.service]+'\nOsoba kontaktowa: '+(data.contact||'Do ustalenia')+'\nTelefon: '+data.phone+'\nMiejsce odbioru: '+data.city+'\nSamochód: '+data.brand+' '+data.model+(data.year?' '+data.year:'')+'\nStan: '+(data.state||'Do omówienia')+'\nOpis i warunki odbioru: '+(data.condition||'Do omówienia')+'\n\nProszę o omówienie wyceny, dokumentów i warunków odbioru.';
  }
  async function sendSubmission(data,files,config,{fetchImpl=global.fetch,signal}={}){
    if(!canSend(config))throw new Error('Wysyłanie formularza nie zostało uruchomione. Zadzwoń lub przygotuj wiadomość e-mail.');
    const error=validatePayload(data,files);if(error)throw new Error(error);
    const payload=new FormData();
    for(const key of ['contact','phone','city','brand','model','year','state','service','condition'])payload.append(key,data[key]||'');
    payload.append('_subject','Zgłoszenie auta — Auto Mikulski');
    payload.append('_gotcha',data.website||'');
    for(const file of files)payload.append('photos',file,file.name);
    const response=await fetchImpl(config.endpoint,{method:'POST',headers:{Accept:'application/json'},body:payload,signal,credentials:'omit',redirect:'error'});
    let result;try{result=await response.json();}catch{throw new Error('Nie udało się potwierdzić przyjęcia zgłoszenia. Zachowaj dane i zadzwoń.');}
    if(!response.ok||result?.ok!==true){
      if(response.status===429)throw new Error('Wysyłka jest chwilowo ograniczona. Zachowaj dane i zadzwoń lub spróbuj później.');
      if(response.status===413)throw new Error('Zdjęcia są zbyt duże dla usługi formularza. Zmniejsz pliki i spróbuj ponownie.');
      throw new Error('Zgłoszenie nie zostało potwierdzone. Zachowaj dane i skontaktuj się telefonicznie.');
    }
    return {accepted:true};
  }
  function init({trackEvent=()=>{}}={}){
    const doc=global.document,form=doc.getElementById('leadForm');if(!form)return;
    const get=id=>doc.getElementById(id),config=global.AUTO_MIKULSKI_FORM||{},live=canSend(config),photoPreview=config.previewPhotoUI===true;
    const submit=get('valuation-submit'),status=get('form-status'),message=get('message-text'),mail=get('sendMail'),photos=get('photos');
    let pending=false,accepted=false;
    const value=id=>get(id)?.value.trim()||'';
    const collect=()=>({contact:value('contactName'),phone:value('phone'),city:value('city'),brand:value('brand'),model:value('car'),year:value('yearOfCar'),state:value('carState'),service:value('serviceRequest')||'skup',condition:value('condition')});
    const files=()=>Array.from(photos?.files||[]);
    get('phone').addEventListener('input',()=>get('phone').setCustomValidity(validPhone(value('phone'))?'':'Podaj poprawny numer telefonu.'));
    const updateMail=()=>{mail.href='mailto:automikulski@gmail.com?subject='+encodeURIComponent('Zgłoszenie auta — Auto Mikulski')+'&body='+encodeURIComponent(message.value);};
    form.hidden=false;
    get('photo-fields').hidden=!(live||photoPreview);
    get('valuation-intro').textContent=live?'Podaj podstawowe informacje i dodaj zdjęcia. Potwierdzenie zobaczysz po przyjęciu zgłoszenia.':'Podaj podstawowe informacje — przygotujemy wiadomość, którą wyślesz ze swojej poczty.';
    submit.textContent=live?'Wyślij zgłoszenie':'Przygotuj wiadomość e-mail';
    get('valuation-mode-note').textContent=live?'* Pola wymagane. Zdjęcia są opcjonalne.':'* Pola wymagane. Formularz przygotowuje wiadomość lokalnie. Wyślesz ją ze swojej poczty; zdjęcia dołączysz w e-mailu.';
    if(photoPreview&&!live)get('photos-help').textContent='Podgląd wersji ze zdjęciami. Wybrane pliki pozostają na urządzeniu i nie są przesyłane. W kontakcie e-mailowym dołącz je ręcznie.';
    if(live){get('form-privacy').hidden=false;get('form-privacy-link').href=config.privacyNoticeUrl;}
    form.addEventListener('input',()=>{if(accepted){accepted=false;submit.disabled=false;submit.textContent=live?'Wyślij zgłoszenie':'Przygotuj wiadomość e-mail';}});
    photos?.addEventListener('change',()=>{
      const error=validateFiles(files());photos.setCustomValidity(error);
      get('photo-list').textContent=error||files().map(f=>f.name+' ('+Math.ceil(f.size/1024)+' KB)').join(' · ');
    });
    form.addEventListener('submit',async event=>{
      event.preventDefault();if(pending||accepted)return;
      if(value('website')){status.textContent='Nie można przygotować tego zgłoszenia. Zadzwoń: 517 936 676.';return;}
      const data=collect(),selected=files(),error=validatePayload(data,selected);
      if(error){status.textContent=error;return;}
      if(!form.reportValidity())return;
      if(!live){
        message.value=draft(data);updateMail();get('message-preview').hidden=false;
        status.textContent='Wiadomość jest gotowa, ale jeszcze niewysłana. Otwórz pocztę lub skopiuj tekst. Zdjęcia dołącz w e-mailu.';
        trackEvent('valuation_draft');message.focus();return;
      }
      pending=true;submit.disabled=true;submit.textContent='Wysyłanie…';status.textContent='Przesyłamy zgłoszenie. Poczekaj na potwierdzenie.';form.setAttribute('aria-busy','true');
      const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),20000);
      try{
        await sendSubmission(data,selected,config,{signal:controller.signal});accepted=true;
        status.textContent='Zgłoszenie zostało przyjęte. W pilnej sprawie odbioru zadzwoń: 517 936 676.';submit.textContent='Zgłoszenie przyjęte';
        trackEvent('valuation_received');
      }catch(error){
        status.textContent=error.name==='AbortError'?'Nie udało się potwierdzić przyjęcia. Zachowaliśmy dane w formularzu — zadzwoń lub spróbuj później.':error.message;
      }finally{clearTimeout(timer);pending=false;form.setAttribute('aria-busy','false');if(!accepted){submit.disabled=false;submit.textContent='Wyślij zgłoszenie';}}
    });
    message.addEventListener('input',updateMail);
    get('copy-message').addEventListener('click',async()=>{
      try{await global.navigator.clipboard.writeText(message.value);status.textContent='Skopiowano. Wklej tekst do e-maila lub SMS-a i wyślij wiadomość.';}
      catch{message.focus();message.select();status.textContent='Zaznaczono tekst. Skopiuj go, wklej do wiadomości i wyślij.';}
    });
  }
  const api={limits,validPhone,validEndpoint,canSend,validateFiles,validatePayload,draft,sendSubmission,init};
  global.AutoMikulskiValuation=api;
  if(typeof module!=='undefined'&&module.exports)module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
