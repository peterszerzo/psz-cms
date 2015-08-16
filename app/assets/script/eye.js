class Eye {

    constructor() {
        
        var periodModifier = 2,
            amplitudeModifier = 2;

        this.position = [0, 0];
        this.velocity = [amplitudeModifier * periodModifier, amplitudeModifier * periodModifier / 2];
        this.springConstant = [periodModifier / 35, periodModifier / 70];

    }
    
    updateConstant(vector) {
        this.position[0] += vector[0];
        this.position[1] += vector[1];
    }

    updateHarmonic(timeStep) {
        this._updateHarmonicVelocity(timeStep);
        this._updateHarmonicPosition(timeStep);
    }

    _updateHarmonicVelocity(timeStep) {
        this.velocity[0] -= this.position[0] * this.springConstant[0] * timeStep;
        this.velocity[1] -= this.position[1] * this.springConstant[1] * timeStep;
    }

    _updateHarmonicPosition(timeStep) {
        this.position[0] += this.velocity[0] * timeStep;
        this.position[1] += this.velocity[1] * timeStep;
    }

}

module.exports = Eye;