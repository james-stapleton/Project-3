import React from "react";
import {useLazyQuery, gql} from '@apollo/client'


const VIEW_QUERY = gql`query Query($name: String!) {
    cocktail(name: $name) {
        name
        views
    }
  }`

export default function ViewedQuery({stateVar, cocktail, rating}) {

    const {name} = cocktail;
    const style = {
        boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
        transition: "0.3s",
        margins: "10px",
        border: "solid black"
    }

    let [search, {loading, data, error}] = useLazyQuery(VIEW_QUERY, {
        variables : {name: name}, onCompleted: (data) => console.log("query ran, data:", data.cocktail ), 
        // fetchPolicy: 'network-only'
      } 
      
      );
      
      React.useEffect(() => {
        search()
      },[stateVar]) 

      if (loading) return 'Loading...';
      if (error) return "Error";

      if (data) {

          return (
              <div key = {stateVar} className="card" style={style}>
                  <h1>{name}</h1>
                  {data.cocktail.views && <p>Views: {data.cocktail.views} <br></br>

                  State: {stateVar}</p>}
              </div>
          )


      }

}