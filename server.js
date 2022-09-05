const express = require('express');
const { logger } = require('./middleware/logEvents')
const  errorHandler  = require('./middleware/errorHandler')
const app = express();
const cors = require('cors');
const corsOptions = require('./configFile/corsOptions');
const path = require('path');
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials')
const PORT = process.env.PORT || 3500;

  
//Custom middleware logger
app.use(logger);

//Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

//Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded data form data
app.use(express.urlencoded({ extended: false }));

//built-in midddleware for json
app.use(express.json());

//middleware for cookies
app.use(cookieParser())

//server static files
app.use('/', express.static(path.join(__dirname, '/public')));

//Routes
app.use('/', require('./Routes/root'));
app.use('/register', require('./Routes/register'));
app.use('/auth', require('./Routes/auth'));
app.use('/refresh', require('./Routes/refresh'));
app.use('/logout', require('./Routes/logout'));

app.use(verifyJWT);
app.use('/employees', require('./Routes/api/employees'));


// Route handlers
/* app.get('/hello(.html)?', (req, res, next) => {
    console.log('attempted to load hello.html');
    next()
}, (req,res) => {
    res.send('Hello world')
})

const one = (req, res, next) =>{
    console.log('one')
    next()
}
const two = (req, res, next) =>{
    console.log('two')
    next()
}
const three = (req, res, next) =>{
    console.log('three')
    res.send('Finished')
}
app.get('/chain(.html)?', [one, two, three]) */

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'Views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ error: '404 Not Found'});
    } else {
        res.type('txt').send("404 Not Found");
    }
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`server is running on this port ${PORT}`))