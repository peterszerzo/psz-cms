<?php
	require_once("../../include/config.php");
	$activeNavButton="Design";
    $pageTitle="particle-spring";
    include(ROOT_PATH . "include/banner.php"); 
?>		
     
<div id="content">	    

    <a class="button" href="<?php echo BASE_URL; ?>design/">
    	<img src="<?php echo BASE_URL; ?>assets/images/buttons/action/backward.png" alt="back">
    </a>

    <h2 class="center">particle-spring systems</h2>
    
    <p class="grid-12">A system of particles interconnected by springs is a simple model to capture complex phenomena around us. Simulating its behavior is useful in motion (such as a curtain blown by the wind in your favorite Pixar movie), as well as in search of an equilibrium. The latter is important in architectural and structural engineering applications.</p>

    <p class="grid-12">How is it implemented? I made available <a href="https://github.com/pickled-plugins/rhino-pythonscript-tutorials/blob/master/3%20Scriptissimo%20Grande/00.py" target="_blank">my own Python code</a> doing particle-spring simulation in Rhino.</p>

    <p class="grid-12">Here are some particle-spring experiments I have been involved in, either using my own code or Grasshopper's Kangaroo plug-in.</p>

    <div class="project-divider">

    	<div><strong>battle shell</strong></div>

    </div>

	<div class="grid-12">

        <br>
        <img src="<?php echo BASE_URL; ?>assets/images/particle-spring/battle-render-1.png" alt="battle shells - render 1">

		<p>Princeton University, February - May 2012<br>
		CEE 546 Form-Finding of Structural Surfaces, Prof. Sigrid Adriaenssens<br>
	    Teammates: Laura Ettedgui, Julianne Gola</p>
        <p>Type: triangular steel gridshell covered with glass panels</p>
        <p>Dimensions: two 45ft x 45ft units</p>
        <div class="panel"><a href="#modal" class="archprogram">Architectural brief</a></div>
        
    	<p>The battle shell is a concept for a stage roof structure floating on the Biscayne Bay in front of the Miami Marine Stadium.</p>

        <img src="<?php echo BASE_URL; ?>assets/images/particle-spring/battle-top.png" alt="battle shells - top view">
        <p>The two units of the shell are designed to stand separately at a distance, allowing competing performers to perform their battles. The units can come together to form a single, larger unit.</p>

        <img src="<?php echo BASE_URL; ?>assets/images/particle-spring/battle-shell.svg" alt="form-finding simulation">
    	<p>For the project, I've used my particle-springs algorithm to generate a unit much in a shape of a eighth of a sphere.</p>

        <p>The algorithm was adjusted to provide a shape that combines kink-free with its symmetric twin sibling, such that the shapes can come together to form a unified, larger covered surface.</p>

        <p>Although the shape has an organic feel, it does not result from a particle-spring equilibrium - the simulation is stopped 3/4 of the way, trading off its structural efficiency with many other architectural requirements.</p>

        <p>Software evolved along with the project - as deemed necessary by its complexity.</p>
        
    	<img src="<?php echo BASE_URL; ?>assets/images/particle-spring/battle-render-2.png" alt="battle shells - render 2">

        

    </div>
        
</div>

<?php 
	include(ROOT_PATH . "include/footer.php"); 
?>