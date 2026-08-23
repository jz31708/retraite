(()=>{
  const header=document.querySelector('.site-header');
  const button=document.querySelector('.menu-toggle');
  const nav=document.getElementById('mainNav');
  if(header&&button&&nav){
    header.classList.add('js-ready');
    button.addEventListener('click',()=>{
      const open=header.classList.toggle('nav-open');
      button.setAttribute('aria-expanded',String(open));
      button.textContent=open?'Fermer':'Menu';
    });
    nav.addEventListener('click',event=>{
      if(event.target.closest('a')){
        header.classList.remove('nav-open');
        button.setAttribute('aria-expanded','false');
        button.textContent='Menu';
      }
    });
  }

  document.addEventListener('site:loaded',()=>{
    const select=document.getElementById('partySelect');
    const cards=[...document.querySelectorAll('[data-party-card]')];
    if(select&&cards.length){
      const show=value=>cards.forEach(card=>{card.hidden=card.dataset.partyCard!==value;});
      show(select.value);
      select.addEventListener('change',()=>show(select.value));
    }
  });
})();
