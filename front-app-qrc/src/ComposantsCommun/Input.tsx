import React, {useState} from "react";

interface InputProps {
    label: string;
    placeholder?: string;
    value?: string;
    onChange: (value: string) => void;
    type: string;
    name: string;
}

const Input = ({
                   label,
                   placeholder = "",
                   value = "",
                   onChange,
                   type,
                   name
               }: InputProps) => {
    const [inputValue, setInputValue] = useState(value)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value
        setInputValue(newValue)
        onChange(newValue)
    }

    return (
        <div className="mb-4">
            <label htmlFor={label} className="block text-gray-700 font-bold mb-2">
                {label}
            </label>
            <input
                id={label}
                name={name}
                type={type}
                className="border border-gray-300 py-2 px-3 rounded-lg w-full"
                placeholder={placeholder}
                value={inputValue}
                onChange={handleInputChange}
            />
        </div>
    )
}

export default Input
