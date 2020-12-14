const Message = require("../models/message")

const getChatMessages = async (req, res) => {
    const userTo = req.uid;
    const userFrom = req.params.from;
    let messages = await Message.find({
        $or: [{
            userFrom,
            userTo
        }, {
            userFrom: userTo,
            userTo: userFrom
        }]

    }).sort({ createdAt: 'desc' }).limit(30);

    res.json({
        ok: true,
        messages
    });

}

module.exports = { getChatMessages }