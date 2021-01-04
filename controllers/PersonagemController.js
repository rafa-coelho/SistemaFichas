const { DiceRoll } = require('rpg-dice-roller/lib/umd/bundle.js');
const { getPericiaByLabel } = require('../data/Mapeamento');

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
            return res.status(404).send(resp);
        }

        const valorAtributo = personagem[params.atributo];
        const modificador = Personagem.calcularModificador(valorAtributo);
        
        const roll1 = new DiceRoll(`1d20`);
        let valorRolagem = roll1.total;

        const data = {
            id: Util.generateId(),
            personagem: query.personagem,
            atributo: params.atributo,
            titulo: params.atributo,
            valor: valorRolagem,
            modificador: modificador,
            data: new Date() / 1000 | 0
        };

        const sobra = 20 - valorAtributo;
        if (valorRolagem === 1) {
            data.tipo = "Critico";
        } else if (sobra > valorRolagem) {
            data.tipo = "Falha";
        } else if (sobra + valorAtributo * 0.5 >= valorRolagem) {
            data.tipo = "Normal";
        } else if (sobra + valorAtributo * 0.9 >= valorRolagem) {
            data.tipo = "Bom";
        } else {
            data.tipo = "Extremo";
        }


        const createRolagem = await Rolagem.Create(data);
        if (createRolagem.status !== 1) {
            resp.errors.push({
                msg: "Erro ao rolar os dados"
            });
            return res.status(500).send(resp);
        }

        resp.status = 1;
        resp.data = data;

        res.send(resp);
    });

    app.get(`/teste-pericia/:pericia`, async (req, res) => {
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
            return res.status(404).send(resp);
        }

        personagem.pericias = (await Pericia.Get(`personagem = '${personagem.id}'`)) || [];
        const pericia = getPericiaByLabel(params.pericia);

        let modificador = Personagem.calcularModificador(personagem[pericia.atributo]);
        
        if(personagem.pericias.find(x => x.nome === pericia.nome)){
            modificador = modificador + Personagem.calcularProficiencia(personagem.nivel);
        }
        
        const valorPericia = modificador + personagem[pericia.atributo];

        const roll1 = new DiceRoll(`1d20+${modificador}`);
        let valorRolagem = roll1.total;        
        
        const data = {
            id: Util.generateId(),
            personagem: query.personagem,
            atributo: pericia.nome,
            titulo: params.atributo,
            valor: valorRolagem,
            modificador: modificador,
            data: new Date() / 1000 | 0
        };

        const porcent = (valorRolagem / (20 + modificador)) * 100;

        if(valorRolagem === 1){
            data.tipo = "Crítico";
        }else if (porcent < 50){
            data.tipo = "Falha";
        }else if(porcent >= 50 && porcent < 90){
            data.tipo = "Normal";
        }else{
            data.tipo = "Extremo";
        }
        const createRolagem = await Rolagem.Create(data);
        if (createRolagem.status !== 1) {
            resp.errors.push({
                msg: "Erro ao rolar os dados"
            });
            return res.status(500).send(resp);
        }


        resp.status = 1;
        resp.data = data;
        res.send(resp);
    });


    app.get(`/personagem/:id`, async (req, res) => {
        const { params } = req;
        const resp = {
            status: 0,
            data: null,
            errors: [],
            msg: ''
        };

        const personagem = await Personagem.GetFirst(`id = '${params.id}'`);

        if (!personagem) {
            resp.errors.push({
                msg: "Personagem não encontrado!"
            });
            return res.status(404).send(resp);
        }

        resp.status = 1;
        resp.data = personagem;
        res.send(resp);
    });

    app.put(`/personagem/:id`, async (req, res) => {
        const { params, body } = req;
        const resp = {
            status: 0,
            data: null,
            errors: [],
            msg: ''
        };

        const personagem = await Personagem.GetFirst(`id = '${params.id}'`);

        if (!personagem) {
            resp.errors.push({
                msg: "Personagem não encontrado!"
            });
        }

        const proibidos = ['id'];

        let edit = false;

        const payload = {};
        Personagem.fields.forEach(campo => {
            if (body[campo] !== undefined && !proibidos.includes(campo)) {
                payload[campo] = body[campo];
                edit = true;
            }
        });

        if (body.pericias) {
            // perícias...
        }

        if (body.resistencia) {
            // resistencia...
        }

        if (!edit) {
            resp.errors.push({
                msg: "Nada para editar"
            });
            return res.status(400).send(resp);
        }

        const update = await Personagem.Update(payload, `id = '${params.id}'`);

        if (update.status !== 1) {
            resp.errors.push({
                msg: "Não foi possivel atualizar",
            });

            return res.status(500).send(resp);
        }

        resp.status = 1;
        resp.msg = "Atualizado com sucesso";
        res.send(resp);
    });

};