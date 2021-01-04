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

        resp.data = {
            timestamp: new Date() / 1000 | 0,
            rolagens: rolagem
        };
        res.send(resp);
    });

};