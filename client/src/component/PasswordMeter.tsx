import React from "react";
import { RxCrossCircled } from "react-icons/rx";
import { MdOutlineCloudDone } from "react-icons/md";

interface PasswordProp {
  password: string;
}

// showing password criteria
const PasswordCriteria: React.FC<PasswordProp> = ({ password }) => {
  const criteria = [
    { mess: "At Last 6 Character", res: password.length >= 6 },
    { mess: "Contain Uppercase Latter", res: /[A-Z]/.test(password) },
    { mess: "Contain Lowercase Latter", res: /[a-z]/.test(password) },
    { mess: "Contain a Number", res: /[\d]/.test(password) },
    { mess: "Contain a Special Character", res: /[!@#$%&*?]/.test(password) },
  ];

  return (
    <>
      <div className="space-y-1 mt-2">
        {criteria.map((item, index) => (
          <div className="flex items-center gap-2" key={index}>
            <span>
              {item.res ? (
                <MdOutlineCloudDone className="text-green-700" />
              ) : (
                <RxCrossCircled className="text-red-800" />
              )}
            </span>
            <span>{item.mess}</span>
          </div>
        ))}
      </div>
    </>
  );
};

const PasswordMeter: React.FC<PasswordProp> = ({ password }) => {

    const score =
    (password.length >= 6 ? 1 : 0) +
    (/[A-Z]/.test(password) ? 1 : 0) +
    (/[a-z]/.test(password) ? 1 : 0) +
    (/\d/.test(password) ? 1 : 0) +
    (/[!@#$%&*?]/.test(password) ? 1 : 0);

  let colorAndText: [string, string, string];

  switch (score) {
    case 1:
      colorAndText = ["text-red-600", "bg-red-600", "week"];
      break;
    case 2:
      colorAndText = ["text-red-400", "bg-red-400", "Fair"];
      break;
    case 3:
      colorAndText = ["text-yellow-600", "bg-yellow-600", "Good"];
      break;
    case 4:
      colorAndText = ["text-yellow-400", "bg-yellow-400", "very Good"];
      break;
    case 5:
      colorAndText = ["text-green-600", "bg-green-600", "Strong"];
      break;
    default:
      colorAndText = ["text-gray-400", "bg-gray-400", "very week"];
  }

  return (
    <>
      <div className="flex justify-between m-0 font-semibold italic" >
        <span>Password Strength</span>
        <span className={`${colorAndText[0]}`}>{colorAndText[2]}</span>
      </div>
      <div className="py-1 flex gap-1">
        {[...Array(5)].map((_, index) => (
          <div key={index} className={`w-1/5 h-1 rounded-4xl ${colorAndText[1]}`} />
        ))}
      </div>
    </>
  );
};

// showing meater
const Password: React.FC<PasswordProp> = ({ password }) => {
  return (
    <>
      <PasswordMeter password={password} />
      <PasswordCriteria password={password} />
    </>
  );
};

export default Password;
