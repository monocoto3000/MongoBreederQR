require('dotenv').config()
require('../config/db.js');
const Usuario = require('../models/especie.model.js');
const mongoose = require('mongoose');

const especies = [
    { nombre: "especie1" },
    { nombre: "especie2" },
    { nombre: "especie3" },
    { nombre: "especie4" },
    { nombre: "especie5" },
];

Usuario.deleteMany({})
    .then(() => {
        return Usuario.insertMany(especies);
    })
    .then(() => {
        console.log("especies creadas");
        mongoose.connection.close();
    })
    .catch((error) => {
        console.log(error);
        mongoose.connection.close();
    });