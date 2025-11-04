import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import Input from "../component/input";
import PasswordMeter from "../component/PasswordMeter"
import { CiUser } from "react-icons/ci";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";

const SignUp: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <motion.section 
    className="bg-white p-12 rounded shadow-md w-full max-w-md"
    initial={{ opacity: 0, y : 10}}
    animate={{ opacity: 1, y: 1 }}
    transition={{
      duration: .8,
      ease: "easeInOut"
    }}
    >
      <h2 className="text-center font-bold text-4xl">Create Account</h2>
      <form className="space-y-6 mt-12">
        <Input
          icon={MdOutlineDriveFileRenameOutline}
          placeholder="Full Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          icon={CiUser}
          placeholder="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          icon={MdOutlineEmail}
          placeholder="example@example.com"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          icon={RiLockPasswordLine}
          placeholder="*******"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <PasswordMeter password={password} />

        <motion.button
          className="bg-radial from-gray-800 to-gray-950 w-full text-white font-bold text-center rounded p-3 cursor-pointer focus:outline-0 focus:ring-2 focus:ring-green-700 mt-2"
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          Sign Up
        </motion.button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-gray-700 text-sm">
          Already have account{" "}
          <Link
            to="/login"
            className="text-green-900 font-bold italic hover:underline transition duration-100"
          >
            Log In
          </Link>
        </p>
      </div>
    </motion.section>
  );
};

export default SignUp;
