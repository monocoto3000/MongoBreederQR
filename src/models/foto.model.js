const mongoose = require('mongoose');

const fotoSchema = mongoose.Schema({
    id_animal: {
        type: Number,
        required: true,
    },
    fotografia: {
        type: String,
        required: false
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

module.exports = mongoose.model('Foto', fotoSchema);