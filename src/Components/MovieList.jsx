import React from 'react'

const MovieList = ({ movies, isLoading, handleClickMovie, notFound }) => {
    return (
        <div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">

                {!isLoading ? (
                    movies?.map((movie) => (

                        <div
                            className="cursor-pointer group"
                            key={movie.imdbID}
                            onClick={() => handleClickMovie(movie.imdbID)}
                        >
                            <div className="overflow-hidden rounded-xl shadow-lg">
                                <img
                                    src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x445?text=No+Image"}
                                    alt={movie.Title}
                                    className="w-full h-72 object-cover group-hover:scale-105 transition"
                                />
                            </div>
                            <h3 className="mt-3 text-sm font-semibold text-center">
                                {movie.Title}
                            </h3>
                        </div>
                    ))
                ) : <div className="col-span-full text-center text-slate-400">
                    Loading movies...
                </div>}
                {notFound && !isLoading && (
                    <div className="col-span-full text-center text-slate-400">
                        No movies found.
                    </div>
                )}
            </div>
        </div>
    )
}

export default MovieList