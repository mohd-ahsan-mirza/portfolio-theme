<html>
    <head>
        <title>Ahsan Mirza</title>
	    <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script>
            (function($){

                var ajaxURL="<?php echo admin_url( 'admin-ajax.php' ); ?>";
            var emailMeAjaxNonce = "<?php echo wp_create_nonce( 'emailMe-ajax-nonce' ); ?>";
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
	    </script>
        <link rel="stylesheet" href="<?php bloginfo('stylesheet_url') ?>" />
        <script src="<?php echo site_url('/wp-content/themes/portfolio-theme/js/main.js'); ?>"></script>
        <script src="<?php echo site_url('/wp-content/themes/portfolio-theme/js/jquery.min.js'); ?>"></script>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" 
        integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" 
        integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
        <link rel="icon" href="/logo.png">
    </head>
    <body>