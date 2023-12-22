import { Button } from "@material-tailwind/react";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center flex-col gap-4">
      <p>The page you have requested does not exists</p>
      <Link to={"/"} replace={true}>
        <Button className="flex items-center justify-center">
          <ArrowLeftIcon className="h-4 w-5 mr-1" />
          Back to home
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
