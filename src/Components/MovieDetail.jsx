const MovieDetail = ({ movieSelected, showModal, setShowModal, loadingDetail }) => {
    if (!showModal) return null;

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-slate-900 rounded-2xl w-[90%] max-w-3xl p-6 relative">

                {/* Close */}
                <button
                    className="absolute top-4 right-4 text-slate-400 hover:text-white"
                    onClick={() => setShowModal(false)}
                >
                    ✕
                </button>

                {/* Loading */}
                {loadingDetail && (
                    <div className="flex flex-col items-center justify-center h-64 gap-3">
                        <div className="w-10 h-10 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin"></div>
                        <p className="text-gray-400 text-sm">Loading movie details...</p>
                    </div>
                )}

                {/* Content */}
                {!loadingDetail && movieSelected && (
                    <div className="flex flex-col md:flex-row gap-6">
                        <img
                            src={movieSelected.Poster}
                            alt="Movie Poster"
                            className="w-64 rounded-xl"
                        />
                        <div>
                            <h2 className="text-2xl font-bold mb-2">
                                {movieSelected.Title}
                            </h2>
                            <p className="text-slate-400 mb-2">
                                {movieSelected.Year} • {movieSelected.Genre}
                            </p>
                            <p className="text-slate-300 leading-relaxed">
                                {movieSelected.Plot}
                            </p>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default MovieDetail;
