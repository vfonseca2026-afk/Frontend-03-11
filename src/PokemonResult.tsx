import type { Pokemon } from './types'

interface PokemonResultProps {
  loading: boolean
  error: string | null
  data: Pokemon | null
}

function formatName(raw: string): string {
  const name = raw.replace(/-/g, ' ')
  return name.charAt(0).toUpperCase() + name.slice(1)
}

export function PokemonResult({
  loading,
  error,
  data,
}: PokemonResultProps) {
  if (loading) {
    return <p className="estado estado--cargando" role="status">Cargando Pokémon…</p>
  }

  if (error) {
    return <p className="error" role="alert">{error}</p>
  }

  if (!data) {
    return null
  }

  return (
    <article>
      <span>#{String(data.id).padStart(3, '0')}</span>

      {data.imageUrl ? (
        <img
          src={data.imageUrl}
          alt={`Imagen de ${formatName(data.name)}`}
          width="180"
          height="180"
        />
      ) : (
        <p>Imagen no disponible</p>
      )}

      <h2>{formatName(data.name)}</h2>

      <h3>Tipos</h3>
      <div className="tipos">
        {data.types.map((type) => (
          <span key={type}>{formatName(type)}</span>
        ))}
      </div>

      <h3>Habilidades</h3>
      <div className="tipos">
        {data.abilities.map((ability) => (
          <span key={ability}>{formatName(ability)}</span>
        ))}
      </div>
    </article>
  )
}
