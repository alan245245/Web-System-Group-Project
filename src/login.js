import express, { Router, json } from "express";
import multer from "multer";
import fs from "fs/promises";
import users from "./userdb.js";

const app = express();
const route = Router();
const form = multer();

//let users = new Map();

app.use(form.none());

route.post("/login", async (req, res) => {
    console.log(req.body);
    const user = await users.validate_user(req.body.username, req.body.password);
    if (user) {
        req.session.logged = true;
        req.session.username = user.username;
        req.session.role = user.role;
        req.session.timestamp = new Date();
        res.json(JSON.stringify({ status: "success", username: user.username }));
    } else {
        req.session.logged = false;
        res.status(401).json(JSON.stringify({ status: `failed`, message: `Incorrect username or password` }));
    }
});

route.post("/logout", (req, res) => {
    if (req.session.logged) {
        req.session.destroy();
        res.end();
    } else {
        res.status(401).json(JSON.stringify({ status: "failed", message: "Unauthorized" }));
    }
});

route.post("/register", async (req, res) => {
    console.log(req.body);

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const gender = req.body.gender;
    const birthday = req.body.birthday;
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    if (!username || !password) {
        res.status(400).json(JSON.stringify({ status: "failed", message: "Missing fields" }));
    } else if (username.length < 3) {
        res.status(400).json(JSON.stringify({ status: "failed", message: "Username must be at least 3 chacaters" }));
    } else if (await users.username_exist(username)) {
        res.status(400).json(JSON.stringify({ status: "failed", message: `Username ${username} already exists` }));
    } else {
        try {
            users.update_user(firstName, lastName, gender, birthday, username, password, email, false);
            res.json(JSON.stringify({ status: "success", username: username }));
        } catch (err) {
            res.status(400).json(
                JSON.stringify({ status: "failed", message: "Account created but unable to save into database" + err })
            );
        }
    }
});

route.get("/me", async (req, res) => {
    if (req.session.logged) {
        const curuser = await users.fetch_user(req.session.username);
        res.json(
            JSON.stringify({ status: "success", user: { username: `${curuser.username}`, role: `${curuser.role}` } })
        );
    } else {
        res.status(401).json(JSON.stringify({ status: "failed", message: "Unauthorized" }));
    }
});

/*
async function init_userdb() {
    try {
        if (users.size == 0) {
            const jsonString = await fs.readFile('./users.json');
            const jsonObject = await JSON.parse(jsonString);
            jsonObject.forEach((element) => {
                users.set(element.username, element);
            });
        } else {
            return;
        }
    } catch (err) {
        console.log(err);
    }
}
*/
/*
async function validate_user(username, password) {
    let curuser;
    try {
        if (users.size == 0) {
            await init_userdb();
        }
        curuser = users.get(username);
        if (curuser != null) {
            if (password == curuser.password) {
                return curuser;
            } else {
                console.log('password incorrect');
                return false;
            }
        } else {
            console.log('user not found ');
            return false;
        }
    } catch (err) {}
}
*/
/*
async function update_user(username, password, role) {
    users.set(username, { username: username, password: password, role: role, enabled: true });
    var userjson = [];
    users.forEach((element) => {
        userjson.push(element);
    });
    try {
        fs.writeFile('./users.json', JSON.stringify(userjson));
        return true;
    } catch (err) {
        return false;
    }
}
*/

export default route;
