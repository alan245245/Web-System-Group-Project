$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const trainNumber = urlParams.get("trainNumber");
    const selectedSeat = urlParams.getAll("selectedSeat");
    for (i = 0; i < selectedSeat.length; i++) {
        selectedSeat[i] = parseInt(selectedSeat[i]);
    }
    const price = urlParams.get("price");
    if (
        trainNumber == null ||
        trainNumber == "" ||
        selectedSeat == null ||
        selectedSeat == "" ||
        price == null ||
        price == ""
    ) {
        alert("Please go to Event Dashboard to choose a train shift first.");
        window.open("event-dashboard.html", "_self");
    }
    $.get("event/checkLogin", function (response) {
        const res = JSON.parse(response);
        if (res.status != "success") {
            alert("Please login or register before buying ticket.");
            window.open("event-dashboard.html", "_self");
        }
    }).fail(function (response) {
        alert("Please login or register before buying ticket.");
        window.open("event-dashboard.html", "_self");
    });
    console.log("4417 1234 5678 9113");
    $.post("event/getEventByTrainNumber", { trainNumber: trainNumber }, function (response) {
        const res = JSON.parse(response);
        console.log(res);
        const dt = new Date(parseInt(res.event.departureTime));
        $("#title").html(res.event.title);
        $("#departureTime").html(
            `${dt.getHours() < 10 ? "0" : ""}${dt.getHours()}:${dt.getMinutes() < 10 ? "0" : ""}${dt.getMinutes()}`
        );
        for (i = 0; i < selectedSeat.length; i++) {
            if (i == 0) {
                $("#selectedSeat").append(selectedSeat[i]);
            } else {
                $("#selectedSeat").append(", " + selectedSeat[i]);
            }
        }
        $("#price").html(price);
        $("#submit").on("click", function () {
            const cardID = $("#card-id").val();
            const cardHolder = $("#card-holder-name").val();
            const securityCode = $("#security-code").val();
            const expireDate = $("#expire-date").val();
            if (cardID == "" || cardHolder == "" || securityCode == "" || expireDate == "") {
                alert("Payment information cannot be empty");
            } else if (!valid_credit_card(cardID)) {
                alert("Credit Card ID is invalid. Please input again.");
            } else {
                $.post(
                    "/payment/processPayment",
                    {
                        eventNumber: res.event.eventNumber,
                        selectedSeat: selectedSeat,
                        creditCardNumber: cardID,
                        cardHolderName: cardHolder,
                        securityNumber: securityCode,
                        cardExpireDate: expireDate,
                    },
                    function (response) {
                        const res = JSON.parse(response);
                        if (res.status == "success") {
                            alert("Ticket purchase successfully. " + res.message);
                        } else {
                            alert("Ticket purchase failed: " + res.reason);
                        }
                    }
                ).fail(function (response) {
                    alert("failed");
                    console.log(response);
                });
            }
        });
    }).fail(function (response) {
        const jsonObject = JSON.parse(response.responseJSON);
        console.log(jsonObject);
        if (jsonObject.status == "failed" && jsonObject.message != "") {
            alert(`${jsonObject.message}`);
        } else {
            alert(`An unknown error has occured`);
        }
    });
});

// takes the form field value and returns true on valid number
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
