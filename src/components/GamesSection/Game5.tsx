import { useState } from 'react';
import styles from './Game.module.css';
import { playSound } from '../../utils/sound';

interface Props {
  onComplete: () => void;
  isCompleted: boolean;
}

const QUESTIONS = [
  { q: "¿Cuándo llegó Carlos a Buenos Aires?", options: ['El martes', 'El lunes', 'El viernes'], a: 'El lunes' },
  { q: "¿Qué plato típico probó Carlos?", options: ['Empanadas', 'Asado', 'Ceviche'], a: 'Asado' },
  { q: "¿Qué actividad realizó Carlos durante su viaje?", options: ['Visitó un museo', 'Fue a la playa', 'Compró ropa'], a: 'Visitó un museo' },
  { q: "¿Con quién se encontró Carlos?", options: ['Con su familia', 'Con amigos', 'Con su jefe'], a: 'Con amigos' },
  { q: "¿Cómo describe Carlos su experiencia?", options: ['Aburrida', 'Inolvidable', 'Cansadora'], a: 'Inolvidable' }
];

export default function Game5({ onComplete, isCompleted }: Props) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAns, setSelectedAns] = useState<string | null>(null);

  // Simulador de áudio usando SpeechSynthesis (texto para fala nativo do navegador)
  const playStory = () => {
    if (isPlayingAudio) return;
    
    if ('speechSynthesis' in window) {
      setIsPlayingAudio(true);
      const text = "Hola, soy Carlos. Quiero contarte sobre mi viaje a Buenos Aires. Llegué el lunes y hace mucho calor. Visité el museo de arte moderno y después fui a cenar a un restaurante tradicional. Probé el asado, que es un plato típico argentino. También me encontré con amigos y paseamos por la ciudad. Fue una experiencia inolvidable.";
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-AR'; // Espanhol da Argentina
      utterance.rate = 0.9; // Falar um pouco mais devagar
      
      utterance.onend = () => setIsPlayingAudio(false);
      
      // Procura uma voz em espanhol
      const voices = window.speechSynthesis.getVoices();
      const spanishVoice = voices.find(v => v.lang.includes('es'));
      if (spanishVoice) utterance.voice = spanishVoice;
      
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Seu navegador não suporta a leitura de texto. O texto é: 'Llegué el lunes, probé asado, visité un museo con amigos. Inolvidable.'");
    }
  };

  const handleSelect = (opt: string) => {
    if (selectedAns) return;
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
      <div className={`${styles.gameCard} ${styles.completed}`} style={{ borderColor: 'var(--yellow-horizon)', boxShadow: '0 0 20px rgba(255, 183, 0, 0.4)' }}>
        <h3 className={styles.gameTitle} style={{ color: 'var(--yellow-horizon)' }}>🌟 Desafio de Escuta Finalizado!</h3>
        <p>Você provou que tem um excelente ouvido para o espanhol!</p>
      </div>
    );
  }

  return (
    <div className={styles.gameCard} style={{ border: '2px solid var(--yellow-horizon)' }}>
      <h3 className={styles.gameTitle} style={{ color: 'var(--yellow-horizon)' }}>Nível 5: Desafio de Escuta (O Grande Final)</h3>
      
      <div style={{ background: 'rgba(255, 183, 0, 0.1)', padding: '20px', borderRadius: '15px', marginBottom: '30px' }}>
        <p style={{ marginBottom: '15px', color: 'var(--blue-sky)' }}>Ouça a história do Carlos atentamente antes de responder.</p>
        <button 
          onClick={playStory}
          disabled={isPlayingAudio}
          className={styles.nextBtn}
          style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}
        >
          {isPlayingAudio ? '🔊 Escutando...' : '▶️ Reproduzir Áudio'}
        </button>
      </div>

      <div style={{ textAlign: 'left', background: 'rgba(0,0,0,0.2)', padding: '20px', borderRadius: '15px' }}>
        <p className={styles.questionText} style={{ marginBottom: '20px', fontWeight: 'bold' }}>
          {currentQ + 1}/5. {QUESTIONS[currentQ].q}
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
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
              style={{ textAlign: 'left', padding: '12px 20px' }}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}