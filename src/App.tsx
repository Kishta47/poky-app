import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './store/store'
import { ErrorBoundary } from './components/ErrorBoundary'
import { PokemonList } from './components/PokemonList'
import { PokemonDetail } from './components/PokemonDetail'
import './App.css'

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ErrorBoundary>
          <Router>
            <div className="App">
              <Routes>
                <Route path="/" element={<PokemonList />} />
                <Route path="/pokemon/:id" element={<PokemonDetail />} />
              </Routes>
            </div>
          </Router>
        </ErrorBoundary>
      </PersistGate>
    </Provider>
  )
}

export default App
