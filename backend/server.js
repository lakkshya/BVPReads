require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bookRoutes = require('./routes/books');
const userRoutes = require('./routes/users');
const bagbookRoutes = require('./routes/bagbooks');

//express app
const app = express();

//middleware
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

//routes
app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);
app.use('/api/bagbooks', bagbookRoutes);

//connect to db
mongoose.connect(process.env.MONGO_URI, { dbName: 'BVICAM' })
    .then(() => {
        //listen for requests
        app.listen(process.env.PORT, () => {
            console.log("connected to db & listening on port", process.env.PORT);
        });
    })
    .catch((error) => {
        console.log("error connecting to the db", error);
    });