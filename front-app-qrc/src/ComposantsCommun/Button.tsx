import React from "react";
import '../StyleCss/Boutton.css';

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    type: "button" | "submit" | "reset";
    className?: string;
    disabled?: boolean;
    id: string;
}

const Button = ({
                    children,
                    onClick,
                    type,
                    id,
                    className = "",
                    disabled = false, // Valeur par défaut est false
                }: ButtonProps) => {
    return (
        <div className="button-container">
            <button
                id={id}
                type={type}
                className={`${className}`}
                onClick={onClick}
                disabled={disabled} // Utilisation de la propriété disabled ici
            >
                {children}
            </button>
        </div>
    );
};

export default Button;