import express, { Router, json, response } from "express";
import paymentdb from "./paymentdb.js";

const route = Router();

route.post("/processPayment", async (req, res) => {
    for (let i = 0; i < req.body.selectedSeat.length; i++) {
        req.body.selectedSeat[i] = parseInt(req.body.selectedSeat[i]);
    }
    const response = await paymentdb.processPayment(
        req.session.username,
        parseInt(req.body.eventNumber),
        req.body.selectedSeat,
        req.body.creditCardNumber,
        req.body.cardHolderName,
        parseInt(req.body.securityNumber),
        req.body.cardExpireDate
    );
    if (response) {
        if (response.status == "success") {
            res.json(JSON.stringify(response));
        } else {
            res.json(JSON.stringify(response));
        }
    } else {
        res.status(401).json(JSON.stringify({ status: `failed` }));
    }
});

export default route;
