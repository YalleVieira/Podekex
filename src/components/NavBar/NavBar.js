import React, { useContext } from "react";
import "./NavBar.scss";
import { AiTwotoneHeart, AiFillHome } from "react-icons/ai";
import FavoriteContext from "../../context/favoriteContext";
import { useNavigate } from "react-router-dom";

const NavBar = (props) => {
  const { setLoadFavorites, onSearch, setPokemons, favorites } = props,
    navigate = useNavigate(),
    { favoritePokemon } = useContext(FavoriteContext);
  const homeNavigate = () => {
    navigate("/");
  };

  const updateFavorite = () => {
    setLoadFavorites(false);
    setPokemons(true);
    navigate("/favorite");
  };

  // const onChangeHandler = () => {
  //   favoritePokemon.map((pokemon) => {
  //     console.log(pokemon);
  //     onSearch(pokemon);
  //   });
  // };

  const logoImg =
    "https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png";

  return (
    <nav>
      <img alt="pokeapi-logo" src={logoImg} className="navbar-img" />
      <div className="navbar-home" onClick={homeNavigate}>
        <AiFillHome /> <p>Home</p>
      </div>
      <div className="content-favorite" onClick={updateFavorite}>
        <span className="favorites">
          <AiTwotoneHeart />
        </span>
        {favorites.length}
        <p>Favorite</p>
      </div>
    </nav>
  );
};

export default NavBar;
