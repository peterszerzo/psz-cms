<?php
	require_once("include/config.php");	
	$activeNavButton="Home";
	$pageTitle="home";
	include(ROOT_PATH . "include/banner.php");
?>		
	 
<div id="content">

	<div class="center panel">

		<h1 class="center">website for sharp digital craft</h1>
		
    	<div class="center">
	        <p class="center">experiments in design, computation and graphics</p>  
    	</div> 			    

   	</div>

   	<div class="project-divider">
        <div>featured</div>
    </div>

	<a class="project clearfix" href="http://pickled-plugins.github.io/ripsaw-demo/" target="_blank">	        
        <div>
        	<img src="<?php echo BASE_URL; ?>assets/images/project-logos/ripsaw.svg" alt="dFork logo">
        	<p>ripsaw<br>.js</p>
        </div>
    </a> 

    <a class="project" href="<?php echo BASE_URL; ?>design/particle-spring/">            
        <div>
            <img src="<?php echo BASE_URL; ?>assets/images/project-logos/particle-springs.svg" alt="dFork logo">
            <p>particles<br>springs</p>
        </div>
    </a>   

    <a class="project" href="<?php echo BASE_URL; ?>design/kinetic/">            
        <div>
            <img src="<?php echo BASE_URL; ?>assets/images/project-logos/deployable.svg" alt="dFork logo">
            <p>kine<br>tic</p>
        </div>
    </a> 

    <a class="project" href="<?php echo BASE_URL; ?>design/pendant/?pg=1">
        <div>
        	<img src="<?php echo BASE_URL; ?>assets/images/project-logos/necklace.svg" alt="pendant logo">
        	<p>pendant<br>project</p>
        </div>
    </a>

</div>
    				

<?php 
	include(ROOT_PATH . "include/footer.php"); 
?>