import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { SpinnerPrimary } from '../ComposantsCommun/Spinner';
import Button from "../ComposantsCommun/Button";
import { Link } from 'react-router-dom';
import image from "../Images/Logo.svg";
import imageCheck from "../Images/check.svg";
import imageNumberOne from "../Images/number-circle-one.svg";
import imageNumberTwo from "../Images/number-circle-two.svg";
import imageNumberThree from "../Images/number-circle-three.svg";
import imagecouleur from "../Images/Couleur secondaire.png";
import imageSaveIt from "../Images/Save it.png";
import imagepict from "../Images/picture.png";
const HomeDisplay: React.FC = () => {
    const { isSignedIn, user } = useUser();
    const username = user?.username;

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const simulateLoading = () => {
            setTimeout(() => {
                setLoading(false);
            }, 2000); // Ajuster le délai au besoin
        };

        simulateLoading();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <SpinnerPrimary />
            </div>
        )
    }

    return (
        <div>
            <section className="bg-gray-100 py-20 text-center">
                <div className="flex items-center flex-col">
                    <h1 className="font-bold text-4xl">Créez vos codes QR gratuitement sur Qrcoffee</h1>
                    <p className="text-xl mt-4 max-w-xl text-center">
                        Générez, sauvegardez et réutilisez instantanément vos QR codes en quelques clics !
                    </p>
                    <Button type="button" id="redirect-to-createQrcode">
                        <Link to="/createQRcode">Créez votre QR Code</Link>
                    </Button>
                </div>
            </section>
            <section className="flex justify-between items-center py-20 text-center">

                <div className="flex items-center flex-col w-1/3">
                    <h1 className="text-2xl font-bold mb-2">Nos différences</h1>
                    <div className="block text-right">
                        <p className="text-gray-700">
                            Qr-Coffee propose une utilisation complétes de la génération de code QR.
                            Nous proposons également le stockage de vos Qrcode et leur réutilisation
                            en illimitée.
                            L'ensemble de notre site est entièrement gratuit !
                            Il vous suffit simplement de vous créer un compte pour avoir accès à toutes nos fonctionnalité
                        </p>
                    </div>
                </div>
                <div className="flex items-center justify-center w-1/3">
                    <img src={image} alt="" className="w-60 h-60 rounded-full mr-4" />
                </div>
                <div className="flex flex-col items-center w-1/3">
                    <h1 className="text-2xl font-bold mb-2">Fonctionnalité disponible </h1>
                    <ul className="list-inside text-gray-700 space-y-2">
                        <li className="flex items-center">
                            <img src={imageCheck} alt="" className="w-5 h-5 mr-2" />
                            Création illimitée de Qr-codes
                        </li>
                        <li className="flex items-center">
                            <img src={imageCheck} alt="" className="w-5 h-5 mr-2" />
                            Personnification de vos QR-Codes
                        </li>
                        <li className="flex items-center">
                            <img src={imageCheck} alt="" className="w-5 h-5 mr-2" />
                            Stockage et Réutilisation de vos Qr-codes
                        </li>
                        <li className="flex items-center">
                            <img src={imageCheck} alt="" className="w-5 h-5 mr-2" />
                            Accès Gratuit
                        </li>
                    </ul>
                </div>
            </section>

            <section className="bg-gray-100 py-20 text-center">
                <h1 className="font-bold text-4xl text-center mb-4 ">Créé et Sauvegarde vos QR-Codes</h1>
                <div className="flex items-center justify-between">

                    <div className="flex items-center flex-col w-1/3">
                        <h1 className="text-2xl font-bold ml-10  text-right">Initialisez le contenu de votre Qr-code</h1>
                        <div className="block  text-right">
                            <p className="text-gray-700">
                                Une selection multiples de catégories de QR-code:
                                Vcard, Localisation, Qrcode
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center w-1/3">
                        <div className="flex items-center flex-col">
                            <img src={imageNumberOne} alt="" className="w-16 h-16 mr-2" />
                        </div>
                    </div>
                    <div className="flex flex-col items-center w-1/3">
                        <ul className="list-inside text-gray-700 space-y-2">
                            <img src={imagecouleur} alt="" className="w-50 h-36  mr-2" ></img>
                        </ul>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center flex-col w-1/3">
                        <div className="block">
                            <img src={imageSaveIt} alt="" className=" w-50 h-36 mr-2" ></img>
                        </div>
                    </div>
                    <div className="flex items-center justify-center w-1/3">
                        <img src={imageNumberTwo} alt="" className="w-16 h-16 mr-2" ></img>
                    </div>
                    <div className="flex flex-col w-1/3">
                        <h1 className="text-2xl font-bold mr-8  text-left">Sauvegardez sur notre Base</h1>
                        <div className="block text-left ">
                            <p className="text-gray-700">
                                Conservation direct de l'intégralité de vos Qr-code
                                 de votre compte au sein de notre base de donnée sécurisé
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center flex-col w-1/3">
                        <h1 className="text-2xl font-bold mr-8  text-right">Téléchargez vos Qr-Code</h1>
                        <div className="block text-right">
                            <p className="text-gray-700">
                                Obtenez vos Qr-code dans de  multiples format mis à votre disposition (PDF,svg, png)
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center justify-center w-1/3">
                        <img src={imageNumberThree} alt="" className="w-16 h-16 mr-2" ></img>
                    </div>
                    <div className="flex flex-col items-center w-1/3">
                            <img src={imagepict} alt="" className=" w-50 h-36 mr-2 text-right" ></img>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomeDisplay;