const nodemailer = require("nodemailer")
const {template1, template2} = require("./templates/welcome")
const {purchase1, purchase2, purchase3} = require("./templates/purchase")


const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: 'educacionit6464@gmail.com',
        pass: 'nvwkjmsjsikuxjpr'
    }
});



const mailBienvenida = (user) =>{
    const mailOptions = {
        from: 'SoyGlucosa Project',
        to: `${user.username}`,
        subject: 'Portal SoyGlucosa: ¡Registro exitoso!',
        html: `${template1} ¡Muchas gracias por registrarte ${user.nombre}! ${template2}`
    }

    transporter.sendMail(mailOptions)
        .then((data)=>{
            console.log(data)
            // res.status(200).json(data);
            // return 200;
        }).catch((err)=>{
            // res.status(500).send(err.message)
            console.log(err.message)
            // return 500;
        })
}


const mailCompra = async (compra, ordenDeCompra) => {

    let detail;
    let first = true;
    for(let i =0; i<compra.items.length; i++){

        if(first){
            first = false;
            detail = 
            `<p>${compra.items[i].nombre} | cantidad: ${compra.items[i].cantidadComprada} | precio: ${compra.items[i].precio} </p>`
        }else{
            detail = detail + `<p>${compra.items[i].nombre} | cantidad: ${compra.items[i].cantidadComprada} | precio: ${compra.items[i].precio} </p>`
        }
    }

    let totalV = `<p>Total: $${compra.total}</p>`
    let ordenDeC = `<p>Orden de Compra N°: ${ordenDeCompra}</p>`

    const mailOptions = {
        from: 'SoyGlucosa Project',
        to: `${compra.comprador.email}`,
        subject: 'Portal SoyGlucosa: ¡Muchas gracias por tu compra!',
        html: `${purchase1} ¡Gracias por tu compra ${compra.comprador.nombre}! ${purchase2} <h3>Detalle de la compra:</h3> ${ordenDeC} ${detail} ${totalV} ${purchase3}`
    }

    
    transporter.sendMail(mailOptions)
        .then((data)=>{
            console.log(data)
            // res.status(200).json(data);
            // return 200;
        }).catch((err)=>{
            // res.status(500).send(err.message)
            console.log(err.message)
            // return 500;
        })
}


module.exports = {mailBienvenida, mailCompra}