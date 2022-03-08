const express = require('express')
const {localLogin, localSignup, RutasMongoPassport, auth} = require("../controllers/mongoController")

require("../services/passportService")


const apiMongo = () =>{
  
  const routerApiMongo = express.Router()

  routerApiMongo.post('/login', localLogin)

  routerApiMongo.post('/registro', localSignup)

  routerApiMongo.get('/loginsuccess', RutasMongoPassport.loginSuccess)

  routerApiMongo.get('/loginfailure', RutasMongoPassport.loginFailure)

  routerApiMongo.get('/registersuccess', RutasMongoPassport.registerSuccess)

  routerApiMongo.get('/registerfailure', RutasMongoPassport.registerFailure)

  routerApiMongo.get('/', RutasMongoPassport.barra)

  routerApiMongo.get('/test', RutasMongoPassport.tester)
  
  routerApiMongo.get('/logout', RutasMongoPassport.logout)

  routerApiMongo.get("/user", RutasMongoPassport.user);

  routerApiMongo.post("/recovery", RutasMongoPassport.passwordRecovery);

  return routerApiMongo;
}

module.exports ={
  apiMongo
}