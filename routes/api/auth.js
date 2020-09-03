const express = require('express');
const router = express.Router()
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const auth = require('../../middleware/auth')

// Item Model
const User = require('../../models/User');

// @route POST api/auth
// @desc Authenticate User Login
// @access Public
router.post('/', (req, res) => {
    // Sets what to expect in the body
   const { email, password } = req.body

   // Simple validation - return err saying enter all fields if name, email and or password fields are empty
   if(!email || !password) {
       return res.status(400).json({ msg: 'Please enter all fields'})
   }

   // Check for existing user - findOne is a mongo filter, if the document does not exist return error saying so
   User.findOne({ email })
   .then(user => {
       if(!user) return res.status(400).json({ msg: 'User does not exist'})

       // Validate user password
        bcrypt.compare(password, user.password)
            .then( isMatch => {
                if(!isMatch) return res.status(400).json({ msg: 'Invalid login details'})
                
                jwt.sign(
                    { id: user.id },
                    config.get('jwtSecret'),
                    { expiresIn: 3600 },
                    (err, token) => {
                        if(err) throw err
                        res.json({
                            token,
                            user: {
                                id: user.id,
                                name: user.name,
                                email: user.email
                            }
                        })
                    }
                    
                    )
            })
   })
});

// @route GET api/auth/user
// @desc Get user data
// @access Private
router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user))
})

module.exports = router