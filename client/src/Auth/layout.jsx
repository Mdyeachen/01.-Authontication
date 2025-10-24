import React from "react";
import RoundShape from "./utils/RoundShape";

const AuthLayout = () => {
  return (
    <>
      <div className="bg-radial from-[rgb(0,216,86)] from-10% to-[rgb(0,161,83)] min-h-screen relative flex justify-center items-center">
        <RoundShape
          size="h-[10rem] w-[10rem]"
          position="-top-5 left-10"
          delay="0"
        />

        {/* <RoundShape
          size="h-[5rem] w-[5rem]"
          position="top-50% -left-5"
          delay="20"
        />

        <RoundShape
          size="h-[20rem] w-[20rem]"
          position="bottom-40 right-100"
          delay="0"
        /> */}
      </div>
    </>
  );
};

export default AuthLayout;
