require('dotenv').config();
require('./src/config/db');

const express = require('express');
const app = express();
const criadorRouter = require('./src/routes/criador.route');
// const authRouter = require('./src/routes/auth.route');
const uploadsRouter = require('./src/routes/uploads.route');

app.use(express.json());
app.use('/criadores', criadorRouter);
app.use('/uploads', uploadsRouter);
// app.use('/auth', authRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log("API escuchando en el puerto 3000");
});