document.addEventListener('DOMContentLoaded', function () {
  // scroll reveals
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: .14, rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('.reveal:not(.in)').forEach(function (el) { io.observe(el); });

  // header: shrink/solid on scroll; flip text color once past the hero
  var top = document.querySelector('.top');
  var hero = document.querySelector('.hero');
  function onScroll() {
    var y = window.scrollY;
    if (top) top.classList.toggle('solid', y > 40);
    if (top && hero) {
      var flip = hero.offsetHeight - 90;
      top.classList.toggle('on-hero', y < flip);
    }
  }
  if (top && !hero) top.classList.add('solid'); // sub-pages: solid from the start
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // mobile hamburger
  var t = document.querySelector('.nav-toggle'), n = document.querySelector('.nav');
  if (t && n) {
    t.addEventListener('click', function () { t.classList.toggle('open'); n.classList.toggle('open'); });
    n.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { t.classList.remove('open'); n.classList.remove('open'); }); });
  }

  // lightbox gallery
  var lb = document.getElementById('lightbox');
  if (lb) {
    var lbImg = lb.querySelector('img');
    document.querySelectorAll('.gcell img').forEach(function (img) {
      img.parentElement.addEventListener('click', function () { lbImg.src = img.src; lb.classList.add('on'); document.body.style.overflow = 'hidden'; });
    });
    function close() { lb.classList.remove('on'); document.body.style.overflow = ''; }
    lb.addEventListener('click', function (e) { if (e.target === lb || e.target.classList.contains('x')) close(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  }

  var yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();
});
