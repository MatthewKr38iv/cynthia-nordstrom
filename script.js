(function(){
  document.documentElement.classList.add('js');
  // phone menu
  var btn=document.querySelector('.menu-btn'), nav=document.getElementById('nav');
  if(btn&&nav){btn.addEventListener('click',function(){var o=nav.classList.toggle('open');btn.setAttribute('aria-expanded',o?'true':'false');});
    nav.addEventListener('click',function(e){if(e.target.tagName==='A'){nav.classList.remove('open');btn.setAttribute('aria-expanded','false');}});}
  // hero slideshow (her homepage slider)
  var slides=document.querySelectorAll('.slide');
  var still=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(slides.length>1&&!still){var i=0;setInterval(function(){slides[i].classList.remove('is-on');i=(i+1)%slides.length;
    var img=slides[i].querySelector('img');if(img)img.loading='eager';slides[i].classList.add('is-on');},5000);
    slides.forEach(function(s,k){if(k===1){var im=s.querySelector('img');if(im)im.loading='eager';}});}
  // lightbox
  var links=[].slice.call(document.querySelectorAll('a.lb'));
  if(!links.length)return;
  var webp=(function(){try{return document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp')===0}catch(e){return false}})();
  var box=document.createElement('div');box.className='lightbox';box.hidden=true;box.setAttribute('role','dialog');box.setAttribute('aria-modal','true');box.setAttribute('aria-label','Photo viewer');
  box.innerHTML='<img alt=""><button class="lb-btn lb-close" type="button" aria-label="Close">&times;</button><button class="lb-btn lb-prev" type="button" aria-label="Previous photo">&#8249;</button><button class="lb-btn lb-next" type="button" aria-label="Next photo">&#8250;</button><div class="lb-count" aria-live="polite"></div>';
  document.body.appendChild(box);
  var img=box.querySelector('img'),count=box.querySelector('.lb-count'),cur=0,last=null;
  function src(a){return (!webp&&a.dataset.fallback)?a.dataset.fallback:a.href}
  function show(n){cur=(n+links.length)%links.length;var a=links[cur];img.src=src(a);var t=a.querySelector('img');img.alt=t?t.alt:'';count.textContent=(cur+1)+' / '+links.length;
    [cur+1,cur-1].forEach(function(k){var b=links[(k+links.length)%links.length];var p=new Image();p.src=src(b);});}
  function open(n){last=document.activeElement;box.hidden=false;document.body.style.overflow='hidden';show(n);box.querySelector('.lb-close').focus();}
  function close(){box.hidden=true;img.removeAttribute('src');document.body.style.overflow='';if(last)last.focus();}
  links.forEach(function(a,k){a.addEventListener('click',function(e){if(e.metaKey||e.ctrlKey)return;e.preventDefault();open(k);});});
  box.querySelector('.lb-close').onclick=close;
  box.querySelector('.lb-prev').onclick=function(){show(cur-1)};
  box.querySelector('.lb-next').onclick=function(){show(cur+1)};
  box.addEventListener('click',function(e){if(e.target===box)close();});
  document.addEventListener('keydown',function(e){if(box.hidden)return;if(e.key==='Tab'){var f=[].slice.call(box.querySelectorAll('button'));var i=f.indexOf(document.activeElement);e.preventDefault();var n=e.shiftKey?(i<=0?f.length-1:i-1):(i+1)%f.length;f[n].focus();return;}if(e.key==='Escape')close();else if(e.key==='ArrowLeft')show(cur-1);else if(e.key==='ArrowRight')show(cur+1);});
  var x0=null;box.addEventListener('touchstart',function(e){x0=e.touches[0].clientX},{passive:true});
  box.addEventListener('touchend',function(e){if(x0===null)return;var dx=e.changedTouches[0].clientX-x0;if(Math.abs(dx)>40)show(cur+(dx<0?1:-1));x0=null;});
})();
