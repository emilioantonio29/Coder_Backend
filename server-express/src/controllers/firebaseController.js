const { getProductsService,
        testerService,
        purchaseService, 
        buyersListService,
        addBuyerService} = require("../services/firebaseService") 


const testerController = async (req, res) =>{
    const data =  await testerService()
    res.json(data)
}


const getProductsController = async (req, res) =>{
    const data = await getProductsService()
    res.json(data)
}


const purchaseController = async (req, res) =>{
    const data = await purchaseService()
    res.json(data)
}

const buyersListController = async (req, res) => {
    const data = await buyersListService()
    res.json(data)
}

const addBuyerController = async (req, res) => {
    let comprador = req.body
    //console.log(comprador)
    const data = await addBuyerService(comprador)
    // res.json(data)
    res.json({ordenDeCompra: data._path.segments[1]})
}

module.exports = {
    getProductsController,
    testerController,
    purchaseController,
    buyersListController,
    addBuyerController
}