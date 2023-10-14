import { Link } from "react-router-dom";
import React, { useState } from "react";
import BouttonLog from "../Composants/BouttonLog";
import image from "../Images/Logo_fond.svg";
import "../StyleCss/Header.css";
import { NavRoute } from "../Interface.ts/Interface";
import { ROOT_QRCODE_AREA, ROOT_SIGN_IN } from "../Constantes/ConstantRoute";
import { ROOT_HOME } from "../Constantes/ConstantRoute";
import { ROOT_CREATE_QRCODE } from "../Constantes/ConstantRoute";
import { ROOT_MY_ACCOUNT } from "../Constantes/ConstantRoute";
import { useUser } from "@clerk/clerk-react";
import BouttonProfile from "../Composants/BouttonProfile";

const Header = () => {
    const { isSignedIn, user } = useUser();
    const [showPopup, setShowPopup] = useState(false);


    const navItems: NavRoute[] = [
        {
            route: ROOT_HOME.code,
            label: ROOT_HOME.label,
            displayLink: true,
        },
        {
            route: ROOT_CREATE_QRCODE.code,
            label: ROOT_CREATE_QRCODE.label,
            displayLink: true,
        },
        {
            route: ROOT_QRCODE_AREA.code,
            label: ROOT_QRCODE_AREA.label,
            displayLink: isSignedIn ?? false,
        },
        {
            route: ROOT_SIGN_IN.code,
            label: ROOT_SIGN_IN.label,
            displayLink: false,
        },

    ]

    const NavList = () => (
        <ul className="list">
        {navItems.map(
            (item) =>
                item.displayLink && (
                    <li key={item.route}>
                        <Link
                            to={item.route}
                            className="Btn"
                            onClick={() => setShowPopup(false)}
                        >
                            {item.label}
                        </Link>
                    </li>
                )
        )}
    </ul>
    )

    return (
        <header className="appBar">
            <div className="Composant">
            
            
                <div>
                    <Link to="/">
                        <img src={image} alt="logo" className="logo" />
                    </Link>
                </div>
    
                {showPopup ? (
                    <div className="fixed top-14 right-0 bg-black p-2 rounded shadow">
                        <NavList />
                        <BouttonProfile />
                    </div>
                ): (
                    <div className="Composant">
                    <NavList />
                    <BouttonProfile />
                    </div>
                )}
            </div>
        </header>
    );
}

export default Header
