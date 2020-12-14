const { Schema, model } = require('mongoose');

const MessageSchema = Schema({
    userFrom: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    userTo: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    msg: {
        type: String,
        require: true
    },
}, {
    timestamps: true
});

module.exports = model('Message', MessageSchema);