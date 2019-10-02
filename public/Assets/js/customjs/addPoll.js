$(document).ready(function () {
    //Declare the option array global
    let options = [];
    let images = [];


    $("#addInterest").on('submit', function (e) {
        e.preventDefault();
        console.log(options);
        console.log(images);
        if(options.length > 0 && images.length > 0){
            console.log('kkkk')
            $("#data-option-conflit").show();
            return false;
        }
        $("#data-option-conflit").hide();
        let user_interest_id = $("#user_interest_id").val();
        let pollQuestion     = $("#pollQuestion").val();
        let startdate        = $("#startDate").val();
        let expirydate       = $("#dueDate").val();

        //Validate the poll inputs
        $(".add_poll_err").hide();
        if (user_interest_id == "") {
            $("#interest_err").html('Please select an interest');
            $("#user_interest_id").addClass('err_signup_input');
            $("#interest_err").show();
            return false;
        }
        if (pollQuestion == "") {
            $("#question_err").html('Type in a poll question');
            $("#pollQuestion").addClass('err_signup_input');
            $("#question_err").show();
            return false;
        }
        if (startdate == "" || expirydate == "") {
            $("#date_err").html('please input a valid date for this poll');
            $("#startDate").addClass('err_signup_input');
            $("#dueDate").addClass('err_signup_input');
            $("#date_err").show();
            return false;
        }
        if(images.length == 0){
            if (options.length < 2) {
                $("#written_option").attr('placeholder', 'Your options must be 2 more!');
                $("#written_option").addClass('written_option');
                $("#textPollCollapse").show();
                return false;
            }
        }
        if (pollQuestion.length > 100 || pollQuestion.length < 5) {
            $("#question_err").html('Question must be below 100 or above 5 character lenght');
            $("#pollQuestion").addClass('err_signup_input');
            $("#question_err").show();
            return false;
        }
            if(images.length > 0) {
                options = new FormData();
                options = images.map(function (x) {
                    return options.append("option", x);
                });

            }else {
                options = options.map(function (x) {
                    return {
                        "option": x
                    }
                });
            }
            console.log(options);
           


        // $(".add_poll_alert_box").hide();
        // $(".add_interest_spin").css('display', 'flex');
        // $("#add_interest_btn").hide();
        // var settings = {
        //     "url": `${baseUrl}api/${user_interest_id}/poll`,
        //     "method": "POST",
        //     "timeout": 0,
        //     "headers": {
        //         "Authorization": "Bearer " + token,
        //         "Content-Type": "application/x-www-form-urlencoded"
        //     },
        //     "data": {
        //         "question": pollQuestion,
        //         "startdate": startdate,
        //         "expirydate": expirydate,
        //         "options": options
        //     }
        // };
        // console.log(settings);
        // $.ajax(settings).done(function (response) {
        //     console.log(response);

        //     $(".add_interest_spin").css('display', 'none');
        //     $("#add_interest_btn").show();
        //     $(".add_poll_alert_box").show();
        //     $('#addInterest')[0].reset();
        //     $(".option_all").html(``);
        //     options = [];
        //     $(".join_option").attr("disabled", false);
        //     $("#written_option").attr("disabled", false);
        //     $("#written_option").attr('placeholder', 'Type in your option');

        // }).fail(function (err) {
        //     console.log(err);
        //     $(".add_interest_spin").css('display', 'none');
        //     $("#add_interest_btn").show();
        // });

    });

    $(document).on('click', '.join_option', () => {
        let option_val = $("#written_option").val();
        var test = (/\.(gif|jpg|jpeg|tiff|png)$/i).test(option_val)
        if(!test){
        if (option_val.length > 25) {
            $("#written_option").val("");
            $("#written_option").attr('placeholder', 'Options must be below 30 character lenght');
            $("#written_option").addClass('written_option');
            return false;
        }

        if (option_val == "") {
            $("#written_option").attr('placeholder', 'Option field cannot be empty !');
            $("#written_option").addClass('written_option');
        } else {
            options.push(option_val);
            $(".option_all").html(``);
            option_val = $("#written_option").val("");

            $("#written_option").attr('placeholder', 'Type in your option');
            $("#written_option").removeClass('written_option');
            for (let i = 0; i < options.length; i++) {
                const element = options[i];

                $(".option_all").append(`
                    <div class="input-group mb-3">
                      <input type="text" class="form-control" value="${element}" aria-label="Example text with button addon"
                        aria-describedby="button-addon1" disabled>
                      <div class="input-group-append">
                        <button class="btn delete-option-btn" data-option="${element}" type="button" ><i style="color:tomato;" class="fa fa-close" style="font-size:36px"></i></button>
                      </div>
                    </div>
                `);

            }
        }
        if (options.length >= 4) {
            $(".join_option").attr("disabled", true);
            $("#written_option").attr("disabled", true);
            $("#written_option").attr('placeholder', 'Only 4 options are allowed');
        }

        }
    });

    $(document).on('click', '.delete-option-btn', function () {
        var indexdata = $(this).data('option');
        var check_exist = jQuery.inArray(indexdata, options);

        if (check_exist != -1) {
            options.splice(check_exist, 1);
            $(".option_all").html(``);
            for (let i = 0; i < options.length; i++) {
                const element = options[i];
                $(".option_all").append(`
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" value="${element}" aria-label="Example text with button addon"
                            aria-describedby="button-addon1" disabled>
                            <div class="input-group-append">
                            <button class="btn delete-option-btn" data-option="${element}" type="button" ><i style="color:tomato;" class="fa fa-close" style="font-size:36px"></i></button>
                            </div>
                        </div>
                    `);

            }
            $("#written_option").attr('placeholder', 'Type in your option');
            $("#written_option").removeClass('written_option');
        }
    });
    $(document).on('change', '#inputImage', function (e) {

            let imageFile = e.target;
            let values = Array.from(imageFile.files);
               images.push(...values);
               $("#data-img-display").html(`
                    <div id="data-img-add-btn" class="col-3 border-right">
                        <input type="file" name="inputImage" id="inputImage" class="inputfile" multiple/>
                        <label class="text-center mt-3" for="inputImage"><i class="material-icons">note_add</i><br>Click here to add an image</label>
                    </div>
                    `);
               if (images){
                 images.map((image, i)=> {
                     var reader = new FileReader();
             
                    reader.onload = function (e)
                    {

                        $("#data-img-display").append(`
                            <div class="col-3 px-1">
                                <i data-image="${i}" style="color:tomato; position: absolute; right: 0; font-size:20px; z-index:99999;" class="fa fa-close mr-4 mt-1 img-delete-option-btn "></i>
                                <div class="col-12 px-0" style="height: 138px;">
                                <img style="border-radius: 10px; width: 100%; height:100%;" class="" src="${e.target.result }">
                                </div>
                            </div>
                        `);
                    };
                    console.log(i)
                    if(i == 3) {
                        const dataImgAddBtn = document.querySelector('#data-img-add-btn');
                        console.log(dataImgAddBtn);
                        dataImgAddBtn.style.display = 'none';
                    } 
                    console.log(i)
                    reader.readAsDataURL(image);
                  })                
               }
    })
//Image Delete Controll
    $(document).on('click', '.img-delete-option-btn', function () {
        var index = $(this).data('image');
        images.splice(index, 1);

        $("#data-img-display").html(`
        <div id="data-img-add-btn" class="col-3 border-right">
            <input type="file" name="inputImage" id="inputImage" class="inputfile" multiple/>
            <label class="text-center mt-3" for="inputImage"><i class="material-icons">note_add</i><br>Click here to add an image</label>
        </div>
        `);
       if (images){
         images.map((image, i)=> {
             var reader = new FileReader();
     
            reader.onload = function (e)
            {

                $("#data-img-display").append(`
                    <div class="col-3 px-1">
                        <i data-image="${i}" style="color:tomato; position: absolute; right: 0; font-size:20px; z-index:99999;" class="fa fa-close mr-4 mt-1 img-delete-option-btn "></i>
                        <div class="col-12 px-0" style="height: 138px;">
                        <img style="border-radius: 10px; width: 100%; height:100%;" class="" src="${e.target.result }">
                        </div>
                    </div>
                `);
            };
            console.log(i)
            if(i < 3) {
                const dataImgAddBtn = document.querySelector('#data-img-add-btn');
                console.log(dataImgAddBtn);
                dataImgAddBtn.style.display = 'block';
            } 
            console.log(i)
            reader.readAsDataURL(image);
          })                
       }
    });
    $(document).on('click', '.close_add_poll_alert', function() {
         $(".add_poll_alert_box").hide();
    });
    $(document).on('click', '.addFastPoll', function() {
          $("#newPollModal").modal("toggle");
    });
});

