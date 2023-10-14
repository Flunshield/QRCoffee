import React from "react";
import { TEXT_FOOTER } from "../Constantes/Constantes";
import { Link } from 'react-router-dom';
import { ROOT_CREATE_QRCODE, ROOT_LEGAL_NOTICE, ROOT_MY_ACCOUNT, ROOT_QRCODE_AREA } from '../Constantes/ConstantRoute';
import { ROOT_MY_CONTACT } from '../Constantes/ConstantRoute';
import { ROOT_PRIVACY_POLICY } from '../Constantes/ConstantRoute';
import Diviseur from "./Diviseur";
import Button from "./Button";
import image from "../Images/Spinner.png";
import { useUser } from "@clerk/clerk-react";
import BouttonLog from "../Composants/BouttonLog";
const Footer = () => {
    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };
    const { user, isSignedIn } = useUser();
    return (
        <>
            <div className="flex justify-end m-4">
                <Button id="footerButton"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={handleScrollToTop}
                    type={"button"}
                >
                    <svg className="w-5 h-5 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                    </svg>
                </Button>
            </div>
            <footer className="relative bottom-0 w-full bg-gradient-to-b from-[#DFDFDF]  via-[#685c46] to-[#413620] text-white text-center p-20">
                <div className="flex justify-between">
                    {isSignedIn ? (
                        <>
                            <div className="flex items-center gap-4 w-1/4">
                                <Link id="ROOT_CREATE_QRCODE" to={ROOT_CREATE_QRCODE.code}><h2 className="font-bold">Créé votre QR-code</h2></Link>
                                <Link id="ROOT_QRCODE_AREA" to={ROOT_QRCODE_AREA.code}><h2 className="font-bold">Espace QR-code</h2></Link>
                                <Link id="ROOT_MY_CONTACT" to={ROOT_MY_CONTACT.code}><h2 className="font-bold">Nous Contacter</h2></Link>
                            </div>
                            <div className="flex flex-col items-center w-1/4">
                                <Link id="HOME" to="/">
                                    <img src={image} alt="logo" className="w-[120px] h-[120px]" />
                                </Link>
                                <h2 className="">Le QR-Code qui fait même le café</h2>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="flex items-center gap-4 ">
                                <Link to={ROOT_CREATE_QRCODE.code}><h2 className="font-bold">Créé votre QR-code</h2></Link>
                                <Link to={ROOT_MY_CONTACT.code}><h2 className="font-bold">Nous Contacter</h2></Link>
                            </div>
                            <div className="flex flex-col items-center ">
                                <Link to="/">
                                    <img src={image} alt="logo" className="w-[120px] h-[120px]" />
                                </Link>
                                <h2 className="">Le QR-Code qui fait même le café</h2>
                            </div>
                        </>
                    )}

                </div>
                <Diviseur />
                <div className="flex flex-col items-center font-bold">
                    <Link id="ROOT_PRIVACY_POLICY" to={ROOT_PRIVACY_POLICY.code}>Politique de confidentialité</Link>
                    <Link id="ROOT_LEGAL_NOTICE" to={ROOT_LEGAL_NOTICE.code}>Mentions légales</Link>
                </div>
                <p>{TEXT_FOOTER}</p>
            </footer>
        </>
    );
};

export default Footer;