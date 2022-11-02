import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import DrinkCard from '../components/DrinkCard';
import UnsaveButton from '../components/UnsaveButton'
import "./SavedDrinks.css";

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
  if (error) return <h4>Please sign in to view your saved drinks</h4>;

  console.log("data", data.userEmail.cocktails);

  const cocktailArray = data.userEmail.cocktails;

  const localName = localStorage.getItem("name")

  return (
    <div>
      <h1>Saved Drinks for {localName}</h1>
      <div id="saved-layout">
        <div id="saved-card">
          {cocktailArray.map((cocktail) =>
            <div id="saved-data">
              <div id="saved-link">
              <Link to={`/Recipe/${cocktail.name}`}>
                <DrinkCard cocktail={cocktail} />
              </Link>
              </div>
              <p class="unsave-button"><UnsaveButton name={cocktail.name} /></p>
            </div>
          )}
        </div>
      </div>
    </div>
  )

}

export default SavedDrinks;