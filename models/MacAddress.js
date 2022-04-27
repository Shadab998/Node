const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const macAddressSchema = Schema({
    macAddress: [
        {
            type: String,
            required: true
        }
    ],
});

module.exports = mongoose.model('MacAddress', macAddressSchema);
