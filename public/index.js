const socket = io(); // Ya podemos empezar a usar los sockets desde el cliente :)



socket.on('messages', data => {
    console.log(data)
    render(data)
})

function horario(){
    let hora = ''
    var d = new Date();
    hora = d.getDate()+'-'+(d.getMonth()+1)+'-'+d.getFullYear()+' '+(d.getHours())+':'+d.getMinutes()+':'+d.getSeconds()
    return hora;
}

function render(data){
    const html=data.map((elem,index)=>{
        return(`
        <div>
            <strong style="color:blue">${elem.author}</strong>
            <strong style="color:green">${horario()}</strong>
            <em>${elem.text}</em>
        </div>`)
    }).join(" ");
    document.getElementById('messages').innerHTML=html
}

function addMessage(e){
    const mensaje = {
        author: document.getElementById('username').value,
        text: document.getElementById('texto').value,
    }
    socket.emit("new-message", mensaje)
    document.getElementById('texto').value =''
    document.getElementById('texto').focus()

    return false;
}


 socket.on('mi_mensaje', data => {
    alert(data)
    document.getElementById("bienvenida").innerText = data
})




socket.on('productos',  productos => {
    console.log(productos)
    if(productos.length){
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
                    </tr>
                </thead>
                <tbody>
                    {{#each products}} 
                    <tr>
                        <td>{{this.title}}</td>
                        <td>{{this.price}}</td>
                        <td><img src="{{this.thumbnail}}" alt="" height="50px"></td>
                    </tr>
                    {{/each}}
                </tbody>
                </table>
            </div>
            `
            );
            const html=template(
                {
                    products: productos
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
                    products: productos
                }
            )
            document.querySelector("#productos").innerHTML=html

    }
})  

document.getElementById("sendData").addEventListener("click", ()=>{
    const title = document.getElementById('title').value;
    const price = document.getElementById('price').value;
    const thumbnail = document.getElementById('thumbnail').value;
    const data = {
        title: title,
        price: price,
        thumbnail: thumbnail
    }
    socket.emit("act", data)
    document.getElementById("formSender").reset();
    // socket.emit("act")
})
