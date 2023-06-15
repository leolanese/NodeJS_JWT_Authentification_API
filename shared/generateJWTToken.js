import jwt from 'jsonwebtoken';

const generateJWTToken = (id)  => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '180d'
    })
}

export default generateJWTToken;