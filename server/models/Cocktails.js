const { Schema, model, default: mongoose } = require("mongoose");

const cocktailSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    ingredients: {
      type: String,
      required: true
    },
    instructions: {
      type: String,
      required: true
    },
    image: {
      type: String,
      default: "placeholder.png",
    },
    rating: [
      {
        email: { type: String, unique: true, sparse: true },
        value: Number,
      },
    ],
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Calculate average rating for each drink
cocktailSchema.virtual("avgRating").get(function () {
  // Function that will be passed to map to get all the rating values
  mapFunction = (ratingItem) => ratingItem.value;
  const ratingArray = this.rating.map(mapFunction);
  // Check if there's anything in the array
  if (ratingArray.length) {
    // If there is, return the mean (sum elements then divide by total elements)
    return ratingArray.reduce((a, b) => a + b) / ratingArray.length;
  }
  // Otherwise default to 0
  else {
    return 0
  }
});

const Cocktails = model("Cocktails", cocktailSchema);

// const test = new Cocktails({
//   name: "Old-fashioned2",
//   ingredients: "bourbon, bitters, simple syrup, orange peel",
//   instructions:
//     "Large ice cube in glass, stir ingredients for 30 seconds, twist peel",
//   rating: [
//     { email: "j@test.com", value: 5 },
//     { email: "r@test.com", value: 4 },
//     { email: "f@test.com", value: 3 },
//   ],
// });

// test.avgRating;

// console.log(test.avgRating);

module.exports = Cocktails;
