import fs from "fs/promises";
import client from "./dbclient.js";
import crypto from "crypto";

async function init_db() {
    try {
        const events = client.db("projectdb").collection("event");

        if ((await events.countDocuments()) == 0) {
            const jsonString = await fs.readFile("./src/events.json");
            const jsonObject = await JSON.parse(jsonString);

            const insertCount = (await events.insertMany(jsonObject)).insertedCount;
            console.log(`Added ${insertCount} events`);
        }
    } catch (err) {
        console.log(`Unable to intialize the database!` + err);
    }
}

async function getAllEvents() {
    try {
        const events = client.db("projectdb").collection("event");

        if ((await events.countDocuments()) == 0) init_db();

        let result = await events.find().toArray();
        return result;
    } catch (err) {
        console.log(`ERROR: Unable to get events.`);
    }
}

async function createEvents(title, origin, destination, priceEconomic, priceFirst, trainNumber, eventTime) {}

export default { getAllEvents };
