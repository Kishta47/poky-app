import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { config } from '../../config/environment'
import type { PokemonListResponse, PokemonDetail } from '../../types/pokemon'

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: config.baseApiUrl,
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json')
      return headers
    }
  }),
  tagTypes: ['Pokemon'],
  endpoints: (builder) => ({
    getPokemonList: builder.query<PokemonListResponse, { limit?: number; offset?: number }>({
      query: ({ limit = 20, offset = 0 }) => ({
        url: `${config.pokemonListEndpoint}?limit=${limit}&offset=${offset}`,
        method: 'GET',
      }),
      providesTags: ['Pokemon'],
      keepUnusedDataFor: 300, // Keep data for 5 minutes
    }),
    getPokemonDetail: builder.query<PokemonDetail, string | number>({
      query: (id) => ({
        url: `${config.pokemonDetailEndpoint}${id}/`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'Pokemon', id }],
      keepUnusedDataFor: 600, // Keep data for 10 minutes
    }),
  }),
})

export const { 
  useGetPokemonListQuery, 
  useGetPokemonDetailQuery,
  useLazyGetPokemonDetailQuery 
} = pokemonApi 