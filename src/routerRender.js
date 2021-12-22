import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
// import FS from 'session-file-store';
import MS from 'connect-mongo';
import mongoose from 'mongoose';
import passport from 'passport';
import passportPkg from 'passport-twitter';
const { Strategy: TwitterStrategy } = passportPkg;
const SchemaLocal = mongoose.Schema
import fetch from 'isomorphic-fetch';
//import { fork } from 'child_process';
//const { fork } = child_processPkg;
import * as child from 'child_process';
// var ChildProcess = child.exec('dir');
// console.log("--->"+ChildProcess)
import path from 'path';
import cluster from 'cluster';
import opsi from 'os';
const numCPU = opsi.cpus().length;
console.log(numCPU)
const __dirname = (() => {let x = path.dirname(decodeURI(new URL(import.meta.url).pathname)); return path.resolve( (process.platform == "win32") ? x.substr(1) : x ); })();
console.log("path")
console.log(process.cwd())
console.log(__dirname)


const ls = child.exec('dir', function (error, stdout, stderr) {
    if (error) {
      console.log(error.stack);
      console.log('Error code: '+error.code);
      console.log('Signal received: '+error.signal);
    }
    console.log('Child Process STDOUT: '+stdout);
    console.log('Child Process STDERR: '+stderr);
  });
  
  ls.on('exit', function (code) {
    console.log('Child process exited with exit code '+code);
  });

const TWITTER_CALLBACK_PORT = process.argv[2] ? process.argv[2] : "7001"
const TWITTER_CLIENT_KEY = process.argv[3] ? process.argv[3] : "Qq9lzsF6u67GjSSMnrLtZwWPs"
const TWITTER_CLIENT_SECRET = process.argv[4] ? process.argv[4] : "aMSUUqnukGTFUVXMECqwDuIaa8J4At5ALBxSmKuTyFgFb4enMl"


//console.log(TWITTER_CLIENT_KEY + TWITTER_CLIENT_SECRET)

// const userSchema = new SchemaLocal({
//     username: {type: String},
//     password: {type: String}
// })
// const UsuariosDAOLocal = mongoose.model('users', userSchema)
// funcion para crear el router, cargar el middleware para convertir la tira de string del request a json, carga las rutas y vincula al manejador con el array de mascotass
function routerRender(){

    //const MongoStore = MS(session)
    // const FileStore = FS(session)
    const routerApiProductos = express.Router()
    routerApiProductos.use(express.json())
    routerApiProductos.use(express.urlencoded({extended: true}))
    routerApiProductos.use(cookieParser())
    // routerApiProductos.use(session({
    //     /*store: new FileStore({path:'./sesiones',ttl:300,retries:0}),*/
    //     secret: 'dontUseVar',
    //     resave: true,
    //     saveUninitialized: true,
    //     cookie: { maxAge: 10000 }
    //   }))
    routerApiProductos.use(session({
        secret: 'shhhhhhhhhhhhhhhhhhhhh',
        resave: false,
        saveUninitialized: false,
        cookie: {
          maxAge: 60000
        }
      }))
    routerApiProductos.use(passport.initialize());
    routerApiProductos.use(passport.session());

    // routerApiProductos.use(session({
    //     store: MS.create(
    //         {mongoUrl:'mongodb+srv://emilio:test@coderbackend.xuzrc.mongodb.net/sesiones?retryWrites=true&w=majority'
    //         }),
    //     ttl: 60,
    //     secret: 'dontUseVar',
    //     resave: true,
    //     saveUninitialized: true/*,
    //     cookie: { maxAge: 10000 }*/
    //   }))
    
    // var auth = function(req, res, next){
    //     if(req.session.nombre){
    //         return next();
    //     }else{
    //         return res.render("login", {
    //             bienvenida: "Para ver el contenido, por favor inicia sesión"
    //         });
    //     }
    // }
    // const expire = 60000
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//PASSPORT
passport.use(new TwitterStrategy({
    consumerKey: TWITTER_CLIENT_KEY,
    consumerSecret: TWITTER_CLIENT_SECRET,
    callbackURL: `http://localhost:${TWITTER_CALLBACK_PORT}/auth/twitter/callback`,
}, function (token, tokenSecret, userProfile, done) {
    console.log("===================================================> PASSPORT TwitterStrategy")
    // const user = userProfile.displayName
    console.log(userProfile)
    return done(null, userProfile);
}));

passport.serializeUser(function (user, cb) {
    console.log("===================================================> PASSPORT serializeUser")
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    console.log("===================================================> PASSPORT deserializeUser")

    cb(null, obj);
});
/*passport.use('register', new LocalStrategy({ passReqToCallback: true }, (req, username, password, done) => {
    console.log("===================================================> PASSPORT register")
  
    const userCreate = req.body
    console.log(userCreate)
    //console.log(data)
    mongoose.connect('mongodb://localhost/usuarios', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(() => {
        let user = ""
        return user = UsuariosDAOLocal.findOne({username: username})
    })
    .then((user) => {
        if(!user){
           return UsuariosDAOLocal.create(userCreate)
        }
    })
    .then((user) => {
        console.log("find: "+user)
        if(user){
        console.log("if ok")
          return done(null, user)
        }else{
            console.log("else ok")
            //return done('already registered')
            return done(null, false)
        }
    })
    .then(() => {
      console.log("usuario creado correctamente")
    })
    .catch((err)=>{
        console.log(err)
    })
    .finally(() => {
        mongoose.disconnect().catch(err => { throw new Error('error al desconectar la base de datos') })
    })
  
  }));*/

  /*passport.use('login', new LocalStrategy((username, password, done) => {
    console.log("===================================================> PASSPORT LOGIN")
    console.log(username)
    mongoose.connect('mongodb://localhost/usuarios', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    .then(() => {
        let user = ""
        return user = UsuariosDAOLocal.findOne({username: username})
    })
    .then((user) => {
        console.log(user)
      if (!user) {
        return done(null, false)
      }
      if (user.password != password) {
        return done(null, false)
      }
      //user.contador = 0
    //   userAuth = user.username;
      return done(null, user);
    })
    .catch((err)=>{
        console.log(err)
    })
    .finally(() => {
        mongoose.disconnect().catch(err => { throw new Error('error al desconectar la base de datos') })
        //user.contador = 0
    })
  
  
  }));*/
  
  /*passport.serializeUser(function (user, done) {
    console.log("===================================================> PASSPORT serializeUser")
    console.log(user)
    done(null, user.username);
  });
  

  passport.deserializeUser(function (username, done) {
  
    console.log("===================================================> PASSPORT deserializeUser")
  
    mongoose.connect('mongodb://localhost/usuarios', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    .then(() => {
        let usuario = ""
        return usuario = UsuariosDAOLocal.findOne({username: username})
    })
    .then((usuario) => {
        done(null, usuario);
    })
    .catch((err)=>{
        console.log(err)
    })
    .finally(() => {
        mongoose.disconnect().catch(err => { throw new Error('error al desconectar la base de datos') })
    })
  
  });*/
//   function auth(req, res, next) {
//     if (req.isAuthenticated()) {
//         console.log("auth==============================>")
//         console.log(req.session.passport.user)
//       next()
//     } else {
//       //res.redirect('/login')
//         return res.render("login", {
//             bienvenida: "Para ver el contenido, por favor inicia sesión"
//         });
//     }
//   }
//   var auth = function(req, res, next){
//     if(req.session.nombre){
//         return next();
//     }else{
//         return res.render("login", {
//             bienvenida: "Para ver el contenido, por favor inicia sesión"
//         });
//     }
// }
const expire = 60000
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // RAIZ API
    routerApiProductos.post('/login', passport.authenticate('login', { failureRedirect: '/login', successRedirect: '/' }))

    routerApiProductos.post('/registro', passport.authenticate('register', { failureRedirect: '/registroIncorrecto', successRedirect: '/' }))
    routerApiProductos.get('/auth/twitter', passport.authenticate('twitter'));

    routerApiProductos.get('/auth/twitter/callback', passport.authenticate('twitter', {
        successRedirect: '/',
        failureRedirect: '/faillogin'
    }));
    
    routerApiProductos.get('/faillogin', (req, res) => {
        res.render('login-error', {});
    })

    routerApiProductos.get('/', (req, res) =>{
        if (req.isAuthenticated()) {
            console.log("===================================================> GET /")

            // console.log(req.body)
            // console.log("===================================================> GET /")
            // console.log(req.headers)
            // console.log("===================================================> GET /")
            // console.log(req.session)
            console.log(req.session.passport.user.displayName)
            req.session.cookie.maxAge = expire
            res.render("index", {
                bienvenida: "¡Bienvenid@s al proyecto!",
                login: `Bienvenid@ ${req.session.passport.user.displayName}`
            });
        }else{
          //res.redirect('/login')
            return res.render("login", {
                bienvenida: "Para ver el contenido, por favor inicia sesión"
            });
        }
    })
    routerApiProductos.get('/login', (req, res) =>{
        
        if(req.session.passport){
            res.render("login", {
                bienvenida: `Bienvenid@ ${req.session.passport.user.displayName}, Ya iniciaste Sesión`,
                login: `Bienvenid@ ${req.session.passport.user.displayName}`
            });
        }else{
            res.render("login", {
                bienvenida: "Usuario o contraseña Incorrectos, por favor intenta nuevamente...",

            });
        }
    })
    routerApiProductos.get('/registro', (req, res) =>{
        
        if(req.session.passport){
            res.render("registro", {
                bienvenida: `test`,
                login: `test`
            });
        }else{
            res.render("registro", {
                bienvenida: "Ingresa tu nombre de usuario para registrarte",

            });
        }
    })
    routerApiProductos.get('/registroIncorrecto', (req, res) =>{
        
        if(req.session.passport){
            res.render("registroIncorrecto", {
                bienvenida: `test`,
                login: `test`
            });
        }else{
            res.render("registroIncorrecto", {
                bienvenida: "Usuario ya registrado, por favor ingresa otro nombre de usuario",

            });
        }
    })
    let memory = process.memoryUsage;
    console.log(memory)
    let info = {
        ArgumentosEntrada: `argumento1: ${process.argv[2]};argumento2: ${process.argv[3]};argumento3: ${process.argv[4]}`,
        PlatformName: process.platform,
        NodeVersion: process.version,
        MemoryUsage: process.memory,
        ExecPath: process.cwd(),
        ProcessId: process.pid,
        CurrentPath: process.argv[0],
        processNumber: numCPU
    }

    routerApiProductos.get('/info', (req, res) =>{
        
        res.render("info", {
            info: info,
        });
    })

    routerApiProductos.get('/randoms', (req, res) =>{
        /*
        ----------------------------------------------------------------------------------
        | NO ENCONTRE FORMA DE USAR FORK CON IMPORT; PUDE RESOLVERLO CON REQUIRE TAL COMO SE VIO EN CLASE.
        | Mi endpoint Random le pega a una aplicacion de node que deploye en Glitch, el endpoint de glitch le pasa la
        | tarea de procesamiento al hijo. Ver proyecto en -> https://glitch.com/edit/#!/ruby-knotty-soup?path=server.js%3A44%3A45
        ----------------------------------------------------------------------------------
        console.log(req.query.cant)
        const cantVariable = req.query.cant ? req.query.cant : 100000000
        const compute = child.fork("./fork.js");
          compute.send(cantVariable);
          compute.on('message', objetoNumero => {
            res.json(`${JSON.stringify(objetoNumero)}`);
            //res.json(`${(objetoNumero)}`);
          });
          */
          const cantVariable = req.query.cant ? req.query.cant : 10000
        //   fetch(`https://ruby-knotty-soup.glitch.me/randoms`)
        //   .then(response => console.log(response))
            fetch(`http://ruby-knotty-soup.glitch.me/randoms?cant=${cantVariable}`)
            .then(function(response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            })
            .then(function(stories) {
                res.json(stories)
            })
            .catch((err)=>{
                console.log(err)
            })

    
    })

    // routerApiProductos.get('/loginAuth', (req, res) => {
    //     req.session.nombre = "Emilio"
    //     res.render("index", {
    //         bienvenida: "¡Bienvenidos al proyecto!"
    //     });
    // })

    // routerApiProductos.get("/loginAuth/:nombre", (req, res)=>{
    //     req.session.cookie.maxAge = expire
    //     const nombre = req.params
    //     req.session.nombre = nombre
    //     res.json({login: `Bienvenid@ ${req.session.nombre.nombre}`})
    // })


    routerApiProductos.get('/alta',  (req, res) =>{
        if (req.isAuthenticated()) {
            req.session.cookie.maxAge = expire
            res.render("alta", {
                bienvenida: "Formulario de alta de productos:",
                login: `Bienvenid@ ${req.session.passport.user.displayName}`
            });
        }else{
          //res.redirect('/login')
            return res.render("login", {
                bienvenida: "Para ver el contenido, por favor inicia sesión"
            });
        }
    })
    routerApiProductos.get('/mensajes',  (req, res) =>{
        if (req.isAuthenticated()) {
            req.session.cookie.maxAge = expire
            res.render("mensajes", {
                bienvenida: "Centro de Mensajes:",
                login: `Bienvenid@ ${req.session.passport.user.displayName}`
            });
        }else{
          //res.redirect('/login')
            return res.render("login", {
                bienvenida: "Para ver el contenido, por favor inicia sesión"
            });
        }
    })
    //GET DATA
    routerApiProductos.get("/productos",  (req, res)=>{
        if (req.isAuthenticated()) {
            req.session.cookie.maxAge = expire
            res.render("productos", {
                bienvenida: "¡Bienvenid@s al proyecto!",
                login: `Bienvenid@ ${req.session.passport.user.displayName}`
            });
        }else{
          //res.redirect('/login')
            return res.render("login", {
                bienvenida: "Para ver el contenido, por favor inicia sesión"
            });
        }
    })
    routerApiProductos.get('/logout', (req, res) => {
        //let name =  req.session.nombre.nombre
        //res.render("logout")
        // if(!req.session.passport.user){
        //     res.render("logout", {
        //         hastaluego: `Hola, aun no has iniciado sesión`
        //     });
        // }else{
        //     let name =  req.session.passport.user
        //     req.session.destroy(err => {
        //         if (err) {
        //           res.json({ error: 'logout', body: err })
        //         } else {
        //           res.render("logout", {
        //               hastaluego: `HastaLuego ${name}`
        //           });
        //         }
        //       })
        // }
        if(req.session.passport){
            let name =  req.session.passport.user.displayName
            req.session.destroy(err => {
                if (err) {
                  res.json({ error: 'logout', body: err })
                } else {
                  res.render("logout", {
                      hastaluego: `HastaLuego ${name}`
                  });
                }
              })
        }else{
            res.render("logout", {
                hastaluego: `Hola, aun no has iniciado sesión`
            });
        }
    })
    // routerApiProductos.get("/productos/:id", (req, res)=>{
    //     const {id} = req.params
    //     const producto = USERS_DB.filter(product => product.id == parseInt(id))[0];
    //     const productoArray = []
    //     productoArray.push(producto)
    //     if(producto){
    //        return res.render("productosId", {
    //             productoArray
    //         });
    //     }
    //     res.render("productosId", {
    //         errorNoInventarioId: "No se encontraron productos con ese ID"
    //     });
    // })
    //SEND DATA

    // UPDATE

    // DELETE

    return routerApiProductos;

}
export {routerRender, TWITTER_CALLBACK_PORT}