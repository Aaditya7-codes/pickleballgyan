const menu=document.querySelector('.menu');
const nav=document.querySelector('.main-nav');
if(menu&&nav){menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));});}
document.querySelectorAll('[data-current-year]').forEach(el=>el.textContent=new Date().getFullYear());
document.querySelectorAll('a[href*="github.com/Aaditya7-codes/pickleballgyan/issues"]').forEach(link=>{link.href='mailto:pickleball.hero7@gmail.com?subject=Pickleball%20Gyan%20correction%20or%20update';link.removeAttribute('rel');link.textContent='Email an update ↗';});
