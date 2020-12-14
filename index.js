const express = require('express');
const path = require('path');
require('dotenv').config();

require('./database/config').dbConnection();

// App de Express
const app = express();

//lectura de body http
app.use(
    '/',
    express.json()
);

//routes
app.use('/api', require('./routes/routes'));

// Node Server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');




// Path público
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));





server.listen(process.env.PORT, (err) => {

    if (err) throw new Error(err);

    console.log('Servidor corriendo en puerto', process.env.PORT);

});


