const { Schema, model, default: mongoose } = require('mongoose');

const cocktailSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  ingredients: {
    type: String
  },
  instructions: {
    type: String
  },
  image: {
    type: String,
    default: "placeholder.png"
  },
  rating: {
    type: mongoose.Types.Decimal128,
    default: 3.5
  },
  views: {
    type: Number,
    default: 0
  }
});

const Cocktails = model('Cocktails', cocktailSchema);

module.exports = Cocktails;
