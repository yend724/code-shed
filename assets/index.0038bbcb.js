import{s as b}from"./setWindowSize.73fff501.js";import{S as z,F as W,W as C,C as S,B as f,M as A,a as E,P as H,D as k,b as I}from"./three.module.1d482df2.js";const X=()=>{const n=new z;n.fog=new W(0,50,150);const a=new C({canvas:document.querySelector("#bgCanvas")});a.setClearColor(new S(0)),a.setSize(window.innerWidth,window.innerHeight),a.setPixelRatio(window.devicePixelRatio);const v=new f(1,1,1),L=new A({color:4342338}),w=100,P=Array.from({length:125}).map(e=>{const t=new E(v,L),c=1-Math.random()*.5,i=1+Math.random()*5,h=(Math.random()-.5)*w,r=(Math.random()-.5)*w,s=(Math.random()-.5)*w,p=Math.random()*Math.PI*2,d=Math.random()*Math.PI*2,l=Math.random()*Math.PI*2;return t.position.set(h,r,s),t.rotation.set(p,d,l),t.scale.set(i,i,i),n.add(t),{target:t,speed:c}}),o=new H(45,window.innerWidth/window.innerHeight,.1,500);o.position.set(0,0,75),o.lookAt(n.position);const m=new k(16777215,1);m.position.set(0,100,100),n.add(m);const M=new I(1713022);M.position.set(0,0,0),n.add(M);let g=0,y=0;window.addEventListener("pointermove",e=>{g=e.clientX/window.innerWidth-.5,y=e.clientY/window.innerHeight-.5}),window.addEventListener("resize",()=>{o.aspect=window.innerWidth/window.innerHeight,o.updateProjectionMatrix(),o.lookAt(n.position),a.setSize(window.innerWidth,window.innerHeight)});let u=0;const x=e=>{e=e||0;const t=(e-u)/1e3;u=e,P.forEach((h,r)=>{const{target:s,speed:p}=h,d=e||0;s.position.x+=Math.sin(d/1e3+r)*.03,s.position.y+=Math.cos(d/1e3+r)*.05,s.position.z+=Math.sin(d/1e3+r)*.07,["x","y","z"].forEach(l=>{s.rotation[l]+=t*p})});const c={x:g*30,y:y*30*-1};o.position.x+=(c.x-o.position.x)*.03,o.position.y+=(c.y-o.position.y)*.03;const i={x:o.position.x/3,y:o.position.y/3,z:0};o.lookAt(i.x,i.y,i.z),a.render(n,o),requestAnimationFrame(x)};x()},Y=()=>{b(),X()},D=()=>{const n=document.body;n.dataset.loaded="true"};window.addEventListener("DOMContentLoaded",Y);window.addEventListener("load",D);