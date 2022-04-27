const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
    username: {
        type: String,
        required: true,
        unique: true,
		trim:true
    },
    status: {
        type: Number,
        default: 1
    },
	email: {
		type: String,
		unique: true,
		trim:true
	}
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
