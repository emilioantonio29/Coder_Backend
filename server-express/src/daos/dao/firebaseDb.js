const {firestoreConnection} = require("../db-connection/firebase-connection")

const getProductsFirebase = async () =>{
    const snapshot = await firestoreConnection.collection('producto').get();
    const productos = await snapshot.docs.map(element => {
      return {"producto": {...element.data(), id:element.id}}
    })
    return productos
}

const getBuyersFirebase = async () => {
    const snapshot = await firestoreConnection.collection('ordenes').get();
    const compradores = await snapshot.docs.map(element => {
      return {...element.data(), id:element.id}
    })
    return compradores
}

const addBuyerFirebase = async (comprador) =>{
    const data = await firestoreConnection.collection("ordenes").add(comprador)
    return data
}

module.exports = {
    getProductsFirebase, getBuyersFirebase, addBuyerFirebase
}


