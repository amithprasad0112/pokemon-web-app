import { Routes, Route, useNavigate } from "react-router-dom";
import { PokemonProvider } from "./PokemonContext";
import PokemonList from "./PokemonList";
import PokemonDetails from "./PokemonDetails";
import CapturedPokemonsList from "./CapturedPokemonsList";
import CapturedPokemonDetails from "./CapturedPokemonDetails";
import "./App.css";

export default function App() {
  const navigate = useNavigate();

  const handlePokemonListSelect = (pokemon) => {
    navigate("/pokemon-details", { state: { pokemon } });
  };

  const handleCapturePokemonListSelect = (pokemon) => {
    navigate("/captured-pokemon-details", { state: { pokemon } });
  };

  const handleBackToPokemonList = () => {
    navigate("/");
  };

  const handleBackToCaptureList = () => {
    navigate("/captured-pokemons-list");
  };

  return (
    <PokemonProvider>
      <div className="App">
        <Routes>
          <Route
            path="/captured-pokemons-list"
            element={
              <CapturedPokemonsList
                onPokemonSelect={handleCapturePokemonListSelect}
              />
            }></Route>
          <Route
            path="/captured-pokemon-details"
            element={
              <CapturedPokemonDetails onBack={handleBackToCaptureList} />
            }></Route>
          <Route
            path="/pokemon-details"
            element={
              <PokemonDetails onBack={handleBackToPokemonList} />
            }></Route>
          <Route
            exact
            path="/"
            element={
              <PokemonList onPokemonSelect={handlePokemonListSelect} />
            }></Route>
        </Routes>
      </div>
    </PokemonProvider>
  );
}
