import React from "react";
import '../StyleCss/Card.css';

interface CardContentProps {
    className?: string;
    children: React.ReactNode | React.ReactNode[] | Array<React.ReactNode>;
}

const CardContent = ({className = "card", children}: CardContentProps) => {
    return (
        <div className={`p-4 ${className}`}>
            {children}
        </div>
    )
}

export default CardContent
