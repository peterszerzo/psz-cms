<?php
	require_once("../../include/config.php");
    $activeNavButton="Design";
    $pageTitle="chess";
    include(ROOT_PATH . "include/banner.php"); 
?>		
     
<div id="content">	    

    <a class="button" href="<?php echo BASE_URL; ?>design/">
    	<img src="<?php echo BASE_URL; ?>assets/images/buttons/action/backward.png" alt="back">
    </a>

    <h2 class="center">minimal chess board</h2>
    
    <p class="grid-12">As chess boards became more and more complicated, I've decided to look around in the other direction.</p>

    <div class="row clearfix">
    	<div class="grid-8">
    		<img class="fitImage" src="<?php echo BASE_URL; ?>assets/images/chess.jpg">
	    </div>
	    <div class="grid-4">
		    <p>~ go 2d.</p>
		    <p>~ simplify figures; maybe just the shoes?</p>
		    <p>~ solid colors are obviously pushing it too far. yes, hatches!</p>
		    <p>~ draw, trace, lasercut, play!</p>
	    </div>
    </div>
        
</div>

<?php 
	include(ROOT_PATH . "include/footer.php"); 
?>