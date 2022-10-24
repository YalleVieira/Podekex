import React from "react";

const TypeContext = React.createContext({
  typePokemon: [],
});

export const TypeProvider = TypeContext.Provider;

export default TypeContext;
