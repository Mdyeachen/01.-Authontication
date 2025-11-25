import React, { useState } from "react";
import authStore from "../store/authStore.ts";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import Input from "../component/input";
import PasswordMeter from "../component/PasswordMeter";
import { CiUser } from "react-icons/ci";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { RxReload } from "react-icons/rx";
import {
  validateUsername,
  validateEmail,
  validatePassword,
  validateName,
} from "../utils/signupValidation.tsx";

const SignUp: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
  });
  const { error, isLoading, signup } = authStore();
  const navigate = useNavigate();

  // handle sign up function
  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // fontend Validation
    const usernameError = validateUsername(username);
    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    // set the errors
    setErrors({
      username: usernameError,
      name: nameError,
      email: emailError,
      password: passwordError,
    });

    // if the error occor then return
    if (usernameError || emailError || passwordError || nameError) return;

    try {
      await signup(username, name, email, password);
      navigate("/email-verify");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.section
      className="bg-white p-12 rounded shadow-md w-full max-w-md"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 1 }}
      transition={{
        duration: 0.8,
        ease: "easeInOut",
      }}
    >
      <h2 className="text-center font-bold text-4xl">Create Account</h2>
      <form className="space-y-6 mt-12" onSubmit={handleSignUp}>
        <div>
          <Input
          icon={MdOutlineDriveFileRenameOutline}
          placeholder="Full Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <p className="text-red-400 italic animate-pulse text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <Input
          icon={CiUser}
          placeholder="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {errors.username && <p className="text-red-400 italic animate-pulse text-sm mt-1">{errors.username}</p>}
        </div>

        <div>
        <Input
          icon={MdOutlineEmail}
          placeholder="example@example.com"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p className="text-red-400 italic animate-pulse text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <Input
          icon={RiLockPasswordLine}
          placeholder="*******"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <p className="text-red-400 italic animate-pulse text-sm mt-1">{errors.password}</p>}
        </div>

        <PasswordMeter password={password} />

        <motion.button
          className="bg-radial from-gray-800 to-gray-950 w-full text-white font-bold text-center rounded p-3 cursor-pointer focus:outline-0 focus:ring-2 focus:ring-green-700 mt-2"
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          disabled={isLoading}
        >
          {isLoading ? (
            <RxReload className="mx-auto animate-spin" />
          ) : (
            "Sign Up"
          )}
        </motion.button>
        {error && (
          <p className="text-red-400 italic animate-pulse text-center text-sm">
            {error}
          </p>
        )}
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
