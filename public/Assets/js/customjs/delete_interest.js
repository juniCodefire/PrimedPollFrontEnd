


	$(document).on('click', '.del_interest', function (e) {
      e.preventDefault();

      	del_control_key = "close";

        let interest_id = $("#id_holder").val();

	    $(".not_subscribed_spin").show();
	    $(".del_interest").attr("disabled", true);
	    $(`#interest_holder${interest_id}`).css('display', 'none');
	    $('.alert_note').html('Deleting this interest');
	    $('.alert_note_text').css('color', 'tomato');

	      var settings = {
	        "url": `${baseUrl}api/user/${interest_id}`,
	        "method": "DELETE",
	           "headers": {
	                "Authorization": "Bearer " + token,
	                "Content-Type": "application/x-www-form-urlencoded"
	            },
	        "timeout": 0,
	      };
	      $.ajax(settings).done(function (response) {
	        if (response) {
	          console.log(response);
	           $(".del_interest").attr("disabled", false);
	           $(".not_subscribed_spin").hide();
	           $("#manageInterestModal").modal("toggle");
	           $('.alert_note').html('You can add or remove this interest from your list');
	           $('.alert_note_text').css('color', 'lightgrey');

	           $('.alert_default').show();
	           $('.alert_default').html(`Done (Deleted 1 Interest!)`);
	           del_control_key ="open";

	           NotSubscribedInterest();
	           loadProfile("close");
	        }
	      }).fail( function(err) {
	            $(".not_subscribed_spin").hide();
	            $(".del_interest").attr("disabled", false);
	            del_control_key ="open";
	            console.log(err);
	      });
    });
