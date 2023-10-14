import {ModelLocation, ModelQrcode, ModelVcard} from "../../Interface.ts/Interface";
import {
    API_DELETE_LOCATION,
    API_DELETE_QRCODE,
    API_DELETE_VCARD,
    API_PULL_LOCATION,
    API_PULL_QRCODE,
    API_PULL_VCARD,
    API_PUSH_LOCATION,
    API_PUSH_QRCODE,
    API_PUSH_VCARD,
    API_URL
} from "../../Constantes/ConstantRoute";
import {GetToken} from "@clerk/types";

export async function PushQrcode(
    getToken: GetToken,
    idClerk?: string,
    valueQrCode?: string,
    valueBackgroundColor?: string,
    valueForegroundColor?: string,
    valueErrorsLevel?: string,
    sizeQrCode?: number,
    isMargin?: boolean,
    name?: string
) {
    const data: ModelQrcode = {
        backgroundColor: valueBackgroundColor,
        foregroundColor: valueForegroundColor,
        ErrorLevel: valueErrorsLevel,
        value: valueQrCode,
        size: sizeQrCode,
        includeMargin: isMargin,
        name: name,
        idClerk: idClerk
    };

    try {
        const token = await getToken();
        await fetch(`${API_URL + API_PUSH_QRCODE}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data)
        });
    } catch (error) {
        console.error(error);
        throw new Error("Une erreur s'est produite lors de la création du QR code.");
    }
}

export async function PushVcard(
    getToken: GetToken,
    idClerk?: string,
    valueVcard?: string,
    valueBackgroundColor?: string,
    valueForegroundColor?: string,
    sizeQrCode?: number,
    isMargin?: boolean,
    name?: string,
) {
    const data: ModelVcard = {
        value: valueVcard,
        backgroundColor: valueBackgroundColor,
        foregroundColor: valueForegroundColor,
        size: sizeQrCode,
        includeMargin: isMargin,
        idClerk: idClerk,
        name: name
    };

    try {
        const token = await getToken();
        await fetch(`${API_URL + API_PUSH_VCARD}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data)
        });
    } catch (error) {
        console.error(error);
        throw new Error("Une erreur s'est produite lors de la création de la Vcard.");
    }
}


export async function PushLocation(
    getToken: GetToken,
    idClerk?: string,
    locationUrl?: string,
    sizeQrCode?: number,
    name?: string,
    valueBackgroundColor?: string,
    valueForegroundColor?: string,
) {
    const data: ModelLocation = {
        value: locationUrl,
        size: sizeQrCode,
        idClerk: idClerk,
        name: name,
        backgroundColor: valueBackgroundColor,
        foregroundColor: valueForegroundColor
    };

    try {
        const token = await getToken();
        await fetch(`${API_URL + API_PUSH_LOCATION}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data)
        });
    } catch (error) {
        console.error(error);
        throw new Error("Une erreur s'est produite lors de la création de la Vcard.");
    }
}

export async function getQrcodeById(idClerk?: string, token?: string): Promise<ModelQrcode[]> {
    try {
        const response = await fetch(`${API_URL + API_PULL_QRCODE}/${idClerk}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });

        if (!response.ok) {
            throw new Error('Une erreur s\'est produite lors de la récupération du QR code.');
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        throw new Error('Une erreur s\'est produite lors de la récupération du QR code.');
    }
}

export async function getVcardById(idClerk?: string, token?: string): Promise<ModelVcard[]> {
    try {
        const response = await fetch(`${API_URL + API_PULL_VCARD}/${idClerk}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
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

export async function getLocationById(idClerk?: string, token?: string): Promise<ModelQrcode[]> {
    try {
        const response = await fetch(`${API_URL + API_PULL_LOCATION}/${idClerk}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });

        if (!response.ok) {
            throw new Error('Une erreur s\'est produite lors de la récupération du QR code.');
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        throw new Error('Une erreur s\'est produite lors de la récupération du QR code.');
    }
}

export async function deleteQrcodeById(idClerk?: string, idQrcode?: string, token?: string): Promise<ModelQrcode[]> {
    const data: ModelQrcode = {
        idClerk: idClerk,
        _id: idQrcode
    };

    try {
        const response = await fetch(`${API_URL + API_DELETE_QRCODE}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Une erreur s\'est produite lors de la suppression du QR code.');
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        throw new Error('Une erreur s\'est produite lors de la suppression du QR code.');
    }
}

export async function deleteVcardById(idClerk?: string, idVcard?: string, token?: string): Promise<ModelVcard[]> {
    const data: ModelQrcode = {
        idClerk: idClerk,
        _id: idVcard
    };

    try {
        const response = await fetch(`${API_URL + API_DELETE_VCARD}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Une erreur s\'est produite lors de la suppression de la Vcard.');
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        throw new Error('Une erreur s\'est produite lors de la suppression de la Vcard.');
    }
}

export async function deleteLocationById(idClerk?: string, idQrcode?: string, token?: string): Promise<ModelQrcode[]> {
    const data: ModelQrcode = {
        idClerk: idClerk,
        _id: idQrcode
    };

    try {
        const response = await fetch(`${API_URL + API_DELETE_LOCATION}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Une erreur s\'est produite lors de la suppression du QR code.');
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        throw new Error('Une erreur s\'est produite lors de la suppression du QR code.');
    }
}