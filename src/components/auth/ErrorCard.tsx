import { FaExclamation } from "react-icons/fa6";

import CardWrapper from "./CardWrapper";

export const ErrorCard = () => {
  return (
    <CardWrapper headerLabel="Oops! Something went wrong!" backButtonHref="/auth/login" backButtonLabel="Back to login">
      <div className="w-full flex justify-center items-center">
        <FaExclamation className="text-destructive" />
      </div>
    </CardWrapper>
  );
};
