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

/**
 *
 * @returns {[Events]}All the event in an array
 */
async function getAllEvents() {
    try {
        const events = client.db("projectdb").collection("event");

        if ((await events.countDocuments()) == 0) init_db();

        let result = await events.find().toArray();
        return result;
    } catch (err) {
        console.log(`ERROR: Unable to get all events.`);
    }
}

/**
 *
 * @param {int} trainNumber
 * @returns {json} trainEvent
 */

async function getEventByTrainNumber(trainNumber) {
    try {
        const events = client.db("projectdb").collection("event");

        let result = await events.findOne({ trainNumber: trainNumber });
        return result;
    } catch (err) {
        console.log(`ERROR: Unable to get event by train number - ${err}`);
    }
}

/**
 * Server-side function to create a new event
 * @param {string} title
 * @param {string} origin
 * @param {string} destination
 * @param {int} priceEconomic
 * @param {int} priceFirst
 * @param {string} trainNumber
 * @param {int} departureTime Date in miliseconds. Date.getTime()
 * @param {int} arrivalTime Date in miliseconds. Date.getTime()
 * @param {string} description
 * @returns
 */
async function createEvents(
    title,
    origin,
    destination,
    priceEconomic,
    priceFirst,
    trainNumber,
    departureTime,
    arrivalTime,
    description
) {
    try {
        const events = client.db("projectdb").collection("event");

        const result = await events.find({ trainNumber: trainNumber });

        if ((await result.toArray()).length != 0) {
            return { reason: "because train number already exsist" };
        }
    } catch (err) {}

    try {
        const events = client.db("projectdb").collection("event");

        const eventNumber = parseInt(await events.countDocuments()) + 1;
        const occupiedSeats = [];
        const firstClass = [1, 2, 3, 4];

        const result = await events.insertOne({
            eventNumber: eventNumber,
            departureTime: departureTime,
            arrivalTime: arrivalTime,
            trainNumber: trainNumber,
            title: title,
            origin: origin,
            destination: destination,
            occupiedSeats: occupiedSeats,
            priceEconomic: priceEconomic,
            priceFirst: priceFirst,
            row: 10,
            column: 4,
            firstClass: firstClass,
        });

        return result;
    } catch (err) {
        console.log(`ERROR: Unable to insert event. ${err}`);
    }
}

async function updateEventSeat(trainNumber, row, column) {
    try {
        const events = client.db("projectdb").collection("event");
        console.log(row, column);

        const result = await events.updateOne(
            { trainNumber: trainNumber },
            {
                $set: {
                    row: row,
                    column: column,
                },
            }
        );
        console.log(result);
        return result;
    } catch (err) {
        console.log(`ERROR: Unable to insert event. ${err}`);
    }
}

async function getSeatOwner(trainNumber, seatNumber) {
    try {
        const events = client.db("projectdb").collection("event");
        const transaction = client.db("projectdb").collection("transaction");

        const eventResult = await events.findOne({ trainNumber: trainNumber });

        const eventNumber = eventResult.eventNumber;
        const querySeatNumber = [parseInt(seatNumber)];
        const result = await transaction.findOne({ eventNumber: eventNumber, selectedSeats: { $in: querySeatNumber } });

        return result;
    } catch (err) {
        console.log(`ERROR: Unable to query event. ${err}`);
    }
}

export default { getAllEvents, createEvents, getEventByTrainNumber, updateEventSeat, getSeatOwner };
