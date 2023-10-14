module.exports = {
  async up(db, client) {
    await db.collection('Location').insertMany([
      {
        idClerk: 1,
        value: "geo:125,452",
        size: 200,
        backgroundColor: "#000000",
        foregroundColor: "#FFFFFF",
        dateCreation: new Date(),
      },
      {
        idClerk: 1,
        value: "geo:125,452",
        size: 200,
        backgroundColor: "#000000",
        foregroundColor: "#FFFFFF",
        dateCreation: new Date(),
      },
    ]);
  },

  async down(db, client) {
    await db.dropCollection('Location');
  }
};
