import React from "react";
import { useQuery, gql, useLazyQuery } from "@apollo/client";
import { useParams, Link } from "react-router-dom";
import DrinkCard from "./DrinkCard";


export default function NameForm() {
  const [formData, setFormData] = React.useState("");

  const [searchValue, setSearchValue] = React.useState("");

  function handleChange(event) {
    setFormData(event.target.value);
  }
  
const INGREDIENT_QUERY = gql`
query CocktailByIng($string: String!) {
    cocktailByIng(string: $string) {
      name
      ingredients
      instructions
      image
    }
  }
`;
    const [search, {loading, data, error}] = useLazyQuery(INGREDIENT_QUERY, {
        variables : {string: searchValue}
      });

      if (loading) return 'Loading...';
    if (error) return <pre>{error.message}</pre>
    console.log(data);


  const handleSearch = (e) => {
    e.preventDefault();
    setSearchValue(formData);
    console.log(searchValue, formData)
    search()
    if (loading) return 'loading...';
    if (error) return <pre>{error.message}</pre>
    console.log(data);

  };

  return (
    <div>
      <form id="search-ingredient-form">
        <label id="search-ingredient-label" htmlFor="search-input">
          <h5 class="search-title">Search by ingredient</h5>
        </label>
        <input
          id="search-ingredient-input"
          className="form-input"
          placeholder="e.g. Lime"
          type = "text"
          onChange = {handleChange}
        //   value = {formData.city}
        />
        <button onClick={handleSearch} className="search-button">Search</button>
      </form>
        <br></br>
        {data ?
        
        data.cocktailByIng.map((cocktail) => {
            console.log(cocktail)
            return (
              <div className="recipe-layout">
                <div className="recipe-card">
            <Link to = {`/Recipe/${cocktail.name}`}>
             <DrinkCard cocktail = {cocktail} />
            </Link>
        <br></br>
        </div>
      </div>
            )
        })
        
        : <p></p>
         }
    </div>
  );
}
