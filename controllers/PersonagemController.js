const { modificadores } = require('../data/Mapeamento');
const { DiceRoller, DiceRoll } = require('rpg-dice-roller/lib/umd/bundle.js');
const { cookie } = require('express-validator/check');
module.exports = (app) => {

    app.get(`/teste-atributo/:atributo`, async (req, res) => {
        const { query, params } = req;
        const resp = {
            status: 0,
            data: null,
            errors: [],
            msg: ''
        };

        const personagem = await Personagem.GetFirst(`id = '${query.personagem}'`);

        if (!personagem) {
            resp.errors.push({
                msg: "Personagem não encontrado"
            });
            res.status(404).send(resp);
        }

        const valorAtributo = personagem[params.atributo];
        const modificador = Personagem.calcularModificador(valorAtributo);
        const roll1 = new DiceRoll(`1d20+${modificador}`);
        const roll2 = new DiceRoll(`1d20+${modificador}`);

        let valorRolagem = roll1.total;

        switch (query.tipo) {
            case "vantagem":
                valorRolagem = (roll1.total > roll2.total) ? roll1.total : roll2.total;
                break;
            case "desvantagem":
                valorRolagem = (roll1.total < roll2.total) ? roll1.total : roll2.total;
                break;
        }

        const data = {
            id: Util.generateId(), 
            personagem: query.personagem, 
            atributo: params.atributo, 
            titulo: params.atributo, 
            valor: valorRolagem,
            modificador: modificador,
            data: new Date() / 1000 | 0
        };

        if (valorRolagem >= valorAtributo + 5 && valorRolagem <= valorAtributo + 10) data.tipo = "Extremo";
        if (valorRolagem >= valorAtributo && valorRolagem <= valorAtributo + 5) data.tipo = "Sucesso";
        if (valorRolagem >= valorAtributo - 5 && valorRolagem < valorAtributo) data.tipo = "Falha";
        if (valorRolagem >= valorAtributo - 10 && valorRolagem < valorAtributo - 5) data.tipo = "Crítico";

        const createRolagem = await Rolagem.Create(data);
        if (createRolagem.status !== 1) {
            resp.errors.push({
                msg: "Erro ao rolar os dados"
            });
        }

        resp.status = 1;
        resp.data = data;

        res.send(resp);
    });


};