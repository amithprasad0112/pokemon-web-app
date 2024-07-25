import React from "react";
import "./styles/pokemoncard.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export default function PokemonCard({ pokemon, owned }) {
  if (!pokemon || !pokemon.sprites) {
    return <div>Pokemon data not available</div>;
  }

  const imageUrl =
    pokemon.sprites.other.dream_world.front_default ||
    pokemon.sprites.front_default;

  return (
    <div className="card">
      <div className="card-container">
        <div className="card-link">
          <LazyLoadImage
            src={imageUrl}
            alt={pokemon.name}
            className="card-image"
            effect="blur"
          />
          <div className="card-title">{pokemon.name}</div>
        </div>
        <div className="cards-owned-text">Owned: {owned || 0}</div>
      </div>
    </div>
  );
}
