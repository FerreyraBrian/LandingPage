const palabras = [
    {
        palabra: "HORIZONTE",
        categoria: "Visão de Futuro",
        significado: "Limite do campo visual, onde o céu encontra a terra.",
        pista1: "A palavra está relacionada a 'visão de futuro'.",
        pista2: "A primeira letra da palavra é 'H'.",
        pista3: "A palavra significa 'limite do campo visual, onde o céu encontra a terra'."
    },
    {
        palabra: "ESTRELLA",
        categoria: "Corpo Celeste",
        significado: "Astro que tem luz própria.",
        pista1: "Brilha no céu noturno.",
        pista2: "A primeira letra da palavra é 'E'.",
        pista3: "É um corpo celeste que emite luz e calor."
    },
    {
        palabra: "ESPAÑOL",
        categoria: "Idioma",
        significado: "Língua românica falada na Espanha e em muitos países da América.",
        pista1: "É o que você vai aprender com o nosso time.",
        pista2: "A primeira letra da palavra é 'E' e contém a letra 'Ñ'.",
        pista3: "É o idioma oficial de 21 países."
    },
    {
        palabra: "UNIVERSO",
        categoria: "Espaço",
        significado: "Conjunto de todas as coisas que existem.",
        pista1: "É infinito e está em expansão.",
        pista2: "A primeira letra da palavra é 'U'.",
        pista3: "Contém todas as galáxias, estrelas e planetas."
    },
    {
        palabra: "GALAXIA",
        categoria: "Astronomia",
        significado: "Enorme sistema de estrelas, poeira e gás.",
        pista1: "Nós vivemos na Via Láctea, que é uma...",
        pista2: "A primeira letra da palavra é 'G'.",
        pista3: "Sistema massivo de estrelas unidas pela gravidade."
    },
    {
        palabra: "CAMINO",
        categoria: "Jornada",
        significado: "Faixa de terra para transitar de um lugar a outro.",
        pista1: "Você deve percorrê-lo para alcançar seus objetivos.",
        pista2: "A primeira letra da palavra é 'C'.",
        pista3: "Sinônimo de rota ou trajeto."
    },
    {
        palabra: "FUTURO",
        categoria: "Tempo",
        significado: "Tempo que está por vir.",
        pista1: "O que construímos com as decisões de hoje.",
        pista2: "A primeira letra da palavra é 'F'.",
        pista3: "O tempo que ainda não aconteceu."
    },
    {
        palabra: "PLANETA",
        categoria: "Astro",
        significado: "Corpo celeste sólido que gira em torno de uma estrela.",
        pista1: "A Terra é um...",
        pista2: "A primeira letra da palavra é 'P'.",
        pista3: "Corpo que não tem luz própria e orbita uma estrela."
    },
    {
        palabra: "METEORO",
        categoria: "Fenômeno Espacial",
        significado: "Fragmento de corpo celeste que se incendeia ao entrar na atmosfera.",
        pista1: "Também conhecido como 'estrela cadente'.",
        pista2: "A primeira letra da palavra é 'M'.",
        pista3: "Rastro luminoso deixado no céu."
    },
    {
        palabra: "COMETA",
        categoria: "Astro Errante",
        significado: "Astro formado por gelo e poeira que possui uma cauda luminosa.",
        pista1: "O mais famoso é o Halley.",
        pista2: "A primeira letra da palavra é 'C'.",
        pista3: "Corpo celeste com núcleo de gelo que forma uma cabeleira ao se aproximar do sol."
    },
    {
        palabra: "SATELITE",
        categoria: "Astro Secundário",
        significado: "Corpo que gira em torno de um planeta.",
        pista1: "A Lua é o nosso único natural.",
        pista2: "A primeira letra da palavra é 'S'.",
        pista3: "Pode ser natural ou artificial e orbita um planeta."
    },
    {
        palabra: "ASTRONAUTA",
        categoria: "Profissão",
        significado: "Pessoa que viaja pelo espaço espacial.",
        pista1: "Explorador do espaço.",
        pista2: "A primeira letra da palavra é 'A'.",
        pista3: "Viajante ou tripulante de uma nave espacial."
    },
    {
        palabra: "TELESCOPIO",
        categoria: "Instrumento",
        significado: "Instrumento para observar objetos distantes.",
        pista1: "Usado para olhar as estrelas e planetas de perto.",
        pista2: "A primeira letra da palavra é 'T'.",
        pista3: "Aparelho ótico que amplia imagens celestes."
    },
    {
        palabra: "LUNA",
        categoria: "Satélite",
        significado: "O único satélite natural da Terra.",
        pista1: "Ilumina as nossas noites.",
        pista2: "A primeira letra da palavra é 'L'.",
        pista3: "Controla as marés da Terra."
    },
    {
        palabra: "SOL",
        categoria: "Estrela",
        significado: "A estrela central do nosso sistema planetário.",
        pista1: "Nos dá luz e calor durante o dia.",
        pista2: "A primeira letra da palavra é 'S'.",
        pista3: "A estrela em torno da qual a Terra orbita."
    },
    {
        palabra: "CIELO",
        categoria: "Atmosfera",
        significado: "Espaço infinito onde se movem os astros.",
        pista1: "Pode ser azul de dia e escuro à noite.",
        pista2: "A primeira letra da palavra é 'C'.",
        pista3: "A abóbada celeste acima de nós."
    },
    {
        palabra: "ESPACIO",
        categoria: "Dimensão",
        significado: "Lugar onde estão contidos os astros e galáxias.",
        pista1: "A fronteira final.",
        pista2: "A primeira letra da palavra é 'E'.",
        pista3: "O vazio que existe entre os corpos celestes."
    },
    {
        palabra: "NEBULOSA",
        categoria: "Astronomia",
        significado: "Massa de matéria cósmica luminosa.",
        pista1: "Nuvem de poeira cósmica e gases.",
        pista2: "A primeira letra da palavra é 'N'.",
        pista3: "Berçário onde nascem novas estrelas."
    },
    {
        palabra: "APRENDIZAJE",
        categoria: "Educação",
        significado: "Ação e efeito de aprender alguma arte, ofício ou idioma.",
        pista1: "É o que você fará no nosso curso.",
        pista2: "A primeira letra da palavra é 'A'.",
        pista3: "O processo de adquirir novos conhecimentos ou habilidades."
    },
    {
        palabra: "SUEÑO",
        categoria: "Desejo",
        significado: "Projeto, desejo ou esperança.",
        pista1: "O que queremos realizar no futuro.",
        pista2: "A primeira letra da palavra é 'S' e contém a letra 'Ñ'.",
        pista3: "Uma meta ou anseio profundo."
    }
];