import { useState } from 'react'
import './App.css'

const cache = new Map()

export default function App() {
  const [codigo, setCodigo] = useState('')
  const [pokemon, setPokemon] = useState(null)
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState('')

  async function buscar(event) {
    event.preventDefault()
    setError('')
    setPokemon(null)

    const valor = codigo.trim()
    const id = Number(valor)

    if (!/^\d+$/.test(valor) || !Number.isSafeInteger(id) || id < 1) {
      setError('Ingresa un código entero mayor que cero.')
      return
    }

    setCargando(true)

    try {
      let datos = cache.get(id)

      if (!datos) {
        const respuesta = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${id}/`,
          { signal: AbortSignal.timeout(15000) }
        )

        if (respuesta.status === 404) {
          throw new Error('No existe un Pokémon con ese código.')
        }

        if (!respuesta.ok) {
          throw new Error('La API no pudo responder. Intenta nuevamente.')
        }

        datos = await respuesta.json()
        cache.set(id, datos)
      }

      setPokemon(datos)
    } catch (err) {
      if (err.name === 'TimeoutError') {
        setError('La consulta tardó demasiado. Intenta nuevamente.')
      } else if (err instanceof TypeError) {
        setError('No se pudo conectar. Revisa tu conexión.')
      } else {
        setError(err.message)
      }
    } finally {
      setCargando(false)
    }
  }

  const imagen =
    pokemon?.sprites.other['official-artwork'].front_default ||
    pokemon?.sprites.front_default

  return (
    <main>
      <header>
        <span className="etiqueta">POKÉDEX</span>
        <h1>Busca tu Pokémon</h1>
        <p>Descubre un Pokémon por su código.</p>
      </header>

      <form onSubmit={buscar}>
        <label htmlFor="codigo">Código del Pokémon</label>

        <div className="controles">
          <input
            id="codigo"
            inputMode="numeric"
            value={codigo}
            onChange={(event) => setCodigo(event.target.value)}
            placeholder="Ejemplo: 25"
            disabled={cargando}
            aria-describedby="ayuda"
          />

          <button type="submit" disabled={cargando}>
            {cargando ? 'Buscando…' : 'Buscar'}
          </button>
        </div>

        <small id="ayuda">
          Prueba con 1 (Bulbasaur), 4 (Charmander) o 25 (Pikachu).
        </small>
      </form>

      <section aria-live="polite" aria-busy={cargando}>
        {cargando && <p role="status">Consultando Pokémon…</p>}

        {error && (
          <p className="error" role="alert">
            {error}
          </p>
        )}

        {!pokemon && !error && !cargando && (
          <p>Tu próxima búsqueda aparecerá aquí.</p>
        )}

        {pokemon && (
          <article>
            <span>#{String(pokemon.id).padStart(3, '0')}</span>

            {imagen ? (
              <img
                src={imagen}
                alt={pokemon.name}
                width="240"
                height="240"
              />
            ) : (
              <p>Imagen no disponible</p>
            )}

            <h2>{pokemon.name}</h2>

            <div className="tipos">
              {pokemon.types.map(({ type }) => (
                <span key={type.name}>{type.name}</span>
              ))}
            </div>

            <dl>
              <div>
                <dt>Altura</dt>
                <dd>{pokemon.height / 10} m</dd>
              </div>

              <div>
                <dt>Peso</dt>
                <dd>{pokemon.weight / 10} kg</dd>
              </div>
            </dl>
          </article>
        )}
      </section>

      <footer>
        Datos de <a href="https://pokeapi.co/">PokéAPI</a>
      </footer>
    </main>
  )
}