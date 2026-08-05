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
    q: '"Este fin de semana, yo ____ (ir) al cine con mis amigos."',
    verb: 'ir',
    tense: 'Pretérito perfecto',
    a: 'he ido',
    explanation: '"Este fin de semana" é um período não terminado, usa-se o Pretérito Perfeito "he ido".',
  },
  {
    q: '"¿Qué ____ (hacer) tú ayer por la tarde?"',
    verb: 'hacer',
    tense: 'Pretérito indefinido',
    a: 'hiciste',
    explanation: '"Ayer" é um tempo terminado, usa-se o Pretérito Indefinido "hiciste".',
  },
  {
    q: '"Cuando era niño, yo ____ (vivir) en un pueblo pequeño."',
    verb: 'vivir',    tense: 'Pretérito imperfecto',    a: 'vivía',
    explanation: '"Cuando era niño" descreve hábito ou contexto no passado, usa-se o Pretérito Imperfeito "vivía".',
  },
  {
    q: '"Yo ____ (estudiar) español desde hace dos años."',
    verb: 'estudiar',
    tense: 'Pretérito perfecto',
    a: 'he estudiado',
    explanation: '"Desde hace dos años" indica ação que começou no passado e continua, usa-se o Pretérito Perfeito "he estudiado".',
  },
  {
    q: '"¿Alguna vez ____ (visitar) México?"',
    verb: 'visitar',
    tense: 'Pretérito perfecto',
    a: 'has visitado',
    explanation: '"Alguna vez" refere-se a uma experiência de vida, usa-se o Pretérito Perfeito "has visitado".',
  },
];

export default function Game3({ onComplete, isCompleted }: Props) {
  const [currentQ, setCurrentQ] = useState(0);
  const [inputVal, setInputVal] = useState('');
  const [status, setStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle');
  const [answers, setAnswers] = useState<GameAnswer[]>([]);

  const checkAnswer = () => {
    const normalized = inputVal.toLowerCase().trim();
    const isCorrect = normalized === QUESTIONS[currentQ].a;
    const nextAnswers = [...answers, { question: QUESTIONS[currentQ].q, isCorrect }];
    setAnswers(nextAnswers);

    if (isCorrect) {
      setStatus('correct');
      playSound('success');
      setTimeout(() => {
        setStatus('idle');
        setInputVal('');
        if (currentQ < QUESTIONS.length - 1) {
          setCurrentQ((c) => c + 1);
        } else {
          onComplete(nextAnswers, nextAnswers.filter((item) => item.isCorrect).length);
        }
      }, 1000);
    } else {
      setStatus('incorrect');
      playSound('error');
      setTimeout(() => setStatus('idle'), 1000);
    }
  };

  if (isCompleted) {
    return (
      <div className={`${styles.gameCard} ${styles.completed}`}>
        <h3 className={styles.gameTitle}>Contando Histórias</h3>
        <p>✅ Nível concluído!</p>
      </div>
    );
  }

  return (
    <div className={styles.gameCard}>
      <h3 className={styles.gameTitle}>Nível B1 · Contando Histórias</h3>
      <p className={styles.questionText}>
        {QUESTIONS[currentQ].q.replace('____', '_____')} <br />
        <small style={{ color: 'var(--blue-sky)', fontSize: '0.9rem' }}>
          (Verbo: {QUESTIONS[currentQ].verb} · {QUESTIONS[currentQ].tense})
        </small>
      </p>

      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '20px' }}>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
          disabled={status !== 'idle'}
          style={{
            padding: '10px 15px',
            borderRadius: '10px',
            border: `2px solid ${status === 'correct' ? '#4caf50' : status === 'incorrect' ? 'var(--red-energy)' : 'var(--blue-sky)'}`,
            background: 'rgba(255,255,255,0.1)',
            color: 'white',
            fontSize: '1.2rem',
            textAlign: 'center',
          }}
          placeholder="Sua resposta..."
        />
        <button onClick={checkAnswer} disabled={status !== 'idle' || !inputVal} className={styles.nextBtn}>
          Enviar
        </button>
      </div>
    </div>
  );
}