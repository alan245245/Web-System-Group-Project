import { MongoClient, ServerApiVersion } from "mongodb";
import config from "./config.js";
const connect_uri = config.CONNECTION_STR;
const client = new MongoClient(connect_uri, {
    connectTimeoutMS: 20000,
    serverSelectionTimeoutMS: 20000,
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});
async function connect() {
    try {
        // TODO
        await client.connect();
        client.db("projectdb").command({ ping: 1 });
        console.log("Successfully connected to the database!");
    } catch (err) {
        // TODO
        await client.close();
        console.log("Unable to establish connection to the database!");
    }
}
connect().catch(console.dir);
export default client;
