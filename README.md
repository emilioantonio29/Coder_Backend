###Coder_Backend - Camada/Comision 22885

Aplicacion MERN Stack


###Configuracion: 

En el directorio principal estan todos los archivos del servidor, correr npm i para instalar dependencias del Server.

En el directorio /client-react correr npm i para instalar dependencias del Cliente (React). 
Aclaración: No hay proxy configurado; react le pega a los endpoints como si fueran locales, ya que el server esta configurado para renderizar el build de react.

El directorio /public-htmlOnWire contiene vistas de prueba que no estan en uso.


###RUN APP: 

El stack se migró del modelo html on wire (pug, handlebars), al stack MERN.

El entorno de trabajo de trabajo esta configurado para desarrollar con 3 opciones posibles (ver opciones en los archivos package.json):

    1.- Servidor: correr cada comando segun lo necesitado.
    -   npm start; inicia el server en el puerto 5000 o en el process.env.PORT. El server está configurado por defecto para pegarle al
    build que ya debe estar en el directorio de React.
    -   npm run start-dev; inicia el server con las mismas caracteristicas mencionadas en el punto anterior, pero se inicia con nodemon.
    -   npm run start-build; ejecuta dos procesos. Primero va al directorio client-react y buildea react, luego ejecuta el servidor con
    nodemon. Esta opcion asegura que siempre se renderizará el ultimo cambio realizado en React.

    2.- Cliente: se encuentra en el directorio /client-react; se pueden ejecutar las instrucciones bien conocidas de react.
    -   npm start
    -   npm run build


###HEROKU: 

La aplicación se deployo y quedó corriendo en la siguiente url: https://soy-glucosa-project.herokuapp.com/


###Reglas de Negocio:

    1.- Cuando inicia la aplicacion se hace un llamado a FIRESTORE para traerse el listado de productos, el mismo se guarda en un global context y se pasa a los componentes que lo requieren.

    2.- La aplicación permite al usuario navegar por el sitio y agregar items al carrito hasta que se acabe el stock; estas actualizaciones (agregar items al carrito) se manejan con el local storage del browser.

    3.- Para manejar las opciones del carrito el usuario debe iniciar sesión. es importante destacar que para efectos de prueba, la sesion dura 1 minuto.

    4.- En el icono de persona, el usuario puede iniciar sesion, y si no tiene usuario puede registrarse. 

    5.- Al iniciar sesion se le habilita un componente al usuario que muestra el panel de control, donde podra proximamente visualizar su perfil, si es admin podra cargar mas productos o actualizarlos, y tiene accesos directos a los productos y al carrito.


    


