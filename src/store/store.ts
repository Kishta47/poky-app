import { configureStore } from '@reduxjs/toolkit'
import { pokemonApi } from './api/pokemonApi'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from 'redux'

// Create a root reducer
const rootReducer = combineReducers({
  [pokemonApi.reducerPath]: pokemonApi.reducer,
})

// Configure persistence
const persistConfig = {
  key: 'pokemon-app',
  storage,
  whitelist: ['pokemonApi'], // Only persist the API cache
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(pokemonApi.middleware),
  devTools: process.env.NODE_ENV !== 'production',
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch 