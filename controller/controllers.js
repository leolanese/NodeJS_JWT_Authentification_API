import asyncHandler from 'express-async-handler';
import generateJWTToken from '../shared/generateJWTToken.js';
import UserModel from '../model/models.js';

// Register a new user
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
        res.status(400).json({
            success: false,
            message: 'User already exists'
        });
    } else {
        const user = await UserModel.create({ name, email, password });

        if (user) {
            res.status(201).json({
                success: true,
                message: 'User has been created',
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email
                },
                token: generateJWTToken(user._id)
            });
        } else {
            res.status(400).json({
                success: false,
                message: 'Error in creating user'
            });
        }
    }
});

// User login
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const userModel = await UserModel.findOne({ email });

    if (userModel && await userModel.matchPassword(password)) {
        res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            user: {
                id: userModel._id,
                name: userModel.name,
                email: userModel.email
            },
            token: generateJWTToken(userModel._id)
        });
    } else {
        res.status(401).json({
            success: false,
            message: 'Invalid email/password'
        });
    }
});

// Get the private user account info
const account = asyncHandler(async (req, res) => {
    const user = await UserModel.findById(req.user.id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

export {
    registerUser,
    loginUser,
    account
};
