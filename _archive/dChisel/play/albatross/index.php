<?php
    require_once("../../include/config.php");
    $activeNavButton="Play";
    $pageTitle="Albatross";
	include(ROOT_PATH . "include/banner.php");
?>		
     
<div id="content">	    

    <a class="button" href="<?php echo BASE_URL; ?>play/">
    	<img src="<?php echo BASE_URL; ?>assets/images/buttons/action/backward.png" alt="back">
    </a>

    <h2 class="center pageHeading">Albatross</h2>
    <h3 class="center pageHeading">your life adventure in animation</h3>
    <div class="clearfix">
    	<div class="grid-8">
		    <p>For those who travel a lot, have lived in multiple countries, and especially for those who are not sure where they are geographically located at the moment, life can become a confusing, unprocessed maze of disconnected memories.</p>
    	</div>
    </div>

    <div class="clearfix">

        <div class="grid-8 grid-offset-4">
            <p>As I noticed this happening to me, I started thinking of a number of ways to document and organize important life events. I started playing around with the idea of the twenty-first century diary - quick, digestable, interactive.</p>                   
        </div>
    </div>

    <div class="container65 panel">
        
        <p>Albatross is the app that visualizes our life's journey on a beautiful interactive map.</p>
        <p>May this virtual flight stir up memories and open up our minds to reflection. Stay tuned for a first demo!</p>

    </div>
    
    &nbsp;
        
</div>

<?php 
	include(ROOT_PATH . "include/footer.php"); 
?>