require('dotenv').config()
require('../config/db.js');
const bcrypt = require('bcrypt');
const saltosBcrypt = parseInt(process.env.SALTOS_BCRYPT);
const Usuario = require('../models/animal.model.js');
const mongoose = require('mongoose');

const animales = [
    { id_criadero: "6545010d85c509a0186ffd59", id_especie: "654501a37078142e3e1f1be2", fecha_nacimiento: new Date(2010,0,31), descripcion:"descripcion1", aprovechamiento: "aprovechamiento1", sexo: "H", qr: "qr1" },
    { id_criadero: "6545010d85c509a0186ffd5d", id_especie: "654501a37078142e3e1f1be3", fecha_nacimiento: new Date(2010,0,31), descripcion:"descripcion2", aprovechamiento: "aprovechamiento2", sexo: "H", qr: "qr2"},
    { id_criadero: "6545010d85c509a0186ffd5a", id_especie: "654501a37078142e3e1f1be4", fecha_nacimiento: new Date(2010,0,31), descripcion:"descripcion3", aprovechamiento: "aprovechamiento3", sexo: "M", qr: "qr3"},
    { id_criadero: "6545010d85c509a0186ffd5b", id_especie: "654501a37078142e3e1f1be5", fecha_nacimiento: new Date(2010,0,31), descripcion:"descripcion4", aprovechamiento: "aprovechamiento4", sexo: "M", qr: "qr4"},
    { id_criadero: "6545010d85c509a0186ffd5c", id_especie: "654501a37078142e3e1f1be6", fecha_nacimiento: new Date(2010,0,31), descripcion:"descripcion5", aprovechamiento: "aprovechamiento5", sexo: "NS", qr: "qr5"},
];

Usuario.deleteMany({})  
    .then(() => {
        return Usuario.insertMany(animales);
    })
    .then(() => {
        console.log("criadores creados");
        mongoose.connection.close();
    })
    .catch((error) => {
        console.log(error);
        mongoose.connection.close();
    });