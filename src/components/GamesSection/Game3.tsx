import { useState } from 'react';
import styles from './Game.module.css';
import { playSound } from '../../utils/sound';

interface Props {
  onComplete: () => void;
  isCompleted: boolean;
}

const QUESTIONS = [
  { q: "Yo ____ una carta a mi hermana.", verb: "escribir", a: "he escrito" },
  { q: "Ellos ____ el problema.", verb: "resolver", a: "han resuelto" },
  { q: "Nosotros ____ la ventana.", verb: "abrir", a: "hemos abierto" },
  { q: "Tú ____ la tarea.", verb: "hacer", a: "has hecho" },
  { q: "Ella ____ la verdad.", verb: "decir", a: "ha dicho" },
];

export default function Game3({ onComplete, isCompleted }: Props) {
  const [currentQ, setCurrentQ] = useState(0);
  const [inputVal, setInputVal] = useState('');
  const [status, setStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle');

  const checkAnswer = () => {
    if (inputVal.toLowerCase().trim() === QUESTIONS[currentQ].a) {
      setStatus('correct');
      playSound('success');
      setTimeout(() => {
        setStatus('idle');
        setInputVal('');
        if (currentQ < QUESTIONS.length - 1) {
          setCurrentQ(c => c + 1);
        } else {
          onComplete();
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
        <h3 className={styles.gameTitle}>Completar Frase</h3>
        <p>✅ Nível Completado!</p>
      </div>
    );
  }

  return (
    <div className={styles.gameCard}>
      <h3 className={styles.gameTitle}>Nível 3: Completar a Frase</h3>
      <p className={styles.questionText}>
        {QUESTIONS[currentQ].q.replace('____', '_____')} <br/>
        <small style={{ color: 'var(--blue-sky)', fontSize: '0.9rem' }}>
          (Verbo: {QUESTIONS[currentQ].verb} - Pretérito Perfecto)
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
            textAlign: 'center'
          }}
          placeholder="Sua resposta..."
        />
        <button 
          onClick={checkAnswer} 
          disabled={status !== 'idle' || !inputVal}
          className={styles.nextBtn}
        >
          Enviar
        </button>
      </div>
    </div>
  );
}