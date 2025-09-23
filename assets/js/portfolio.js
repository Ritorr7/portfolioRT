/* Parallax + cambio de pose con el scroll */
(function(){
  const visual = document.querySelector('.hero-visual');
  if(!visual) return;
  const pose1 = visual.querySelector('.pose-1');
  const pose2 = visual.querySelector('.pose-2');

  const lerp = (a,b,t)=>a+(b-a)*t;

  function onScroll(){
    const vh = window.innerHeight;
    const y = window.scrollY;
    // Parallax suave: se mueve un poco hacia arriba
    const shift = Math.min(20, y * 0.04); // máx 20px
    pose1.style.transform = `translate3d(0px, ${-shift}px, 0)`;
    pose2.style.transform = `translate3d(0px, ${-shift}px, 0)`;

    // Cambio de pose: cuando pasamos 40% de la altura de la pantalla
    const t = Math.min(1, Math.max(0, (y / (vh*0.4))));
    // t: 0 (inicio) -> 1 (pasado el umbral)
    pose1.style.opacity = String(lerp(1, 0, t));
    pose2.style.opacity = String(lerp(0, 1, t));
  }

  // Primer pintado
  onScroll();
  window.addEventListener('scroll', onScroll, {passive:true});
})();

/* (Opcional) Smooth scroll para links internos en navegadores viejos */
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const id = a.getAttribute('href');
    const el = document.querySelector(id);
    if(!el) return;
    e.preventDefault();
    el.scrollIntoView({behavior:'smooth', block:'start'});
  });
});
