import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import Input from "../component/input";
import { FaRegUserCircle } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { TbLoader } from "react-icons/tb";

const Login: React.FC = () => {
  const [user, setUser] = useState<string>();
  const [pass, setPass] = useState<string>();
  const isLoading = false;

  // handle login submit
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <motion.section
      className="w-full max-w-md bg-white rounded shadow-md p-12"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 1 }}
      transition={{
        duration: 0.8,
        ease: "easeInOut",
      }}
    >
      <h1 className="text-4xl font-bold text-center">Login Now</h1>
      <form className="space-y-6 mt-12" onSubmit={handleLogin}>
        <Input
          icon={FaRegUserCircle}
          placeholder="Email or Username"
          type="text"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <div>
          <Input
            icon={RiLockPasswordFill}
            type="password"
            placeholder="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
          <Link
            className="text-green-900 font-bold italic hover:underline pt-3 block"
            to="/forgot-password"
          >
            Forgot Password
          </Link>
        </div>

        <motion.button
          className="bg-radial from-gray-800 to-gray-950 w-full text-white font-bold text-center rounded p-3 cursor-pointer focus:outline-0 focus:ring-2 focus:ring-green-700 mt-2"
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          disabled={isLoading}
        >
          {isLoading ? <TbLoader className="mx-auto animate-spin"/> : "Login"}
        </motion.button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-gray-700 text-sm">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-green-900 font-bold italic hover:underline transition duration-100"
          >
            Sign UP
          </Link>
        </p>
      </div>
    </motion.section>
  );
};

export default Login;
