// In this file you can configure migrate-mongo
require('dotenv').config();
const config = {
  mongodb: {
    url: 'mongodb://'+process.env.DB_ROOT_USERNAME+':'+process.env.DB_ROOT_PASSWORD+'@'+process.env.MONGO_HOST+':'+process.env.MONGO_PORTS,
    databaseName: process.env.MONGO_DATABASE,
    options: {
      useNewUrlParser: true, // removes a deprecation warning when connecting
      useUnifiedTopology: true, // removes a deprecating warning when connecting
      //   connectTimeoutMS: 3600000, // increase connection timeout to 1 hour
      //   socketTimeoutMS: 3600000, // increase socket timeout to 1 hour
    }
  },
  migrationsDir: "migrations",
  changelogCollectionName: "changelog",
  migrationFileExtension: ".js",
  useFileHash: false,
  moduleSystem: 'commonjs',
};

module.exports = config;
