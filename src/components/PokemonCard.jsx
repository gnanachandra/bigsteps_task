import { Card, CardBody, CardHeader, Chip } from "@material-tailwind/react";
import { backgroundColors, chipColors } from "../data/colors";
/* eslint-disable react/prop-types */
const PokemonCard = ({ pokemon, index }) => {
  return (
    <Card
      className="rounded-md mx-auto  w-[300px] lg:w-full h-full shadow-sm border border-gray-300 hover:shadow-md cursor-pointer"
      style={{ backgroundColor: backgroundColors[pokemon.types[0].type.name] }}
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
              src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${
                index + 1
              }.svg`}
              alt={pokemon.name}
              className="h-50 w-20"
              loading="lazy"
            />
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default PokemonCard;
