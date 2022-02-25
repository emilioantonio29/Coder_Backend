API GraphQL desarrollado con el framework de NODE JS - KOA

- KOA fue desarrollado por el mismo equipo de Express con un enfoque diferente aprovechandose de las nuevas caracteristicas de JS.
- KOA Tiene carasteristicas que ayudan a los devs de JS que sean usar y aprovechar NODE para acelerar el desarrollo de API y aplicaciones WEB.


    _________   _____________________________________________________    ______________
    |       | ->|                     BACK                          | -> |  DBs       |
    | front |   |                                 ________________  |    |            |
    |       | <-|   ------    ------    ------    |  ----- ----- |  | <- | firestore  |
    ---------   |   |    | -> |    | -> |    | -> |  |   | |   | |  |    |            |
                |   |    |    |    |    |    |    |  | c | | m | |  |    --------------
                |   |____| <- |____| <- |____| <- |  |___| |___| |  |
                |                                 |______________|  |
                |   index  graphQLSchema srv             DAO        |
                -----------------------------------------------------

Esta API de graphQL tiene dos metodos de consulta (QUERY) y uno de modificacion (MUTATION). Se encuentra implementada en el proyecto original, pero tiene la interfaz grafica del browser deshabiltiada.

PROYECTO ORIGINAL:

- HEROKU: https://soy-glucosa-project.herokuapp.com/
- BRANCH: https://github.com/emmartinez29/Coder_Backend/tree/GraphQL


PROYECTO DE ESTA API: Tiene la interfaz del browser habilitada
- HEROKU: https://soy-glucosa-project-apigraphql.herokuapp.com/         
- Lo que se ejecute con la API (grabar nuevas ordenes de compra), impacta en el proyecto original.                  


###GRAPHQL:

    Endpoint de ordenes: root

    El schema de graphQL tiene 3 metodos:

    1.- mutation para grabar una orden
    2.- query para obtener el listado completo de ordenes realizadas
    3.- query para obtener el listado completo de ordenes de un usuario (se le pasa el mail del comprador)
    

    1) Grabar una orden: la orden se graba en firestore con 4 parametros
    - Un array de items; cada item tiene los 6 parametros que se muestran en el ejemplo.
    - El objeto comprador.
    - El objeto Date.
    - El total de la compra.
    - Despues de grabar una orden, el endpoint te devuelve el nro de orden (doc de la collection en firestore).

    Ejemplo: 

    mutation{
        addOrden(
            comprador: {
                nombre: "GRAPHQL TESTING",
                telefono: "8484848",
                email: "GRAPHQLTESTING@hotmail.com"
            },
            items: [
            {
                cantidadComprada: 5,
                nombre: "Golfeado",
                categoria: "Golfeados",
                stockAfterBuy: 25,
                precio: 220,
                id: "21qS0AUU1VZm8UHE8OLz"
            }, 
            {
                precio: 260,
                id: "6Ir5RjW68DwzlSfjoMtm",
                categoria: "Mermeladas",
                cantidadComprada: 4,
                stockAfterBuy: 8,
                nombre: "Mermelada de Naranja"
            }],
            date: {
                _seconds: 1616461155,
                _nanoseconds: 478000000
            },
            total: 2140
        )
        {
            id
        }
    }


    2) Query para obtener el listado completo de ordenes realizadas: retorna un array con las ordenes. Cada orden es un objeto con el siguiente formato:
    - El ID del DOC en firestore, utilizado como nro de orden de compra.
    - Un array de items (en caso de que haya comprado mas de un item); cada item tiene los 6 parametros que se muestran en el ejemplo.
    - El objeto comprador.
    - El objeto Date.
    - El total de la compra.

    Ejemplo:

    query{
        orders{
          id,
          comprador{
            nombre,
            email,
            telefono
          },
          date{
            _seconds,
            _nanoseconds
          },
          items{
            cantidadComprada,
            nombre,
            categoria,
            stockAfterBuy,
            precio,
            id
          },
          total
        }
    }


    3) Query para obtener el listado completo de ordenes de un usuario (se le pasa el mail del comprador)
    - Devuelve la lista de ordenes que ha comprado un usuario. Se filtra por mail.

    Ejemplo:

    query{
        ordersByUser(email: "emilio_antonio29@hotmail.com"){
            id,
        	comprador{
              nombre,
              email,
              telefono
            },
        	date{
              _seconds,
              _nanoseconds
            },
        	items{
              cantidadComprada,
              categoria,
              precio,
              nombre,
              id,
              stockAfterBuy,
            }
        	total
        }
    }
