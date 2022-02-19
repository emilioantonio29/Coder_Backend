const {getProductsFirebase} = require("../daos/dao/firebaseDb")



const testerService = async () =>{
    let data = await {hi:"testing controller ok"}
    return data
}

const getProductsService = async () =>{
    return await getProductsFirebase()
}


const purchaseService = async () =>{
    let data = await "working on it"
    return data
}


module.exports = {
    getProductsService,
    testerService,
    purchaseService,
}
