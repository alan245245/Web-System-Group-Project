$().ready(() => {
    console.log("ready");
    const urlParams = new URLSearchParams(window.location.search);
    const trainNumber = urlParams.get("trainNumber");
    if (trainNumber == null) {
        alert("Please go to Event Dashboard choose a train shift first.");
        window.open("event-dashboard.html", "_self");
    }
    var selectedSeat = [];
    var price = 0;
    $.post("event/getEventByTrainNumber", { trainNumber: trainNumber }, function (response) {
        const res = JSON.parse(response);
        console.log(res);
        const dt = new Date(parseInt(res.event.departureTime));
        $("#trainInfo").html(res.event.title);
        $("#trainDT").html(
            `${dt.getHours() < 10 ? "0" : ""}${dt.getHours()}:${dt.getMinutes() < 10 ? "0" : ""}${dt.getMinutes()}`
        );
        drawSeats(res.event.row, res.event.column, res.event.occupiedSeats, res.event.firstClass);
        $("#confirm").on("click", function () {});
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
        $("#1").on("click", function () {
            if ($(this).attr("class") == "booked-seat") {
                alert("This seat is alread booked");
            } else if ($(this).attr("class") == "available-seat" || $(this).attr("class") == "first-available") {
                $(this).addClass("selecting-seat");
                $(this).removeClass("available-seat");
                $(this).removeClass("first-available");
                selectedSeat.push(parseInt($(this).attr("id")));
                if (res.event.firstClass.includes(parseInt($(this).attr("id")))) {
                    price += res.event.priceFirst;
                } else {
                    price += res.event.priceEconomic;
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
                    price -= res.event.priceFirst;
                } else {
                    price -= res.event.priceEconomic;
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
        $("#2").on("click", function () {
            if ($(this).attr("class") == "booked-seat") {
                alert("This seat is alread booked");
            } else if ($(this).attr("class") == "available-seat" || $(this).attr("class") == "first-available") {
                $(this).addClass("selecting-seat");
                $(this).removeClass("available-seat");
                $(this).removeClass("first-available");
                selectedSeat.push(parseInt($(this).attr("id")));
                if (res.event.firstClass.includes(parseInt($(this).attr("id")))) {
                    price += res.event.priceFirst;
                } else {
                    price += res.event.priceEconomic;
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
                    price -= res.event.priceFirst;
                } else {
                    price -= res.event.priceEconomic;
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
        $("#3").on("click", function () {
            if ($(this).attr("class") == "booked-seat") {
                alert("This seat is alread booked");
            } else if ($(this).attr("class") == "available-seat" || $(this).attr("class") == "first-available") {
                $(this).addClass("selecting-seat");
                $(this).removeClass("available-seat");
                $(this).removeClass("first-available");
                selectedSeat.push(parseInt($(this).attr("id")));
                if (res.event.firstClass.includes(parseInt($(this).attr("id")))) {
                    price += res.event.priceFirst;
                } else {
                    price += res.event.priceEconomic;
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
                    price -= res.event.priceFirst;
                } else {
                    price -= res.event.priceEconomic;
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
        $("#4").on("click", function () {
            if ($(this).attr("class") == "booked-seat") {
                alert("This seat is alread booked");
            } else if ($(this).attr("class") == "available-seat" || $(this).attr("class") == "first-available") {
                $(this).addClass("selecting-seat");
                $(this).removeClass("available-seat");
                $(this).removeClass("first-available");
                selectedSeat.push(parseInt($(this).attr("id")));
                if (res.event.firstClass.includes(parseInt($(this).attr("id")))) {
                    price += res.event.priceFirst;
                } else {
                    price += res.event.priceEconomic;
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
                    price -= res.event.priceFirst;
                } else {
                    price -= res.event.priceEconomic;
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
        $("#5").on("click", function () {
            if ($(this).attr("class") == "booked-seat") {
                alert("This seat is alread booked");
            } else if ($(this).attr("class") == "available-seat" || $(this).attr("class") == "first-available") {
                $(this).addClass("selecting-seat");
                $(this).removeClass("available-seat");
                $(this).removeClass("first-available");
                selectedSeat.push(parseInt($(this).attr("id")));
                if (res.event.firstClass.includes(parseInt($(this).attr("id")))) {
                    price += res.event.priceFirst;
                } else {
                    price += res.event.priceEconomic;
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
                    price -= res.event.priceFirst;
                } else {
                    price -= res.event.priceEconomic;
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
        $("#6").on("click", function () {
            if ($(this).attr("class") == "booked-seat") {
                alert("This seat is alread booked");
            } else if ($(this).attr("class") == "available-seat" || $(this).attr("class") == "first-available") {
                $(this).addClass("selecting-seat");
                $(this).removeClass("available-seat");
                $(this).removeClass("first-available");
                selectedSeat.push(parseInt($(this).attr("id")));
                if (res.event.firstClass.includes(parseInt($(this).attr("id")))) {
                    price += res.event.priceFirst;
                } else {
                    price += res.event.priceEconomic;
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
                    price -= res.event.priceFirst;
                } else {
                    price -= res.event.priceEconomic;
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
        $("#7").on("click", function () {
            if ($(this).attr("class") == "booked-seat") {
                alert("This seat is alread booked");
            } else if ($(this).attr("class") == "available-seat" || $(this).attr("class") == "first-available") {
                $(this).addClass("selecting-seat");
                $(this).removeClass("available-seat");
                $(this).removeClass("first-available");
                selectedSeat.push(parseInt($(this).attr("id")));
                if (res.event.firstClass.includes(parseInt($(this).attr("id")))) {
                    price += res.event.priceFirst;
                } else {
                    price += res.event.priceEconomic;
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
                    price -= res.event.priceFirst;
                } else {
                    price -= res.event.priceEconomic;
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
        $("#8").on("click", function () {
            if ($(this).attr("class") == "booked-seat") {
                alert("This seat is alread booked");
            } else if ($(this).attr("class") == "available-seat" || $(this).attr("class") == "first-available") {
                $(this).addClass("selecting-seat");
                $(this).removeClass("available-seat");
                $(this).removeClass("first-available");
                selectedSeat.push(parseInt($(this).attr("id")));
                if (res.event.firstClass.includes(parseInt($(this).attr("id")))) {
                    price += res.event.priceFirst;
                } else {
                    price += res.event.priceEconomic;
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
                    price -= res.event.priceFirst;
                } else {
                    price -= res.event.priceEconomic;
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
        $("#9").on("click", function () {
            if ($(this).attr("class") == "booked-seat") {
                alert("This seat is alread booked");
            } else if ($(this).attr("class") == "available-seat" || $(this).attr("class") == "first-available") {
                $(this).addClass("selecting-seat");
                $(this).removeClass("available-seat");
                $(this).removeClass("first-available");
                selectedSeat.push(parseInt($(this).attr("id")));
                if (res.event.firstClass.includes(parseInt($(this).attr("id")))) {
                    price += res.event.priceFirst;
                } else {
                    price += res.event.priceEconomic;
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
                    price -= res.event.priceFirst;
                } else {
                    price -= res.event.priceEconomic;
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
        $("#10").on("click", function () {
            if ($(this).attr("class") == "booked-seat") {
                alert("This seat is alread booked");
            } else if ($(this).attr("class") == "available-seat" || $(this).attr("class") == "first-available") {
                $(this).addClass("selecting-seat");
                $(this).removeClass("available-seat");
                $(this).removeClass("first-available");
                selectedSeat.push(parseInt($(this).attr("id")));
                if (res.event.firstClass.includes(parseInt($(this).attr("id")))) {
                    price += res.event.priceFirst;
                } else {
                    price += res.event.priceEconomic;
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
                    price -= res.event.priceFirst;
                } else {
                    price -= res.event.priceEconomic;
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
        $("#11").on("click", function () {
            if ($(this).attr("class") == "booked-seat") {
                alert("This seat is alread booked");
            } else if ($(this).attr("class") == "available-seat" || $(this).attr("class") == "first-available") {
                $(this).addClass("selecting-seat");
                $(this).removeClass("available-seat");
                $(this).removeClass("first-available");
                selectedSeat.push(parseInt($(this).attr("id")));
                if (res.event.firstClass.includes(parseInt($(this).attr("id")))) {
                    price += res.event.priceFirst;
                } else {
                    price += res.event.priceEconomic;
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
                    price -= res.event.priceFirst;
                } else {
                    price -= res.event.priceEconomic;
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
        $("#12").on("click", function () {
            if ($(this).attr("class") == "booked-seat") {
                alert("This seat is alread booked");
            } else if ($(this).attr("class") == "available-seat" || $(this).attr("class") == "first-available") {
                $(this).addClass("selecting-seat");
                $(this).removeClass("available-seat");
                $(this).removeClass("first-available");
                selectedSeat.push(parseInt($(this).attr("id")));
                if (res.event.firstClass.includes(parseInt($(this).attr("id")))) {
                    price += res.event.priceFirst;
                } else {
                    price += res.event.priceEconomic;
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
                    price -= res.event.priceFirst;
                } else {
                    price -= res.event.priceEconomic;
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
        $("#13").on("click", function () {
            if ($(this).attr("class") == "booked-seat") {
                alert("This seat is alread booked");
            } else if ($(this).attr("class") == "available-seat" || $(this).attr("class") == "first-available") {
                $(this).addClass("selecting-seat");
                $(this).removeClass("available-seat");
                $(this).removeClass("first-available");
                selectedSeat.push(parseInt($(this).attr("id")));
                if (res.event.firstClass.includes(parseInt($(this).attr("id")))) {
                    price += res.event.priceFirst;
                } else {
                    price += res.event.priceEconomic;
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
                    price -= res.event.priceFirst;
                } else {
                    price -= res.event.priceEconomic;
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
        $("#14").on("click", function () {
            if ($(this).attr("class") == "booked-seat") {
                alert("This seat is alread booked");
            } else if ($(this).attr("class") == "available-seat" || $(this).attr("class") == "first-available") {
                $(this).addClass("selecting-seat");
                $(this).removeClass("available-seat");
                $(this).removeClass("first-available");
                selectedSeat.push(parseInt($(this).attr("id")));
                if (res.event.firstClass.includes(parseInt($(this).attr("id")))) {
                    price += res.event.priceFirst;
                } else {
                    price += res.event.priceEconomic;
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
                    price -= res.event.priceFirst;
                } else {
                    price -= res.event.priceEconomic;
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
        $("#15").on("click", function () {
            if ($(this).attr("class") == "booked-seat") {
                alert("This seat is alread booked");
            } else if ($(this).attr("class") == "available-seat" || $(this).attr("class") == "first-available") {
                $(this).addClass("selecting-seat");
                $(this).removeClass("available-seat");
                $(this).removeClass("first-available");
                selectedSeat.push(parseInt($(this).attr("id")));
                if (res.event.firstClass.includes(parseInt($(this).attr("id")))) {
                    price += res.event.priceFirst;
                } else {
                    price += res.event.priceEconomic;
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
                    price -= res.event.priceFirst;
                } else {
                    price -= res.event.priceEconomic;
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
        $("#16").on("click", function () {
            if ($(this).attr("class") == "booked-seat") {
                alert("This seat is alread booked");
            } else if ($(this).attr("class") == "available-seat" || $(this).attr("class") == "first-available") {
                $(this).addClass("selecting-seat");
                $(this).removeClass("available-seat");
                $(this).removeClass("first-available");
                selectedSeat.push(parseInt($(this).attr("id")));
                if (res.event.firstClass.includes(parseInt($(this).attr("id")))) {
                    price += res.event.priceFirst;
                } else {
                    price += res.event.priceEconomic;
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
                    price -= res.event.priceFirst;
                } else {
                    price -= res.event.priceEconomic;
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
        $("#17").on("click", function () {
            if ($(this).attr("class") == "booked-seat") {
                alert("This seat is alread booked");
            } else if ($(this).attr("class") == "available-seat" || $(this).attr("class") == "first-available") {
                $(this).addClass("selecting-seat");
                $(this).removeClass("available-seat");
                $(this).removeClass("first-available");
                selectedSeat.push(parseInt($(this).attr("id")));
                if (res.event.firstClass.includes(parseInt($(this).attr("id")))) {
                    price += res.event.priceFirst;
                } else {
                    price += res.event.priceEconomic;
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
                    price -= res.event.priceFirst;
                } else {
                    price -= res.event.priceEconomic;
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
        $("#18").on("click", function () {
            if ($(this).attr("class") == "booked-seat") {
                alert("This seat is alread booked");
            } else if ($(this).attr("class") == "available-seat" || $(this).attr("class") == "first-available") {
                $(this).addClass("selecting-seat");
                $(this).removeClass("available-seat");
                $(this).removeClass("first-available");
                selectedSeat.push(parseInt($(this).attr("id")));
                if (res.event.firstClass.includes(parseInt($(this).attr("id")))) {
                    price += res.event.priceFirst;
                } else {
                    price += res.event.priceEconomic;
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
                    price -= res.event.priceFirst;
                } else {
                    price -= res.event.priceEconomic;
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
        $("#19").on("click", function () {
            if ($(this).attr("class") == "booked-seat") {
                alert("This seat is alread booked");
            } else if ($(this).attr("class") == "available-seat" || $(this).attr("class") == "first-available") {
                $(this).addClass("selecting-seat");
                $(this).removeClass("available-seat");
                $(this).removeClass("first-available");
                selectedSeat.push(parseInt($(this).attr("id")));
                if (res.event.firstClass.includes(parseInt($(this).attr("id")))) {
                    price += res.event.priceFirst;
                } else {
                    price += res.event.priceEconomic;
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
                    price -= res.event.priceFirst;
                } else {
                    price -= res.event.priceEconomic;
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
        $("#20").on("click", function () {
            if ($(this).attr("class") == "booked-seat") {
                alert("This seat is alread booked");
            } else if ($(this).attr("class") == "available-seat" || $(this).attr("class") == "first-available") {
                $(this).addClass("selecting-seat");
                $(this).removeClass("available-seat");
                $(this).removeClass("first-available");
                selectedSeat.push(parseInt($(this).attr("id")));
                if (res.event.firstClass.includes(parseInt($(this).attr("id")))) {
                    price += res.event.priceFirst;
                } else {
                    price += res.event.priceEconomic;
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
                    price -= res.event.priceFirst;
                } else {
                    price -= res.event.priceEconomic;
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
        $("#21").on("click", function () {
            if ($(this).attr("class") == "booked-seat") {
                alert("This seat is alread booked");
            } else if ($(this).attr("class") == "available-seat" || $(this).attr("class") == "first-available") {
                $(this).addClass("selecting-seat");
                $(this).removeClass("available-seat");
                $(this).removeClass("first-available");
                selectedSeat.push(parseInt($(this).attr("id")));
                if (res.event.firstClass.includes(parseInt($(this).attr("id")))) {
                    price += res.event.priceFirst;
                } else {
                    price += res.event.priceEconomic;
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
                    price -= res.event.priceFirst;
                } else {
                    price -= res.event.priceEconomic;
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
        $("#22").on("click", function () {
            if ($(this).attr("class") == "booked-seat") {
                alert("This seat is alread booked");
            } else if ($(this).attr("class") == "available-seat" || $(this).attr("class") == "first-available") {
                $(this).addClass("selecting-seat");
                $(this).removeClass("available-seat");
                $(this).removeClass("first-available");
                selectedSeat.push(parseInt($(this).attr("id")));
                if (res.event.firstClass.includes(parseInt($(this).attr("id")))) {
                    price += res.event.priceFirst;
                } else {
                    price += res.event.priceEconomic;
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
                    price -= res.event.priceFirst;
                } else {
                    price -= res.event.priceEconomic;
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
        $("#23").on("click", function () {
            if ($(this).attr("class") == "booked-seat") {
                alert("This seat is alread booked");
            } else if ($(this).attr("class") == "available-seat" || $(this).attr("class") == "first-available") {
                $(this).addClass("selecting-seat");
                $(this).removeClass("available-seat");
                $(this).removeClass("first-available");
                selectedSeat.push(parseInt($(this).attr("id")));
                if (res.event.firstClass.includes(parseInt($(this).attr("id")))) {
                    price += res.event.priceFirst;
                } else {
                    price += res.event.priceEconomic;
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
                    price -= res.event.priceFirst;
                } else {
                    price -= res.event.priceEconomic;
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
        $("#24").on("click", function () {
            if ($(this).attr("class") == "booked-seat") {
                alert("This seat is alread booked");
            } else if ($(this).attr("class") == "available-seat" || $(this).attr("class") == "first-available") {
                $(this).addClass("selecting-seat");
                $(this).removeClass("available-seat");
                $(this).removeClass("first-available");
                selectedSeat.push(parseInt($(this).attr("id")));
                if (res.event.firstClass.includes(parseInt($(this).attr("id")))) {
                    price += res.event.priceFirst;
                } else {
                    price += res.event.priceEconomic;
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
                    price -= res.event.priceFirst;
                } else {
                    price -= res.event.priceEconomic;
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
        $("#25").on("click", function () {
            if ($(this).attr("class") == "booked-seat") {
                alert("This seat is alread booked");
            } else if ($(this).attr("class") == "available-seat" || $(this).attr("class") == "first-available") {
                $(this).addClass("selecting-seat");
                $(this).removeClass("available-seat");
                $(this).removeClass("first-available");
                selectedSeat.push(parseInt($(this).attr("id")));
                if (res.event.firstClass.includes(parseInt($(this).attr("id")))) {
                    price += res.event.priceFirst;
                } else {
                    price += res.event.priceEconomic;
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
                    price -= res.event.priceFirst;
                } else {
                    price -= res.event.priceEconomic;
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
        $("#26").on("click", function () {
            if ($(this).attr("class") == "booked-seat") {
                alert("This seat is alread booked");
            } else if ($(this).attr("class") == "available-seat" || $(this).attr("class") == "first-available") {
                $(this).addClass("selecting-seat");
                $(this).removeClass("available-seat");
                $(this).removeClass("first-available");
                selectedSeat.push(parseInt($(this).attr("id")));
                if (res.event.firstClass.includes(parseInt($(this).attr("id")))) {
                    price += res.event.priceFirst;
                } else {
                    price += res.event.priceEconomic;
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
                    price -= res.event.priceFirst;
                } else {
                    price -= res.event.priceEconomic;
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
        $("#27").on("click", function () {
            if ($(this).attr("class") == "booked-seat") {
                alert("This seat is alread booked");
            } else if ($(this).attr("class") == "available-seat" || $(this).attr("class") == "first-available") {
                $(this).addClass("selecting-seat");
                $(this).removeClass("available-seat");
                $(this).removeClass("first-available");
                selectedSeat.push(parseInt($(this).attr("id")));
                if (res.event.firstClass.includes(parseInt($(this).attr("id")))) {
                    price += res.event.priceFirst;
                } else {
                    price += res.event.priceEconomic;
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
                    price -= res.event.priceFirst;
                } else {
                    price -= res.event.priceEconomic;
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
        $("#28").on("click", function () {
            if ($(this).attr("class") == "booked-seat") {
                alert("This seat is alread booked");
            } else if ($(this).attr("class") == "available-seat" || $(this).attr("class") == "first-available") {
                $(this).addClass("selecting-seat");
                $(this).removeClass("available-seat");
                $(this).removeClass("first-available");
                selectedSeat.push(parseInt($(this).attr("id")));
                if (res.event.firstClass.includes(parseInt($(this).attr("id")))) {
                    price += res.event.priceFirst;
                } else {
                    price += res.event.priceEconomic;
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
                    price -= res.event.priceFirst;
                } else {
                    price -= res.event.priceEconomic;
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
        $("#29").on("click", function () {
            if ($(this).attr("class") == "booked-seat") {
                alert("This seat is alread booked");
            } else if ($(this).attr("class") == "available-seat" || $(this).attr("class") == "first-available") {
                $(this).addClass("selecting-seat");
                $(this).removeClass("available-seat");
                $(this).removeClass("first-available");
                selectedSeat.push(parseInt($(this).attr("id")));
                if (res.event.firstClass.includes(parseInt($(this).attr("id")))) {
                    price += res.event.priceFirst;
                } else {
                    price += res.event.priceEconomic;
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
                    price -= res.event.priceFirst;
                } else {
                    price -= res.event.priceEconomic;
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
        $("#30").on("click", function () {
            if ($(this).attr("class") == "booked-seat") {
                alert("This seat is alread booked");
            } else if ($(this).attr("class") == "available-seat" || $(this).attr("class") == "first-available") {
                $(this).addClass("selecting-seat");
                $(this).removeClass("available-seat");
                $(this).removeClass("first-available");
                selectedSeat.push(parseInt($(this).attr("id")));
                if (res.event.firstClass.includes(parseInt($(this).attr("id")))) {
                    price += res.event.priceFirst;
                } else {
                    price += res.event.priceEconomic;
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
                    price -= res.event.priceFirst;
                } else {
                    price -= res.event.priceEconomic;
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
        $("#31").on("click", function () {
            if ($(this).attr("class") == "booked-seat") {
                alert("This seat is alread booked");
            } else if ($(this).attr("class") == "available-seat" || $(this).attr("class") == "first-available") {
                $(this).addClass("selecting-seat");
                $(this).removeClass("available-seat");
                $(this).removeClass("first-available");
                selectedSeat.push(parseInt($(this).attr("id")));
                if (res.event.firstClass.includes(parseInt($(this).attr("id")))) {
                    price += res.event.priceFirst;
                } else {
                    price += res.event.priceEconomic;
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
                    price -= res.event.priceFirst;
                } else {
                    price -= res.event.priceEconomic;
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
        $("#32").on("click", function () {
            if ($(this).attr("class") == "booked-seat") {
                alert("This seat is alread booked");
            } else if ($(this).attr("class") == "available-seat" || $(this).attr("class") == "first-available") {
                $(this).addClass("selecting-seat");
                $(this).removeClass("available-seat");
                $(this).removeClass("first-available");
                selectedSeat.push(parseInt($(this).attr("id")));
                if (res.event.firstClass.includes(parseInt($(this).attr("id")))) {
                    price += res.event.priceFirst;
                } else {
                    price += res.event.priceEconomic;
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
                    price -= res.event.priceFirst;
                } else {
                    price -= res.event.priceEconomic;
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
        $("#33").on("click", function () {
            if ($(this).attr("class") == "booked-seat") {
                alert("This seat is alread booked");
            } else if ($(this).attr("class") == "available-seat" || $(this).attr("class") == "first-available") {
                $(this).addClass("selecting-seat");
                $(this).removeClass("available-seat");
                $(this).removeClass("first-available");
                selectedSeat.push(parseInt($(this).attr("id")));
                if (res.event.firstClass.includes(parseInt($(this).attr("id")))) {
                    price += res.event.priceFirst;
                } else {
                    price += res.event.priceEconomic;
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
                    price -= res.event.priceFirst;
                } else {
                    price -= res.event.priceEconomic;
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
        $("#34").on("click", function () {
            if ($(this).attr("class") == "booked-seat") {
                alert("This seat is alread booked");
            } else if ($(this).attr("class") == "available-seat" || $(this).attr("class") == "first-available") {
                $(this).addClass("selecting-seat");
                $(this).removeClass("available-seat");
                $(this).removeClass("first-available");
                selectedSeat.push(parseInt($(this).attr("id")));
                if (res.event.firstClass.includes(parseInt($(this).attr("id")))) {
                    price += res.event.priceFirst;
                } else {
                    price += res.event.priceEconomic;
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
                    price -= res.event.priceFirst;
                } else {
                    price -= res.event.priceEconomic;
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
        $("#35").on("click", function () {
            if ($(this).attr("class") == "booked-seat") {
                alert("This seat is alread booked");
            } else if ($(this).attr("class") == "available-seat" || $(this).attr("class") == "first-available") {
                $(this).addClass("selecting-seat");
                $(this).removeClass("available-seat");
                $(this).removeClass("first-available");
                selectedSeat.push(parseInt($(this).attr("id")));
                if (res.event.firstClass.includes(parseInt($(this).attr("id")))) {
                    price += res.event.priceFirst;
                } else {
                    price += res.event.priceEconomic;
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
                    price -= res.event.priceFirst;
                } else {
                    price -= res.event.priceEconomic;
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
        $("#36").on("click", function () {
            if ($(this).attr("class") == "booked-seat") {
                alert("This seat is alread booked");
            } else if ($(this).attr("class") == "available-seat" || $(this).attr("class") == "first-available") {
                $(this).addClass("selecting-seat");
                $(this).removeClass("available-seat");
                $(this).removeClass("first-available");
                selectedSeat.push(parseInt($(this).attr("id")));
                if (res.event.firstClass.includes(parseInt($(this).attr("id")))) {
                    price += res.event.priceFirst;
                } else {
                    price += res.event.priceEconomic;
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
                    price -= res.event.priceFirst;
                } else {
                    price -= res.event.priceEconomic;
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
        $("#37").on("click", function () {
            if ($(this).attr("class") == "booked-seat") {
                alert("This seat is alread booked");
            } else if ($(this).attr("class") == "available-seat" || $(this).attr("class") == "first-available") {
                $(this).addClass("selecting-seat");
                $(this).removeClass("available-seat");
                $(this).removeClass("first-available");
                selectedSeat.push(parseInt($(this).attr("id")));
                if (res.event.firstClass.includes(parseInt($(this).attr("id")))) {
                    price += res.event.priceFirst;
                } else {
                    price += res.event.priceEconomic;
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
                    price -= res.event.priceFirst;
                } else {
                    price -= res.event.priceEconomic;
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
        $("#38").on("click", function () {
            if ($(this).attr("class") == "booked-seat") {
                alert("This seat is alread booked");
            } else if ($(this).attr("class") == "available-seat" || $(this).attr("class") == "first-available") {
                $(this).addClass("selecting-seat");
                $(this).removeClass("available-seat");
                $(this).removeClass("first-available");
                selectedSeat.push(parseInt($(this).attr("id")));
                if (res.event.firstClass.includes(parseInt($(this).attr("id")))) {
                    price += res.event.priceFirst;
                } else {
                    price += res.event.priceEconomic;
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
                    price -= res.event.priceFirst;
                } else {
                    price -= res.event.priceEconomic;
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
        $("#39").on("click", function () {
            if ($(this).attr("class") == "booked-seat") {
                alert("This seat is alread booked");
            } else if ($(this).attr("class") == "available-seat" || $(this).attr("class") == "first-available") {
                $(this).addClass("selecting-seat");
                $(this).removeClass("available-seat");
                $(this).removeClass("first-available");
                selectedSeat.push(parseInt($(this).attr("id")));
                if (res.event.firstClass.includes(parseInt($(this).attr("id")))) {
                    price += res.event.priceFirst;
                } else {
                    price += res.event.priceEconomic;
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
                    price -= res.event.priceFirst;
                } else {
                    price -= res.event.priceEconomic;
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
        $("#40").on("click", function () {
            if ($(this).attr("class") == "booked-seat") {
                alert("This seat is alread booked");
            } else if ($(this).attr("class") == "available-seat" || $(this).attr("class") == "first-available") {
                $(this).addClass("selecting-seat");
                $(this).removeClass("available-seat");
                $(this).removeClass("first-available");
                selectedSeat.push(parseInt($(this).attr("id")));
                if (res.event.firstClass.includes(parseInt($(this).attr("id")))) {
                    price += res.event.priceFirst;
                } else {
                    price += res.event.priceEconomic;
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
                    price -= res.event.priceFirst;
                } else {
                    price -= res.event.priceEconomic;
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
    }).fail(function (response) {
        const jsonObject = JSON.parse(response.responseJSON);
        if (jsonObject.status == "failed" && jsonObject.message != "") {
            alert(`${jsonObject.message}`);
        } else {
            alert(`An unknown error has occured`);
        }
    });
});
