$(document).ready(() => {
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
                        alert(`Logged as \`${jsonObject.username}\``);
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
