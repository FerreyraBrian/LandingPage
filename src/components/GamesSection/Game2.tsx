import { useState } from 'react';
import styles from './Game.module.css';
import { playSound } from '../../utils/sound';

interface Props {
  onComplete: () => void;
  isCompleted: boolean;
}

const QUESTIONS = [
  { q: "La palabra 'exquisito' significa 'esquisito' en portugués.", a: false },
  { q: "El verbo 'hablar' en pretérito perfecto es 'he hablado'.", a: true },
  { q: "'Yo soy' es la forma correcta para decir 'Eu estou'.", a: false },
  { q: "En español, 'llave' significa 'chave'.", a: true },
  { q: "'Apellido' significa 'apelido' en portugués.", a: false },
];

export default function Game2({ onComplete, isCompleted }: Props) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAns, setSelectedAns] = useState<boolean | null>(null);

  const handleSelect = (opt: boolean) => {
    if (selectedAns !== null) return;
    setSelectedAns(opt);
    
    if (opt === QUESTIONS[currentQ].a) {
      playSound('success');
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
      setTimeout(() => setSelectedAns(null), 1000);
    }
  };

  if (isCompleted) {
    return (
      <div className={`${styles.gameCard} ${styles.completed}`}>
        <h3 className={styles.gameTitle}>Verdadeiro ou Falso</h3>
        <p>✅ Nível Completado!</p>
      </div>
    );
  }

  return (
    <div className={styles.gameCard}>
      <h3 className={styles.gameTitle}>Nível 2: Verdadeiro ou Falso</h3>
      <p className={styles.questionText}>{QUESTIONS[currentQ].q}</p>
      
      <div className={styles.optionsGrid} style={{ gridTemplateColumns: '1fr 1fr' }}>
        <button
          onClick={() => handleSelect(true)}
          disabled={selectedAns !== null}
          className={`${styles.optionBtn} ${selectedAns === true ? (QUESTIONS[currentQ].a === true ? styles.correct : styles.incorrect) : ''}`}
        >
          Verdadeiro
        </button>
        <button
          onClick={() => handleSelect(false)}
          disabled={selectedAns !== null}
          className={`${styles.optionBtn} ${selectedAns === false ? (QUESTIONS[currentQ].a === false ? styles.correct : styles.incorrect) : ''}`}
        >
          Falso
        </button>
      </div>
    </div>
  );
}