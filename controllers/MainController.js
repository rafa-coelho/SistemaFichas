module.exports = (app) => {

    // Home
    app.get(`/rolagens`, (req, res) => {
        res.sendFile(ROOT + '/pages/index.html');
    });

    // Barra de Vida
    app.get(`/barra-vida`, (req, res) => {
        res.sendFile(ROOT + '/pages/barra_vida.html');
    });

    // Painel
    app.get(`/`, (req, res) => {
        res.sendFile(ROOT + '/pages/index.html');
    });
    // Painel
    app.get(`/painel`, (req, res) => {
        res.sendFile(ROOT + '/pages/painel.html');
    });

    

};

