import type { Pokemon } from "../types/pokemon";

const typeColors: Record<string, string> = {
  fire: "#FF9741",
  water: "#3692DC",
  grass: "#38BF4B",
  electric: "#FBD100",
  psychic: "#FF6675",
  ice: "#70CBD4",
  dragon: "#6F35FC",
  dark: "#5B5466",
  fairy: "#FC6898",
  normal: "#9FA19F",
  fighting: "#FF8000",
  flying: "#89AAE3",
  poison: "#B567CE",
  ground: "#E2BF65",
  rock: "#C9BB8A",
  bug: "#83C300",
  ghost: "#4C6AB2",
  steel: "#60A1B8",
};

interface PokemonCardProps {
  pokemon: Pokemon;
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "16px",
        border: "1.5px solid #eee",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        overflow: "hidden",
        transition: "transform 0.15s, box-shadow 0.15s",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform =
          "translateY(-4px)";
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 8px 20px rgba(0,0,0,0.1)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 2px 8px rgba(0,0,0,0.06)";
      }}
    >
      <div
        style={{
          background: "#f8f8f8",
          padding: "1.25rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "140px",
          position: "relative",
        }}
      >
        <span
          style={{
            position: "absolute",
            top: "8px",
            right: "10px",
            fontSize: "11px",
            color: "#bbb",
            fontWeight: 800,
          }}
        >
          #{String(pokemon.id).padStart(3, "0")}
        </span>
        <img
          src={pokemon.image}
          alt={pokemon.name}
          width={96}
          height={96}
          style={{ imageRendering: "pixelated" }}
        />
      </div>

      <div style={{ padding: "0.75rem", textAlign: "center" }}>
        <p
          style={{
            fontWeight: 800,
            fontSize: "14px",
            textTransform: "capitalize",
            marginBottom: "8px",
            color: "#1a1a2e",
          }}
        >
          {pokemon.name}
        </p>
        <div
          style={{
            display: "flex",
            gap: "4px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {pokemon.types.map((type) => (
            <span
              key={type}
              style={{
                padding: "2px 10px",
                borderRadius: "20px",
                fontSize: "11px",
                fontWeight: 700,
                color: "#fff",
                background: typeColors[type] ?? "#9FA19F",
                textTransform: "capitalize",
              }}
            >
              {type}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
