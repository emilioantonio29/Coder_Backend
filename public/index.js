// const socket = io(); // Ya podemos empezar a usar los sockets desde el cliente :)
console.log("test")
var baseProducto = "MongoD"
const db = () =>{
    baseProducto = document.getElementById("db").value;
    console.log(baseProducto)

}


function cambioBase(){
    baseProducto = document.getElementById("db").value;
    console.log(baseProducto)
    renderProductos()
}

// socket.on('messages', data => {
//     console.log(data)
//     render(data)
// })
// var form = document.getElementById("form");
// form.style.display = "none";
var editar = document.getElementById("editar");
editar.style.display = "none";
var detalle = document.getElementById("detalle");
detalle.style.display = "none";
var lista = document.getElementById("lista");
// detalle.style.display = "none";
// const test = () =>{
//     // fetch('http://localhost:7001/api/productos')
//     // .then(res => res.json())
//     // .then(data => console.log(data[0]))

//     console.log({{this.id}})
//     lista.style.display = "none";
//     detalle.style.display = "block";

// }

const renderProductos = () => {
    fetch(`/api/${baseProducto}/productos`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        if(data.length){
            const template = Handlebars.compile(
                `
                <br><br>
                <div class="container"> 
                    <div class="d-flex justify-content-center"> 
                        <h1 style="color: blue;">Listado de Productos</h1>
                    </div>
                    <table class="table table-hover table-dark">
                    <thead>
                        <tr>
                        <th scope="col">NOMBRE</th>
                        <th scope="col">PRECIO</th>
                        <th scope="col">FOTO</th>
                        <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {{#each products}} 
                        <tr>
                            <td>{{this.title}}</td>
                            <td>{{this.price}}</td>
                            <td><img src="{{this.thumbnail}}" alt="" height="50px"></td>
                            <td><button onclick='replacer({{this.id}})'>Ver Detalle</button></td>
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
                document.querySelector("#productos").innerHTML=html
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
                document.querySelector("#productos").innerHTML=html
    
        }
    });
}
renderProductos()

let idDetalle = 1
const replacer = id => {
    // fetch('http://localhost:7001/api/productos')
    // .then(res => res.json())
    // .then(data => console.log(data[0]))


    console.log(id)
    lista.style.display = "none";
    detalle.style.display = "block";
    // var form = document.getElementById("form");
    // form.style.display = "none";
    fetch(`/api/${baseProducto}/productos/${id}`)
        .then(res => res.json())
        .then(data => {
            console.log(data.title)
            if(data){
                const template = Handlebars.compile(
                    `
                    <br><br>
                    <div class="card" style="width: 18rem;">
                        <img src="${data[0].thumbnail}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${data[0].title}</h5>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <a href="#" class="btn btn-primary" onclick="deleteServer(${data[0].id})">Borrar</a>
                        </div>
                    </div>
                    <br><br>
                    <!-- START -->
                    <p>
                        <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                        Editar
                        </button>
                    </p>
                    <div class="collapse" id="collapseExample">
                        <div class="card card-body">
                            <div class="form-group">
                                <label for="id">ID:</label>
                                <input readonly type="id" class="form-control" id="id" placeholder="1" value=${data[0].id}>
                                <br>
                                <label for="title">Title</label>
                                <input  type="text" class="form-control" id="title" placeholder="Seiya de Pegaso" value=${data[0].title}>
                                <br>
                                <label for="price">Price</label>
                                <input  type="number" class="form-control" id="price" placeholder="999" value=${data[0].price}>
                                <br>
                                <label for="thumbnail">Thumbnail</label>
                                <input  type="text" class="form-control" id="thumbnail" placeholder="https://loscaballerosdelzodiaco.000webhostapp.com/imagenes/cisne.png" 
                                value=${data[0].thumbnail}>
                            </div>
                            <button onclick="editarProducto()" class="btn btn-success">Guardar</button>

                        </div>
                    </div>
                    <!-- END -->
                    <div>
                    <br><br>
                    
                    `
                    );
                    const html=template(
                        {
                            products: data
                        }
                    )
                    document.querySelector("#detalle").innerHTML=html
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
                    document.querySelector("#detalle").innerHTML=html
        
            }
        })
}

const deleteServer = id =>{
    fetch(`api/${baseProducto}/productos/${id}`, {
        method: 'DELETE',
        headers: {
        'Content-Type': 'application/json'
        },
    })
    .then(response => {
        console.log(response)
        if(confirm('Caballero Eliminado Correctamente')){
            location.replace("/productos") 
        }
    })
    .catch(error => alert("hubo un error"))
} 

const editarProducto = () =>{
    var idF = parseInt(document.getElementById("id").value);
    var titleF = document.getElementById("title").value;
    var priceF = parseInt(document.getElementById("price").value);
    var thumbnailF = document.getElementById("thumbnail").value;
    console.log(`${idF},${titleF},${priceF},${thumbnailF}`)
    console.log(typeof(idF))
    fetch(`api/${baseProducto}/productos/${idF}`, {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "title": `${titleF}`,
            "price": parseInt(priceF),
            "thumbnail": `${thumbnailF}`
        })
    })
    .then(response => {
        return response.json()
        // if(confirm('Caballero Eliminado Correctamente')){
        //     location.replace("/productos") 
        // }
    })
    .then(data => {
        console.log(data)
        // console.log(data[Object.keys(data)[0]].title)
        if(confirm(`Caballero Editado Correctamente: ${data[Object.keys(data)[0]].id},${data[Object.keys(data)[0]].title},
        ${data[Object.keys(data)[0]].price},${data[Object.keys(data)[0]].thumbnail}`)){
            location.replace("/productos") 
        }
    })
    .catch(error => alert("hubo un error"))
}

const altaS = () =>{
    // if(confirm(`Caballero Agregado Correctamente`)){
    //         location.replace("/productos") 
    //     }
    //location.replace("/productos") 
    console.log("alta")
    var titleA = document.getElementById("titleA").value;
    var priceA = parseInt(document.getElementById("priceA").value);
    var thumbnailA = document.getElementById("thumbnailA").value;
    console.log(`${titleA},${priceA},${thumbnailA}`)
    fetch(`api/${baseProducto}/productos`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "title": `${titleA}`,
            "price": parseInt(priceA),
            "thumbnail": `${thumbnailA}`
        })
    })
    .then(response => {
        return response.json()
        // if(confirm('Caballero Eliminado Correctamente')){
        //     location.replace("/productos") 
        // }
    })
    .then(data => {
        console.log(data)
        // console.log(data[Object.keys(data)[0]].title)
        if(confirm(`Item dado de alta correctamente`)){
            document.getElementById("altaForm").reset(); 
            location.replace("/alta") 
        }
    })
    .catch(error => console.log(error))
}

// function render(data){
//     const html=data.map((elem,index)=>{
//         return(`
//         <div>
//             <strong>${elem.author}</strong>
//             <em>${elem.text}</em>
//         </div>`)
//     }).join(" ");
//     document.getElementById('messages').innerHTML=html
// }

// function addMessage(e){
//     const mensaje = {
//         author: document.getElementById('username').value,
//         text: document.getElementById('texto').value,
//     }
//     socket.emit("new-message", mensaje)
//     document.getElementById('texto').value =''
//     document.getElementById('texto').focus()

//     return false;
// }


//  socket.on('mi_mensaje', data => {
//     alert(data)
//     document.getElementById("bienvenida").innerText = data
// })








// document.getElementById("sendData").addEventListener("click", ()=>{
//     const title = document.getElementById('title').value;
//     const price = document.getElementById('price').value;
//     const thumbnail = document.getElementById('thumbnail').value;
//     const data = {
//         title: title,
//         price: price,
//         thumbnail: thumbnail
//     }
//     socket.emit("act", data)
//     document.getElementById("formSender").reset();
//     // socket.emit("act")
// })

/*funciones DB*/

var database = "mongoDBaaS"

function noDb(){
    
    alert("No se seleccionó ninguna base; por defecto se guardaran los datos en mongoDBaaS")
}

function dbSelect(){
    database = document.getElementById("db").value;
    console.log(database)

}

function dbSeleccionada(){
    alert("base seleccionada: "+ database)
}