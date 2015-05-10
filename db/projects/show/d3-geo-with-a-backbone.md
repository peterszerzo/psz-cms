For a work project, I thought up a little trick that made d3-based geomapping inside a model-heavy Backbone app more streamlined.

# Background

d3 is a functional library, whose geomapping capabilities usually make use of a static JSON file (GeoJson or its compressed sibling, TopoJson).

Backbone, on the other end, is object-oriented. No wonder that stuffing it in a framework that prefers things static can seem a little paralyzing.

For a work project, I thought a lot about this problem. I looked at inspiration from others, but couldn't really find one that involves geoapplications.

# Rich GeoJson

GeoJson is known to be a static construct, but that does not mean we can't spice it up - thinking the finest organic turmeric.