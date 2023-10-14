import {ModelVcard, Qrcode} from "../Interfaces/QrcodeInterface";
import {MongoClient, ObjectId} from "mongodb";
import {dbName, nomCollectionLocation, nomCollectionQrcode, nomCollectionVcard, uri} from "../Constante/Route";

export async function pushQrcode(data: Qrcode) {
    const document = {
        idClerk: data.idClerk,
        name: data.name,
        backgroundColor: data.backgroundColor,
        foregroundColor: data.foregroundColor,
        errorLevel: data.ErrorLevel,
        value: data.value,
        size: data.size,
        includeMargin: data.includeMargin,
        dateCreation: new Date(),
    };
    const client = await MongoClient.connect(uri);
    const db = client.db(dbName);
    const collection = db.collection(nomCollectionQrcode);
    await collection.insertOne(document);
    await client.close();
}

export async function pushVcard(data: ModelVcard) {
    const document = {
        name: data.name,
        idClerk: data.idClerk,
        backgroundColor: data.backgroundColor,
        foregroundColor: data.foregroundColor,
        value: data.value,
        size: data.size,
        includeMargin: data.includeMargin,
        dateCreation: new Date(),
    };
    const client = await MongoClient.connect(uri);
    const db = client.db(dbName);
    const collection = db.collection(nomCollectionVcard);
    await collection.insertOne(document);
    await client.close();
}

export async function pushLocation(data: Qrcode): Promise<void> {
    const document = {
        idClerk: data.idClerk,
        backgroundColor: data.backgroundColor,
        foregroundColor: data.foregroundColor,
        value: data.value,
        size: data.size,
        name: data.name,
        dateCreation: new Date(),
    };
    const client = await MongoClient.connect(uri);
    const db = client.db(dbName);
    const collection = db.collection(nomCollectionLocation);
    await collection.insertOne(document);
    await client.close();
}

export async function getAllQrcodes() {
    const client = await MongoClient.connect(uri);
    const db = client.db(dbName);
    const collection = db.collection(nomCollectionQrcode);
    const qrcodes = await collection.find().toArray();
    await client.close();
    if (qrcodes.length > 0) {
        return qrcodes;
    } else {
        throw new Error("Qrcode not found.");
    }
}

export async function getQrcodeById(userId: string) {
    const data = userId;
    const client = await MongoClient.connect(uri);
    const db = client.db(dbName);
    const collection = db.collection(nomCollectionQrcode);
    const qrcodes = await collection.find({"idClerk": data}).toArray();
    await client.close();
    if (qrcodes.length > 0) {
        return qrcodes;
    } else {
        return [];
    }
}

export async function getVcardById(userId: string) {
    const data = userId;
    const client = await MongoClient.connect(uri);
    const db = client.db(dbName);
    const collection = db.collection(nomCollectionVcard);
    const vCard = await collection.find({"idClerk": data}).toArray();
    await client.close();
    if (vCard.length > 0) {
        return vCard;
    } else {
        return [];
    }
}

export async function getLocationById(userId: string) {
    const data = userId;
    const client = await MongoClient.connect(uri);
    const db = client.db(dbName);
    const collection = db.collection(nomCollectionLocation);
    const location = await collection.find({"idClerk": data}).toArray();
    await client.close();
    if (location.length > 0) {
        return location;
    } else {
        return [];
    }
}

export async function deleteQrcode(data: Qrcode) {
    const document = {
        idClerk: data.idClerk,
        idQrcode: data._id
    };
    const objectId = new ObjectId(document.idQrcode);
    const client = await MongoClient.connect(uri);
    const db = client.db(dbName);
    const collection = db.collection(nomCollectionQrcode);

    // Vérifie si le document existe dans la collection
    const existingDocument = await collection.findOne({$and: [{"_id": objectId}, {"idClerk": document.idClerk}]});
    if (!existingDocument) {
        return null;
    }

    // Supprime le document et attend la fin de la suppression
    await collection.deleteOne({$and: [{"_id": objectId}, {"idClerk": document.idClerk}]});
}

export async function deleteVcard(data: ModelVcard) {
    const document = {
        idClerk: data.idClerk,
        idVcard: data._id
    };
    const objectId = new ObjectId(document.idVcard);
    const client = await MongoClient.connect(uri);
    const db = client.db(dbName);
    const collection = db.collection(nomCollectionVcard);

    // Vérifie si le document existe dans la collection
    const existingDocument = await collection.findOne({$and: [{"_id": objectId}, {"idClerk": document.idClerk}]});
    if (!existingDocument) {
        return null;
    }

    // Supprime le document et attend la fin de la suppression
    await collection.deleteOne({$and: [{"_id": objectId}, {"idClerk": document.idClerk}]});
}

export async function deleteLocation(data: Qrcode) {
    const document = {
        idClerk: data.idClerk,
        idQrcode: data._id
    };
    const objectId = new ObjectId(document.idQrcode);
    const client = await MongoClient.connect(uri);
    const db = client.db(dbName);
    const collection = db.collection(nomCollectionLocation);

    // Vérifie si le document existe dans la collection
    const existingDocument = await collection.findOne({$and: [{"_id": objectId}, {"idClerk": document.idClerk}]});
    if (!existingDocument) {
        return null;
    }

    // Supprime le document et attend la fin de la suppression
    await collection.deleteOne({$and: [{"_id": objectId}, {"idClerk": document.idClerk}]});
}

export async function getAllQrcodesSortedAlphabetically(userId: string) {
    const data = userId;
    const client = await MongoClient.connect(uri);
    const db = client.db(dbName);
    const collection = db.collection(nomCollectionQrcode);
    const qrcodes = await collection.find({ "idClerk": data }).toArray();
    await client.close();

    if (qrcodes.length > 0) {
        qrcodes.sort((a, b) => {
            if (!a.name && !b.name) {
                return 0; 
            } else if (!a.name) {
                return 1; 
            } else if (!b.name) {
                return -1;
            } else {
                return a.name.localeCompare(b.name);
            }
        });
        return qrcodes;
    } else {
        throw new Error("Qrcode not found.");
    }
}

export async function getAllVcardsSortedAlphabetically(userId: string) {
    const data = userId;
    const client = await MongoClient.connect(uri);
    const db = client.db(dbName);
    const collection = db.collection(nomCollectionVcard);
    const vcards = await collection.find({ "idClerk": data }).toArray();
    await client.close();

    if (vcards.length > 0) {
        vcards.sort((a, b) => {
            if (!a.name && !b.name) {
                return 0; 
            } else if (!a.name) {
                return 1; 
            } else if (!b.name) {
                return -1;
            } else {
                return a.name.localeCompare(b.name);
            }
        });
        return vcards;
    } else {
        throw new Error("VCard not found.");
    }
}

export async function getAllLocationSortedAlphabetically(userId: string) {
    const data = userId;
    const client = await MongoClient.connect(uri);
    const db = client.db(dbName);
    const collection = db.collection(nomCollectionLocation);
    const location = await collection.find({ "idClerk": data }).toArray();
    await client.close();

    if (location.length > 0) {
        location.sort((a, b) => {
            if (!a.name && !b.name) {
                return 0; 
            } else if (!a.name) {
                return 1;
            } else if (!b.name) {
                return -1;
            } else {
                return a.name.localeCompare(b.name);
            }
        });
        return location;
    } else {
        throw new Error("Location not found.");
    }
}

export async function getAllQrcodesSortedByCreationDate(userId: string) {
    const data = userId;
    const client = await MongoClient.connect(uri);
    const db = client.db(dbName);
    const collection = db.collection(nomCollectionQrcode);
    const qrcodes = await collection.find({"idClerk": data}).toArray();
    await client.close();

    if (qrcodes.length > 0) {
        qrcodes.sort((a, b) => a.dateCreation.getTime() - b.dateCreation.getTime());    // Trie les QR codes par date de création (ordre croissant)
        return qrcodes;
    } else {
        throw new Error("Qrcode not found.");
    }
}

export async function getAllVcardsSortedByCreationDate(userId: string) {
    const data = userId;
    const client = await MongoClient.connect(uri);
    const db = client.db(dbName);
    const collection = db.collection(nomCollectionVcard);
    const vcards = await collection.find({"idClerk": data}).toArray();

    await client.close();

    if (vcards.length > 0) {
        vcards.sort((a, b) => a.dateCreation.getTime() - b.dateCreation.getTime());   // Trie les cartes VCard par date de création (ordre croissant)
        return vcards;
    } else {
        throw new Error("VCard not found.");
    }
}

export async function getAllLocationSortedByCreationDate(userId: string) {
    const data = userId;
    const client = await MongoClient.connect(uri);
    const db = client.db(dbName);
    const collection = db.collection(nomCollectionLocation);
    const location = await collection.find({"idClerk": data}).toArray();

    await client.close();

    if (location.length > 0) {
        location.sort((a, b) => a.dateCreation.getTime() - b.dateCreation.getTime());   // Trie les cartes Location par date de création (ordre croissant)
        return location;
    } else {
        throw new Error("Location not found.");
    }
}