import { BeatLoader, MoonLoader } from "react-spinners";
const Spinner = () => {
  return (
    <div className="flex w-full justify-center my-5">
      <BeatLoader size={20} color="#ff3d00" />
    </div>
  );
};

export default Spinner;
