$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const trainNumber = urlParams.get("trainNumber");
    const selectedSeat = urlParams.get("selectedSeat");
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
    $.post("event/getEventByTrainNumber", { trainNumber: trainNumber }, function (response) {
        const res = JSON.parse(response);
        console.log(res);
        const dt = new Date(parseInt(res.event.departureTime));
        $("#title").html(res.event.title);
        $("#departureTime").html(
            `${dt.getHours() < 10 ? "0" : ""}${dt.getHours()}:${dt.getMinutes() < 10 ? "0" : ""}${dt.getMinutes()}`
        );
        $("#selectedSeat").html(selectedSeat);
        $("#price").html(price);
        $("#submit").on("click", function () {
            const cardID = $("#card-id").val();
            const cardHolder = $("#card-holder-name").val();
            const securityCode = $("#security-code").val();
            const expireDate = $("#expire-date").val();
            if (cardID == "" || cardHolder == "" || securityCode == "" || expireDate == "") {
                alert("Payment information cannot be empty");
            } else {
                console.log(
                    `${res.event.eventNumber} ${selectedSeat} ${price} ` +
                        `${cardID} ${cardHolder} ${securityCode} ${expireDate}`
                );
                //$.post();
            }
        });
    }).fail(function (response) {
        const jsonObject = JSON.parse(response.responseJSON);
        if (jsonObject.status == "failed" && jsonObject.message != "") {
            alert(`${jsonObject.message}`);
        } else {
            alert(`An unknown error has occured`);
        }
    });
});
