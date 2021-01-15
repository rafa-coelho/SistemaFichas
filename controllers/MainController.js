module.exports = (app) => {

    // Home
    app.get(`/`, (req, res) => {
        res.sendFile(ROOT + '/pages/index.html');
    });

    // Rolagens
    app.get(`/rolagens`, (req, res) => {
        res.sendFile(ROOT + '/pages/index.html');
    });

    // Selecionar Barra de Vida
    app.get(`/ver-vida`, (req, res) => {
        res.sendFile(ROOT + '/pages/ver_vida.html');
    });

    // Barra de Vida
    app.get(`/barra-vida`, (req, res) => {
        res.sendFile(ROOT + '/pages/barra_vida.html');
    });

    // Painel
    app.get(`/painel`, (req, res) => {
        res.sendFile(ROOT + '/pages/painel.html');
    });

    // Painel Mestre
    app.get(`/mestre`, (req, res) => {
        res.sendFile(ROOT + '/pages/mestre.html')
    });

};