const express = require('express')
const app = express()
// const bcrypt = require("bcryptjs");
const passport = require('passport')
const {passwordRecoveryService} = require("../services/mongoService")
require("../services/passportService")

// COOKIE EXPIRE : 1 minuto = 60000
const expire = 3000000

// ESTRATEGIAS
const localLogin = passport.authenticate("login", {
    successRedirect: "/apiMongo/loginfailure",
    failureRedirect: "/apiMongo/loginsuccess"
})

const localSignup = passport.authenticate('register', {
    successRedirect: "/apiMongo/registerfailure",
    failureRedirect: "/apiMongo/registersuccess"
})

// AUTH: sin uso
const auth = (req, res, next) => {
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

// RUTAS
class RutasMongoPassport{
  static barra = (req, res) =>{
    res.json({saludo:"Bienvenido a la raiz de la ruta apiMongo"})
  }

  static tester = (req, res) =>{
    res.json("TESTLAND")
  }

  static loginSuccess = (req, res) =>{
    res.json(req.user)
  }

  static loginFailure = (req, res) =>{
    res.json(req.user)
  }

  static registerSuccess = (req, res) =>{
    res.json(req.user)
  }

  static registerFailure = (req, res) =>{
    res.json(req.user)
  }

  static passwordRecovery = async (req, res) =>{
    
    if(req.body.username){
      let data = await passwordRecoveryService(req.body.username);
      let password;
      // console.log(data)
      if(data == null){
        password = {warning: "user not found"}
        res.json(password)
      }else{
        password = data.password
        res.json(password)
      }
    }else{
      res.json({message:"error: por favor envia el formato esperado",formatExample: {username: "educacionit6464@gmail.com"}})
    }
  }

  static user = (req, res) => {
    req.session.cookie.maxAge = expire
    res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it.
  };

  static logout = (req, res) => {
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
  }
}

module.exports={
  localLogin,
  localSignup,
  auth,
  RutasMongoPassport
}