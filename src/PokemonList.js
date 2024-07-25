import React, { useContext, useState } from "react";
import { PokemonContext } from "./PokemonContext";
import PokemonCard from "./PokemonCard";
import "./styles/PokemonList.css";
import "./styles/Buttons.css";
import LoadingSpinner from "./LoadingSpinner";

export default function PokemonList({ onPokemonSelect }) {
  const { pokemons, loading, ownedCount } = useContext(PokemonContext);
  const [selectedType, setSelectedType] = useState("");
  const pokemonTypes = [
    "normal",
    "fire",
    "water",
    "electric",
    "grass",
    "ice",
    "fighting",
    "poison",
    "ground",
    "flying",
    "psychic",
    "bug",
    "rock",
    "ghost",
    "dragon",
    "dark",
    "steel",
    "fairy",
  ];

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };

  const filteredPokemons = selectedType
    ? pokemons.filter((pokemon) => {
        return (
          pokemon.types &&
          pokemon.types.some((typeObj) => typeObj.type.name === selectedType)
        );
      })
    : pokemons;

  if (loading) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="pokemon-list">
      <h2>Pokemons List</h2>
      <span className="sort-by-container">
        <label className="sort-by-label">Sort By</label>
        <select
          className="sort-by-select"
          value={selectedType}
          onChange={handleTypeChange}>
          <option className="sort-by-option" value="">
            All
          </option>
          {pokemonTypes.map((type) => (
            <option className="sort-by-option" key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </span>
      <div className="cards-container">
        {filteredPokemons.map((pokemon, index) => (
          <div
            key={`${pokemon.id}-${index}`}
            onClick={() => onPokemonSelect(pokemon)}>
            <PokemonCard pokemon={pokemon} owned={ownedCount[pokemon.id]} />
          </div>
        ))}
      </div>
    </div>
  );
}
