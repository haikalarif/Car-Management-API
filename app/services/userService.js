const userRepository = require('../repositories/userRepository')

module.exports = {
    get(email) {
        return userRepository.find(email)
    },

    findAll() {
        return userRepository.findAll()
    },

    find(id) {
        return userRepository.findId(id)
    },

    findByEmail(email) {
        return userRepository.getByEmail(email)
    },

    listMember() {
        return userRepository.findMember();
    },

    listAdmin() {
        return userRepository.findAllAdmin();
    },

    create(user) {
        return userRepository.create(user)
    },

    
    update(id, requestBody) {
        return userRepository.update(id, requestBody)
    },
    
    delete(id) {
        return userRepository.delete(id)
    },

    // createType(requestBody) {
    //     return userRepository.createType(requestBody)
    // },
}