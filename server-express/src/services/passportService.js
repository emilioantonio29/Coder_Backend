const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {getUserDbMongo, createUserDbMongo} = require("../daos/dao/mongoDb")
const {mailBienvenida} = require("../mailing/mailingSender")

passport.serializeUser(function (user, done) {
    console.log("PASSPORT: SerializeUser")
    return done(null, user.username);
});

passport.deserializeUser(function (username, done) {
    console.log("PASSPORT: DeserializeUser")

    getUserDbMongo(username).then((usuario)=>{
        if(usuario){
            return done(null, {
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
        }
    }).catch((err)=>{
        console.log(err)
    })  
});


passport.use('register', new LocalStrategy({ passReqToCallback: true }, (req, username, password, done) => {
    console.log("PASSPORT: register strategy")
    const userCreate = req.body
    //console.log(data)

    getUserDbMongo(username)
      .then((usuario)=>{
        if(usuario){
          return done(null, false, {message: "email already registered"})
        }else{
          createUserDbMongo(userCreate)
            .then((user)=>{
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
                }, 
                {message: "success"},
                mailBienvenida(user))
              })
              .catch((err)=>{console.log(err)}) 
          }
      })
      .catch((err)=>{console.log(err)})  
      }
    )
  );

passport.use('login', new LocalStrategy((username, password, done) => {
    console.log("PASSPORT: login strategy")

    getUserDbMongo(username).then((user)=>{
      if(!user){
        return done(null, false)
      }
      
      if(user.password != password){
        return done(null, false)
      }

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
      })

    })
    .catch((err)=>{console.log(err)}) 
  })
);
