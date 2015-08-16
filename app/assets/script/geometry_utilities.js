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

    sphericalToCartesian: function(long, lat, r) {
        var degToRad;
        if (r == null) {
            r = 1;
        }
        degToRad = 1 / 57;
        return [Math.cos(long * degToRad) * Math.cos(lat * degToRad) * r, Math.sin(long * degToRad) * Math.cos(lat * degToRad) * r, Math.sin(lat * degToRad) * r];
    },

    getDistance: function(long1, lat1, long2, lat2) {
        var distance, pos1, pos2;
        pos1 = geomUtil.sphericalToCartesian(long1, lat1);
        pos2 = geomUtil.sphericalToCartesian(long2, lat2);
        distance = Math.pow(Math.pow(pos2[0] - pos1[0], 2) + Math.pow(pos2[1] - pos1[1], 2) + Math.pow(pos2[2] - pos1[2], 2), 0.5);
        return distance;
    }

};

export default geomUtil;