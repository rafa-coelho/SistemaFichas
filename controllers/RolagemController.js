const { DiceRoll } = require('rpg-dice-roller/lib/umd/bundle.js');
const { getPericiaByLabel, getAtributoByLabel } = require('../data/Mapeamento');

module.exports = (app) => {

    app.get(`/rolagem/personagem/:id`, async (req, res) => {
        const { params, query } = req;
        const resp = {
            status: 1,
            data: null,
            errors: [],
            msg: ''
        };

        const timestamp = query.timestamp;

        const rolagem = await Rolagem.Get(`personagem = '${params.id}' AND data >= '${timestamp}'`, 'data DESC');

        await Rolagem.Delete(`id in ('${rolagem.map(x => x.id).join(`', '`)}')`);

        resp.data = {
            timestamp: new Date() / 1000 | 0,
            rolagens: rolagem
        };
        res.send(resp);
    });

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
            titulo: getAtributoByLabel(params.atributo).nome,
            valor: valorRolagem,
            modificador: modificador,
            data: new Date() / 1000 | 0
        };

        if (params.atributo === 'sanidade') {
            const d100 = new DiceRoll(`1d100`);
            valorRolagem = d100.total;
            data.valor = valorRolagem;

            if (valorRolagem === 1) {
                data.tipo = "Extremo";
            } else if (valorRolagem <= valorAtributo) {
                data.tipo = "Sucesso";
            } else if (valorRolagem === 100) {
                data.tipo = "Critico";
            } else {
                data.tipo = "Falha";
            }

        } else {
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

        if (personagem.pericias.find(x => x.nome === pericia.nome)) {
            modificador = modificador + Personagem.calcularProficiencia(personagem.nivel);
        }

        const valorAtributo = personagem[pericia.atributo];

        const roll1 = new DiceRoll(`1d20`);
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

        const sobra = 20 - valorRolagem;
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

    app.get(`/rolagem/rolar/:formula`, async (req, res) => {
        const { query, params } = req;
        const resp = {
            status: 0,
            data: null,
            errors: [],
            msg: ''
        };

        if(query.personagem){
            const personagem = await Personagem.GetFirst(`id = '${query.personagem}'`);
    
            if (!personagem) {
                resp.errors.push({
                    msg: "Personagem não encontrado"
                });
                return res.status(404).send(resp);
            }
        }

        const roll1 = new DiceRoll(`${params.formula || '1d20'}`);
        let valorRolagem = roll1.total;

        const data = {
            id: Util.generateId(),
            personagem: query.personagem,
            formula: params.formula,
            valor: valorRolagem,
            data: new Date() / 1000 | 0
        };

        const createRolagem = await Rolagem.Create(data);
        if (createRolagem.status !== 1) {
            resp.errors.push({
                msg: "Erro ao rolar os dados"
            });
            return res.status(500).send(resp);
        }

        resp.status = 1;
        resp.data = data;

        resp.data = data;
        res.send(resp);
    });

    app.get(`/rolagem/iniciativa`, async (req, res) => {
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

        const modificador = Personagem.calcularModificador(personagem.destreza);


        const roll = new DiceRoll(`1d20+${modificador}`);
        let valorRolagem = roll.total;

        const data = {
            id: Util.generateId(),
            personagem: query.personagem,
            atributo: "destreza",
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

        await Iniciativa.Delete(`personagem = '${query.personagem}'`);

        const createIniciativa = await Iniciativa.Create({
            id: Util.generateId(),
            personagem: query.personagem,
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

    app.delete(`/rolagem/iniciativa`, async (req, res) => {
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

};