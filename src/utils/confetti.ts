export const fireConfetti = () => {
  const runConfetti = () => {
    (window as any).confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#012561', '#64b5d8', '#ffb700', '#ff4d3b']
    });
  };

  if ((window as any).confetti) {
    runConfetti();
  } else {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js';
    script.onload = runConfetti;
    document.head.appendChild(script);
  }
};
