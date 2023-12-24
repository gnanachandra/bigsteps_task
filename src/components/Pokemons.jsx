/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import PokemonCard from "./PokemonCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { getPokemonData } from "../redux/pokemon/pokemonSlice";

const Pokemons = ({ data }) => {
  const dispatch = useDispatch();
  const { count } = useSelector((store) => store["pokemon"]);
  const fetchMoreData = async () => {
    await dispatch(getPokemonData({limit:50,offset:data.length}));
  };
  console.log(data)
  return (
    <InfiniteScroll
      dataLength={data.length} //This is important field to render the next data
      next={fetchMoreData}
      hasMore={data.length !== count}
      loader={<h4>Loading...</h4>}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 items-center justify-center mx-auto h-full">
        {data?.map((pokemon, index) => {
          return <PokemonCard key={index} pokemon={pokemon} index={index} />;
        })}
      </div>
    </InfiniteScroll>
  );
};

export default Pokemons;
