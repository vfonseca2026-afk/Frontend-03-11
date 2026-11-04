import type { Pokemon, PokemonApiResponse } from './types'

const API_URL = 'https://pokeapi.co/api/v2/pokemon'
const SIMULATED_DELAY_MS = 1500

function wait(ms: number, signal: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal.aborted) {
      reject(new DOMException('Petición cancelada', 'AbortError'))
      return
    }

    const timerId = setTimeout(() => {
      signal.removeEventListener('abort', handleAbort)
      resolve()
    }, ms)

    function handleAbort() {
      clearTimeout(timerId)
      reject(new DOMException('Petición cancelada', 'AbortError'))
    }

    signal.addEventListener('abort', handleAbort, { once: true })
  })
}

export async function fetchPokemon(
  query: string,
  signal: AbortSignal,
): Promise<Pokemon> {
  if (SIMULATED_DELAY_MS > 0) {
    await wait(SIMULATED_DELAY_MS, signal)
  }

  let response: Response

  try {
    response = await fetch(
      `${API_URL}/${encodeURIComponent(query)}`,
      { signal },
    )
  } catch (error: unknown) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw error
    }

    throw new Error(
      'No pudimos conectar con la PokéAPI. Revisa tu conexión a internet.',
    )
  }

  if (response.status === 404) {
    throw new Error(
      `No existe ningún Pokémon con el identificador "${query}".`,
    )
  }

  if (!response.ok) {
    throw new Error(
      `Error del servidor (HTTP ${response.status}). Intenta de nuevo.`,
    )
  }

  const raw = (await response.json()) as PokemonApiResponse

  return {
    id: raw.id,
    name: raw.name,
    types: raw.types.map(({ type }) => type.name),
    abilities: raw.abilities.map(({ ability }) => ability.name),
    imageUrl: raw.sprites.front_default,
  }
}
