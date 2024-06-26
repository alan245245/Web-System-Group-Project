$().ready(() => {
    $.post(
        "event/getAllEvents",
        {},
        function (response) {
            const jsonObject = JSON.parse(response);
            for (i = 0; i < jsonObject.events.length; i++) {
                let dt = new Date(parseInt(jsonObject.events[i].departureTime));
                let at = new Date(parseInt(jsonObject.events[i].arrivalTime));
                $("#event-container").append(`
                    <tr>
                        <th scope="row">${jsonObject.events[i].trainNumber}
                        </th>
                        <td >
                            <div class="text-primary">${dt.getHours() < 10 ? "0" : ""}${dt.getHours()}:${
                                dt.getMinutes() < 10 ? "0" : ""
                            }${dt.getMinutes()}</div>
                            ${jsonObject.events[i].origin}
                        </td>
                        <td >
                            ${at.getHours() - dt.getHours() < 10 ? "0" : ""}${at.getHours() - dt.getHours()}:${
                                at.getMinutes() - dt.getMinutes() < 10 ? "0" : ""
                            }${at.getMinutes() - dt.getMinutes()}<br />
                            <img class="" src="assets/arrow.png" width="60px" />
                        </td>
                        <td >
                            <div class="text-primary">${at.getHours() < 10 ? "0" : ""}${at.getHours()}:${
                                at.getMinutes() < 10 ? "0" : ""
                            }${at.getMinutes()}</div>
                            ${jsonObject.events[i].destination}
                        </td>
                        <td >
                            First Class: $${jsonObject.events[i].priceFirst}<br class="d-inline d-xl-none" />
                            <br />
                            Standard Class: $${jsonObject.events[i].priceEconomic}<br class="d-inline d-xl-none" />
                        </td>
                        <td >
                            <span class="badge text-bg-secondary">Available seat: ${
                                jsonObject.events[i].row * jsonObject.events[i].column -
                                jsonObject.events[i].occupiedSeats.length
                            }</span>
                            <button
                                id = "${jsonObject.events[i].trainNumber}"
                                class="btn btn-primary"
                                style="--bs-btn-padding-y: 0.05rem; --bs-btn-padding-x: 0.5rem; --bs-btn-font-size: 0.75rem">
                                Buy Ticket
                            </button>
                        </td>
                        
                    </tr>
                `);
                $(`#${jsonObject.events[i].trainNumber}`).on("click", function () {
                    //check logged
                    const trainNumber = $(this).attr("id");
                    $.get("event/checkLogin", function (response) {
                        const res = JSON.parse(response);
                        if (res.status == "success") {
                            window.open(`ticket-booking.html?trainNumber=${trainNumber}`, "_self");
                        } else {
                            alert("Please login or register before buying ticket.");
                        }
                    }).fail(function (response) {
                        alert("Please login or register before buying ticket.");
                    });
                });
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
});
