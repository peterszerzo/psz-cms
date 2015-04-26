$(document).ready(function() {

    var activeModal = false, // activate modal windows to display necklace image gallery
        stage = 0, // 0 -> display photo; 1 -> display sketch; 2 -> display description
        eDescribe, // div containing item description; appears for stage=2
        eDescribeAppended = false, // stores whether eDescribe div is appended
        imageLocation, // url of background image
        necklaceIndex = 0, // keyword for naming image
        necklaceIndexS = "01"; // necklaceIndex with preceding 0

    // photo gallery global
    var GLRY = {

        imageCount: 3,

        imageIndex: 0,

        step: function() {

            imageIndex = (imageIndex + 1) % imageCount;

        }

    };

    // var pageNumber=1; -> define in php in pendant.php

    // titles array, itemsPerPage and itemsDisplayed generated in PHP

    $('.necklace').click(function() {

        activeModal = true;

        necklaceIndex = parseInt($(this).attr("data-pindex"));

        // get url of image
        necklaceIndexS = ((((necklaceIndex + 1) < 10)) ? "0" : "") + (necklaceIndex + 1).toString();

        imageLocation = "url('images/jpgWide/" + necklaceIndexS + ".jpg')";

        // set appropriate background
        $("#modal").css("background-image", imageLocation);

        // hide site
        $("#wrapper").css("opacity", "0.1").css("pointer-events", "none");

    });

    $('.archprogram').click(function() {

        activeModal = true;

        eDescribe = document.createElement("div");
        eDescribe.className = "necklace-description";
        eDescribe.innerHTML = "<p class='center'>The Miami Marine Stadium has recently been appropriated by graffiti artists, to whom no surface is off-limits. Rather than see this as dereliction, we see this as a sign of the youthfulness and desire for expression that is now embedded in the character of the stadium. We hope to incorporate this energy into the stadium’s future.</p><p class='center'>Rather than build a platform for teens to watch their idols perform, we propose the Miami Marine Stadium as a place for teens to take the stage. The ‘battle’ is a type of performance specific to the performing arts of contemporary youth culture. Though difficult to stage in typical performance spaces, the battle scenario will be spatially accommodated by proposed split bandshell stages, with the possibility to combine into a larger, single stage for more traditional events.</p>";

        $("#modal").append(eDescribe);
        eDescribeAppended = true;

        $("#wrapper").css("opacity", "0.1").css("pointer-events", "none");

    });

    $('#modal').click(function() {

        if (activeModal) {

            stage = (stage + 1) % 3;

            if (stage === 0) {
                if (eDescribeAppended) {

                    eDescribe.parentNode.removeChild(eDescribe);
                    eDescribeAppended = false;

                }

                imageLocation = "url('images/jpgWide/" + necklaceIndexS + ".jpg')";
                $(this).css("background-image", imageLocation).css("background-size", "80%").css("background-position", '50% 50%');

            } else if (stage === 1) {

                imageLocation = "url('images/svg/pendant-" + necklaceIndexS + ".svg')";
                $(this).css("background-image", imageLocation).css("background-size", "40%").css("background-position", '50% 50%');

            } else if (stage === 2) {

                eDescribe = document.createElement("div");
                eDescribe.className = "necklace-description";
                eDescribe.innerHTML = '<h2 class="center">' + titles[necklaceIndex][0] + '</h2>' + '<p class="center">' + titles[necklaceIndex][1] + '</p>';
                $(this).css("background-image", "").append(eDescribe);
                eDescribeAppended = true;

            }

        }

    });


    $('#modal-exit').click(function() {

        if (activeModal) {

            $("#wrapper").css("opacity", "1").css("pointer-events", "all");

            if (eDescribeAppended) {

                eDescribe.parentNode.removeChild(eDescribe);
                eDescribeAppended = false;

            }

            stage = -1;

        }

    });


});
