const { Schema, model } = require('mongoose');
const Cocktails = require('./Cocktails')

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  //! Need to encrypt for login
  password: {
    type: String,
    required: true
  },
  // Array of cocktails for saved drinks
  cocktails: [
    {
    type: Schema.Types.ObjectId,
    ref: 'Cocktails',

  }
],
});

const Users = model('Users', userSchema);

module.exports = Users;
