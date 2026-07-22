document.addEventListener('DOMContentLoaded', function () {
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: .12 });
  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

  // mobile hamburger nav
  var t = document.querySelector('.nav-toggle'), n = document.querySelector('.nav');
  if (t && n) {
    t.addEventListener('click', function () { t.classList.toggle('open'); n.classList.toggle('open'); });
    n.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { t.classList.remove('open'); n.classList.remove('open'); }); });
  }

  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
});
