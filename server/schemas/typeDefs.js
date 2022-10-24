const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Users {
    _id: ID!
    name: String!
    email: String!
    password: String!
    cocktails: [Cocktails]
  }

  type Cocktails {
    _id: ID!
    name: String!
    ingredients: String!
    instructions: String!
    rating: Float
    views: Int
  }

  input CocktailInput {
    _id: ID!
    name: String!
    ingredients: String!
  }

  type Query {
    users: [Users]
    cocktails: [Cocktails]
    cocktail(name: String!): Cocktails
  }

  type Mutation {
    createUser(name: String!, email: String!, password: String!): Users
    createCocktail(name: String!, ingredients: String!, instructions: String!): Cocktails
    saveCocktail(email: String!, cocktails: CocktailInput): Users
  }
`;

module.exports = typeDefs;
