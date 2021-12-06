class GameLeaderboard {
    constructor() {
        this.url = "/gameLeaderboard";
        this.checkGetSuccess = 0;
        this.id = $("#level_id").val();
        this.attempts;
        this.attemptsLength;
        this.displayToggled = false;
    }

    getData(value) {
        
        this.attempts = value;
        this.attemptsLength = this.attempts.length;
        
    }

    getDataSize(){
        return this.attempts.length;
    }

    getAttempts() {
        $.ajax({
            url: '/gameLeaderboard',
            type: 'POST',
            data: {
                "level_id": this.id
            },
            success: function (data) {
                this.checkGetSuccess = 1;
                var attempts = data.attempts;
                attempts = attempts.sort(function (a, b) {
                    return b.score - a.score;
                });

                let height = 300;


                if (attempts.length > 5) {
                    attempts = attempts.slice(0, 5);
                }

                gameLeaderboard.getData(attempts);

                for (let i = 0; i < attempts.length; i++) {

                    attempts[i].id;
                    attempts[i].name;
                    attempts[i].score;

                    textSize(30)
                    text(attempts[i].name + " " + attempts[i].score, (710), height);
                    height += 50;
                }


            }
        });
        this.checkGetSuccess = 1;
    }

    setCheckGetSuccess(value) {
        this.checkGetSuccess = value;
    }

    getScore() {
        return this.topGameScores;
    }

    setSuccess(value) {
        return this.checkGetSuccess = value;
    }

    postGameScore() {
        return;
    }

    display() {
        if (this.checkGetSuccess == 0 && gameState.getGameState() == 3) {

            this.getAttempts();
        }

        textSize(50)
        text('LEADERBOARD', (windowWidth / 3) - 50, 100);
        text('LEVEL COMPLETE!', 600, 200);
        textSize(30)
        color('black');
        noFill();
        rect(540, 530, 200, 25);
        textSize(20);
        fill(0);
        text('RETURN TO MENU', 550, 550);

        color('black');
        noFill();
        rect(830, 530, 140, 25);
        textSize(20);
        fill(0);
        text('NEXT LEVEL', 840, 550);
        let height = 300;
        for (let i = 0; i < this.attemptsLength; i++) {

            textSize(30)
            text(this.attempts[i].name + " " + this.attempts[i].score, 710, height);
            height += 50;
            
        }

    }

}