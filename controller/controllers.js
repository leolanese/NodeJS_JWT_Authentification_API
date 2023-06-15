import asyncHandler from 'express-async-handler';
import generateJWTToken from '../shared/generateJWTToken.js';
import UserModel from '../model/models.js'

const registerUser = asyncHandler( async (req, res) => {
    const { name, email, password } = req.body;

    const userModel = await UserModel.findOne({email})

    if(userModel){
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
                token: generateJWTToken(user._id)
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

    const userModel = await UserModel.findOne({email})

    if(userModel && await userModel.matchPassword(password)){
        res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            email: email,
            token: generateJWTToken(userModel._id)
        })
    } else{
        res.status(400).json({
            success: false,
            message: 'Invalid user/password'
        })
    }
});

const account = asyncHandler(async (req, res) => {
    res.send('Private Account Section - Registered Users Only')
})

export {
    registerUser,
    loginUser,
    account
}