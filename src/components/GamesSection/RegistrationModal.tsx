import { useState, FormEvent } from 'react';
import styles from './GamesSection.module.css';

interface Props {
  onClose: () => void;
  onSuccess: () => void;
}

export default function RegistrationModal({ onClose, onSuccess }: Props) {
  const [status, setStatus] = useState<'idle' | 'submitting'>('idle');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData as any).toString()
    })
      .then(() => {
        onSuccess();
      })
      .catch((error) => {
        console.error(error);
        setStatus('idle');
      });
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeBtn} onClick={onClose}>×</button>
        <h3>Antes de jogar...</h3>
        <p>Preencha os dados abaixo para liberar seu passaporte celestial.</p>
        
        <form onSubmit={handleSubmit} data-netlify="true" name="registro-juego">
          <input type="hidden" name="form-name" value="registro-juego" />
          
          <div className={styles.formGroup}>
            <input type="text" name="nome" placeholder="Seu Nome" required />
          </div>
          <div className={styles.formGroup}>
            <input type="email" name="email" placeholder="Seu E-mail" required />
          </div>
          <div className={styles.formGroup}>
            <input type="tel" name="telefone" placeholder="Seu Telefone" required />
          </div>
          <div className={styles.formGroup}>
            <textarea 
              name="motivo" 
              placeholder="Por que você quer estudar espanhol? (Deixe sua ideia aqui)" 
              required 
              rows={3}
            ></textarea>
          </div>
          
          <button type="submit" className={styles.submitModalBtn} disabled={status === 'submitting'}>
            {status === 'submitting' ? 'Aguarde...' : '¡A JUGAR!'}
          </button>
        </form>
      </div>
    </div>
  );
}