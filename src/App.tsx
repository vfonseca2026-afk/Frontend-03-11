import { PokemonSearch } from './PokemonSearch'
import './App.css'

export default function App() {
  return (
    <main>
      <header>
        <span className="etiqueta">POKÉDEX · SESIÓN 26</span>
        <h1>Busca tu Pokémon</h1>
        <p>Busca por número o nombre y descubre sus tipos y habilidades.</p>
      </header>

      <PokemonSearch />

      <footer>
        Datos de <a href="https://pokeapi.co/">PokéAPI</a>
      </footer>
    </main>
  )
}
