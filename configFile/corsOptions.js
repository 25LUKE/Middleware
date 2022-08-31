
//Cross origin Resource Sharing (CORS)...Third-party middleware
const whitelist = [
    'https://www.ourlist.com',
    'http://127.0.0.1:8080',
    'http://localhost:3500'
];

const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null,true)
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
}
    
    module.exports = corsOptions;
