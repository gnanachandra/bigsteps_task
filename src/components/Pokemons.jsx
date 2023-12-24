/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import PokemonCard from "./PokemonCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { getPokemonData } from "../redux/pokemon/pokemonSlice";
import Spinner from "./Spinner"

const Pokemons = ({ data }) => {
  const dispatch = useDispatch();
  const { count, presentCount, next } = useSelector((store) => store.pokemon);

  const fetchMoreData = async () => {
    if (next != null) {
      await dispatch(getPokemonData({ limit: 20 }));
    }
  };
  console.log(data.length);
  return (
    <InfiniteScroll
      dataLength={data?.length}
      next={fetchMoreData}
      hasMore={next != null}
      loader = {<Spinner/>}
      endMessage={
        <div className="mt-5">
          <p className="text-center font-medium text-xl">You have reached the end !</p>
        </div>
      }
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
