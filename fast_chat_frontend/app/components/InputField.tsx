import React, { useState } from "react";
import "../globals.css";
interface InputProps {
  onInputChange: (email: string) => void;
  placeHolder: string;
  type?: string;
}

const InputField: React.FC<InputProps> = ({
  onInputChange: onChange,
  placeHolder: placeHolder,
  type: type,
}) => {
  const [text, setText] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    setText(newText);
    onChange(newText); // Call the parent callback
  };
  if (type === null) type = "input";
  return (
    <input
      type={type}
      value={text}
      onChange={handleChange}
      required
      className="text-input"
      placeholder={placeHolder}
      
    />
  );
};

export default InputField;
