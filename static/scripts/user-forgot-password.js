$.when($(document).ready).then(function () {
    // When the user input the password, update the strength meter
    $("#forgot-password").on("input", function () {
        updateMeter();
    });

    // Show the password suggestions when focused
    $("#forgot-password").on("focus", function () {
        $("#password-suggestion").addClass("d-flex").removeClass("d-none");
    });

    // Hide the password suggestions when not focused
    $("#forgot-password").on("blur", function () {
        $("#password-suggestion").addClass("d-none").removeClass("d-flex");
    });
});

/**
 * Update password strength meter
 *
 *
 *
 */
function updateMeter() {
    const ele = $("#forgot-password");
    const meterSections = document.querySelectorAll(".meter-section");
    password = ele.val().trim();

    const strength = calculatePasswordStrength(password);

    // Remove all strength classes
    meterSections.forEach((section) => {
        section.classList.remove("weak", "medium", "strong", "very-strong");
    });

    // Add the appropriate strength class based on the strength value
    if (strength >= 1) {
        meterSections[0].classList.add("weak");
    }
    if (strength >= 2) {
        meterSections[1].classList.add("medium");
    }
    if (strength >= 3) {
        meterSections[2].classList.add("strong");
    }
    if (strength >= 4) {
        meterSections[3].classList.add("very-strong");
    }
}

/**
 * Calcalate password strength
 *
 * @param password
 * @returns float
 */
function calculatePasswordStrength(pw) {
    const password = pw;
    const lengthWeight = 0.2;
    const uppercaseWeight = 0.5;
    const lowercaseWeight = 0.5;
    const numberWeight = 0.7;
    const symbolWeight = 1;

    let strength = 0;

    // Password strength based on length
    strength += password.length * lengthWeight;

    // Password strength based on uppercase letters
    if (/[A-Z]/.test(password)) {
        strength += uppercaseWeight;
    }

    // Password strength based on lowercase letters
    if (/[a-z]/.test(password)) {
        strength += lowercaseWeight;
    }

    // Password strength based on numbers
    if (/\d/.test(password)) {
        strength += numberWeight;
    }

    // Password strength based on symbols
    if (/[^A-Za-z0-9]/.test(password)) {
        strength += symbolWeight;
    }

    return strength;
}

async function validateForm() {
    let email;
    let username;
    let password;
    let valid = true;

    /* 
    Input checking username 
    - Check for no input
    - Check for duplicates
    */
    try {
        const ele = $("#user-name");
        username = ele.val();
        username = username;
        if (username == "") {
            // Invalid: Missing input
            ele.removeClass("is-valid").addClass("is-invalid");
            valid = false;
        } else {
            ele.removeClass("is-invalid").addClass("is-valid");
        }
    } catch (error) {
        // Invalid: Fetch error
        const ele = $("#user-name");
        ele.removeClass("is-valid").addClass("is-invalid");
        valid = false;
    }

    /* 
    Input checking for password 
    - Check for no input
    - Check for password strength
    - Check for not match password
    */
    try {
        const ele = $("#forgot-password");
        password = ele.val();
        passwordrp = $("#forgot-passwordrp").val();
        const strength = calculatePasswordStrength(password);
        if (password == "") {
            // Invalid: Missing input
            ele.removeClass("is-valid").addClass("is-invalid");
            valid = false;
        } else if (strength < 2) {
            // Invalid: Password not strong enough
            console.log(strength);
            ele.removeClass("is-valid").addClass("is-invalid");
            valid = false;
        } else if (password != passwordrp) {
            // Invalid: Password does not match
            ele.removeClass("is-invalid").addClass("is-valid");
            $("#forgot-passwordrp").removeClass("is-valid").addClass("is-invalid");
            valid = false;
        } else {
            // Valid
            ele.removeClass("is-invalid").addClass("is-valid");
            $("#forgot-passwordrp").removeClass("is-invalid").addClass("is-valid");
        }
    } catch (error) {
        // Invalid: Fetch error
        const ele = $("#forgot-password");
        ele.removeClass("is-valid").addClass("is-invalid");
        valid = false;
    }

    /* 
    Input checking for email 
    - Check for no input
    - Check for email patterns
    */
    try {
        const ele = $("#user-email");
        email = ele.val();
        email = email.toLowerCase().trim();
        if (email == "") {
            // Invalid: Missing input
            ele.removeClass("is-valid").addClass("is-invalid");
            valid = false;
        } else if (
            !email.match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
        ) {
            // Invalid: Invalid email pattern
            ele.removeClass("is-valid").addClass("is-invalid");
            valid = false;
        } else {
            // Valid
            ele.removeClass("is-invalid").addClass("is-valid");
        }
    } catch (error) {
        // Invalid: Fetch error
        const ele = $("#user-email");
        ele.removeClass("is-valid").addClass("is-invalid");
        valid = false;
    }

    // Function return true if no error is detected
    return valid;
}

/**
 * Trigger by register button to validate and send request to server
 * @param {*} event
 * @returns
 */
async function forgot_password(event) {
    event.preventDefault();
    // Validate registration form, return if the form is invalid
    if (!validateForm()) return;

    const email = $("#user-email").val();
    const username = $("#user-username").val();
    let password = $("#forgot-password").val();

    const user = {
        username: username,
        password: password,
        email: email,
    };

    $.post(
        "auth/forgot-password",
        user,
        function (response) {
            const jsonObject = JSON.parse(response);
            if (jsonObject.status == "success") {
                alert(`Welcome, ${jsonObject.username}!\nYou can login with your new password now!`);
            } else {
                alert(`${jsonObject.message}`);
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
