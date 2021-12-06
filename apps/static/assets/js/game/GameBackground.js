class GameBackground {

    constructor() {
     
       this.inc = 0.1;
        this.scl = 10;
        this.cols
        this.rows;
        this.zoff = 0;
        
        this.particles = [];
        this.flowfield;
        this.setup();
    }

    setup(){

        colorMode(HSB, 360);
        this.cols = floor(width / this.scl);
        this.rows = floor(height / this.scl);

        this.flowfield = new Array(this.cols * this.rows);

        for (var i = 0; i < 2500; i++) {
            this.particles[i] = new GameBackgroundParticle();
        }
        
    }

    display() {
        var yoff = 0;
        for (var y = 0; y < this.rows; y++) {
            var xoff = 0;
            for (var x = 0; x < this.cols; x++) {
                var index = x + y * this.cols;
                var angle = noise(xoff, yoff, this.zoff) * TWO_PI * 4;
                var v = p5.Vector.fromAngle(angle);
                v.setMag(1);
                this.flowfield[index] = v;
                xoff += this.inc;
                
            }
            yoff += this.inc;

            this.zoff += 0.0003;
        }

        for (var i = 0; i < this.particles.length; i++) {
            this.particles[i].follow(this.flowfield, this.scl, this.cols);
            this.particles[i].update();
            this.particles[i].edges();
            this.particles[i].show();
        }

    }



}