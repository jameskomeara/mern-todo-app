const express = require("express");
const mongoose = require("mongoose");
const users = require('./routes/api/users');
const items = require('./routes/api/items');
const auth = require('./routes/api/auth');
const path = require('path')
const config = require('config')


const app = express();

// Bodyparser Middleware
app.use(express.json());

// DB Config - allows to pull data from config/default 
const db = config.get('mongouri'); 

// Connect to Mongo
mongoose.connect(db, {
    useNewUrlParser:true, 
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));

// Use Routes
app.use('/api/items', items);
app.use('/api/users', users)
app.use('/api/auth', auth)


// Serve static assets if in production
if(process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));

