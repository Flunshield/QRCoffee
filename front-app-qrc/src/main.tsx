import React from "react";
import * as ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {
    ROOT_CGU,
    ROOT_CREATE_QRCODE,
    ROOT_HOME,
    ROOT_LEGAL_NOTICE,
    ROOT_MY_ACCOUNT,
    ROOT_MY_CONTACT,
    ROOT_PRIVACY_POLICY,
    ROOT_QRCODE_AREA,
    ROOT_QRLOCALISATION_AREA,
    ROOT_QRVCARD_AREA,
    ROOT_SIGN_IN,
    ROOT_SIGN_UP
} from "./Constantes/ConstantRoute";
import PrivateRoute from "./Helpers/PrivateRoute";
import Account from "./View/Account";
import CGU from "./View/RGPD/CGU";
import LegalNotice from "./View/RGPD/LegalNotice";
import PrivacyPolicy from "./View/RGPD/PrivacyPolicy";
import DataArea from "./View/DataArea/DataArea";
import ErrorPage from "./View/ErrorPage";
import GenerateQrcode from "./View/GenerateQrcode";
import Home from "./View/Home";
import "./StyleCss/index.css";
import Contact from "./View/Contact";
import {ClerkProvider} from '@clerk/clerk-react';
import SignIn from "./View/SignIn";
import SignUp from "./View/SignUp";
import { frFR } from "@clerk/localizations";
const router = createBrowserRouter([
    {
        path: ROOT_HOME.code,
        element: <Home/>,
        errorElement: <ErrorPage/>,
    },
    {
        path: ROOT_CREATE_QRCODE.code,
        element: <GenerateQrcode/>,
        errorElement: <ErrorPage/>,
    },
    {
        path: ROOT_MY_CONTACT.code,
        element: <Contact/>,
        errorElement: <ErrorPage/>
    },
    {
        path: ROOT_MY_ACCOUNT.code,
        element: <PrivateRoute>
            <Account/>
        </PrivateRoute>,
        errorElement: <ErrorPage/>
    },
    {
        path: ROOT_CGU.code,
        element: <CGU/>
    },
    {
        path: ROOT_LEGAL_NOTICE.code,
        element: <LegalNotice/>
    },
    {
        path: ROOT_PRIVACY_POLICY.code,
        element: <PrivacyPolicy/>
    },
    {
        path: ROOT_QRCODE_AREA.code,
        element: <DataArea/>
    },
    {
        path: ROOT_QRVCARD_AREA.code,
        element: <DataArea/>
    },
    {
        path: ROOT_QRLOCALISATION_AREA.code,
        element: <DataArea/>
    },
    {
        path: ROOT_SIGN_IN.code,
        element: <SignIn/>
    },
    {
        path: ROOT_SIGN_UP.code,
        element: <SignUp/>
    }

])
const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)
const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
root.render(
    <ClerkProvider publishableKey={publishableKey} localization={frFR} >
        <React.StrictMode>
            <RouterProvider router={router}/>
        </React.StrictMode>
    </ClerkProvider>
)
