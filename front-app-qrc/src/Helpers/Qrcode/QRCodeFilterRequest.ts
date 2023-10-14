import { ModelLocation, ModelVcard } from "../../Interface.ts/Interface";
import { ModelQrcode } from "../../Interface.ts/Interface";
import {
    API_PULL_FILTER_LOCATION_ALPHA,
    API_PULL_FILTER_LOCATION_DATE,
    API_PULL_FILTER_QRCODE_ALPHA,
    API_PULL_FILTER_QRCODE_DATE,
    API_PULL_FILTER_VCARD_ALPHA,
    API_PULL_FILTER_VCARD_DATE,
    API_URL
} from "../../Constantes/ConstantRoute";

export async function getVcardFilterDate(idClerk?: string, token?: string): Promise<ModelVcard[]> {
    try {
        const response = await fetch(`${API_URL + API_PULL_FILTER_VCARD_DATE}/${idClerk}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Une erreur s\'est produite lors de la récupération de la Vcard.');
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        throw new Error('Une erreur s\'est produite lors de la récupération de la Vcard.');
    }
}

export async function getVcardFilterAlpha(idClerk?: string, token?: string): Promise<ModelVcard[]> {
    try {
        const response = await fetch(`${API_URL + API_PULL_FILTER_VCARD_ALPHA}/${idClerk}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Une erreur s\'est produite lors de la récupération de la Vcard.');
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        throw new Error('Une erreur s\'est produite lors de la récupération de la Vcard.');
    }
}

export async function getQrcodeFilterDate(idClerk?: string, token?: string): Promise<ModelQrcode[]> {
    try {
        const response = await fetch(`${API_URL + API_PULL_FILTER_QRCODE_DATE}/${idClerk}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Une erreur s\'est produite lors de la récupération de la Vcard.');
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        throw new Error('Une erreur s\'est produite lors de la récupération de la Vcard.');
    }
}

export async function getQrcodeFilterAlpha(idClerk?: string, token?: string): Promise<ModelQrcode[]> {
    try {
        const response = await fetch(`${API_URL + API_PULL_FILTER_QRCODE_ALPHA}/${idClerk}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Une erreur s\'est produite lors de la récupération de la Vcard.');
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        throw new Error('Une erreur s\'est produite lors de la récupération de la Vcard.');
    }
}

export async function getLocationFilterDate(idClerk?: string, token?: string): Promise<ModelLocation[]> {
    try {
        const response = await fetch(`${API_URL + API_PULL_FILTER_LOCATION_DATE}/${idClerk}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response.json();
    } catch (error) {
        console.error(error);
        throw new Error('Une erreur s\'est produite lors de la récupération de la Vcard.');
    }
}

export async function getLocationFilterAlpha(idClerk?: string, token?: string): Promise<ModelLocation[]> {
    try {
        const response = await fetch(`${API_URL + API_PULL_FILTER_LOCATION_ALPHA}/${idClerk}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Une erreur s\'est produite lors de la récupération de la Location.');
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        throw new Error('Une erreur s\'est produite lors de la récupération de la Location.');
    }
}