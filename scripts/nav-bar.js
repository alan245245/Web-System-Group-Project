$(document).ready(function() {
})
var lastScrollTop = 0;
$(window).scroll(function() {
    let mybutton = document.getElementById("return-to-top");
    var st = $(this).scrollTop();
    if (st > lastScrollTop){
        // downscroll code
      $('nav').addClass('transparent');
    } else {
       // upscroll code
      $('nav').removeClass('transparent');
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
