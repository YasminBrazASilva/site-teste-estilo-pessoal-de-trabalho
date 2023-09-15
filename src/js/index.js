const botaoComecar = document.getElementById('botaoComecar');
const grupoIntroducao = document.getElementById('grupoIntroducao');
const grupoDetalheUsuario = document.getElementById('grupoDetalheUsuario');
const botaoOk = document.getElementById('ok');
const grupoOpcoes = document.getElementById('grupoOpcoes');
const botaoProxima = document.getElementById('botaoProxima');
const botaoEnviar = document.getElementById('botaoEnviar');
const grupoProgresso = document.getElementById('grupoProgresso');
const barraProgresso = document.getElementById('barraProgresso');
const progressoDetalhe = document.getElementById('progressoDetalhe');
const textoFinal = document.getElementById('textoFinal');
const imagensResultados = document.getElementById('imagensResultados');

let dados = {};
let indiceQuestaoAtual = 0;
let respostasSelecionadas = [];

const questoes = { 
    1: ['Quantitativo', 'Estruturado', 'Adaptável', 'Tradicional'],
    2: ['Variedade', 'Relacionamento', 'Estabilidade', 'Análise'],
    3: ['Método', 'Perspectiva', 'Experimento', 'Aleatório'],
    4: ['Diplomático', 'Reservado', 'Entusiasmado', 'Analítico'],
    5: ['Visionário', 'Organizado', 'Colaborativo', 'Curioso'],
    6: ['Integridade', 'Consistência', 'Possibilidades', 'Consenso'],
    7: ['Equilíbrio', 'Foco', 'Conexão', 'Imaginação'],
    8: ['Desafios', 'Previsão', 'Motivação', 'Execução'],
    9: ['Renovação', 'Prevenção', 'Regras/Normas', 'Comando/Direção'],
    10: ['Inovação', 'Parceria', 'Ordem', 'Imaginação'],
    11: ['Plano detalhado', 'Esforço direcionado', 'Conflito administrativo', 'Panorama geral'],
    12: ['Competência', 'Maturidade', 'Amizade', 'Criatividade'],
    13: ['Quanto?', 'Por que?', 'Quem?', 'Quando?'],
    14: ['Empatia', 'Lealdade', 'Lógica', 'Espontaneidade'],
    15: ['Vencer', 'Manter', 'Recuar', 'Arriscar'] 
};

const qtdeQuestoes = Object.keys(questoes).length;

botaoComecar.addEventListener('click', () => {
    comecar();
});

function comecar() {
    ocultarElemento(botaoComecar);
    ocultarElemento(grupoIntroducao);

    exibirElemento(grupoDetalheUsuario);
};

function ocultarElemento(elemento) {
    elemento.classList.add('oculto');
};

function exibirElemento(elemento) {
    elemento.classList.remove('oculto');
};


botaoOk.addEventListener('click', () => {
    const nomeCompletoResposta = document.getElementById('nomeCompleto').value;
    const emailResposta = document.getElementById('email').value;
    const empresaResposta = document.getElementById('empresa').value;

    if (!nomeCompletoResposta || !emailResposta || !empresaResposta) {
        alert('Por favor, preencha todas as informações.');
        return;
    }

    salvarDados("nomeCompleto", nomeCompletoResposta);
    salvarDados("email", emailResposta);
    salvarDados("empresa", empresaResposta)
    iniciarTeste();
});


function salvarDados(titulo, objeto) {
    dados[titulo] = objeto;
};

function iniciarTeste() {
    ocultarElemento(grupoDetalheUsuario);

    exibirElemento(grupoProgresso);
    exibirElemento(grupoOpcoes);
    mostrarQuestao(0);
};

function mostrarQuestao(indiceQuestaoAtual) {
    const alternativas = questoes[indiceQuestaoAtual+1];
    atualizarTextoHTML(grupoOpcoes, '');

    alternativas.forEach((opcao, opcaoIndex) => {
        const alternativa = criarElementoHTML('button');
        alternativa.textContent = opcao;
        
        adicionarElementoHTMLFilho(grupoOpcoes, alternativa);

        alternativa.addEventListener('click', () => {
            adicionarSelecao(alternativa);            
            armazenarResposta(opcaoIndex);
        });
    });
};

function atualizarTextoHTML(elemento, texto) {
    elemento.innerHTML = texto;
};

function criarElementoHTML(tagName, className) {
    const elemento = document.createElement(tagName);
    if (className) {
        elemento.classList.add(className);
    }
    return elemento;
};

function adicionarElementoHTMLFilho(pai, filho) {
    pai.appendChild(filho);
};

function adicionarSelecao(alternativa) {
    removerSelecaoAnterior();
    alternativa.classList.add('selecionada');
};

function removerSelecaoAnterior() {
    const alternativaJaSelecionada = document.querySelector('.selecionada');

    if (alternativaJaSelecionada) {
        alternativaJaSelecionada.classList.remove('selecionada');
    };
};

function armazenarResposta(indiceSelecionado) {
    respostasSelecionadas[indiceQuestaoAtual] = indiceSelecionado;
    chamarBotaoAvancar();
};

function chamarBotaoAvancar() {
    const indiceUltimaPergunta = qtdeQuestoes - 1;

    if (indiceQuestaoAtual < indiceUltimaPergunta) {
        exibirElemento(botaoProxima);
    } else {
        exibirElemento(botaoEnviar);
    }
};


botaoProxima.addEventListener('click', () => {
    avancarQuestao();
});

function avancarQuestao() {
    indiceQuestaoAtual++;
    ocultarElemento(botaoProxima);

    if (indiceQuestaoAtual < qtdeQuestoes) {
        mostrarQuestao(indiceQuestaoAtual);
        atualizarProgresso();
    };
};

function atualizarProgresso() {
    const progressoAtual = (indiceQuestaoAtual / qtdeQuestoes) * 100;
    progressoDetalhe.textContent = `${progressoAtual.toFixed(1)}%`;
    barraProgresso.value = progressoAtual;
};


botaoEnviar.addEventListener('click', () => {
    finalizarTeste();
});


function finalizarTeste() {
    ocultarElemento(botaoEnviar);
    ocultarElemento(grupoOpcoes);
    ocultarElemento(grupoProgresso);

    const [resultadoFinal, descricaoFinal] = imprimirOResultado();

    atualizarTextoHTML(textoFinal, resultadoFinal);
    atualizarTextoHTML(imagensResultados, descricaoFinal);
    criarBarrasDePorcentagem();

    enviarDadosParaPlanilha(dados);

};

function criarBarrasDePorcentagem() {
    const perfisPorcentagens = calcularAsPorcentagens();
    const barraPorcentagemContainer = document.getElementById('barraPorcentagem');

    for (const perfil in perfisPorcentagens) {
        const porcentagem = perfisPorcentagens[perfil];

        const barra = criarElementoHTML('div', 'barra-porcentagem');
        barra.style.backgroundColor = coresPerfis[perfil];
        barra.style.width = `${porcentagem}%`;
        adicionarElementoHTMLFilho(barraPorcentagemContainer, barra);

        const detalhe = criarElementoHTML('span');
        detalhe.textContent = `${porcentagem}%`;
        adicionarElementoHTMLFilho(barra, detalhe);
    };
};


function enviarDadosParaPlanilha(dados) {
    fetch('https://script.google.com/macros/s/AKfycbz8ND2Tt4h3d8xl-d_EHRqhsD5B81UeRQa2FORQagTXNOQLdyrhUc72QSrKxgUOAbl1/exec', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(dados)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data.result);
        })
        .catch(error => {
            console.error('Erro ao armazenar os dados na planilha:', error);
        });
};



// CÁLCULOS PARA DEFINIR O PERFIL DO USUÁRIO
const gabarito = [
    ['D', 'G', 'P', 'I'],
    ['P', 'I', 'G', 'D'],
    ['G', 'I', 'D', 'P'],
    ['I', 'G', 'P', 'D'],
    ['P', 'G', 'I', 'D'],
    ['D', 'G', 'P', 'I'],
    ['G', 'D', 'I', 'P'],
    ['D', 'G', 'I', 'P'],
    ['P', 'I', 'G', 'D'],
    ['P', 'I', 'G', 'D'],
    ['G', 'D', 'I', 'P'],
    ['D', 'G', 'I', 'P'],
    ['D', 'G', 'I', 'P'],
    ['I', 'G', 'D', 'P'],
    ['D', 'G', 'I', 'P']
];

const perfis = {
    'D': ['Condutor', 'condutor'],
    'G': ['Guardião', 'guardiao'],
    'I': ['Conciliador', 'conciliador'],
    'P': ['Pioneiro', 'pioneiro']
};


const descricaoPerfis = {
    'D': `<img src="./src/imagens/Condutores.jpg" alt="Imagem de Condutores" class="perfil-imagem">`,
    'G': `<img src="./src/imagens/Guardioes.jpg" alt="Imagem de Guardioes" class="perfil-imagem">`,
    'I': `<img src="./src/imagens/Conciliadores.jpg" alt="Imagem de Conciliadores" class="perfil-imagem">`,
    'P': `<img src="./src/imagens/Pioneiros.jpg" alt="Imagem de Pioneiros" class="perfil-imagem">`
};

const coresPerfis = {
    'D': '#F03E24',
    'G': '#4A70B7',
    'I': '#43A848',
    'P': '#FDAF1B'
};


function imprimirOResultado() {
    const perfisResposta = definirOPerfil();
    
    const resultadoFinal = `<div>TESTE FINALIZADO!</div>
    <div>Parabéns, o seu perfil é: </div>
    <div>${perfisResposta.map(perfil => `<span style="color: ${coresPerfis[perfil]};">${perfis[perfil][0].toUpperCase()}</span>`).join(' ')}</div>`;

    const descricaoFinal = perfisResposta.map(perfil => `<br><div>${descricaoPerfis[perfil]}</div>`).join('');

    salvarDados("perfil", perfisResposta.map(perfil => perfis[perfil][0].toUpperCase()).join(' '));

    return [resultadoFinal, descricaoFinal];
};

function definirOPerfil() {
    const porcentagens = calcularAsPorcentagens();

    const porcentagensOrdenadas = Object.fromEntries(
        Object.entries(porcentagens).sort((a, b) => b[1] - a[1])
    );

    const perfisResposta = Object.keys(porcentagensOrdenadas)
        .filter((perfil) => porcentagensOrdenadas[perfil] > 25)

    return perfisResposta;
};

function calcularAsPorcentagens() {
    const letrasEcolhidas = checarGabarito();
    let repeticoesPorPerfil = {};

    for (const perfil in perfis) {
        repeticoesPorPerfil[perfil] = 0;
    };

    letrasEcolhidas.forEach(letraEscolhida => {
        repeticoesPorPerfil[letraEscolhida]++;
    });

    const resultado = {};
    for (const letraPerfil in perfis) {
        const qtdeRepeticoes = repeticoesPorPerfil[letraPerfil];
        resultado[letraPerfil] = parseFloat((qtdeRepeticoes / qtdeQuestoes * 100).toFixed(1));

        const nomesPerfil = perfis[letraPerfil][1];
        salvarDados(nomesPerfil, `${resultado[letraPerfil]}%`)
    };

    return resultado;
};

function checarGabarito() {
    const respostasLetras = [];

    for (let i = 0; i < respostasSelecionadas.length; i++) {
        const respostaSelecionada = [respostasSelecionadas[i]];

        const gabaritoPergunta = gabarito[i];
        const letraSelecionada = gabaritoPergunta[respostaSelecionada];
        
        salvarDados(`pergunta${i+1}`, letraSelecionada);
        respostasLetras.push(letraSelecionada);
    };

    return respostasLetras;
};