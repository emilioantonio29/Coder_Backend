
const {firestoreConnection} = require("../db-connection/firebase-connection")


const getProductsFirebase = async () =>{
    const snapshot = await firestoreConnection.collection('producto').get();
    const productos = await snapshot.docs.map(element => {
      return {"producto": {...element.data(), id:element.id}}
    })
    return productos
}


module.exports = {
    getProductsFirebase,
}


