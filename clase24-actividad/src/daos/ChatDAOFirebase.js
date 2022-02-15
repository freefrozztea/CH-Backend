const FirebaseContainer = require("../contenedores/ContenedorFirebase")

class ChatDaoFirebase extends FirebaseContainer {

    constructor() {
        super('chats')
    }
}

module.exports = ChatDaoFirebase;