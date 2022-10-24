import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Pokemon from "../../components/Pokemon/Pokemon";
import { FavoriteProvider } from "../../context/favoriteContext";
import "./favoritePage.scss";

const favoritesKey = "favorites";

const FavoritePage = (props) => {
  const { onSearch } = props,
    [page, setPage] = useState(0),
    [totalPages, setTotalPages] = useState(0),
    [favorites, setFavorites] = useState([]);

  const loadFavoritePokemons = () => {
    const pokemons =
      JSON.parse(window.localStorage.getItem(favoritesKey)) || [];

    setFavorites(pokemons);
  };

  useEffect(() => {
    loadFavoritePokemons();
  }, []);

  const updateFavoritePokemons = (name) => {
    const updatedFavorites = [...favorites];
    const favoriteIndex = favorites.indexOf(name);

    if (favoriteIndex >= 0) updatedFavorites.splice(favoriteIndex, 1);
    else updatedFavorites.push(name);

    window.localStorage.setItem(favoritesKey, JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  return (
    <FavoriteProvider
      value={{
        favoritePokemon: favorites,
        updateFavoritesPokemons: updateFavoritePokemons,
      }}
    >
      <Header
        onSearch={onSearch}
        totalPages={totalPages}
        page={page}
        setPage={setPage}
      />
      <div className="favorite-content">
        {favorites ? (
          <div className="pokedex-grid">
            {favorites.map((pokemon) => {
              return <Pokemon pokemon={pokemon} />;
            })}
          </div>
        ) : (
          <div>Não existe pokemons favoritos.</div>
        )}
      </div>
    </FavoriteProvider>
  );
};

export default FavoritePage;
