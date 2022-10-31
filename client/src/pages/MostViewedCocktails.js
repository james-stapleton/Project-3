import React, { useEffect, useState } from "react";
import { useLazyQuery, gql } from "@apollo/client";
import { Link, useLocation } from 'react-router-dom'
import DrinkCard from "../components/DrinkCard";
import "./MostViewedCocktails.css";

const VIEW_QUERY = gql`
  {
    cocktails {
        name
        image
        views
    }
  }
`;

const MostViewedCocktails = () => {

  const [stateVar, setStateVar] = React.useState(1);
  let state = 1;


  useEffect(() => {
    search()
    state = Math.random();
    setStateVar(state);
  }, [])

  let [search, { data, loading, error }] = useLazyQuery(VIEW_QUERY, { onCompleted: (data) => console.log("query, ran, data: ", data), fetchPolicy: 'network-only' });

  if (loading) return 'Loading...';
  if (error) return <pre>{error.message}</pre>

  if (data) {

    return (
      <div class="most-viewed-layout">
        <div class="most-viewed-card">
          <h1>Most Viewed Drinks</h1>
            {data.cocktails.map((cocktail) =>
              <Link key={cocktail.name} to={`/Recipe/${cocktail.name}`}>
                <DrinkCard cocktail={cocktail} />
              <p id="views">Views: {cocktail.views}</p>
              </Link>
            )}
        </div>
      </div>
    )
  }

}

export default MostViewedCocktails;
