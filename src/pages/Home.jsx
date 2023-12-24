import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonData } from "../redux/pokemon/pokemonSlice";
import PokemonCardSkeleton from "../components/skeletons/PokemonCardSkeleton";
import Pokemons from "../components/Pokemons";

const Home = () => {
  const dispatch = useDispatch();
  const { pokemons } = useSelector((store) => store["pokemon"]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      await dispatch(getPokemonData({ limit: 50, offset: 0 }));
    };
    fetchPokemonData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto pt-10">
      {pokemons.length > 0 ? (
        <Pokemons data={pokemons} />
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
