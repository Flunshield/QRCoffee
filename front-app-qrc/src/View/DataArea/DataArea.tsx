import {useState} from "react"
import "../../StyleCss/Home.css"
import '../../StyleCss/Account.css'
import Tabs from "../../ComposantsCommun/Tabs"
import QrCodeAreaView from "../../Composants/DataArea/QrCodeAreaView"
import QrVcardAreaView from "../../Composants/DataArea/QrVcardAreaView"
import QrLocationView from "../../Composants/DataArea/QrLocalisationView"
import Layout from "../../ComposantsCommun/Layout"

export default function DataArea() {

    const [activeTab, setActiveTab] = useState("Espace Qrcode");

    const handleTabClick = (label: string) => {
        setActiveTab(label);
    }

    return (
        <Layout>
            <Tabs
                tabs={[
                    {
                        label: "Espace Qrcode",
                        children: <QrCodeAreaView/>,
                        active: activeTab === "Espace Qrcode",
                    },
                    {
                        label: "Espace Vcard",
                        children: <QrVcardAreaView/>,
                        active: activeTab === "Espace Vcard",
                    },
                    {
                        label: "Espace Localisation",
                        children: <QrLocationView/>,
                        active: activeTab === "Espace Localisation",
                    },
                ]}
                onTabClick={handleTabClick} // Passer la fonction de gestion du clic sur un onglet au composant Tabs
            />
        </Layout>
    );
}