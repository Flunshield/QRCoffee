// ROUTE PAGE URL
interface RouteConfig {
    code: string;
    label: string;
}
export const ROOT_HOME: RouteConfig = {
    code: `/`,
    label: "Accueil"
}
export const ROOT_CREATE_QRCODE: RouteConfig = {
    code: `/createQrcode`,
    label: "Créer un QRCODE"
}
export const ROOT_REPPORT: RouteConfig = {
    code: `/rapport`,
    label: "Mes rapports"
}
export const ROOT_MY_CONTACT: RouteConfig = {
    code: `/contact`,
    label: "Contact"
}

export const ROOT_MY_ACCOUNT: RouteConfig = {
    code: `/monCompte`,
    label: "Mon compte"
}

export const ROOT_CGU: RouteConfig = {
    code: `/conditions-generales-utilisations`,
    label: "Conditions générales d’utilisation"
}

export const ROOT_LEGAL_NOTICE: RouteConfig = {
    code: `/mentions-legales`,
    label: "Mentions légales"
}

export const ROOT_PRIVACY_POLICY: RouteConfig = {
    code: `/politique-de-confidentialite`,
    label: "Politique de Confidentialité",
}

export const ROOT_QRCODE_AREA: RouteConfig = {
    code: `/espace-qrcode`,
    label: "Espace QrCode",
}

export const ROOT_QRVCARD_AREA: RouteConfig = {
    code: `/espace-qrvcard`,
    label: "Espace QrVcard",
}

export const ROOT_QRLOCALISATION_AREA: RouteConfig = {
    code: `/espace-qrlocalisation`,
    label: "Espace QrLocalisation",
}
export const ROOT_SIGN_IN: RouteConfig = {
    code: `/SignIn`,
    label: "Sign in",
}
export const ROOT_SIGN_UP: RouteConfig = {
    code: `/SignUp`,
    label: "Sign up",
}

export const LOGIN = "Connexion"
export const LOGOUT = "Déconnexion"

//ROUTE API
export const API_URL = import.meta.env.VITE_URL_API
export const API_PUSH_QRCODE = "/pushQrcode"
export const API_PUSH_VCARD = "/pushVcard"
export const API_PUSH_LOCATION = "/location"
export const API_PULL_QRCODE = "/getQrcode"
export const API_PULL_VCARD = "/getVcard"
export const API_PULL_LOCATION = "/getLocation"
export const API_DELETE_QRCODE = "/deleteQrcode"
export const API_DELETE_VCARD = "/deleteVcard"
export const API_DELETE_LOCATION = "/deleteLocation"
export const API_SEND_CONTACT = "/sendContact"
export const API_PULL_FILTER_VCARD_DATE ="/getVcardsFilterCreationDate"
export const API_PULL_FILTER_VCARD_ALPHA="/getVcardsFilterAlphabetically"
export const API_PULL_FILTER_QRCODE_DATE ="/getQrcodesFilterCreationDate"
export const API_PULL_FILTER_QRCODE_ALPHA ="/getQrcodesFilterAlphabetically"
export const API_PULL_FILTER_LOCATION_DATE ="/getLocationFilterCreationDate"
export const API_PULL_FILTER_LOCATION_ALPHA ="/getLocationFilterAlphabetically"