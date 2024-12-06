import React, { useState } from "react";
import "../globals.css";

interface InputProps {
  onChangeState: (state: boolean) => void;
}

const Checkbox: React.FC<InputProps> = ({ onChangeState }) => {
  const [state, setState] = useState<boolean>(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = !e.target.checked;
    setState(newValue);
    onChangeState(newValue);
  };
  return (
    <div>
      <input
        id="remember_me"
        name="remember_me"
        type="checkbox"
        onChange={handleChange}
        className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
      />
    </div>
  );
};

export default Checkbox;
