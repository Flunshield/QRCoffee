import {useState} from "react";
import QrcodeComposant from "../Composants/Qrcode/QrcodeComposant";
import QrcodeVcard from "../Composants/Qrcode/QrcodeVcard";
import Tabs from "../ComposantsCommun/Tabs";
import LocationQRCode from "../Composants/Qrcode/LocationQRCode";
import Layout from "../ComposantsCommun/Layout";

const GenerateQrcode = () => {
    const [activeTab, setActiveTab] = useState("Qrcode Lien");

    const handleTabClick = (label: string) => {
        setActiveTab(label);
    };

    return (
        <Layout>
            <Tabs
                tabs={[
                    {
                        label: "Qrcode Lien",
                        children: <QrcodeComposant/>,
                        active: activeTab === "Qrcode Lien",
                    },
                    {
                        label: "Qrcode Vcard",
                        children: <QrcodeVcard/>,
                        active: activeTab === "Qrcode Vcard",
                    },
                    {
                        label: "Qrcode Localisation",
                        children: <LocationQRCode/>,
                        active: activeTab === "Qrcode Localisation",
                    },
                ]}
                onTabClick={handleTabClick} // Passer la fonction de gestion du clic sur un onglet au composant Tabs
            />
        </Layout>
    );
};

export default GenerateQrcode;