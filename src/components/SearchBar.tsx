import { useState, useEffect } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [input, setInput] = useState("");
  const [recentSearches, setRecentSearches] = useLocalStorage<string[]>(
    "recentSearches",
    [],
  );
  const debouncedQuery = useDebounce(input, 500);

  useEffect(() => {
    onSearch(debouncedQuery);

    if (debouncedQuery && !recentSearches.includes(debouncedQuery)) {
      setRecentSearches((prev) => [debouncedQuery, ...prev].slice(0, 5));
    }
  }, [debouncedQuery, onSearch, recentSearches, setRecentSearches]);

  return (
    <div style={{ padding: "1rem", textAlign: "center" }}>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="포켓몬 이름을 검색해보세요"
        style={{ padding: "8px", fontSize: "16px", width: "300px" }}
      />

      {recentSearches.length > 0 && (
        <div style={{ marginTop: "0.5rem" }}>
          <span style={{ fontSize: "13px", color: "#888" }}>최근 검색어: </span>
          {recentSearches.map((keyword) => (
            <button
              key={keyword}
              onClick={() => setInput(keyword)}
              style={{
                margin: "0 4px",
                padding: "2px 8px",
                borderRadius: "12px",
                border: "1px solid #ddd",
                background: "#f5f5f5",
                cursor: "pointer",
                fontSize: "13px",
              }}
            >
              {keyword}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
