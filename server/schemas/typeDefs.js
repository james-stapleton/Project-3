const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Users {
    _id: ID!
    name: String!
    email: String!
    password: String!
    cocktails: [Cocktails]
  }

  type Ratings {
    email: String!
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
  }

  input CocktailInput {
    name: String!
  }

  input CocktailInputID {
    _id: ID!
  }

  input RatingInput {
    email: String!
    value: Int
  }

  type Query {
    users: [Users]
    user(name: String!): Users
    userID(_id: ID!): Users
    updateUser(_id: ID!): Users
    cocktails: [Cocktails]
    cocktail(name: String!): Cocktails
    userEmail(email: String!): Users
    cocktailByIng(string: String!): [Cocktails]
    cocktailRating(name: String!): Cocktails 
  }

  type Mutation {
    createUser(name: String!, email: String!, password: String!): Users
    createCocktail(name: String!, ingredients: String!, instructions: String!, image: String): Cocktails
    saveCocktail(email: String!, cocktails: CocktailInput): Users
    saveCocktailID(email: String!, cocktails: CocktailInputID): Users
    upsertCocktailRating(name: String!, rating: RatingInput): Cocktails
  }
`;

module.exports = typeDefs;


