import React from 'react';
// import { Link } from 'react-router-dom';
// import { useQuery } from '@apollo/client';
// import { QUERY_MATCHUPS } from '../utils/queries';

const Home = () => {
    return (
<div>
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
  {/*! Start Ingredient Search -----------------------------------------*/}
  <div>
    <form id="search-ingredient-form">
      <label id="search-ingredient-label" htmlFor="search-input">Search by Ingredient:</label>
      <input id="search-ingredient-input" className="form-input" placeholder="e.g. Vodka" />
      <button className="button">Search</button>
      <p id="#search-ingrdient" />
    </form>
  </div>
  <div id="output2">
  </div>
  {/* End Ingredient Search ----------------------------------------*/}
  <div>
    <form id="name-search">
      <label htmlFor="cocktail-name">Search for cocktail by name</label>
      <input id="name" type="cocktail-name" placeholder="For example 'margarita'" />
      <button className="button">Search</button>
    </form>
  </div>
  <div id="output3" />
</div>

    )
}

export default Home;