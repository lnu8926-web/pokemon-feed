import { useState, useEffect, useRef } from "react";
import type { Pokemon, PokemonListResponse } from "../types/pokemon";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { PokemonCard } from "./PokemonCard";

const LIMIT = 20;

interface PokemonListProps {
  searchQuery: string;
}

export function PokemonList({ searchQuery }: PokemonListProps) {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const offsetRef = useRef(0);
  const hasNextRef = useRef(true);

  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 1.0 });

  const fetchPokemonList = async () => {
    if (loading || !hasNextRef.current) return;
    setLoading(true);

    try {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${LIMIT}&offset=${offsetRef.current}`,
      );
      const data: PokemonListResponse = await res.json();

      const details = await Promise.all(
        data.results.map(async (p) => {
          const detail = await fetch(p.url);
          const detailData = await detail.json();
          return {
            id: detailData.id,
            name: detailData.name,
            image: detailData.sprites.front_default,
            types: detailData.types.map((t: { type: { name: string } }) => t.type.name),
          };
        }),
      );

      setPokemonList((prev) => [...prev, ...details]);
      hasNextRef.current = !!data.next;
      offsetRef.current += LIMIT;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // 초기 로딩
  useEffect(() => {
    fetchPokemonList();
  }, []);

  // 무한스크롤 트리거
  useEffect(() => {
    if (isIntersecting) {
      fetchPokemonList();
    }
  }, [isIntersecting]);

  const filtered = searchQuery
    ? pokemonList.filter((p) => p.name.includes(searchQuery.toLowerCase()))
    : pokemonList;

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
          gap: "1rem",
          padding: "1rem",
        }}
      >
        {filtered.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>

      {loading && <p style={{ textAlign: "center" }}>로딩 중...</p>}

      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        style={{ height: "20px" }}
      />
    </div>
  );
}
