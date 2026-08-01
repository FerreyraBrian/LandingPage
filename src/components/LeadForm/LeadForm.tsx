import { FormEvent, useState } from 'react';
import styles from './LeadForm.module.css';
import { playSound } from '../../utils/sound';

export default function LeadForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

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
        setStatus('success');
        playSound('success');
        form.reset();
      })
      .catch((error) => {
        console.error(error);
        playSound('error');
        setStatus('idle');
      });
  };

  return (
    <section className={`${styles.section} reveal`}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2>Deseja falar diretamente conosco?</h2>
          <p>Preencha os dados abaixo e nossa equipe acadêmica entrará em contato em breve.</p>
        </div>
        
        <form className={styles.form} onSubmit={handleSubmit} data-netlify="true" name="consulta-directa">
          <input type="hidden" name="form-name" value="consulta-directa" />
          
          <div className={styles.formGroup}>
            <input type="text" name="nome" placeholder="Nombre" required />
          </div>
          <div className={styles.formGroup}>
            <input type="email" name="email" placeholder="Email" required />
          </div>
          <div className={styles.formGroup}>
            <textarea name="consulta" placeholder="Consulta" required rows={4}></textarea>
          </div>
          
          <button type="submit" className={styles.submitBtn} disabled={status === 'submitting'}>
            {status === 'submitting' ? 'Enviando...' : status === 'success' ? 'Enviado! ✅' : 'Enviar consulta'}
          </button>
        </form>
      </div>
    </section>
  );
}
