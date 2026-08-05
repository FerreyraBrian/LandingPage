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
    q: 'Como se diz "obrigado" em espanhol?',
    options: ['Por favor', 'Gracias', 'De nada'],
    correct: 1,
    explanation: '"Gracias" é a forma correta de dizer "obrigado" em espanhol.',
  },
  {
    q: 'Qual é o número 5 em espanhol?',
    options: ['Cuatro', 'Cinco', 'Seis'],
    correct: 1,
    explanation: '"Cinco" é o número 5 em espanhol.',
  },
  {
    q: 'Que cor é "rojo" em português?',
    options: ['Azul', 'Verde', 'Vermelho'],
    correct: 2,
    explanation: '"Rojo" em espanhol significa "vermelho" em português.',
  },
  {
    q: 'Qual é a forma correta de "Yo soy" para uma mulher?',
    options: ['Yo soy', 'Yo so', 'Yo son'],
    correct: 0,
    explanation: '"Yo soy" é a forma correta para ambos os gêneros.',
  },
  {
    q: 'O que significa "adiós"?',
    options: ['Tchau', 'Olá', 'Obrigado'],
    correct: 0,
    explanation: '"Adiós" significa "tchau" em português.',
  },
];

export default function Game1({ onComplete, isCompleted }: Props) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAns, setSelectedAns] = useState<string | null>(null);
  const [answers, setAnswers] = useState<GameAnswer[]>([]);

  const handleSelect = (opt: string) => {
    if (selectedAns) return;
    setSelectedAns(opt);

    const isCorrect = QUESTIONS[currentQ].options.indexOf(opt) === QUESTIONS[currentQ].correct;
    const nextAnswers = [...answers, { question: QUESTIONS[currentQ].q, isCorrect }];
    setAnswers(nextAnswers);

    if (isCorrect) {
      playSound('success');
      if ('vibrate' in navigator) navigator.vibrate(100);

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
      if ('vibrate' in navigator) navigator.vibrate([100, 50, 100]);
      setTimeout(() => setSelectedAns(null), 1000);
    }
  };

  if (isCompleted) {
    return (
      <div className={`${styles.gameCard} ${styles.completed}`}>
        <h3 className={styles.gameTitle}>Primeiros Passos</h3>
        <p>✅ Nível concluído!</p>
      </div>
    );
  }

  return (
    <div className={styles.gameCard}>
      <h3 className={styles.gameTitle}>Nível A1 · Primeiros Passos</h3>
      <p className={styles.questionText}>{QUESTIONS[currentQ].q}</p>

      <div className={styles.optionsGrid}>
        {QUESTIONS[currentQ].options.map((opt) => (
          <button
            key={opt}
            onClick={() => handleSelect(opt)}
            disabled={!!selectedAns}
            className={`${styles.optionBtn} ${selectedAns === opt ? (QUESTIONS[currentQ].options.indexOf(opt) === QUESTIONS[currentQ].correct ? styles.correct : styles.incorrect) : ''}`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}