$.when($(document).ready).then(function () {
    $.post(
        "event/getAllEvents",
        {},
        function (response) {
            const jsonObject = JSON.parse(response);
            console.log(jsonObject);
            for (i = 0; i < jsonObject.events.length; i++) {
                let dt = new Date(parseInt(jsonObject.events[i].departureTime));
                let at = new Date(parseInt(jsonObject.events[i].arriveTime));
                $("#train-id").append(`
                        <option value="${jsonObject.events[i].trainNumber}">${jsonObject.events[i].trainNumber}</option>
                `);
            }
        },
        "json"
    ).fail(function (response) {
        const jsonObject = JSON.parse(response.responseJSON);
        if (jsonObject.status == "failed" && jsonObject.message != "") {
            alert(`${jsonObject.message}`);
        } else {
            alert(`An unknown error has occured`);
        }
    });

    $("#train-id").on("change", () => {
        const queryTrainNumber = $("#train-id").val();
        $.post(
            "event/getEventByTrainNumber",
            { trainNumber: queryTrainNumber },
            function (response) {
                const jsonObject = JSON.parse(response);
                drawSeats(
                    parseInt(jsonObject.event.row),
                    parseInt(jsonObject.event.column),
                    jsonObject.event.occupiedSeats,
                    jsonObject.event.firstClass
                );
            },
            "json"
        ).fail(function (response) {
            const jsonObject = JSON.parse(response.responseJSON);
            if (jsonObject.status == "failed" && jsonObject.message != "") {
                alert(`${jsonObject.message}`);
            } else {
                alert(`An unknown error has occured`);
            }
        });
    });

    $("#seat-map").on("click", (event) => {
        const queryTrainNumber = $("#train-id").val();
        $.post(
            "event/getSeatOwner",
            { trainNumber: queryTrainNumber, seatNumber: event.target.id },
            function (response) {
                const jsonObject = JSON.parse(response);
                console.log(jsonObject.username);
                $("#selected-seat").text(event.target.id);
                $("#seat-owner").text(jsonObject.username);
            },
            "json"
        ).fail(function (response) {
            const jsonObject = JSON.parse(response.responseJSON);
            if (jsonObject.status == "failed" && jsonObject.message != "") {
                alert(`${jsonObject.message}`);
            } else {
                alert(`An unknown error has occured`);
            }
        });
    });
});

function edit(event) {
    const queryTrainNumber = $("#train-id").val();
    const row = $("#row").val();
    const column = $("#col").val();
    event.preventDefault();

    if (row < 0) {
        alert("Row cannot be negative");
        return;
    } else if (row == "") {
        alert("Row cannot be empty");
        return;
    } else if (column == "") {
        alert("Column cannot be empty");
        return;
    } else if (column < 0) {
        alert("Column cannot be negative");
        return;
    }

    $.post(
        "event/updateEventSeats",
        { trainNumber: queryTrainNumber, row: row, column: column },
        function (response) {
            const jsonObject = JSON.parse(response);
            if (jsonObject.status == "success") {
                alert("Updated successfully");
                window.location.reload();
            } else {
                alert("Update failed");
            }
        },
        "json"
    ).fail(function (response) {
        const jsonObject = JSON.parse(response.responseJSON);
        if (jsonObject.status == "failed" && jsonObject.message != "") {
            alert(`${jsonObject.message}`);
        } else {
            alert(`An unknown error has occured`);
        }
    });
}

function drawSeats(row, col, occupiedSeats = "", firstClass = "") {
    let seatNumber = 1;
    let heightSVG = 500;
    let widthSVG = 250;
    let startX = 0,
        startY = 0;
    const gapX = widthSVG / (col + 1);
    const gapY = heightSVG / row;
    const ns = "http://www.w3.org/2000/svg";
    const svg = document.getElementById("seat-map");

    $("seat-map").empty();

    for (i = 0; i < row; i++) {
        // Will sweep through X-axis
        for (y = 0; y < col; y++) {
            // Will sweep through Y-axis
            let seat = document.createElementNS(ns, "rect");
            seat.setAttribute("x", startX);
            seat.setAttribute("y", startY);
            seat.setAttribute("width", 50);
            seat.setAttribute("height", 50);
            seat.setAttribute("id", seatNumber);
            if (occupiedSeats.includes(seatNumber)) {
                seat.setAttribute("class", "booked-seat");
            } else if (firstClass.includes(seatNumber)) {
                seat.setAttribute("class", "first-available");
            } else {
                seat.setAttribute("class", "available-seat");
            }
            svg.appendChild(seat);

            let text = document.createElementNS(ns, "text");
            text.setAttribute("style", "fill: white;display:block");
            text.setAttribute("x", startX + gapX / 2);
            text.setAttribute("y", startY + gapY / 2);
            text.setAttribute("fill", "black");
            text.setAttribute("text-anchor", "middle");
            text.setAttribute("alignment-baseline", "central");
            text.setAttribute("class", "seat-number");
            text.textContent = seatNumber;
            text.style = "textAnchor: middle;alignmentBaseline: central";
            svg.appendChild(text);
            seatNumber++;
            startX += gapX;
            if (startX == (col / 2) * gapX) {
                startX += gapX;
            }
        }
        startX = 0;
        startY += gapY;
    }
}
