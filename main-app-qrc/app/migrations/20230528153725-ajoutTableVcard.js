module.exports = {
  async up(db, client) {
    await db.collection('Vcard').insertMany([
      {
        idClerk: 1,
        backgroundColor: "#FFFFFF",
        foregroundColor: "#000000",
        errorLevel: "L",
        value: "https://example.com",
        size: 200,
        includeMargin: true,
        dateCreation: new Date(),
      },
      {
        idClerk: 2,
        backgroundColor: "#000000",
        foregroundColor: "#FFFFFF",
        errorLevel: "H",
        value: "https://example.org",
        size: 300,
        includeMargin: false,
        dateCreation: new Date(),
      },
    ]);
  },

  async down(db, client) {
    await db.dropCollection('QrCode');
  }
};
