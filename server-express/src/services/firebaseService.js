const {getProductsFirebase, getBuyersFirebase, addBuyerFirebase} = require("../daos/dao/firebaseDb")



const testerService = async () =>{
    let data = await {hi:"testing controller ok"}
    return data
}

const getProductsService = async () =>{
    return await getProductsFirebase()
}

const buyersListService = async () =>{
    let data = await getBuyersFirebase()
    return data
}


const purchaseService = async () =>{
    let data = await "working on it"
    return data
}

const addBuyerService = async (comprador) =>{
    let data = await addBuyerFirebase(comprador)
    return data;
}



module.exports = {
    getProductsService,
    testerService,
    purchaseService,
    buyersListService,
    addBuyerService
}
