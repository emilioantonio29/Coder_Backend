const express = require('express')
const {getProductsController, testerController, purchaseController} = require("../controllers/firebaseController") 


const apiFirebase = () =>{

  const routerApi = express.Router()
  routerApi.use(express.json())
  routerApi.use(express.urlencoded({extended: true}))
  


  routerApi.get('/', testerController)

  routerApi.get('/productos', getProductsController)

  routerApi.post('/comprar', purchaseController)

  return routerApi;
}

module.exports ={
  apiFirebase
}