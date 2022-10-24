import React, { useEffect, useState } from "react";
import Pokedex from "../../components/Pokedex/Pokedex";
import { FavoriteProvider } from "../../context/favoriteContext";
import {
  getPokemmonData,
  getPokemmons,
  searchPokemon,
} from "../../service/api";
import "../../GlobalStyle/GlobalStyle.scss";
import Header from "../../components/Header/Header";

const favoritesKey = "favorites";

function Home() {
  const itemsPerPage = 25,
    [page, setPage] = useState(0),
    [totalPages, setTotalPages] = useState(0),
    [loading, setLoading] = useState(false),
    [notFound, setNotFound] = useState(false),
    [pokemons, setPokemons] = useState([]),
    [favorites, setFavorites] = useState([]);

  const fetchPokemons = async () => {
    try {
      setLoading(true);
      setNotFound(false);
      const data = await getPokemmons(itemsPerPage, itemsPerPage * page);
      const promises = data.results.map(async (pokemon) => {
        return await getPokemmonData(pokemon.url);
      });
      const results = await Promise.all(promises);
      setTotalPages(Math.ceil(data.count / itemsPerPage));
      setPokemons(results);
      setLoading(false);
    } catch (error) {
      console.log("fetchPokemons error: ", error);
    }
  };

  const loadFavoritePokemons = () => {
    const pokemons =
      JSON.parse(window.localStorage.getItem(favoritesKey)) || [];

    setFavorites(pokemons);
  };

  useEffect(() => {
    loadFavoritePokemons();
  }, []);

  useEffect(() => {
    fetchPokemons();
  }, [page]);

  const updateFavoritePokemons = (name) => {
    console.log(name);
    const updatedFavorites = [...favorites];
    const favoriteIndex = favorites.indexOf(name);

    if (favoriteIndex >= 0) updatedFavorites.splice(favoriteIndex, 1);
    else updatedFavorites.push(name);

    window.localStorage.setItem(favoritesKey, JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  const onSearchHandler = async (pokemon) => {
    if (!pokemon) return fetchPokemons();
    setLoading(true);
    setNotFound(false);
    const result = await searchPokemon(pokemon);
    if (!result) {
      setLoading(false);
      setNotFound(true);
    } else {
      setPokemons([result]);
      setPage(0);
      setTotalPages(1);
    }
    setLoading(false);
  };

  return (
    <FavoriteProvider
      value={{
        favoritePokemon: favorites,
        updateFavoritesPokemons: updateFavoritePokemons,
      }}
    >
      <div className="App">
        <Header
          onSearch={onSearchHandler}
          totalPages={totalPages}
          page={page}
          setPage={setPage}
        />
        {notFound ? (
          <div className="'not-found-text">Não achei</div>
        ) : (
          <Pokedex pokemons={pokemons} loading={loading} />
        )}
      </div>
    </FavoriteProvider>
  );
}

export default Home;
