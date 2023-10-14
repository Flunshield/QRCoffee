import React from "react";
import '../StyleCss/Card.css';

interface CardProps {
    className?: string;
    children?: React.ReactNode;
}

const Card = ({className = "card", children}: CardProps) => {
    return (
        <div
            className={`rounded-lg shadow-md overflow-hidden border border-black ${className}`}
        >
            {children}
        </div>
    )
}

export default Card
