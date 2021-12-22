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


/*
Realizar un programa de backend que permita gestionar cookies desde el frontend. Para ello: 
- Definir una ruta “cookies”.
- Definir un método POST que reciba un objeto con el nombre de la cookie, su valor y el tiempo de duración en segundos, y que genere y guarde dicha cookie.
- Definir un método GET que devuelva todas las cookies presentes.
- Definir un método DELETE que reciba el nombre de una cookie por parámetro de ruta, y la elimine.

NOTA 1: Utilizar el middleware express como estructura de servidor.
NOTA 2: Si algún parámetro recibido es inválido, o directamente inexistente, el servidor devolverá un objeto de error.
Ej: { error: 'falta nombre ó valor' } o { error: 'nombre no encontrado' }. Si todo sale bien, devolver el objeto { proceso: 'ok'}.
NOTA 3: Si el tiempo no está presente, generar una cookie sin tiempo de expiración.
NOTA 4:  Generar los request con varios navegadores (Chrome, edge, Firefox) para simular los distintos clientes en forma local.
*/
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
import cookieParser from 'cookie-parser'
import { allowedNodeEnvironmentFlags } from 'process';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.use('/api/MongoD', routerApiMongoD())
app.use('/api/MongoDBaaS', routerApiMongoDBaaS())
app.use('/api/SQLite3', routerApiSQLite3())
app.use('/api/MySql', routerApiMySql())
app.use('/productos', routerFaker())
app.use('/', routerRender())
app.use(express.static('public'));

app.use(cookieParser('secreto')) 
//app.use(cookieParser()) // sin firma

app.use(express.json())
app.use(express.urlencoded({extended: true}))

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MIDDLEWARE TERCEROS - MULTER: nos permite parsear el contenido de la peticion y guardar el documento
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post('/cookies', (req, res) => {
    const { nombre, valor, tiempo } = req.body
    console.log(nombre, valor, tiempo)
  
    if (!nombre || !valor) {
      return res.json({ error: 'falta nombre ó valor' })
    }
  
    if (tiempo) {
      res.cookie(nombre, valor, { signed: true, maxAge: 1000 * parseInt(tiempo) })
    } else {
      res.cookie(nombre, valor, { signed: true })
    }
    res.json({ proceso: 'ok' })
  })

app.get('/cookies', (req, res) => {
    res.json({ normales: req.cookies, firmadas: req.signedCookies })
  })


  app.delete('/cookies/:nombre', (req, res) => {
    const { nombre } = req.params
    if (nombre) {
      res.clearCookie(nombre)
      res.json({ proceso: 'ok' })
    } else {
      res.json({ error: 'falta nombre' })
    }
  })















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