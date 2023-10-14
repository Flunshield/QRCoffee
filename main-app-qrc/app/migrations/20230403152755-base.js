module.exports = {
  async up(db, client) {
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    await db.collection('CoffeeData').insertMany([
      {userid: '365271', name: 'QRcode reunion', description: 'ma description ici', type: 'basique'}, 
      {userid: '456271', name: 'QR', description: 'qrcode rouge', type: 'prenium'},
      {userid: '157126', name: 'QR 2', description: 'qrcode violet', type: 'basique'},
      {userid: '784635', name: 'QR 3', description: 'qrcode bleu', type: 'prenium'},
      {userid: '194846', name: 'Café', description: 'qrcode du café de Paris', type: 'basique'},
      ]);
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  }
};
