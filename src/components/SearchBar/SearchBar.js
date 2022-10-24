import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import "./SearchBar.scss";

const SearchBar = (props) => {
  const { onSearch } = props,
    [search, setSearch] = useState("");

  const onChangeHandler = (e) => {
    setSearch(e.target.value);
    if (e.target.value.length === 0) onSearch(undefined);
  };

  const onButtonClickHandler = () => {
    onSearch(search);
  };

  return (
    <div className="searchbar-container">
      <div className="searchbar">
        <input placeholder="Buscar Pokemon" onChange={onChangeHandler} />
        <button onClick={onButtonClickHandler} className="searchbar-btn">
          <AiOutlineSearch />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
