/*
DESAFIO: 30

1) EJECUTAR EL SERVIDOR EN MODO FORK Y CLUSTER: done

        Esta aplicacion en los 3 primeros parametros recibe:

        Argumento 1 = recibe un puerto. si no se le pasa puerto setea 7001 -> process.argv[2] ? process.argv[2] : "7001"
            IMPORTANTE: el puerto debe ser igual al callback de twitter, que lo pide en la configuracion de la app
        
        ELIMINADO:      Argumento 2 = recibe el TWITTER_CLIENT_KEY. si no se le pasa setea XXXXX -> process.argv[3] ? process.argv[3] : "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
        ELIMINADO:      Argumento 3 = recibe el TWITTER_CLIENT_SECRET. si no se le pasa setea XXXXX -> process.argv[4] ? process.argv[4] : "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
        
        Argumento 2 = recibe si debe iniciar en modo FORK o CLUSTER. si no se le pasa setea FORK.
            Si se le pasa el argumento CLUSTER, abre tantos workers como procesadores tenga la maquina
            
            LISTAR PROCESOS DE NODE EN POWERSHELL
            PS C:\Users\Emilio> tasklist /fi "imagename eq node.exe"
                Image Name                     PID Session Name        Session#    Mem Usage
                ========================= ======== ================ =========== ============
                node.exe                     11712 Console                    1     23,636 K
                node.exe                     18888 Console                    1     32,452 K
                node.exe                     15712 Console                    1     69,752 K
                node.exe                     19168 Console                    1     70,984 K
                node.exe                     16268 Console                    1     70,920 K
                node.exe                      3240 Console                    1     70,912 K

2) Agregar en la vista info, el número de procesadores presentes en el servidor: done

3) Ejecutar el servidor (modos FORK y CLUSTER) con nodemon verificando el número de procesos tomados por node: done
        Hay que inicializarlo con: nodemon src/server.js Parametro1(PUERTO) Parametro2(ClientKeyTwitter) Parametro3(ClientSecretKeyTwitter) Parametro4(FORK o CLUSTER)

4) Forever: Ejecutar el servidor (con los parámetros adecuados) utilizando Forever; Listar los procesos por Forever y por sistema operativo
        npm install forever -g
        la aplicacion se inicia con forever start src/server.js
        * Despues de correrlo: con forever list veo todos los procesos de forever corriendo
        forever stopall detiene todos los procesos
        forever stop PID detiene un solo proceso
        forever --help

5) PM2: Ejecutar el servidor utilizando PM2 en sus modos modo fork y cluster. Listar los procesos por PM2 y por sistema operativo.
        correr la aplicacion: pm2 start src/server.js (no esta habilitado para detectar cambios)
        con el flag --watch se habilita el watching: pm2 start src/server.js --watch

6)  NGIX: en la ruta del ngix correr: nginx
    nginx -s reload
    nginx -s stop
    nginx -s quit

    PARTE 1: 

    Configurar Nginx para balancear cargas de nuestro servidor de la siguiente manera:
    - Redirigir todas las consultas a /api/randoms a un cluster de servidores escuchando en el puerto 7000. El cluster será creado desde node utilizando el módulo nativo cluster.
    - El resto de las consultas, redirigirlas a un servidor individual escuchando en el puerto 7001.
    
    ***********EJECUTAR LO SIGUIENTE PARA VER LOS RESULTADOS
    forever start src/server.js 7000 CLUSTER
    forever start src/server.js 7001
    CORRER EL nginx_1.confi (arreglar nombre)


    PARTE 2:

    Luego, modificar la configuración para que todas las consultas a /api/randoms sean redirigidas a un 
    cluster de servidores gestionado desde nginx, repartiéndolas equitativamente entre 4 instancias 
    escuchando en los puertos 8082, 8083, 8084 y 8085 respectivamente.

    ***********EJECUTAR LO SIGUIENTE PARA VER LOS RESULTADOS
    forever start src/server.js 7001
    forever start src/server.js 8082
    forever start src/server.js 8083
    forever start src/server.js 8084
    forever start src/server.js 8085
    CORRER EL nginx_2.confi (arreglar nombre)
*/



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import express from 'express';
import multer from 'multer';
import { routerApiMongoD } from './routerApiMongoD.js';
import { routerApiMongoDBaaS } from './routerApiMongoDBaaS.js';
import { routerApiSQLite3 } from './routerApiSQLite3.js';
import { routerApiMySql } from './routerApiMySql.js'
// import { routerApiFirebase } from './routerApiFirebase.js';
import { routerRender, TWITTER_CALLBACK_PORT} from './routerRender.js';
import { routerFaker } from './routerFaker.js'
import fs from "fs";
import handlebars from "express-handlebars"
import cluster from 'cluster';
import opsi from 'os';
const numCPU = opsi.cpus().length;

const ServeMode = process.argv[3] ? process.argv[3] : "FORK"

if(ServeMode === "CLUSTER"){
    
    if(cluster.isMaster){
        console.log(`Master ${process.pid} is running`)
        //Fork Workers
        for(let i=0; i<numCPU; i++){
            cluster.fork()
        }

        cluster.on('exit', (worker, code, signal) =>{
            console.log(`worker ${worker.process.pid} died`)
        })
    }else{
        const app = express(); 
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
        const PORT = TWITTER_CALLBACK_PORT
        const server = app.listen(PORT, () => {
            console.log(`Servidor http escuchando en el puert ${server.address().port}`)
        })
        server.on('error',(error) => {console.log(`error: ${error.message}`)})
    }

}

// import fetch from `${appRoot}/foo/bar/folders/bla/bla`

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const app = express(); 
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
const PORT = TWITTER_CALLBACK_PORT
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puert ${server.address().port}`)
})
server.on('error',(error) => {console.log(`error: ${error.message}`)})
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// para GLITCH:
// server.listen(process.env.PORT, function() {
//     console.log('Servidor corriendo en http://localhost:'+process.env.PORT);
// })