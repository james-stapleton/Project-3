import React from 'react';
import YouTube from 'react-youtube'
import {gql, useMutation} from '@apollo/client'

const VIDEO_MUTATION = gql`mutation Mutation($name: String!, $videoId: String!) {
    setVideoID(name: $name, videoID: $videoId) {
      name
      videoID  
    }
  }`

export default function Video({name, videoID}) {

    console.log(videoID); // videoID from database
    const [updateVideo, {data, loading, error}] = useMutation(VIDEO_MUTATION);

    // if there's already an ID in local storage, just display that. This way each user isn't loading the same drink more than once. However, each new user can load each drink once. Not ideal but ok for now. 

    let localvideoID = localStorage.getItem([name]);
    if (localvideoID && localvideoID.length > 0) {
        return (
            <pre>
            <h1>Video component {localvideoID}</h1>
            <YouTube videoId={localvideoID}/>
            </pre>
        )
    }

    // if not in local storage, fetch before checking DB. Then update DB. This will keep updating the DB with fresh searches so that hopefully the video never gets old or deleted. 

    if ( !localvideoID || localvideoID === '') {
        console.log("NO video ID in local storage so we have to fetch")
        
        fetch(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyDnqR3K3X57AM3byrSumlR1nT2BXYn2FxM&q=${name}-cocktail&type=video&part=snippet`)
         .then((response) => response.json())
         .then((data) => {
                console.log("raw data ", data)
                console.log("new videoID ", data.items[0].id.videoId)
                let fetchVideoID = data.items[0].id.videoId
             if (!fetchVideoID) {
                fetchVideoID = videoID;
                console.log("No video ID found from youtube. Quota is up, use from database: ", fetchVideoID)
                localStorage.setItem([name], fetchVideoID)
            // ! above 2 lines say if we fail to get the ID from the fetch, get it from the prop which came from the DB
            }
                console.log("id from fetch:", fetchVideoID)
                localStorage.setItem([name], fetchVideoID);

                console.log("Regardless of fetch vs db, localstorage should still have a valid video ID by this point :", localStorage.getItem([name]));
            // ! Regardless of fetch vs DB, localstorage is still set with a working(hopefully) value. This allows the same return below (again, hopefully)
            updateVideo({variables: {name: name, videoId: `${fetchVideoID}`}}); //update the DB with the fetchVideo ID

            // ! Error handling in here somewhere. Not exactly sure how yet
            }).catch((err) => console.log(err));
            localvideoID = localStorage.getItem([name]);
        }

        return (
            <pre>
    
            <h1>Video component {localvideoID}</h1>
            <YouTube videoId={localvideoID}/>
    
            </pre>
        )
        
        
            // if not in local storage, and fetch fails, pull from DB. All DB entries will need to be seeded for this failsafe to work. Any that aren't will fail to load a video if a user surpasses the quota then checks a drink no one has viewed before. 
        

    // fetch(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyDnqR3K3X57AM3byrSumlR1nT2BXYn2FxM&q=${name}&type=video&part=snippet`)
    // .then((response) => response.json())
    // .then((data) => {
    //     console.log(data)
    //     console.log(data.items[0].id.videoId)
    //     let fetchVideoID = data.items[0].id.videoId
    //     console.log("id from fetch:", fetchVideoID)
    //     localStorage.setItem([name], "this will be an id");
    // })

    
   
    
}