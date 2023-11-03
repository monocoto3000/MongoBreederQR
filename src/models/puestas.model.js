const mongoose = require('mongoose');

const puestasSchema = mongoose.Schema({
    id_animal: {
        type: String,
        required: true,
    },
    cantidad: {
        type: Number,
        required: true
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
    }
});

module.exports = mongoose.model('Puestas', puestasSchema);
