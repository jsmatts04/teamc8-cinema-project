function YoutubeEmbed({ video, thumbnail }) {
    return (
        <iframe id='ytvid' width="100%" height="600px" src={video} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    );
}

export default YoutubeEmbed;