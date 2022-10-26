import React from "react";
import { useQuery, gql, useLazyQuery } from "@apollo/client";
import { useParams } from "react-router-dom";


export default function NameForm() {
  const [formData, setFormData] = React.useState("");

  const [searchValue, setSearchValue] = React.useState("");

  function handleChange(event) {
    setFormData(event.target.value);
  }
// --------------------------------------------------------------------------
const NAME_QUERY = gql`
query Cocktails($name: String!) {
  cocktail(name: $name) {
    name
    ingredients
    instructions
    avgRating
    views
    image
  }
}
`;
    const [search, {loading, data, error}] = useLazyQuery(NAME_QUERY, {
        variables : {name: searchValue}
      });


  const handleSearch = (e) => {
    e.preventDefault();
    setSearchValue(formData);
    search()
    if (loading) return 'loading...';
    if (error) return <pre>{error.message}</pre>

  };

//   function handleSubmit(event) {
//     event.preventDefault();

//   useQuery({name: formData.name})

//   if (loading) return 'loading...';
//     if (error) return <pre>{error.message}</pre>

//     console.log(data);

// -------------------------------------------------------------------

  return (
    <div>
      <form id="search-ingredient-form">
        <label id="search-ingredient-label" htmlFor="search-input">
          Search by Ingredient:
        </label>
        <input
          id="search-ingredient-input"
          className="form-input"
          placeholder="e.g. Vodka"
          type = "text"
          onChange = {handleChange}
        //   value = {formData.city}
        />
        <button onClick={handleSearch} className="button">Search</button>
        {data ? <p>{`${data.cocktail.name}
        ${data.cocktail.ingredients}
        ${data.cocktail.instructions}`}</p> : <p>""</p> }
      </form>
    </div>
  );
}
