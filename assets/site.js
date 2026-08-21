const menu=document.querySelector('.menu');
const nav=document.querySelector('.main-nav');
const primaryLinks=[['/learn/','Learn'],['/places/','Courts'],['/gear/','Gear'],['/tournaments/','Tournaments'],['/news/','News'],['/data/','Data']];
if(nav){
  const path=window.location.pathname;
  nav.innerHTML=primaryLinks.map(([href,label])=>`<a${path.startsWith(href)?' class="active"':''} href="${href}">${label}</a>`).join('');
}
const main=document.querySelector('main');
if(main){
  main.id=main.id||'main-content';
  main.tabIndex=-1;
  const skipLink=document.createElement('a');
  skipLink.className='skip-link';
  skipLink.href=`#${main.id}`;
  skipLink.textContent='Skip to content';
  document.body.prepend(skipLink);
}
if(menu&&nav){
  nav.id=nav.id||'primary-navigation';
  menu.setAttribute('aria-controls',nav.id);
  const setMenuState=open=>{
    nav.classList.toggle('open',open);
    menu.setAttribute('aria-expanded',String(open));
    menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');
    menu.innerHTML=`${open?'Close':'Menu'} <span aria-hidden="true">${open?'−':'+'}</span>`;
  };
  setMenuState(false);
  menu.addEventListener('click',()=>setMenuState(menu.getAttribute('aria-expanded')!=='true'));
  nav.addEventListener('click',event=>{if(event.target.closest('a'))setMenuState(false);});
  document.addEventListener('click',event=>{if(!nav.contains(event.target)&&!menu.contains(event.target))setMenuState(false);});
  document.addEventListener('keydown',event=>{
    if(event.key==='Escape'&&menu.getAttribute('aria-expanded')==='true'){
      setMenuState(false);
      menu.focus();
    }
  });
  window.matchMedia('(min-width: 941px)').addEventListener('change',event=>{if(event.matches)setMenuState(false);});
}
document.querySelectorAll('[data-current-year]').forEach(el=>el.textContent=new Date().getFullYear());
document.querySelectorAll('a[href*="github.com/Aaditya7-codes/pickleballgyan/issues"]').forEach(link=>{link.href='mailto:pickleball.hero7@gmail.com?subject=Pickleball%20Gyan%20correction%20or%20update';link.removeAttribute('rel');link.textContent='Email an update ↗';});
