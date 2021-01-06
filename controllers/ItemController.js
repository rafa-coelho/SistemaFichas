module.exports = (app) => {

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