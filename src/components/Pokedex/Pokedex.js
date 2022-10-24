import React from "react";
import "./Pokedex.scss";
import Pokemon from "../Pokemon/Pokemon";

const Pokedex = (props) => {
  const { pokemons, loading } = props;

  return (
    <div>
      {loading ? (
        <div>Carregando, segura fera...</div>
      ) : (
        <div className="pokedex-grid">
          {pokemons &&
            pokemons.map((pokemon) => {
              return <Pokemon pokemon={pokemon} />;
            })}
        </div>
      )}
    </div>
  );
};

export default Pokedex;
