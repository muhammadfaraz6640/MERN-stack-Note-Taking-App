const mongoose = require('mongoose');

const Schema = mongoose.Schema;  //everything in mongoose starts with schema which is data structure

const userSchema = new Schema({
  username: {     //only one feild i-e username
    type: String,
    required: true,
    unique: true,    //these are the properties for username
    trim: true,
    minlength: 3
  },
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;