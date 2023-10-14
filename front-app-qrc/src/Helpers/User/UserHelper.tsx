import {API_SEND_CONTACT, API_URL} from "../../Constantes/ConstantRoute"
import {Contact, SendContactResult} from "../../Interface.ts/Interface"

export function firstLetterFunction(firstName: string, lastName: string): string[] {
    const firstNameSize = firstName.length
    const lastNameSize = lastName.length
    const firstNameLetter = firstName.substring(1, 1 - firstNameSize).toLocaleUpperCase()
    const lastNameLetter = lastName.substring(1, 1 - lastNameSize).toLocaleUpperCase()
    return [firstNameLetter, lastNameLetter]
}

export async function sendContact(values: Contact): Promise<SendContactResult> {
    try {
        const response = await fetch(`${API_URL + API_SEND_CONTACT}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        });

        if (!response.ok) {
            const errorMessage = 'Une erreur s\'est produite lors de l\'envoi du mail pour la prise de contact';
            throw new Error(errorMessage);
        }

        return {success: true, statusCode: response.status};

    } catch (error: any) {
        console.error(error);
        return {success: false, statusCode: 500, message: error.message};
    }
}

