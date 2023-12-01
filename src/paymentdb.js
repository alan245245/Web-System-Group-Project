import client from "./dbclient.js";

/**
 *
 * @param {*} value
 * @returns {boolean} Return true if credit card is valid
 */
function valid_credit_card(value) {
    // accept only digits, dashes or spaces
    if (/[^0-9-\s]+/.test(value)) return false;

    // The Luhn Algorithm. It's so pretty.
    var nCheck = 0,
        nDigit = 0,
        bEven = false;
    value = value.replace(/\D/g, "");

    for (var n = value.length - 1; n >= 0; n--) {
        var cDigit = value.charAt(n),
            nDigit = parseInt(cDigit, 10);

        if (bEven) {
            if ((nDigit *= 2) > 9) nDigit -= 9;
        }

        nCheck += nDigit;
        bEven = !bEven;
    }

    return nCheck % 10 == 0;
}

/**
 * @param {string} username username of the logined user
 * @param {int} eventNumber
 * @param {int[]} selectedSeats
 * @param {string} creditCardNumber
 * @param {string} cardHolderName
 * @param {int} securityNumber
 * @param {int} cardExpireDate card expired date from date.getTime() method;
 * @returns {json} {status: "success" / "failed", message: "reason or return values"}
 */
async function processPayment(
    username,
    eventNumber,
    selectedSeats,
    creditCardNumber,
    cardHolderName,
    securityNumber,
    cardExpireDate
) {
    try {
        const events = client.db("projectdb").collection("event");
        const transactions = client.db("projectdb").collection("transaction");
        let invalid = false;

        const result = await events.findOne({ eventNumber: eventNumber });

        // If cannot find event by eventNumber, return failed
        if (result == null) {
            return { status: "failed", reason: "cannot find event with given eventNumber" };
        }

        // Verify seat is still available
        result.occupiedSeats.forEach((e) => {
            if (selectedSeats.includes(e)) {
                // Invalid: Seats has been booked
                invalid = true;
            }
        });
        if (invalid) return { status: "failed", reason: "the selected seats are already booked" };

        // Verify creditCardNumber
        if (!valid_credit_card(creditCardNumber))
            return { status: "failed", reason: "the provided credit card number is invalid" };

        // Verify if card holder name is empty
        if (cardHolderName == "") return { status: "failed", reason: "the card holder name is missing" };

        // Verify if security number is empty
        if (!securityNumber) return { status: "failed", reason: "the security number is missing" };

        // Verify if card is expired
        if (new Date(cardExpireDate).getTime() <= new Date().getTime())
            return { status: "failed", reason: "the provided credit card is expired" };

        const response = await transactions.insertOne({
            username: username,
            eventNumber: eventNumber,
            selectedSeats: selectedSeats,
            time: new Date().getTime(),
        });
        let finalSeats = selectedSeats.concat(result.occupiedSeats);
        await events.updateOne({ eventNumber: eventNumber }, { $set: { occupiedSeats: finalSeats } });
        return { status: "success", message: "Your reference number " + response.insertedId };
    } catch (err) {
        console.log("ERROR: Catch error in process Payment " + err);
    }
}

export default { processPayment };
