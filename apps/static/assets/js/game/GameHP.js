class GameHP {
    constructor() {
        this.health = 100;
    }

    getHealth() {
        return this.health;
    }

    setHealth(health) {

        if (this.health >= 1) {

            if (this.health >= 0) {
                this.health -= health;
            }
            else if (this.health > 100) {
                this.health = 100;
            }

        }

    }

    reset() {
        this.health = 100;
    }

    display() {

        fill('red');
        rect(80, 560, 200, 35, 20);

        if (this.health > 1) {
            fill('green');
            rect(80, 560, this.health * 2, 35, 20);
        }

        textSize(40);
        fill('black');
        text('HP ', 10, 592);
    }



}

module.exports = GameHP;