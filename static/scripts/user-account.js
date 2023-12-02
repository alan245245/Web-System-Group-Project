$(document).ready(function () {
    $.get("/auth/me", function (response) {
        const res = JSON.parse(response);
        console.log(res);
        $("#info-container").append(`
            <li class="list-group-item"><img src="${res.curuser.path}" class="card-img-top center" alt="profile picture" /></li>
            <li class="list-group-item">First name: ${res.curuser.firstName}</li>
            <li class="list-group-item">Last name: ${res.curuser.lastName}</li>
            <li class="list-group-item">Username: ${res.curuser.username}</li>
            <li class="list-group-item">Email: ${res.curuser.email}</li>
            <li class="list-group-item">Password: <button class="btn btn-sm btn-primary">Change password</button></li>
            <li class="list-group-item">Birthday: ${res.curuser.birthday}</li>
            <li class="list-group-item">Gender: ${res.curuser.gender}</li>
        `);
    }).fail(function (response) {
        alert("Please login or register first.");
        window.open("event-dashboard", "_self");
    });
});
