import React from 'react';
import NameForm from '../components/NameForm';
import IngredientForm from '../components/IngredientForm';
import WeatherForm from '../components/WeatherForm'
// import { Link } from 'react-router-dom';
// import { useQuery } from '@apollo/client';
// import { QUERY_MATCHUPS } from '../utils/queries';
import {useQuery, gql} from '@apollo/client';
import {useParams} from 'react-router-dom';

const Home = () => {
    return (
<div>

  <NameForm />

  <WeatherForm />
  
  <IngredientForm />
</div>

    )
}

export default Home;