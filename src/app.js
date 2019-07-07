const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();

//conectar base de datos

mongoose.connect('mongodb://localhost/crud-mongo', { useNewUrlParser: true })
    .then(db => console.log('db conectada'))
    .catch(err => console.error(err));

//configuraciones

app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middleware se ejecuta antes de las rutas

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false })); //entender datos formulario solo texto no imagenes

//rutas
app.use('/', require('../src/routes/index'));


//inicio
app.listen(app.get('port'), () => {
    console.log('On port ', app.get('port'));
});