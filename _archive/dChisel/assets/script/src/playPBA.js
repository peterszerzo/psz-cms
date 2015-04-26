$(document).ready(function() {

    $('#launchPBA').click(function() {
        $('#canvas_1').css("display", "block");
        $("#wrapper").css("opacity", "0.1").css("pointer-events", "none");
    });

    $('#modalExit').click(function() {
        $('#canvas_1').css("display", "none");
        $("#wrapper").css("opacity", "1").css("pointer-events", "all");
    });

});
