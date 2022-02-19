/*https://levelup.gitconnected.com/how-to-render-react-app-using-express-server-in-node-js-a428ec4dfe2b*/

const path = require("path");
const express = require("express");
const app = express(); // create express app
const {routerRender} = require('./src/routes/apiRender.js')
const {apiFirebase} = require('./src/routes/apiFirebase.js')



// add middlewares
app.use('/api', routerRender())
app.use('/apiFirebase', apiFirebase())
app.use(express.static(path.join(__dirname, ".", "public/build")));
app.use(express.static("public"));


app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, ".", "public/build", "index.html"));
});



// app.set('views', './public');
const port = process.env.POR || 5000;
// start express server on port 5000
app.listen(port, () => {
  console.log("server started on port 5000");
});