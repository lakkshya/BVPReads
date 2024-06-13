const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bagbookSchema = new Schema({
    bookId: {
        type: Schema.Types.ObjectId, 
        ref: 'Books',
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    checkedout: {
        type: Boolean
    }
}, {timestamps: true});

module.exports = mongoose.model('BagBooks', bagbookSchema);