document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#' || href === '') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        closeMobileNav();
      }
    });
  });

  // Hamburger menu
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');

  hamburger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    hamburger.classList.toggle('is-active', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  function closeMobileNav() {
    nav.classList.remove('is-open');
    hamburger.classList.remove('is-active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  // Inquiry popup
  const inquiryLink = document.getElementById('inquiry-link');
  const inquiryPopup = document.getElementById('inquiry-popup');
  const inquiryOverlay = document.getElementById('inquiry-overlay');
  const inquiryClose = document.getElementById('inquiry-close');

  function openInquiry(e) {
    e.preventDefault();
    inquiryPopup.classList.add('is-visible');
    inquiryOverlay.classList.add('is-visible');
    inquiryPopup.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    closeMobileNav();
  }

  function closeInquiry() {
    inquiryPopup.classList.remove('is-visible');
    inquiryOverlay.classList.remove('is-visible');
    inquiryPopup.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  inquiryLink.addEventListener('click', openInquiry);
  inquiryClose.addEventListener('click', closeInquiry);
  inquiryOverlay.addEventListener('click', closeInquiry);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && inquiryPopup.classList.contains('is-visible')) {
      closeInquiry();
    }
  });

  // Scroll reveal for cards
  const revealElements = document.querySelectorAll('.scroll-reveal');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  revealElements.forEach((el) => revealObserver.observe(el));
});
