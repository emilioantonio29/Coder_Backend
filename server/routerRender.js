const express = require('express')
const path = require("path");

const routerRender = () =>{

  const routerApi = express.Router()
  routerApi.use(express.json())
  routerApi.use(express.urlencoded({extended: true}))

  routerApi.get('/', (req, res) =>{
    res.json({saludo:"Bienvenido a la raiz de la ruta API"})
  })

  // routerApi.get('/test', (req, res) =>{
  //   res.sendFile(path.join(__dirname, "..", "build", "index.html"));

  // })

  routerApi.get('/', (req, res) =>{
    res.json({saludo:"Bienvenido a la raiz de la ruta API"})
  })

  return routerApi;
}

module.exports ={
  routerRender
}