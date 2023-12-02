$().ready(() => {
    console.log("ready");
    const urlParams = new URLSearchParams(window.location.search);
    const trainNumber = urlParams.get("trainNumber");
    var selectedSeat = [];
    var price = 0;
    $.post("event/getEventByTrainNumber", { trainNumber: trainNumber }, function (response) {
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
        const res = JSON.parse(response);
        console.log(res);
        const dt = new Date(parseInt(res.event.departureTime));
        $("#trainInfo").html(res.event.title);
        $("#trainDT").html(
            `${dt.getHours() < 10 ? "0" : ""}${dt.getHours()}:${dt.getMinutes() < 10 ? "0" : ""}${dt.getMinutes()}`
        );
        drawSeats(res.event.row, res.event.column, res.event.occupiedSeats, res.event.firstClass);
        $("#confirm").on("click", function () {
            var selectedSeatQS = "";
            selectedSeat.forEach((element) => {
                selectedSeatQS += `selectedSeat=${element}&`;
            });
            window.open(`payment.html?trainNumber=${res.event.trainNumber}&${selectedSeatQS}price=${price}`, "_self");
        });
        $("#reset").on("click", function () {
            selectedSeat = [];
            price = 0;
            for (i = 1; i <= 40; i++) {
                if ($(`#${i}`).attr("class") == "selecting-seat") {
                    $(`#${i}`).removeClass("selecting-seat");
                    if (res.event.firstClass.includes(parseInt($(`#${i}`).attr("id")))) {
                        $(`#${i}`).addClass("first-available");
                    } else {
                        $(`#${i}`).addClass("available-seat");
                    }
                }
            }
            $("#confirm-buttons").addClass("d-none");
            $("#selected-seat").html("Click a seat to book.");
            $("#price").html(price);
        });
        for (i = 1; i < res.event.row * res.event.column; i++) {
            $(`#${i}`).on("click", function () {
                if ($(this).attr("class") == "booked-seat") {
                    alert("This seat is alread booked");
                } else if ($(this).attr("class") == "available-seat" || $(this).attr("class") == "first-available") {
                    $(this).addClass("selecting-seat");
                    $(this).removeClass("available-seat");
                    $(this).removeClass("first-available");
                    selectedSeat.push(parseInt($(this).attr("id")));
                    if (res.event.firstClass.includes(parseInt($(this).attr("id")))) {
                        price += parseInt(res.event.priceFirst);
                    } else {
                        price += parseInt(res.event.priceEconomic);
                    }
                } else if ($(this).attr("class") == "selecting-seat") {
                    if (res.event.firstClass.includes(parseInt($(this).attr("id")))) {
                        $(this).addClass("first-available");
                    } else {
                        $(this).addClass("available-seat");
                    }
                    $(this).removeClass("selecting-seat");
                    const index = selectedSeat.indexOf(parseInt($(this).attr("id")));
                    if (index > -1) {
                        selectedSeat.splice(index, 1); // 2nd parameter means remove one item only
                    }
                    if (res.event.firstClass.includes(parseInt($(this).attr("id")))) {
                        price -= parseInt(res.event.priceFirst);
                    } else {
                        price -= parseInt(res.event.priceEconomic);
                    }
                }
                if (selectedSeat.length == 0) {
                    $("#selected-seat").html("Click a seat to book.");
                    $("#confirm-buttons").addClass("d-none");
                } else {
                    $("#selected-seat").html("You are selecting seat number " + selectedSeat);
                    $("#confirm-buttons").removeClass("d-none");
                }
                $("#price").html(price);
            });
        }
    });
});
