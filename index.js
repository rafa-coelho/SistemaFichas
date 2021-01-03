const express = require('express');
const app = express();
const cors = require('cors');
const expressValidator = require("express-validator");

app.use(express.json());
app.use(cors());
app.use(expressValidator());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    res.header('Access-Control-Expose-Headers', '*');
    // res.header('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
});

global.ROOT = __dirname;
global.PROD = process.env.NODE_ENV === 'prod';

const fs = require("fs");

["System", "classes"].forEach(dir => {
    try {
        const files = fs.readdirSync(dir);
        files.forEach(function (file) {
            const Class = require(`./${dir}/${file}`);
            global[file.split(".")[0]] = Class;
        });
    } catch (e) {
        console.log(e);
    }
});

const consign = require('consign');
const Personagem = require('./classes/Personagem');
consign().include('controllers').into(app);


const port = PROD ? 3000 : 3333;    
app.listen(port, async () => {
    console.log("--------------------------------------------");
    for (let index = 0; index < 10; index++) console.log("\n");
    console.clear();
    console.log(`Rodando na porta ${port}`);


});