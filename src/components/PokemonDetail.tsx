import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetPokemonDetailQuery } from "../store/api/pokemonApi";
import { LoadingSpinner } from "./LoadingSpinner";

export const PokemonDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    data: pokemon,
    error,
    isLoading,
  } = useGetPokemonDetailQuery(id || "");

  const handleBackClick = () => {
    navigate("/");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="mb-8">
            <LoadingSpinner size="large" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Loading Pokemon Details
          </h2>
          <p className="text-gray-600">Getting ready to explore...</p>
        </div>
      </div>
    );
  }

  if (error || !pokemon) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-12 max-w-md mx-4">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <svg
                className="w-10 h-10 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.562M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Pokemon Not Found
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              The Pokemon you're looking for doesn't exist or there was an error
              loading it. Let's go back and find another one!
            </p>
            <button onClick={handleBackClick} className="btn-gradient">
              Back to Pokemon List
            </button>
          </div>
        </div>
      </div>
    );
  }

  const getTypeColor = (typeName: string) => {
    return `type-${typeName}`;
  };

  const getStatColor = (statName: string) => {
    const statMap: Record<string, string> = {
      hp: "stat-hp",
      attack: "stat-attack",
      defense: "stat-defense",
      "special-attack": "stat-special-attack",
      "special-defense": "stat-special-defense",
      speed: "stat-speed",
    };
    return statMap[statName] || "bg-gray-500";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Enhanced Back Button */}
        <button
          onClick={handleBackClick}
          className="mb-8 group flex items-center bg-white/80 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
          <svg
            className="w-5 h-5 mr-3 text-blue-600 group-hover:text-blue-700 transition-colors"
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
          <span className="text-gray-700 font-medium group-hover:text-gray-900 transition-colors">
            Back to Pokemon List
          </span>
        </button>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden max-w-6xl mx-auto">
          {/* Enhanced Header */}
          <div className="relative">
            {/* Dynamic Background based on Pokemon types */}
            <div
              className={`${
                pokemon.types[0]
                  ? getTypeColor(pokemon.types[0].type.name)
                  : "bg-gradient-to-r from-blue-500 to-purple-600"
              } relative overflow-hidden`}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-8 left-8 w-32 h-32 bg-white/20 rounded-full"></div>
                <div className="absolute top-16 right-16 w-24 h-24 bg-white/10 rounded-full"></div>
                <div className="absolute bottom-8 left-1/4 w-16 h-16 bg-white/15 rounded-full"></div>
              </div>

              <div className="relative p-12">
                <div className="flex flex-col lg:flex-row items-center justify-between">
                  <div className="text-center lg:text-left mb-8 lg:mb-0">
                    <h1 className="text-5xl lg:text-6xl font-bold capitalize text-white mb-2 animate-fade-in-up">
                      {pokemon.name}
                    </h1>
                    <p className="text-2xl text-white/90 font-medium animate-fade-in-up">
                      #{pokemon.id.toString().padStart(3, "0")}
                    </p>

                    {/* Types */}
                    <div className="flex flex-wrap gap-3 mt-6 justify-center lg:justify-start">
                      {pokemon.types.map((type) => (
                        <span
                          key={type.slot}
                          className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white font-medium text-sm border border-white/30"
                        >
                          {type.type.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Enhanced Pokemon Image */}
                  <div className="relative">
                    <div className="w-48 h-48 lg:w-64 lg:h-64 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center shadow-2xl">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl"></div>
                      <img
                        src={pokemon.sprites.front_default || ""}
                        alt={pokemon.name}
                        className="w-40 h-40 lg:w-56 lg:h-56 object-contain relative z-10 drop-shadow-2xl animate-bounce-gentle"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Sections */}
          <div className="p-8 lg:p-12">
            {/* Basic Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 rounded-2xl shadow-lg">
                <div className="flex items-center mb-3">
                  <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center mr-4">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16V4a2 2 0 012-2h6a2 2 0 012 2v12l-5-3-5 3z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-bold text-emerald-800">Height</h3>
                </div>
                <p className="text-3xl font-bold text-emerald-900">
                  {pokemon.height / 10}m
                </p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-2xl shadow-lg">
                <div className="flex items-center mb-3">
                  <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mr-4">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                      />
                    </svg>
                  </div>
                  <h3 className="font-bold text-orange-800">Weight</h3>
                </div>
                <p className="text-3xl font-bold text-orange-900">
                  {pokemon.weight / 10}kg
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl shadow-lg">
                <div className="flex items-center mb-3">
                  <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mr-4">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-bold text-purple-800">Experience</h3>
                </div>
                <p className="text-3xl font-bold text-purple-900">
                  {pokemon.base_experience}
                </p>
              </div>
            </div>

            {/* Enhanced Stats Section */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Base Stats
              </h2>
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
                <div className="space-y-6">
                  {pokemon.stats.map((stat, index) => {
                    const maxStat = 255;
                    const percentage = (stat.base_stat / maxStat) * 100;

                    return (
                      <div
                        key={stat.stat.name}
                        className="animate-fade-in-up"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <div
                              className={`w-3 h-3 rounded-full mr-3 ${getStatColor(
                                stat.stat.name
                              )}`}
                            ></div>
                            <span className="font-semibold text-gray-800 capitalize min-w-32">
                              {stat.stat.name.replace("-", " ")}
                            </span>
                          </div>
                          <span className="text-2xl font-bold text-gray-900 min-w-16 text-right">
                            {stat.base_stat}
                          </span>
                        </div>
                        <div className="relative">
                          <div className="bg-gray-200 rounded-full h-3">
                            <div
                              className={`h-3 rounded-full transition-all duration-1000 ease-out ${getStatColor(
                                stat.stat.name
                              )}`}
                              style={{
                                width: `${percentage}%`,
                                animationDelay: `${index * 0.2}s`,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Enhanced Abilities Section */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Abilities
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pokemon.abilities.map((ability, index) => (
                  <div
                    key={ability.slot}
                    className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-scale-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-900 capitalize">
                        {ability.ability.name.replace("-", " ")}
                      </h3>
                      {ability.is_hidden && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-yellow-400 to-orange-400 text-white shadow-sm">
                          <svg
                            className="w-3 h-3 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                              clipRule="evenodd"
                            />
                            <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                          </svg>
                          Hidden
                        </span>
                      )}
                    </div>
                    <div className="text-gray-600">
                      <p className="text-sm leading-relaxed">
                        This ability {ability.is_hidden ? "is hidden and " : ""}
                        can be found in slot {ability.slot}.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
