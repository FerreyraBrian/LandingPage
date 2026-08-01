import { useState } from 'react';
import styles from './GamesSection.module.css';
import Game1 from './Game1';
import Game2 from './Game2';
import Game3 from './Game3';
import Game4 from './Game4';
import Game5 from './Game5';
import RegistrationModal from './RegistrationModal';
import { fireConfetti } from '../../utils/confetti';
import { playSound } from '../../utils/sound';

export default function GamesSection() {
  const [unlockedLevel, setUnlockedLevel] = useState(0); // 0 = locked, 1 = game 1, etc.
  const [showModal, setShowModal] = useState(false);

  const handleStartClick = () => {
    setShowModal(true);
  };

  const handleRegistrationSuccess = () => {
    setShowModal(false);
    setUnlockedLevel(1);
    playSound('success');
    fireConfetti();
  };

  const handleLevelComplete = (nextLevel: number) => {
    playSound('success');
    fireConfetti();
    setTimeout(() => {
      setUnlockedLevel(nextLevel);
    }, 1500);
  };

  const getGameStyle = (levelIndex: number) => {
    if (unlockedLevel > levelIndex) {
      return {
        opacity: 0.7,
        transform: 'scale(0.95)',
        pointerEvents: 'none' as const,
        filter: 'grayscale(50%)'
      };
    }
    if (unlockedLevel === levelIndex) {
      return {
        opacity: 1,
        transform: 'scale(1)',
        boxShadow: '0 0 30px rgba(255, 183, 0, 0.3)',
        zIndex: 10
      };
    }
    return {
      opacity: 0.6,
      transform: 'scale(0.9)',
      pointerEvents: 'none' as const,
      filter: 'blur(1.5px)'
    };
  };

  return (
    <section className={`${styles.section} reveal`}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Tobogã de Emoções</h2>
          <p>Desvende os enigmas e descubra a profundidade do seu conhecimento em espanhol.</p>
        </div>

        <div className={styles.gamesContainer} style={{ display: 'flex', flexDirection: 'column', gap: '30px', position: 'relative' }}>
          
          {unlockedLevel === 0 && (
            <div className={styles.lockedOverlayAbsolute}>
              <div className={styles.lockedOverlayContent}>
                <h3>Preparado para a Jornada?</h3>
                <p style={{ marginBottom: '20px', color: 'var(--blue-sky)' }}>Registre-se para iniciar sua imersão cultural e linguística.</p>
                <button className={styles.startBtn} onClick={handleStartClick}>
                  COMEÇAR
                </button>
              </div>
            </div>
          )}

          <div className={styles.gameWrapper} style={{ ...getGameStyle(1), transition: 'all 0.6s ease' }}>
            {unlockedLevel >= 1 ? (
               <Game1 onComplete={() => handleLevelComplete(2)} isCompleted={unlockedLevel > 1} />
            ) : (
               <div className={styles.gamePlaceholderCard}>
                 <h3 style={{color: 'var(--white)', fontSize: '2rem'}}>Nível 1</h3>
                 <p>Quiz de Vocabulário</p>
               </div>
            )}
          </div>

          <div className={styles.gameWrapper} style={{ ...getGameStyle(2), transition: 'all 0.6s ease' }}>
             {unlockedLevel >= 2 ? (
               <Game2 onComplete={() => handleLevelComplete(3)} isCompleted={unlockedLevel > 2} />
            ) : (
               <div className={styles.gamePlaceholderCard}>
                 <h3 style={{color: 'var(--white)', fontSize: '2rem'}}>Nível 2</h3>
                 <p>Verdadeiro ou Falso</p>
               </div>
            )}
          </div>

          <div className={styles.gameWrapper} style={{ ...getGameStyle(3), transition: 'all 0.6s ease' }}>
             {unlockedLevel >= 3 ? (
               <Game3 onComplete={() => handleLevelComplete(4)} isCompleted={unlockedLevel > 3} />
            ) : (
               <div className={styles.gamePlaceholderCard}>
                 <h3 style={{color: 'var(--white)', fontSize: '2rem'}}>Nível 3</h3>
                 <p>Completar a Frase</p>
               </div>
            )}
          </div>

          <div className={styles.gameWrapper} style={{ ...getGameStyle(4), transition: 'all 0.6s ease' }}>
             {unlockedLevel >= 4 ? (
               <Game4 onComplete={() => handleLevelComplete(5)} isCompleted={unlockedLevel > 4} />
            ) : (
               <div className={styles.gamePlaceholderCard}>
                 <h3 style={{color: 'var(--white)', fontSize: '2rem'}}>Nível 4</h3>
                 <p>Ordenar as Palavras</p>
               </div>
            )}
          </div>

          <div className={styles.gameWrapper} style={{ ...getGameStyle(5), transition: 'all 0.6s ease' }}>
             {unlockedLevel >= 5 ? (
               <Game5 onComplete={() => handleLevelComplete(6)} isCompleted={unlockedLevel > 5} />
            ) : (
               <div className={styles.gamePlaceholderCard}>
                 <h3 style={{color: 'var(--yellow-horizon)', fontSize: '2rem'}}>Nível 5 🌟</h3>
                 <p>O Grande Desafio Final</p>
               </div>
            )}
          </div>
          
          {unlockedLevel === 6 && (
            <div className={styles.finalSuccess}>
              <h3 style={{ fontSize: '3rem' }}>¡Enhorabuena! 🎉🏆</h3>
              <p style={{ fontSize: '1.5rem', marginTop: '20px', color: 'var(--yellow-horizon)' }}>
                Você concluiu com maestria todos os níveis do nosso Tobogã de Emoções. 
                <br/>Sua jornada celestial com o idioma espanhol está apenas começando!
              </p>
              <p style={{ marginTop: '20px' }}>Nossa equipe de coordenação acadêmica entrará em contato em breve para guiar seus próximos passos.</p>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <RegistrationModal 
          onClose={() => setShowModal(false)} 
          onSuccess={handleRegistrationSuccess} 
        />
      )}
    </section>
  );
}
