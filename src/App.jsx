import { useEffect, useState } from "react";



export default function App() {
    const [movies, setMovies] = useState([]);
    const [query, setQuery] = useState("");
    const [searchName, setSearchName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [notFound, setNotFound] = useState(false);
    const [showModal, setShowModal] = useState(false)
    const [selectedID, setSelectedID] = useState()
    const [movieSelected, setMovieSelected] = useState()

    console.log(movieSelected)

    const apiKey = "5171d724";



    const handleClick = () => {
        if (!query) return
        setSearchName(query)
    }

    const handleClickMovie = (id) => {
        setMovieSelected(null);
        setSelectedID(id)
        setShowModal(true)

    }

    useEffect(() => {
        const controller = new AbortController();
        const fetchMovies = async () => {
            setIsLoading(true)
            const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${searchName || "batman"}`, { signal: controller.signal });
            const data = await response.json();

            if (data.Response == "False") {
                setMovies([]);
                setIsLoading(false);
                setNotFound(true);
                return;
            }
            setIsLoading(false)
            setMovies(data.Search);
        }
        fetchMovies();
    }, [searchName]);

    useEffect(() => {
        const fetchMovie = async () => {
            const controller = new AbortController();

            if (!selectedID) return
            const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${selectedID}`, { signal: controller.signal })
            const data = await response.json()
            setMovieSelected(data)
            console.log(data)
        }
        fetchMovie()
    }, [selectedID])

    useEffect(() => {
        window.addEventListener("keydown", () => {
            if (showModal) {
                setShowModal(false)
            }
        })
    })

    return (
        <div className="w-screen h-screen bg-slate-950 text-white overflow-x-hidden">
            {/* Header */}
            <header className="p-6 border-b border-slate-800">
                <h1 className="text-3xl font-bold text-center">Movie Search</h1>
                <div className="mt-6 flex justify-center gap-2">
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => e.key == "Enter" && handleClick()}
                        type="text"
                        placeholder="Search movie..."
                        className="w-72 px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-red-600"
                    />
                    <button className="px-5 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition" onClick={handleClick}>
                        Search
                    </button>
                </div>
            </header>

            {/* Main */}
            <main className="p-8 w-full">
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

                {/* Modal (hidden by default) */}
                {movieSelected && (
                    <div className={`fixed inset-0 bg-black/70 flex items-center justify-center ${showModal ? "" : "hidden"} `}>
                        <div className="bg-slate-900 rounded-2xl w-[90%] max-w-3xl p-6 relative">
                            {/* Close button */}
                            <button className="absolute top-4 right-4 text-slate-400 hover:text-white" onClick={() => setShowModal(false)}>
                                ✕
                            </button>


                            {/* Modal content */}
                            <div className="flex flex-col md:flex-row gap-6">
                                <img
                                    src={movieSelected.Poster}
                                    alt="Movie Poster"
                                    className="w-64 rounded-xl"
                                />
                                <div>
                                    <h2 className="text-2xl font-bold mb-2"> { } </h2>
                                    <p className="text-slate-400 mb-2"> {movieSelected.Year} • {movieSelected.Genre} </p>
                                    <p className="text-slate-300 leading-relaxed">
                                        {movieSelected.Plot}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </main>
        </div>
    );
}
