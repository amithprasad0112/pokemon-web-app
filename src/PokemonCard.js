import React from "react";
import "./styles/pokemoncard.css";

export default function PokemonCard({ pokemon, owned }) {
  if (
    !pokemon ||
    !pokemon.sprites ||
    !pokemon.sprites.other ||
    !pokemon.sprites.other.dream_world
  ) {
    return <div>Pokemon data not available</div>;
  }

  return (
    <div className="card">
      <div className="card-container">
        <div className="card-link">
          <img
            src={pokemon.sprites.other.dream_world.front_default}
            alt={pokemon.name}
            className="card-image"
          />
          <div className="card-title">{pokemon.name}</div>
        </div>
        <div className="cards-owned-text">Owned: {owned || 0}</div>
      </div>
    </div>
  );
}
