import { useEffect, useRef } from 'react';
import styles from './CelestialCarousel.module.css';

const IMAGES = Array.from({ length: 10 }, (_, i) => `/images/imagen-${i + 1}.png`);

export default function CelestialCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;
    let position = 0;

    const animate = () => {
      if (trackRef.current) {
        position -= 0.5; // Speed
        // Reset when half of the track (the original set) has scrolled
        if (position <= -(trackRef.current.scrollWidth / 2)) {
          position = 0;
        }
        trackRef.current.style.transform = `translateX(${position}px)`;
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className={styles.carouselContainer}>
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
        <h1>A fluência é uma jornada celestial</h1>
        <p>Cada desafio é um passo rumo ao domínio da língua e da cultura hispânica.</p>
      </div>
    </div>
  );
}