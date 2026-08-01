// Variáveis de Estado
let palavraAtualObj = null;
let palavraSecreta = "";
let letrasAdivinhadas = [];
let erros = 0;
const MAX_ERROS = 6;

// Elementos do DOM
const canvas = document.getElementById('forca-canvas');
const ctx = canvas.getContext('2d');
const tecladoContainer = document.getElementById('teclado');
const palavraDisplay = document.getElementById('palavra-secreta');
const modalResultado = document.getElementById('modal-resultado');
const form = document.getElementById('lead-form');

// Letras para o teclado
const alfabeto = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split('');

// ==========================================
// 1. MARQUESINA CELESTIAL (CARROSSEL)
// ==========================================
function initCarousel() {
    const slides = document.querySelectorAll('.slide');
    const indicatorsContainer = document.getElementById('carousel-indicators');
    let currentSlide = 0;
    
    // Criar indicadores
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('indicator');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        indicatorsContainer.appendChild(dot);
    });

    const indicators = document.querySelectorAll('.indicator');

    function goToSlide(index) {
        slides[currentSlide].classList.remove('active');
        indicators[currentSlide].classList.remove('active');
        
        currentSlide = index;
        
        slides[currentSlide].classList.add('active');
        indicators[currentSlide].classList.add('active');
    }

    function nextSlide() {
        let next = (currentSlide + 1) % slides.length;
        goToSlide(next);
    }

    // Mudar a cada 5 segundos
    setInterval(nextSlide, 5000);
}

// ==========================================
// 2. JOGO DA FORCA
// ==========================================
function initJogo() {
    // Escolher palavra aleatória
    const index = Math.floor(Math.random() * palavras.length);
    palavraAtualObj = palavras[index];
    palavraSecreta = palavraAtualObj.palavra.toUpperCase();
    
    // Reset estado
    letrasAdivinhadas = [];
    erros = 0;
    
    // Atualizar dicas no HTML
    document.getElementById('texto-dica1').textContent = palavraAtualObj.pista1;
    document.getElementById('texto-dica2').textContent = palavraAtualObj.pista2;
    document.getElementById('texto-dica3').textContent = palavraAtualObj.pista3;
    
    // Resetar cartas
    document.querySelectorAll('.dica-card').forEach(card => card.classList.remove('flipped'));

    criarTeclado();
    atualizarPalavraDisplay();
    desenharForca();
    
    // Ocultar modal se visível
    modalResultado.classList.add('hidden');
}

function criarTeclado() {
    tecladoContainer.innerHTML = '';
    alfabeto.forEach(letra => {
        const btn = document.createElement('button');
        btn.textContent = letra;
        btn.classList.add('tecla');
        btn.setAttribute('aria-label', `Letra ${letra}`);
        btn.addEventListener('click', () => tentarLetra(letra, btn));
        tecladoContainer.appendChild(btn);
    });
}

function atualizarPalavraDisplay() {
    let display = "";
    for (let i = 0; i < palavraSecreta.length; i++) {
        if (letrasAdivinhadas.includes(palavraSecreta[i])) {
            display += palavraSecreta[i] + " ";
        } else {
            display += "_ ";
        }
    }
    palavraDisplay.textContent = display.trim();
}

function tentarLetra(letra, btnElement) {
    btnElement.disabled = true;
    
    if (palavraSecreta.includes(letra)) {
        btnElement.classList.add('correta');
        letrasAdivinhadas.push(letra);
        atualizarPalavraDisplay();
        verificarVitoria();
    } else {
        btnElement.classList.add('incorreta');
        erros++;
        desenharForca();
        verificarDerrota();
    }
}

// Animação de Flip Card com som simulado
window.virarCartao = function(elemento, dicaNum) {
    if (!elemento.classList.contains('flipped')) {
        elemento.classList.add('flipped');
        // Fallback visual/som: Pode adicionar áudio aqui:
        // const audio = new Audio('assets/sounds/magia.mp3'); 
        // audio.play().catch(e => console.log('Audio autoplay prevented'));
    }
}

// Canvas Desenho da Forca (Responsive design)
function desenharForca() {
    // Limpar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.strokeStyle = "#d4af37"; // Gold
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    // Base
    ctx.beginPath();
    ctx.moveTo(20, 280);
    ctx.lineTo(230, 280);
    ctx.stroke();

    // Poste principal
    ctx.beginPath();
    ctx.moveTo(60, 280);
    ctx.lineTo(60, 20);
    ctx.stroke();

    // Trave superior
    ctx.beginPath();
    ctx.moveTo(60, 20);
    ctx.lineTo(150, 20);
    ctx.stroke();

    // Corda
    ctx.beginPath();
    ctx.moveTo(150, 20);
    ctx.lineTo(150, 50);
    ctx.stroke();

    // Desenhar corpo de acordo com erros
    ctx.strokeStyle = "#ffffff";
    
    if (erros > 0) { // Cabeça
        ctx.beginPath();
        ctx.arc(150, 75, 25, 0, Math.PI * 2);
        ctx.stroke();
    }
    if (erros > 1) { // Tronco
        ctx.beginPath();
        ctx.moveTo(150, 100);
        ctx.lineTo(150, 180);
        ctx.stroke();
    }
    if (erros > 2) { // Braço esquerdo
        ctx.beginPath();
        ctx.moveTo(150, 120);
        ctx.lineTo(110, 160);
        ctx.stroke();
    }
    if (erros > 3) { // Braço direito
        ctx.beginPath();
        ctx.moveTo(150, 120);
        ctx.lineTo(190, 160);
        ctx.stroke();
    }
    if (erros > 4) { // Perna esquerda
        ctx.beginPath();
        ctx.moveTo(150, 180);
        ctx.lineTo(110, 240);
        ctx.stroke();
    }
    if (erros > 5) { // Perna direita
        ctx.beginPath();
        ctx.moveTo(150, 180);
        ctx.lineTo(190, 240);
        ctx.stroke();
    }
}

function verificarVitoria() {
    let venceu = true;
    for (let i = 0; i < palavraSecreta.length; i++) {
        if (!letrasAdivinhadas.includes(palavraSecreta[i])) {
            venceu = false;
            break;
        }
    }
    
    if (venceu) {
        finalizarJogo(true);
    }
}

function verificarDerrota() {
    if (erros >= MAX_ERROS) {
        finalizarJogo(false);
    }
}

function finalizarJogo(vitoria) {
    // Desabilitar todas as teclas
    document.querySelectorAll('.tecla').forEach(btn => btn.disabled = true);
    
    const titulo = document.getElementById('resultado-titulo');
    const mensagem = document.getElementById('resultado-mensagem');
    
    if (vitoria) {
        titulo.textContent = "✨ Missão Cumprida! ✨";
        titulo.style.color = "#4caf50";
        mensagem.textContent = `A palavra era ${palavraSecreta}. Você tem um futuro brilhante!`;
    } else {
        titulo.textContent = "☄️ Fim da Jornada";
        titulo.style.color = "#ff6b35";
        mensagem.textContent = `A palavra correta era ${palavraSecreta}. Continue tentando!`;
    }
    
    setTimeout(() => {
        modalResultado.classList.remove('hidden');
    }, 500);
}

// ==========================================
// 3. FORMULÁRIO
// ==========================================
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o reload da página
    
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    
    if(nome && email) {
        // Simulando envio
        const btn = form.querySelector('.btn-cta');
        btn.textContent = "Enviando...";
        btn.disabled = true;
        
        setTimeout(() => {
            form.classList.add('hidden');
            document.getElementById('form-mensagem').classList.remove('hidden');
        }, 1500);
    }
});

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    initCarousel();
    initJogo();
});