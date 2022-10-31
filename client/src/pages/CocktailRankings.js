import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Link } from 'react-router-dom'
import DrinkCard from "../components/DrinkCard";
import "./CocktailRankings.css";

const RATING_QUERY = gql`
  {
    cocktails {
        name
        avgRating
        image
    }
  }
`;

const CocktailRankings = (props) => {

  const { data, loading, error } = useQuery(RATING_QUERY, { fetchPolicy: "network-only" });

  if (loading) return 'Loading...';
  if (error) return <pre>{error.message}</pre>

<<<<<<< HEAD
    // console.log(data.cocktails.sort(({avgRating}) =>  ));

    // dataArray = data.cocktails.sort();
=======
  console.log(data);
>>>>>>> fcf4ae424ad5e28bb291b43595cae8f70990f61e

  
  return (
    <div id="rankings-layout">
      <div id="rankings-card">
        <h1>Top Rated Drinks</h1>
          {data.cocktails.map((cocktail) =>
            <Link to={`/Recipe/${cocktail.name}`}>
              <DrinkCard cocktail={cocktail} />
            </Link>
          )}
        <ul><button></button></ul>
      </div>
    </div>
  )
}

export default CocktailRankings;
