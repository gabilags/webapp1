const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personSchema = new Schema({
   fullname: {
       type: String,
       required: true
   },
   nationality: {
        type: String,
        required: true
    },
    birthday: {
        type: String,
        required: true
    }
}, {timestamps: true});

const Person = mongoose.model('person', personSchema);
module.exports = Person;