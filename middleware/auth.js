const jwt = require('jsonwebtoken')
const express = require('express')
const dotenv = require('dotenv')
const app = express()
dotenv.config();

const GenerateToken =(email)=>{
    return jwt.sign({email},process.env.SECRET_KEY,{
        expiresIn:'1d'
    })
}

var Authentication = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);
    
    jwt.verify(token,process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            console.error('Error verifying token:', err);
            return res.sendStatus(401); // Send unauthorized status for invalid token
        }
        req.user = decoded; // Attach user information to request object
        next();
    });
};

const VerifyTokenHandler = (req,res)=>{
    const userDetails = req.user;
    res.status(200).json({
        success: true,
        message: 'Token verified successfully',
        user: userDetails
    });
}

const RoleCheck = () => {
    return (req, res, next) => {
        const { Role } = req.body;

        if (Role === 'Student' || Role === 'Teacher') {
            next();
        } else {
            return res.status(403).json({ message: 'Forbidden: Unauthorized role' });
        }
    };
};

module.exports ={Authentication,GenerateToken,VerifyTokenHandler,RoleCheck};