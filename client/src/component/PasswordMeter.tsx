import React from "react";

interface PasswordMeterProp {
  password: string;
}

const passwordCriteria = (password: string) => {
  return [
    { mess: "At Last 6 Character", res: password.length >= 6 },
    { mess: "Contain Uppercase Latter", res: /[A-Z]/.test(password) },
    { mess: "Contain Lowercase Latter", res: /[a-z]/.test(password) },
    { mess: "Contain a Number", res: /[\d]/.test(password) },
    { mess: "Contain a Special Character", res: /[^A-Za-z0-9]/.test(password) },
  ];
};

const PasswordMeter: React.FC<PasswordMeterProp> = ({ password }) => {
  const criteria = passwordCriteria(password);

  const getStrength = (pass) => {
    let num = 0;
    if(pass.length >= 6) num++;
    if(/[A-Z]/.test(pass)) num++;
    if(/[a-z]/.test(pass)) num++;
    if(/[\d]/.test(pass)) num++;
    if(/[^A-Za-z0-9]/.test(pass)) num++;
    return num
  }

  const meter = getStrength(password);
  
  return (
    <>


      <div className="space-y-1 mt-2">
        {criteria.map((c, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <span className={c.res ? "text-green-600" : "text-red-600"}>
              {c.res ? "✔" : "✖"}
            </span>
            <span>{c.mess}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default PasswordMeter;
