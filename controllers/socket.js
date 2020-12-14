const User = require('../models/user');
const Message = require('../models/message');
var connected = [];

const connectedUser = async (uid = "") => {
    const user = await User.findById(uid);
    if (user != null && connected.indexOf(uid) === -1) {
        user.online = true;
        user.save();
        connected.push(uid);
    }
    console.log(connected);
};

const disConnectedUser = async (uid = "") => {
    const user = await User.findById(uid);
    user.online = false;
    user.save();
    connected = connected.filter((connectedUid) => {
        if (connectedUid !== uid) {
            return connectedUid;
        }
    });

    console.log(connected);

};

const saveMessage = async (payload) => {
    try {
        const message = new Message(payload);
        await message.save();
        return true;
    } catch (error) {
        return false;
    }
}

module.exports = {
    connectedUser,
    disConnectedUser,
    saveMessage
}