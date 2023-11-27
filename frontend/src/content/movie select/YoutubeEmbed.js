import { useEffect } from "react";

function YoutubeEmbed({ video, thumbnail }) {
    useEffect(() => {
        embedVideo();
    },[])

    function embedVideo() {
        return <iframe id='ytvid' width="100%" height="600px" src={video} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    }

    return embedVideo();
}

export default YoutubeEmbed;