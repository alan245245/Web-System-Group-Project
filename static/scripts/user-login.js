$(document).ready(() => {
    if (localStorage.getItem("username") && localStorage.getItem("password")) {
        // If password is saved, load it
        $("#user-name").val(localStorage.getItem("username"));
        $("#user-password").val(localStorage.getItem("password"));
        document.getElementById("user-rememberme").checked = true;
    }

    $("#login").on("click", (event) => {
        event.preventDefault();
        const username = $("#user-name").val();
        const password = $("#user-password").val();
        if (username == "" || password == "") {
            alert("Username and password cannot be empty");
        } else {
            $.post(
                "auth/login",
                { username: username, password: password },
                function (response) {
                    const jsonObject = JSON.parse(response);
                    if (jsonObject.status == "success") {
                        setCookie("username", jsonObject.username, 60);
                        setCookie("isAdmin", jsonObject.isAdmin, 60);
                        // Implement remember password function
                        if (document.querySelector("#user-rememberme").checked) {
                            localStorage.setItem("username", username);
                            localStorage.setItem("password", password);
                        } else {
                            localStorage.setItem("username", "");
                            localStorage.setItem("password", "");
                        }
                        alert(`Logged as \`${jsonObject.username}\``);
                        window.location.replace("event-dashboard");
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
    });
});

function setCookie(cname, cvalue, exsecs) {
    const d = new Date();
    d.setTime(d.getTime() + exsecs * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
