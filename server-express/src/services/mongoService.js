const {passwordRecoveryDbMongo} = require("../daos/dao/mongoDb")
const {mailRecoveryPassword} = require("../mailing/mailingSender")

const passwordRecoveryService = async (mail) => {
    let data = await passwordRecoveryDbMongo(mail)
    if(data == null){
        console.log("User Not Found")
    }else{
        mailRecoveryPassword(data)
    }
    return data;
}

module.exports = {
    passwordRecoveryService
}