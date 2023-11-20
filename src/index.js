import express from "express";
import session from "express-session";
import login from "./login.js";
import mongostore from "connect-mongo";
import client from "./dbclient.js";
import path from "path";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        secret: "eie4432_groupproject",
        resave: false,
        saveUninitialized: false,
        cookie: { httpOnly: true, maxAge: 120000 },
        store: mongostore.create({
            client,
            dbName: "projectdb",
            collectionName: "session",
        }),
    })
);

/*
    Add various js and css file to website
*/
app.use("/styles", express.static(path.join("node_modules/bootstrap/dist/css")));
app.use("/styles", express.static(path.join("node_modules/bootstrap-icons/font")));
app.use("/scripts", express.static(path.join("node_modules/bootstrap/dist/js")));
app.use("/scripts", express.static(path.join("node_modules/jquery/dist")));

app.get("/", (req, res) => {
    res.redirect("event-dashboard.html");
});

app.get("/event-dashboard", (req, res) => {
    res.redirect("event-dashboard.html");
});

app.get("/event-management", (req, res) => {
    res.redirect("event-management.html");
});

app.get("/payment", (req, res) => {
    res.redirect("payment.html");
});

app.get("/seat-management", (req, res) => {
    res.redirect("seat-management.html");
});

app.get("/ticket-booking", (req, res) => {
    res.redirect("ticket-booking.html");
});

app.get("/user-login", (req, res) => {
    res.redirect("user-login.html");
});

app.get("/user-registration", (req, res) => {
    res.redirect("user-registration.html");
});

app.use("/auth", login);

app.listen(8080, () => {
    console.log("Sever started at http://127.0.0.1:8080");
});

app.use("/", express.static("static"));
