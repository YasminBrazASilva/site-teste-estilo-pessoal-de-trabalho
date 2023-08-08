const botaoComecar = document.getElementById('botaoComecar');
const grupoIntroducao = document.getElementById('grupoIntroducao');
const gruopoDetalheUsuario = document.getElementById('gruopoDetalheUsuario');
const botaoOk = document.getElementById('ok');
const grupoOpcoes = document.getElementById('grupoOpcoes');
const botaoProxima = document.getElementById('botaoProxima');
const grupoProgresso = document.getElementById('grupoProgresso');
const barraProgresso = document.getElementById('barraProgresso');
const progressoDetalhe = document.getElementById('progressoDetalhe');
const textoFinal = document.getElementById('textoFinal');
const textosResultados = document.getElementById('textosResultados');

let indiceQuestaoAtual = 0;
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
    gruopoDetalheUsuario.classList.remove('oculto');
}


botaoOk.addEventListener('click', () => {
    const nomeCompleto = document.getElementById('nomeCompleto').value;
    const email = document.getElementById('email').value;

    if (!nomeCompleto || !email) {
        alert('Por favor, preencha seu nome completo e e-mail.');
        return;
    }

    iniciarTeste();
});

function iniciarTeste() {
    gruopoDetalheUsuario.classList.add('oculto');
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
            amazenarResposta(opcaoIndex);

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

function amazenarResposta(selectedIndex) {
    respostasSelecionadas[indiceQuestaoAtual] = selectedIndex;
    botaoProxima.classList.remove('oculto');
}



botaoProxima.addEventListener('click', () => {
    indiceQuestaoAtual++;
    botaoProxima.classList.add("oculto")

    if (indiceQuestaoAtual < questoes.length) {
        mostrarQuestao(indiceQuestaoAtual);
        atualizarProgresso();
    } else {
        finalizarTeste();
    }
});

function atualizarProgresso() {
    const progressoAtual = (indiceQuestaoAtual / questoes.length) * 100;
    progressoDetalhe.textContent = `${progressoAtual.toFixed(1)}%`;
    barraProgresso.value = progressoAtual;
};

function finalizarTeste() {
    grupoOpcoes.classList.add("oculto");
    grupoProgresso.classList.add("oculto");
    
    const [resultadoFinal, descricaoFinal] = imprimirOResultado();
    
    textoFinal.innerHTML = resultadoFinal;
    textosResultados.innerHTML = descricaoFinal;
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
    'Condutor': `<div>CONDUTORES</div>
    <div>Gostam de examinar profundamente os sistemas, são lógicos e se aprofundam na  análise, participam em discussões envolvendo lógica, pensam criticamente e têm  disposição para o debate. Falam diretamente e diz o que está em suas mentes.
    Valorizam o desafio e geram MOMENTUM. Para eles é muito importante obter  resultados e vencer. Para os condutores, as questões são preto no branco. Eles  atacam os problemas de frente, armados com dados e lógica.</div>
    <div>Estimulado por: Resolução de problemas, Integridade de caráter e Vencer</div>  
    <div>Desestimulado por: Indecisão, Ineficiência, Falta de foco</div>`,

    'Guardião': `<div>GUARDIÕES</div>
    <div>Gostam da realidade concreta, eles respeitam o que é experimentado e aprovado “Verdadeiro”.
    Valorizam a estabilidade e contribuem com ordem e rigor. São pragmáticos e  hesitam em abraçar o risco. Para eles, dados e fatos são requisitos  indispensáveis, e eles priorizam os detalhes. Acreditam que é razoável  aprender como passado.</div>
    <div> Estimulado por: Organização, Previsibilidade e Consistência, Plano detalhado  </div>
    <div>Desestimulado por: Desordem, Pressão por prazos, Ambiguidade e Incerteza </div>`,

    'Conciliador': `<div>CONCILIADORES</div>
    Gostam de se conectar em um nível pessoal e descobrir como as peças se
    encaixam. Conciliadores valorizam as relações e mantêm as equipes unidas.  Relacionamentos e responsabilidades são indispensáveis para o grupo. Os  conciliadores tendem a acreditar que, em geral, as coisas são relativas. São diplomáticos e preocupados em chegar ao consenso.</div>
    <div>Estimulado por: Colaboração, Comunicação, Confiança	e Respeito</div> 
    <div>Desestimulado por: Políticas, Conflitos, Inflexibilidade</div>`,

    'Pioneiro': `<div>PIONEIROS</div>
    <div>Gostam de varias possibilidades (variedades).  Amam gerar novas ideias. Valorizam os talentos e disparam centelhas de energia e imaginação em  sua equipes. Eles acreditam que vale a pena assumir riscos e que é bom  seguir seus instintos. Focam no panorama. São atraídos por novas ideias  audaciosas e abordagens criativas.</div>
    <div>Estimulado por: Brainstorming, Espontaneidade, tentar coisas novas e  entusiasmo</div>
    <div>Desestimulado por: Regras e Estruturas, A palavra NÃO e foco no  processo</div>`
}

const coresPerfis = {
    'Condutor': '#EF3C28',
    'Guardião': '#2121D7',
    'Conciliador': '#49AA4B',
    'Pioneiro': '#F9BF1D'
};


function imprimirOResultado() {
    const [letrasEcolhidas, porcentagens] = calcularAsPorcentagens();
    let perfisResposta = definirOPerfil(porcentagens);

    let resultadoFinal = `<div>TESTE FINALIZADO!</div>
    <div>Parabéns, o seu perfil é:</div>`;
    let descricaoFinal = '';
    
    for (const perfil of perfisResposta) {
        const corPerfil = coresPerfis[perfil];
        const spanTag = `
        <span style="background-color: rgba(255, 255, 255, 0.5); padding-left: 2px; padding-right: 2px; margin: 2px;">
        <span style="color: ${corPerfil};">${perfil.toUpperCase()}</span>
        </span>`
        resultadoFinal += ` ${spanTag}`;
        descricaoFinal += `<br><div>${descricaoPerfis[perfil]}</div>`;
    }  

    return [resultadoFinal, descricaoFinal];
};

function definirOPerfil(porcentagens) {
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
    const qtdeAlternativas = gabarito.length;
    const letrasEcolhidas = checarGabarito();

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

    return [letrasEcolhidas, resultado];
};

function checarGabarito() {
    const respostasLetras = [];

    for (let i = 0; i < respostasSelecionadas.length; i++) {
        const letra = gabarito[i][respostasSelecionadas[i]];
        respostasLetras.push(letra);
    }

    return respostasLetras;
};
