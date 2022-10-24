const { Users, Cocktails } = require('../models');

const resolvers = {
  Query: {
    users: async () => {
      return Users.find({}).populate('cocktails');
    },
    cocktails: async() => {
      return Cocktails.find({});
    },
    cocktail: async (parent, { name }) => {
      // use the provided name if there is one, or find all if not specifed
      const params = name ? { name } : {};
      return Cocktails.find(params);
    },
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
      return Users.findOneAndUpdate(
        { email: email },
        {
          $addToSet: { cocktails: cocktails },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },

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
