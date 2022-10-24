import React, { useContext, useState } from "react";
import "./Pokemon.scss";
import { AiFillHeart } from "react-icons/ai";
import FavoriteContext from "../../context/favoriteContext";
import { backgrounCard } from "./service";

const Pokemon = (props) => {
  const { favoritePokemon, updateFavoritesPokemons } =
      useContext(FavoriteContext),
    [favorite, setFavorite] = useState(false),
    { pokemon } = props;

  const favoriteStyle = favoritePokemon.find((pokemonFavorite) => {
    return pokemonFavorite.id === pokemon.id;
  });

  const type = backgrounCard(pokemon);

  const onHeartClick = () => {
    setFavorite(true);
    updateFavoritesPokemons(pokemon);
  };

  return (
    <div className={`pokemon-card ${type}`}>
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon}
        className="pokemon-img"
      />
      <div className="content-card">
        <div className="header-card">
          <h3>{pokemon.name}</h3>
          <span>{pokemon.id}</span>
        </div>
        <div className="main-card">
          <div className="pokemon-type">
            {pokemon.types.map((types, index) => {
              return (
                <>
                  <div
                    key={index}
                    className={`pokemon-type-text  ${types.type.name}`}
                  >
                    {types.type.name}
                  </div>
                </>
              );
            })}
          </div>
          <div
            className={`btn-favorite ${
              favoriteStyle ? "pokemon-favorite" : ""
            }`}
          >
            <button className="pokemon-heart-btn" onClick={onHeartClick}>
              <AiFillHeart />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pokemon;
