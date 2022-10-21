const userService = require('../../../services/userService')
const bcrypt = require('bcrypt')
const { typeusers } = require("../../../models");


const listAllRoles = async (req, res) => {
    typeusers.findAll({attributes:['id','type']})
    .then((role) => {
        res.status(200).json({
            status: "List All Roles",
            role,
        })
    })
    .catch((err) => {
        res.status(400).json({
            status: "FAIL",
            message: err.message
        })
    })
}
// List All User
const listAllUsers = async (req, res) => {
    userService.findAll()
    .then((data) => {
        res.status(200).json({
            status: "OK",
            data,
        });
    })
    .catch((err) => {
        res.status(400).json({
            status: "FAIL",
            message: err.message,
        })
    })
}

// Check All List Admin
const listAdmin = async (req, res) => {
    userService.listAdmin()
    .then((data) => {
        res.status(200).json({
            status: "OK",
            data
        });
    })
    .catch((err) => {
        res.status(400).json({
            status: "FAIL",
            message: err.message,
        })
    })
}

// Check All List Member
const listMember = async (req, res) => {
    userService.listMember(req.params.id)
    .then((data) => {
        res.status(200).json({
            status: "OK",
            data
        });
    })
    .catch((err) => {
        res.status(400).json({
            status: "FAIL",
            message: err.message,
        })
    })
}

// Create Admin
const createAdmin = async (req, res) => {
    const existedUser = await userService.findByEmail(req.body.email)
    if (existedUser) {
        return res.status(400).send({
            message: 'Email is used before',
        })
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = {
        email: req.body.email,
        password: hashedPassword,
        idtype: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
    }
    try {
        const users =  await userService.create(user)
        res.status(201).json({
            message: 'Admin Created Successfully',
            data: [{email:users.email, idtype: users.idtype,createdAt:users.createdAt,updatedAt:users.updatedAt}],
        })
    } catch (error) {
        res.status(400).send(error)
    }
}

// Update Admin
// const updateAdmin = async (req, res) => {
//     const existedUser = await userService.findByEmail(req.body.email)
//     if (existedUser) {
//         return res.status(400).send({
//             message: 'Email is used before',
//         })
//     }
//     // const hashedPassword = await bcrypt.hash(req.body.password, 10)
//     try {
//         const user = await userService.find(req.params.id);
//             if (!user) {
//                 res.status(404).json({
//                     status: "FAIL",
//                     message: "User not found",
//                 });
//                 return
//             }
//         await userService.update(req.params.id, {
//             email: req.body.email,
//             idtype: 2,
//             createdAt: new Date(),
//             updatedAt: new Date(),
//         })
//         res.status(201).json({
//             message: 'User Updated Successfully'
//         })
//     } catch (error) {
//         res.status(400).send(error)
//     }
// }

// Delete Admin
// const deleteAdmin = async (req, res) => {
//     try {
//         const user = await userService.find(req.params.id);
//         if (!user) {
//             res.status(404).json({
//                 status: "FAIL",
//                 message: "User not found",
//             });
//             return;
//         }
//         await userService.delete(req.params.id);
//         res.status(200).json({
//             status: "OK",
//             message: "User Deleted Successfully",
//         });
//     } catch (error) {
//         res.status(422).json({
//             status: "FAIL",
//             message: error.message,
//         });
//     }
// }

module.exports = {
    // Temporary insert typeuser
    async createType(req, res) {
        try {
            const typeUser = await userService.createType(req.body)
            res.status(200).json(typeUser)
        } catch (error) {
            res.status(422).json({
                status: 'FAIL',
                message: 'Role Failed Created',
            })
        }
    },
    listAllRoles,
    listAdmin,
    listMember,
    createAdmin,
    listAllUsers,
    // updateAdmin,
    // deleteAdmin,
}