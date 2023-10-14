export interface ModelQrcode extends ModelClerk {
    _id?: string;
    token?: string;
    name?: string;
    size?: number | null;
    backgroundColor?: string;
    foregroundColor?: string;
    ErrorLevel?: string;
    value?: string;
    includeMargin?: boolean;
    level?: string;
    dateCreation?: Date;
}

export interface ModelVcard extends ModelClerk, ModelQrcode {
    name?: string;
    firstName?: string;
    lastName?: string;
    job?: string;
    email?: string;
    telephone?: string;
    adresse?: string;
    interface?: string;
}

export interface ModelLocation extends ModelClerk, ModelQrcode {
    latitude?: string;
    longitude?: string;
    locationUrl?: string;
}

export interface ModelClerk {
    idClerk?: string;
}

export interface NavRoute {
    route: string;
    label?: string;
    value?: string;
    displayLink: boolean;
}

export interface Contact {
    username: string,
    email: string,
    message: string,
}

export interface SendContactResult {
    success: boolean;
    statusCode: number;
    message?: string;
}