import express, { Router, json } from "express";
import multer from "multer";
import fs from "fs/promises";
import users from "./userdb.js";
import eventdb from "./eventdb.js";
import session from "express-session";

const app = express();
const route = Router();
const form = multer();

app.use(form.none());

// Route to get all events
route.post("/getAllEvents", async (req, res) => {
    const events = await eventdb.getAllEvents();
    if (events) {
        res.json(JSON.stringify({ status: "success", events: events }));
    } else {
        res.status(401).json(JSON.stringify({ status: `failed` }));
    }
});

// Route to create event
route.post("/createEvent", async (req, res) => {
    const title = req.body.title;
    const origin = req.body.origin;
    const destination = req.body.destination;
    const priceEconomic = req.body.priceEconomic;
    const priceFirst = req.body.priceFirst;
    const trainNumber = req.body.trainNumber;
    const departureTime = req.body.departureTime;
    const arrivalTime = req.body.arrivalTime;
    const description = req.body.description;
    let reason = "";

    const result = await eventdb.createEvents(
        title,
        origin,
        destination,
        priceEconomic,
        priceFirst,
        trainNumber,
        departureTime,
        arrivalTime,
        description
    );

    // If insertedId contain data, the operation is success
    if (result.insertedId) {
        res.json(JSON.stringify({ status: "success" }));
    } else {
        res.status(400).json(JSON.stringify({ status: `failed`, reason: result.reason }));
    }
});

route.post("/getEventByTrainNumber", async (req, res) => {
    const event = await eventdb.getEventByTrainNumber(req.body.trainNumber);
    if (event) {
        res.json(JSON.stringify({ status: "success", event: event }));
    } else {
        res.status(401).json(JSON.stringify({ status: `failed` }));
    }
});

route.get("/checkLogin", (req, res) => {
    if (req.session.logged) {
        res.json(JSON.stringify({ status: "success" }));
    } else {
        res.status(401).json(JSON.stringify({ status: `failed` }));
    }
});

export default route;
