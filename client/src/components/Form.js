import React from "react";
import { gql, useMutation } from "@apollo/client";
import DrinkCard from './DrinkCard'
import { Link } from "react-router-dom";
import "./Form.css";

const CREATE_COCKTAIL_MUTATION = gql`mutation Mutation($name: String!, $ingredients: String!, $instructions: String!, $searchName: String, $searchIngredient: String) {
    createCocktail(name: $name, ingredients: $ingredients, instructions: $instructions, searchName: $searchName, searchIngredient: $searchIngredient) {
    name
    ingredients
    instructions
    image
    }
  }`

export default function Form() {
  const [formData, setFormData] = React.useState({
    name: "",
    ingredients: "",
    instructions: "",
    searchName: "",
    searchIngredient: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }

  const [upload] = useMutation(CREATE_COCKTAIL_MUTATION)

  const [displayCard, setDisplayCard] = React.useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    let newDrink = {
      ...formData,
      searchName: formData.name.toLowerCase(),
      searchIngredient: formData.ingredients.toLowerCase()
    }
    console.log("new drink to upload:",newDrink);
    await upload({variables: newDrink})
    createCard();
  }

  function createCard() {
    setDisplayCard(true);
  }


  return (
    <div>
      <div>
          <form class="upload-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Drink name"
              onChange={handleChange}
              name="name"
            />
            <input
              type="text"
              placeholder="Drink ingredients"
              onChange={handleChange}
              name="ingredients"
            />
            <input
              type="text"
              placeholder="Drink instructions"
              onChange={handleChange}
              name="instructions"
            />
            <button class="search-button">Submit</button>
          </form>
</div>
          {displayCard &&
    <div class="recipe-layout">
      <div class="recipe-card">

            <Link to={`/Recipe/${formData.name}`}>
              <DrinkCard cocktail={formData} />
            </Link>        </div>
      </div>}

      </div>
  );
}
