$().ready(() => {
    $("#event-create-form").on("change", () => {
        try {
            ele = $("#event-title");
            destination = $("#event-destination").val();
            origin = $("#event-origin").val();
            trainno = $("#event-trainno").val();

            ele.val(`Train ${trainno} from ${origin} to ${destination}`);
        } catch (err) {
            console.log(err);
        }
    });
});

function validateEvent(event) {
    event.preventDefault();

    let title;
    let origin;
    let destination;
    let priceEconomic;
    let priceFirst;
    let trainNumber;
    let departureTime;
    let arrivalTime;
    let description;
    let valid = true;

    // Try to obtain origin
    try {
        ele = $("#event-origin");
        origin = ele.val();

        if (!origin) {
            // Invalid: Origin is empty
            ele.removeClass("is-valid").addClass("is-invalid");
            valid = false;
        } else if (origin == "Please Select") {
            // Invalid: Origin cannot be default value
            ele.removeClass("is-valid").addClass("is-invalid");
            valid = false;
        } else {
            // Valid
            ele.removeClass("is-invalid").addClass("is-valid");
        }
    } catch (err) {
        console.log(err);
    }

    // Try to obtain destination
    try {
        ele = $("#event-destination");
        destination = ele.val();

        if (!destination) {
            // Invalid: Destination is empty
            ele.removeClass("is-valid").addClass("is-invalid");
            valid = false;
        } else if (destination == "Please Select") {
            // Invalid: Destination cannot be default value
            ele.removeClass("is-valid").addClass("is-invalid");
            valid = false;
        } else if (origin == destination) {
            // Invalid: Destination and origin is the same
            ele.removeClass("is-valid").addClass("is-invalid");
            valid = false;
        } else {
            // Valid
            ele.removeClass("is-invalid").addClass("is-valid");
        }
    } catch (err) {
        console.log(err);
    }

    // Try to obtain price for economic
    try {
        ele = $("#event-econprice");
        priceEconomic = ele.val();

        if (!priceEconomic) {
            // Invalid: Economic price is empty
            ele.removeClass("is-valid").addClass("is-invalid");
            valid = false;
        } else if (priceEconomic < 0) {
            // Invalid: Economic price is negative
            ele.removeClass("is-valid").addClass("is-invalid");
            valid = false;
        } else {
            // Valid
            ele.removeClass("is-invalid").addClass("is-valid");
        }
    } catch (err) {
        console.log(err);
    }

    // Try to obtain price for first
    try {
        ele = $("#event-firstprice");
        priceFirst = ele.val();

        if (!priceFirst) {
            // Invalid: First Class price is empty
            ele.removeClass("is-valid").addClass("is-invalid");
            valid = false;
        } else if (priceFirst < 0) {
            // Invalid: First Class price is negative
            ele.removeClass("is-valid").addClass("is-invalid");
            valid = false;
        } else {
            // Valid
            ele.removeClass("is-invalid").addClass("is-valid");
        }
    } catch (err) {
        console.log(err);
    }

    // Try to obtain train number
    try {
        ele = $("#event-trainno");
        trainNumber = ele.val();

        if (!trainNumber) {
            // Invalid: Train number is empty
            ele.removeClass("is-valid").addClass("is-invalid");
            valid = false;
        } else {
            // Valid
            ele.removeClass("is-invalid").addClass("is-valid");
        }
    } catch (err) {
        console.log(err);
    }

    // Try to obtain date for departure
    try {
        ele = $("#event-departure");
        departureTime = new Date(ele.val()).getTime();

        if (!departureTime) {
            // Invalid: Departure is empty
            ele.removeClass("is-valid").addClass("is-invalid");
            valid = false;
        } else {
            // Valid
            ele.removeClass("is-invalid").addClass("is-valid");
        }
    } catch (err) {
        console.log(err);
    }

    // Try to obtain date for arrive
    try {
        ele = $("#event-arrival");
        arrivalTime = new Date(ele.val()).getTime();

        if (!arrivalTime) {
            // Invalid: Arrive is empty
            ele.removeClass("is-valid").addClass("is-invalid");
            valid = false;
        } else {
            // Valid
            ele.removeClass("is-invalid").addClass("is-valid");
        }
    } catch (err) {
        console.log(err);
    }

    // Try to obtain date for description
    try {
        description = $("#event-description").val();

        if (!description) {
            description = "";
        }
    } catch (err) {
        console.log(err);
    }

    return valid;
}

/**
 * Called from a form submit button to process the create event operation
 * @param {Event} event
 */
async function createSingleEvent(event) {
    event.preventDefault();
    let title = "";
    let origin = "";
    let destination = "";
    let priceEconomic = "";
    let priceFirst = "";
    let trainNumber = "";
    let departureTime = "";
    let arrivalTime = "";
    let description = "";

    if (validateEvent(event)) {
        try {
            title = $("#event-title").val().trim();
            origin = $("#event-origin").val();
            destination = $("#event-destination").val();
            priceEconomic = $("#event-econprice").val();
            priceFirst = $("#event-firstprice").val();
            trainNumber = $("#event-trainno").val();
            departureTime = new Date($("#event-departure").val()).getTime();
            arrivalTime = new Date($("#event-arrival").val()).getTime();
            description = $("#event-description").val();
        } catch (err) {
            console.log(err);
        }
        try {
            $.post(
                "event/createEvent",
                {
                    title: title,
                    origin: origin,
                    destination: destination,
                    priceEconomic: priceEconomic,
                    priceFirst: priceFirst,
                    trainNumber: trainNumber,
                    departureTime: departureTime,
                    arrivalTime: arrivalTime,
                    description: description,
                },
                function (response) {
                    const jsonObject = JSON.parse(response);
                    if (jsonObject.status == "success") {
                        alert("Event Created");
                    } else {
                        alert(`Event cannot be created because ${jsonObject.reason}`);
                    }
                },
                "json"
            ).fail(function (response) {
                const jsonObject = JSON.parse(response.responseJSON);
                if (jsonObject.status == "success") {
                    alert("Event Created");
                } else {
                    alert(`Event cannot be created because ${jsonObject.reason}`);
                }
            });
        } catch (err) {
            console.log("ERROR: " + err);
        }
    }
}
