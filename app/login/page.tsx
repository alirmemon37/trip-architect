"use client";

import Login from "@/components/Login/Login";
import SignUp from "@/components/Login/SignUp";
import { useState } from "react";

const LoginPage = () => {
  const [register, setRegister] = useState(false);

  return register ? (
    <SignUp setRegister={setRegister} />
  ) : (
    <Login setRegister={setRegister} />
  );
};

export default LoginPage;
