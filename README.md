###Coder_Backend - Camada/Comision 22885 | 3ra Entrega del proyecto: MERN STACK


###Configuracion: 

En el directorio principal, correr npm i para instalar dependencias del cliente.

En el directorio /server correr npm i para instalar dependencias del server.


###RUN APP: 

Para esta tercera entrega migré todo el proyecto a REACT, para entregar una aplicación MERN STACK; toda la aplicación la estabamos haciendo con motores de plantillas (pug, handlebars), pero investigar para configura un stack MERN me parece mas productivo.

El entorno de trabajo de trabajo esta configurado para desarrollar con 3 opciones posibles (ver opciones en los archivos package.json):

    1.- Only Client: en el directorio raiz correr "npm run start-client"; esto corre la aplicacion de react en el puerto 3000. Es solo un modo para desarrollo de react. Con esta opcion no se pueden probar los endpoints porque estan desarrollados en el servidor.

    2.- Only Server: en el directorio /server correr "npm run start-server"; esto corre el servidor de express en el puerto 5000. Con esta opcion se puede trabajar en cualquier archivo del servidor, pero si se tocan archivos de REACT no conoceremos si los cambios son correctos hasta que se compile. Con esta opcion dependemos de que la aplicacion de REACT se haya compilado al menos una vez, ya que el index.js del server busca los archivos que estan en la carpeta BUILD.

    3.- MERN: en el directorio raiz correr npm start; esto buildeara la aplicacion de react y abrirá el servidor en el puerto 5000. Este entorno es el ideal para hacer cambios tanto en el front como en el back.


###HEROKU: 

La aplicación se deployo y quedó corriendo en la siguiente url: https://soy-glucosa-project.herokuapp.com/


###Reglas de Negocio:

    1.- Cuando inicia la aplicacion se hace un llamado a FIRESTORE para traerse el listado de productos, el mismo se guarda en un global context y se pasa a los componentes que lo requieren.

    2.- La aplicación permite al usuario navegar por el sitio y agregar items al carrito hasta que se acabe el stock; estas actualizaciones (agregar items al carrito) se manejan con el local storage del browser.

    3.- Para manejar las opciones del carrito el usuario debe iniciar sesión. es importante destacar que para efectos de prueba, la sesion dura 1 minuto.

    4.- En el icono de persona, el usuario puede iniciar sesion, y si no tiene usuario puede registrarse. 

    5.- Al iniciar sesion se le habilita un componente al usuario que muestra el panel de control, donde podra proximamente visualizar su perfil, si es admin podra cargar mas productos o actualizarlos, y tiene accesos directos a los productos y al carrito.

    6.- El carrito tiene 3 pasos para completar la compra; al terminarse la compra, falta hacer un llamado a FIRESTORE para verificar si el stock del carrito aun sigue vigente en la base, y si es asi hacer el update. La compra dispara un mail al usuario pero por algun motivo ethereal no esta logrando enviar los mails. Logueandose con el usuario del mail utilizado para enviar los correos, se puede verificar que estan saliendo: 

    - https://ethereal.email/login
    - stefanie.dickinson22@ethereal.email
    - ZBa185z5rcqJDxKnDP

    7.- Otras validaciones las estaré documentando proximamente...

    


