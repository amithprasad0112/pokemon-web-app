import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const PokemonContext = createContext();

export function PokemonProvider({ children }) {
  const [pokemons, setPokemons] = useState([]);
  const [capturedPokemons, setCapturedPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [ownedCount, setOwnedCount] = useState({});
  const limit = 20;

  const fetchPokemons = async (offset = 0, limit = 20) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
      );
      const results = await Promise.all(
        response.data.results.map(async (pokemon) => {
          const pokemonDetails = await axios.get(pokemon.url);
          return pokemonDetails.data;
        })
      );

      setPokemons((prevPokemons) => [
        ...prevPokemons,
        ...results.filter(
          (newPokemon) =>
            !prevPokemons.some(
              (existingPokemon) => existingPokemon.id === newPokemon.id
            )
        ),
      ]);

      setLoading(false);
    } catch (error) {
      console.log("Error Fetching Pokemon Details: ", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemons(offset, limit);
  }, [offset]);

  const capturePokemon = (pokemon) => {
    setCapturedPokemons((prevCaptured) => {
      if (!prevCaptured.some((p) => p.id === pokemon.id)) {
        return [...prevCaptured, pokemon];
      }
      return prevCaptured;
    });

    setOwnedCount((prev) => ({
      ...prev,
      [pokemon.id]: (prev[pokemon.id] || 0) + 1,
    }));
  };

  const releasePokemon = (pokemon) => {
    setCapturedPokemons((prevCaptured) => {
      // Remove one instance of the pokemon
      const newCaptured = prevCaptured.filter((p) => p.id !== pokemon.id);
      if (ownedCount[pokemon.id] > 1) {
        // Add back one less instance if more than one exists
        newCaptured.push(pokemon);
      }
      return newCaptured;
    });

    setOwnedCount((prev) => {
      const newCount = (prev[pokemon.id] || 0) - 1;
      if (newCount <= 0) {
        const { [pokemon.id]: _, ...rest } = prev;
        return rest;
      }
      return {
        ...prev,
        [pokemon.id]: newCount,
      };
    });
  };

  const providerValue = {
    pokemons,
    loading,
    fetchPokemons,
    offset,
    setOffset,
    limit,
    capturedPokemons,
    capturePokemon,
    ownedCount,
    releasePokemon,
  };

  return (
    <PokemonContext.Provider value={providerValue}>
      {children}
    </PokemonContext.Provider>
  );
}
