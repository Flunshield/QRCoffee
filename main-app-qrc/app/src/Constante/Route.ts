// Route Mongo
export const uri = process.env.ME_CONFIG_MONGODB_URL ?? '';
export const dbName = process.env.MONGO_DATABASE ?? '';
export const nomCollectionQrcode = process.env.MONGO_COLLECTION ?? '';
export const nomCollectionVcard = process.env.MONGO_COLLECTION_V ?? '';
export const nomCollectionLocation = process.env.MONGO_COLLECTION_L ?? '';
