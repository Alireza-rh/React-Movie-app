import { useEffect, useState } from "react";
import SearchBar from "./Components/SearchBar";
import MovieList from "./Components/MovieList";
import MovieDetail from "./Components/MovieDetail";

export default function App() {
    const [movies, setMovies] = useState([]);
    const [query, setQuery] = useState("");
    const [searchName, setSearchName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [notFound, setNotFound] = useState(false);
    const [showModal, setShowModal] = useState(false)
    const [selectedID, setSelectedID] = useState()
    const [movieSelected, setMovieSelected] = useState()
    const [loadingDetail, setLoadingDetail] = useState(false)


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
            setLoadingDetail(true)
            const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${selectedID}`, { signal: controller.signal })
            const data = await response.json()
            setMovieSelected(data)
            setLoadingDetail(false)
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
            <SearchBar query={query} setQuery={setQuery} handleClick={handleClick} />

            {/* Main */}
            <main className="p-8 w-full">
                <MovieList movies={movies} isLoading={isLoading} notFound={notFound} handleClickMovie={handleClickMovie} />

                <MovieDetail movieSelected={movieSelected} showModal={showModal} setShowModal={setShowModal} loadingDetail={loadingDetail} />

            </main>
        </div>
    );
}
