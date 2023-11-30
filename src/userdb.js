import fs from "fs/promises";
import client from "./dbclient.js";
import crypto from "crypto";

function sha256(input) {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    return crypto.subtle.digest("SHA-256", data).then((buffer) => {
        const hashArray = Array.from(new Uint8Array(buffer));
        const hashHex = hashArray.map((byte) => byte.toString(16).padStart(2, "0")).join("");
        return hashHex;
    });
}

async function init_db() {
    try {
        // TODO
        const users = client.db("projectdb").collection("user");

        if ((await users.countDocuments()) == 0) {
            const jsonString = await fs.readFile("./users.json");
            const jsonObject = await JSON.parse(jsonString);

            const insertCount = (await users.insertMany(jsonObject)).insertedCount;
            console.log(`Added ${insertCount} users`);
        }
    } catch (err) {
        // TODO
        console.log(`Unable to intialize the database!`);
    }
}

async function validate_user(username, password) {
    if (!username || !password) {
        return false;
    }

    let hash;
    await sha256(password)
        .then((result) => (hash = result))
        .catch((error) => console.log("Error", error));
    try {
        const users = client.db("projectdb").collection("user");
        const findUser = await users.findOne({ username: username, password: hash });

        if (findUser != null) {
            return findUser;
        } else {
            return false;
        }
    } catch (err) {
        console.log("Unable to fetch from database!");
    }
}

async function update_user(firstName, lastName, gender, birthday, username, password, email, isAdmin) {
    try {
        const users = client.db("projectdb").collection("user");
        let hash;
        await sha256(password)
            .then((result) => (hash = result))
            .catch((error) => console.log("Error", error));

        const updateReturn = await users.updateOne(
            { username: username },
            {
                $set: {
                    firstName: firstName,
                    lastName: lastName,
                    gender: gender,
                    birthday: birthday,
                    username: username,
                    password: hash,
                    email: email,
                    isAdmin: isAdmin,
                },
            },
            { upsert: true }
        );

        if (updateReturn.updateCount != 0) {
            console.log(`Added ${updateReturn.upsertedCount} user`);
            return true;
        } else if (updateReturn.modifyCount != 0) {
            console.log(`Added 0 user`);
            return true;
        } else {
            return false;
        }
    } catch (err) {
        console.log(`Unable to update the database!` + err);
    }
}

async function update_password(email, username, password) {
    try {
        const users = client.db("projectdb").collection("user");
        let hash;
        await sha256(password)
            .then((result) => (hash = result))
            .catch((error) => console.log("Error", error));

        const updateReturn = await users.updateOne(
            { username: username, email: email },
            {
                $set: {
                    username: username,
                    password: hash,
                    email: email,
                },
            }
        );

        if (updateReturn.modifiedCount != 0) {
            console.log(`modified ${updateReturn.modifiedCount} user`);
            return true;
        } else {
            return false;
        }
    } catch (err) {
        console.log(`Unable to update the database!` + err);
    }
}

async function fetch_user(username) {
    try {
        const users = client.db("projectdb").collection("user");
        const result = await users.findOne({ username: username });

        return result;
    } catch (err) {
        console.log("Unable to fetch from database!");
    }
}

async function username_exist(username) {
    try {
        const users = client.db("projectdb").collection("user");
        const result = await fetch_user(username);

        if (result == null) {
            return false;
        } else {
            return true;
        }
    } catch (err) {
        console.log("Unable to fetch from database!");
    }
}

//init_db().catch(console.dir);

//Lab #5.5.1
//validate_user('alice', 'xyz').then((res) => console.log(res));
//Lab #5.5.2
//validate_user('alice', 'ecila').then((res) => console.log(res));

//Lab #5.6.1
//update_user('bob', 'bob4321', 'student', true).then((res) => console.log(res));
//Lab #5.6.2
//update_user('new_user', 'new_password', 'user', false).then((res) => console.log(res));

//Lab #5.7.1
//fetch_user('anyone').then((res) => console.log(res));
//Lab #5.7.2
//fetch_user('new_user').then((res) => console.log(res));

//Lab #5.8.1
//username_exist('anyone').then((res) => console.log(res));
//Lab #5.8.2
//username_exist('new_user').then((res) => console.log(res));

export default { validate_user, update_user, fetch_user, username_exist, update_password };
