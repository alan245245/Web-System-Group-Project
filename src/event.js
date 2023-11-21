import express, { Router, json } from "express";
import multer from "multer";
import fs from "fs/promises";
import users from "./userdb.js";
import eventdb from "./eventdb.js";

const app = express();
const route = Router();
const form = multer();

app.use(form.none());

// Route to get all events
route.post("/getAllEvents", async (req, res) => {
    console.log(req.body);
    const events = await eventdb.getAllEvents();
    console.log(events);
    if (events) {
        res.json(JSON.stringify({ status: "success", events: events }));
    } else {
        res.status(401).json(JSON.stringify({ status: `failed`, message: `Incorrect username or password` }));
    }
});

export default route;
