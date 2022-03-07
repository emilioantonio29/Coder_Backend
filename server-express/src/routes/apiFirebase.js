const express = require('express')
const { getProductsController, 
        testerController, 
        purchaseController, 
        buyersListController,
        addBuyerController,
        updateProductController } = require("../controllers/firebaseController") 
const { buyersSchema, buyerRoot } = require("./graphQL/firebaseSchema")
const { graphqlHTTP} = require("express-graphql") 


const apiFirebase = () =>{

  const routerApi = express.Router()
  routerApi.use(express.json())
  routerApi.use(express.urlencoded({extended: true}))
  
  routerApi.use("/ordenes/graphql", graphqlHTTP({
      schema: buyersSchema,
      rootValue: buyerRoot,
      graphiql: false
  }))
  
  routerApi.get('/', testerController)

  routerApi.get('/productos', getProductsController)

  routerApi.post('/comprar', purchaseController)

  routerApi.get('/ordenes', buyersListController)

  routerApi.post('/compradores', addBuyerController)

  routerApi.post('/productos', updateProductController)

  return routerApi;
}

module.exports ={
  apiFirebase
}