import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const PokemonSearch = () => {
  const [search, setSearch] = useState("");
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState("");

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  
  const handleSearch = async () => {
    if (!search) return;

    try {
      setError("");
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`);
      setPokemon(response.data);
    } catch (err) {
      setError("Pokémon não encontrado!");
      setPokemon(null);
    }
  };

  return (
    <div className="pokedex-container">
      <div className="pokedex-lights"></div>
      <div className="pokedex-header">Pokédex</div>

      <input
        type="text"
        placeholder="Nome ou Número"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyDown} /* Detecta o "Enter" */
      />

      <button onClick={handleSearch}>Buscar</button>

      <div className="pokedex-screen">
        {error && <p style={{ color: "red" }}>{error}</p>}

        {pokemon && (
          <div className="pokemon-info">
            <h2>#{pokemon.id} {pokemon.name.toUpperCase()}</h2> {/* Número do Pokémon */}
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <p>Altura: {pokemon.height / 10}m</p>
            <p>Peso: {pokemon.weight / 10}kg</p>
            <p>Tipo: {pokemon.types.map((t) => t.type.name).join(", ")}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonSearch;
