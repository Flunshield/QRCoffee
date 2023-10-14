import "../StyleCss/Home.css";
import '../StyleCss/Account.css';
import HomeDisplay from "../Composants/HomeDisplay";
import Layout from "../ComposantsCommun/Layout";

export default function Home() {

    return (
        <Layout>
            <HomeDisplay/>
        </Layout>
    )
}