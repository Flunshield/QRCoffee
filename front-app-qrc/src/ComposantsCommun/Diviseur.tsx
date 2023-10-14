import React from 'react';

type DividerProps = {
    color?: string;
    thickness?: string;
    margin?: string;
}

const Divider: React.FC<DividerProps> = ({color = 'border-FFD791', thickness = 'border-t', margin = 'my-4'}) => {
    return <hr className={`${thickness} ${color} ${margin}`}/>
}

export default Divider
