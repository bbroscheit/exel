const express = require ('express');
const cookieParser = require('cookie-parser');
const bodyParser = require ('body-parser');
const morgan = require('morgan');
let cors = require('cors');
const cron = require('node-cron');

require('./bd.js')

// se cargan las rutas 
const articleRouter = require ('../src/routes/articleRouter.js')

// usamos cron para marcar cuando queremos que se ejecute la tarea programada
// cron.schedule('0 10 * * *', () => {
//     console.log('Ejecutando tarea programada todos los dias a las 7 de la mañana');
//     closeTicketByTime();
//   });


const server = express();
server.name = 'API';

server.use(bodyParser.urlencoded({ extended:true, limit: '50mb'}));
server.use(bodyParser.json({limit: '50mb'}));
server.use(cookieParser());
server.use(morgan('dev'))
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Cache-Control', 'no-store');
    console.log(`Solicitud recibida: ${req.method} ${req.url}`);

    if (req.method === 'OPTIONS') {
        console.log('Respondiendo a solicitud OPTIONS');
        res.sendStatus(200);
    } else {
        next();
    }
});

server.use(express.json());
server.use(cors());

// llamamos a los diferentes Routers
server.use('/' , articleRouter);


server.use((err,req,res) => {
    const status = err.status || 500;
    const message = err.message || err;
    console.log(err);
    res.status (status).send(message)
})

module.exports = server;

