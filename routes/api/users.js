const express = require('express');
const router = express.Router()
const bcrypt = require('bcryptjs')

// Item Model
const User = require('../../models/User');

// @route POST api/user
// @desc Register new user
// @access Public
router.post('/', (req, res) => {
    // Sets what to expect in the body
   const { name, email, password } = req.body

   // Simple validation - return err saying enter all fields if name, email and or password fields are empty
   if(!name || !email || !password) {
       return res.status(400).json({ msg: 'Please enter all fields'})
   }

   // Check for existing user - findOne is a mongo filter, if the document exists return error saying so
   User.findOne({ email })
   .then(user => {
       if(user) return res.status(400).json({ msg: 'User already exists'})

       // Create new user object with uder User model for mongodb 
       const newUser = new User({
           name,
           email,
           password
       })

       // Create salt and hash
       // Salt is one way data that is used to further encypt data / passwords
       // Hashing data is changing it to another form that is used to store on the server without the server actually knowing what the password is
       // 10 is the standard level of 'salt'
       bcrypt.genSalt(10, (err, salt) => {
           bcrypt.hash(newUser.password, salt, (err, hash) => {
               if(err) throw err
               newUser.password = hash
               newUser.save()
               .then(user => {
                   res.json({
                       user: {
                           id: user.id,
                           name: user.name,
                           email: user.email
                       }
                   })
               })
           })
       } )
   })
});

module.exports = router