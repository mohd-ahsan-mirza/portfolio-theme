$(function () {
    
	$('.contact-form input').blur(function(){

    	if( !$(this).val().length )
    	{
    		$(this).parent().find('.error').html("This field can't be empty");
    		return true;
    	}
    	else
    	{
    		$(this).parent().find('.error').html("");
    	}

    	if( $(this).hasClass( 'input-email' ) )
    	{
    		if( !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test( $(this).val() ) )
    		{
    			$(this).parent().find('.error').html("Invalid Email Address");
    			return true;
    		}
    	}
	});

	$('.contact-form textarea').blur(function(){

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

		$('.contact-form').find('input').each(function(){
      		
      		if( !$(this).val().length )
    		{
    			$(this).parent().find('.error').html("This field can't be empty");
    			return true;
    		}	

    	});

		if( !$('.contact-form textarea').val().length )
    	{
    		$(this).parent().find('.error').html("This field can't be empty");
    		return true;
    	}

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

        		$(".modalDialog div p").html("Your email has been sent!! I will get in touch soon :) ");
        		$(".openDialogLink")[0].click();
        		
        	},
        	error: function(jqXHR, textStatus, responseError){
        		$(".error.message").html("There was an error. Please refresh your page.");
        	}
    	});

	});

	$(".close").click(function(){
		$(".modalDialog div p").html("");
	});

});