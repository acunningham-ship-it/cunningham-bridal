document.addEventListener('DOMContentLoaded', function () {
  // ---- scroll reveals ----
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: .12, rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('.reveal:not(.in)').forEach(function (el) { io.observe(el); });

  // ---- header: solid on scroll; transparent while over the hero ----
  var top = document.querySelector('.top');
  var hero = document.querySelector('.hero, .subhero');
  function onScroll() {
    var y = window.scrollY;
    if (top) top.classList.toggle('solid', y > 30);
  }
  if (top && !hero) top.classList.add('solid');
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---- mobile hamburger ----
  var t = document.querySelector('.nav-toggle'), n = document.querySelector('.nav');
  if (t && n) {
    t.addEventListener('click', function () { t.classList.toggle('open'); n.classList.toggle('open'); });
    n.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { t.classList.remove('open'); n.classList.remove('open'); });
    });
  }

  // ---- lightbox (gallery cells + filmstrip frames) ----
  var lb = document.getElementById('lightbox');
  if (lb) {
    var lbImg = lb.querySelector('img');
    function openLb(src) { lbImg.src = src; lb.classList.add('on'); document.body.style.overflow = 'hidden'; }
    function closeLb() { lb.classList.remove('on'); document.body.style.overflow = ''; }
    document.querySelectorAll('.gcell img, .frame img').forEach(function (img) {
      img.parentElement.addEventListener('click', function () {
        if (img.parentElement.dataset.dragged === '1') return; // ignore drag-release
        openLb(img.currentSrc || img.src);
      });
    });
    lb.addEventListener('click', function (e) { if (e.target === lb || e.target.classList.contains('x')) closeLb(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeLb(); });
  }

  // ---- signature filmstrip: drag-to-scroll (desktop) + swipe (native) ----
  document.querySelectorAll('[data-strip]').forEach(function (strip) {
    var down = false, moved = false, startX = 0, startScroll = 0;
    strip.addEventListener('pointerdown', function (e) {
      down = true; moved = false; startX = e.clientX; startScroll = strip.scrollLeft;
      strip.setPointerCapture(e.pointerId);
    });
    strip.addEventListener('pointermove', function (e) {
      if (!down) return;
      var dx = e.clientX - startX;
      if (Math.abs(dx) > 6) { moved = true; strip.classList.add('drag'); }
      strip.scrollLeft = startScroll - dx;
    });
    function release(e) {
      if (!down) return;
      down = false; strip.classList.remove('drag');
      var frame = e.target.closest ? e.target.closest('.frame') : null;
      if (frame) { frame.dataset.dragged = moved ? '1' : '0'; if (moved) setTimeout(function () { frame.dataset.dragged = '0'; }, 40); }
    }
    strip.addEventListener('pointerup', release);
    strip.addEventListener('pointercancel', function () { down = false; strip.classList.remove('drag'); });
    // vertical wheel -> horizontal scroll on desktop
    strip.addEventListener('wheel', function (e) {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) { strip.scrollLeft += e.deltaY; e.preventDefault(); }
    }, { passive: false });
  });

  var yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();
});
