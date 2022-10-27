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

    if (loading) return 'Loading...';
    if (error) return <pre>{error.message}</pre>
    console.log(data);
    
    async function handleClick(event) {
        console.log("props:",props)

        let cocktailName =props.name;
        console.log ("Cocktail name: ", cocktailName);
        event.preventDefault();
        var newRating = event.target.id;
        var ratingEmail = localStorage.getItem("email");
        console.log("email: ", ratingEmail);
        const ratingNum = parseInt(newRating);
        console.log(newRating);
        console.log("name",props.name)
        sendRating({variables: {name: `${cocktailName}`, rating: {
            "userEmail": ratingEmail,
            "value": ratingNum
        }}})
        props.onClick();
        console.log("rated: ", props.rated);
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