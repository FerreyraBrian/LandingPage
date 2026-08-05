import { useEffect, useState } from 'react';
import styles from './Game.module.css';
import { playSound } from '../../utils/sound';
import type { GameAnswer } from './gameStorage';

interface Props {
  onComplete: (answers: GameAnswer[], correctCount: number) => void;
  isCompleted: boolean;
}

function shuffleArray<T>(array: T[]) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function getWeeklyReloadMessage() {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();

  const isMondayBeforeReload = day === 1 && hour < 10;
  const daysUntilNextMonday = isMondayBeforeReload ? 0 : ((8 - day) % 7) || 7;

  if (daysUntilNextMonday === 0) {
    return 'Faltam 0 dias para novos jogos - chegam hoje!';
  }

  return `Faltam ${daysUntilNextMonday} dias para novos jogos.`;
}

const QUESTIONS = [
  {
    words: ['Cuando', 'era', 'niño', 'vivía', 'en', 'un', 'pueblo', 'pequeño.'],
    expected: 'Cuando era niño vivía en un pueblo pequeño.',
    explanation: 'A estrutura correta em espanhol é: "Cuando era niño vivía en un pueblo pequeño.".',
  },
  {
    words: ['Mientras', 'yo', 'estudiaba', 'ella', 'leía', 'un', 'libro.'],
    expected: 'Mientras yo estudiaba ella leía un libro.',
    explanation: '"Mientras" exige o Pretérito Imperfeito para ações simultâneas: "estudiaba / leía".',
  },
  {
    words: ['Aunque', 'era', 'tarde', 'yo', 'seguí', 'trabajando.'],
    expected: 'Aunque era tarde yo seguí trabajando.',
    explanation: '"Aunque era tarde" dá contexto no imperfecto, a ação pontual se expressa em Indefinido: "seguí".',
  },
  {
    words: ['Cuando', 'llegué', 'a', 'casa', 'ya', 'habían', 'preparado', 'la', 'cena.'],
    expected: 'Cuando llegué a casa ya habían preparado la cena.',
    explanation: '"Cuando llegué" (ação pontual) + ação anterior em Pluscuamperfecto: "habían preparado".',
  },
  {
    words: ['No', 'sabía', 'que', 'tú', 'estabas', 'aquí.'],
    expected: 'No sabía que tú estabas aquí.',
    explanation: '"No sabía que" dá contexto no imperfecto; a ação simultânea também se expressa no Imperfeito: "estabas".',
  },
];

export default function Game4({ onComplete, isCompleted }: Props) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [status, setStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle');
  const [answers, setAnswers] = useState<GameAnswer[]>([]);
  const [shuffledWords, setShuffledWords] = useState<string[]>([]);
  const [completionModalVisible, setCompletionModalVisible] = useState(false);
  const [completionCountdown, setCompletionCountdown] = useState(15);
  const [pendingResult, setPendingResult] = useState<{ answers: GameAnswer[]; correctCount: number } | null>(null);

  useEffect(() => {
    setShuffledWords(shuffleArray(QUESTIONS[currentQ].words));
    setSelectedWords([]);
    setStatus('idle');
  }, [currentQ]);

  useEffect(() => {
    if (!completionModalVisible) return;

    setCompletionCountdown(15);
    const interval = setInterval(() => {
      setCompletionCountdown((count) => Math.max(0, count - 1));
    }, 1000);

    const timeout = setTimeout(() => {
      if (pendingResult) {
        setCompletionModalVisible(false);
        onComplete(pendingResult.answers, pendingResult.correctCount);
      }
    }, 15000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [completionModalVisible, onComplete, pendingResult]);

  const handleWordClick = (word: string) => {
    if (status !== 'idle') return;
    setSelectedWords([...selectedWords, word]);
  };

  const handleRemoveWord = (index: number) => {
    if (status !== 'idle') return;
    setSelectedWords(selectedWords.filter((_, i) => i !== index));
  };

  const resetGame = () => {
    setCurrentQ(0);
    setSelectedWords([]);
    setAnswers([]);
    setStatus('idle');
    setShuffledWords(shuffleArray(QUESTIONS[0].words));
    setCompletionModalVisible(false);
    setPendingResult(null);
  };

  const handleContinue = () => {
    if (pendingResult) {
      setCompletionModalVisible(false);
      onComplete(pendingResult.answers, pendingResult.correctCount);
    }
  };

  const weeklyReloadMessage = getWeeklyReloadMessage();

  const checkAnswer = () => {
    const currentAns = selectedWords.join(' ').toLowerCase();
    const isCorrect = currentAns === QUESTIONS[currentQ].expected.toLowerCase();
    const nextAnswers = [...answers, { question: QUESTIONS[currentQ].expected, isCorrect }];
    setAnswers(nextAnswers);

    if (isCorrect) {
      setStatus('correct');
      playSound('success');
      setTimeout(() => {
        setStatus('idle');
        setSelectedWords([]);
        if (currentQ < QUESTIONS.length - 1) {
          setCurrentQ((c) => c + 1);
        } else {
          setPendingResult({
            answers: nextAnswers,
            correctCount: nextAnswers.filter((item) => item.isCorrect).length,
          });
          setCompletionModalVisible(true);
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
        <h3 className={styles.gameTitle}>Narrativas e Opiniões</h3>
        <p>✅ Nível concluído!</p>
      </div>
    );
  }

  const availableWords = shuffledWords.filter((w) => !selectedWords.includes(w));

  return (
    <div className={styles.gameCard}>
      <h3 className={styles.gameTitle}>Nível 4 · Narrativas e Opiniões</h3>
      <p className={styles.questionText}>Forma la frase correcta ordenando las palabras:</p>

      <div className={styles.sentenceBuilder} style={{ minHeight: '60px', background: 'rgba(0,0,0,0.2)', borderRadius: '10px', padding: 'var(--section-container-padding)', marginBottom: 'var(--section-gap)', display: 'flex', flexWrap: 'wrap', gap: '10px', border: `2px solid ${status === 'correct' ? '#4caf50' : status === 'incorrect' ? 'var(--red-energy)' : 'var(--blue-sky)'}` }}>
        {selectedWords.map((word, i) => (
          <button key={`${word}-${i}`} onClick={() => handleRemoveWord(i)} className={styles.wordChip} style={{ padding: 'var(--space-2) var(--space-3)', borderRadius: '20px', background: 'var(--yellow-horizon)', color: 'var(--blue-deep)', fontWeight: 'bold' }}>
            {word}
          </button>
        ))}
        {selectedWords.length === 0 && <span style={{ color: 'rgba(255,255,255,0.4)', alignSelf: 'center' }}>Tu frase aparecerá aquí...</span>}
      </div>

      <div className={styles.availableWords} style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', marginBottom: 'var(--section-gap)' }}>
        {availableWords.map((word, i) => (
          <button key={`${word}-${i}`} onClick={() => handleWordClick(word)} className={styles.wordChip} style={{ padding: 'var(--space-2) var(--space-3)', borderRadius: '20px', background: 'transparent', border: '1px solid var(--blue-sky)', color: 'var(--white)' }}>
            {word}
          </button>
        ))}
      </div>

      <button onClick={checkAnswer} disabled={status !== 'idle' || selectedWords.length !== QUESTIONS[currentQ].words.length} className={styles.nextBtn} style={{ width: '100%' }}>
        Verificar Frase
      </button>

      {completionModalVisible && pendingResult && (
        <div className={styles.finishModalOverlay}>
          <div className={styles.finishModalContent}>
            <h3 className={styles.finishModalTitle}>¡Felicidades!</h3>
            <p className={styles.finishModalText}>
              Você completou o nível 4 com sucesso.
            </p>
            <p className={styles.finishModalText}>
              {weeklyReloadMessage}
            </p>
            <p className={styles.finishModalText}>
              O modal fecha em {completionCountdown} segundos.
            </p>
            <div className={styles.finishModalButtons}>
              <button onClick={resetGame} className={styles.finishModalBtn} type="button">
                Refazer este nível
              </button>
              <button onClick={handleContinue} className={styles.finishModalBtn} type="button">
                Concluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}