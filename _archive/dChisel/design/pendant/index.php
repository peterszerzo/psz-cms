<?php
	require_once("../../include/config.php");
    $activeNavButton="Design";
    $pageTitle="pendant";
    include(ROOT_PATH . "include/banner.php");     
    require_once("inventory.php");
?>		


<?php
	
	// number of items
	$pendantCount=count($inventory);
	
	// items per page
    $itemsPerPage=6;	
    
    // number of pages
    $pageCount=ceil($pendantCount/$itemsPerPage);  
	
	// determine current page from get input
	$currentPage=intval($_GET["pg"]);
    if (empty($_GET["pg"])) {
        $currentPage=1;
    }
    else $currentPage=intval($_GET["pg"]); 
    if ($currentPage>$pageCount) $currentPage=$pageCount;
	if ($currentPage<1) $currentPage=1;
	    
    if ($currentPage!=$_GET["pg"])
    	header(ROOT_URL . "design/pendant/?pg=".$currentPage."#linkTo");
    	
    $necklaceStartIndex=($currentPage-1)*$itemsPerPage;
    $necklaceEndIndex=($currentPage)*$itemsPerPage-1;
    if ($necklaceEndIndex>$pendantCount-1) $necklaceEndIndex=$pendantCount-1;

?>	

<div id="content">	    

    &nbsp;

    <a class="button" href="<?php echo BASE_URL; ?>design/">
    	<img src="<?php echo BASE_URL; ?>assets/images/buttons/action/backward.png" alt="back">
    </a>

    <h2 class="center pageHeading">The Pendant Project</h2>
    <p class="center">Question: how many random, spontaneous, ambiguous, childishly honest human thoughts, frowns and dreams fit into a circle just about 1.5" in diameter?<br> This digitally crafted pendant necklace series gives a couple of examples - enjoy the exploration of themes, compositions and styles, brought to you by a self-taught, debutante artist.</p>
        
    <iframe class="center" id="ytplayer" type="text/html" width="540" height="360"
  src="https://www.youtube.com/embed/0bKI3VSdD1g"
  frameborder="0"></iframe>

    <p class="center">The entire collection is available on <a target=_blank href="http://etsy.com/shop/dchisel">Etsy</a>.</p>
    
	<?php include("partial-pendantNavigation.html.php"); ?> 
    
    <?php
    	for($i = $necklaceStartIndex; $i <= $necklaceEndIndex; $i++) {
    		if($i < 9) $s='0'.($i+1);
    		else $s = ($i + 1);
    		// the data-pindex attribute is used by JavaScript to determine the index of the item
    		echo '<a href="#modal"><div class="necklace" data-pindex="'.$i.'">'.'<img src="images/jpgWide/'.$s.'.jpg" class="necklaceImage"></div></a>';
    	}			
    ?>	          
    <br> 		    
	<?php include("partial-pendantNavigation.html.php"); ?>    	          
    &nbsp;
        
</div>

<?php 
	include(ROOT_PATH . "include/footer.php"); 
?>