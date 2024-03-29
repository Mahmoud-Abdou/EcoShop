import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

//@desc User Auth 
//@route POST /api/users/login
//@access Public
const userLogin = asyncHandler(async(req, res) => {
    const { email, password } = req.body
    
    const user = await User.findOne( { email } )

    if (user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    }else{
        res.status(401)
        throw new Error('Invalid email or password')
    }
})

//@desc User Profile 
//@route GET /api/users/profile
//@access Private
const userProfile = asyncHandler(async(req, res) => {
    
    const user = await User.findById(req.user._id)

    if (user){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    }else{
        res.status(401)
        throw new Error('Invalid email or password')
    }
})

//@desc Update User Profile 
//@route PUT /api/users/profile
//@access Private
const updateUserProfile = asyncHandler(async(req, res) => {
    
    const user = await User.findById(req.user._id)
    if(user){
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if (req.body.password)
            user.password = req.body.password
    }
    const updatedUser = await user.save()

    if (updatedUser){
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(user._id)
        })
    }else{
        res.status(401)
        throw new Error('Invalid email or password')
    }
})


//@desc User Regestration 
//@route POST /api/users
//@access Public
const userRegestration = asyncHandler(async(req, res) => {
    const { name, email, password } = req.body

    const userExist = await User.findOne( { email } )

    if (userExist){
        res.status(400)
        throw new Error('Email Already Exist')
    }

    const user = await User.create({
        name,
        email,
        password
    })

    if (user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    }else{
        res.status(401)
        throw new Error('Invalid email or password')
    }
})


export { userLogin, userProfile, userRegestration, updateUserProfile }