(function($) {

	skel.breakpoints({
		xlarge:	'(max-width: 1680px)',
		large:	'(max-width: 1280px)',
		medium:	'(max-width: 980px)',
		small:	'(max-width: 736px)',
		xsmall:	'(max-width: 480px)'
	});

	$(function() {

		var	$window = $(window),
			$body = $('body'),
			$header = $('#header'),
			$banner = $('#banner');

		var $height = $('#header').height();
        
        //Update in index and here
        var bannerIndex = 3;

		// Disable animations/transitions until the page has loaded.
			$(".after-load").addClass('is-loading');
            $(".after-load").addClass('no-animation');
            //$body.addClass('loader');
            //$(".wrap").show();
            $("#slideshow > div").not(':eq(0)').hide();
            var maxHeight = Math.max.apply(null, $("#slideshow > div").map(function ()
            {
                return $(this).height();
            }).get());
            $("#slideshow > div").height(maxHeight+50);
            
			$window.on('load', function() {
				window.setTimeout(function() {
                    $(".wrap").hide();
					$(".after-load").removeClass('is-loading');
                    $(".after-load").removeClass('no-animation');
                    $body.removeClass('loader');
				}, 1);
                    while($("#"+bannerIndex).length != 0){
                        $("#"+bannerIndex).attr("data-bg","banner"+bannerIndex+".jpg");
                        $("#"+bannerIndex).css("background-image",'url(../images/' + "banner"+bannerIndex+".jpg" + ')')
                        $("#"+bannerIndex).show();
                        bannerIndex++;
                    }    
			});

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on medium.
			skel.on('+medium -medium', function() {
				$.prioritize(
					'.important\\28 medium\\29',
					skel.breakpoint('medium').active
				);
			});

		// Banner

			if ($banner.length > 0) {

				// IE: Height fix.
					if (skel.vars.browser == 'ie'
					&&	skel.vars.IEVersion > 9) {

						skel.on('-small !small', function() {
							$banner.css('height', '100vh');
						});

						skel.on('+small', function() {
							$banner.css('height', '');
						});

					}

				// More button.
					$banner.find('.more')
						.addClass('scrolly');

			}


		// Get BG Image

			if ( $( ".bg-img" ).length ) {

				$( ".bg-img" ).each(function() {

					var post 	= $(this),
						bg 		= post.data('bg');

					post.css( 'background-image', 'url(images/' + bg + ')' );

				});


			}

		// Posts

			$( ".post" ).each( function() {
                $("#slideshow > div").not(':eq(0)').hide();
				var p = $(this),
					i = p.find('.inner'),
					m = p.find('.more');

				m.addClass('scrolly');

				p.scrollex({
					top: '6vh',
					bottom: '6vh',
					terminate: 	function() { m.removeClass('current'); i.removeClass('current'); },
					enter: 		function() { m.addClass('current'); i.addClass('current'); },
					leave: 		function() { m.removeClass('current'); i.removeClass('current'); }
				});

			});

		// Scrolly.
			if ( $( ".scrolly" ).length ) {

				$('.scrolly').scrolly();
			}

		// Menu.
			$('#menu')
				.append('<a href="#menu" class="close"></a>')
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'right'
				});
                
    /*$('.contact-form input').blur(function(){
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
            else
            {
                $(this).parent().find('.error').html("");
            }
    	}
        
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
	});*/

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

	$(".close").click(function(){
		$(".modalDialog div p").html("");
	});

    //TODO: Fix previous button bug
    $("#previousRecommendation").click(function(event){
        
        var totalRecommendations = $(".active-recommendation").length;
        var currentRecommendation = $('#slideshow > div:first').attr('id');
        var currentRecommendationIndex = currentRecommendation.substr(currentRecommendation.length-1);

        var previousRecommendationIndex = null;
        
        console.log(currentRecommendationIndex);
        console.log(totalRecommendations);
        
        switch(currentRecommendationIndex){
            case 1:
                previousRecommendationIndex = totalRecommendations;
                break;
            case totalRecommendations:
                previousRecommendationIndex = 1;
                break;
            default:
                previousRecommendationIndex = currentRecommendationIndex -1;
                break;
        }
        
        $("#recommendation"+currentRecommendationIndex)
        .fadeOut('slow').hide();
        
        //console.log(previousRecommendationIndex);
        
        $("#recommendation"+previousRecommendationIndex)
        .fadeIn('slow')
        .appendTo('#slideshow');
        
        
        event.preventDefault();
    });
    
    $("#nextRecommendation").click(function(event){
        
        $('#slideshow > div:first')
        .fadeOut('slow').hide()
        .next()
        .fadeIn('slow')
        .end()
        .appendTo('#slideshow');
        
        event.preventDefault();
    });
    
    $('.skillbar').each(function(){
		$(this).find('.skillbar-bar').animate({
			width:$(this).attr('data-percent')
		},6000);
	});
    
	});
    
    /*setInterval(function() { 
    $('#slideshow > div:first')
        .fadeOut('slow').hide()
        .next()
        .fadeIn('slow')
        .end()
        .appendTo('#slideshow');
    },  5000);*/

})(jQuery);
