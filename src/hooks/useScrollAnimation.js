import { useEffect, useRef } from 'react';

/**
 * useScrollAnimation
 * Attaches an IntersectionObserver to a container ref.
 * Any child with class "reveal", "reveal-left", or "reveal-right"
 * gets the "visible" class added when it enters the viewport.
 *
 * @param {Object} options - IntersectionObserver options
 * @returns {React.RefObject} - Attach to the container element
 */
export function useScrollAnimation(options = {}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const defaults = { threshold: 0.12, rootMargin: '0px 0px -40px 0px' };
    const config = { ...defaults, ...options };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger sibling reveals slightly
          const delay = i * 60;
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    }, config);

    const container = containerRef.current;
    if (!container) return;

    const targets = container.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return containerRef;
}

/**
 * useScrollAnimationGlobal
 * Observes the entire document (use in App.js for page-wide reveals).
 */
export function useScrollAnimationGlobal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, i * 60);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );

    const targets = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}