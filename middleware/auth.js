const jwt = require('jsonwebtoken')
const express = require('express')
const dotenv = require('dotenv')
const app = express()
dotenv.config();
const StudentModel = require('../src/students/studentModel')

const GenerateToken =(email)=>{
    return jwt.sign({email},process.env.SECRET_KEY,{
        expiresIn:'1h'
    })
}

var Authentication = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);
    
    jwt.verify(token,process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            console.error('Error verifying token:', err);
            return res.sendStatus(403); // Send forbidden status for invalid token
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

module.exports ={Authentication,GenerateToken,VerifyTokenHandler};