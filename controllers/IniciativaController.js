const { DiceRoll } = require('rpg-dice-roller/lib/umd/bundle.js');
const { getPericiaByLabel, getAtributoByLabel, getLoucura } = require('../data/Mapeamento');
module.exports = (app) => {

    app.post(`/iniciativa/:personagem`, async (req, res) => {
        const { params } = req;
        const resp = {
            status: 0,
            data: null,
            errors: [],
            msg: ''
        };

        const personagem = await Personagem.GetFirst(`id = '${params.personagem}'`);

        if (!personagem) {
            resp.errors.push({
                msg: "Personagem não encontrado"
            });
            return res.status(404).send(resp);
        }

        const modificador = Personagem.calcularModificador(personagem.destreza);


        const roll = new DiceRoll(`1d20+${modificador}`);
        let valorRolagem = roll.total;

        const data = {
            id: Util.generateId(),
            personagem: params.personagem,
            atributo: "Destreza",
            titulo: "Iniciativa",
            valor: valorRolagem,
            modificador: modificador,
            data: new Date() / 1000 | 0
        };

        const createRolagem = await Rolagem.Create(data);
        if (createRolagem.status !== 1) {
            resp.errors.push({
                msg: "Erro ao rolar os dados"
            });
            return res.status(500).send(resp);
        }

        await Iniciativa.Delete(`personagem = '${params.personagem}'`);

        const createIniciativa = await Iniciativa.Create({
            id: Util.generateId(),
            personagem: params.personagem,
            valor: valorRolagem
        });

        if (createIniciativa.status !== 1) {
            resp.errors.push({
                msg: "Erro ao gravar iniciativa"
            });
            return res.status(500).send(resp);
        }

        resp.status = 1;
        resp.data = data;
        res.send(resp);
    });

    app.delete(`/iniciativa`, async (req, res) => {
        const resp = {
            status: 0,
            errors: [],
            msg: ''
        };
        
        const del = await Iniciativa.Delete();
        if(del.status !== 1){
            resp.errors.push({
                msg: "Erro ao limpar iniciativa"
            });
            return res.status(500).send(resp);
        }

        resp.status = 1;
        resp.msg = "Iniciativa Limpa";
        res.send(resp);
    });

    app.get(`/iniciativa`, async (req, res) => {
        const resp = {
            status: 0,
            data: null,
            errors: [],
            msg: ''
        };

        const iniciativas = await Iniciativa.Get('', 'valor DESC');

        for (const i in iniciativas) 
            iniciativas[i].personagem = await Personagem.GetFirst(`id = '${iniciativas[i].personagem}'`);
        
        resp.status = 1;
        resp.data = iniciativas;
        res.send(resp);
    });

};