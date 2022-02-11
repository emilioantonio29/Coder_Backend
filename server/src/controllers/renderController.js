class RutasRender{
    static barra = (req, res) =>{
        res.json({saludo:"Bienvenido a la raiz de la ruta API"})
      }
}

module.exports={
    RutasRender
}