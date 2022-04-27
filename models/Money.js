const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const moneySchema = Schema({
	total_sent: {
		type: Number,
		unique: false,
		default: 0
	},
	
}, { timestamps: true });

module.exports = mongoose.model('Money', moneySchema);