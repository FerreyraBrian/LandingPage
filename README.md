# Horizonte Espanhol - Landing Page

Uma landing page interativa com temática celestial projetada para a escola de idiomas "Horizonte Espanhol". 
O foco do projeto é converter leads através de uma experiência gamificada (Jogo da Forca).

## 🗂️ Estrutura do Projeto

```text
/
├── index.html          # Página principal estruturada em 4 seções
├── css/
│   └── style.css       # Estilos (Variáveis, Responsividade, Animações)
├── js/
│   ├── palavras.js     # Array de 20 palavras em espanhol com dicas
│   └── juego.js        # Lógica do carrossel, jogo da forca e formulário
├── assets/
│   ├── img/            # Adicione suas 10 imagens do carrossel aqui (imagen1.jpg a imagen10.jpg)
│   └── sounds/         # (Opcional) Adicione sons para o flip das cartas
└── README.md           # Este arquivo
```

## 🚀 Como Personalizar

### 1. Imagens do Carrossel
A landing page espera encontrar 10 imagens na pasta `assets/img/`. 
Nomeie seus arquivos como `imagen1.jpg`, `imagen2.jpg`, etc. até `imagen10.jpg`.

### 2. Palavras do Jogo
Para alterar as palavras, categorias, significados e pistas, edite o arquivo `js/palabras.js`.
A lógica espera um array de objetos chamado `palabras`.

### 3. Integração do Formulário
Atualmente, o formulário no `index.html` e a interceptação no `js/juego.js` simulam um envio bem-sucedido exibindo uma mensagem na tela.
Para integrar com uma API de CRM real:
1. Abra `js/juego.js`.
2. Vá até a seção "3. FORMULÁRIO".
3. Substitua o `setTimeout` por uma requisição `fetch` ou `XMLHttpRequest` para o seu endpoint.

## 🎨 Cores e Estilos
O esquema de cores foi definido usando variáveis CSS no topo do arquivo `style.css`.
- `--bg-dark`: `#0a2540`
- `--gold`: `#d4af37`
- `--orange`: `#ff6b35`

## ✅ Acessibilidade (A11y)
O código inclui tags HTML semânticas, `aria-labels` nos botões gerados dinamicamente, nos ícones de SVG das redes sociais e tags do tipo `sr-only` (Screen Reader Only) no formulário para garantir conformidade com leitores de tela.