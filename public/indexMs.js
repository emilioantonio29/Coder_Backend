// const socket = io(); // Ya podemos empezar a usar los sockets desde el cliente :)
console.log("test2")

const renderMensajes = () => {
    fetch(`api/MongoD/mensajes`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        if(data.length){
            const template = Handlebars.compile(
                `
                <br><br>
                <div class="container"> 
                    <div class="d-flex justify-content-center"> 
                    </div>
                    <table class="table table-hover table-dark">
                    <thead>
                        <tr>
                        <th scope="col">Id - Email</th>
                        <th scope="col">Mensaje</th>
                        </tr>
                    </thead>
                    <tbody>
                        {{#each products}} 
                        <tr>
                            <td>{{this.email}}</td>
                            <td>{{this.mensaje}}</td>

                        </tr>
                        {{/each}}
                    </tbody>
                    </table>
                </div>
                `
                );
                const html=template(
                    {
                        products: data
                    }
                )
                document.querySelector("#messages").innerHTML=html
        }else{
            const template = Handlebars.compile(
                `
                <br><br>
                <div class="container"> 
                    <h1 style="color: blue;">No se encontraron productos</h1>
                    <div class="d-flex justify-content-center align-items-center" style="height:50vh">
                        <img src="https://www.iamqatar.qa/assets/images/no-products-found.png" alt="">
                    </div>
                </div>
                `
                );
                const html=template(
                    {
                        products: data
                    }
                )
                document.querySelector("#messages").innerHTML=html
    
        }
    });
}
renderMensajes();
const altaMensaje = () =>{
// if(confirm(`Caballero Agregado Correctamente`)){
//         location.replace("/productos") 
//     }
//location.replace("/productos") 
var email = document.getElementById("email").value;
var nombre = document.getElementById("nombre").value;
var apellido = document.getElementById("apellido").value;
var mensajes = document.getElementById("mensajes").value;
console.log(`${email},${nombre},${apellido},${mensajes}`)
fetch(`api/MongoD/mensajes`, {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        "email": `${email}`,
        "nombre": `${nombre}`,
        "apellido": `${apellido}`,
        "mensaje": `${mensajes}`
    })
})
.then(response => {
    //return response.json()
    // if(confirm('Caballero Eliminado Correctamente')){
    //     location.replace("/productos") 
    // }
    console.log(res)
})
.then(data => {
    console.log(data)
    // console.log(data[Object.keys(data)[0]].title)
    if(confirm(`Item dado de alta correctamente`)){
        //document.getElementById("altaForm").reset(); 
        //location.replace("/alta")

    }
})
.catch(error => console.log(error))
.finally(()=>{
    renderMensajes()
})

}

const login = () =>{
    var user = document.getElementById("user").value;
    if(user===''){
        alert("por favor ingresa un usuario ")
    }else{
        fetch(`/loginAuth/${user}`).then(function(response) {
            console.log("Sesión Iniciada")
            location.replace("/");
          })
          .catch(function(error) {
            console.log('Hubo un problema con la petición Fetch:' + error.message);
          });


        // fetch(`/loginUser?nombre=${user}`, {
        // method: 'GET'})
        // .then(response => {
        //     console.log(res)
        //     console.log("login ok")
        // })
        // .catch(error => alert(`${error}: Intentalo nuevamente`))
    }

    
    }