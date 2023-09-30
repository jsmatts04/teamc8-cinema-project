class Movie {
    constructor(title, synopsis, category, actors, director, producer,
        reviewScore, trailerPicture, trailerVideo, filmRating, filmLength, releaseDate) {
        this.title = title;
        this.synopsis = synopsis;
        this.category = category;
        this.actors = actors;
        this.director = director;
        this.producer = producer;
        this.reviewScore = reviewScore;
        this.trailerPicture = trailerPicture;
        this.trailerVideo = trailerVideo;
        this.filmRating = filmRating;
        this.filmLength = filmLength;
        this.releaseDate = releaseDate;
    }

    toJSON() {
        return {
            title, synopsis, category, actors, director, producer,
            reviewScore, trailerPicture, trailerVideo, filmRating, filmLength, releaseDate
        };
    }
}

export default Movie;