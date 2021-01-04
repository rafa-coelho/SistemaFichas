module.exports = (app) => {

    // Home
    app.get(`/rolagens`, (req, res) => {
        res.sendFile(ROOT + '/pages/index.html');
    });

    // Home
    app.get(`/barra-vida`, (req, res) => {
        res.sendFile(ROOT + '/pages/barra_vida.html');
    });

};