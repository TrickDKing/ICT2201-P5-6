class GameLeaderboard {
    constructor() {

        this.topGameScores;
        this.url = "http://127.0.0.1:5000/gameData";
        this.checkGetSuccess = 0;
    }

    getLeaderboard() {
        let url = "http://127.0.0.1:5000/gameData";
        
        httpGet(url, 'json', function (response) {
            // when the HTTP request completes
            console.log(response);
            this.topGameScores = response;
           // let id, name, score;
            /*for (let i = 0; i < response.length; i++) {
                id = response[i].id;
                name = response[i].name;
                score = response[i].score;
                console.log(typeof(score));
               console.log(id + " " + name + " " + score);
               this.TopGameScores.push(num.toString(name) + " ");
            }*/


        }, function(error){
            console.log("ERROR");
        });
        this.checkGetSuccess = 1;
        
    }

    postGameScore() {
        return;
    }

    display() {

        if (this.checkGetSuccess == 0) {
            this.getLeaderboard();
            console.log(this.topGameScores);
        }

        textSize(50)
        text('LEADERBOARD', (windowWidth / 3) - 50, 100);
        textSize(30)
        text('#1 ' + this.topGameScores, (windowWidth / 3) - 150, 150);
        text('#2', (windowWidth / 3) - 150, 200);
        text('#3', (windowWidth / 3) - 150, 250);
        text('#4', (windowWidth / 3) - 150, 300);
        text('#5', (windowWidth / 3) - 150, 350);
        color('black');
        noFill();
        rect(540, 500, 200, 25);
        textSize(20);
        fill(0);
        text('RETURN TO MENU', 550, 520);
    }

}