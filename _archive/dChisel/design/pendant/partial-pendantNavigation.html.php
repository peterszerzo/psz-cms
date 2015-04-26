<div class="necklaceNav" id="linkTo">
	<?php for($i=1;$i<=$pageCount;$i++) { ?>
    	<a href="?pg=<?php echo $i; ?>#linkTo" <?php if($currentPage==$i) echo " id='activeNecklacePage'"; ?>>
        	<?php echo $i; ?>
    	</a>   
	<?php } ?>
</div>