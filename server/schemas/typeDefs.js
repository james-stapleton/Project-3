const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Users {
    _id: ID!
    name: String!
    email: String!
    password: String!
    cocktails: [Cocktails]
  }

  input UserInput {
    name: String
    email: String
    password: String
  }

  type Ratings {
    userEmail: String
    value: Int
  }

  type Cocktails {
    _id: ID!
    name: String!
    ingredients: String!
    instructions: String!
    rating: [Ratings]
    views: Int
    avgRating: Float
    image: String
    videoID: String
    searchName: String
    searchIngredient: String
  }

  input CocktailInput {
    name: String!
  }

  input CocktailUpdate {
    name: String
    ingredients: String
    instructions: String
    image: String
    views: Int
  }

  input CocktailInputID {
    _id: ID!
  }

  input RatingInput {
    userEmail: String
    value: Int
  }

  type Auth {
    token: ID!
    user: Users
  }

  type Query {
    users: [Users]
    user(name: String!): Users
    userID(_id: ID!): Users
    cocktails: [Cocktails]
    cocktail(name: String!): Cocktails
    cocktailCard(name: String!): Cocktails
    userEmail(email: String!): Users
    cocktailByIng(string: String!): [Cocktails]
    cocktailRating(name: String!): Cocktails 
    rankedCocktails: [Cocktails]
    viewedCocktails: [Cocktails]
  }

  type Mutation {
    createUser(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    updateUser(_id: ID!, args: UserInput): Users
    deleteUser(_id: ID!): Users
    createCocktail(name: String!, ingredients: String!, instructions: String!, image: String, searchName: String, searchIngredient: String): Cocktails
    updateCocktail(_id: ID!, args: CocktailUpdate): Cocktails
    deleteCocktail(_id: ID!): Cocktails
    saveCocktail(email: String, cocktails: CocktailInput): Users
    saveCocktailID(email: String, cocktails: CocktailInputID): Users
    unSaveCocktail(email: String!, _id: ID!): Users
    unSaveCocktailName(email: String!, name: String!): Users
    upsertCocktailRating(name: String!, rating: RatingInput): Cocktails
    incrementViews(name: String!): Cocktails
    setVideoID(name: String!, videoID: String!): Cocktails
  }
`;

module.exports = typeDefs;


// 