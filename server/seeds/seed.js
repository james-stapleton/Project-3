const db = require('../config/connection');
const { Users, Cocktails } = require('../models');
const { Schema, model, default: mongoose } = require('mongoose');


const userData = require('./userData.json');
const cocktailData = require('./cocktailData.json')

db.once('open', async () => {
  await Users.deleteMany({});

  await Cocktails.deleteMany({});

  const cocktails = await Cocktails.insertMany(cocktailData);

  const users = await Users.insertMany(userData);

 
  users && cocktails ? console.log('Database seeded!') : process.exit(1)


  const newCocktail = new Cocktails({
      "name": "Test",
      "ingredients": "Vodka, sprite, lime",
      "instructions": "Party"
  })

  const savedCocktail = await newCocktail.save();
  console.log(savedCocktail);

  const userUpdate = await Users.findOne({ name: 'James' })
  console.log(userUpdate)
  userUpdate.cocktails.push(savedCocktail._id)
  const savedUser = await userUpdate.save()
  console.log(savedUser)
  
  process.exit(0)

  
});