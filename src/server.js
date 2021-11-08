// const express = require('express')
// const app = express()
// const server = require('http').Server(app)
// const io = require('socket.io')(server)
// const handlebars = require('express-handlebars');

// app.engine("hbs",
//     handlebars({
//         extname: "hbs",
//         defaultLayout: "layout.hbs", //opcional: en caso de no estar configurado llama al main.hbs
//     })
// );

// app.set('views', './public'); // especifica el directorio de vistas
// app.set('view engine', 'hbs'); // registra el motor de plantillas

// app.use(express.static('public'))
// app.use('/api', crearRouterApiProductos())
// app.use('/', crearRouterPlantilla11())


// server.listen(7001, function() {
//     console.log('Servidor corriendo en http://localhost:8080');
// })
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import express from 'express';
import multer from 'multer';
import { routerApiMongoD } from './routerApiMongoD.js';
import { routerApiMongoDBaaS } from './routerApiMongoDBaaS.js';
import { routerApiSQLite3 } from './routerApiSQLite3.js';
import { routerApiMySql } from './routerApiMySql.js'
// import { routerApiFirebase } from './routerApiFirebase.js';
import { routerRender } from './routerRender.js';
import { routerFaker } from './routerFaker.js'
const app = express(); 
import fs from "fs";
import handlebars from "express-handlebars"

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.use('/api/MongoD', routerApiMongoD())
app.use('/api/MongoDBaaS', routerApiMongoDBaaS())
app.use('/api/SQLite3', routerApiSQLite3())
app.use('/api/MySql', routerApiMySql())
app.use('/productos', routerFaker())
app.use('/', routerRender())
app.use(express.static('public'));

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MIDDLEWARE TERCEROS - MULTER: nos permite parsear el contenido de la peticion y guardar el documento
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PUG
app.engine("hbs",
    handlebars({
        extname: "hbs",
        defaultLayout: "layout.hbs", //opcional: en caso de no estar configurado llama al main.hbs
    })
);

app.set('views', './public'); // especifica el directorio de vistas
app.set('view engine', 'hbs'); // registra el motor de plantillas
  
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const PORT = 7001
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puert ${server.address().port}`)
})
server.on('error',(error) => {console.log(`error: ${error.message}`)})
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// para GLITCH:
// server.listen(process.env.PORT, function() {
//     console.log('Servidor corriendo en http://localhost:'+process.env.PORT);
// })