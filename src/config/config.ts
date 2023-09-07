import { ConfigProps } from "./config.interface";

export const config = ():ConfigProps => ({
    port: parseInt(process.env.PORT, 10) || 8080,
    api: {
      apiUrl: process.env.API_URL,
      httpTimeout: 1000,
    },
    mongodb: {
      admindatabase: {
        connectionString: process.env.ADMIN_MONGODB_CONNECTION_STRING || 'mongodb://localhost:27017',
        databaseName: process.env.ADMIN_DB || 'local'
      },
      userdatabase: {
        connectionString: process.env.USER_MONGODB_CONNECTION_STRING || 'mongodb://localhost:27017',
        databaseName: process.env.USER_DB || 'local'
      }
    }
   });