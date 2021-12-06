class GameLeaderboard {
    constructor() {
        this.url = "http://127.0.0.1:5000/gameLeaderboard";
        this.checkGetSuccess = 0;
        this.id = $("#level_id").val();
        console.log(this.id);
        this.getAttempts();
    }

    getAttempts() {
        $.ajax({
            url: '/gameLeaderboard',
            type: 'POST',
            data: {
                "level_id": this.id
            },
            success: function(data) {
                this.checkGetSuccess = 1;
                var attempts = data.attempts;
                attempts = attempts.sort(function(a, b) {
                    return b.score - a.score;
                });
                console.log(data.msg);
               // console.log(attempts);
                let height = 150;

                if (attempts.length > 5) {
                    attempts = attempts.slice(0, 5);
                }

                for (let i = 0; i < attempts.length; i++) {
                    attempts[i].id;
                    attempts[i].name;
                    attempts[i].score;
                    textSize(30)
                    text(attempts[i].name + " " + attempts[i].score, (600) - 150, height);
                    height += 50;
                }
            }
        });
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

            // httpGet(this.url, 'json', function(response) {

            //     // when the HTTP request completes
            //     let id, name, score;
            //     let height = 150;
            //     for (let i = 0; i < response.length; i++) {
            //         response[i].id;
            //         response[i].name;
            //         response[i].score;
            //         textSize(30)
            //         text(response[i].name + " " + response[i].score, (windowWidth / 3) - 150, height);
            //         height += 50;
            //     }

            // }, function(error) {
            //     console.log("ERROR");
            // });

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