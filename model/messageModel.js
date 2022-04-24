const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messagesSchema = new Schema({
    conversationId: { type: mongoose.Types.ObjectId, ref: 'convaersations' },
    senderId: { type: mongoose.Types.ObjectId, ref: 'users' },
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model('messages', messagesSchema);
