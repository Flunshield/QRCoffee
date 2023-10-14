import "../../StyleCss/Home.css";
import {Link} from 'react-router-dom';
import {ROOT_MY_CONTACT, ROOT_PRIVACY_POLICY} from '../../Constantes/ConstantRoute';

const CGUView = () => {

    return (
        <div className="w-[80%] mx-auto text-base">
            <div>
                <h1 className="font-bold text-xl">RÉALISATION ET HÉBERGEMENT</h1>
                <p>QRCoffee</p>
                <a href="https://qrcoffee.fr">www.qrcoffee.fr</a>
            </div>
            <br/>
            <div>
                <h1 className="font-bold text-xl">PROPRIÉTÉ INTELLECTUELLE</h1>
                <p>Tous les contenus présents sur le site (textes, images, vidéos, etc.) sont la propriété exclusive de
                    QRCoffee, sauf mention contraire. Toute reproduction, même partielle, sans autorisation préalable
                    est interdite.</p>
            </div>
            <br/>
            <div>
                <h1 className="font-bold text-xl">RESPONSABILITÉS</h1>
                <p>Nous mettons tout en œuvre pour assurer la fiabilité et l'exactitude des informations présentes sur
                    notre site. Cependant, nous ne pouvons pas garantir l'absence d'erreurs ou d'omissions. Nous
                    déclinons toute responsabilité quant à l'utilisation qui pourrait être faite des informations
                    fournies sur ce site.</p>
            </div>
            <br/>
            <div>
                <h1 className="font-bold text-xl">LIENS HYPERTEXTE</h1>
                <p>Les sites extérieurs au site de QRCoffee ayant un lien hypertexte avec le présent site ne sont pas
                    sous contrôle de QRCoffee, qui décline par conséquent toute responsabilité quant à leur contenu.
                    L'utilisateur est seul responsable de leur utilisation. La création de liens hypertextes vers le
                    site de QRCoffee est soumise à l'accord préalable de QRCoffee. Pour toute demande, vous pouvez
                    envoyer un message via le site et son formulaire de contact.</p>
            </div>
            <br/>
            <div>
                <h1 className="font-bold text-xl">COLLECTE DE DONNÉES PERSONNELLES</h1>
                <p>QRCoffee collecte des données personnelles dans le cadre de l'utilisation de notre site. Pour en
                    savoir plus sur notre politique de confidentialité et sur l'utilisation des cookies, veuillez
                    consulter notre page dédiée à la vie privée <Link className="font-semibold underline"
                                                                      to={ROOT_PRIVACY_POLICY.code}>politique de
                        confidentialité</Link>.</p>
            </div>
            <br/>
            <div>
                <h1 className="font-bold text-xl">CONTACT</h1>
                <p>Pour toute question ou demande concernant notre site ou ces mentions légales, nous vous redirigons
                    vers nôtre formulaire de <Link className="underline font-semibold"
                                                   to={ROOT_MY_CONTACT.code}>contact</Link> ou vous pouvez nous
                    contacter à l'adresse mail suivante: contact@qrcoffee.fr</p>
            </div>
            <br/>

        </div>
    )
}
export default CGUView