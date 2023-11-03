require('dotenv').config()
require('../config/db.js');
const Usuario = require('../models/foto.model.js');
const mongoose = require('mongoose');

const fotos = [
    { id_animal: "6545042f7585073d4d314584", fotografia: "fotografia1" },
    { id_animal: "6545042f7585073d4d314585", fotografia: "fotografia2"  },
    { id_animal: "6545042f7585073d4d314586", fotografia: "fotografia3"  },
    { id_animal: "6545042f7585073d4d314587", fotografia: "fotografia4"  },
    { id_animal: "6545042f7585073d4d314588", fotografia: "fotografia5"  },
];

Usuario.deleteMany({})
    .then(() => {
        return Usuario.insertMany(fotos);
    })
    .then(() => {
        console.log("fotos creadas");
        mongoose.connection.close();
    })
    .catch((error) => {
        console.log(error);
        mongoose.connection.close();
    });