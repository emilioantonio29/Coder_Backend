const {getProductsService ,testerService ,purchaseService} = require("../services/firebaseService") 


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


module.exports = {
    getProductsController,
    testerController,
    purchaseController,
}