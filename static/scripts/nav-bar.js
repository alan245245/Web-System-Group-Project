$(document).ready(function () {
    if (getCookie("username") == "") {
        // Highlight sign in if the page is user-login
        const signInLink = `<li class="nav-item">
                      <a class="nav-link ${
                          window.location.pathname == "/user-login.html" ? "active" : ""
                      }" aria-current="page" href="user-login">Sign in</a>
                    </li>`;

        // Highlight register if the page is user-regitser
        const registerLink = `<li class="nav-item">
                          <a class="nav-link ${
                              window.location.pathname == "/user-registration.html" ? "active" : ""
                          }" aria-current="page" href="user-registration">Register</a>
                        </li>`;

        $("#nav-user").append(`${signInLink}${registerLink}`);
    } else {
        $("#nav-user").append(
            `<a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="bi bi-person-circle"></i>
            ${getCookie("username")} </a>
            <ul class="dropdown-menu dropdown-menu-end"> 
            <li><a class="dropdown-item" href="#">User Account Management</a></li> 
            <li> <a class="dropdown-item" id="logout" method="POST" href="#"><i class="bi bi-box-arrow-right"></i> Logout</a> </li> 
            </ul>`
        );

        $("#logout").click((event) => {
            $.post(
                "auth/logout",
                {},
                function (response) {
                    console.log(response);
                    const jsonObject = JSON.parse(response);
                    if (jsonObject.status == "success") {
                        document.cookie = "username=;isAdmin=;";
                        alert(jsonObject.message);
                        window.location.replace("event-dashboard.html");
                    }
                },
                "json"
            ).fail(function (response) {
                console.log(response);
                if (isNaN(response)) {
                    window.location.replace("event-dashboard.html");
                    return;
                }
                const jsonObject = JSON.parse(response.responseJSON);
                if (jsonObject.status == "failed" && jsonObject.message != "") {
                    alert(`${jsonObject.message}`);
                } else {
                    alert(`An unknown error has occured`);
                }
            });
        });
    }
});

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == " ") {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

var lastScrollTop = 0;
$(window).scroll(function () {
    let mybutton = document.getElementById("return-to-top");
    var st = $(this).scrollTop();
    if (st > lastScrollTop) {
        // downscroll code
        $("nav").addClass("transparent");
    } else {
        // upscroll code
        $("nav").removeClass("transparent");
    }
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
    lastScrollTop = st;
});

function returnToTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
