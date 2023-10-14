import React from "react";

interface SortButtonsProps {
    selectedOption: string;
    handleSelectChange: (event: any) => void
}

const SortButtons: React.FC<SortButtonsProps> = ({ selectedOption, handleSelectChange }) => {
    return (
    <div className="flex gap-2">
      <button
        onClick={() => handleSelectChange({ target: { value: "option1" } })}
        className={`${
          selectedOption === "option1"
            ? "bg-secondary text-white"
            : "bg-gray-50 text-gray-900"
        } border border-gray-300 text-sm rounded-lg block p-2.5`}
      >
        Trier par date
      </button>
      <button
        onClick={() => handleSelectChange({ target: { value: "option2" } })}
        className={`${
          selectedOption === "option2"
            ? "bg-secondary text-white"
            : "bg-gray-50 text-gray-900"
        } border border-gray-300 text-sm rounded-lg block p-2.5`}
      >
        Trier par ordre Alphabétique
      </button>
    </div>
  );
};

export default SortButtons;
