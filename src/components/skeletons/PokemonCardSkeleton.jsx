import { Card, CardBody, CardHeader } from "@material-tailwind/react";

const PokemonCardSkeleton = () => {
  return (
    <Card className="rounded-md mx-auto  w-[300px] lg:w-full h-full shadow-sm border border-gray-300 hover:shadow-md hover:scale-105 transition-all duration-1000 cursor-pointer ease-in-out p-3 animate-pulse sapce-y-1.5">
      <CardHeader
        floated={false}
        shadow={false}
        className="capitalize w-14 h-3 bg-gray-300 rounded"
      >{""}</CardHeader>

      <CardBody>
        <div className="flex justify-between">
          {/* Types */}
          <div className="flex flex-col gap-2">
            {Array.from([1, 2]).map((type, i) => {
              return (
                <div
                  className="w-20 h-3 shadow-none bg-gray-300 rounded"
                  key={i}
                />
              );
            })}
          </div>
          {/* Image */}
          <div className="w-20 h-20 rounded-full shadow-none bg-gray-300"></div>
        </div>
      </CardBody>
    </Card>
  );
};

export default PokemonCardSkeleton;
