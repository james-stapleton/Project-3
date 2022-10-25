const { Users, Cocktails } = require('../models');

const resolvers = {
  Query: {
    users: async () => {
      return Users.find({}).populate('cocktails');
    },
    user: async (parent, { name } ) => {
      return Users.findOne( { name: name } ).populate("cocktails");
    },
    userEmail: async (parents, {email}) => {
      return Users.findOne({email: email}).populate("cocktails");
    },
    cocktails: async() => {
      return Cocktails.find({});
    },
    cocktail: async (parent, { name }) => {
      // use the provided name if there is one, or find all if not specifed
      return Cocktails.findOne({name: name});
    },
    cocktailByIng: async (parent, {string}) => {
      return Cocktails.find(
        {"ingredients": {"$regex": string}}
      )
    },
    cocktailRating: async (parent, {name} ) => {
      return Cocktails.findOne({name: name}).select('name rating')
    }
  },
  Mutation: {
    createUser: async (parent, args) => {
      const user = await Users.create(args);
      return user;
    },
    createCocktail: async(parent, args) => {
      const cocktail = await Cocktails.create(args);
      return cocktail;
    },
    saveCocktail: async (parent, { email, cocktails }) => {
      const userUpdate = await Users.findOne({ email: email })
      userUpdate.cocktails.push(cocktails._id)
      const savedUser = await userUpdate.save()
      return savedUser;
    },
    upsertCocktailRating: async (parent, { name, rating } ) => {
        console.log(rating);
        const currentRatings = await Cocktails.findOne({name: name});
        const ratingArray = currentRatings.rating;
        console.log(ratingArray);
        let push = true;
        for (let i = 0; i<ratingArray.length; i++) {
          console.log("Push?", push);
          console.log(`current rating email: ${ratingArray[i].email} \n new rating email: ${rating.email}`)
          if (ratingArray[i].email === rating.email) {
            currentRatings.rating[i] = rating;
            push = false;
            console.log(`Push is ${push}:Update! break the loop!`);
            break;
          }
        }
        push ? currentRatings.rating.push(rating) : console.log("no push");
        const newRatings = await currentRatings.save();
        console.log(newRatings.rating);
        // let query = {$push: {rating: rating}}
        // const newRating = await Cocktails.findOneAndUpdate({name: name, "rating.email": { '$ne': rating.email}}, query, {upsert: true});
        // return newRating;
    }

    // createVote: async (parent, { _id, techNum }) => {
    //   const vote = await Matchup.findOneAndUpdate(
    //     { _id },
    //     { $inc: { [`tech${techNum}_votes`]: 1 } },
    //     { new: true }
    //   );
    //   return vote;
    // },
  },
};

module.exports = resolvers;
