// Define a Set to keep track of loaded IDs
const loadedIds = new Set();

const filterPokemonData = (searchValue, dropDownValue, newData) => {

  if (searchValue === "" && dropDownValue === "all") {
    return newData;
  }

  let filteredData = newData;

  // Handle search
  if (searchValue !== "") {
    filteredData = filteredData.filter((pokemon) => {
      return pokemon.forms[0].name.toLowerCase().includes(searchValue.toLowerCase());
    });
  }

  // Handle dropdown value
  if (dropDownValue !== "all") {
    filteredData = filteredData.filter((item) => {
      return item.types.some((i) => i.type.name === dropDownValue);
    });
  }

  // Filter out duplicates based on loadedIds
  filteredData = filteredData.filter((item) => {
    if (!loadedIds.has(item.id)) {
      loadedIds.add(item.id);
      return true;
    }
    return false;
  });

  
  return filteredData;
};

export { filterPokemonData };
