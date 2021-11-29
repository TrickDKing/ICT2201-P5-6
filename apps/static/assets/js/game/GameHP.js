class GameHP {
    constructor() {
        this.health = 100;
    }

    getHealth() {
        return this.health;
    }

    setHealth(health) {
        if (health == 0 || health >= 100) {
            return;
        }

        if (this.health >= 0) {
            this.health = health;

        }
    }

    display() {
     
        fill('red');
        rect(100, 560, 200, 55, 20);
        
        if (this.health > 1) {
            fill('green');
            rect(100, 560, this.health * 2, 55, 20);
        }

        fill('black');
        text('HP ', 10, 610);
    }



}