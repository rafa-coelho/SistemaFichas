module.exports = (app) => {

    // Home
    app.get(`/rolagens`, (req, res) => {
        res.sendFile(ROOT + '/pages/index.html');
    });

    // Barra de Vida
    app.get(`/barra-vida`, (req, res) => {
        res.sendFile(ROOT + '/pages/barra_vida.html');
    });

    // Daniel é otário
    app.get(`/fingerprint`, (req, res) => {
        res.sendFile(ROOT + '/pages/daniel_otario.html');
    });

    

};

