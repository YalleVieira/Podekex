import React, { useState, useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import SearchBar from "../SearchBar/SearchBar";
import Pagination from "../Pagination/Pagination";
import {
  getPokemmonData,
  getPokemmons,
  searchPokemon,
} from "../../service/api";

const favoritesKey = "favorites";

const Header = (props) => {
  const itemsPerPage = 25,
    { onSearch, totalPages, setTotalPages, page, setPage } = props,
    [loading, setLoading] = useState(false),
    [notFound, setNotFound] = useState(false),
    [pokemons, setPokemons] = useState([]),
    [favorites, setFavorites] = useState([]),
    [loadFavorites, setLoadFavorites] = useState(false);

  const fetchPokemons = async () => {
    try {
      setLoading(true);
      setNotFound(false);
      const data = await getPokemmons(itemsPerPage, itemsPerPage * page);
      const promises = data.results.map(async (pokemon) => {
        return await getPokemmonData(pokemon.url);
      });
      const results = await Promise.all(promises);
      console.log("total", totalPages);
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

  const onSearchHandler = async (pokemon) => {
    if (!pokemon) return fetchPokemons();
    setLoading(true);
    setNotFound(false);
    const result = await searchPokemon(pokemon);
    console.log(result);
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

  const onLeftClick = () => {
    if (page > 0) setPage(page - 1);
  };

  //   if (totalPages === 0) return setTotalPages(1);

  const onRightClick = () => {
    // if (page + 1 === totalPages) return;
    if (page + 1 !== totalPages) setPage(page + 1);
  };

  return (
    <>
      <NavBar
        favorites={favorites}
        onSearch={onSearchHandler}
        setLoadFavorites={setLoadFavorites}
        setPokemons={setPokemons}
      />
      <div className="pokedex-header">
        <div className="title-pokedex">
          <h1>Pokedex</h1>
          <SearchBar onSearch={onSearch} />
        </div>
        <Pagination
          page={page + 1}
          totalPages={totalPages}
          onLeftClick={onLeftClick}
          onRightClick={onRightClick}
        />
      </div>
    </>
  );
};

export default Header;
