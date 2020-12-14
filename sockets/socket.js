const { io } = require('../index');
const { checkJWT } = require('../helpers/jwt');
const { connectedUser, disConnectedUser, saveMessage } = require('../controllers/socket');


// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');

    const [valido, uid] = checkJWT(client.handshake.headers['x-token'])

    if (!valido) { return client.disconnect() }
    connectedUser(uid);

    client.join(uid);


    client.on('msg-user', async (payload) => {
        console.log(payload);
        await saveMessage(payload);
        io.to(payload.userTo).emit('msg-user', payload);
    });

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
        disConnectedUser(uid);
    });



});
