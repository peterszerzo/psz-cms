<?php
    require_once("../include/config.php");
    $activeNavButton="About";
    $pageTitle="about";
	include(ROOT_PATH . "include/banner.php");
?>		
     
<div id="content">	    

    <a class="grid-4 contact disabled" href="#">
    	<i class="fa fa-location-arrow fa-3x"></i>
    	<p class="center">Brooklyn, NY</p>
    </a>

    <a class="grid-4 contact" href="http://formfindinglab.princeton.edu/people/peter-szerzo/" target="_blank">
    	<i class="fa fa-graduation-cap fa-3x"></i>
    	<p class="center">Princeton</p>
    </a>

    <a class="grid-4 contact disabled" href="#">
    	<i class="fa fa-child fa-3x"></i>
    	<p class="center">Transylvania</p>
    </a>

    <a class="grid-4 contact" href="https://github.com/pickled-plugins" target="_blank">
    	<i class="fa fa-github fa-3x"></i>
    	<p class="center">pickled-plugins</p>
    </a>

    <a class="grid-4 contact" href="https://www.linkedin.com/in/peterszerzo" target="_blank">
	   	<i class="fa fa-linkedin fa-3x"></i>
	    <p class="center">peterszerzo</p>
	</a>

	<a class="grid-4 contact" href="https://www.youtube.com/user/szerzo1" target="_blank">
	   	<i class="fa fa-youtube fa-3x"></i>
	    <p class="center">szerzo1</p>
	</a>

    <a class="grid-4 contact" href="https://www.etsy.com/shop/dchisel" target="_blank">
    	<p class="etsy-logo center">Etsy</p>
    	<p class="center">dChisel</p>
    </a>

	<a class="grid-4 contact" href="https://www.youtube.com/user/szerzo1" target="_blank">
	   	<i class="fa fa-google-plus fa-3x"></i>
	    <p class="center">szerzo.peter</p>
	</a>

	<a class="grid-4 contact" href="https://soundcloud.com/bbo-listen" target="_blank">
    	<i class="fa fa-soundcloud fa-3x"></i>
    	<p class="center">bbo</p>
    </a>

    <a class="grid-4 contact" href="http://instagram.com/eggspillonstove" target="_blank">
	   	<i class="fa fa-instagram fa-3x"></i>
	    <p class="center">eggspillonstove</p>
	</a>

</div>

        
<?php 
	include(ROOT_PATH . "include/footer.php"); 
?>