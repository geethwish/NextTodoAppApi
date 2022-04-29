const env = require("./config/config");

// In this file you can configure migrate-mongo


const config = {
    mongodb: {
        url: env.dbEnv.mongoURI || "mongodb://localhost:27017",

        databaseName: env.dbEnv.dbName || 'todo',

        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    },


    migrationsDir: "migrations",


    changelogCollectionName: "changelog",


    migrationFileExtension: ".js",


    useFileHash: false,

    moduleSystem: 'commonjs',
};

module.exports = config;
