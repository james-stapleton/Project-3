import React from 'react';
import {useQuery, gql} from '@apollo/client';
import {useParams} from 'react-router-dom';
import Rating from '../components/Rating'


export default function Recipe (props) {

    const {name} = useParams();

    const GET_COCKTAIL = gql`
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

    const {data, loading, error } = useQuery(GET_COCKTAIL, {variables: {name}});

    if (loading) return 'loading...';
    if (error) return <pre>{error.message}</pre>


    return (
        <div>
        <h1>{name}</h1>
        <ul>
            <li>{data.cocktail.ingredients}</li>
            <li>{data.cocktail.instructions}</li>
            <li>{data.cocktail.avgRating}</li>
            <li>{data.cocktail.views}</li>
            <li>{data.cocktail.image}</li>
        </ul>
        <Rating name = {name}/>
        </div> 
    )
}