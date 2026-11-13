(function(){
  'use strict';
  const service=document.getElementById('serviceRequest');
  if(!service)return;
  // Keep the existing form and its normal change handlers (including draft
  // invalidation). These links only select one of the two supported intents.
  document.querySelectorAll('a[data-valuation-service]').forEach(link=>{
    const intent=link.dataset.valuationService;
    if(!['skup','demontaz'].includes(intent))return;
    link.addEventListener('click',()=>{
      if(service.value!==intent){
        service.value=intent;
        service.dispatchEvent(new Event('change',{bubbles:true}));
      }
      service.focus({preventScroll:true});
    });
  });
})();
