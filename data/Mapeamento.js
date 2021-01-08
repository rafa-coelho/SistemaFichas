const data = {};

data.pericias = [
    { nome: "Acrobacia", label: "acrobacia", atributo: "destreza" },
    { nome: "Arcanismo", label: "arcanismo", atributo: "inteligencia" },
    { nome: "Atletismo", label: "atletismo", atributo: "forca" },
    { nome: "Atuação", label: "atuacaoo", atributo: "carisma" },
    { nome: "Blefar", label: "blefar", atributo: "carisma" },
    { nome: "Furtividade", label: "furtividade", atributo: "destreza" },
    { nome: "História", label: "historia", atributo: "inteligencia" },
    { nome: "Intimidação", label: "intimidacao", atributo: "carisma" },
    { nome: "Intuição", label: "intuicao", atributo: "sabedoria" },
    { nome: "Investigação", label: "investigacao", atributo: "inteligencia" },
    { nome: "Lidar com Animais", label: "lidar-com-animais", atributo: "sabedoria" },
    { nome: "Medicina", label: "medicina", atributo: "sabedoria" },
    { nome: "Natureza", label: "natureza", atributo: "inteligencia" },
    { nome: "Percepção", label: "percepcao", atributo: "sabedoria" },
    { nome: "Persuasão", label: "persuasao", atributo: "carisma" },
    { nome: "Prestidigitação", label: "prestidigitacao", atributo: "destreza" },
    { nome: "Religião", label: "religiao", atributo: "inteligencia" },
    { nome: "Sobrevivência", label: "sobrevivencia", atributo: "sabedoria" },
];

data.atributos = [
    { nome: "Destreza", label: "destreza" },
    { nome: "Inteligência", label: "inteligencia" },
    { nome: "Força", label: "forca" },
    { nome: "Carisma", label: "carisma" },
    { nome: "Sabedoria", label: "sabedoria" },
    { nome: "Constituição", label: "constituicao" },
    { nome: "Sanidade", label: "sanidade" },
];

data.getAtributoByLabel = (label) => {
    return data.atributos.find(x => x.label === label);
};

data.getPericiaByLabel = (label) => {
    return data.pericias.find(x => x.label === label);
};


data.loucura = {
    curta: [
        { min: 01, max: 20, descricao: "O personagem se retrai em sua mente, ficando paralisado. O efeito termina se o personagem sofrer qualquer dano" },
        { min: 21, max: 30, descricao: "O personagem fica incapacitado e passa seu turno gritando, rindo ou chorando" },
        { min: 31, max: 40, descricao: "O personagem fica amedrontado e deve usar sua ação para se mover a cada rodada para fugir da fonte do medo" },
        { min: 41, max: 50, descricao: "O personagem começa a balbuciar e fica incapaz de falar ou conjurar normalmente" },
        { min: 51, max: 60, descricao: "O personagem deve usar sua ação a cada rodada para atacar a criatura mais próxima" },
        { min: 61, max: 70, descricao: "O personagem experimenta alucinações vívidas e tem desvantagem em testes de habilidade" },
        { min: 71, max: 75, descricao: "O personagem faz o que qualquer um mandar ele fazer que não seja obviamente suicida" },
        { min: 76, max: 80, descricao: "O personagem experimenta uma vontade avassaladora de comer coisas estranhas como terra, limo ou restos" },
        { min: 81, max: 90, descricao: "O personagem fica atordoado" },
        { min: 91, max: 100, descricao: "O personagem cai inconsciente" }
    ],
    longa: [
        { min: 01, max: 10, descricao: "O personagem se sente obrigado a repetir uma atividade específica de novo e de novo, como lavar as mãos, tocar em coisas, rezar ou contar moedas" },
        { min: 11, max: 20, descricao: "O personagem experimenta uma alucinação vívida e tem desvantagem em testes de habilidade" },
        { min: 21, max: 30, descricao: "O personagem sofre de paranoia extrema. Ele tem desvantagem em testes de Sabedoria e Carisma" },
        { min: 31, max: 40, descricao: "O personagem considera algo (geralmente a fonte de sua loucura) intensamente repulsivo, como se tivesse sido afetado pelo efeito de antipatia da magia antipatia/simpatia" },
        { min: 41, max: 45, descricao: "O personagem experimenta uma alucinação poderosa. Escolha uma poção. O personagem imagina estar sob efeito dela" },
        { min: 46, max: 55, descricao: "O personagem fica ligado a um “talismã da sorte”, como uma pessoa ou objeto e tem desvantagem nas jogadas de ataque, testes de habilidade e testes de resistência enquanto estiver a mais de 9 metros dele" },
        { min: 56, max: 65, descricao: "O personagem fica cego (25%) ou surdo (75%)" },
        { min: 66, max: 75, descricao: "O personagem experimenta tremores e tiques incontroláveis, que impõem desvantagem em jogadas de ataque, testes de habilidade e testes de resistência que envolvam Força ou Destreza" },
        { min: 76, max: 85, descricao: "O personagem sofre de amnesia parcial. Ele sabe quem ele é e mantem seus traços raciais e características de classe, mas não reconhece outras pessoas ou lembra de qualquer coisa que tenha acontecido antes da loucura afeta-lo" },
        { min: 86, max: 90, descricao: "Sempre que o personagem sofrer dano, ele deve ser bem sucedido num teste de resistência de Sabedoria CD 15 ou será afetado como se tivesse fracassado no teste de resistência contra a magia confusão. O efeito de confusão dura por 1 minuto" },
        { min: 91, max: 95, descricao: "O personagem perde a capacidade de falar" },
        { min: 96, max: 100, descricao: "O personagem cai inconsciente. Nenhuma quantidade de empurrões ou dano conseguem acorda-lo" }
    ],
    permanente: [
        { min: 01, max: 15, descricao: "Estar bêbado me mantem são." },
        { min: 16, max: 25, descricao: "Eu guardo tudo que encontro." },
        { min: 26, max: 30, descricao: "'Eu tento me parecer mais com alguém que conheço' adotando seu estilo de roupa, maneirismos e nome." },
        { min: 31, max: 35, descricao: "Eu devo distorcer a verdade, exagerar ou mentir abertamente para ser interessante para outras pessoas." },
        { min: 36, max: 45, descricao: "Alcançar meus objetivos é a única coisa que me importa, e eu vou ignorar todo o resto para perseguir isso." },
        { min: 46, max: 50, descricao: "Eu acho difícil me importar com qualquer coisa que esteja ao meu redor." },
        { min: 51, max: 55, descricao: "Eu não gosto da forma como as pessoas me jugam o tempo todo." },
        { min: 56, max: 70, descricao: "Eu sou o mais esperto, sábio, forte, rápido e belo de todas as pessoas que conheço." },
        { min: 71, max: 80, descricao: "Eu estou convencido que inimigos poderosos estão me caçando e seus agentes estão em todo canto. Eu tenho certeza que estão me observando o tempo todo." },
        { min: 81, max: 85, descricao: "Só existe uma pessoa em quem posso confiar. E apenas eu posso ver esse amigo especial." },
        { min: 86, max: 95, descricao: "Eu não consigo levar nada a sério. Quanto mais séria a situação, mais engraçada eu a considero." },
        { min: 96, max: 100, descricao: "Eu descobri que eu realmente adoro matar pessoas." }
    ]
};

data.getLoucura = (tipo, valor) => {
    return data.loucura[tipo].find(x => valor >= x.min && valor <= x.max);
};


module.exports = data;