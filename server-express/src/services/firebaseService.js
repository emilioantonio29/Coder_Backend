const { json } = require("body-parser")
const {getProductsFirebase, getBuyersFirebase, addBuyerFirebase, updateOneFirebaseProduct} = require("../daos/dao/firebaseDb")
const{mailCompra} = require("../mailing/mailingSender")


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
    mailCompra(comprador, data._path.segments[1])
    return data;
}

const updateOneProductService = async (updObj) => {
    if(updObj.id && updObj.cantidad){
        let data = await updateOneFirebaseProduct(updObj.id, updObj.cantidad)
        return data;
    }else{
        return {message: "error al actualizar producto, por favor envia el formato correcto",
                    formato: {id: "21qS0AUU1VZm8UHE8OLz", cantidad: 20}}
    }
}



module.exports = {
    getProductsService,
    testerService,
    purchaseService,
    buyersListService,
    addBuyerService,
    updateOneProductService
}
