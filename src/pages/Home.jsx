import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonData } from "../redux/pokemon/pokemonSlice";
import PokemonCard from "../components/PokemonCard";
import PokemonCardSkeleton from "../components/skeletons/PokemonCardSkeleton";

const Home = () => {
  const dispatch = useDispatch();
  const { pokemons } = useSelector((store) => store["pokemon"]);
  useEffect(() => {
    const fetchPokemonData = async () => {
      await dispatch(getPokemonData());
    };
    fetchPokemonData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto my-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 items-center justify-center mx-auto w-full h-full">
        {pokemons.length > 0
          ? pokemons?.map((item, index) => {
              return (
                <PokemonCard pokemon={item} key={index} index={index + 1} />
              );
            })
          : Array.from({ length: 12 }, (_, index) => (
              <PokemonCardSkeleton key={index} />
            ))}
      </div>
    </div>
  );
};

export default Home;
