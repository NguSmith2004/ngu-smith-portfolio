(() => {"use strict";
const $=(s,c=document)=>c.querySelector(s), $$=(s,c=document)=>[...c.querySelectorAll(s)];
const header=$('#header'); const onScroll=()=>header?.classList.toggle('scrolled',scrollY>30); addEventListener('scroll',onScroll,{passive:true}); onScroll();
const mobile=$('.mobile-nav-toggle'), nav=$('#navmenu'), overlay=$('.nav-overlay');
const closeMobileNav=()=>{document.body.classList.remove('mobile-nav-active');mobile?.setAttribute('aria-expanded','false');mobile?.setAttribute('aria-label','Open navigation');overlay?.setAttribute('aria-hidden','true')};
const openMobileNav=()=>{document.body.classList.add('mobile-nav-active');mobile?.setAttribute('aria-expanded','true');mobile?.setAttribute('aria-label','Close navigation');overlay?.setAttribute('aria-hidden','false')};
mobile?.addEventListener('click',()=>document.body.classList.contains('mobile-nav-active')?closeMobileNav():openMobileNav());
overlay?.addEventListener('click',closeMobileNav);
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMobileNav()});
$$('#navmenu a').forEach(a=>a.addEventListener('click',closeMobileNav));
// Highlight the current page and keep navigation state consistent across pages.
const current=(location.pathname.split('/').pop()||'index.html').toLowerCase();
$$('#navmenu a').forEach(a=>{const href=(a.getAttribute('href')||'').split('/').pop().toLowerCase();if(href===current)a.classList.add('active')});
window.addEventListener('resize',()=>{if(innerWidth>=1200)closeMobileNav()});
const top=$('#scroll-top'); const topToggle=()=>top?.classList.toggle('active',scrollY>450); addEventListener('scroll',topToggle,{passive:true}); topToggle(); top?.addEventListener('click',e=>{e.preventDefault();scrollTo({top:0,behavior:'smooth'})});
const pre=$('#preloader'); addEventListener('load',()=>pre?.remove());
// Scroll progress
const bar=document.createElement('div');bar.className='scroll-progress';document.body.appendChild(bar);Object.assign(bar.style,{position:'fixed',top:0,left:0,height:'3px',background:'linear-gradient(90deg,#34b7a7,#7ad9cc)',zIndex:10001,width:'0%',transition:'width .08s linear'});const progress=()=>{const h=document.documentElement.scrollHeight-innerHeight;bar.style.width=(h>0?scrollY/h*100:0)+'%'};addEventListener('scroll',progress,{passive:true});progress();
// Reveal on scroll
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target)}}),{threshold:.12});$$('.reveal').forEach(e=>io.observe(e));
// Animated counters
const ci=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return; const el=e.target,end=+el.dataset.target||0;let start=0;const t0=performance.now();const tick=t=>{const p=Math.min(1,(t-t0)/1200);el.textContent=Math.round((1-Math.pow(1-p,3))*end)+(el.dataset.suffix||'');if(p<1)requestAnimationFrame(tick)};requestAnimationFrame(tick);ci.unobserve(el)}),{threshold:.7});$$('.counter').forEach(e=>ci.observe(e));
// Skill bars
const si=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.querySelectorAll('.progress-bar').forEach(p=>p.style.width=p.dataset.value+'%');si.unobserve(e)}}),{threshold:.35});$$('.skills-animation').forEach(e=>si.observe(e));
// Typing effect
const type=$('#typing');if(type){const words=['Software Engineer','Full-Stack Developer','UI/UX Designer','Graphic Designer'];let w=0,i=0,del=false;const loop=()=>{const word=words[w];type.textContent=word.slice(0,i);if(!del&&i<word.length)i++;else if(del&&i>0)i--;else{del=!del;if(!del)w=(w+1)%words.length}setTimeout(loop,del?55:95)};loop()}
// Project filters
$$('.filter-btn').forEach(btn=>btn.addEventListener('click',()=>{$$('.filter-btn').forEach(b=>b.classList.remove('active'));btn.classList.add('active');const f=btn.dataset.filter;$$('.project-card[data-category]').forEach(c=>c.classList.toggle('hidden',f!=='all'&&c.dataset.category!==f))}));
// Copy email
$$('[data-copy-email]').forEach(btn=>btn.addEventListener('click',async()=>{const email=btn.dataset.copyEmail;try{await navigator.clipboard.writeText(email);btn.innerHTML='<i class="bi bi-check2"></i> Copied';setTimeout(()=>btn.innerHTML='<i class="bi bi-copy"></i> Copy email',1600)}catch{location.href='mailto:'+email}}));
// Magnetic buttons
$$('.magnetic').forEach(b=>b.addEventListener('pointermove',e=>{const r=b.getBoundingClientRect();b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.08}px,${(e.clientY-r.top-r.height/2)*.08}px)`}));$$('.magnetic').forEach(b=>b.addEventListener('pointerleave',()=>b.style.transform=''));
// Custom cursor on desktop
if(matchMedia('(pointer:fine)').matches){const d=document.createElement('div'),r=document.createElement('div');d.className='cursor-dot';r.className='cursor-ring';document.body.append(d,r);addEventListener('pointermove',e=>{d.style.opacity=r.style.opacity='1';d.style.left=r.style.left=e.clientX+'px';d.style.top=r.style.top=e.clientY+'px'});$$('a,button,.project-card').forEach(el=>{el.addEventListener('mouseenter',()=>r.classList.add('active'));el.addEventListener('mouseleave',()=>r.classList.remove('active'))})}
})();