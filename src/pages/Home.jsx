import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonData } from "../redux/pokemon/pokemonSlice";
import PokemonCardSkeleton from "../components/skeletons/PokemonCardSkeleton";
import Pokemons from "../components/Pokemons";
import { Input, Option, Select } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { getPokemonTypes } from "../utils/getPokemonTypes";
import { filterPokemonData } from "../utils/filter";

const Home = () => {
  const dispatch = useDispatch();
  const { pokemons,presentCount } = useSelector((store) => store["pokemon"]);
  const [filteredPokemonData, setFilteredPokemonData] = useState([]);
  const [pokemonTypes, setPokemonTypes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dropDownvalue, setDropDownValue] = useState("all");
  useEffect(() => {
    dispatch(getPokemonData({ limit: 50, offset: 0 }));
  }, [dispatch]);

  useEffect(() => {
    setFilteredPokemonData(pokemons);
    setPokemonTypes(getPokemonTypes(pokemons));
  }, [pokemons]);


  const handleFilter = () => {
    const filteredData = filterPokemonData(searchTerm, dropDownvalue, pokemons);
    console.log("Filtered Data : ",filteredData)
    setFilteredPokemonData(filteredData);
  };

  return (
    <div className="max-w-7xl mx-auto mb-5">
      {/* search and filter */}
      <div className="my-10 flex flex-col gap-5 md:flex-row md:justify-between">
        <div className="w-72">
          <Input
            label="Search"
            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              handleFilter();
            }}
          />
        </div>
        
        <div className="w-72">
          <Select
            label="Select Type"
            onChange={(e) => {
              setDropDownValue(e);
              handleFilter();
            }}
            defaultValue={"all"}
            selected={"all"}
          >
            {pokemonTypes?.map((type) => {
              return (
                <Option key={type} className="capitalize" value={type}>
                  {type}
                </Option>
              );
            })}
          </Select>
        </div>
      </div>
      {pokemons.length > 0 ? (
        <Pokemons data={filterPokemonData(searchTerm,dropDownvalue,pokemons)} />
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
