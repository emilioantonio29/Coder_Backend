import express from 'express';
import faker from 'faker'
faker.locale = 'es'

function crearAzar(id){
    return {
        id,
        title: faker.commerce.productName(),
        price: faker.finance.amount(),
        thumbnail: faker.image.imageUrl()
    }
}

// funcion para crear el router, cargar el middleware para convertir la tira de string del request a json, carga las rutas y vincula al manejador con el array de mascotass
function routerFaker(){
    
    const routerApiProductos = express.Router()
    routerApiProductos.use(express.json())
    routerApiProductos.use(express.urlencoded({extended: true}))


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // RAIZ API
    routerApiProductos.get('/vista-test', (req, res) =>{
        const cant = Number(req.query.cant) || 10 // operador para check de null; en caso de que el valor venga en null asigna 10
        const zero = Number(req.query.cant)
        if(zero === 0){
            res.json({error: 'No hay productos'})
        }else{
            res.json(Array.from(new Array(cant), (v,i)=>crearAzar(i+1)))
        }
    })

    return routerApiProductos;

}
export {routerFaker}