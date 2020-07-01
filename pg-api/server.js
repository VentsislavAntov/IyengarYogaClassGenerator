let express = require('express');
let bodyParser = require('body-parser');
let morgan = require('morgan');
let pg = require('pg');
const PORT = 3000;

//gives access to pooling resource - checks how many connections are open
//maximum of 15 connections
let pool = new pg.Pool({
    user: 'postgres',
    database: 'exercises',
    password: 'postgres',
    host: 'localhost',
    port: 5432,
    max: 15
});

// working query from database
// pool.connect((err, db, done) => {
//     if (err) {
//         return console.log(err);
//     } else {
//         db.query('SELECT * from exercise', (err, table) => {
//             done();
//             if(err) {
//                 return console.log(err)
//             }
//             else{
//                 console.log(table.rows)
//             }
//         })
//     }
// })

//application instantiation
let app = express();

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//morgan used for logging
app.use(morgan('dev'));

//CORS on ExpressJS - request from Client side to Postgres/Express API
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

app.post("/api/new_exercise", function(request, response){
    console.log(request.body);
})

app.listen(PORT, () => console.log('Listening...'));