import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import DrinkCard from '../components/DrinkCard';
import UnsaveButton from '../components/UnsaveButton'

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
      const {loading, data, error } = useQuery(SAVED_QUERY, {variables: {email: userEmail}})

      if (loading) return "Loading...";
      if (error) return `{error.message}`;

      console.log("data",data.userEmail.cocktails);

      const cocktailArray = data.userEmail.cocktails;

      const localName = localStorage.getItem("name")

      return (
        <pre>
        <h1>Saved Drinks for {localName}</h1>
        <ul>
            {cocktailArray.map((cocktail) =>
            <pre>
            <Link to = {`/Recipe/${cocktail.name}`}>
              <DrinkCard cocktail={cocktail}/>
            </Link>
            <UnsaveButton name = {cocktail.name}/>
            </pre>
            )}
        </ul>
        </pre>
    )
    
}

export default SavedDrinks;