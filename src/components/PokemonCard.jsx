import { Card, CardBody, CardHeader, Chip } from "@material-tailwind/react";
import { backgroundColors, chipColors } from "../data/colors";
/* eslint-disable react/prop-types */
const PokemonCard = ({ pokemon }) => {
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
              src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
              alt={pokemon.name}
              className="h-50 w-20"
              loading="lazy"
              onError={(e) => {
                e.target.onerror = null; // Prevent infinite fallback loop
                e.target.src =
                  "https://storage.googleapis.com/filesharingapplication/pokeball.png"; // Replace with your default image URL
              }}
            />
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default PokemonCard;
