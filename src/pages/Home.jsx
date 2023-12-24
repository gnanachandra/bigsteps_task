import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonData, getPokemonTypes } from "../redux/pokemon/pokemonSlice";

import { Input, Option, Select } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import { filterPokemonData } from "../utils/filter";

import Pokemons from "../components/Pokemons";
import PokemonCardSkeleton from "../components/skeletons/PokemonCardSkeleton";

const Home = () => {
  const dispatch = useDispatch();
  const { pokemons, pokemonTypes } = useSelector((store) => store["pokemon"]);
  const [filteredPokemonData, setFilteredPokemonData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dropDownvalue, setDropDownValue] = useState("all");

  useEffect(() => {
    dispatch(getPokemonData({ limit: 50, offset: 0 }));
    dispatch(getPokemonTypes());
  }, [dispatch]);

  useEffect(() => {
    setFilteredPokemonData(pokemons);
  }, [pokemons]);

  useEffect(() => {
    // Update filtered data when 'pokemons' changes
    const newFilteredData = filterPokemonData(
      searchTerm,
      dropDownvalue,
      pokemons
    );
    setFilteredPokemonData(newFilteredData);
  }, [pokemons, searchTerm, dropDownvalue]);

  const handleFilter = () => {
    const filteredData = filterPokemonData(searchTerm, dropDownvalue, pokemons);
    setFilteredPokemonData(filteredData);
  };

  return (
    <div className="max-w-7xl mx-auto mb-5">
      {/* search and filter */}
      <div className="my-10 flex flex-col gap-5 md:flex-row md:justify-between">
        <div className="w-72 mx-auto">
          <Input
            label="Search"
            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              handleFilter();
            }}
          />
        </div>

        <div className="w-72 mx-auto">
          <Select
            label="Select Type"
            onChange={(e) => {
              setDropDownValue(e);
              handleFilter();
            }}
            defaultValue={"all"}
          >
            {pokemonTypes?.map((type) => {
              return (
                <Option
                  key={type?.name}
                  className="capitalize"
                  value={type?.name}
                >
                  {type?.name}
                </Option>
              );
            })}
          </Select>
        </div>
      </div>
      {pokemons.length > 0 ? (
        <Pokemons data={filteredPokemonData} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 items-center justify-center mx-auto w-full h-full">
          {Array.from({ length: 12 }, (_, index) => (
            <PokemonCardSkeleton key={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
