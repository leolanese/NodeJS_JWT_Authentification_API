import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler'
import User from '../model/models.js'

const protect = asyncHandler( async(req, res, next) => {
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            let token = req.headers.authorization.split(' ')[1];
            console.log(token);
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password')
            next();
        } catch (error) {
            console.log(error);
            res.status('500').json({sucess:false, message: 'Something went wrong!!'})
        }
    } else{
        res.status('400').json({sucess:false, message: 'Not Authorized'})
    }
})

export default protect
