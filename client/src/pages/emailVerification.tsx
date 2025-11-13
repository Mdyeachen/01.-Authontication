import { motion } from "motion/react";
import React, { useRef, useState } from "react";
import { TbLoader } from "react-icons/tb";

const EmailVarification: React.FC = () => {
  const [code, setCode] = useState<string[]>(Array(6).fill(""));
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement[]>([]);

  // handle change function
  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const val = e.target.value;
    const newCode = [...code];
    newCode[index] = val;
    setCode(newCode);
    // focus Next Input
    if (val && index < inputRef.current.length - 1) {
      inputRef.current[index + 1].focus();
    }
  };

  // handle On key Down Function
  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    const newCode = [...code]
    // Handle Backspace & Delete
    if (e.key === "Backspace" || e.key === "Delete") {
      if (inputRef.current[index].value !== "") {
        e.preventDefault();
        newCode[index] = "";
        inputRef.current[index].value = "";
      }
      // Move to Previous Input
      else if (index > 0) {
        inputRef.current[index - 1].focus();
      }
    }
    // Handle Arrow Left
    else if (e.key === "ArrowLeft" && index > 0) {
      inputRef.current[index - 1].focus();
    }
    // Handle Arrow Right
    else if (e.key === "ArrowRight" && index < inputRef.current.length - 1) {
      inputRef.current[index + 1].focus();
    }
    // update the code state
    setCode(newCode);
  };

  // handle paste function
  const handlePaste = (
    index: number,
    e: React.ClipboardEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text");
    const pasteCode = pasteData
      .split("")
      .slice(0, inputRef.current.length - index);
    const newCode = [...code];

    pasteCode.forEach((char, i) => {
      newCode[index + i] = char;
      inputRef.current[index + i].value = char;
      
    });
    setCode(newCode);

    // focus the last pasted input
    const lastIndex = index + pasteCode.length - 1;
    if(lastIndex < inputRef.current.length) {
      inputRef.current[lastIndex + 1]?.focus();
    }
  };

  // handle Submit function
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
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
      <h1 className="text-4xl font-bold text-center">Verify Your Email</h1>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="flex justify-center gap-3">
          {code.map((_, index) => (
            <input
              key={index}
              maxLength={1}
              ref={(el) => {
                inputRef.current[index] = el!;
              }}
              value={_}
              className="w-10 h-10 rounded-lg border-0 p-2 text-center outline-2 focus:border-gray-900 focus:ring-3"
              type="text"
              placeholder="*"
              onChange={(e) => handleChange(index, e)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={(e) => handlePaste(index, e)}
              required
              disabled={isLoading}
            />
          ))}
        </div>

        <motion.button
          className="bg-radial from-gray-800 to-gray-950 w-full text-white font-bold text-center rounded p-3 cursor-pointer focus:outline-0 focus:ring-2 focus:ring-green-700 mt-2"
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          disabled={isLoading}
        >
          {isLoading ? (
            <TbLoader className="mx-auto animate-spin" />
          ) : (
            "Verify Email"
          )}
        </motion.button>
      </form>
    </motion.section>
  );
};

export default EmailVarification;
