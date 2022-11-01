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
            <pre className="video-container">
            <YouTube videoId={localvideoID}/>
            </pre>
        )
    }

    // if not in local storage, fetch before checking DB. Then update DB. This will keep updating the DB with fresh searches so that hopefully the video never gets old or deleted. 

    if ( !localvideoID || localvideoID === '' || localvideoID == null) {
        console.log("NO video ID in local storage so we have to fetch")
        
        fetch(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyDnqR3K3X57AM3byrSumlR1nT2BXYn2FxM&q=${name}-cocktail&type=video&part=snippet`)
         .then((response) => response.json())
         .then((data) => {
                console.log("data error : ",data.error.message)
                let isFetched = true;
                if (data.error) {
                    console.log("We're in the right place", videoID)
                    localStorage.setItem([name], videoID)
                    console.log("value should have been set to local stoarge", localStorage.getItem([name]))
                    isFetched = false;
                    // return (
                    //     <div class="video-container">
                    //         {console.log("Render from DB: ", videoID)}
                    //         <YouTube videoId={localvideoID}/>
                    //     </div>
                    // )
                }
                let fetchVideoID = '';
                if (isFetched) {
                    let fetchVideoID = data.items[0].id.videoId
           
                console.log("id from fetch:", fetchVideoID)
                localStorage.setItem([name], fetchVideoID);
                }
                

                console.log("Regardless of fetch vs db, localstorage should still have a valid video ID by this point :", localStorage.getItem([name]));
            // ! Regardless of fetch vs DB, localstorage is still set with a working(hopefully) value. This allows the same return below (again, hopefully)
            updateVideo({variables: {name: name, videoId: `${fetchVideoID}`}}); //update the DB with the fetchVideo ID

            // ! Error handling in here somewhere. Not exactly sure how yet
            }).catch((err) => console.log("Error message"));
            localvideoID = localStorage.getItem([name]);
            console.log("Getting id from local storage at end of fetch function", localvideoID)
        }
        console.log("right before return")
        return (
            <pre className="video-container">
            <YouTube videoId={localvideoID}/>
            </pre>
        )
    
}