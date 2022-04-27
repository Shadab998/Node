const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = Schema({
    to: {
        type: String,
        trim:true,
		unique:false
    },
	amount: {
		type: Number,
		trim:true,
		unique:false
	}

}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);