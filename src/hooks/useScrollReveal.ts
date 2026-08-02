import { useEffect } from 'react';

export function useScrollReveal() {
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    const shouldSkipAnimation = prefersReducedMotion || isTouchDevice || window.innerWidth <= 640;

    const elements = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));

    if (shouldSkipAnimation) {
      elements.forEach((element) => element.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const children = Array.from(entry.target.querySelectorAll<HTMLElement>('*'));
          children.forEach((child, index) => {
            child.style.transitionDelay = `${index * 35}ms`;
            child.classList.add('visible');
          });

          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.2 });

    elements.forEach((element) => observer.observe(element));

    return () => {
      elements.forEach((element) => observer.unobserve(element));
    };
  }, []);
}
