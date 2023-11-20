$().ready(() => {
    console.log("ready");
    $.post(
        "event/getAllEvents",
        {},
        function (response) {
            const jsonObject = JSON.parse(response);
            console.log(jsonObject);
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
});
