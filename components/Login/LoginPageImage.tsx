import Image from "next/image";
import React from "react";

const LoginPageImage = () => {
  return (
    <div className="relative overflow-hidden col-span-4 hidden md:flex items-center">
      <Image
        src="/login-image.png"
        fill={true}
        alt="Login page"
        className="scale-150"
      />
    </div>
  );
};

export default LoginPageImage;
