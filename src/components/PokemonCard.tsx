import type { Pokemon } from "../types/pokemon";

interface PokemonCardProps {
  pokemon: Pokemon;
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <div
      style={{
        border: "1px solid #e0e0e0",
        borderRadius: "12px",
        padding: "1rem",
        textAlign: "center",
        background: "#fff",
      }}
    >
      <img src={pokemon.image} alt={pokemon.name} width={100} height={100} />
      <h3 style={{ textTransform: "capitalize", margin: "0.5rem 0" }}>
        {pokemon.name}
      </h3>
      <div style={{ display: "flex", gap: "4px", justifyContent: "center" }}>
        {pokemon.types.map((type) => (
          <span
            key={type}
            style={{
              padding: "2px 8px",
              borderRadius: "12px",
              fontSize: "12px",
              background: "#f0f0f0",
            }}
          >
            {type}
          </span>
        ))}
      </div>
    </div>
  );
}
