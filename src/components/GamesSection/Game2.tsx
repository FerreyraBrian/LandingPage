import { useState } from 'react';
import styles from './Game.module.css';
import { playSound } from '../../utils/sound';
import type { GameAnswer } from './gameStorage';

interface Props {
  onComplete: (answers: GameAnswer[], correctCount: number) => void;
  isCompleted: boolean;
}

const QUESTIONS = [
  {
    q: 'A forma correta de "Yo soy profesora" para um homem é "Yo soy profesor".',
    a: true,
  },
  {
    q: 'Em espanhol, "Eu como" se traduz como "Yo come".',
    a: false,
  },
  {
    q: '"Mi hermana es alta y delgada" descreve um aspecto físico.',
    a: true,
  },
  {
    q: 'A tradução de "Eu tenho um gato" em espanhol é "Yo tengo una casa".',
    a: false,
  },
  {
    q: 'Para dizer "estar cansado" em espanhol, usa-se o verbo "estar".',
    a: true,
  },
];

export default function Game2({ onComplete, isCompleted }: Props) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAns, setSelectedAns] = useState<boolean | null>(null);
  const [answers, setAnswers] = useState<GameAnswer[]>([]);

  const handleSelect = (opt: boolean) => {
    if (selectedAns !== null) return;
    setSelectedAns(opt);

    const isCorrect = opt === QUESTIONS[currentQ].a;
    const nextAnswers = [...answers, { question: QUESTIONS[currentQ].q, isCorrect }];
    setAnswers(nextAnswers);

    if (isCorrect) {
      playSound('success');
      setTimeout(() => {
        setSelectedAns(null);
        if (currentQ < QUESTIONS.length - 1) {
          setCurrentQ((c) => c + 1);
        } else {
          onComplete(nextAnswers, nextAnswers.filter((item) => item.isCorrect).length);
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
        <h3 className={styles.gameTitle}>Descrevendo o Mundo</h3>
        <p>✅ Nível concluído!</p>
      </div>
    );
  }

  return (
    <div className={styles.gameCard}>
      <h3 className={styles.gameTitle}>Nível 2 · Descrevendo o Mundo</h3>
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