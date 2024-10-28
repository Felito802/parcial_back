require('dotenv').config(); // Cargar variables de entorno
console.log('URI de MongoDB:', process.env.MONGODB_URI);
const express = require('express');
const {urlencoded, json} = require('express');
const router = require('./routes/signos.routes.js');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// Conectar a MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Conexión exitosa a MongoDB Atlas'))
.catch((error) => console.error('Error al conectar a MongoDB Atlas:', error));

// Middleware
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cors());
app.use('/v1/signos', router);

app.listen(4000, () => {
    console.log('listening at port 4000');
});