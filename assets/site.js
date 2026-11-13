'use strict';
    // Progressive navigation: links remain available without JavaScript.
    const menu=document.querySelector('.menu-button');
    const nav=document.getElementById('main-nav');
    const narrow=window.matchMedia('(max-width: 1000px)');
    menu.hidden=false;
    function closeMenu(){nav.hidden=narrow.matches;menu.setAttribute('aria-expanded',String(!nav.hidden));}
    closeMenu();
    narrow.addEventListener('change',closeMenu);
    menu.addEventListener('click',()=>{nav.hidden=!nav.hidden;menu.setAttribute('aria-expanded',String(!nav.hidden));});
    nav.addEventListener('click',event=>{if(event.target.closest('a')&&narrow.matches)closeMenu();});
    document.addEventListener('keydown',event=>{if(event.key==='Escape'&&narrow.matches&&!nav.hidden){closeMenu();menu.focus();}});
    document.getElementById('year').textContent=new Date().getFullYear();
    if(window.AutoMikulskiValuation){
      window.AutoMikulskiValuation.init({trackEvent});
    }else{
    // Build a local email draft. This page has no form submission endpoint.
    const form=document.getElementById('leadForm');
    const phone=document.getElementById('phone');
    const city=document.getElementById('city');
    const car=document.getElementById('car');
    const condition=document.getElementById('condition');
    const message=document.getElementById('message-text');
    const status=document.getElementById('form-status');
    const mail=document.getElementById('sendMail');
    let lastPreparedDraft='';
    function invalidateDraft(event){
      if(event.target===message||document.getElementById('message-preview').hidden)return;
      document.getElementById('message-preview').hidden=true;message.value='';mail.href='mailto:automikulski@gmail.com';
      status.textContent='Dane samochodu zostały zmienione. Przygotuj wiadomość ponownie, aby zawierała aktualne informacje.';
    }
    form.addEventListener('input',invalidateDraft);
    form.addEventListener('change',invalidateDraft);
    function validatePhone(){const value=phone.value.trim();const digits=value.replace(/\D/g,'');phone.setCustomValidity(digits.length>=7&&digits.length<=15&&/^[+\d\s().-]+$/.test(value)?'':'Podaj poprawny numer telefonu, np. 500 600 700.');}
    phone.addEventListener('input',validatePhone);
    function updateMail(){mail.href='mailto:automikulski@gmail.com?subject='+encodeURIComponent('Wycena auta — Auto Mikulski')+'&body='+encodeURIComponent(message.value);}
    form.addEventListener('submit',event=>{
      event.preventDefault();
      if(document.getElementById('website')?.value.trim()){status.textContent='Nie można przygotować tego zgłoszenia. Zadzwoń: 517 936 676.';return;}
      validatePhone();if(!form.reportValidity())return;
      const brand=document.getElementById('brand'),year=document.getElementById('yearOfCar')?.value.trim()||'';
      if(!city.value.trim()||!brand?.value.trim()||!car.value.trim()){status.textContent='Podaj miasto odbioru, markę i model auta.';(!city.value.trim()?city:!brand?.value.trim()?brand:car)?.focus();return;}
      if(year&&(!/^\d{4}$/.test(year)||Number(year)<1886||Number(year)>new Date().getFullYear()+1)){status.textContent='Sprawdź rok produkcji lub pozostaw to pole puste.';document.getElementById('yearOfCar').focus();return;}
      const service=document.getElementById('serviceRequest')?.value||'skup';
      if(!['skup','demontaz'].includes(service)){status.textContent='Wybierz skup auta lub organizację przekazania do stacji.';return;}
      const topic=service==='demontaz'?'organizację przekazania auta do uprawnionej stacji demontażu':'wycenę i skup auta';
      message.value='Dzień dobry, proszę o '+topic+'.\n\nOsoba kontaktowa: '+(document.getElementById('contactName')?.value.trim()||'Do ustalenia')+'\nMiasto odbioru: '+city.value.trim()+'\nSamochód: '+(brand.value.trim()+' '+car.value.trim()+' '+year).trim()+'\nTelefon kontaktowy: '+phone.value.trim()+'\nStan: '+(document.getElementById('carState')?.value||'Do omówienia')+'\nStan i uszkodzenia: '+(condition.value.trim()||'Do omówienia')+'\n\nProszę o omówienie dokumentów i warunków odbioru.';
      updateMail();document.getElementById('message-preview').hidden=false;
      status.textContent='Wiadomość jest gotowa, ale jeszcze niewysłana. Otwórz pocztę lub skopiuj tekst.';
      if(message.value!==lastPreparedDraft){trackEvent('valuation_draft');lastPreparedDraft=message.value;}
      message.focus();
    });
    message.addEventListener('input',updateMail);
    document.getElementById('copy-message').addEventListener('click',async()=>{
      try{await navigator.clipboard.writeText(message.value);status.textContent='Skopiowano. Wklej tekst do e-maila lub SMS-a i wyślij wiadomość.';}
      catch{message.focus();message.select();status.textContent='Zaznaczono tekst. Skopiuj go ręcznie, wklej do wiadomości i wyślij.';}
    });
    form.hidden=false;
    }
    // Preserve the existing GA property, opt-in only; never send form values.
    const gaId='G-2TNQWT3SF9';
    const consentKey='automikulski-analytics-v1';
    const choice=document.getElementById('analytics-choice');
    const privacy=document.getElementById('privacy-toggle');
    let consent=null,gaLoaded=false;
    function trackEvent(eventName,parameters={}){
      if(consent!=='granted'||!gaLoaded||typeof window.gtag!=='function')return;
      window.gtag('event',eventName,{page_type:document.body.dataset.pageType||'page',page_city:document.body.dataset.pageCity||'slask',...parameters});
    }
    document.addEventListener('click',event=>{
      const link=event.target.closest('a[href]');if(!link)return;
      const href=link.getAttribute('href')||'';
      const eventName=href.startsWith('tel:')?'phone_click':href.startsWith('sms:')?'sms_click':href.startsWith('mailto:')?'email_click':null;
      if(!eventName)return;
      const section=link.closest('section[id]');
      const location=section?section.id:link.closest('header')?'header':link.closest('footer')?'footer':link.closest('.mobile-actions')?'mobile_bar':'content';
      trackEvent(eventName,{link_location:location,transport_type:'beacon'});
    });
    try{consent=localStorage.getItem(consentKey);}catch{}
    function enableAnalytics(){
      // Private previews and local tests must not pollute production statistics.
      if(!['automikulski.pl','www.automikulski.pl'].includes(location.hostname))return;
      window['ga-disable-'+gaId]=false;
      if(gaLoaded){window.gtag('consent','update',{analytics_storage:'granted'});return;}
      gaLoaded=true;window.dataLayer=window.dataLayer||[];
      window.gtag=function(){window.dataLayer.push(arguments);};
      window.gtag('consent','default',{analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
      window.gtag('js',new Date());
      window.gtag('config',gaId,{allow_google_signals:false,allow_ad_personalization_signals:false});
      const script=document.createElement('script');script.async=true;script.src='https://www.googletagmanager.com/gtag/js?id='+gaId;document.head.appendChild(script);
    }
    privacy.hidden=false;
    if(consent==='granted')enableAnalytics();else if(consent!=='denied')choice.hidden=false;
    privacy.addEventListener('click',()=>{choice.hidden=false;document.getElementById('analytics-reject').focus();});
    document.getElementById('analytics-accept').addEventListener('click',()=>{consent='granted';try{localStorage.setItem(consentKey,'granted');}catch{}choice.hidden=true;enableAnalytics();});
    document.getElementById('analytics-reject').addEventListener('click',()=>{
      consent='denied';
      try{localStorage.setItem(consentKey,'denied');}catch{}
      window['ga-disable-'+gaId]=true;
      if(window.gtag)window.gtag('consent','update',{analytics_storage:'denied'});
      // Expire first-party GA cookies at applicable host/domain scopes.
      document.cookie.split(';').forEach(entry=>{
        const name=entry.split('=')[0].trim();if(!/^_ga(?:_|$)/.test(name))return;
        const expire=name+'=; Max-Age=0; path=/';document.cookie=expire;
        const host=location.hostname;document.cookie=expire+'; domain='+host;
        if(host==='automikulski.pl'||host.endsWith('.automikulski.pl'))document.cookie=expire+'; domain=.automikulski.pl';
      });
      choice.hidden=true;
    });
