import * as dotenv from "dotenv";
dotenv.config()

export default {
    // jwt_secret: process.env.JWT_SECRET,
    mongo_connection_uri: process.env.MONGO_URI,
    // node_env: process.env.NODE_ENV,
    // jwt_Lifetime: process.env.JWT_LIFETIME,
    // cloud_name: process.env.CLOUD_NAME,
    // cloud_api_key: process.env.CLOUD_API_KEY,
    // cloud_api_secret: process.env.CLOUD_API_SECRET,
}
