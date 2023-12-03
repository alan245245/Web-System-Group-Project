import express from "express";
import session from "express-session";
import login from "./login.js";
import mongostore from "connect-mongo";
import client from "./dbclient.js";
import path from "path";
import event from "./event.js";
import payment from "./payment.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        secret: "eie4432_groupproject",
        resave: false,
        saveUninitialized: false,
        cookie: { httpOnly: true, maxAge: 30 * 60 * 1000 }, // Valid for thirty minutes
        store: mongostore.create({
            client,
            dbName: "projectdb",
            collectionName: "session",
        }),
    })
);

//http://127.0.0.1:8080/?authkey=Muppet5-Thee9-Deface0-Divorcee4-Sinless4

const PREAUTH_KEY = "Muppet5-Thee9-Deface0-Divorcee4-Sinless4";
app.use((req, res, next) => {
    if (!req.session?.allow_access) {
        if (req.query?.authkey === PREAUTH_KEY) {
            req.session.allow_access = true;
        } else {
            res.status(401).json({
                status: "failed",
                message: "Unauthorized",
            });
        }
    }
    next();
});

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
    if (req.session.isAdmin) {
        res.redirect("event-management.html");
    } else {
        res.status(401).json(JSON.stringify({ status: "failed", message: "Unauthorized" }));
    }
});

app.get("/ticket-booking", (req, res) => {
    res.redirect("ticket-booking.html");
});

app.get("/payment", (req, res) => {
    res.redirect("payment.html");
});

app.get("/seat-management", (req, res) => {
    if (req.session.isAdmin) {
        res.redirect("seat-management.html");
    } else {
        res.status(401).json(JSON.stringify({ status: "failed", message: "Unauthorized" }));
    }
});

app.get("/user-login", (req, res) => {
    res.redirect("user-login.html");
});

app.get("/user-registration", (req, res) => {
    res.redirect("user-registration.html");
});

app.get("/user-forgot-password", (req, res) => {
    res.redirect("user-forgot-password.html");
});

app.use("/auth", login);

app.use("/event", event);

app.use("/payment", payment);

app.listen(8080, () => {
    console.log("Sever started at http://127.0.0.1:8080");
});

// Conversion for vercel
app.use("/", express.static(path.join(process.cwd(), "/static")));

//app.use("/", express.static("static"));
