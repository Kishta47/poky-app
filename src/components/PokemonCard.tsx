import React from "react";
import { useNavigate } from "react-router-dom";
import type { PokemonListItem } from "../types/pokemon";

interface PokemonCardProps {
  pokemon: PokemonListItem;
}

export const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const navigate = useNavigate();

  // Extract Pokemon ID from URL
  const pokemonId = pokemon.url.split("/").filter(Boolean).pop();

  const handleClick = () => {
    navigate(`/pokemon/${pokemonId}`);
  };

  return (
    <div
      onClick={handleClick}
      className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:scale-105 hover:-translate-y-2 border border-white/20 overflow-hidden card-hover"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      {/* Pokemon Image Container */}
      <div className="relative">
        <div className="w-full h-48 bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-200 to-purple-200"></div>
            <div className="absolute top-4 right-4 w-16 h-16 bg-white/30 rounded-full"></div>
            <div className="absolute bottom-4 left-4 w-8 h-8 bg-white/20 rounded-full"></div>
          </div>

          {pokemonId && (
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
              alt={pokemon.name}
              className="w-32 h-32 object-contain relative z-10 group-hover:scale-110 transition-transform duration-300 drop-shadow-lg"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
                const fallback = target.nextElementSibling as HTMLElement;
                fallback?.classList.remove("hidden");
              }}
            />
          )}

          {/* Fallback Icon */}
          <div className="hidden text-gray-400 text-6xl relative z-10">
            <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        {/* Pokemon ID Badge */}
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/90 text-gray-700 shadow-sm">
            #{pokemonId}
          </span>
        </div>
      </div>

      {/* Pokemon Info */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 capitalize text-center group-hover:text-blue-600 transition-colors duration-300">
          {pokemon.name}
        </h3>

        {/* Explore Button */}
        <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="text-center">
            <span className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg">
              Click to explore
              <svg
                className="ml-2 w-4 h-4"
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
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
