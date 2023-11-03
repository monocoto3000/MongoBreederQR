require('dotenv').config()
require('../config/db.js');
const Usuario = require('../models/criadero.model.js');
const mongoose = require('mongoose');

const criaderos = [
    { id_criador: "654540f4481bb359e61a8eb8", nombre_criadero: "nombre_criadero1", direccion:"direccion1", registro:"registro1", logo: "logo1", descripcion: "descripcion1" },
    { id_criador: "654540f4481bb359e61a8eb8", nombre_criadero: "nombre_criadero2", direccion:"direccion2", registro:"registro2", logo: "logo2", descripcion: "descripcion2"  },
    { id_criador: "654540f4481bb359e61a8eb8", nombre_criadero: "nombre_criadero3", direccion:"direccion3", registro:"registro3", logo: "logo3", descripcion: "descripcion3"  },
    { id_criador: "654540f4481bb359e61a8eb8", nombre_criadero: "nombre_criadero4", direccion:"direccion4", registro:"registro4", logo: "logo4", descripcion: "descripcion4"  },
    { id_criador: "654540f4481bb359e61a8eb8", nombre_criadero: "nombre_criadero5", direccion:"direccion5", registro:"registro5", logo: "logo5", descripcion: "descripcion5"  },
];

Usuario.deleteMany({})
    .then(() => {
        return Usuario.insertMany(criaderos);
    })
    .then(() => {
        console.log("criaderos creados");
        mongoose.connection.close();
    })
    .catch((error) => {
        console.log(error);
        mongoose.connection.close();
    });