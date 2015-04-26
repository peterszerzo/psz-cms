<?php
    require_once("../include/config.php");
    $activeNavButton="Play";
    $pageTitle="Play";
	include(ROOT_PATH . "include/banner.php"); 
?>		

<div id="content">	 

    <p class="center">Ideas, prototypes, childhood memories. Nothing too serious.</p>

    <a class="project" href="<?php echo BASE_URL; ?>play/pba/">	        
        <div>
        	<img src="<?php echo BASE_URL; ?>assets/images/project-logos/pba.svg" alt="PBA logo">
        	<p class="projectTitle">PBA<br>the origins</p>
        </div>
    </a>

    <a class="project" href="<?php echo BASE_URL; ?>play/albatross/">         
        <div>
            <img src="<?php echo BASE_URL; ?>assets/images/project-logos/albatross.svg" alt="albatross logo">
            <p class="projectTitle">Albatross</p>
        </div>
    </a>  

</div>
        
<?php
	include(ROOT_PATH . "include/footer.php"); 
?>		