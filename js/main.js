(function(){
var b=document.getElementById('burger'),m=document.getElementById('menu');
b.addEventListener('click',function(){var o=m.classList.toggle('open');b.setAttribute('aria-expanded',o);b.textContent=o?'✕':'☰'});
m.addEventListener('click',function(e){if(e.target.tagName==='A'){m.classList.remove('open');b.setAttribute('aria-expanded','false');b.textContent='☰'}});
var els=document.querySelectorAll('.rv');
if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.08});els.forEach(function(e){io.observe(e)})}else{els.forEach(function(e){e.classList.add('in')})}
var links=[].slice.call(m.querySelectorAll('a'));
if('IntersectionObserver' in window){var so=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){links.forEach(function(a){a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id)})}})},{rootMargin:'-45% 0px -50% 0px'});['home','about','interests','work','writing','links'].forEach(function(id){var s=document.getElementById(id);if(s)so.observe(s)})}
var c=document.getElementById('sky'),x=c.getContext('2d'),W,H,P=[],reduce=matchMedia('(prefers-reduced-motion:reduce)').matches,raf,sy=0;
function col(){return getComputedStyle(document.documentElement).getPropertyValue('--dot').trim()||'212,185,129'}
var rgb=col();
matchMedia('(prefers-color-scheme:dark)').addEventListener&&matchMedia('(prefers-color-scheme:dark)').addEventListener('change',function(){setTimeout(function(){rgb=col()},50)});
function size(){var d=Math.min(devicePixelRatio||1,2);W=innerWidth;H=innerHeight;c.width=W*d;c.height=H*d;x.setTransform(d,0,0,d,0,0);var n=W<700?38:72;P=[];for(var i=0;i<n;i++)P.push({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.18,vy:(Math.random()-.5)*.18,r:Math.random()*1.3+.4,z:Math.random()*.6+.2})}
function draw(){x.clearRect(0,0,W,H);
for(var i=0;i<P.length;i++){var p=P[i];if(!reduce){p.x+=p.vx;p.y+=p.vy;if(p.x<0)p.x=W;if(p.x>W)p.x=0;if(p.y<0)p.y=H;if(p.y>H)p.y=0}
var py=p.y-sy*.06*p.z*8;py=((py%H)+H)%H;
x.fillStyle='rgba('+rgb+','+(.25+p.z*.5)+')';x.beginPath();x.arc(p.x,py,p.r,0,6.283);x.fill();p._y=py;
for(var j=i+1;j<P.length;j++){var q=P[j],dx=p.x-q.x,dy=py-(q._y===undefined?q.y:q._y),d=dx*dx+dy*dy;if(d<14000){x.strokeStyle='rgba('+rgb+','+(.14*(1-d/14000))+')';x.lineWidth=.6;x.beginPath();x.moveTo(p.x,py);x.lineTo(q.x,q._y===undefined?q.y:q._y);x.stroke()}}}
if(!reduce)raf=requestAnimationFrame(draw)}
addEventListener('scroll',function(){sy=scrollY;if(reduce)draw()},{passive:true});
addEventListener('resize',function(){size();if(reduce)draw()});
document.addEventListener('visibilitychange',function(){if(document.hidden)cancelAnimationFrame(raf);else if(!reduce)draw()});
size();draw();
})();
