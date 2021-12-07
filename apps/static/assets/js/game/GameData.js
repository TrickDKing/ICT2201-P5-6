class GameData {

    constructor() {
        this.data = {};
        this.url = 'http://127.0.0.1:5000/'; // Target URL
        this.postData = { userId: 1, score: 21, body: 'This game is garbage' };
    }

    getGameData() {

    }

    postGameData(data) {

        this.data = data;
        this.postData = {};
        httpPost(this.url, 'json', data, function(success) { console.log(success) }, function(error) { console.log(error) });

    }

}