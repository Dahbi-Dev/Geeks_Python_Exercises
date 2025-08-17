import { useState } from "react";
import type { Movie } from "../types/Movie";
import { List } from "./List";

export function MovieApp() {
    const [movies] = useState<Movie[]>([
        {
            id: 1,
            title: "The Godfather",
            director: "Francis Ford Coppola",
            year: 1972,
        },
        {
            id: 2,
            title: "Pulp Fiction",
            director: "Quentin Tarantino",
            year: 1994,
        },
        {
            id: 3,
            title: "The Dark Knight",
            director: "Christopher Nolan",
            year: 2008,
        },
    ]);

    const renderMovieItem = (movie: Movie) => (
        <div className="movie-item">
            <h3 className="movie-title">{movie.title}</h3>
            <p className="movie-director">Directed by {movie.director}</p>
            <p className="movie-year">Released: {movie.year}</p>
        </div>
    );

    return (
        <div className="movie-app">
            <h2>Movie List Example</h2>
            <List items={movies} renderItem={renderMovieItem} />
        </div>
    );
}
