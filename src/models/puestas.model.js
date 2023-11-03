const mongoose = require('mongoose');

const puestasSchema = mongoose.Schema({
    id_animal: {
        type: String,
        required: true,
    },
    cantidad: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Puestas', puestasSchema);
