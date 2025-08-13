import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest'
import { configureStore } from '@reduxjs/toolkit'
import { pokemonApi } from '../api/pokemonApi'
import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'

// Mock server setup
const server = setupServer(
  http.get('https://pokeapi.co/api/v2/pokemon/', () => {
    return HttpResponse.json({
      count: 151,
      next: 'https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20',
      previous: null,
      results: [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
        { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
        { name: 'venusaur', url: 'https://pokeapi.co/api/v2/pokemon/3/' }
      ]
    })
  }),
  http.get('https://pokeapi.co/api/v2/pokemon/1/', () => {
    return HttpResponse.json({
      id: 1,
      name: 'bulbasaur',
      height: 7,
      weight: 69,
      base_experience: 64,
      types: [
        { slot: 1, type: { name: 'grass', url: 'https://pokeapi.co/api/v2/type/12/' } },
        { slot: 2, type: { name: 'poison', url: 'https://pokeapi.co/api/v2/type/4/' } }
      ],
      stats: [
        { base_stat: 45, effort: 0, stat: { name: 'hp', url: 'https://pokeapi.co/api/v2/stat/1/' } },
        { base_stat: 49, effort: 0, stat: { name: 'attack', url: 'https://pokeapi.co/api/v2/stat/2/' } }
      ],
      sprites: {
        front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
        front_shiny: null,
        front_female: null,
        front_shiny_female: null,
        back_default: null,
        back_shiny: null,
        back_female: null,
        back_shiny_female: null
      },
      abilities: [
        { ability: { name: 'overgrow', url: 'https://pokeapi.co/api/v2/ability/65/' }, is_hidden: false, slot: 1 },
        { ability: { name: 'chlorophyll', url: 'https://pokeapi.co/api/v2/ability/34/' }, is_hidden: true, slot: 3 }
      ]
    })
  })
)

// Create test store
const createTestStore = () => {
  return configureStore({
    reducer: {
      [pokemonApi.reducerPath]: pokemonApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(pokemonApi.middleware),
  })
}

describe('Pokemon API', () => {
  let store: ReturnType<typeof createTestStore>

  beforeAll(() => {
    server.listen()
  })

  afterEach(() => {
    server.resetHandlers()
    store.dispatch(pokemonApi.util.resetApiState())
  })

  afterAll(() => {
    server.close()
  })

  beforeEach(() => {
    store = createTestStore()
  })

  describe('getPokemonList', () => {
    it('fetches pokemon list successfully', async () => {
      const result = await store.dispatch(
        pokemonApi.endpoints.getPokemonList.initiate({ limit: 20, offset: 0 })
      )

      expect(result.data).toEqual({
        count: 151,
        next: 'https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20',
        previous: null,
        results: [
          { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
          { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
          { name: 'venusaur', url: 'https://pokeapi.co/api/v2/pokemon/3/' }
        ]
      })
      expect(result.isSuccess).toBe(true)
    })

    it('handles pagination parameters correctly', async () => {
      server.use(
        http.get('https://pokeapi.co/api/v2/pokemon/', ({ request }) => {
          const url = new URL(request.url)
          const limit = url.searchParams.get('limit')
          const offset = url.searchParams.get('offset')
          
          expect(limit).toBe('10')
          expect(offset).toBe('20')
          
          return HttpResponse.json({
            count: 151,
            next: 'https://pokeapi.co/api/v2/pokemon/?offset=30&limit=10',
            previous: 'https://pokeapi.co/api/v2/pokemon/?offset=10&limit=10',
            results: []
          })
        })
      )

      await store.dispatch(
        pokemonApi.endpoints.getPokemonList.initiate({ limit: 10, offset: 20 })
      )
    })

    it('handles API errors gracefully', async () => {
      server.use(
        http.get('https://pokeapi.co/api/v2/pokemon/', () => {
          return new HttpResponse(null, { status: 500 })
        })
      )

      const result = await store.dispatch(
        pokemonApi.endpoints.getPokemonList.initiate({ limit: 20, offset: 0 })
      )

      expect(result.error).toBeDefined()
      expect(result.isError).toBe(true)
    })
  })

  describe('getPokemonDetail', () => {
    it('fetches pokemon detail successfully', async () => {
      const result = await store.dispatch(
        pokemonApi.endpoints.getPokemonDetail.initiate('1')
      )

      expect(result.data).toEqual({
        id: 1,
        name: 'bulbasaur',
        height: 7,
        weight: 69,
        base_experience: 64,
        types: [
          { slot: 1, type: { name: 'grass', url: 'https://pokeapi.co/api/v2/type/12/' } },
          { slot: 2, type: { name: 'poison', url: 'https://pokeapi.co/api/v2/type/4/' } }
        ],
        stats: [
          { base_stat: 45, effort: 0, stat: { name: 'hp', url: 'https://pokeapi.co/api/v2/stat/1/' } },
          { base_stat: 49, effort: 0, stat: { name: 'attack', url: 'https://pokeapi.co/api/v2/stat/2/' } }
        ],
        sprites: {
          front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
          front_shiny: null,
          front_female: null,
          front_shiny_female: null,
          back_default: null,
          back_shiny: null,
          back_female: null,
          back_shiny_female: null
        },
        abilities: [
          { ability: { name: 'overgrow', url: 'https://pokeapi.co/api/v2/ability/65/' }, is_hidden: false, slot: 1 },
          { ability: { name: 'chlorophyll', url: 'https://pokeapi.co/api/v2/ability/34/' }, is_hidden: true, slot: 3 }
        ]
      })
      expect(result.isSuccess).toBe(true)
    })

    it('handles pokemon not found', async () => {
      server.use(
        http.get('https://pokeapi.co/api/v2/pokemon/999/', () => {
          return new HttpResponse(null, { status: 404 })
        })
      )

      const result = await store.dispatch(
        pokemonApi.endpoints.getPokemonDetail.initiate('999')
      )

      expect(result.error).toBeDefined()
      expect(result.isError).toBe(true)
    })

    it('handles network errors', async () => {
      server.use(
        http.get('https://pokeapi.co/api/v2/pokemon/1/', () => {
          return HttpResponse.error()
        })
      )

      const result = await store.dispatch(
        pokemonApi.endpoints.getPokemonDetail.initiate('1')
      )

      expect(result.error).toBeDefined()
      expect(result.isError).toBe(true)
    })
  })

  describe('caching behavior', () => {
    it('caches pokemon list data', async () => {
      const result1 = await store.dispatch(
        pokemonApi.endpoints.getPokemonList.initiate({ limit: 20, offset: 0 })
      )
      
      const result2 = await store.dispatch(
        pokemonApi.endpoints.getPokemonList.initiate({ limit: 20, offset: 0 })
      )

      expect(result1.data).toEqual(result2.data)
      expect(result2.isSuccess).toBe(true)
    })

    it('caches pokemon detail data', async () => {
      const result1 = await store.dispatch(
        pokemonApi.endpoints.getPokemonDetail.initiate('1')
      )
      
      const result2 = await store.dispatch(
        pokemonApi.endpoints.getPokemonDetail.initiate('1')
      )

      expect(result1.data).toEqual(result2.data)
      expect(result2.isSuccess).toBe(true)
    })
  })
}) 