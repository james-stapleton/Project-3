import React from 'react';
import NameForm from '../components/NameForm';
import IngredientForm from '../components/IngredientForm'
// import { Link } from 'react-router-dom';
// import { useQuery } from '@apollo/client';
// import { QUERY_MATCHUPS } from '../utils/queries';
import {useQuery, gql} from '@apollo/client';
import {useParams} from 'react-router-dom';

const Home = () => {
    return (
<div>

  <NameForm />
  <div>
    <form id="search-form">
      <label id="search-label" htmlFor="search-input">Search for a City:</label>
      <input id="search-input" className="form-input" placeholder="e.g. Philadelphia" />
      <button className="button">Search</button>
      <p id="current-temp" /> 
    </form>
  </div>
  <div id="tempText" />
  <div id="city-drink-name" className="grid-x grid-margin-x" />
  <div id="recipe" className="grid-x grid-margin-x" />
  <div id="output">
  </div>
      <IngredientForm />
</div>

    )
}

export default Home;