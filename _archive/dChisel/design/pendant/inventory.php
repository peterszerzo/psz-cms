<?php

class Pendant {

    public $name = "";

    public $description = "";

    function __construct($name, $description) {

        $this->$name = $name;
        $this->$description = $description;

    }

    function to_hash() {

        return array("name" => $this->$name, "description" => $this->$description);

    }

}

class Pendant_List {

    private $_list = "";

    function __construct($hash) {



    }

    function to_hash() {



    }

    function to_json() {



    }

}

$inventory = [
	["name" => "Brace Yourselves",	    "description" => "Cable structures - long and slender bridges, wide-spanning roofs, tall and skinny towers - embody lightness, elegance and tremendous freedom in architectural design.'Brace Yourselves' is inspired by this structural system, and by the paradigm that strength can and should go hand in hand with ease and grace."],
    ["name" => "The Camera",	   		"description" => "Let there be exposure!"],
    ["name" => "The Teacup",	   		"description" => "Intense teatime."],
    ["name" => "The Wrench",	   		"description" => "Feeling handy?"],
    ["name" => "The Boots",	   		    "description" => "Howdy, farmer!"],
    ["name" => "New Shoes",	   		    "description" => "Open the box of a brand new pair of running shoes. Enjoy the fresh rubbery smell and the pristine colors. Slip them on. The first steps are strange, but stable. Go!"],
    ["name" => "The Sign",	   			"description" => "Time for a somewhat more positive makeover of our rather aggressive octogonal road sign!"],
    ["name" => "The Pig",		   		"description" => "A new take on portraiture - more mystery, abstraction and escape."],
    ["name" => "Justice",		   		"description" => "A utopian vision."],
    ["name" => "The Bulb",	   			"description" => "Do you always lose a piece by the time you finish a puzzle, or is it just me?"],
    ["name" => "The Gentleman",  		"description" => "No matter what kind of animal you are, just add the top hat and the mustache and you're golden."],
    ["name" => "Scissors",	   			"description" => "Whether you’ve felt boxed in or cordoned off, it’s time for that frame to go."],
    ["name" => "The Corridor",   		"description" => "Doors wide open."],
    ["name" => "Recycle",		   		"description" => "Recycle. Feed Pacman."],
    ["name" => "Happy Family",   		"description" => "Until fully grown, these Pacman offsprings enjoy love, attention and quality time in their parents’ mouth, much like baby lions and alligators do...but how long do you think they can get away with that? One big happy family from the classic video game."],
    ["name" => "Raindrops",	   		    "description" => "About the most fun you can have in the rain. Especially if you’re barefoot."],
    ["name" => "Watercloset",	   		"description" => "Unlike some finding inspiration in coffee shops, art galleries or on long walks, I find mine sitting on the toilet. Where do you get your inspiration?"],
    ["name" => "Egg Bunny",	   		    "description" => "Best Easter wishes from my new hiding place!<br><br>~ inspired from traditional Transylvanian egg-painting patterns ~"],
    ["name" => "The Wagon Wheel",		"description" => "Tough Journey"],
    ["name" => "The Tree",	   			"description" => "You call this wind?"],
    ["name" => "Tulip Caligraphy",		"description" => "Different arrangements of a tulip can spell out most of the letters. This is a first attempt on a cursive lower-case ‘c’. Let me know if you’d like a different letter custom-made for you!"],
    ["name" => "The Candle",	   		"description" => "Never leave unattended.<br><br>~ concept by Greta Shum ~"],
    ["name" => "The Scarab",	   		"description" => "Bugs are fascinating - they are continuously present in our daily lives, sometimes carefully hidden or camouflaged, sometimes strikingly visible.<br><br>This antisymmetrical abstraction of a scarab beetle uses the presence and absence of material to play with the way the viewer interprets the image - what is 'there' and what is not?<br><br>~ concept and sketch by Tiffany Cheezem ~"],
    ["name" => "The Banana",	   		"description" => "Fruit salad anyone?"],
    ["name" => "Composite",	   		    "description" => "A composite is made from materials of different strengths and weaknesses, each appropriate for a different task. Here, wood becomes brick, brick becomes glass, and glass becomes negative space. When do materials of a different nature strengthen each other? When do they destroy each other? In this pendant, combination and conflict themselves coexist.<br><br>~ and I just made that up ~<br><br>~~ with a bit of help ~~"],
    ["name" => "Champions of Sleep",	"description" => "- How much did ya sleep last night?<br>- Just about 10 hours.<br>- Damn, you deserve a freakin’ medal!<br>Medal delivered. Check. Next!"],
    ["name" => "The Dragonfly",  		"description" => "A multi-faceted dragonfly darts out of one world and into the next. Let it carry you into your world of choice!<br><br>~ concept and sketch by Tiffany Cheezem ~"],
    ["name" => "Bun in the Oven",		"description" => "May the wonderful smell of fresh-baked goodies guide you through your day."],
    ["name" => "Graduation",	   		"description" => "Graduation is a big deal. A good college degree is all you need in life. All you need."],
    ["name" => "Hitting a Wall", 		"description" => "And punching right through - a classic scene from Hanna and Barbera's Tom and Jerry."],
    ["name" => "The Brain",	   		    "description" => "Ever felt like your brain was fried? Behold the best of intellectual gourmet cuisine."],
    ["name" => "Romeo and Juliet",      "description" => "A reinterpretation of the classic."]
];

// generate titles array in javascript
	// var titles= [ ["necklaceTitle1", "necklaceDescription1"], ["_2","_2"], ... ];
echo '<script type="text/javascript">';
	echo 'var titles=[';
		foreach($inventory as $item) {
			echo '["' . $item["name"] . '", "' . $item["description"] . '"]';
			if ($item["name"]!="Romeo and Juliet") echo ",";
		}
	echo '];';
echo '</script>';

?>
