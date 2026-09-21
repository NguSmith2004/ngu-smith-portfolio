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
/* ===== Theme (light/dark) + language switcher + clickable project/certificate cards ===== */
(() => {"use strict";
const $=(s,c=document)=>c.querySelector(s), $$=(s,c=document)=>[...c.querySelectorAll(s)];

/* --- Theme toggle --- */
const THEME_KEY='sg_theme';
const applyTheme=(mode)=>{
  document.documentElement.setAttribute('data-theme',mode);
  $$('.theme-toggle').forEach(btn=>{btn.innerHTML=mode==='dark'?'<i class="bi bi-sun"></i>':'<i class="bi bi-moon-stars"></i>';btn.setAttribute('aria-label',mode==='dark'?'Switch to light mode':'Switch to dark mode')});
};
const storedTheme=localStorage.getItem(THEME_KEY);
const prefersDark=matchMedia('(prefers-color-scheme: dark)').matches;
applyTheme(storedTheme||(prefersDark?'dark':'light'));
$$('.theme-toggle').forEach(btn=>btn.addEventListener('click',()=>{
  const next=document.documentElement.getAttribute('data-theme')==='dark'?'light':'dark';
  applyTheme(next); localStorage.setItem(THEME_KEY,next);
}));

/* --- Language switcher --- */
const LANG_KEY='sg_lang';
const langs = window.SG_LANGS||[]; const dict = window.SG_I18N||{};
const langSwitchers = $$('.lang-switcher');

function buildLangMenu(container){
  const menu = container.querySelector('.lang-menu'); if(!menu) return;
  menu.innerHTML='';
  langs.forEach(l=>{
    const b=document.createElement('button');
    b.type='button'; b.dataset.lang=l.code;
    b.innerHTML=`<span>${l.native}</span>`;
    b.addEventListener('click',()=>{setLang(l.code); container.classList.remove('open')});
    menu.appendChild(b);
  });
}
langSwitchers.forEach(buildLangMenu);

function setLang(code){
  const strings = dict[code]||dict.en; if(!strings) return;
  const langMeta = langs.find(l=>l.code===code)||langs[0];
  document.documentElement.setAttribute('lang',code);
  document.documentElement.setAttribute('dir',langMeta?.dir||'ltr');
  $$('[data-i18n]').forEach(el=>{
    const key=el.dataset.i18n; if(strings[key]) el.textContent=strings[key];
  });
  $$('[data-i18n-placeholder]').forEach(el=>{
    const key=el.dataset.i18nPlaceholder; if(strings[key]) el.setAttribute('placeholder',strings[key]);
  });
  $$('.lang-toggle-btn .lang-current').forEach(el=>el.textContent=langMeta?.code.toUpperCase()||'EN');
  $$('.lang-menu button').forEach(b=>b.classList.toggle('active', b.dataset.lang===code));
  localStorage.setItem(LANG_KEY,code);
}
langSwitchers.forEach(sw=>{
  const trigger = sw.querySelector('.lang-toggle-btn');
  trigger?.addEventListener('click',(e)=>{e.stopPropagation(); sw.classList.toggle('open')});
});
document.addEventListener('click',()=>langSwitchers.forEach(sw=>sw.classList.remove('open')));
document.addEventListener('keydown',e=>{if(e.key==='Escape')langSwitchers.forEach(sw=>sw.classList.remove('open'))});
setLang(localStorage.getItem(LANG_KEY)||'en');

/* --- Project detail modal (Portfolio page) ---
   Honest content only: no invented GitHub repo links or fake live-demo
   URLs per project. Links out to the real GitHub profile instead, since
   these are practice/concept projects without confirmed individual
   public repos or deployed URLs. */
const PROJECT_DETAILS = {
  inventory:{title:"Inventory Management System",category:"Systems",tags:["React","FastAPI","PostgreSQL"],
    desc:"A modern system concept for managing products, stock, customers and role-based operations — covering product catalogues, stock levels, customer records and permission-based access for different staff roles.",
    links:[{type:"github",url:"https://github.com/ngusmith2004",label:"View on GitHub"}]},
  smithgo:{title:"SmithGo Express",category:"Web",tags:["Web","UX","MERN"],
    desc:"A service-oriented travel booking web product (MongoDB/Express/React/Node) focused on clear booking flows, account management and accessible information architecture for both customers and travel agencies.",
    links:[{type:"github",url:"https://github.com/ngusmith2004",label:"View on GitHub"},{type:"live",url:"https://smithgo-express.netlify.app",label:"Open live site"}]},
  marketplace:{title:"Online Marketplace",category:"Web",tags:["Marketplace","Frontend"],
    desc:"An e-commerce style project exploring product discovery, catalogue organization, search/filtering and everyday user interactions of a marketplace experience.",
    links:[{type:"github",url:"https://github.com/ngusmith2004",label:"View on GitHub"}]},
  queue:{title:"Digital Queue Management",category:"Systems",tags:["System","Workflow"],
    desc:"A practical system concept for organizing queues digitally — reducing wait-time friction and giving staff a clearer live view of service flow.",
    links:[{type:"github",url:"https://github.com/ngusmith2004",label:"View on GitHub"}]},
  employee:{title:"Employee Management System",category:"Systems",tags:["Software","Database"],
    desc:"A structured management application concept for employee records, roles and everyday administrative workflows within an organization.",
    links:[{type:"github",url:"https://github.com/ngusmith2004",label:"View on GitHub"}]},
  design:{title:"Graphic Design Work",category:"Design",tags:["Design","Creative"],
    desc:"Branding, poster and visual design experiments that run alongside my engineering work — exploring layout, colour and visual identity.",
    links:[],pending:"Gallery coming soon — real design pieces are being added here."}
};
const modalEl = $('#projectModal');
if(modalEl && window.bootstrap){
  const bsModal = new bootstrap.Modal(modalEl);
  $$('.project-card[data-project]').forEach(card=>{
    card.setAttribute('role','button'); card.setAttribute('tabindex','0');
    const open=()=>{
      const key=card.dataset.project, p=PROJECT_DETAILS[key]; if(!p) return;
      $('#projectModalTitle',modalEl).textContent=p.title;
      $('#projectModalCategory',modalEl).textContent=p.category;
      $('#projectModalDesc',modalEl).textContent=p.desc;
      const tagWrap=$('#projectModalTags',modalEl); tagWrap.innerHTML='';
      p.tags.forEach(t=>{const s=document.createElement('span'); s.className='tag'; s.textContent=t; tagWrap.appendChild(s)});
      const linksWrap=$('#projectModalLinks',modalEl); linksWrap.innerHTML='';
      if(p.links && p.links.length){
        p.links.forEach(l=>{
          const a=document.createElement('a');
          a.href=l.url; a.target='_blank'; a.rel='noopener';
          a.className='mini-cta magnetic mt-3 me-2';
          const icon=l.type==='live'?'bi-box-arrow-up-right':'bi-github';
          a.innerHTML=`<i class="bi ${icon}"></i> ${l.label}`;
          linksWrap.appendChild(a);
        });
      } else if(p.pending){
        const note=document.createElement('p');
        note.className='small text-muted mt-3 mb-0 pending-note';
        note.innerHTML=`<i class="bi bi-hourglass-split"></i> ${p.pending}`;
        linksWrap.appendChild(note);
      }
      bsModal.show();
    };
    card.addEventListener('click',open);
    card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open()}});
  });
}
})();
