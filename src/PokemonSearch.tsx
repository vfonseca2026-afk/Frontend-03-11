import { useEffect, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { PokemonResult } from './PokemonResult'
import { fetchPokemon } from './pokemonService'
import type { Pokemon } from './types'

const DEFAULT_QUERY = '25'

export function PokemonSearch() {
  const [loading, setLoading] = useState<boolean>(true)
  const [data, setData] = useState<Pokemon | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [inputValue, setInputValue] = useState<string>(DEFAULT_QUERY)
  const [query, setQuery] = useState<string>(DEFAULT_QUERY)

  useEffect(() => {
    const controller = new AbortController()

    const fetchData = async (): Promise<void> => {
      setLoading(true)
      setError(null)

      try {
        const pokemon = await fetchPokemon(query, controller.signal)
        setData(pokemon)
      } catch (err: unknown) {
        if (controller.signal.aborted) return

        setData(null)
        setError(
          err instanceof Error
            ? err.message
            : 'Ocurrió un error inesperado.',
        )
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    void fetchData()
    return () => controller.abort()
  }, [query])

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    const nextQuery = inputValue.trim().toLowerCase()

    if (nextQuery) {
      setQuery(nextQuery)
    }
  }

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <label htmlFor="pokemon-code">Número o nombre del Pokémon</label>

        <div className="controles">
          <input
            id="pokemon-code"
            type="text"
            value={inputValue}
            onChange={handleChange}
            placeholder="Ejemplo: 25 o pikachu"
            autoComplete="off"
            required
          />
          <button type="submit">Buscar</button>
        </div>

        <small>Prueba con 1, 4, 25 o busca por nombre.</small>
      </form>

      <div aria-live="polite" aria-busy={loading}>
        <PokemonResult loading={loading} error={error} data={data} />
      </div>
    </section>
  )
}
