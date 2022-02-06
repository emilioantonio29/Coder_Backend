const express = require('express')
const app = express()
var flash = require('connect-flash');
const server = require('http').Server(app)
const path = require("path");
const cookieParser = require('cookie-parser')
const session = require('express-session')
const mongoose = require('mongoose')
// const bcrypt = require("bcryptjs");
const passport = require('passport')
const passportLocalPkg = require('passport-local')
const { Strategy: LocalStrategy } = passportLocalPkg;
const SchemaLocal = mongoose.Schema
const userSchema = new SchemaLocal({
  nombre: {type: String},
  apellido: {type: String},
  username: {type: String},
  password: {type: String},
  provincia: {type: String},
  localidad: {type: String},
  calle: {type: String},
  altura: {type: String},
  zip: {type: String},
  telefono: {type: String},
  tyc: {type: Boolean}, 
  fecha: {type: String}
})
const userMongoaaS = mongoose.model('users', userSchema)


const apiMongo = () =>{

  const routerApiMongo = express.Router()
  routerApiMongo.use(express.json())
  routerApiMongo.use(express.urlencoded({extended: true}))
  routerApiMongo.use(cookieParser())
  routerApiMongo.use(flash());
  routerApiMongo.use(session({
    secret: 'WAZAAAAAAAAaa',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60000
    }
  }))
  routerApiMongo.use(passport.initialize());
  routerApiMongo.use(passport.session());

  passport.use('register', new LocalStrategy({ passReqToCallback: true }, (req, username, password, done) => {
    console.log("===================================================> PASSPORT register")
  
    const userCreate = req.body
    console.log(userCreate)
    //console.log(data)
    mongoose.connect('mongodb+srv://emilio:test@coderbackend.xuzrc.mongodb.net/productos?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(() => {
        let user = ""
        return user = userMongoaaS.findOne({username: username})
    })
    .then((user) => {
        console.log("soy el findOne" + user)
        if(!user){
           return userMongoaaS.create(userCreate)
        }
    })
    .then((user) => {
        console.log("find: "+user)
        if(user){
        console.log("if ok")
          return done(null, {
                              _id: user._id,
                              nombre: user.nombre,
                              apellido: user.apellido,
                              username: user.username,
                              provincia: user.provincia,
                              localidad: user.localidad,
                              calle: user.calle,
                              altura: user.altura,
                              zip: user.zip,
                              telefono: user.telefono,
                              tyc: user.tyc,
                              fecha: user.fecha, 
                            }
                          , {message: "success"})
        }else{
            console.log("else ok")
            //return done('already registered')
            return done(null, false, {message: "email already registered"})
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
  
  }));

  passport.use('login', new LocalStrategy((username, password, done) => {
    console.log("===================================================> PASSPORT LOGIN")
    console.log(username)
    mongoose.connect('mongodb+srv://emilio:test@coderbackend.xuzrc.mongodb.net/productos?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    .then(() => {
        let user = ""
        return user = userMongoaaS.findOne({username: username})
    })
    .then((user) => {
        console.log("findonelogin" + user)
      if (!user) {
        return done(null, false)
      }
      if (user.password != password) {
        return done(null, false)
      }
      //user.contador = 0
    //   userAuth = user.username;
      return done(null, {
        _id: user._id,
        nombre: user.nombre,
        apellido: user.apellido,
        username: user.username,
        provincia: user.provincia,
        localidad: user.localidad,
        calle: user.calle,
        altura: user.altura,
        zip: user.zip,
        telefono: user.telefono,
        tyc: user.tyc,
        fecha: user.fecha, 
      });
    })
    .catch((err)=>{
        console.log(err)
    })
    .finally(() => {
        mongoose.disconnect().catch(err => { throw new Error('error al desconectar la base de datos') })
        //user.contador = 0
    })
  
  
  }));


  passport.serializeUser(function (user, done) {
    console.log("===================================================> PASSPORT serializeUser")
    console.log(user)
    done(null, user.username);
  });

  passport.deserializeUser(function (username, done) {
  
    console.log("===================================================> PASSPORT deserializeUser")
  
    mongoose.connect('mongodb+srv://emilio:test@coderbackend.xuzrc.mongodb.net/productos?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    .then(() => {
        let usuario = ""
        return usuario = userMongoaaS.findOne({username: username})
    })
    .then((usuario) => {
        done(null, {
          _id: usuario._id,
          nombre: usuario.nombre,
          apellido: usuario.apellido,
          username: usuario.username,
          provincia: usuario.provincia,
          localidad: usuario.localidad,
          calle: usuario.calle,
          altura: usuario.altura,
          zip: usuario.zip,
          telefono: usuario.telefono,
          tyc: usuario.tyc,
          fecha: usuario.fecha, 
        });
    })
    .catch((err)=>{
        console.log(err)
    })
    .finally(() => {
        mongoose.disconnect().catch(err => { throw new Error('error al desconectar la base de datos') })
    })
  
  });

  function auth(req, res, next) {
    if (req.isAuthenticated()) {
        console.log("auth==============================>")
        console.log(req.session.passport.user)
      next()
    } else {
      //res.redirect('/login')
        return res.render("login", {
            bienvenida: "Para ver el contenido, por favor inicia sesión"
        });
    }
  }
  // 1 minuto = 60000
  const expire = 60000

  routerApiMongo.post('/login', passport.authenticate('login', { 
    failureRedirect: '/apiMongo/loginfailure', successRedirect: '/apiMongo/loginsuccess' }))

  routerApiMongo.post('/registro', passport.authenticate('register', 
  { failureRedirect: '/apiMongo/registerfailure', successRedirect: '/apiMongo/registersuccess', failureFlash: true, successFlash: true }))



  routerApiMongo.get('/loginsuccess', (req, res) =>{
    res.json(req.user)
  })
  routerApiMongo.get('/loginfailure', (req, res) =>{
    res.json(req.user)
  })

  routerApiMongo.get('/registersuccess', (req, res) =>{
    res.json(req.user)
  })
  routerApiMongo.get('/registerfailure', (req, res) =>{
    res.json(req.user)
  })

  routerApiMongo.get('/', (req, res) =>{
    res.json({saludo:"prueba localhost:8080/apiMongo"})
  })
  routerApiMongo.get('/test', (req, res) =>{
    res.json("TESTLAND")
  })
  
  routerApiMongo.get('/logout', (req, res) => {
    if(req.session.passport){
        let name =  req.session.passport.user
        req.session.destroy(err => {
            if (err) {
              res.json({ error: 'logout', body: err })
            } else {
              res.json(req.user)

            }
          })
    }else{
      //res.json({ logoutsuccess: false })
      res.json(req.user);
    }
  })

  // routerApiMongo.post('/registro', (req, res) =>{
  //  // const userCreate = req.body
  //   console.log(req.body)
  //   res.json({valor: 1})
  // })

  routerApiMongo.get("/user", (req, res) => {
    req.session.cookie.maxAge = expire
    res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it.
  });


  
  return routerApiMongo;
}

module.exports ={
  apiMongo
}