export interface PokemonApiResponse {
  id: number
  name: string
  types: { slot: number; type: { name: string } }[]
  abilities: { is_hidden: boolean; ability: { name: string } }[]
  sprites: { front_default: string | null }
}

export interface Pokemon {
  id: number
  name: string
  types: string[]
  abilities: string[]
  imageUrl: string | null
}
