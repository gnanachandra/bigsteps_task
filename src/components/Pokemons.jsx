/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import PokemonCard from "./PokemonCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { getPokemonData } from "../redux/pokemon/pokemonSlice";
import Spinner from "./Spinner";
import { useEffect } from "react";

const Pokemons = ({ data }) => {
  const dispatch = useDispatch();
  const { count, presentCount, next } = useSelector((store) => store.pokemon);

  const fetchMoreData = async () => {
    if (next != null) {
      await dispatch(getPokemonData({ limit: 20 }));
    }
  };

  useEffect(() => {
    if (data.length != presentCount && next != null) {
      fetchMoreData();
    }
  }, [data]);

  
  return (
    <div style={{ minHeight: "10px" }} className="">
      {" "}
      {/* Set a minimum height */}
      <InfiniteScroll
        dataLength={data?.length}
        next={fetchMoreData}
        hasMore={next != null}
        loader={<Spinner />}
        endMessage={
          <div className="mt-5">
            <p className="text-center font-medium text-xl">
              You have reached the end !
            </p>
          </div>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 items-center justify-center mx-auto h-full">
          {data?.map((pokemon, index) => {
            return <PokemonCard key={index} pokemon={pokemon} />;
          })}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default Pokemons;
