import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../model/models.js';

// Verify and extract user information from JWT token
const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        console.error('Error verifying JWT token:', error);
        return null;
    }
}

// Protect routes with JWT authentication
const protect = asyncHandler(async(req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('JWT')) {
        token = req.headers.authorization.split(' ')[1];
    }

    // Check if token exists
    if (!token) {
        return res.status(401).json({ success: false, message: 'Not authorized, no token' });
    }

    // Verify the token
    const decoded = verifyToken(token);

    if (!decoded) {
        return res.status(401).json({ success: false, message: 'Not authorized, invalid token' });
    }

    try {
        // Attach user to the request object
        req.user = await User.findById(decoded.id).select('-password');
        next();
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ success: false, message: 'Something went wrong!' });
    }
});

export default protect;
