const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const donateSchema = Schema({
    title: {
        type: String,
        required: true
    },
    total_amount: {
        type: Number,
        required: true
    },
    added_amount: {
        type: Number,
        default: 0
    },
    last_amount: {
        type: Number,
        default: 0
    },
    people: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        default: 'Open'
    },
    closingDate: {
        type: Date,
        required: true
    },
    // notify: {
    //     type: String,
    //     default: 0
    // }
}, { timestamps: true });

module.exports = mongoose.model('Donate', donateSchema);
