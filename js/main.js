(function($){
	console.log("coming in here");
    $('.input-message').blur(function(){

		if( !$(this).val().length )
    	{
    		$(this).parent().find('.error').html("This field can't be empty");
    		return true;
    	}
    	else
    	{
    		$(this).parent().find('.error').html("");
    	}

	});

	$(".input-submit").click(function(event){

		event.preventDefault();

        $(".error").html("");
        
        var error = false; 
		$('.contact-form').find('input').each(function(){
      		
      		if( !$(this).val().length )
    		{
    			$(this).parent().find('.error').html("This field can't be empty");
    			error = true;
    		}	

    	});
		if( !$('.input-message').val().length )
    	{
    		$('.input-message').parent().find('.error').html("This field can't be empty");
    		error = true;
    	}
        if(error)
            return error;
        
        $(".input-submit").addClass('loader');
		console.log("emailAjax -> "+emailMeAjaxNonce);
    	$.ajax({
			type: 'POST',
        	url: ajaxURL,
        	data: { 'action': 'emailMe',
                 	'name': $('.input-name').val(),
                 	'email': $('.input-email').val(),
                 	'subject': $('.input-subject').val(),
                 	'message': $('.input-message').val(),
                 	'security': emailMeAjaxNonce
         	},
        	success: function(response){
   
                $(".input-submit").removeClass('loader');
                $('.input-name').val("");
                $('.input-email').val("");
                $('.input-subject').val("");
                $('.input-message').val("");
        		$(".modalDialog div p").html("Your email has been sent!! I will get in touch soon :) ");
        		$(".openDialogLink")[0].click();
        		
        	},
        	error: function(jqXHR, textStatus, responseError){
        		$(".error.message").html("There was an error. Please refresh your page.");
        	}
    	});

	});
})