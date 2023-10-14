import React from "react";

interface LabelProps {
    id: string;
    htmlFor?: string;
    className?: string;
    children?: React.ReactNode;
}

const Label = ({className = "", children, id}: LabelProps) => {
    return (
        <label
            id={id}
            className={`block font-medium text-gray-700 ${className}`}
        >
            {children}
        </label>
    )
}

export default Label
 