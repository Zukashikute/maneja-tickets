const db = require('../models');
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
require("dotenv").config()
const Users = db.users;

const createAccount = async (req, res) => {
    let hashedPassword
    try{
    // Regular password and cost (salt is generated automatically)
    hashedPassword = await bcrypt.hashSync(req.body.password, 10)
    } catch (error) {
    console.log(error)
    }
    const users = new Users({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
    jobPosition: req.body.jobPosition,
    })
    await users.save().then((data) => {
    console.log(data)
    res.status(201).send(data);
    })
    .catch((err) => {
    res.status(500).send({
    message: err.message || 'Some error occurred while creating user.'
    })
    })
}

const userLogin = async (req, res) => {
const { email, password } = req.body;
if(!email || !password) {
res.status(400);
throw new Error('All fields are mandatory!')   
}
const user = await Users.findOne({ email });
try {
if(user && (await bcrypt.compare(password, user.password))){
    delete user.password
    const accessToken = jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 3600 * 1000 })
    res.cookie("jwt", accessToken, { httpOnly: true, maxAge: 3600 * 1000 })
    console.log(`User ${email} logged in!`)
    return res.redirect("/")
} else {
res.send("Email or password is not valid");    
}
} catch (error) {
res.status(401)
throw new Error(error);
}
}

const userLogout = async (req, res) => {
res.clearCookie("jwt");
req.logOut();
console.log('Success! User logged out.');
return res.redirect('/')
}

module.exports = { createAccount, userLogin, userLogout }