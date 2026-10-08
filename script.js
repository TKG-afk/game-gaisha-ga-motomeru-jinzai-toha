"use strict";
const stage=document.getElementById('stage');
const slides=[...document.querySelectorAll('.slide')];
const prev=document.getElementById('prev'),next=document.getElementById('next');
let current=0;
function resize(){const scale=Math.min(innerWidth/1920,innerHeight/1080);stage.style.transform=`scale(${scale})`;stage.style.left=`${(innerWidth-1920*scale)/2}px`;stage.style.top=`${(innerHeight-1080*scale)/2}px`;}
function show(index){current=Math.max(0,Math.min(slides.length-1,index));slides.forEach((s,i)=>{s.classList.toggle('active',i===current);s.setAttribute('aria-hidden',String(i!==current));});document.getElementById('counter').textContent=`${String(current+1).padStart(2,'0')} / ${slides.length}`;document.getElementById('progress').style.width=`${(current+1)/slides.length*100}%`;prev.disabled=current===0;next.disabled=current===slides.length-1;history.replaceState(null,'',`#${current+1}`);}
async function fullscreen(){try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen();}catch(error){document.getElementById('status').textContent='全画面にできませんでした。ブラウザの F11 も利用できます。';}}
prev.addEventListener('click',()=>show(current-1));next.addEventListener('click',()=>show(current+1));document.getElementById('fullscreen').addEventListener('click',fullscreen);
stage.addEventListener('click',e=>{if(e.target.closest('button,nav,a'))return;const r=stage.getBoundingClientRect();show(current+(e.clientX-r.left<r.width*.25?-1:1));});
document.addEventListener('keydown',e=>{if(e.ctrlKey||e.metaKey||e.altKey||e.target.closest('input,textarea,select')||(e.target.closest('button')&&[' ','Enter'].includes(e.key)))return;if(['ArrowRight','PageDown',' '].includes(e.key)){e.preventDefault();if(!e.repeat)show(current+1);}else if(['ArrowLeft','PageUp'].includes(e.key)){e.preventDefault();if(!e.repeat)show(current-1);}else if(e.key==='Home'){e.preventDefault();show(0);}else if(e.key==='End'){e.preventDefault();show(slides.length-1);}else if(e.key.toLowerCase()==='f'){e.preventDefault();if(!e.repeat)fullscreen();}else if(e.key==='Escape'&&document.fullscreenElement){document.exitFullscreen().catch(()=>{});}});
window.addEventListener('resize',resize);window.addEventListener('hashchange',()=>show((parseInt(location.hash.slice(1),10)||1)-1));
document.addEventListener('fullscreenchange',()=>{document.getElementById('status').textContent='';resize();});
resize();show((parseInt(location.hash.slice(1),10)||1)-1);
