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
    <div>
      <h1
        style={{
          textAlign: "center",
          padding: "1rem",
          position: "sticky",
          top: 0,
          background: "#fff",
          zIndex: 10,
          boxShadow:
            throttledScrollY > 0 ? "0 2px 8px rgba(0,0,0,0.1)" : "none",
          transition: "box-shadow 0.3s",
        }}
      >
        포켓몬 도감
      </h1>
      <SearchBar onSearch={setSearchQuery} />
      <PokemonList searchQuery={searchQuery} />
    </div>
  );
}

export default App;
