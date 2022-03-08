###Coder_Backend - Camada/Comision 22885

Aplicacion MERN Stack


###Configuracion: 

update 19/02/2022.

Subiendo nueva arquitectura en al aplicacion: directorio client-react tiene todo el contenido completo de la app de react; el directorio server-express tiene toda la configuracion de un servidor de express.

El package.json en el root lo utilizo para el deploy en Heroku. Basicamente instruye en heroku que primero debe entrar al directorio de react y buildear la app, y luego debe ir al directorio del server a iniciar el servidor, el cual esta configurado con el modelo Data on Wire, las rutas para renderizar vistas apuntan al build de React.

Se implementó el patron DAOS en la capa de persistencia.

    _________    _____________________________________________________    ______________
    |       | -> |                     BACK                          | -> |  DBs       |
    | front |    |                                 ________________  |    |            |
    |       | <- |   ------    ------    ------    |  ----- ----- |  | <- | mongoAtlas |
    ---------    |   |    | -> |    | -> |    | -> |  |   | |   | |  |    | firestore  |
                 |   |    |    |    |    |    |    |  | c | | m | |  |    --------------
                 |   |____| <- |____| <- |____| <- |  |___| |___| |  |
                 |                                 |______________|  |
                 |   routes  controller  service          DAO        |
                 ---------------------------↑-------------------------
                            ↓       ↑       |_________
                    --------------------------        ↓         
                    |                        |     ---------
                    |       TEST LAYER       |     |mailing|
                    |________________________|     |_______|


Se implementará una nueva capa de TEST: npm run test, prueba la ruta de traer los productos y las conexiones a las bases de datos.


###RUN APP: 

El entorno de trabajo de trabajo esta configurado desarrollar con varias opciones:

    1.- directorio server-express: 
    -   correr npm run start-dev; inicia el server en el puerto 5000 o en el process.env.PORT con nodemon. El server renderiza y esta apuntando al ultimo build que ya debe estar en el directorio de React.
    -   npm start; inicia el servidor con la instruccion por defecto de node (node index.js).
    -   npm run start-build; ejecuta dos procesos. Primero va al directorio client-react y buildea react, luego ejecuta el servidor con
    nodemon. Esta opcion asegura que siempre se renderizará el ultimo cambio realizado en React.

    2.- Cliente: se encuentra en el directorio /client-react; se pueden ejecutar las instrucciones bien conocidas de react.
    -   npm start
    -   npm run build

    3.- El package.json del root hace referencia a la config para deployar en Heroku.

    4.- npm run test; ejecuta las pruebas del index.test.js.


###HEROKU: 

La aplicación se deployo y quedó corriendo en la siguiente url: https://soy-glucosa-project.herokuapp.com/


###Reglas de Negocio:

    1.- Cuando inicia la aplicacion se hace un llamado a FIRESTORE para traerse el listado de productos, el mismo se guarda en un global context y se pasa a los componentes que lo requieren.

    2.- La aplicación permite al usuario navegar por el sitio y agregar items al carrito hasta que se acabe el stock; estas actualizaciones (agregar items al carrito) se manejan con el local storage del browser.

    3.- Para manejar las opciones del carrito el usuario debe iniciar sesión. es importante destacar que para efectos de prueba, la sesion dura 1 minuto.

    4.- En el icono de persona, el usuario puede iniciar sesion, y si no tiene usuario puede registrarse. 

    5.- Al iniciar sesion se le habilita un componente al usuario que muestra el panel de control, donde podra proximamente visualizar su perfil, si es admin podra cargar mas productos o actualizarlos, y tiene accesos directos a los productos y al carrito.


###GRAPHQL:

    Endpoint de ordenes: /apiFirebase/ordenes/graphql

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

    
    *) Adicional: deje dos endpoints para consumirlos desde cualquier cliente/browser aparte de graphQL.

    POST: /apiFirebase/compradores (graba una orden)

    Ejemplo:

    {
        "items": [
            {
                "cantidadComprada": 5,
                "nombre": "Golfeado",
                "categoria": "Golfeados",
                "stockAfterBuy": 25,
                "precio": 220,
                "id": "21qS0AUU1VZm8UHE8OLz"
            }, 
            {
                "precio": 260,
                "id": "6Ir5RjW68DwzlSfjoMtm",
                "categoria": "Mermeladas",
                "cantidadComprada": 4,
                "stockAfterBuy": 8,
                "nombre": "Mermelada de Naranja"
            }],
        "comprador": {
            "nombre": "POSTMAN TEST",
            "telefono": "8484848",
            "email": "POSTMAN_TEST@hotmail.com"
            },
        "date": {
            "_seconds": 1616461155,
            "_nanoseconds": 478000000
            },
        "total": 2140
    }


    GET: /apiFirebase/ordenes (consulta el listado de ordenes)
    



    


