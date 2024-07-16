import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import "./styles/PokemonDetails.css";
import "./styles/PokemonTypes.css";
import "./styles/Buttons.css";
import { PokemonContext } from "./PokemonContext";

export default function PokemonDetails({ onBack }) {
  const location = useLocation();
  const { pokemon } = location.state || {};

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
  const { capturePokemon } = useContext(PokemonContext);

  const handleCapture = () => {
    capturePokemon(pokemon);
  };

  if (!pokemon) {
    return <div>No Pokémon selected</div>;
  }

  return (
    <div className="details-container">
      <button onClick={onBack} className="button">
        Back
      </button>
      <div className="details-inner-container">
        <div className="details-header">
          <img
            src={
              pokemon?.sprites?.other?.dream_world?.front_default ||
              "./media/default-image.png"
            }
            alt={pokemon?.name || "Pokemon"}
            className="header-image"
          />
          <div className="header-title">{pokemon?.name || "Unknown"}</div>
          <div className="header-type">
            {pokemon?.types?.map((type) => (
              <span key={type.slot} className={`type-${type.type.name}`}>
                {capitalize(type.type.name)}
              </span>
            )) || <span>No Types</span>}
          </div>
        </div>
        <div className="details">
          <h3>Stats</h3>
          <ul>
            {pokemon?.stats?.map((stat) => (
              <li key={stat.stat.name} className={`stat-${stat.stat.name}`}>
                <span>{stat.stat.name}</span>
                <span>{stat.base_stat}</span>
              </li>
            )) || <li>No Stats</li>}
          </ul>
        </div>
        <div className="details">
          <h3>Abilities</h3>
          <ul>
            {pokemon?.abilities?.map((ability) => (
              <li key={ability.ability.name} className="ability-item">
                {capitalize(ability.ability.name)}
              </li>
            )) || <li>No Abilities</li>}
          </ul>
        </div>
        <div className="details moves-container">
          <h3>Moves</h3>
          <div className="scrollable-list">
            <ul>
              {pokemon?.moves?.map((move) => (
                <li key={move.move.name} className="move-item">
                  {capitalize(move.move.name)}
                </li>
              )) || <li>No Moves</li>}
            </ul>
          </div>
        </div>
      </div>
      <div>
        <button className="BallButton" onClick={handleCapture}>
          <img
            src={`${process.env.PUBLIC_URL}/media/pokeball.png`}
            alt="Capture"
            className="Ball"
          />
          <span className="BallText">Capture</span>
        </button>
      </div>
    </div>
  );
}
