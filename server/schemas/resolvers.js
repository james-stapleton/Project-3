const { Users, Cocktails } = require("../models");
const {signToken} = require("../utils/auth")
const {AuthenticationError} = require("apollo-server-express")

const resolvers = {
  Query: {
    //Get all users, users by email, name or by ID
    users: async () => {
      return Users.find({}).populate("cocktails");
    },
    user: async (parent, { name }) => {
      return Users.findOne({ name: name }).populate("cocktails");
    },
    userID: async (parent, { _id }) => {
      return Users.findOne({ _id: _id }).populate("cocktails");
    },
    userEmail: async (parents, { email }) => {
      return Users.findOne({ email: email }).populate("cocktails");
    },
    // get all cocktails, cocktails by name, or by ingredient
    cocktails: async () => {
      return Cocktails.find({}).sort({views: -1});
    },
    cocktail: async (parent, { name }) => {
      return Cocktails.findOne({ name: name });
    },
    cocktailByIng: async (parent, { string }) => {
      return Cocktails.find({ ingredients: { $regex: string } });
    },
    // get the aray of ratings for a cocktail
    cocktailRating: async (parent, { name }) => {
      return Cocktails.findOne({ name: name }).select("name rating");
    },
    rankedCocktails: async () => {
      return Cocktails.find({}).sort({avgRating: -1});
    },
    viewedCocktails: async() => {
      return Cocktails.find({}).sort({views: -1});
    }
  },
  Mutation: {
    //Create a user. Required args are name, email, password
    createUser: async (parent, args) => {
      const user = await Users.create(args);
      const token = signToken(user);
      console.log("token");
      return {user, token};
    },
    login: async (parent, { email, password }) => {
      const user = await Users.findOne({ email });
      console.log(password)
      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);
      console.log(correctPw)
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }
      
      const token = signToken(user);
      console.log(token, user);
      return { token, user };
    },
    // Update User
    updateUser: async (parent, { _id, args }) => {
      const updateUser = Users.findOneAndUpdate({ _id: _id }, args, {
        new: true,
      });
      return updateUser;
    },
    deleteUser: async (parent, { _id }) => {
      const deletedUser = await Users.findOneAndDelete({ _id: _id });
      return deletedUser;
    },
    //Create a cocktail. For user uploads. Required args are name, ingredients, instructions
    createCocktail: async (parent, args) => {
      const cocktail = await Cocktails.create(args);
      return cocktail;
    },
    updateCocktail: async (parent, { _id, args }) => {
      const updateCocktail = Cocktails.findOneAndUpdate({ _id: _id }, args, {
        new: true,
      });
      return updateCocktail;
    },
    deleteCocktail: async (parent, { _id }) => {
      const deletedCocktails = Cocktails.findOneAndDelete({ _id: _id });
      return deletedCocktails;
    },
    // Mutation to allow a user to save a cocktail given the name of the cocktail and their email
    saveCocktail: async (parent, { email, cocktails }) => {
      // Accepts a CocktailInput object called cocktails like this: { name }
      // Then finds cocktail where the name matches the name value inside said object
      const saveCocktail = await Cocktails.findOne({ name: cocktails.name });
      // Next find a user by their email
      const userUpdate = await Users.findOne({ email: email });
      // Push the ID of the previously found cocktail onto the user's cocktails array
      userUpdate.cocktails.push(saveCocktail._id);
      // Save this user to update the database
      const savedUser = await userUpdate.save();
      return savedUser;
    },
    // Same as above, except the cocktails object looks like this: { _id }
    // ID can be pushed directly to the user instead of finding it--came from front end
    saveCocktailID: async (parent, { email, cocktails }) => {
      const userUpdate = await Users.findOne({ email: email });
      userUpdate.cocktails.push(cocktails._id);
      const savedUser = await userUpdate.save();
      return savedUser;
    },
    unSaveCocktail: async (parent, { email, _id }) => {
      const user = await Users.findOne({ email: email });
      const index = user.cocktails.indexOf(_id);
      console.log("Saved drink at index: ",index);
      if (index >= 0) {
        // only splice array when item is found
        user.cocktails.splice(index, 1); // 2nd parameter means remove one item only
      }
      const saveUser = await user.save();
      return saveUser;
    },
    unSaveCocktailName: async (parent, { email, name }) => {
      const cocktail = await Cocktails.findOne({name: name});
      const user = await Users.findOne({ email: email });
      const index = user.cocktails.indexOf(cocktail._id);
      console.log("Saved drink at index: ",index);
      if (index >= 0) {
        // only splice array when item is found
        user.cocktails.splice(index, 1); // 2nd parameter means remove one item only
      }
      const saveUser = await user.save();
      return saveUser;
    },
  
    upsertCocktailRating: async (parent, { name, rating }) => {
      const currentRatings = await Cocktails.findOne({ name: name });
      const ratingArray = currentRatings.rating;

      console.log("Current ratings: ", ratingArray)

      let push = true;

      if (ratingArray.length > 0) {

      for (let i = 0; i < ratingArray.length; i++) {
        if (ratingArray[i].userEmail === rating.userEmail) {
          currentRatings.rating[i] = rating;
          push = false;
          break; 
        }
      }
    }
      push ? currentRatings.rating.push(rating) : console.log("no push");
      const newRatings = await currentRatings.save();
      console.log("NewRatings:",newRatings.rating);
    },
    incrementViews: async(parent, {name}) => {
      const incrementCocktail = await Cocktails.findOneAndUpdate({name}, {$inc: {views: 1}}, {new: false})
    },
    setVideoID: async (parent, {name, videoID}) => {
      const cocktail = await Cocktails.findOneAndUpdate({name: name}, {videoID: videoID}, {new: true} );
      return cocktail;
    }
  },
};

module.exports = resolvers;
