import { motion } from "motion/react";
import React, { useRef, useState } from "react";

const EmailVarification: React.FC = () => {
  const [code, setCode] = useState<string[]>(Array(6).fill(""));
  const inputRef = useRef([]);


  const handleChange = (index, value) => {
    console.log('index, value');
  }

  const handleKeyDown = (index, element) => {
    console.log(useRef);
    if(element.key === "Backspace" || element.key === "ArrowLeft") {
      console.log("Helo")
    }
  }

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
      <h1 className="text-4xl font-bold text-center">Verify Your Email</h1>
      <form className="mt-8 flex justify-center gap-3">
        {code.map((_, index) => (
          <input
            key={index}
            maxLength="6"
            ref={el => inputRef.current[index] = el}
            value={_}
            className="w-10 h-10 rounded-lg border-0 p-2 text-center outline-2 focus:border-gray-900 focus:ring-3"
            type="text"
            placeholder="*"
            onChange={e => handleChange(index, e.target.value)}
            onKeyDown={e => handleKeyDown(index, e)}
          />
        ))}
      </form>
    </motion.section>
  );
};

export default EmailVarification;
