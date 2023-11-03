require('dotenv').config()
require('../config/db.js');
const Usuario = require('../models/puestas.model.js');
const mongoose = require('mongoose');

const puestas = [
    { id_animal: "6545042f7585073d4d314584", cantidad: 1 },
    { id_animal: "6545042f7585073d4d314585", cantidad: 2 },
    { id_animal: "6545042f7585073d4d314586", cantidad: 3 },
    { id_animal: "6545042f7585073d4d314587", cantidad: 4 },
    { id_animal: "6545042f7585073d4d314588", cantidad: 5 },
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