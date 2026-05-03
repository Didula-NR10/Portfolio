import { useEffect, useRef } from 'react';

export function useScrollAnimation() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    const els = document.querySelectorAll('.animate-up');
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  });
}

export function useStaggered(selector = '.animate-up') {
  useEffect(() => {
    const els = document.querySelectorAll(selector);
    els.forEach((el, i) => {
      el.style.transitionDelay = `${i * 0.08}s`;
    });
  });
}