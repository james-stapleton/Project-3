import React from 'react';
import YouTube from 'react-youtube'

export default function Video({name}) {

    let videoID = localStorage.getItem([name]);
    if (! videoID && videoID != '') {
        console.log("NO video ID so we have to fetch")
        console.log("For now we bullshit---------")
        localStorage.setItem([name], `zzAwspdDFO4`);
    //     fetch(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyDnqR3K3X57AM3byrSumlR1nT2BXYn2FxM&q=${name}&type=video&part=snippet`)
    // .then((response) => response.json())
    // .then((data) => {
    //     console.log(data)
    //     console.log(data.items[0].id.videoId)
    //     let fetchVideoID = data.items[0].id.videoId
    //     console.log("id from fetch:", fetchVideoID)
    //     localStorage.setItem([name], "this will be an id");
    // }).catch((err) => console.log(err));
    videoID = localStorage.getItem([name]);
    }

    console.log("VIDEO ID FROM LOCAL STORAGE", videoID);

    // fetch(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyDnqR3K3X57AM3byrSumlR1nT2BXYn2FxM&q=${name}&type=video&part=snippet`)
    // .then((response) => response.json())
    // .then((data) => {
    //     console.log(data)
    //     console.log(data.items[0].id.videoId)
    //     let fetchVideoID = data.items[0].id.videoId
    //     console.log("id from fetch:", fetchVideoID)
    //     localStorage.setItem([name], "this will be an id");
    // })

    
    return (
        <pre>

        <h1>Video component {videoID}</h1>
        <YouTube videoId={videoID}/>

        </pre>
    )
    
}