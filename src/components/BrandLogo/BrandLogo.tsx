import styles from './BrandLogo.module.css';

type BrandLogoSize = 'header' | 'hero' | 'footer';
type BrandLogoTone = 'light' | 'brand';

interface BrandLogoProps {
  size?: BrandLogoSize;
  tone?: BrandLogoTone;
  showCircle?: boolean;
  showMonogram?: boolean;
}

export default function BrandLogo({
  size = 'header',
  tone = 'light',
  showCircle = true,
  showMonogram = true,
}: BrandLogoProps) {
  const circleClass = tone === 'brand' ? styles.brandCircle : styles.lightCircle;
  const textOnlyClass = showMonogram ? '' : styles.textOnly;

  return (
    <div className={`${styles.logoShell} ${styles[size]} ${showCircle ? '' : styles.noCircle} ${textOnlyClass}`}>
      {showCircle ? <div className={`${styles.circle} ${circleClass}`} aria-hidden="true" /> : null}
      <div className={`${styles.logoContent} ${showMonogram ? '' : styles.noMonogram}`}>
        {showMonogram ? (
          <div className={styles.monogram} aria-hidden="true">
            <span className={`${styles.letter} ${styles.letterHLeft}`}>H</span>
            <span className={`${styles.letter} ${styles.letterHRight}`}>H</span>
            <span className={`${styles.letter} ${styles.letterE}`}>E</span>
          </div>
        ) : null}
        <div className={styles.wordmarkBlock}>
          <span className={styles.wordmark}>Horizonte Espanhol</span>
          <span className={styles.tagline}>IDIOMA & CULTURA</span>
        </div>
      </div>
    </div>
  );
}