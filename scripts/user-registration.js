$.when($(document).ready).then(function() {

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