import React from "react";
import { useQuery, gql, useLazyQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";


export default function NameForm() {
  const [formData, setFormData] = React.useState("");

  const [searchValue, setSearchValue] = React.useState("");

  function handleChange(event) {
    setFormData(event.target.value);
  }
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
    console.log(searchValue);
    setSearchValue(formData)


    setTimeout(function() {
      
    console.log(searchValue);

    }, 10000)
    console.log(searchValue);



    search()
    if (loading) return 'loading...';
    if (error) return <pre>{error.message}</pre>

  };

  return (
    <div>
      <form id="search-name-form">
        <label id="search-name-label" htmlFor="search-input">
          Search by name:
        </label>
        <input
          id="search-name-input"
          className="form-input"
          placeholder="e.g. Margarita"
          type = "text"
          onChange = {handleChange}
        //   value = {formData.city}
        />
        <button onClick={handleSearch} className="button">Search</button>
        {data ?
        <Link to = {`/Recipe/${data.cocktail.name}`}>
         <p>{`${data.cocktail.name}
        ${data.cocktail.ingredients}
        ${data.cocktail.instructions}`}</p>
        </Link>
         : <p></p> }
      </form>
    </div>
  );
}
