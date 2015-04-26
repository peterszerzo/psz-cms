<?php
	require_once("../../include/config.php");
    $activeNavButton="Design";
    $pageTitle="kinetic";
    include(ROOT_PATH . "include/banner.php"); 
?>		
     
<div id="content">	    

    <a class="button" href="<?php echo BASE_URL; ?>design/">
    	<img src="<?php echo BASE_URL; ?>assets/images/buttons/action/backward.png" alt="back">
    </a>

    <h2 class="center">kinetic structures</h2>

    <div class="project-divider">
        
        <div><strong>smart mast</strong></div>

    </div>
    
    <div class="grid-6">
        
        <p>The mast was built as proof of concept for a structure that adapts its shape based on outside weather conditions.</p>
        <p>The acrylic prototype was equipped with a number of heat sensors along its height. If any of them was triggered, a linear actuator lowered the tower to the height of the trigger.</p>

    </div>

    <div class="grid-6">
        
        <img src="<?php echo BASE_URL; ?>assets/images/kinetic/mast.jpg" alt="back">

    </div>

    <div class="grid-12">

        <p>I was responsible for detailed design of the 3d geometry, as well as programming the sensors and the linear actuator.</p>
        <p>The work was conducted at Princeton University, lead by Prof. Sigrid Adriaenssens and Prof. Branko Glisic.</p>
        <p>The concept was published in <a href="http://onlinelibrary.wiley.com/doi/10.1111/mice.12013/abstract" target="_blank">Engineering Structures</a>.</p>

    </div>

    <iframe class="center" id="ytplayer" type="text/html" width="640" height="390"
  src="https://www.youtube.com/embed/BjMAruO2SGA"
  frameborder="0"></iframe>

    <div class="project-divider">
        
        <div><strong>exploration</strong></div>

    </div>

    <img src="<?php echo BASE_URL; ?>assets/images/kinetic/variations.svg" alt="back">
    <br><br>

    <div class="grid-6 grid-offset-1">
        <p>Inspired by this project, I conducted a parametric exploration of pantograph shapes, from wireframe design to physical prototypes and fabrication methods.</p>
        <p>This prototype was designed algorithmically to produce a specified lateral reach upon deployment.</p>
    </div>

    <div class="grid-5">
    <br>
        <img src="<?php echo BASE_URL; ?>assets/images/kinetic/curved-pantograph.jpg" alt="back">
    </div>

    


    
        
</div>

<?php 
	include(ROOT_PATH . "include/footer.php"); 
?>