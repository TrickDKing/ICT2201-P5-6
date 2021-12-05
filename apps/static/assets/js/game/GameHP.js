class GameHP {
    constructor() {
        this.health = 100;
    }

    getHealth() {
        return this.health;
    }

    setHealth(health) {
        if (this.health >= 1) {

            if (health == 0 || health >= 100) {
                return;
            }
            else if (this.health + health >= 100) {
                this.health = 100;
            }
            else if (this.health + health < 0) {
                this.health = 0;
            }
            else if (this.health >= 0) {
                this.health -= health;
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