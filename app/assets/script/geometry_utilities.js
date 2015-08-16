var geomUtil = {

	subtractAngles: function(angle1, angle2) {
        if (angle1 < 90 && angle2 > 270) {
            return Math.abs(angle1 + 360 - angle2);
        }
        if (angle2 < 90 && angle1 > 270) {
            return Math.abs(angle2 + 360 - angle1);
        }
        return Math.abs(angle1 - angle2);
    },

    sphericalToCartesian: function(long, lat, r=1) {
        var degToRad = 1 / 57;
        return [Math.cos(long * degToRad) * Math.cos(lat * degToRad) * r, Math.sin(long * degToRad) * Math.cos(lat * degToRad) * r, Math.sin(lat * degToRad) * r];
    },

    getLongLatDistance: function(longLat1, longLat2) {
        var distance, pos1, pos2;
        // return geomUtil.getDistance(longLat1, longLat2);
        pos1 = geomUtil.sphericalToCartesian(longLat1[0], longLat1[1]);
        pos2 = geomUtil.sphericalToCartesian(longLat2[0], longLat2[1]);
        distance = geomUtil.getDistance(pos1, pos2);
        return distance;
    },

    getDistance: function(pos1, pos2) {
    	return Math.pow(Math.pow(pos2[0] - pos1[0], 2) + Math.pow(pos2[1] - pos1[1], 2) + Math.pow((pos2[2] || 0) - (pos1[2] || 0), 2), 0.5);
    }

};

export default geomUtil;