import React, { useContext } from "react";
import { PokemonContext } from "./PokemonContext";
import PokemonCard from "./PokemonCard";

export default function CapturedPokemonsList({ onPokemonSelect }) {
  const { capturedPokemons, ownedCount } = useContext(PokemonContext);

  return (
    <div className="captured-pokemon-list">
      <h2>Captured Pokemons</h2>
      <div className="cards-container">
        {capturedPokemons.length > 0 ? (
          capturedPokemons.map((pokemon, index) => (
            <div
              key={`${pokemon.id}-${index}`}
              onClick={() => onPokemonSelect(pokemon)}>
              <PokemonCard pokemon={pokemon} owned={ownedCount[pokemon.id]} />
            </div>
          ))
        ) : (
          <div> You Have No Pokemons Yet! </div>
        )}
      </div>
    </div>
  );
}
