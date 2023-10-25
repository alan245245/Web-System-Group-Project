$(document).ready(function(){
    if(window.innerWidth > 1000){
        $("#small-table").addClass("d-none");
    } else{
        $("#large-table").addClass("d-none");
    }
});