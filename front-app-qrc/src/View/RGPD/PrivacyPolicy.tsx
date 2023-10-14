import "../../StyleCss/Home.css";
import '../../StyleCss/Account.css';
import PrivacyPolicyView from "../../Composants/RGPD/PrivacyPolicyView";
import Layout from "../../ComposantsCommun/Layout";

export default function PrivacyPolicy() {

    return (
        <Layout>
            <PrivacyPolicyView/>
        </Layout>
    )
}