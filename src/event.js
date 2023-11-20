import express, { Router, json } from "express";
import multer from "multer";
import fs from "fs/promises";
import users from "./userdb.js";
import eventdb from "./eventdb.js";

const app = express();
const route = Router();
const form = multer();

//let users = new Map();

app.use(form.none());

route.post("/getAllEvents", async (req, res) => {
    console.log(req.body);
    const events = await eventdb.getAllEvents();
    console.log(events);
    if (events) {
        res.json(JSON.stringify({ status: "success", events: events }));
    } else {
        req.session.logged = false;
        res.status(401).json(JSON.stringify({ status: `failed`, message: `Incorrect username or password` }));
    }
});

export default route;
