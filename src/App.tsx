// import { useState } from "react";
import { PokemonList } from "./components/PokemonList";

function App() {
  // const [searchQuery, setSearchQuery] = useState("");

  return (
    <div>
      <h1 style={{ textAlign: "center", padding: "1rem" }}>포켓몬 도감</h1>
      <PokemonList searchQuery="" />
    </div>
  );
}

export default App;
