const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let postsSchema = new Schema({
    body: {
        type: String
    },
    likecount: {
        type: Number
    },
    commentcount: {
        type: Number
    },
    userid: {
        type: String
    },
    imageid: {
        type: String
    },
    status: {
        type: Boolean
    }
}, {
    timestamps: true,
});


module.exports = mongoose.model('Posts', postsSchema);