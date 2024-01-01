const { v4: uuidv4 } = require("uuid");
const {validationResult} = require('express-validator')

const HttpError = require('../models/http-error')

const DUMMY_USERS = [
    {
        id: 'u1',
        name: "Subham Prasad",
        email: 'subo@gmail.com',
        password: 'tester@123'
    }
]



const getUsers = (req, res, next) => {
    res.json({users: DUMMY_USERS})
};

const signup = (req, res, next) => {
    const {name, email, password} = req.body

    const error = validationResult(req)

    if(error){
        throw new HttpError('Invalid Input',401)
    }

    const hasUser = DUMMY_USERS.find(u => u.email === email)
    if(hasUser){
        throw new HttpError('Could not create user, email already exist', 422)  
    }
    const createdUser = {
        id: uuidv4(),
        name, //name: name
        email, 
        password
    }

    DUMMY_USERS.push(createdUser)

    res.status(201).json({user: createdUser})
};
const login = (req, res, next) => {
    const { email, password} = req.body;


    const identifiedUser = DUMMY_USERS.find(u => u.email === email);
    if(!identifiedUser || identifiedUser.password !==password){
        throw new HttpError('Could not identify user, crentials seem to be wrong', 401)
    }

    res.json({message: 'Logged in!'})

};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
