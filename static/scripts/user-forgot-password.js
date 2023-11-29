$.when($(document).ready).then(function () {
    // When the user input the password, update the strength meter
    $("#user-password").on("input", function () {
        updateMeter();
    });

    // Show the password suggestions when focused
    $("#user-password").on("focus", function () {
        $("#password-suggestion").addClass("d-flex").removeClass("d-none");
    });

    // Hide the password suggestions when not focused
    $("#user-password").on("blur", function () {
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
    const ele = $("#user-password");
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

/**
 * Trigger by register button to validate and send request to server
 * @param {*} event
 * @returns
 */
async function register(event) {
    event.preventDefault();
    // Validate registration form, return if the form is invalid
    if (!validateForm()) return;

    const firstName = $("#user-firstname").val();
    const lastName = $("#user-lastname").val();
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const birthday = $("#user-birthday").val();
    const username = $("#user-name").val();
    let password = $("#user-password").val();
    const email = $("#user-email").val();

    const user = {
        firstName: firstName,
        lastName: lastName,
        gender: gender,
        birthday: birthday,
        username: username,
        password: password,
        email: email,
    };

    $.post(
        "auth/register",
        user,
        function (response) {
            const jsonObject = JSON.parse(response);
            if (jsonObject.status == "success") {
                alert(`Welcome, ${jsonObject.username}!\nYou can login with your account now!`);
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
