<!DOCTYPE html>
<html>
	<head>
		<title><?php echo $pageTitle; ?></title>
		<link rel="shortcut icon" href="<?php echo BASE_URL;?>assets/images/favIcon.png">
		<link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">
		<link rel="stylesheet" type="text/css" href="<?php echo BASE_URL;?>assets/style/main.css">
		<meta charset="UTF-8">
	</head>
	<body>
	
		<div id="modal">
			<a href="">
				<div class="button modal" id="modal-exit">
				     <img src="<?php echo BASE_URL; ?>assets/images/buttons/action/skip.png" alt="back">
				</div>
			</a>
			<canvas id="canvas_1" data-processing-sources="<?php echo BASE_URL; ?>assets/processing/game.pde" width="1000" height="480"> 
			    <p>Your browser does not support the canvas tag.</p>
			</canvas>  
			<noscript>
			    <p>JavaScript is required to view the contents of this page.</p>
			</noscript>
		</div>
				
		<div id="wrapper">
						
			<header>
				
				<div id="banner">
					<div id="title">
					    dChisel
					</div>
				
					<div id="subtitle">
					    digital this &amp; that
					</div>
				</div>
				
				<nav>	
					<ul>		
						<li>		
						    <a href="<?php echo BASE_URL; ?>">
						    	<div <?php if($activeNavButton=="Home") echo "id='activeNavButton'"; ?>>
						    		home
						    		<img src="<?php echo BASE_URL; ?>assets/images/buttons/nav/home.png" alt="home">
						    	</div>
						    </a>
						</li>	
						<li>			    
						    <a href="<?php echo BASE_URL; ?>design/">
						    	<div <?php if($activeNavButton=="Design") echo "id='activeNavButton'"; ?>>
						    		design
						    		<img src="<?php echo BASE_URL; ?>assets/images/buttons/nav/design.png" alt="design">
						    	</div>
						    </a>
					    </li>	
					    <li>				    
						    <a href="<?php echo BASE_URL; ?>play/">
						    	<div <?php if($activeNavButton=="Play") echo "id='activeNavButton'"; ?>>
						    		play
						    		<img src="<?php echo BASE_URL; ?>assets/images/buttons/nav/play.png" alt="play">
						    	</div>
						    </a>	
					    </li>	
					    <li>			    
						    <a href="<?php echo BASE_URL; ?>about/">
						    	<div <?php if($activeNavButton=="About") echo "id='activeNavButton'"; ?>>
						    		about
						    		<img src="<?php echo BASE_URL; ?>assets/images/buttons/nav/about.png" alt="about">
						    	</div>
						    </a>	
					    </li>	
					</ul>			    
				</nav>
			</header>