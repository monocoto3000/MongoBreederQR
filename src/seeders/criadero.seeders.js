require('dotenv').config()
require('../config/db.js');
const bcrypt = require('bcrypt');
const saltosBcrypt = parseInt(process.env.SALTOS_BCRYPT);
const Usuario = require('../models/criadero.model.js');
const mongoose = require('mongoose');

const criaderos = [
    { nombre: "nombre1", apellido_paterno: "apellido_paterno1", apellido_materno:"apellido_materno1", usuario:"usuario1", correo: "correo1@gmail.com", password: bcrypt.hashSync('1234', saltosBcrypt) },
    { nombre: "nombre2", apellido_paterno: "apellido_paterno2", apellido_materno:"apellido_materno2", usuario:"usuario2", correo: "correo2@gmail.com", password: bcrypt.hashSync('1234', saltosBcrypt) },
    { nombre: "nombre3", apellido_paterno: "apellido_paterno3", apellido_materno:"apellido_materno3", usuario:"usuario3", correo: "correo3@gmail.com", password: bcrypt.hashSync('1234', saltosBcrypt) },
    { nombre: "nombre4", apellido_paterno: "apellido_paterno4", apellido_materno:"apellido_materno4", usuario:"usuario4", correo: "correo4@gmail.com", password: bcrypt.hashSync('1234', saltosBcrypt) },
    { nombre: "nombre5", apellido_paterno: "apellido_paterno5", apellido_materno:"apellido_materno5", usuario:"usuario5", correo: "correo5@gmail.com", password: bcrypt.hashSync('1234', saltosBcrypt) },
];

Usuario.deleteMany({})
    .then(() => {
        return Usuario.insertMany(criaderos);
    })
    .then(() => {
        console.log("usuarios creados");
        mongoose.connection.close();
    })
    .catch((error) => {
        console.log(error);
        mongoose.connection.close();
    });