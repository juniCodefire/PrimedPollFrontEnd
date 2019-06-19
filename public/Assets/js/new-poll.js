$(document).ready(function(){
    $("#imagePollBtn").on('click', function(){

        $("#imagePollCollapse").show();
        $("#textPollCollapse").hide();
    });
    $("#textPollBtn").on('click', function () {
        $("#imagePollCollapse").hide();
        $("#textPollCollapse").show();
    });
});