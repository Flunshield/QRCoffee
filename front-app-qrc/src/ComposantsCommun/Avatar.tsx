import React from 'react';

type AvatarProps = {
    src?: string;
    alt?: string;
    size?: number;
    bgColor?: string;
    textColor?: string;
    children?: string[];
}

const Avatar = ({
                    src,
                    alt,
                    size = 40,
                    bgColor = 'bg-gray-400',
                    textColor = 'text-white',
                    children,
                }: AvatarProps) => {
    const avatarStyle = {
        width: size,
        height: size,
    }

    return (
        <div
            className={`rounded-full ${bgColor} ${textColor} flex items-center justify-center`}
            style={avatarStyle}
        >
            {src ? (
                <img src={src} alt={alt} className="w-full h-full object-cover rounded-full"/>
            ) : (
                <span className="text-2xl font-bold">{children}</span>
            )}
        </div>
    )
}
export default Avatar
