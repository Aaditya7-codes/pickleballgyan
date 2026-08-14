const menu=document.querySelector('.menu');
const nav=document.querySelector('.main-nav');
if(menu&&nav){menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));});}
document.querySelectorAll('[data-current-year]').forEach(el=>el.textContent=new Date().getFullYear());
