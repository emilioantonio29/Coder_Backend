const {passwordRecoveryDbMongo} = require("../daos/dao/mongoDb")

const passwordRecoveryService = async (mail) => {
    let data = await passwordRecoveryDbMongo(mail)
    return data;
}

module.exports = {
    passwordRecoveryService
}