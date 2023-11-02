require('dotenv').config()
require('../config/db.js');

const bcrypt = require('bcrypt');
const saltosBcrypt = parseInt(process.env.SALTOS_BCRYPT);
const Usuario = require('../models/criador.model.js');
const mongoose = require('mongoose');

const criadores = [
    { nombre: "nombre1", correo: "correo1@gmail.com", password: bcrypt.hashSync('1234', saltosBcrypt) },
    { nombre: "nombre2", correo: "correo2@gmail.com", password: bcrypt.hashSync('1234', saltosBcrypt) },
    { nombre: "nombre3", correo: "correo3@gmail.com", password: bcrypt.hashSync('1234', saltosBcrypt) },
    { nombre: "nombre4", correo: "correo4@gmail.com", password: bcrypt.hashSync('1234', saltosBcrypt) },
    { nombre: "nombre5", correo: "correo5@gmail.com", password: bcrypt.hashSync('1234', saltosBcrypt) },
    { nombre: "nombre6", correo: "correo6@gmail.com", password: bcrypt.hashSync('1234', saltosBcrypt) },
    { nombre: "nombre7", correo: "correo7@gmail.com", password: bcrypt.hashSync('1234', saltosBcrypt) },
    { nombre: "nombre8", correo: "correo8@gmail.com", password: bcrypt.hashSync('1234', saltosBcrypt) },
    { nombre: "nombre9", correo: "correo9@gmail.com", password: bcrypt.hashSync('1234', saltosBcrypt) },
    { nombre: "nombre10", correo: "correo10@gmail.com", password: bcrypt.hashSync('1234', saltosBcrypt) },
];

Usuario.deleteMany({})
    .then(() => {
        return Usuario.insertMany(criadores);
    })
    .then(() => {
        console.log("usuarios creados");
        mongoose.connection.close();
    })
    .catch((error) => {
        console.log(error);
        mongoose.connection.close();
    });