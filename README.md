## Coder_Backend: Comision 22885 

## Ecommerce - MERN Stack | https://soy-glucosa-project.herokuapp.com/

## Ultimo update: 11/03/2022

## Arquitectura: 
- Frontend: React | directorio client-react
- Backend: Node JS - Express | directorio server-express 
- DBs: Mongo (usuarios) | Firestore (productos y compras)
- El backend tiene una arquitectura de 5 capas mas una adicional de test; server-routes-controllers-service-dao | test
- Se implementó el patron DAOS en la capa de persistencia
- La configuracion de envios de mails se consume desde la capa de servicios
- Para correr los TEST, ingresar al directorio del server y ejecutar npm run test: se prueba el endpoint de traer los productos y las conexiones a las bases de datos. Las pruebas estan desarrolladas en el index.test.js.
```javascript
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
```
## Deploy Heroku: https://soy-glucosa-project.herokuapp.com/
- El package.json en el directorio root se utiliza para el deploy en Heroku. Instruye en heroku que primero debe entrar al directorio de react y hacer el build de la app, y luego debe ir al directorio del server a iniciar el servidor, el cual esta configurado con el modelo Data on Wire, las rutas para renderizar vistas apuntan al build de React.
- La capa de server esta diseñada para enviar todas las peticiones que no conoce al directorio donde esta el build de react.

## Desarrollo: 
- Cada directorio (client-react y server-express) tiene su package.json
- En el directorio de client-react, las instrucciones npm start y npm build funcionan como en cualquier proyecto de react. Inicia la app en el puerto 3000. Tener en cuenta que no hay proxy configurado, no se puede iniciar el server por un lado y react por otro porque los endpoints no van a funcionar.
- En el directorio server-express hay varias configuraciones; npm start inicia el servidor en el puerto 5000. npm run start-build hace el build de react y luego inicia el servidor en el puerto 5000.

## Endpoints Rest:
```javascript
    get  /apiFirebase/productos   | trae la lista de productos        | se utiliza en el front    | se puede probar con postman       
```
```javascript
    get  /apiFirebase/ordenes     | trae todas las compras realizadas | no se utiliza en el front | se puede probar con postman     
```
```javascript
    post /apiFirebase/compradores | hace push de la compra a firebase | se utiliza en el front    | se puede probar con postman. Ejemplo:  
    
    https://soy-glucosa-project.herokuapp.com/apiFirebase/compradores                             | Dispara un mail a la casilla comprador.email

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
            "email": "POSTMANTEST@test.com"
            },
        "date": {
            "_seconds": 1616461155,
            "_nanoseconds": 478000000
            },
        "total": 2140
    }
```
```javascript
    put  /apiFirebase/productos   | actualiza stock de un producto    | no se utiliza en el Front | se puede probar con postman. Ejemplo (Golfeado):
    
    https://soy-glucosa-project.herokuapp.com/apiFirebase/productos

    {
        "id": "21qS0AUU1VZm8UHE8OLz",
        "cantidad": 50
    }
```
```javascript
    put  /apiFirebase/actualizar20| actualiza a 20 todos los stock    | no se utiliza en el Front | se puede probar con postman. Ejemplo:    
    
    https://soy-glucosa-project.herokuapp.com/apiFirebase/actualizar20
```
```javascript
    post /apiMongo/registro       | graba un user en mongoAtlas       | se utiliza en el Front    | se puede probar con postman. Ejemplo:
    
    https://soy-glucosa-project.herokuapp.com/apiMongo/registro                                   | Dispara un mail a la casilla username

    {
        "nombre": "Name Postman",
        "apellido":"Lastname Postman",
        "username": "testpostman@test.com",
        "password": "12345",
        "provincia": "provinciaString",
        "localidad": "localidadString",
        "calle": "calleString",
        "altura": "alturaString",
        "zip": "zipString",
        "telefono": "telefonoString",
        "tyc": true,
        "fecha": "2022-03-11T00:45:39.157Z"
    }
```
```javascript
    post /apiMongo/login          | envia user/pass y valida user     | se utiliza en el Front    | se puede probar con postman. Ejemplo:     
    
    https://soy-glucosa-project.herokuapp.com/apiMongo/login

    {
        "username": "probarConUserReal@test.com",
        "password": "1234"
    }
```
```javascript
    post /apiMongo/recovery       | envia mail de recupero            | se utiliza en el Front    | se puede probar con postman. Ejemplo:
    
    https://soy-glucosa-project.herokuapp.com/apiMongo/recovery                                   | Dispara un mail a la casilla username con la pass

    {
        "username": "probarConUserReal@test.com"
    }
```
```javascript
    get  /apiMongo/logout         | destruye la sesion                | se utiliza en el Front    | se puede probar con postman     
```
```javascript
    get  /apiMongo/user           | verifica si hay una sesion creada | se utiliza en el Front        
```
- Revisar el resto de los endpoints en la capa ROUTES.

## Endpoints GraphQL: 
- La interfaz del browser esta deshabilitada. Solo se pueden probar desde postman.
- Los endpoints graphQL pegan a las mismas bases de datos (mongo y firestore). Se hizo un desarrollo especifico de graphQL en la siguiente rama: https://github.com/emmartinez29/Coder_Backend/tree/KoaFramework_ApiGrapQL
- Se hizo deploy de los endpoints de graphQL en otro proyecto de Heroku: https://soy-glucosa-project-apigraphql.herokuapp.com/
- NOTA: No habilitar interfaz del browser en este proyecto. Escribeme y te digo el motivo :)

    Endpoint de ordenes: root

    El schema de graphQL tiene 3 metodos:

    1.- mutation para grabar una orden
    2.- query para obtener el listado completo de ordenes realizadas
    3.- query para obtener el listado completo de ordenes de un usuario (se le pasa el mail del comprador)
```javascript
    1) Grabar una orden: la orden se graba en firestore con 4 parametros
    - Un array de items; cada item tiene los 6 parametros que se muestran en el ejemplo.
    - El objeto comprador.
    - El objeto Date.
    - El total de la compra.
    - Despues de grabar una orden, el endpoint te devuelve el nro de orden (doc de la collection en firestore).

    Ejemplo:        
```
```javascript
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
```
```javascript
    2) Query para obtener el listado completo de ordenes realizadas: retorna un array con las ordenes. 
    Cada orden es un objeto con el siguiente formato:
    - El ID del DOC en firestore, utilizado como nro de orden de compra.
    - Un array de items (en caso de que haya comprado mas de un item); cada item tiene los 6 parametros que se muestran en el ejemplo.
    - El objeto comprador.
    - El objeto Date.
    - El total de la compra.

    Ejemplo:        
```
```javascript
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
```
```javascript
    3) Query para obtener el listado completo de ordenes de un usuario (se le pasa el mail del comprador)
    - Devuelve la lista de ordenes que ha comprado un usuario. Se filtra por mail.

    Ejemplo:      
```
```javascript
    query{
        ordersByUser(email: "emilio_antonio29@hotmail.com")
        {
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
```
## Reglas de negocio:
- Cuando inicia la aplicacion se hace un llamado a FIRESTORE para traerse el listado de productos, el mismo se guarda en un global context y se pasa a los componentes que lo requieren.
- La aplicación permite al usuario navegar por el sitio y agregar items al carrito hasta que se acabe el stock; estas actualizaciones (agregar items al carrito) se manejan con el local storage del browser.
- Para manejar las opciones del carrito el usuario debe iniciar sesión. es importante destacar que para efectos de prueba, la sesion dura 1 minuto.
- En el icono de persona, el usuario puede iniciar sesion, y si no tiene usuario puede registrarse. 
- Al iniciar sesion se le habilita un componente al usuario que muestra el panel de control, donde podra proximamente visualizar su perfil, si es admin podra cargar mas productos o actualizarlos, y tiene accesos directos a los productos y al carrito.

