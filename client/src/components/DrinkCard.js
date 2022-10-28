import React from "react";

export default function DrinkCard({brand, state, cocktail, rated}) {

    const {name, ingredients, instructions, views, avgRating, image} = cocktail;
    const style = {
        boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
        transition: "0.3s",
        margins: "10px",
        border: "solid black"
    }

    console.log("rated", rated)

    return (
        <div key = {state} className="card" style={style}>
            <p>{state}</p>
            <h1>{name}</h1>
            {ingredients&& <p>{ingredients}</p>}
            {instructions && <p>{instructions}</p>}
            {views && <p>Views: {views}</p>}
            {avgRating && <p>Rating: {avgRating}</p>}
            {rated && <p>You rated this drink {rated}</p>}
            <p>{image}</p>
            {brand && <p>Brand: {brand} </p>}
        </div>
    )
}