const mongoose = require('mongoose');
const criadorModel = require('../models/criador.model');

const especieSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        required: false,
        default: new Date()
    },
    created_by: {
        type: String,
        required: false,
    },
    updated_at: {
        type: Date,
        required: false,
        default: null
    },
    deleted_by: {
        type: Boolean,
        required: false,
    },
    deleted_by: {
        type: String,
        required: false,
    },
    deleted_at: {
        type: Date,
        required: false,
        default: null,
    },
});

module.exports = mongoose.model('Especie', especieSchema);
