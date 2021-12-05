class GameBackgroundParticle {

    constructor() {
        this.pos = createVector(random(width), random(height));
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.maxspeed = 2;

        this.prevPos = this.pos.copy();

        this.h = 0;
        this.colour = color(0, 0, 0, 5);
    }

    update() {
        this.vel.add(this.acc);
        this.vel.limit(this.maxspeed);
        this.pos.add(this.vel);
        this.acc.mult(0);
        this.h = (this.h + 1) % 360;
        this.colour = color(this.h, 360, 360, 5);
    }

    follow(vectors, scl, cols) {
        var x = floor(this.pos.x / scl);
        var y = floor(this.pos.y / scl);
        var index = x + y * cols;
        var force = vectors[index];
        this.applyForce(force);
    }

    applyForce(force) {
        this.acc.add(force);
    }

    show() {
        stroke(this.colour);
        strokeWeight(1);
        line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);

        this.updatePrev();
    };

    updatePrev() {
        this.prevPos.x = this.pos.x;
        this.prevPos.y = this.pos.y;
    };

    edges() {
        if (this.pos.x > width) {
            this.pos.x = 0;
            this.updatePrev();
        }
        if (this.pos.x < 0) {
            this.pos.x = width;
            this.updatePrev();
        }
        if (this.pos.y > height) {
            this.pos.y = 0;
            this.updatePrev();
        }
        if (this.pos.y < 0) {
            this.pos.y = height;
            this.updatePrev();
        }
    }

}