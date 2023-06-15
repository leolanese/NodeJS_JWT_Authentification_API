import asyncHandler from 'express-async-handler';
import generateToken from '../shared/generateToken.js';
import UserModel from '../model/models.js'

const registerUser = asyncHandler( async (req, res) => {
    const { name, email, password } = req.body;

    const userExist = await UserModel.findOne({email})

    if(userExist){
        res.status(400).json({
            success: false,
            message: 'User already exists'
        })
    } else{
        const user = await UserModel.create({ name, email, password})
        if(user){
            res.status(201).json({
                success: true,
                message: 'User has created',
                user: user,
                token: generateToken(user._id)
            })
        }else{
            res.status(400).json({
                success: false,
                message: 'Something went wrong'
            })
        }
    }
})


const loginUser = asyncHandler( async (req, res) => {
    const { email, password } = req.body;

    const userExist = await UserModel.findOne({email})

    if(userExist && await userExist.matchPassword(password)){
        res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            email: email,
            token: generateToken(userExist._id)
        })
    } else{
        res.status(400).json({
            success: false,
            message: 'Invalid user/password'
        })
    }
});

const dashboard = asyncHandler(async (req, res) => {
    res.send('Dashboard')
})


export {
    registerUser,
    loginUser,
    dashboard
}