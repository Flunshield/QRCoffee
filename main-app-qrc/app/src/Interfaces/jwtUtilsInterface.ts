import { Request } from 'express';

export interface DecodedToken {
    realm_access: {
        roles: string[]
    };
    role: string;
}

export interface RequestWithToken extends Request {
    decodedToken?: DecodedToken;
}