$().ready(() => {
    console.log("ready");
    $.post(
        "event/getAllEvents",
        {},
        function (response) {
            const jsonObject = JSON.parse(response);
            console.log(jsonObject);
            for (i = 0; i < jsonObject.events.length; i++) {
                let dt = new Date(parseInt(jsonObject.events[i].departureTime));
                let at = new Date(parseInt(jsonObject.events[i].arriveTime));
                $("#event-container").append(`
                    <ul class="list-group list-group-horizontal-xl text-center">
                        <li class="list-group-item ${
                            i % 2 == 1 ? "list-group-item-secondary" : ""
                        } flex-fill fw-bold">${jsonObject.events[i].trainNumber}</li>
                        <li class="list-group-item ${i % 2 == 1 ? "list-group-item-secondary" : ""} flex-fill">
                            <div class="text-primary">${dt.getHours() < 10 ? "0" : ""}${dt.getHours()}:${
                                dt.getMinutes() < 10 ? "0" : ""
                            }${dt.getMinutes()}</div>
                            ${jsonObject.events[i].origin}
                        </li>
                        <li class="list-group-item ${i % 2 == 1 ? "list-group-item-secondary" : ""} flex-fill">
                            ${at.getHours() - dt.getHours() < 10 ? "0" : ""}${at.getHours() - dt.getHours()}:${
                                at.getMinutes() - dt.getMinutes() < 10 ? "0" : ""
                            }${at.getMinutes() - dt.getMinutes()}<br />
                            <img class="d-none d-xl-inline" src="assets/arrow.png" width="60px" />
                            <img class="d-inline d-xl-none" src="assets/vertical-arrow.png" width="30px" />
                        </li>
                        <li class="list-group-item ${i % 2 == 1 ? "list-group-item-secondary" : ""} flex-fill">
                            <div class="text-primary">${at.getHours() < 10 ? "0" : ""}${at.getHours()}:${
                                at.getMinutes() < 10 ? "0" : ""
                            }${at.getMinutes()}</div>
                            ${jsonObject.events[i].destination}
                        </li>
                        <li class="list-group-item ${i % 2 == 1 ? "list-group-item-secondary" : ""} flex-fill">
                            First Class: $${jsonObject.events[i].priceFirst}<br class="d-inline d-xl-none" />
                            <span class="badge text-bg-secondary">Available seat: ${
                                jsonObject.events[i].occupiedSeats
                            }</span>
                            <button
                                class="btn btn-primary"
                                style="--bs-btn-padding-y: 0.05rem; --bs-btn-padding-x: 0.5rem; --bs-btn-font-size: 0.75rem"
                                id="${jsonObject.events[i].trainNumber}-first-buy">
                                Buy Ticket
                            </button>
                            <br />
                            Standard Class: $${jsonObject.events[i].priceEconomic}<br class="d-inline d-xl-none" />
                            <span class="badge text-bg-secondary">Available seat: ${
                                jsonObject.events[i].occupiedSeats
                            }</span>
                            <button
                                class="btn btn-primary"
                                style="--bs-btn-padding-y: 0.05rem; --bs-btn-padding-x: 0.5rem; --bs-btn-font-size: 0.75rem"
                                id="${jsonObject.events[i].trainNumber}-standard-buy">
                                Buy Ticket
                            </button>
                        </li>
                    </ul>
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
});
