import React from 'react';
import {useMutation, useQuery, gql} from '@apollo/client';
import {useParams} from 'react-router-dom';
import Rating from '../components/Rating'
import DrinkCard from '../components/DrinkCard';

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

  const INCREMENT_VIEWS = gql`
  mutation IncrementViews($name: String!) {
    incrementViews(name: $name) {
      name
      views
    }
  }`

  const [increment] = useMutation(INCREMENT_VIEWS);

  React.useEffect(() => {
    increment({variables: {name: name}});
  },[])

    const {data, loading, error } = useQuery(GET_COCKTAIL, {variables: {name}});


    if (loading) return 'loading...';
    if (error) return <pre>{error.message}</pre>

    if (data) {

    }

    return (
        <div>
        <DrinkCard cocktail={data.cocktail} />
        <Rating name = {name}/>
        </div> 
    )
}