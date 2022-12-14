import React from 'react';
import NameForm from '../components/NameForm';
import IngredientForm from '../components/IngredientForm';
import WeatherForm from '../components/WeatherForm'
// import { Link } from 'react-router-dom';
// import { useQuery } from '@apollo/client';
// import { QUERY_MATCHUPS } from '../utils/queries';
import { useQuery, gql } from '@apollo/client';
import { useParams } from 'react-router-dom';
import "./Home.css";

const QUERY_NAME = gql`
query UserEmail($email: String!) {
  userEmail(email: $email) {
    name  
  }
}
`
const Home = () => {
  let userEmail = localStorage.getItem("email")
  console.log(userEmail)
  const { loading, data, error } = useQuery(QUERY_NAME, {
    variables: { email: userEmail }
  });
  if (loading) return 'loading...';
  if (error) console.log(error)
  if (data) {

    let username = data.userEmail.name;
    localStorage.setItem("name", username)
  }
  const localName = localStorage.getItem("name")
  if (localName && document.getElementById("login")) window.location.reload();

  return (

    <div id="home-layout">
      <div id="home-card">
        <div>
          <h1>Welcome to the Cocktail Curator</h1>
          <h4>Let's begin your search for the perfect cocktail...</h4>
        </div>
        <div id="home-form">
          <NameForm />

          <WeatherForm />

          <IngredientForm />
        </div>
      </div>
    </div>

  )
}

export default Home;