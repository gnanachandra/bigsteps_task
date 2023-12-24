/* eslint-disable react/prop-types */

import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Progress,
} from "@material-tailwind/react";
import { progressBarColors } from "../data/colors";

const PokemonDetail = ({ open, handleOpen, pokemon }) => {
  return (
    <>
      <Button
        onClick={handleOpen}
        variant="gradient"
        color="amber"
        className="w-fit mb-2 py-1.5 px-1.5 ml-4 text-black"
      >
        View more
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>{pokemon.name}</DialogHeader>
        <DialogBody className="w-full flex flex-col lg:flex-row justify-between items-center">
          <div className="w-[30%] flex justify-center">
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
          <div className="w-[70%] flex flex-col gap-4">
            {pokemon?.stats?.map((stat, index) => {
              return (
                <div key={index} className="">
                  <p>{stat.stat.name} - {stat.base_stat}</p>
                  <Progress
                    key={index}
                    color={progressBarColors[index % progressBarColors.length]}
                    value={stat.base_stat}
                  />
                </div>
              );
            })}
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default PokemonDetail;
