const { Users, Cocktails } = require('../models');

const resolvers = {
  Query: {
    //Get all users, users by email, name or by ID
    users: async () => {
      return Users.find({}).populate('cocktails');
    },
    user: async (parent, { name } ) => {
      return Users.findOne( { name: name } ).populate("cocktails");
    },
    userID: async (parent, { _id } ) => {
      return Users.findOne({_id: _id}).populate('cocktails');
    },
    userEmail: async (parents, {email}) => {
      return Users.findOne({email: email}).populate("cocktails");
    },
    // get all cocktails, cocktails by name, or by ingredient
    cocktails: async() => {
      return Cocktails.find({});
    },
    cocktail: async (parent, { name }) => {
      return Cocktails.findOne({name: name});
    },
    cocktailByIng: async (parent, {string}) => {
      return Cocktails.find(
        {"ingredients": {"$regex": string}}
      )
    },
    // get the aray of ratings for a cocktail
    cocktailRating: async (parent, {name} ) => {
      return Cocktails.findOne({name: name}).select('name rating')
    }
  },
  Mutation: {
    //Create a user. Required args are name, email, password
    createUser: async (parent, args) => {
      const user = await Users.create(args);
      return user;
    },
    //Create a cocktail. For user uploads. Required args are name, ingredients, instructions
    createCocktail: async(parent, args) => {
      const cocktail = await Cocktails.create(args);
      return cocktail;
    },

    // Mutation to allow a user to save a cocktail given the name of the cocktail and their email
    saveCocktail: async (parent, { email, cocktails }) => {
      // Accepts a CocktailInput object called cocktails like this: { name }
      // Then finds cocktail where the name matches the name value inside said object
      const saveCocktail = await Cocktails.findOne({name: cocktails.name});
      // Next find a user by their email
      const userUpdate = await Users.findOne({ email: email })
      // Push the ID of the previously found cocktail onto the user's cocktails array
      userUpdate.cocktails.push(saveCocktail._id)
      // Save this user to update the database
      const savedUser = await userUpdate.save()
      return savedUser;
    },
    // Same as above, except the cocktails object looks like this: { _id }
    // ID can be pushed directly to the user instead of finding it--came from front end
    saveCocktailID: async (parent, { email, cocktails }) => {
      const userUpdate = await Users.findOne({ email: email })
      userUpdate.cocktails.push(cocktails._id)
      const savedUser = await userUpdate.save()
      return savedUser;
    },
    // Given the name of a cocktail and a rating object: {email, value}
    // Upsert the rating field (array of objects)
    upsertCocktailRating: async (parent, { name, rating } ) => {
        // first find the cocktail
        const currentRatings = await Cocktails.findOne({name: name});
        // save the array as a variable for easier code to read
        const ratingArray = currentRatings.rating;
        // declare a boolean 'push' variable to track whether this is an update or insert
        let push = true;
        for (let i = 0; i<ratingArray.length; i++) {
          // check each element in the ratingArray to see if the email provided matches an existing ratingArray object's email field
          if (ratingArray[i].email === rating.email) {
            // inside the loop, if we find a match, update the rating.
            currentRatings.rating[i] = rating;
            //Set push flag to false so we know not to add a new rating for the same user
            push = false;
            break; // exit the loop 
          }
        }
        // If push is still true, we didn't find any ratings from this user for this drink
        // In that case we will push a new rating to the array 
        // We have now either updated or inserted our new rating, so save the cocktail to the database
        push ? currentRatings.rating.push(rating) : console.log("no push");
        const newRatings = await currentRatings.save();
        console.log(newRatings.rating);
    }
  },
};

module.exports = resolvers;
