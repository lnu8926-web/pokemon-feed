import { useState, useEffect, useRef, useCallback } from "react";
import type { Pokemon, PokemonListResponse } from "../types/pokemon";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { PokemonCard } from "./PokemonCard";

const LIMIT = 20;

interface PokemonListProps {
  searchQuery: string;
}

export function PokemonList({ searchQuery }: PokemonListProps) {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [allNames, setAllNames] = useState<{ name: string; url: string }[]>([]);
  const [searchResults, setSearchResults] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const offsetRef = useRef(0);
  const hasNextRef = useRef(true);
  const loadingRef = useRef(false);

  const fetchPokemonList = useCallback(async () => {
    if (loadingRef.current || !hasNextRef.current || searchQuery) return;

    loadingRef.current = true;
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
            types: detailData.types.map(
              (t: { type: { name: string } }) => t.type.name,
            ),
          };
        }),
      );

      setPokemonList((prev) => {
        const existingIds = new Set(prev.map((p) => p.id));
        return [...prev, ...details.filter((p) => !existingIds.has(p.id))];
      });
      hasNextRef.current = !!data.next;
      offsetRef.current += LIMIT;
    } catch (error) {
      console.error(error);
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }, [searchQuery]);

  const { ref } = useIntersectionObserver(fetchPokemonList, { threshold: 0 });

  // 배치 로드 후 sentinel이 여전히 뷰포트 안에 있으면 추가 로드
  useEffect(() => {
    if (loading || searchQuery || !hasNextRef.current) return;
    if (!ref.current) return;
    const rect = (ref.current as HTMLElement).getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      fetchPokemonList();
    }
  }, [pokemonList.length, loading, searchQuery, fetchPokemonList, ref]);

  // 전체 이름 목록 초기 로딩
  useEffect(() => {
    const fetchAllNames = async () => {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1000");
      const data: PokemonListResponse = await res.json();
      setAllNames(data.results);
    };
    fetchAllNames();
  }, []);

  // 초기 로딩
  useEffect(() => {
    fetchPokemonList();
  }, [fetchPokemonList]);

  // 검색어 변경 시 결과 초기화 + 검색 실행
  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    const filtered = allNames.filter((p) =>
      p.name.includes(searchQuery.toLowerCase()),
    );

    const fetchDetails = async () => {
      setLoading(true);
      setSearchResults([]);
      try {
        const details = await Promise.all(
          filtered.slice(0, 20).map(async (p) => {
            const detail = await fetch(p.url);
            const detailData = await detail.json();
            return {
              id: detailData.id,
              name: detailData.name,
              image: detailData.sprites.front_default,
              types: detailData.types.map(
                (t: { type: { name: string } }) => t.type.name,
              ),
            };
          }),
        );
        setSearchResults(details);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [searchQuery, allNames]);

  const displayed = searchQuery ? searchResults : pokemonList;

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
          gap: "1rem",
          padding: "1rem",
        }}
      >
        {displayed.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>

      {loading && (
        <p style={{ textAlign: "center", padding: "1rem" }}>로딩 중...</p>
      )}

      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        style={{ height: "20px" }}
      />
    </div>
  );
}
