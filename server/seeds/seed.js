const db = require('../config/connection');
const { Users, Cocktails } = require('../models');
const { Schema, model, default: mongoose } = require('mongoose');


const userData = require('./userData.json');
const cocktailData = require('./cocktailData.json')

db.once('open', async () => {
  await Users.deleteMany({});

  await Cocktails.deleteMany({});

  
  const cocktailsWithSearchFields = cocktailData.map((cocktail) => (
    {
        ...cocktail,
        searchName: cocktail.name.toLowerCase(),
        searchIngredient: cocktail.ingredients.toLowerCase()
    }
))
  const cocktails = await Cocktails.insertMany(cocktailsWithSearchFields);

  const users = await Users.insertMany(userData);

 
  users && cocktails ? console.log('Database seeded!') : process.exit(1)


  const newCocktail = new Cocktails({
      "name": "Test",
      "ingredients": "Vodka, sprite, lime",
      "instructions": "Party"
  })

  const savedCocktail = await newCocktail.save();
  const userUpdate = await Users.findOne({ name: 'James' })
  userUpdate.cocktails.push(savedCocktail._id)
  const savedUser = await userUpdate.save()
  process.exit(0)

  
});
