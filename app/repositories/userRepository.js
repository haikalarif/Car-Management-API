const { typeusers, users } = require('../models')

module.exports = {
    find(email) {
        return users.findOne(email)
    },

    findAll() {
        return users.findAll()
    },

    findId(id) {
        return users.findByPk(id)
    },

    getByEmail(email) {
        return users.findOne({
            where: {
                email,
            },
        })
    },

    findMember() {
        return users.findAll(
            {
                where: {
                    idtype: 3
                }
            }
        );
    },

    findAllAdmin() {
        return users.findAll(
            {
                where: {
                    idtype: 2
                }
            }
        );
    },
    
    create(user) {
        return users.create({
            email: user.email,
            password: user.password,
            idtype: user.idtype,
            createdAt: new Date(),
            updatedAt: new Date(),
        })
    },
    
    
    update(id, updateArgs) {
        return users.update(updateArgs, {
            where: {
                id,
            },
        })
    },
    
    delete(id) {
        return users.destroy({ where: { id } })
    },

    // Create type user
    // createType(createArgs) {
    //     return typeusers.create(createArgs)
    // },
}