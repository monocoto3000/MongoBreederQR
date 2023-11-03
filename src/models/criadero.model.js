const mongoose = require('mongoose');

const criaderoSchema = mongoose.Schema({
    id_criador: {
        type: String,
        required: true,
    },
    nombre_criadero: {
        type: String,
        required: true,
    },
    direccion: {
        type: String,
        required: true,
    },
    registro: {
        type: String,
        required: true,
    },
    logo: {
        type: String,
        required: false,
    },
    descripcion: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        required: false,
        default: new Date()
    },
    updated_at: {
        type: Date,
        required: false,
        default: null
    },
    deleted: {
        type: Boolean,
        required: false,
        default: false,
    },
    deleted_at: {
        type: Date,
        required: false,
        default: null,
    },

});

module.exports = mongoose.model('Criadero', criaderoSchema);
 