/*https://levelup.gitconnected.com/how-to-render-react-app-using-express-server-in-node-js-a428ec4dfe2b*/

const path = require("path");
const express = require("express");
const app = express(); // create express app
const {routerRender} = require('./routerRender.js')
const {apiFirebase} = require('./apiFirebase.js')
const {apiMongo} = require('./apiMongo.js')


//app.use(paso1)

function paso1(req, res, next){
  console.log("paso1")
  res.json({cambialo: true})
  next();
}
//app.get('/test', paso1)

app.post('/test', (req,res)=>{
  const prueba = req.body
  console.log(prueba)
  ///res.json({ok:"ok"})
  res.send("ok");

})

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