const express = require("express");
const {check} = require('express-validator')
const usersControllers = require('../controllers/users-controller')

const router = express.Router();



router.get("/",usersControllers.getUsers);

router.post("/signup",
[check('name').not().isEmpty(),
check('email').normalizeEmail().isEmail(), // Normalize => TEST@gmail.com = test@gmail.com
check('password').isLength({min: 6})],
usersControllers.signup);

router.post('/login',usersControllers.login)


module.exports = router;
