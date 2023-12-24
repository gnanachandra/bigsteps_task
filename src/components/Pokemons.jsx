/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import PokemonCard from "./PokemonCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { getPokemonData } from "../redux/pokemon/pokemonSlice";


const Pokemons = ({ data }) => {
  const dispatch = useDispatch();
  const { count, presentCount } = useSelector((store) => store.pokemon);

  const fetchMoreData = async () => {
    await dispatch(getPokemonData({ limit: 20 }));
  };
  console.log(data.length)
  return (
    <InfiniteScroll
      dataLength={data?.length}
      next={fetchMoreData}
      hasMore={presentCount !== count}
      endMessage={"You have reached the end"}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 items-center justify-center mx-auto h-full">
        {data?.map((pokemon, index) => {
          return <PokemonCard key={index} pokemon={pokemon} />;
        })}
      </div>
    </InfiniteScroll>
  );
};

export default Pokemons;
