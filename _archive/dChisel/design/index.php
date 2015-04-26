<?php
    require_once("../include/config.php");
    $activeNavButton="Design";
    $pageTitle="design";
	include(ROOT_PATH . "include/banner.php");
?>		
     
<div id="content">	    

    <p class="center">Regardless of the discipline or industry they fit in, most of these projects fall under the realm of computation and software. More on <a href="https://github.com/pickled-plugins" target="_blank">GitHub</a>.</p>

    <div class="project-divider">
        <div>product</div>
    </div>

    <a class="project" href="<?php echo BASE_URL; ?>design/pendant/?pg=1">
        <div>
        	<img src="<?php echo BASE_URL; ?>assets/images/project-logos/necklace.svg" alt="pendant logo">
        	<p>pendant<br>project</p>
        </div>
    </a>
    <a class="project" href="http://pickled-plugins.github.io/ripsaw-demo/" target="_blank">	        
        <div>
        	<img src="<?php echo BASE_URL; ?>assets/images/project-logos/ripsaw.svg" alt="ripsaw logo">
        	<p>ripsaw<br>.js</p>
        </div>
    </a>    

    <a class="project" href="<?php echo BASE_URL; ?>design/chess/">         
        <div>
            <img src="<?php echo BASE_URL; ?>assets/images/project-logos/chess.svg" alt="minimal chess logo">
            <p>minimal<br>chess</p>
        </div>
    </a>

    <div class="project-divider">
        <div>structure</div>
    </div>

    <a class="project" href="<?php echo BASE_URL; ?>design/kinetic/">            
        <div>
            <img src="<?php echo BASE_URL; ?>assets/images/project-logos/deployable.svg" alt="kinetic logo">
            <p>kine<br>tic</p>
        </div>
    </a> 

    <a class="project" href="<?php echo BASE_URL; ?>design/particle-spring/">            
        <div>
            <img src="<?php echo BASE_URL; ?>assets/images/project-logos/particle-springs.svg" alt="particle springs logo">
            <p>particles<br>springs</p>
        </div>
    </a>   

    <a class="project" href="http://pickled-plugins.github.io/Giraffe-for-Rhino/" target="_blank">            
        <div>
            <img src="<?php echo BASE_URL; ?>assets/images/project-logos/giraffe.svg" alt="Giraffe logo">
            <p>Giraffe<br>for Rhino</p>
        </div>
    </a>  

</div>
        
<?php 
	include(ROOT_PATH . "include/footer.php"); 
?>
