import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import expressAsyncHandler from 'express-async-handler'

const protect = expressAsyncHandler( async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1]

            const deacode = jwt.verify(token, process.env.JWT_SECRET)

            req.user = await User.findById(deacode.id).select('-password')
            console.log(deacode)
            next()
        } catch (error) {
            console.error(error)
            res.status(401)
            throw new Error('Not Authorized, token faild')
        }
    }
    if (!token){
        res.status(401)
        throw new Error('Not Authrized, No Token')
    }
}) 

export default protect
