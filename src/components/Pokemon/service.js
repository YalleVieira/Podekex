export const backgrounCard = (pokemon) => {
  const types = pokemon.types.map((type) => {
    return type.type.name;
  });
  if (types.length > 0) return types[0];
  else return types;
};

export const backgrounType = (pokemon) => {
  const types = pokemon.types.map((type) => {
    return type.type.name;
  });
  return types;
};
