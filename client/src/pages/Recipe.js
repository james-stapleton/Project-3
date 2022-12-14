import React from 'react';
import { useMutation, useQuery, gql } from '@apollo/client';
import { useParams } from 'react-router-dom';
import Rating from '../components/Rating'
import DrinkCard from '../components/DrinkCard';
import SaveButton from '../components/SaveButton';
import Video from '../components/Video';
import "./Recipe.css";

export default function Recipe(props) {

  const { name } = useParams();
  console.log("Cocktail name from paramms: ", name)
  const [rated, setRated] = React.useState('');

  function handleRating(userRating) {
    setRated(userRating);
  }

  const GET_COCKTAIL = gql`
    query Cocktails($name: String!) {
      cocktailCard(name: $name) {
        name
        ingredients
        instructions
        avgRating
        views
        image
        videoID
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
    increment({ variables: { name: name } });
  }, [])

  const { data, loading, error } = useQuery(GET_COCKTAIL, { variables: { name }, fetchPolicy: 'network-only' });

  if (loading) return 'loading...';
  if (error) return <pre>{error.message}</pre>

  if (data) {
    console.log(data.cocktailCard.name)
  }

  return (
    <div id="recipe-layout">
      <div id="recipe-card">
        <DrinkCard rated={rated} cocktail={data.cocktailCard} />
        <div id="recipe-card-footer">
        <Rating rated={rated} setRating={handleRating} name={name} />
        <br></br>
        <SaveButton name={data.cocktailCard.name} />
        </div>
          <h2>Instructional Video</h2>
        <div id="video-container">
          <Video name={name} videoID={data.cocktailCard.videoID} />
        </div>
      </div>
    </div>
  )
}