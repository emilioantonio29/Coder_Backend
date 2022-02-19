/*https://levelup.gitconnected.com/how-to-render-react-app-using-express-server-in-node-js-a428ec4dfe2b*/

const path = require("path");
const express = require("express");
const app = express(); // create express app
const {routerRender} = require('./server-src/routes/apiRender.js')
const {apiFirebase} = require('./server-src/routes/apiFirebase.js')
const {apiMongo} = require('./server-src/routes/apiMongo.js')
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser')

// TEST: post
app.post('/test', (req,res)=>{
  const prueba = req.body
  console.log(prueba)
  res.send("ok");
  // ESTE ENDPOINT DEVUELVE OK, PERO EL REQ.BODY ES UNDEFINED PORQUE EL MIDDLEWARE DE EXPRESS.json() ESTA ABAJO
})

// MIDDLEWARES
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

// ROUTES
app.use('/api', routerRender())
app.use('/apiFirebase', apiFirebase())
app.use('/apiMongo', apiMongo())

// FRONT
app.use(express.static(path.join(__dirname, ".", "client-react/build")));
//app.use(express.static("public"));
app.use((req, res) => {
  console.log("paso")
  res.sendFile(path.join(__dirname, ".", "public/build", "index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("server started on port 5000");
});