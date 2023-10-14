import "../../StyleCss/Home.css";
import '../../StyleCss/Account.css';
import LegalNoticeView from "../../Composants/RGPD/LegalNoticeView";
import Layout from "../../ComposantsCommun/Layout";

export default function LegalNotice() {

    return (
        <Layout>
            <LegalNoticeView/>
        </Layout>
    )
}