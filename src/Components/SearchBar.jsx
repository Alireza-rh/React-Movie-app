import React from 'react'

const SearchBar = ({ query, setQuery, handleClick }) => {
    return (
        <div>
            <header className="p-6 border-b border-slate-800">
                <h1 className="text-3xl font-bold text-center">Movie Search</h1>
                <div className="mt-6 flex justify-center gap-2">
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => e.key == "Enter" && handleClick()}
                        type="text"
                        placeholder="Search movie..."
                        className="w-72 px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    <button className="px-5 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition" onClick={handleClick}>
                        Search
                    </button>
                </div>
            </header>
        </div>
    )
}

export default SearchBar