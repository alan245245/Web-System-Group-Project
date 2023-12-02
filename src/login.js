import express, { Router, json } from "express";
import multer from "multer";
import fs from "fs/promises";
import users from "./userdb.js";

const app = express();
const route = Router();
var storage = multer.diskStorage({
    destination: "./upload/user/path",
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});
const form = multer({ storage: storage });

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
        res.json(JSON.stringify({ status: "success", username: user.username, isAdmin: user.isAdmin }));
    } else {
        req.session.logged = false;
        res.status(401).json(JSON.stringify({ status: `failed`, message: `Incorrect username or password` }));
    }
});

route.post("/logout", (req, res) => {
    if (req.session.logged) {
        req.session.destroy();
        res.json(JSON.stringify({ status: "success", message: "Logout successfully." }));
    } else {
        res.status(401).json(JSON.stringify({ status: "failed", message: "Unauthorized" }));
    }
});

route.post("/register", form.any(), async (req, res) => {
    console.log(req.body);

    const firstName = req.body.firstname;
    const lastName = req.body.lastname;
    const gender = req.body.gender;
    const birthday = req.body.birthday;
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const file = req.files;
    let filePath;

    if (file.length != 0) filePath = file[0].path;
    else filePath = "";

    if (!username || !password) {
        res.status(400).json(JSON.stringify({ status: "failed", message: "Missing fields" }));
        if (file.length != 0) fs.unlink(file[0].path);
    } else if (username.length < 3) {
        res.status(400).json(JSON.stringify({ status: "failed", message: "Username must be at least 3 chacaters" }));
        if (file.length != 0) fs.unlink(file[0].path);
    } else if (await users.username_exist(username)) {
        res.status(400).json(JSON.stringify({ status: "failed", message: `Username ${username} already exists` }));
        if (file.length != 0) fs.unlink(file[0].path);
    } else {
        try {
            users.update_user(firstName, lastName, gender, birthday, username, password, email, false, filePath);
            res.json(JSON.stringify({ status: "success", username: username }));
        } catch (err) {
            res.status(400).json(
                JSON.stringify({ status: "failed", message: "Account created but unable to save into database" + err })
            );
            if (file.length != 0) fs.unlink(file[0].path);
        }
    }
});

route.post("/forgot-password", async (req, res) => {
    console.log(req.body);

    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    if (!username || !password) {
        res.status(400).json(JSON.stringify({ status: "failed", message: "Missing fields" }));
    } else if (username.length < 3) {
        res.status(400).json(JSON.stringify({ status: "failed", message: "Username must be at least 3 chacaters" }));
    } else {
        try {
            const response = await users.update_password(email, username, password);
            console.log(response);
            if (!response) {
                res.json(JSON.stringify({ status: "failed", message: "Data doesn't match in database" }));
            } else {
                res.json(JSON.stringify({ status: "success", username: username }));
            }
        } catch (err) {
            res.status(400).json(
                JSON.stringify({ status: "failed", message: "Failed to communicate with database: " + err })
            );
        }
    }
});

route.get("/me", async (req, res) => {
    if (req.session.logged) {
        const curuser = await users.fetch_user(req.session.username);
        res.json(JSON.stringify({ status: "success", curuser }));
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
