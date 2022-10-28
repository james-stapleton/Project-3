import React from 'react';

export default function Video() {

    fetch(`https://developers.google.com/apis-explorer/#p/youtube/v3/youtube.search.list?
    part=snippet
    &order=viewCount
    &q=skateboarding+dog
    &type=video
    &videoDefinition=high`)
    .then((response) => response.json())
    .then((data) => console.log(data))

    return (
        <pre>

        <h1>Video component</h1>

        </pre>
    )
}