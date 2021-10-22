import express from 'express';

// funcion para crear el router, cargar el middleware para convertir la tira de string del request a json, carga las rutas y vincula al manejador con el array de mascotass
function routerRender(){
    
    const routerApiProductos = express.Router()
    routerApiProductos.use(express.json())
    routerApiProductos.use(express.urlencoded({extended: true}))


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // RAIZ API
    routerApiProductos.get('/', (req, res) =>{
        res.render("index", {
            bienvenida: "¡Bienvenidos al proyecto!"
        });
    })
    routerApiProductos.get('/alta', (req, res) =>{
        res.render("alta", {
            bienvenida: "Formulario de alta de productos:"
        });
    })
    //GET DATA
    routerApiProductos.get("/productos", (req, res)=>{
        res.render("productos", {
            bienvenida: "¡Bienvenidos al proyecto!"
        });
    })
    // routerApiProductos.get("/productos/:id", (req, res)=>{
    //     const {id} = req.params
    //     const producto = USERS_DB.filter(product => product.id == parseInt(id))[0];
    //     const productoArray = []
    //     productoArray.push(producto)
    //     if(producto){
    //        return res.render("productosId", {
    //             productoArray
    //         });
    //     }
    //     res.render("productosId", {
    //         errorNoInventarioId: "No se encontraron productos con ese ID"
    //     });
    // })
    //SEND DATA

    // UPDATE

    // DELETE

    return routerApiProductos;

}
export {routerRender}