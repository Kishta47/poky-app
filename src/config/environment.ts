export const config = {
  baseApiUrl: import.meta.env.VITE_BASE_API_URL || 'https://pokeapi.co/api/v2',
  pokemonListEndpoint: '/pokemon/',
  pokemonDetailEndpoint: '/pokemon/',
} as const

export type Config = typeof config 