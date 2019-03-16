<script>
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
</script>
<a class='openDialogLink' href="#openModal">Open Modal</a>
    <div id="openModal" class="modalDialog">
		<div>
			<a href="#close" title="Close" class="close">X</a>
			<p></p>
		</div>
	</div>
        <footer id="footer">
        <div class="inner">

            <h2>Contact Me</h2>
<form action="#" method="post" class='contact-form'>

    <div class="field half first">
        <label for="name">Name</label>
        <input class='input-name' name="name" id="name" type="text" placeholder="Name">
        <div class='error name'></div>
    </div>
    <div class="field half">
        <label for="email">Email</label>
        <input class='input-email' name="email" id="email" type="email" placeholder="Email">
        <div class='error email'></div>
    </div>
    <div class="field">
        <label for="subject">Subject</label>
        <input class='input-subject' name="subject" id="subject" type="text" placeholder="Subject">
        <div class='error subject'></div>
    </div>
    <div class="field">
        <label for="message">Message</label>
        <textarea class='input-message' name="message" id="message" rows="6" placeholder="Message"></textarea>
        <div class='error message'></div>
    </div>
    <ul class="actions">
        <li><input class='input-submit' value="Send Message" class="button alt" type="submit"></li>
    </ul>
</form>

<ul class="icons">
    <li><a href='https://ca.linkedin.com/in/muhammad-ahsan-mirza-460b6378' class="icon round fa-linkedin"><span class="label">LinkedIn</span></a></li>
    <li><a href='https://github.com/mohd-ahsan-mirza' class="icon round fa-github"><span class="label">LinkedIn</span></a></li>
</ul>

<div class="copyright">
    &copy; Copyright 2019 Ahsan Mirza
</div>

</div>

        </footer>
    </body>
</html>