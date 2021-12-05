class GameLeaderboard {
    constructor() {
        this.url = "http://127.0.0.1:5000/gameData";
        this.checkGetSuccess = 0;
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

        if (this.checkGetSuccess == 0) {

            httpGet(this.url, 'json', function (response) {
        
                // when the HTTP request completes
                let id, name, score;
                let height = 150;
                for (let i = 0; i < response.length; i++) {
                    response[i].id;
                    response[i].name;
                    response[i].score;
                    textSize(30)
                    text(response[i].name + " " + response[i].score, (windowWidth / 3) - 150, height);
                    height += 50;
                }

            }, function (error) {
                console.log("ERROR");
            });
            this.checkGetSuccess = 1;
        }

        textSize(50)
        text('LEADERBOARD', (windowWidth / 3) - 50, 100);
        textSize(30)
        color('black');
        noFill();
        rect(540, 500, 200, 25);
        textSize(20);
        fill(0);
        text('RETURN TO MENU', 550, 520);
    }

}