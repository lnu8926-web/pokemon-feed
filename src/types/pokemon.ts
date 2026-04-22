export interface Pokemon {
  id: number;
  name: string;
  image: string;
  types: string[];
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
}
