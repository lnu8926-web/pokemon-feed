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
  }, [debouncedQuery]);

  return (
    <div style={{ padding: "1.5rem 0 0.5rem", textAlign: "center" }}>
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          background: "#fff",
          border: "3px solid #1a1a2e",
          borderRadius: "50px",
          padding: "8px 16px",
          boxShadow: "3px 3px 0px #1a1a2e",
          width: "100%",
          maxWidth: "480px",
        }}
      >
        <span style={{ fontSize: "18px" }}>🔍</span>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="포켓몬 이름을 검색해보세요"
          style={{
            border: "none",
            outline: "none",
            fontSize: "15px",
            fontFamily: "'Nunito', sans-serif",
            fontWeight: 700,
            width: "100%",
            background: "transparent",
            color: "#1a1a2e",
          }}
        />
      </div>

      {recentSearches.length > 0 && (
        <div
          style={{
            marginTop: "0.75rem",
            display: "flex",
            gap: "6px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontSize: "13px",
              color: "#888",
              fontWeight: 700,
              lineHeight: "28px",
            }}
          >
            최근:
          </span>
          {recentSearches.map((keyword) => (
            <button
              key={keyword}
              onClick={() => setInput(keyword)}
              style={{
                padding: "4px 12px",
                borderRadius: "20px",
                border: "2px solid #1a1a2e",
                background: "#fff",
                cursor: "pointer",
                fontSize: "13px",
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 700,
                boxShadow: "2px 2px 0px #1a1a2e",
                color: "#1a1a2e",
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
