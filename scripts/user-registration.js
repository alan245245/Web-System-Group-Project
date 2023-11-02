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
    let invalid = false;

    try {
        const ele = $("#user-firstname");
        firstName = ele.val();
        firstName = firstName.trim();
        if (firstName == '') {
            // Invalid: Missing input
            invalid = true;
        }
    } catch (error) {
        alert(error.message);
        return false;
    }

    try {
        const ele = $("#user-lastname");
        lastName = ele.val();
        lastName = lastName.trim();
        if (lastName == '') {
            // Invalid: Missing input
            invalid = true;
        }
    } catch (error) {
        alert(error.message);
        return false;
    }

    try {
        gender = document.querySelector('input[name="gender"]:checked').value;
        if (gender == '') {
            // Invalid: Missing input
            invalid = true;
        }
    } catch (error) {
        alert(error.message);
        return false;
    }

    try {
        const ele = $("#user-birthday");
        birthday = ele.val();
        birthday = birthday;
        if (birthday == '') {
            // Invalid: Missing input
            invalid = true;
        }
    } catch (error) {
        alert(error.message);
        return false;
    }

    
    try {
        const ele = $("#user-name");
        username = ele.val();
        username = username;
        if (username == '') {
            // Invalid: Missing input
            invalid = true;
        }
    } catch (error) {
        alert(error.message);
        return false;
    }

    try {
        const ele = $("#user-password");
        password = ele.val();
        password = password;
        if (password == '') {
            // Invalid: Missing input
            invalid = true;
        }
    } catch (error) {
        alert(error.message);
        return false;
    }

    try {
        const ele = $("#user-email");
        email = ele.val();
        email = email.trim();
        if (email == '') {
            // Invalid: Missing input
            invalid = true;
        }
    } catch (error) {
        alert(error.message);
        return false;
    }
}