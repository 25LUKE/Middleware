const express = require('express');
const { logger } = require('./middleware/logEvents')
const app = express();
const cors = require('cors');
const path = require('path');
const PORT = process.env.PORT || 3060;


//Custom middleware logger
app.use(logger);

//Cross origin Resource Sharing
const whitelist = ['http://www.oursite.com', 'http://127.0.0.1:5500', 'http://localhost:3060'];
    const corsOptions = {
        origin: (origin, callback) => {
            if (whitelist.indexOf(origin)!== -1) {
                callback(null,true)
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        optionsSuccessStatus: 200
    }
app.use(cors(corsOptions))

// built-in middleware to handle urlencoded data
app.use(express.urlencoded({ extended: false }));

//built-in midddleware for json
app.use(express.json());

//server static files
app.use(express.static(path.join(__dirname, '/public')));

//Route
app.get('^/$|/index(.html)?', (req, res) =>{
    /* res.sendFile('./Views/index.html', { root: __dirname}); */
    res.sendFile(path.join(__dirname, 'Views', 'index.html'));
});
app.get('/new-page(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'Views', 'new-page.html'));
});
app.get('/old-page(.html)?', (req, res) => {
    res.redirect(301,'/new-page.html'); //302 by default
});

// Route handlers
app.get('/hello(.html)?', (req, res, next) => {
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

app.get('/chain(.html)?', [one, two, three])

app.get('/*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'Views', '404.html'));
});

app.listen(PORT, () => console.log(`server is running on this port ${PORT}`))