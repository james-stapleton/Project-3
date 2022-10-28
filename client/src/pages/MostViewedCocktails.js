import React, { useEffect, useState } from "react";
import { useLazyQuery, gql } from "@apollo/client";
import {Link, useLocation} from 'react-router-dom'
import DrinkCard from "../components/DrinkCard";

const VIEW_QUERY = gql`
  {
    cocktails {
        name
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
  },[]) 

    let [search, {data, loading, error}] = useLazyQuery(VIEW_QUERY, {onCompleted: (data) => console.log("query, ran, data: ",data), fetchPolicy: 'network-only'});

    if (loading) return 'Loading...';
    if (error) return <pre>{error.message}</pre>

  if (data) {

    return (
        <pre>
        <h1>Most Viewed Drinks </h1>
        <ul>
            {data.cocktails.map((cocktail) =>
            <Link key={cocktail.name} to = {`/Recipe/${cocktail.name}`}>
              <DrinkCard cocktail={cocktail} />
            </Link>
            )}
        </ul>
        </pre>
    )
  }

}

export default MostViewedCocktails;
