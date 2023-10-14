import {ReactNode} from 'react';
import Header from '../ComposantsCommun/Header';
import Footer from '../ComposantsCommun/Footer';

type LayoutProps = {
    children: ReactNode
}

const Layout = ({children}: LayoutProps) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header/>
            <main className="flex-grow m-5">
                {children}
            </main>
            <Footer/>
        </div>
    )
}

export default Layout