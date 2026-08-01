import { useState } from 'react';
import type { CSSProperties } from 'react';
import styles from './GamesSection.module.css';
import Game1 from './Game1';
import Game2 from './Game2';
import Game3 from './Game3';
import Game4 from './Game4';
import Game5 from './Game5';
import RegistrationModal from './RegistrationModal';
import { fireConfetti } from '../../utils/confetti';
import { playSound } from '../../utils/sound';

type GameMeta = {
  level: number;
  title: string;
  subtitle: string;
};

const GAMES: GameMeta[] = [
  { level: 1, title: 'Quiz de Vocabulário', subtitle: 'Fortaleça sua base lexical com precisão.' },
  { level: 2, title: 'Verdadeiro ou Falso', subtitle: 'Treine leitura e interpretação com agilidade.' },
  { level: 3, title: 'Completar a Frase', subtitle: 'Aprimore estrutura e contexto em espanhol.' },
  { level: 4, title: 'Ordenar as Palavras', subtitle: 'Domine sintaxe e construção natural.' },
  { level: 5, title: 'O Grande Desafio Final', subtitle: 'Integre tudo em uma prova de fluência.' },
];

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

  const renderGame = (level: number) => {
    if (level === 1) {
      return <Game1 onComplete={() => handleLevelComplete(2)} isCompleted={false} />;
    }
    if (level === 2) {
      return <Game2 onComplete={() => handleLevelComplete(3)} isCompleted={false} />;
    }
    if (level === 3) {
      return <Game3 onComplete={() => handleLevelComplete(4)} isCompleted={false} />;
    }
    if (level === 4) {
      return <Game4 onComplete={() => handleLevelComplete(5)} isCompleted={false} />;
    }
    return <Game5 onComplete={() => handleLevelComplete(6)} isCompleted={false} />;
  };

  const progressLevel = unlockedLevel === 0 ? 1 : Math.min(unlockedLevel, 5);

  return (
    <section className={`${styles.section} reveal`}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Desafio de Proficiência</h2>
          <p>Teste seus conhecimentos e descubra seu nível de domínio do idioma espanhol.</p>
        </div>

        <div className={styles.gamesContainer}>
          {unlockedLevel < 6 && (
            <div className={styles.deckStack}>
              {GAMES.map((game) => {
                const isCompleted = unlockedLevel > game.level;
                const isCurrent = game.level === progressLevel;
                const isLocked = game.level > progressLevel;
                const isNext = isLocked && game.level === progressLevel + 1;
                const showStartForFirst = unlockedLevel === 0 && game.level === 1;
              const cardClass = [
                styles.levelCard,
                isCurrent ? styles.currentCard : '',
                isCompleted ? styles.completedCard : '',
                isNext ? styles.nextCard : '',
                isLocked ? styles.lockedCard : '',
              ]
                .filter(Boolean)
                .join(' ');

              return (
                <article
                  key={game.level}
                  className={cardClass}
                  style={{ '--card-index': game.level } as CSSProperties}
                >
                  <div className={styles.cardTopLine}>
                    <span className={styles.levelPill}>Nível {game.level}</span>
                    <span className={styles.cardStatus}>
                      {isCompleted
                        ? 'Concluído'
                        : showStartForFirst
                          ? 'Pronto para iniciar'
                          : isCurrent
                            ? 'Em jogo'
                            : isNext
                              ? 'Próxima recompensa'
                              : 'Aguardando desbloqueio'}
                    </span>
                  </div>

                  <h3>{game.title}</h3>
                  <p>{game.subtitle}</p>

                  {isCurrent && unlockedLevel > 0 && (
                    <div className={styles.activeGameShell}>{renderGame(game.level)}</div>
                  )}

                  {showStartForFirst && (
                    <div className={styles.lockedCardContent}>
                      <p>
                        Registre-se gratuitamente para liberar a primeira seção e iniciar o seu desafio interativo.
                      </p>
                      <button className={styles.startBtn} onClick={handleStartClick}>
                        INICIAR DESAFIO
                      </button>
                    </div>
                  )}

                  {isLocked && !showStartForFirst && (
                    <div className={styles.lockHint}>
                      {isNext
                        ? 'Conclua a carta atual para revelar esta próxima etapa.'
                        : 'Esta etapa permanece em sombra até seu avanço contínuo.'}
                    </div>
                  )}
                </article>
              );
              })}
            </div>
          )}

          {unlockedLevel === 6 && (
            <div className={styles.finalSuccess}>
              <h3 style={{ fontSize: '3rem' }}>¡Enhorabuena! 🏆</h3>
              <p style={{ fontSize: '1.5rem', marginTop: '20px', color: 'var(--yellow-horizon)' }}>
                Você concluiu com excelência todos os níveis da nossa Avaliação de Proficiência. 
                <br/>Sua jornada rumo à fluência definitiva no idioma espanhol começa agora.
              </p>
              <p style={{ marginTop: '20px' }}>Nossa coordenação acadêmica entrará em contato em breve para apresentar a proposta ideal para o seu desenvolvimento.</p>
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
