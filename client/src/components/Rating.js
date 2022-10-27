import React from 'react';
import { useMutation, gql, useLazyQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';

export default function Rating(props) {

    const RATING_MUTATION = gql`
    mutation UpsertCocktailRating($name: String!, $rating: RatingInput) {
        upsertCocktailRating(name: $name, rating: $rating) {
        name  
        }
      }`

    const [sendRating, {loading, data, error}] = useMutation(RATING_MUTATION);
    
    async function handleClick(event) {
        event.preventDefault();
        var newRating = event.target.id;
        const ratingNum = parseInt(newRating);
        console.log(newRating);
        console.log("name",props.name)
        sendRating({variables: {name: "Moscow-Mule", rating: {
            "email": "c@test.com",
            "value": ratingNum
        }}})

        }

    return(

        <div class="stars" >
        <a id='1' onClick={handleClick}>⭐</a>
        <a id='2' onClick={handleClick}>⭐</a>
        <a id='3' onClick={handleClick}>⭐</a>
        <a id='4' onClick={handleClick}>⭐</a>
        <a id='5' onClick={handleClick}>⭐</a>
    </div>

    )
}