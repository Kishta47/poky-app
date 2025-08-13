import React, { useState } from "react";
import { useGetPokemonListQuery } from "../store/api/pokemonApi";
import { LoadingSpinner } from "./LoadingSpinner";
import { PokemonCard } from "./PokemonCard";

export const PokemonList: React.FC = () => {
  const [offset, setOffset] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const limit = 20;

  const { data, error, isLoading, isFetching } = useGetPokemonListQuery({
    limit,
    offset,
  });

  const filteredPokemon =
    data?.results.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  const handleNextPage = () => {
    if (data?.next) {
      setOffset((prev) => prev + limit);
    }
  };

  const handlePreviousPage = () => {
    if (data?.previous && offset > 0) {
      setOffset((prev) => Math.max(0, prev - limit));
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="mb-8">
            <LoadingSpinner size="large" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Loading Pokemon
          </h2>
          <p className="text-gray-600">Discovering amazing creatures...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-12 max-w-md mx-4">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
              <svg
                className="w-10 h-10 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Oops! Something went wrong
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              We couldn't load the Pokemon data. Please check your internet
              connection and try again.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="btn-gradient"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="relative container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6 animate-fade-in-up">
              Pokemon Explorer
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto animate-fade-in-up">
              Discover and explore the amazing world of Pokemon. Search through
              hundreds of creatures and learn about their unique abilities.
            </p>

            {/* Enhanced Search Bar */}
            <div className="max-w-md mx-auto relative animate-scale-in">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search Pokemon..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-4 text-lg border-0 rounded-2xl bg-white/80 backdrop-blur-sm shadow-xl focus:ring-4 focus:ring-blue-500/20 focus:outline-none transition-all duration-300 placeholder-gray-500"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <svg
                      className="h-5 w-5 text-gray-400 hover:text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-16">
        {/* Stats Bar */}
        {data && (
          <div className="mb-8">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="text-sm text-gray-600">
                  Showing{" "}
                  <span className="font-semibold text-gray-900">
                    {filteredPokemon.length}
                  </span>{" "}
                  Pokemon
                  {searchTerm && (
                    <span>
                      {" "}
                      matching "
                      <span className="font-semibold text-blue-600">
                        {searchTerm}
                      </span>
                      "
                    </span>
                  )}
                </div>
                <div className="text-sm text-gray-500">
                  Total: {data.count} Pokemon
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Loading indicator */}
        {isFetching && (
          <div className="flex justify-center mb-8">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
              <LoadingSpinner size="small" />
            </div>
          </div>
        )}

        {/* Pokemon Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 mb-12">
          {filteredPokemon.map((pokemon, index) => (
            <div
              key={pokemon.name}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <PokemonCard pokemon={pokemon} />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredPokemon.length === 0 && searchTerm && (
          <div className="text-center py-16">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-12 shadow-lg max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Pokemon Found
              </h3>
              <p className="text-gray-600 mb-6">
                No Pokemon match your search for "{searchTerm}"
              </p>
              <button
                onClick={() => setSearchTerm("")}
                className="btn-gradient"
              >
                Clear Search
              </button>
            </div>
          </div>
        )}

        {/* Enhanced Pagination */}
        {!searchTerm && data && (
          <div className="flex justify-center">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="flex items-center space-x-6">
                <button
                  onClick={handlePreviousPage}
                  disabled={!data?.previous || offset === 0}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 disabled:from-gray-50 disabled:to-gray-100 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 font-medium rounded-xl transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  <span>Previous</span>
                </button>

                <div className="text-center">
                  <div className="text-sm text-gray-500 mb-1">Page</div>
                  <div className="text-lg font-bold text-gray-900">
                    {Math.floor(offset / limit) + 1} of{" "}
                    {Math.ceil((data?.count || 0) / limit)}
                  </div>
                </div>

                <button
                  onClick={handleNextPage}
                  disabled={!data?.next}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-50 disabled:to-gray-100 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <span>Next</span>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
