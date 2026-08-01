import { useEffect, useRef } from 'react';
import styles from './CelestialCarousel.module.css';

const IMAGES = Array.from({ length: 10 }, (_, i) => `/images/imagen-${i + 1}.png`);

export default function CelestialCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;
    let position = 0;

    // Clear any stale inline transforms from previous hot-reload states.
    if (containerRef.current) {
      const topBrandEl = containerRef.current.querySelector(`.${styles.heroTopBrand}`) as HTMLDivElement | null;
      if (topBrandEl) {
        topBrandEl.style.transform = '';
      }
    }

    if (trackRef.current) {
      trackRef.current.style.transform = '';
    }

    const animate = () => {
      if (trackRef.current) {
        position -= 0.5; // Speed
        // Reset when half of the track (the original set) has scrolled
        if (position <= -(trackRef.current.scrollWidth / 2)) {
          position = 0;
        }
        if (containerRef.current) {
          containerRef.current.style.setProperty('--track-offset', `${position}px`);
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className={styles.carouselContainer} ref={containerRef}>
      <div className={styles.overlay}></div>
      <div className={styles.track} ref={trackRef}>
        {/* Duplicate the array to create an infinite scroll illusion */}
        {[...IMAGES, ...IMAGES].map((src, idx) => (
          <div key={idx} className={styles.slide}>
            <div className={styles.imagePlaceholder} style={{ backgroundImage: `url(${src})` }}>
              <span className={styles.placeholderText}>Imagen { (idx % 10) + 1 }</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className={styles.heroText}>
        <div className={styles.heroCopy}>
          <h1>A fluência transforma o seu futuro</h1>
          <p>Domine o idioma espanhol com excelência e amplie suas oportunidades acadêmicas e profissionais.</p>
        </div>
      </div>
    </div>
  );
}