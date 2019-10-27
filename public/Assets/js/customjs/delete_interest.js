


$(document).on('click', '.del_interest', function (e)
{
	e.preventDefault();

	del_control_key = "close";

	let interest_id = $("#id_holder").val();

	$(".del_interest_spin").show();
	$(".manage_btn").hide();
	$(".del_interest").attr("disabled", true);
	$(`#interest_holder${ interest_id }`).css('display', 'none');
	$('.alert_note').html('Deleting this interest');
	$('.alert_note_text').css('color', 'tomato');

	//Append and load the User Interest block preloader
	$("#user_interest_box").append(`<div class="preload_interest" role="status">
                                  </div>`);
	$(".preload_interest").show();

	var settings = {
		"url": `${ baseUrl }api/user/${ interest_id }`,
		"method": "DELETE",
		"headers": {
			"Authorization": "Bearer " + token,
			"Content-Type": "application/x-www-form-urlencoded"
		},
		"timeout": 0,
	};
	$.ajax(settings).done(function (response)
	{
		if (response)
		{
			console.log(response);
			$(".del_interest").attr("disabled", false);
			$(".del_interest_spin").hide();
			$(".manage_btn").show();
			$("#manageInterestModal").modal("toggle");
			$('.alert_note').html('You can add or remove this interest from your list');
			$('.alert_note_text').css('color', 'lightgrey');

			$('.alert_default').show();
			$('.alert_default').html(`Done (Deleted 1 Interest!)`);
			del_control_key = "open";

			NotSubscribedInterest();
			loadProfile();
		}
	}).fail(function (err)
	{
		$(".del_interest_spin").hide();
		$(".manage_btn").show();
		$(".del_interest").attr("disabled", false);
		del_control_key = "open";
		console.log(err);
	});
});
