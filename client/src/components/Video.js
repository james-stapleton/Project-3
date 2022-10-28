import React from 'react';

export default function Video() {

    fetch(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyDnqR3K3X57AM3byrSumlR1nT2BXYn2FxM&q=old-fashioned&type=video&part=snippet`)
    .then((response) => response.json())
    .then((data) => console.log(data))

    

    return (
        <pre>

        <h1>Video component</h1>

        </pre>
    )
}