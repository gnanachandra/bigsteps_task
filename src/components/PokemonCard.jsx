import { Card, CardBody, CardHeader, Chip } from "@material-tailwind/react";
import { backgroundColors, chipColors } from "../data/colors";
import PokemonDetail from "./PokemonDetail";
import { useState } from "react";
/* eslint-disable react/prop-types */
const PokemonCard = ({ pokemon }) => {
  const [pokemonData, setPokemonData] = useState({});
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <Card
      className="rounded-md mx-auto  w-[300px] lg:w-full h-full shadow-sm border flex flex-col justify-between border-gray-300 hover:shadow-md cursor-pointer"
      style={{ backgroundColor: backgroundColors[pokemon.types[0].type.name] }}
      onClick={() => setPokemonData(pokemon)}
    >
      <CardHeader
        floated={false}
        shadow={false}
        className="capitalize rounded-none bg-transparent text-black font-medium"
      >
        {pokemon.name}
      </CardHeader>
      <CardBody>
        <div className="flex justify-between">
          {/* Types */}
          <div className="flex flex-col gap-2">
            {pokemon.types.map((type, i) => {
              return (
                <Chip
                  value={type.type.name}
                  className="w-fit h-fit shadow-none"
                  key={i}
                  style={{
                    backgroundColor: chipColors[type.type.name] || "#212121",
                  }}
                />
              );
            })}
          </div>
          {/* Image */}
          <div>
            <img
              src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
              alt={pokemon.name}
              className="h-50 w-20"
              loading="lazy"
              onError={(e) => {
                e.target.onerror = null; // Prevent infinite fallback loop
                e.target.src =
                  "/pokeball.png"
              }}
            />
          </div>
        </div>
      </CardBody>
      <PokemonDetail
        open={open}
        handleOpen={handleOpen}
        pokemon={pokemonData}
      />
    </Card>
  );
};

export default PokemonCard;
