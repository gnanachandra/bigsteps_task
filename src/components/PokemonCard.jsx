import { Card, CardBody, CardHeader, Chip } from "@material-tailwind/react";

/* eslint-disable react/prop-types */
const PokemonCard = ({ pokemon, index }) => {
  return (
    <Card className="rounded-md mx-auto  w-[300px] lg:w-full h-full shadow-sm border border-gray-300 hover:shadow-md hover:scale-105 transition-all duration-1000 cursor-pointer ease-in-out">
      <CardHeader
        floated={false}
        shadow={false}
        className="capitalize rounded-none"
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
                  color="purple"
                  value={type.type.name}
                  className="w-fit h-fit shadow-none"
                  key={i}
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
