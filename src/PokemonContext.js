import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const PokemonContext = createContext();

export function PokemonProvider({ children }) {
  const [pokemons, setPokemons] = useState([]);
  const [capturedPokemons, setCapturedPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ownedCount, setOwnedCount] = useState({});

  const fetchPokemons = async () => {
    try {
      setLoading(true);
      const batchSize = 200;
      let offset = 0;
      let allPokemons = [];

      while (true) {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${batchSize}`
        );

        const results = await Promise.all(
          response.data.results.map(async (pokemon) => {
            const pokemonDetails = await axios.get(pokemon.url);
            return pokemonDetails.data;
          })
        );

        if (results.length === 0) {
          break;
        }

        allPokemons = [...allPokemons, ...results];
        offset += batchSize;
      }

      setPokemons(allPokemons);

      setLoading(false);
    } catch (error) {
      console.log("Error Fetching Pokemon Details: ", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

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
