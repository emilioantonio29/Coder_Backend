const {firestoreConnection} = require("../db-connection/firebase-connection")

const getProductsFirebase = async () =>{

    try {
      const snapshot = await firestoreConnection.collection('producto').get();
      const productos = await snapshot.docs.map(element => {
        return {"producto": {...element.data(), id:element.id}}
      })
      return productos
      
    } catch (error) {
      
      return "error al obtener listado de productos"
    }

}

const getBuyersFirebase = async () => {
    const snapshot = await firestoreConnection.collection('ordenes').get();
    const compradores = await snapshot.docs.map(element => {
      return {...element.data(), id:element.id}
    })
    return compradores
}

const updateFirebase = async (objComprador) =>{
  for(let i =0; i<objComprador.items.length; i++){
    const doc = await firestoreConnection.collection('producto').doc(objComprador.items[i].id);
    doc.update({cantidad: objComprador.items[i].stockAfterBuy})
  }
  //console.log(objComprador.items)
}

const updateFirebase20 = async () =>{


  try {
    let products = await getProductsFirebase()
    //console.log(products)

    for(let i =0; i<products.length; i++){
      const doc = await firestoreConnection.collection('producto').doc(products[i].producto.id);
      doc.update({cantidad: 20})
    }
    return "registros actualizados con exito"
  } catch (error) {
    return "ocurrio un error al actualizar los productos"
  }

  //console.log(objComprador.items)
}

const updateOneFirebaseProduct = async (id, cant) =>{
  try {
    const doc = await firestoreConnection.collection('producto').doc(id);
    const newDoc = await doc.update({cantidad: cant})
    let response = {message: "producto actualizado correctamente", dbResponse:newDoc }
    return response;
  } catch (error) {
    let response = {message: "error al actualizar producto", dbResponse:error }
    return response;
  }
}

const addBuyerFirebase = async (comprador) =>{
    const data = await firestoreConnection.collection("ordenes").add(comprador)
    await updateFirebase(comprador)
    return data
}

module.exports = {
    getProductsFirebase, getBuyersFirebase, addBuyerFirebase, updateOneFirebaseProduct, updateFirebase20
}


