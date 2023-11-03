require('dotenv').config();
require('./src/config/db');

const express = require('express');
const app = express();
const criadorRouter = require('./src/routes/criador.route');
const authRouter = require('./src/routes/auth.route');
const uploadsRouter = require('./src/routes/uploads.route');
const puestasRouter = require('./src/routes/puestas.route');
const especieRouter = require('./src/routes/especie.route');
const criaderoRouter = require('./src/routes/criadero.route');

// login
// http://localhost:3000/auth/login

// {
//    "correo":"correo1@gmail.com",
//    "password":"1234"
// }

app.use(express.json());
app.use('/criadores', criadorRouter);
app.use('/uploads', uploadsRouter);
app.use('/puestas', puestasRouter)
app.use('/auth', authRouter);
app.use('/especies', especieRouter);
app.use('/criadero', criaderoRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log("API escuchando en el puerto" + PORT);
});