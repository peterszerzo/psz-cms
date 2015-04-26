<?php
    require_once("../../include/config.php");
    $activeNavButton="Play";
    $pageTitle="PBA";
	include(ROOT_PATH . "include/banner.php");
?>		
     
<div id="content">	    

    <a class="button" href="<?php echo BASE_URL; ?>play/">
    	<img src="<?php echo BASE_URL; ?>assets/images/buttons/action/backward.png" alt="back">
    </a>

    <h2 class="center pageHeading">P B A</h2>

    <h3 class="center pageHeading">near-first independent coding project</h2>

    	<div class="grid-7">
		    <p>I and two friends from my Romanian high school, Tamás Plugor and Tamás Gajdó think of PBA as our first presentable coding project.</p>
		    <p>Written in <a href="http://borlandpascal.wikia.com/wiki/Borland_Pascal" target="_blank">Borland Pascal</a> in 2005 (freshman year of high school), PBA stands for Pascal Basketball Association.</p>
    	</div>
	    
	    <div class="grid-5">
		    <p>It is where our hacker lives started - and never stopped.</p>
		    <p>We proudly present the game rewritten in Processing, brought to the browser by Processing.js.</p>		       			
		    
	    </div>

        <div class="grid-12">
            
            <a href="#modal" id="launchPBA" class="button"><p>play</p></a>  

        </div>
            
</div>

<?php 
	include(ROOT_PATH . "include/footer.php"); 
?>