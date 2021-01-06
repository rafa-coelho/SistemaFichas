
module.exports = (app) => {

    app.get(`/personagem`, async (req, res) => {
        const { query } = req;
        const resp = {
            status: 0,
            data: null,
            errors: []
        };

        const where = query.where || "";

        
        const personagens = await Personagem.Get(where);


        resp.status = 1;
        resp.data = personagens;
        res.send(resp);
    });

    app.get(`/personagem/:id`, async (req, res) => {
        const { params, query } = req;
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

        if(query.completo){
            const itens = await Item.Get(`personagem = '${params.id}'`)
            personagem.inventario = {
                peso: itens.reduce((a, b) => {
                    return a + (parseFloat(b.peso) * b.quantidade)
                }, 0),
                ataques: itens.filter(item => [2, 3].includes(item.tipo)).sort((a, b) => {
                    if (a.tipo > b.tipo) {
                        return 1;
                    }
                    if (a.tipo < b.tipo) {
                        return -1;
                    }
                    return 0;
                }),
                itens: itens.filter(item => [1, 2].includes(item.tipo)).sort((a, b) => {
                    if (a.tipo < b.tipo) {
                        return 1;
                    }
                    if (a.tipo > b.tipo) {
                        return -1;
                    }
                    return 0;
                }),
            };
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