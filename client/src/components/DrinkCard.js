import React from "react";

export default function DrinkCard({cocktail, rating}) {

    const {name, ingredients, instructions, views, avgRating, image} = cocktail;
    const style = {
        boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
        transition: "0.3s",
        margins: "10px",
        border: "solid black"
    }

    return (
        <div className="card" style={style}>
            <h1>{name}</h1>
            {ingredients&& <p>{ingredients}</p>}
            {instructions && <p>{instructions}</p>}
            {views && <p>Views: {views}</p>}
            {avgRating && <p>Rating: {avgRating}</p>}
            {rating && <p>You rated this drink {rating}</p>}
            <p>{image}</p>
        </div>
    )
}