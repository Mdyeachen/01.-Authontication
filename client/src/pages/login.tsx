import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import Input from "../component/input";
import { FaRegUserCircle } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";

const Login: React.FC = () => {
  const [user, setUser] = useState<string>();
  const [pass, setPass] = useState<string>();
  return (
    <motion.section 
    className="w-full max-w-md bg-white rounded shadow-md p-12"
    initial={{ opacity: 0, y : 10}}
    animate={{ opacity: 1, y: 1 }}
    transition={{
      duration: .8,
      ease: "easeInOut"
    }}>
      <h1 className="text-4xl font-bold text-center">Login Now</h1>
      <form className="space-y-6 mt-12">
        <Input
          icon={FaRegUserCircle}
          placeholder="Email or Username"
          type="text"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <Input
          icon={RiLockPasswordFill}
          type="password"
          placeholder="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />

        <motion.button
          className="bg-radial from-gray-800 to-gray-950 w-full text-white font-bold text-center rounded p-3 cursor-pointer focus:outline-0 focus:ring-2 focus:ring-green-700 mt-2"
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          Login
        </motion.button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-gray-700 text-sm">
          Already have account{" "}
          <Link
            to="/signup"
            className="text-green-900 font-bold italic hover:underline transition duration-100"
          >
            Log In
          </Link>
        </p>
      </div>
    </motion.section>

  );
};

export default Login;
