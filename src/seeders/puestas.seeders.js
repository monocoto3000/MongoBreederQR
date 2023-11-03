require('dotenv').config()
require('../config/db.js');
const Usuario = require('../models/puestas.model.js');
const mongoose = require('mongoose');

const puestas = [
    { id_animal: "", cantidad: 5 },
    { id_animal: "", cantidad: 5 },
    { id_animal: "", cantidad: 5 },
    { id_animal: "", cantidad: 5 },
    { id_animal: "", cantidad: 5 },
];

Usuario.deleteMany({})
    .then(() => {
        return Usuario.insertMany(puestas);
    })
    .then(() => {
        console.log("puestas creadas");
        mongoose.connection.close();
    })
    .catch((error) => {
        console.log(error);
        mongoose.connection.close();
    });