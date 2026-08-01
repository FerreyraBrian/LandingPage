import { useState } from 'react';
import styles from './Game.module.css';
import { playSound } from '../../utils/sound';

interface Props {
  onComplete: () => void;
  isCompleted: boolean;
}

const QUESTIONS = [
  { words: ['mañana', 'al', 'yo', 'cine', 'voy'], expected: 'yo voy al cine mañana' },
  { words: ['casa', 'ella', 'su', 'a', 'vuelve'], expected: 'ella vuelve a su casa' },
  { words: ['libro', 'un', 'leyendo', 'estoy'], expected: 'estoy leyendo un libro' },
  { words: ['comida', 'la', 'prepara', 'él'], expected: 'él prepara la comida' },
  { words: ['viajar', 'a', 'quiero', 'yo', 'Chile'], expected: 'yo quiero viajar a chile' }
];

export default function Game4({ onComplete, isCompleted }: Props) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [status, setStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle');

  const handleWordClick = (word: string) => {
    if (status !== 'idle') return;
    setSelectedWords([...selectedWords, word]);
  };

  const handleRemoveWord = (index: number) => {
    if (status !== 'idle') return;
    setSelectedWords(selectedWords.filter((_, i) => i !== index));
  };

  const checkAnswer = () => {
    const currentAns = selectedWords.join(' ').toLowerCase();
    
    if (currentAns === QUESTIONS[currentQ].expected) {
      setStatus('correct');
      playSound('success');
      setTimeout(() => {
        setStatus('idle');
        setSelectedWords([]);
        if (currentQ < QUESTIONS.length - 1) {
          setCurrentQ(c => c + 1);
        } else {
          onComplete();
        }
      }, 1500);
    } else {
      setStatus('incorrect');
      playSound('error');
      setTimeout(() => setStatus('idle'), 1500);
    }
  };

  if (isCompleted) {
    return (
      <div className={`${styles.gameCard} ${styles.completed}`}>
        <h3 className={styles.gameTitle}>Ordenar Palavras</h3>
        <p>✅ Nível Completado!</p>
      </div>
    );
  }

  const availableWords = QUESTIONS[currentQ].words.filter(w => !selectedWords.includes(w));

  return (
    <div className={styles.gameCard}>
      <h3 className={styles.gameTitle}>Nível 4: Ordenar as Palavras</h3>
      <p className={styles.questionText}>Forme a frase correta clicando nas palavras:</p>
      
      {/* Área da frase montada */}
      <div className={styles.sentenceBuilder} style={{ 
        minHeight: '60px', 
        background: 'rgba(0,0,0,0.2)', 
        borderRadius: '10px', 
        padding: '15px',
        marginBottom: '20px',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
        border: `2px solid ${status === 'correct' ? '#4caf50' : status === 'incorrect' ? 'var(--red-energy)' : 'var(--blue-sky)'}`
      }}>
        {selectedWords.map((word, i) => (
          <button 
            key={`${word}-${i}`} 
            onClick={() => handleRemoveWord(i)}
            className={styles.wordChip}
            style={{ padding: '8px 15px', borderRadius: '20px', background: 'var(--yellow-horizon)', color: 'var(--blue-deep)', fontWeight: 'bold' }}
          >
            {word}
          </button>
        ))}
        {selectedWords.length === 0 && <span style={{ color: 'rgba(255,255,255,0.4)', alignSelf: 'center' }}>Sua frase aparecerá aqui...</span>}
      </div>

      {/* Palavras disponíveis */}
      <div className={styles.availableWords} style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', marginBottom: '30px' }}>
        {availableWords.map((word, i) => (
          <button 
            key={`${word}-${i}`} 
            onClick={() => handleWordClick(word)}
            className={styles.wordChip}
            style={{ padding: '8px 15px', borderRadius: '20px', background: 'transparent', border: '1px solid var(--blue-sky)', color: 'var(--white)' }}
          >
            {word}
          </button>
        ))}
      </div>
      
      <button 
        onClick={checkAnswer} 
        disabled={status !== 'idle' || selectedWords.length !== QUESTIONS[currentQ].words.length}
        className={styles.nextBtn}
        style={{ width: '100%' }}
      >
        Verificar Frase
      </button>
    </div>
  );
}