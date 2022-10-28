import React from "react";

export default function DrinkCard({cocktail, rating}) {

    const {name, ingredients, instructions, views, avgRating, image} = cocktail;
    const style = {
        transition: "0.3s",
        background-color: "#D7B877",
        margins: "10px",
        padding: "10px",
        border: "0px"
    }

    return (
        <div id="recipe-card-data" className="card" style={style}>
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