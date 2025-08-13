import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { PokemonCard } from '../PokemonCard'
import type { PokemonListItem } from '../../types/pokemon'

// Mock react-router-dom
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

const mockPokemon: PokemonListItem = {
  name: 'bulbasaur',
  url: 'https://pokeapi.co/api/v2/pokemon/1/'
}

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('PokemonCard', () => {
  beforeEach(() => {
    mockNavigate.mockClear()
  })

  it('renders pokemon name and ID correctly', () => {
    renderWithRouter(<PokemonCard pokemon={mockPokemon} />)
    
    expect(screen.getByText('bulbasaur')).toBeInTheDocument()
    expect(screen.getByText('#1')).toBeInTheDocument()
  })

  it('renders pokemon image with correct src', () => {
    renderWithRouter(<PokemonCard pokemon={mockPokemon} />)
    
    const image = screen.getByAltText('bulbasaur')
    expect(image).toHaveAttribute('src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png')
  })

  it('navigates to pokemon detail page on click', () => {
    renderWithRouter(<PokemonCard pokemon={mockPokemon} />)
    
    const card = screen.getByRole('button')
    fireEvent.click(card)
    
    expect(mockNavigate).toHaveBeenCalledWith('/pokemon/1')
  })

  it('navigates on Enter key press', () => {
    renderWithRouter(<PokemonCard pokemon={mockPokemon} />)
    
    const card = screen.getByRole('button')
    fireEvent.keyDown(card, { key: 'Enter' })
    
    expect(mockNavigate).toHaveBeenCalledWith('/pokemon/1')
  })

  it('navigates on Space key press', () => {
    renderWithRouter(<PokemonCard pokemon={mockPokemon} />)
    
    const card = screen.getByRole('button')
    fireEvent.keyDown(card, { key: ' ' })
    
    expect(mockNavigate).toHaveBeenCalledWith('/pokemon/1')
  })

  it('handles pokemon with different ID format', () => {
    const pokemonWithDifferentUrl: PokemonListItem = {
      name: 'pikachu',
      url: 'https://pokeapi.co/api/v2/pokemon/25/'
    }
    
    renderWithRouter(<PokemonCard pokemon={pokemonWithDifferentUrl} />)
    
    expect(screen.getByText('#25')).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    renderWithRouter(<PokemonCard pokemon={mockPokemon} />)
    
    const card = screen.getByRole('button')
    expect(card).toHaveAttribute('tabIndex', '0')
  })
}) 