<?php

	require_once("../include/config.php");
	
	if($_SERVER["REQUEST_METHOD"]=="POST")
	{
	    $name=$_POST["name"];
	    $email=$_POST["email"];
	    $message=$_POST["message"];
	    
	    if(trim($name)=="" OR trim($email)=="" OR trim($message)=="") {
		    echo "Please specify a valid name, e-mail and message.";
		    exit;
	    }
	    
	    foreach($_POST as $value) {
		    if (stripos($value,'Content-Type:') !== FALSE) {
		    	echo "There was a problem with the information you entered.";
			    exit;
		    }
	    }

		if($_POST["address"] != "") {
			echo "Your submission has an error.";
			exit;
		}
	    
	    $emailBody = "";
	    $emailBody = $emailBody . "Name: " . $name . "\n";
	    $emailBody = $emailBody . "E-mail: " . $email . "\n";
	    $emailBody = $emailBody . "Message: " . $message . "\n";  

	    mail("szerzo.peter@gmail.com","New Message",$emailBody);
	    header("Location: " . BASE_URL . "about?status=thanks");

	    exit;

	}

    $pageTitle="About";
	include(ROOT_PATH . "include/banner.php");
?>		

<div id="content">
		
    <?php if(isset($_GET["status"]) AND $_GET["status"]=="thanks") { ?>
    	<h3 class="center">Thank you!</h3>
        <p class="center bottom">Will shall be back to you soon!</p>
    <?php } else { ?>	
    	
    	<div class="errorMessage container45">

    		<p>The contact form is temporarily down.<br>Sorry about the trouble.<br>Back shortly!</p>

    	</div>

        <form method="post" action="<?php echo BASE_URL; ?>about/">
        	<table cellpadding="30px" cellspacing="10px" align="center">
        		<tr>
        			<td colspan="3"><h1 class="center singleSpace">Contact</h1></td>
        		</tr>
        		<tr>
        			<td colspan="3">Thoughts, dreams, questions, grievances?<br>Please, don't hold back.</td>
        		</tr>
        		<tr>
    			    <td><label for="name">Name</label></td>
    			    <td><input class="greyForm" type="text" name="name" id="name" data-filler="...or nickname" value=""></td>
    			    <td><p></p></td>
    			</tr>
    			<tr>
    				<td><label for="email">Email</label></th>
    				<td><input class="greyForm" type="text" name="email" id="email" data-filler="address@quirkydomain.you" value=""></td>
    				<td><p></p></td>
    			</tr>
    			<tr>
    				<td><label for="message">Message</label></td>
    				<td><textarea class="greyForm" name="message" id="message" data-filler="Dear dChisel, Seriously? Phil"></textarea></td>
    				<td><p></p></td>
    			</tr>
    			<tr>		
    				<td colspan="3"><input type="submit" id="submit" disabled="disabled" value="submit"></td>
    			</tr>
    			<noscript>
    				<td colspan="3"><input type="submit" id="submit" value="scripts disabled? try this submit instead"></td>
    			</noscript>
				<tr style="display:none;">
    				<td><label for="address">Address</label></td>
    				<td><input type="text" name="address" id="address" value=""><p>Please leave this field blank.</p></td>			
    			</tr>
        	</table>
        </form>	 

        <!-- <div class="container85 clearfix">
		    <h4 class="center">Feedback-givers, Contributors and Collaborators</h4>
		    <p class="center">Yourk: Maya Kryvitskaya Davis, Stephen Davis</p>
		    <p class="center">Pendant Project: Tiffany Cheezem, Greta Shum, Alison Cook</p>
		   	<p class="center">PBA: Tamás Plugor, Tamás Gajdó</p>
		   	<p class="center">Background pattern: Haris Šumić [subtlepatterns.com]</p>	
   	 	</div> -->
         		    
    <?php } ?>
    
</div>

<script type="text/javascript">
	
</script>

<?php
	include(ROOT_PATH . "include/footer.php"); 
?>