$.when($(document).ready).then(function() {
    $("#user-password").on("input", function() {
        updateMeter();
    })
})


function validateForm() {
    let firstName;
    let lastName;
    let gender;
    let birthday;
    let username;
    let password;
    let email;
    let valid = true;

    try {
        const ele = $("#user-firstname");
        firstName = ele.val();
        firstName = firstName.trim();
        if (firstName == '') {
            // Invalid: Missing input
            ele.removeClass("is-valid");
            ele.addClass("is-invalid");
            valid = false;
        } else {
            ele.removeClass("is-invalid");
            ele.addClass("is-valid");
        }
    } catch (error) {
        alert(error.message);
    }

    try {
        const ele = $("#user-lastname");
        lastName = ele.val();
        lastName = lastName.trim();
        if (lastName == '') {
            // Invalid: Missing input
            ele.removeClass("is-valid");
            ele.addClass("is-invalid");
            valid = false;
        } else {
            ele.removeClass("is-invalid");
            ele.addClass("is-valid");
        }
    } catch (error) {
        alert(error.message);
    }

    try {
        gender = document.querySelector('input[name="gender"]:checked').value;
        const ele = $("#female");
        if (gender == '') {
            // Invalid: Missing input
            ele.removeClass("is-valid");
            ele.addClass("is-invalid");
            valid = false;
        } else {
            ele.removeClass("is-invalid");
            ele.addClass("is-valid");
        }
    } catch (error) {
        const ele = $("#female");
        ele.removeClass("is-valid");
        ele.addClass("is-invalid");
        valid = false;
    }

    try {
        const ele = $("#user-birthday");
        birthday = ele.val();
        birthday = birthday;
        if (birthday == '') {
            // Invalid: Missing input
            ele.removeClass("is-valid");
            ele.addClass("is-invalid");
            valid = false;
        } else {
            ele.removeClass("is-invalid");
            ele.addClass("is-valid");
        }
    } catch (error) {
        const ele = $("#user-birthday");
        ele.removeClass("is-valid");
        ele.addClass("is-invalid");
        valid = false;
    }

    
    try {
        const ele = $("#user-name");
        username = ele.val();
        username = username;
        if (username == '') {
            // Invalid: Missing input
            ele.removeClass("is-valid");
            ele.addClass("is-invalid");
            valid = false;
        } else {
            ele.removeClass("is-invalid");
            ele.addClass("is-valid");
        }
    } catch (error) {
        const ele = $("#user-name");
        ele.removeClass("is-valid");
        ele.addClass("is-invalid");
        valid = false;
    }

    try {
        const ele = $("#user-password");
        const msg = $("#invalid-feedback-password");
        password = ele.val();
        password = password;
        if (password == '') {
            // Invalid: Missing input
            ele.removeClass("is-valid");
            ele.addClass("is-invalid");
            valid = false;
        } else if (password.length < 8) {
            ele.removeClass("is-valid");
            ele.addClass("is-invalid");
            msg.text("Your password is too short")
        } else {
            ele.removeClass("is-invalid");
            ele.addClass("is-valid");
        }
    } catch (error) {
        const ele = $("#user-password");
        ele.removeClass("is-valid");
        ele.addClass("is-invalid");
        valid = false;
    }

    try {
        const ele = $("#user-email");
        email = ele.val();
        email = email.trim();
        if (email == '') {
            // Invalid: Missing input
            ele.removeClass("is-valid");
            ele.addClass("is-invalid");
            valid = false;
        } else {
            ele.removeClass("is-invalid");
            ele.addClass("is-valid");
        }
    } catch (error) {
        alert(error.message);
    }

    return valid;
}

function updateMeter() {
    const ele = $("#user-password");
    const meterSections = document.querySelectorAll('.meter-section');
    password = ele.val();
    
    const strength = calculatePasswordStrength(password);

    // Remove all strength classes
    meterSections.forEach((section) => {
        section.classList.remove('weak', 'medium', 'strong', 'very-strong');
    });

    // Add the appropriate strength class based on the strength value
    if (strength >= 1) {
        meterSections[0].classList.add('weak');
    }
    if (strength >= 2) {
        meterSections[1].classList.add('medium');
    }
    if (strength >= 3) {
        meterSections[2].classList.add('strong');
    }
    if (strength >= 4) {
        meterSections[3].classList.add('very-strong');
    }
}

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