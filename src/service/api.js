export const searchPokemon = async (pokemon) => {
  try {
    const pokemonLowCase = pokemon.toLowerCase();
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemonLowCase}`;
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.log("error: ", error);
  }
};

export const getPokemmons = async (limit = 50, offset = 0) => {
  try {
    let url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.log("error: ", error);
  }
};

export const getPokemmonData = async (url) => {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.log("error: ", error);
  }
};
