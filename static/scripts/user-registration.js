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
 * Validate the input field of user registration
 *
 * @param event of the form submit
 * @returns Bolleans - True when the form has no error detected
 */
function validateForm() {
    let firstName;
    let lastName;
    let gender;
    let birthday;
    let username;
    let password;
    let email;
    let valid = true;

    /* 
    Input checking for first name 
    - Check for no input
    */
    try {
        const ele = $("#user-firstname");
        firstName = ele.val();
        firstName = firstName.trim();
        if (firstName == "") {
            // Invalid: Missing input
            ele.removeClass("is-valid").addClass("is-invalid");
            valid = false;
        } else {
            // Valid
            ele.removeClass("is-invalid").addClass("is-valid");
        }
    } catch (error) {
        // Invalid: Fetch error
        const ele = $("#user-firstname");
        ele.removeClass("is-valid").addClass("is-invalid");
        valid = false;
    }

    /* 
    Input checking for last name 
    - Check for no input
    */
    try {
        const ele = $("#user-lastname");
        lastName = ele.val();
        lastName = lastName.trim();
        if (lastName == "") {
            // Invalid: Missing input
            ele.removeClass("is-valid").addClass("is-invalid");
            valid = false;
        } else {
            // Valid
            ele.removeClass("is-invalid").addClass("is-valid");
        }
    } catch (error) {
        // Invalid: Fetch error
        const ele = $("#user-lastname");
        ele.removeClass("is-valid").addClass("is-invalid");
        valid = false;
    }

    /* 
    Input checking for gender 
    - Check for no input
    */
    try {
        gender = document.querySelector('input[name="gender"]:checked').value;
        const ele = $("#female");
        if (gender == "") {
            // Invalid: Missing input
            ele.removeClass("is-valid").addClass("is-invalid");
            valid = false;
        } else {
            // Valid
            ele.removeClass("is-invalid").addClass("is-valid");
        }
    } catch (error) {
        // Invalid: Fetch error
        const ele = $("#female");
        ele.removeClass("is-valid").addClass("is-invalid");
        valid = false;
    }

    /* 
    Input checking for birthday 
    - Check for no input
    */
    try {
        const ele = $("#user-birthday");
        birthday = ele.val();
        birthday = birthday;
        if (birthday == "") {
            // Invalid: Missing input
            ele.removeClass("is-valid").addClass("is-invalid");
            valid = false;
        } else {
            // Valid
            ele.removeClass("is-invalid").addClass("is-valid");
        }
    } catch (error) {
        // Invalid: Fetch error
        const ele = $("#user-birthday");
        ele.removeClass("is-valid").addClass("is-invalid");
        valid = false;
    }

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
        const ele = $("#user-password");
        password = ele.val();
        password = password.trim();
        passwordrp = $("#user-passwordrp").val();
        passwordrp = passwordrp.trim();
        const strength = calculatePasswordStrength(password);
        if (password == "") {
            // Invalid: Missing input
            ele.removeClass("is-valid").addClass("is-invalid");
            valid = false;
        } else if (strength <= 2) {
            // Invalid: Password not strong enough
            ele.removeClass("is-valid").addClass("is-invalid");
            valid = false;
        } else if (password != passwordrp) {
            // Invalid: Password does not match
            ele.removeClass("is-invalid").addClass("is-valid");
            $("#user-passwordrp").removeClass("is-valid").addClass("is-invalid");
            valid = false;
        } else {
            // Valid
            ele.removeClass("is-invalid").addClass("is-valid");
            $("#user-passwordrp").removeClass("is-invalid").addClass("is-valid");
        }
    } catch (error) {
        // Invalid: Fetch error
        const ele = $("#user-password");
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
    const file = document.getElementById("profileImage").files[0];
    console.log(file);

    const user = {
        firstName: firstName,
        lastName: lastName,
        gender: gender,
        birthday: birthday,
        username: username,
        password: password,
        email: email,
        file: file,
    };

    let data = new FormData(document.getElementById("registration-form"));
    for (const pair of data.entries()) {
        console.log(`${pair[0]}, ${pair[1]}`);
    }

    let result = await (
        await fetch("auth/register", {
            method: "POST",
            withCredentials: true,
            credentials: "include",
            headers: {
                Accept: "application/json",
            },
            body: data,
        })
    ).json();

    const jsonObject = JSON.parse(result);

    if (jsonObject.status == "success") {
        alert(`Welcome, ${jsonObject.username}!\nYou can login with your account now!`);
    } else if (jsonObject.status == "failed" && jsonObject.message != "") {
        alert(`${jsonObject.message}`);
    } else {
        alert(`An unknown error has occured`);
    }

    /*
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
    */
}
