import React, { useContext } from "react";
import { PokemonContext } from "./PokemonContext";
import PokemonCard from "./PokemonCard";
import "./styles/PokemonList.css";
import "./styles/Buttons.css";
import LoadingSpinner from "./LoadingSpinner";

export default function PokemonList({ onPokemonSelect }) {
  const { pokemons, loading, offset, setOffset, limit, ownedCount } =
    useContext(PokemonContext);

  const handleLoadMore = () => {
    const newOffset = offset + limit;
    setOffset(newOffset);
  };

  if (loading && offset === 0) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="pokemon-list">
      <h2>Pokemons List</h2>
      <div className="cards-container">
        {pokemons.map((pokemon, index) => (
          <div
            key={`${pokemon.id}-${index}`}
            onClick={() => onPokemonSelect(pokemon)}>
            <PokemonCard pokemon={pokemon} owned={ownedCount[pokemon.id]} />
          </div>
        ))}
      </div>
      <div className="load-more">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <button className="button" onClick={handleLoadMore}>
            Load More
          </button>
        )}
      </div>
    </div>
  );
}
