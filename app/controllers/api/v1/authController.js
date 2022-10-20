const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const userService = require('../../../services/userService')

// function create token
function createToken(payload) {
    return jwt.sign(payload, process.env.JWT_SIGNATURE_KEY || 'secret', {
        expiresIn: 10 * 60,
    })
}

module.exports = {
    async registrasi(req, res) {
        const existedUser = await userService.findByEmail(req.body.email)
        if (existedUser) {
            return res.status(400).send({
                message: 'Email is used before',
            })
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const defaultRoles = 3
        const user = {
            email: req.body.email,
            password: hashedPassword,
            idtype: defaultRoles,
            createdAt: new Date(),
            updatedAt: new Date(),
        }
        try {
            const users =  await userService.create(user)
            res.status(201).json({
                message: 'Registrasi Successfully',
                data: [{email:users.email, idtype: users.idtype,createdAt:users.createdAt,updatedAt:users.updatedAt}],
            })
        } catch (error) {
            res.status(400).send(error)
        }
    },

    //function login
    async login(req, res) {
        const email = req.body.email.toLowerCase()

        // check email exits in database or not
        const user = await userService.findByEmail(email)
        if (!user) {
            res.status(404).json({ message: 'Email tidak ditemukan' })
            return
        }

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({
                message: 'Password Wrong!'
            })
        }

        // create token
        const token = createToken({
            id: user.id,
            email: user.email,
            role: user.idtype,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        })

        res.status(201).json({
            id: user.id,
            email: req.body.email,
            token,
            role: user.idtype,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        })
    },

    // authorize user
    authorize: (...roles) => async (req, res, next) => {
        try {
            const bearerToken = req.headers.authorization
            const token =  bearerToken.split('Bearer ')[1]
            const tokenPayload = jwt.verify(
                token,
                process.env.JWT_SIGNATURE_KEY || 'secret',
            )

            req.user = await userService.find(tokenPayload.id)

            if (roles.length > 0) {
                if (!roles.includes(req.user.idtype)) {
                    res.status(401).json({
                        message: 'Unauthorized - Anda tidak memiliki akses'
                    })
                    return
                }
            }

            next()
        } catch (error) {
            if (error.message.includes('jwt expired')) {
                res.status(401).json({ message: 'Token is Expired' })
                return
            }

            res.status(401).json({
                message: 'Unauthorized',
            })
        }
    },

    // check current user
    async whoAmI(req, res) {
        let role = ''
        if (req.user.idtype === 1) {
            role = 'Super Admin'
        } else if (req.user.idtype === 2) {
            role = 'Admin'
        } else if (req.user.idtype === 3) {
            role = 'Member'
        }
        res.status(201).json({
            data: { id: req.user.id, email: req.user.email },
            desc: `Anda adalah ${role}`,
        })
    },
}