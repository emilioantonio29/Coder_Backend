/*https://levelup.gitconnected.com/how-to-render-react-app-using-express-server-in-node-js-a428ec4dfe2b*/

const path = require("path");
const express = require("express");
const app = express(); // create express app
const {routerRender} = require('./src/routes/routerRender.js')
const {apiFirebase} = require('./src/routes/apiFirebase.js')
const {apiMongo} = require('./src/routes/apiMongo.js')
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser')



/*const {getUserDbMongo, createUserDbMonto} = require("./src/db/mongoDb")


const testuser = {
  nombre: 'Emilio',
  apellido: 'Martinez',
  username: 'emilio_antonio2@hotmail.com',
  password: '2',
  provincia: 'Capital Federal',
  localidad: 'Caballito',
  calle: '1',
  altura: '233',
  zip: '1182',
  telefono: '01567552479',
  tyc: true,
  fecha: '2022-02-11T02:12:49.660Z'
}

createUserDbMonto(testuser).then((data)=>{
  console.log("create here")
  console.log(data)
})*/

// TEST: cuando no hay datos devuelve NULL
/*
const {getUserDbMongo} = require("./src/db/mongoDb")

getUserDbMongo("emili_antonio29@hotmail.com").then((data)=>{
  console.log("DATA HERE")
  console.log(data)
})
*/

app.post('/test', (req,res)=>{
  const prueba = req.body
  console.log(prueba)
  res.send("ok");
  // ESTE ENDPOINT DEVUELVE OK, PERO EL REQ.BODY ES UNDEFINED PORQUE EL MIDDLEWARE DE EXPRESS.json() ESTA ABAJO
})

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(session({
  secret: 'WAZAAAAAAAAaa',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60000
  }
}))
app.use(passport.initialize());
app.use(passport.session());

// add middlewares
app.use('/api', routerRender())
app.use('/apiFirebase', apiFirebase())
app.use('/apiMongo', apiMongo())
app.use(express.static(path.join(__dirname, "..", "build")));
//app.use(express.static("public"));



app.use((req, res) => {
  console.log("paso")
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});



// app.set('views', './public');
const port = process.env.POR || 5000;
// start express server on port 5000
app.listen(port, () => {
  console.log("server started on port 5000");
});