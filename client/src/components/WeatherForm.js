import React, { Component } from "react";
import { useQuery, gql, useLazyQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import DrinkCard from '../components/DrinkCard'

export default function NameForm() {
  const [formData, setFormData] = React.useState("");

  const [searchValue, setSearchValue] = React.useState("");

  const [drinkName, setDrinkName] = React.useState();

  function handleChange(event) {
    setFormData(event.target.value);
  }
  const NAME_QUERY = gql`
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
  const [search, { loading, data, error }] = useLazyQuery(NAME_QUERY, {
    variables: { name: drinkName },
  });

  var currentDrink = "";
  const [message, setMessage] = React.useState('')

  function drinkRec(currentTemp) {
    var drinksArray = []; //empty array that will be filled with curated drink suggestions
    var drinkIndex; //index variable that will be randomly assigned to select a drink from the array
    var drink = ""; //empty string that will be given the name of a drink from the array
    if (currentTemp > 85) {
      //populate the array
      drinksArray = [
        "Margarita",
        "Mojito",
        "Aperol-Spritz",
        "Pina-Colada",
        "Daiquiri",
        "Paloma",
        "White-Wine-Sangria",
        "Mint-Julep",
      ];
      //randomly generate the index then select the drink
      drinkIndex = Math.floor(Math.random() * drinksArray.length);
      drink = drinksArray[drinkIndex];
      while (drink == currentDrink) {
        drinkIndex = Math.floor(Math.random() * drinksArray.length);
        drink = drinksArray[drinkIndex];
      }
      //append the selected drink name to the url and call the tempSearch function which contains the Fetch code
      currentDrink = drink;
      setDrinkName(drink);
      console.log("searchValue: ", drink);
      console.log("It's a scorcher today! Try a refreshing " + drink);
      setMessage(`Currently ${currentTemp} Degrees. It's a scorcher today! Try a refreshing:`)
    } else if (currentTemp > 60 && currentTemp <= 85) {
      drinksArray = [
        "Moscow-Mule",
        "Tom-Collins",
        "Rum-Punch",
        "Sazerac",
        "Dry-Martini",
        "Whiskey Sour",
        "Sidecar",
      ];
      drinkIndex = Math.floor(Math.random() * drinksArray.length);
      drink = drinksArray[drinkIndex];
      while (drink == currentDrink) {
        drinkIndex = Math.floor(Math.random() * drinksArray.length);
        drink = drinksArray[drinkIndex];
      }
      currentDrink = drink;
      setDrinkName(drink);
      console.log("searchValue: ", drink);
      console.log("Nice Day! Relax with an easy-sipping " + drink);
      setMessage(`Currently ${currentTemp} Degrees. Nice Day! Relax with an easy-sipping:`)
    } else if (currentTemp > 40 && currentTemp <= 60) {
      drinksArray = [
        "Old-Fashioned",
        "Martinez",
        "Negroni",
        "Boulevardier",
        "Sidecar",
      ];
      drinkIndex = Math.floor(Math.random() * drinksArray.length);
      drink = drinksArray[drinkIndex];
      while (drink == currentDrink) {
        drinkIndex = Math.floor(Math.random() * drinksArray.length);
        drink = drinksArray[drinkIndex];
      }
      currentDrink = drink;
      setDrinkName(drink);
      console.log("searchValue: ", drink);
      console.log(data);
      console.log("It's a bit chilly! You need a little liquid warmth from a stiff " +drink);
      setMessage(`Currently ${currentTemp} Degrees. It's a bit chilly! You need a little liquid warmth from a stiff:`)
    } else {
      drinksArray = [
        "Irish-Coffee",
        "Hot-Toddy",
        "Mulled-Wine",
        "Eggnog",
        "Mudslide",
      ];
      drinkIndex = Math.floor(Math.random() * drinksArray.length);
      drink = drinksArray[drinkIndex];
      while (drink == currentDrink) {
        drinkIndex = Math.floor(Math.random() * drinksArray.length);
        drink = drinksArray[drinkIndex];
      }
      currentDrink = drink;
      setDrinkName(drink);
      console.log("searchValue: ", drink);
      console.log("Brr. Warm up with a " + drink);
      setMessage(`Currently ${currentTemp} Degrees. Brr. Warm up with a:`)
    }
    console.log("message!------------------------",message)
    return currentDrink;
  }

  function getCurrentWeather(city) {
    var apiKey = "6015d4614214e35f89f83b4825650637";

    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&appid=" +
        apiKey +
        "&units=imperial"
    )
      .then(function (response) {
        return response.json();
      })

      .then(function (response) {
        var currentTemp = response.main.temp;
        console.log(currentTemp);
        drinkRec(currentTemp);
      });
  }

  React.useEffect(() => {
    console.log(searchValue);
    getCurrentWeather(searchValue);
  }, [searchValue]);

  React.useEffect(() => {
    console.log(drinkName);
    search();
  }, [searchValue]);

  const handleSearch = (e) => {
    e.preventDefault();

    async function awaitUpdate() {
      await setSearchValue(
        formData,
        console.log("Search value should be updated", searchValue)
      );
      console.log(
        "Search value Definitely should be updated now: ",
        searchValue
      );
    }
    awaitUpdate();
  };

  return (
    <div>
      <form id="search-city-form">
        <label id="search-city-label" htmlFor="search-input">
          <h4 class="search-title">Search by city:</h4>
        </label>
        <input
          id="search-city-input"
          className="form-input"
          placeholder="e.g. New York"
          type="text"
          onChange={handleChange}
          //   value = {formData.city}
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
            <h2 id="weather-message">{message}</h2>
      </form>
        {data ? (
    <div className="recipe-layout">
      <div className="recipe-card">
          <Link to = {`/Recipe/${data.cocktail.name}`}>
            <DrinkCard cocktail={data.cocktail} />
        </Link>
        </div>
      </div>) : (
          <p></p>
        )}
    </div>
  );
}
