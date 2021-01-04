const data = {};

data.modificadores = [
    { valor: 1, modificador: -5 },
    { valor: 2, modificador: -4 },
    { valor: 3, modificador: -4 },
    { valor: 4, modificador: -3 },
    { valor: 5, modificador: -3 },
    { valor: 6, modificador: -2 },
    { valor: 7, modificador: -2 },
    { valor: 8, modificador: -1 },
    { valor: 9, modificador: -1 },
    { valor: 10, modificador: 0 },
    { valor: 11, modificador: 0 },
    { valor: 12, modificador: 1 },
    { valor: 13, modificador: 1 },
    { valor: 14, modificador: 2 },
    { valor: 15, modificador: 2 },
    { valor: 16, modificador: 3 },
    { valor: 17, modificador: 3 },
    { valor: 18, modificador: 4 },
    { valor: 19, modificador: 4 },
    { valor: 20, modificador: 5 },
    { valor: 21, modificador: 5 },
    { valor: 22, modificador: 6 },
    { valor: 23, modificador: 6 },
    { valor: 24, modificador: 7 },
    { valor: 25, modificador: 7 },
    { valor: 26, modificador: 8 },
    { valor: 27, modificador: 8 },
    { valor: 28, modificador: 9 },
    { valor: 29, modificador: 9 }
];



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

data.getPericiaByLabel = (label) => {
    return data.pericias.find(x => x.label === label);
};

module.exports = data;