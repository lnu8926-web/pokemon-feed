import { useState, useEffect } from "react";
import { SearchBar } from "./components/SearchBar";
import { PokemonList } from "./components/PokemonList";
import { useThrottle } from "./hooks/useThrottle";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [scrollY, setScrollY] = useState(0);
  const throttledScrollY = useThrottle(scrollY, 300);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1rem" }}>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          background: "#000000",
          borderRadius: "0 0 20px 20px",
          padding: "1rem 2rem",
          boxShadow:
            throttledScrollY > 0 ? "0 4px 20px rgba(0,0,0,0.1)" : "none",
          transition: "box-shadow 0.3s",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <h1
          style={{
            fontFamily: "'Nunito', sans-serif",
            fontSize: "22px",
            fontWeight: 800,
            color: "#ffffff",
          }}
        >
          포켓몬 도감
        </h1>
      </header>

      <SearchBar onSearch={setSearchQuery} />
      <PokemonList searchQuery={searchQuery} />
    </div>
  );
}

export default App;
