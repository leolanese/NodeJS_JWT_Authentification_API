import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler'
import User from '../model/models.js'

const protect = asyncHandler( async(req, res, next) => {
    if(req.headers.authorization && req.headers.authorization.startsWith('Leo')){
        try {
            let token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.id).select('-password')
            next();
        } catch (error) {
            console.error(error);
            res.status(500).json({success: false, message: 'Something went wrong!!'})
        }
    } else{
        res.status(400).json({success: false, message: 'Not Authorized'})
    }
})

export default protect
