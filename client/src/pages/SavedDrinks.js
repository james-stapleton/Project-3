import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import DrinkCard from '../components/DrinkCard';
import UnsaveButton from '../components/UnsaveButton'
import "./MostViewedCocktails.css";

const SavedDrinks = () => {

  const SAVED_QUERY = gql`query UserEmail($email: String!) {
        userEmail(email: $email) {
          cocktails {
            name
            image
          }
        }
      }`

  let userEmail = localStorage.getItem("email");
  const { loading, data, error } = useQuery(SAVED_QUERY, { variables: { email: userEmail }, fetchPolicy: 'network-only' })

  if (loading) return "Loading...";
  if (error) return `Please sign in to view your saved drinks`;

  console.log("data", data.userEmail.cocktails);

  const cocktailArray = data.userEmail.cocktails;

  const localName = localStorage.getItem("name")

  return (
    <div class="most-viewed-layout">
      <div class="most-viewed-card">
        <h1>Saved Drinks for {localName}</h1>
        {cocktailArray.map((cocktail) =>
          <pre>
            <Link to={`/Recipe/${cocktail.name}`}>
              <DrinkCard cocktail={cocktail} />
            </Link>
            <p class="unsave-button"><UnsaveButton name={cocktail.name} /></p>
          </pre>
        )}
      </div>
    </div>
  )

}

export default SavedDrinks;