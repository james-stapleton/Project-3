import React from "react";
import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import MostViewedDrinks from "./pages/MostViewedCocktails";
import CocktailRankings from "./pages/CocktailRankings";
import SavedDrinks from "./pages/SavedDrinks";
import UploadDrink from "./pages/UploadDrink";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Recipe from './pages/Recipe'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});

function App() {


  function loadDrink(e) {
    console.log(e.target.id)
    
}

  return (
    <ApolloProvider client={client}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          
          <Route path="/MostViewedDrinks" element={<MostViewedDrinks />} />

          <Route path="/CocktailRankings" element={<CocktailRankings loadDrink = {loadDrink} />} />

          <Route path="/SavedDrinks" element={<SavedDrinks />} />

          <Route path="/UploadDrink" element={<UploadDrink />} />

          <Route path="/Login" element={<Login />} />

          <Route path = 'Recipe/:name' element = {<Recipe />} /> 

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
