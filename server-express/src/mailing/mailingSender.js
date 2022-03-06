const nodemailer = require("nodemailer")
const {template1, template2} = require("./templates/welcome")


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

module.exports = {mailBienvenida}