import { useEffect, useRef } from 'react';
import styles from './CelestialCarousel.module.css';

const IMAGES = Array.from({ length: 10 }, (_, i) => `/images/imagen-${i + 1}.png`);

export default function CelestialCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !trackRef.current) {
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    const shouldAnimate = !prefersReducedMotion && !isTouchDevice && window.innerWidth > 640;

    containerRef.current.style.setProperty('--track-offset', '0px');

    if (!shouldAnimate) {
      return;
    }

    let animationFrameId = 0;
    let position = 0;

    const animate = () => {
      position -= 0.35;

      if (position <= -(trackRef.current!.scrollWidth / 2)) {
        position = 0;
      }

      containerRef.current?.style.setProperty('--track-offset', `${position}px`);
      animationFrameId = window.requestAnimationFrame(animate);
    };

    animationFrameId = window.requestAnimationFrame(animate);

    return () => window.cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className={styles.carouselContainer} ref={containerRef}>
      <div className={styles.overlay}></div>
      <div className={styles.track} ref={trackRef}>
        {/* Duplicate the array to create an infinite scroll illusion */}
        {[...IMAGES, ...IMAGES].map((src, idx) => (
          <div key={idx} className={styles.slide}>
            <div className={styles.imagePlaceholder} style={{ backgroundImage: `url(${src})` }} />
          </div>
        ))}
      </div>
      
      <div className={styles.heroText}>
        <div className={styles.heroCopy}>
          <div className={styles.heroTitleBlock}>
            <h1>A fluência transforma o seu futuro</h1>
          </div>
          <div className={styles.heroSubtitleBlock}>
            <p>Domine o idioma espanhol com excelência e amplie suas oportunidades acadêmicas e profissionais.</p>
          </div>
        </div>
      </div>
    </div>
  );
}