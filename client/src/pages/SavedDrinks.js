import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import DrinkCard from '../components/DrinkCard';

const SavedDrinks = () => {

    const SAVED_QUERY = gql`query UserEmail($email: String!) {
        userEmail(email: $email) {
          cocktails {
            name
            image
          }
        }
      }`

      const {loading, data, error } = useQuery(SAVED_QUERY, {variables: {email: "j@test.com"}})

      if (loading) return "Loading...";
      if (error) return `{error.message}`;

      console.log("data",data.userEmail.cocktails);

      const cocktailArray = data.userEmail.cocktails;

      return (
        <pre>
        <h1>Saved Drinks</h1>
        <ul>
            {cocktailArray.map((cocktail) =>
            <Link to = {`/Recipe/${cocktail.name}`}>
              <DrinkCard cocktail={cocktail}/>
            </Link>
            )}
        </ul>
        </pre>
    )
    
}

export default SavedDrinks;