import { useState } from 'react';
import styles from './Game.module.css';
import { playSound } from '../../utils/sound';

interface Props {
  onComplete: () => void;
  isCompleted: boolean;
}

const QUESTIONS = [
  { q: '¿Qué significa "aguacero"?', options: ['Chuva forte', 'Água com açúcar', 'Rio', 'Lágrima'], a: 'Chuva forte' },
  { q: '¿Qué significa "embarazada"?', options: ['Envergonhada', 'Grávida', 'Brava', 'Atrasada'], a: 'Grávida' },
  { q: '¿Qué significa "ojalá"?', options: ['Olho mágico', 'Talvez', 'Tomara que sim', 'Nunca'], a: 'Tomara que sim' },
  { q: '¿Qué significa "exquisito"?', options: ['Esquisito', 'Feio', 'Delicioso', 'Caro'], a: 'Delicioso' },
  { q: '¿Qué significa "coche"?', options: ['Colchão', 'Carro', 'Noite', 'Coisa'], a: 'Carro' },
];

export default function Game1({ onComplete, isCompleted }: Props) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAns, setSelectedAns] = useState<string | null>(null);

  const handleSelect = (opt: string) => {
    if (selectedAns) return;
    setSelectedAns(opt);
    
    if (opt === QUESTIONS[currentQ].a) {
      playSound('success');
      if ('vibrate' in navigator) navigator.vibrate(100);
      
      setTimeout(() => {
        setSelectedAns(null);
        if (currentQ < QUESTIONS.length - 1) {
          setCurrentQ(c => c + 1);
        } else {
          onComplete();
        }
      }, 1000);
    } else {
      playSound('error');
      if ('vibrate' in navigator) navigator.vibrate([100, 50, 100]);
      setTimeout(() => setSelectedAns(null), 1000);
    }
  };

  if (isCompleted) {
    return (
      <div className={`${styles.gameCard} ${styles.completed}`}>
        <h3 className={styles.gameTitle}>Quiz de Vocabulário</h3>
        <p>✅ Nível Completado!</p>
      </div>
    );
  }

  return (
    <div className={styles.gameCard}>
      <h3 className={styles.gameTitle}>Nível 1: Quiz de Vocabulário</h3>
      <p className={styles.questionText}>{QUESTIONS[currentQ].q}</p>
      
      <div className={styles.optionsGrid}>
        {QUESTIONS[currentQ].options.map(opt => (
          <button
            key={opt}
            onClick={() => handleSelect(opt)}
            disabled={!!selectedAns}
            className={`${styles.optionBtn} ${
              selectedAns === opt 
                ? opt === QUESTIONS[currentQ].a ? styles.correct : styles.incorrect
                : ''
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}