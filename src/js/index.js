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
const textosResultados = document.getElementById('textosResultados');

let dados = {};
let indiceQuestaoAtual = 0;
let nomeCompletoResposta = '';
let emailResposta = '';
const respostasSelecionadas = [];

const questoes = [
    { opcoes: ['Quantitativo', 'Estruturado', 'Adaptável', 'Tradicional'] },
    { opcoes: ['Variedade', 'Relacionamento', 'Estabilidade', 'Análise'] },
    { opcoes: ['Método', 'Perspectiva', 'Experimento', 'Aleatório'] },
    { opcoes: ['Diplomático', 'Reservado', 'Entusiasmado', 'Analítico'] },
    { opcoes: ['Visionário', 'Organizado', 'Colaborativo', 'Curioso'] },
    { opcoes: ['Integridade', 'Consistência', 'Possibilidades', 'Consenso'] },
    { opcoes: ['Equilíbrio', 'Foco', 'Conexão', 'Imaginação'] },
    { opcoes: ['Desafios', 'Previsão', 'Motivação', 'Execução'] },
    { opcoes: ['Renovação', 'Prevenção', 'Regras/Normas', 'Comando/Direção'] },
    { opcoes: ['Inovação', 'Parceria', 'Ordem', 'Imaginação'] },
    { opcoes: ['Plano detalhado', 'Esforço direcionado', 'Conflito administrativo', 'Panorama geral'] },
    { opcoes: ['Competência', 'Maturidade', 'Amizade', 'Criatividade'] },
    { opcoes: ['Quanto?', 'Por que?', 'Quem?', 'Quando?'] },
    { opcoes: ['Empatia', 'Lealdade', 'Lógica', 'Espontaneidade'] },
    { opcoes: ['Vencer', 'Manter', 'Recuar', 'Arriscar'] }
];


botaoComecar.addEventListener('click', () => {
    comecar();
});

function comecar() {
    botaoComecar.classList.add('oculto');
    grupoIntroducao.classList.add('oculto');

    grupoDetalheUsuario.classList.remove('oculto');
}


botaoOk.addEventListener('click', () => {
    nomeCompletoResposta = document.getElementById('nomeCompleto').value;
    emailResposta = document.getElementById('email').value;

    if (!nomeCompletoResposta || !emailResposta) {
        alert('Por favor, preencha seu nome completo e e-mail.');
        return;
    }

    salvarDados("nomeCompleto", nomeCompletoResposta);
    salvarDados("email", emailResposta);
    iniciarTeste();
});


function salvarDados(titulo, objeto) {
    dados[titulo] = objeto;

};

function iniciarTeste() {
    grupoDetalheUsuario.classList.add('oculto');

    grupoProgresso.classList.remove('oculto');
    grupoOpcoes.classList.remove('oculto');
    mostrarQuestao(0);
}

function mostrarQuestao(indiceQuestaoAtual) {
    const questao = questoes[indiceQuestaoAtual];
    grupoOpcoes.innerHTML = '';

    const gridOpcoes = document.createElement('div');
    gridOpcoes.classList.add('gridOpcoes');

    questao.opcoes.forEach((opcao, opcaoIndex) => {
        const alternativa = document.createElement('button');

        alternativa.textContent = opcao;
        alternativa.addEventListener('click', () => {

            removerSelecaoAnterior();
            alternativa.classList.add('selecionada');
            armazenarResposta(opcaoIndex);

        });
        gridOpcoes.appendChild(alternativa);

    });
    grupoOpcoes.appendChild(gridOpcoes);
}

function removerSelecaoAnterior() {
    const alternativaJaSelecionada = document.querySelector('.selecionada');
    if (alternativaJaSelecionada) {
        alternativaJaSelecionada.classList.remove('selecionada');
    }
}

function armazenarResposta(selectedIndex) {
    respostasSelecionadas[indiceQuestaoAtual] = selectedIndex;

    if (indiceQuestaoAtual < questoes.length - 1) {
        botaoProxima.classList.remove('oculto');
    } else {
        botaoEnviar.classList.remove('oculto');
    }
};


botaoProxima.addEventListener('click', () => {
    indiceQuestaoAtual++;
    botaoProxima.classList.add("oculto");

    if (indiceQuestaoAtual < questoes.length) {
        mostrarQuestao(indiceQuestaoAtual);
        atualizarProgresso();
    }
});

function atualizarProgresso() {
    const progressoAtual = (indiceQuestaoAtual / questoes.length) * 100;
    progressoDetalhe.textContent = `${progressoAtual.toFixed(1)}%`;
    barraProgresso.value = progressoAtual;
};


botaoEnviar.addEventListener('click', () => {
    botaoEnviar.classList.add("oculto");
    finalizarTeste();
});

function finalizarTeste() {
    grupoOpcoes.classList.add("oculto");
    grupoProgresso.classList.add("oculto");

    const [resultadoFinal, descricaoFinal] = imprimirOResultado();

    textoFinal.innerHTML = resultadoFinal;
    textosResultados.innerHTML = descricaoFinal;

    enviarDadosParaPlanilha(dados);

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
    'Condutor': 'D',
    'Guardião': 'G',
    'Conciliador': 'I',
    'Pioneiro': 'P'
};



const descricaoPerfis = {
    'Condutor': `<img src="./src/imagens/Condutores.jpg" alt="Imagem de Condutores" class="perfil-imagem">`,
    'Guardião': `<img src="./src/imagens/Guardioes.jpg" alt="Imagem de Guardioes" class="perfil-imagem">`,
    'Conciliador': `<img src="./src/imagens/Conciliadores.jpg" alt="Imagem de Conciliadores" class="perfil-imagem">`,
    'Pioneiro': `<img src="./src/imagens/Pioneiros.jpg" alt="Imagem de Pioneiros" class="perfil-imagem">`
};

const coresPerfis = {
    'Condutor': '#F03E24',
    'Guardião': '#4A70B7',
    'Conciliador': '#43A848',
    'Pioneiro': '#FDAF1B'
};


function imprimirOResultado() {
    let perfisResposta = definirOPerfil();

    let resultadoFinal = `<div>TESTE FINALIZADO!</div>
    <div>Parabéns, o seu perfil é:</div>`;
    let descricaoFinal = '';

    for (const perfil of perfisResposta) {
        const corPerfil = coresPerfis[perfil];
        const spanTag = `<span style="color: ${corPerfil};">${perfil.toUpperCase()}</span>`
        resultadoFinal += ` ${spanTag}`;
        descricaoFinal += `<br><div>${descricaoPerfis[perfil]}</div>`;
    };

    const perfilFinal = perfisResposta.map(item => item.toUpperCase()).join(' ');
    salvarDados("perfil", perfilFinal);

    return [resultadoFinal, descricaoFinal];
};

function definirOPerfil() {
    const porcentagens = calcularAsPorcentagens();

    const porcentagensOrdenadas = Object.fromEntries(
        Object.entries(porcentagens).sort((a, b) => b[1] - a[1])
    );

    const perfisOrdenados = Object.keys(porcentagensOrdenadas);
    const valoresOrdenados = Object.values(porcentagensOrdenadas);

    const [valorTop1, valorTop2, valorTop3] = valoresOrdenados.slice(0, 3);

    let perfisResposta = [];

    if (valorTop3 > 25) {
        perfisResposta = perfisOrdenados.slice(0, 3);
    } else if (valorTop2 > 25) {
        perfisResposta = perfisOrdenados.slice(0, 2);
    } else {
        perfisResposta = perfisOrdenados.slice(0, 1);
    };
    return perfisResposta;
}

function calcularAsPorcentagens() {
    const letrasEcolhidas = checarGabarito();
    const qtdeAlternativas = gabarito.length;

    const qtdeLetras = {};
    for (let i = 0; i < letrasEcolhidas.length; i++) {
        const letra = letrasEcolhidas[i];
        qtdeLetras[letra] = (qtdeLetras[letra] || 0) + 1;
    }

    const resultado = {};
    const perfisChaves = Object.keys(perfis);

    for (const perfil of perfisChaves) {
        const qtde = qtdeLetras[perfis[perfil]];
        resultado[perfil] = parseFloat((qtde / qtdeAlternativas * 100).toFixed(1));
    }

    return resultado;
};

function checarGabarito() {
    const respostasLetras = [];

    for (let i = 0; i < respostasSelecionadas.length; i++) {
        const letra = gabarito[i][respostasSelecionadas[i]];
        respostasLetras.push(letra);
    };

    for (let i = 0; i < respostasLetras.length; i++) {
        salvarDados(`pergunta${i+1}`, respostasLetras[i]);
    };

    return respostasLetras;
};