const cocktailData = require('./cocktailData.json')

const update = cocktailData.map((cocktail) => (
    {
        ...cocktail,
        searchName: cocktail.name.toLowerCase(),
        searchIng: cocktail.ingredients.toLowerCase()
    }
))

console.log(update);