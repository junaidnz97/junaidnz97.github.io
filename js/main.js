// Junaid N Z — Portfolio interactions (vanilla JS, no dependencies)
(function () {
  'use strict';

  // Footer year
  var yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  var nav = document.getElementById('nav');
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');

  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close mobile menu after clicking a link
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Sticky nav shadow on scroll
  var onScroll = function () {
    if (window.scrollY > 8) {
      nav.classList.add('is-scrolled');
    } else {
      nav.classList.remove('is-scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Scrollspy: highlight nav link for the section in view
  var sections = Array.prototype.slice.call(document.querySelectorAll('main section[id]'));
  var navLinkMap = {};
  document.querySelectorAll('.nav-link[href^="#"]').forEach(function (link) {
    navLinkMap[link.getAttribute('href').slice(1)] = link;
  });

  if ('IntersectionObserver' in window && sections.length) {
    var spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var link = navLinkMap[entry.target.id];
          if (!link) return;
          if (entry.isIntersecting) {
            Object.values(navLinkMap).forEach(function (l) { l.classList.remove('is-active'); });
            link.classList.add('is-active');
          }
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    sections.forEach(function (section) { spy.observe(section); });
  }

  // Timeline cards: click to expand/collapse experience details
  document.querySelectorAll('.timeline-card').forEach(function (card) {
    card.addEventListener('click', function () {
      var isExpanded = card.getAttribute('aria-expanded') === 'true';
      card.setAttribute('aria-expanded', String(!isExpanded));
    });
  });
})();
