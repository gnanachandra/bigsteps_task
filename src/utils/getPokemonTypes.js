const getPokemonTypes = (data) => {
    const pokemonTypesSet = new Set(); 
  
    data.forEach((item) => {
      item.types.forEach((i) => {
        pokemonTypesSet.add(i.type.name); 
      });
    });
  
    const uniquePokemonTypes = Array.from(pokemonTypesSet); 
    uniquePokemonTypes.unshift("all")
    return uniquePokemonTypes;
  };
  
  export { getPokemonTypes };
  