###Coder_Backend - Camada/Comision 22885

Aplicacion MERN Stack


###Configuracion: 

update 19/02/2022.

Subiendo nueva arquitectura en al aplicacion: directorio client-react tiene todo el contenido completo de la app de react; el directorio server-express tiene toda la configuracion de un servidor de express.

El package.json en el root lo utilizo para el deploy en Heroku. Basicamente instruye en heroku que primero debe entrar al directorio de react y buildear la app, y luego debe ir al directorio del server a iniciar el servidor, el cual esta configurado con el modelo Data on Wire, las rutas para renderizar vistas apuntan al build de React.

Se implementó el patron DAOS en la capa de persistencia.

Se implementará una nueva capa de TEST.


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


###HEROKU: 

La aplicación se deployo y quedó corriendo en la siguiente url: https://soy-glucosa-project.herokuapp.com/


###Reglas de Negocio:

    1.- Cuando inicia la aplicacion se hace un llamado a FIRESTORE para traerse el listado de productos, el mismo se guarda en un global context y se pasa a los componentes que lo requieren.

    2.- La aplicación permite al usuario navegar por el sitio y agregar items al carrito hasta que se acabe el stock; estas actualizaciones (agregar items al carrito) se manejan con el local storage del browser.

    3.- Para manejar las opciones del carrito el usuario debe iniciar sesión. es importante destacar que para efectos de prueba, la sesion dura 1 minuto.

    4.- En el icono de persona, el usuario puede iniciar sesion, y si no tiene usuario puede registrarse. 

    5.- Al iniciar sesion se le habilita un componente al usuario que muestra el panel de control, donde podra proximamente visualizar su perfil, si es admin podra cargar mas productos o actualizarlos, y tiene accesos directos a los productos y al carrito.


    


