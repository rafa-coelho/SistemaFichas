module.exports = (app) => {

    app.put(`/item/:id`, async (req, res) => {
        const { params, body } = req;
        const resp = {
            status: 0,
            data: null,
            errors: [],
            msg: ''
        };

        const item = await Item.GetFirst(`id = '${params.id}'`);

        if (!item) {
            resp.errors.push({
                msg: "Item não encontrado"
            });
            return res.status(404).send(resp);
        }

        const proibidos = ['id'];

        let edit = false;

        const payload = {};
        Item.fields.forEach(campo => {
            if (body[campo] !== undefined && !proibidos.includes(campo)) {
                payload[campo] = body[campo];
                edit = true;
            }
        });

        if (!edit) {
            resp.errors.push({
                msg: "Nada para editar"
            });
            return res.status(400).send(resp);
        }

        const update = await Item.Update(payload, `id = '${params.id}'`);

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

    app.delete(`/item/:id`, async (req, res) => {
        const { params } = req;
        const resp = {
            status: 0,
            data: null,
            errors: [],
            msg: ''
        };

        const item = await Item.GetFirst(`id = '${params.id}'`);

        if (!item) {
            resp.errors.push({
                msg: "Item não encontrado"
            });
            return res.status(404).send(resp);
        }


        const del = await Item.Delete(`id = '${params.id}'`);

        if(del.status !== 1){
            resp.errors.push({
                msg: "Erro ao excluir item"
            });
            return res.status(500).send(resp);
        }

        resp.status = 1;
        res.send(resp);
    });

};