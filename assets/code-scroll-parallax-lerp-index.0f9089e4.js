import"./setWindowSize.73fff501.js";import"./code.c9d20024.js";const n=document.documentElement,a=document.querySelectorAll("*[data-scroll]"),m=Array.from(a),d=(t,s,r)=>(1-r)*t+r*s;let l=0,e=0,o=n.scrollTop;const c=()=>{o=n.scrollTop,document.documentElement.dataset.fixed==="true"&&(o=parseInt(document.body.style.top,10)*-1),e=d(e,o,.1),l=Math.round((o-e)*10)/10,m.forEach(t=>{t.style.transform=`translateY(${l}px)`}),requestAnimationFrame(c)};c();
