const express = require('express')
const {RutasRender} = require("../controllers/renderController")

const routerRender = () =>{

  const routerApi = express.Router()

  routerApi.get('/', RutasRender.barra)

  return routerApi;
}

module.exports ={
  routerRender
}