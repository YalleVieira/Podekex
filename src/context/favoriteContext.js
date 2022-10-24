import React from "react";

const FavoriteContext = React.createContext({
  favoritePokemon: [],
  updateFavoritesPokemons: (id) => null,
});

export const FavoriteProvider = FavoriteContext.Provider;

export default FavoriteContext;
