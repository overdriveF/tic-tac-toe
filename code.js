
var player_1 = document.getElementsByClassName("player_1")[0];
var player_2 = document.getElementsByClassName("player_2")[0];

var score_1 = player_1.getElementsByTagName("span")[0];
var score_2 = player_2.getElementsByTagName("span")[0];

var board = document.getElementsByClassName("container")[0];
var restart_button = document.getElementById("restart");

class Player{
    constructor(name, turn, symbol){
        this.name = name;
        this.score = 0;
        this.turn = turn;
        this.symbol = symbol;
    }

    get_turn(){
        return this.turn;
    }
}

class Game{
    constructor(p1, p2){
        this.board = [[0,0,0], [0,0,0], [0,0,0]];
        this.p1 = p1;
        this.p2 = p2;
        this.winner = false;
    }

    start_game(){
        console.log(this.p2);
        score_1.textContent = this.p1.score;
        score_2.textContent = this.p2.score;

        // let event_player_1 = this.p1;
        // let event_player_2 = this.p2;
        let game = this;
        board.addEventListener("click", function(e){
            get_event(e, game);
        });
        restart_button.addEventListener("click", function(){
            restart_game(game);
        });
    }

    update_board(){
        if(this.p1.turn){
            this.check_board(1);
        }else{
            this.check_board(2);
        }
        this.p1.turn = !this.p1.turn;
        this.p2.turn = !this.p2.turn;
    }

    check_board(number){
        for(let i = 0; i < this.board.length; i++){
            if(this.board[i][0] === number && this.board[i][1] === number && this.board[i][2] === number || 
                this.board[0][i] === number && this.board[1][i] === number && this.board[2][i] === number){
                number === 1 ? this.update_winner(this.p1) : this.update_winner(this.p2);
                console.log("ganaste");
            }
        }      
        if((this.board[0][0] === number && this.board[1][1] === number && this.board[2][2] === number) || 
            (this.board[0][2] === number && this.board[1][1] === number && this.board[2][0] === number)){
            number === 1 ? this.update_winner(this.p1) : this.update_winner(this.p2);
        }
    }

    update_winner(player){
        player.score += 1;
        if(player.name === "Player 1"){
            score_1.textContent = player.score;
        }else{
            score_2.textContent = player.score;
        }
        this.winner = true;
        // document.getElementById("winner").textContent = player_name + " WIN !!!!";
    }
    

}

function restart_game(game){
    for(let i = 0; i < game.board.length; i++){
        for(let j = 0; j < game.board[i].length; j++){
            game.board[i][j] = 0;
        }
    }
    let span_tags = board.getElementsByTagName("span");
    for(let span of span_tags){
        if(span.classList.contains("fa-circle")){
            span.classList.remove("fa-circle");
        }else if(span.classList.contains("fa-times")){
            span.classList.remove("fa-times");
        }
    }
    game.winner = false;
    game.p1.turn = true;
    game.p2.turn = false;
}

function get_event(e, game){
    let t = e.target.tagName === "SPAN" ? e.target.parentElement : e.target;
    // console.log(t);
    if(!t.classList.contains("container") && !game.winner){
        if(!t.firstElementChild.classList.contains("fa-times") && !t.firstElementChild.classList.contains("fa-circle")){
            console.log("entra");
            let split_id = t.id.split("_");
            let simbolo = game.p1.turn ? game.p1.symbol : game.p2.symbol;
            if(game.board[split_id[0]][split_id[1]] === 0){
                game.board[split_id[0]][split_id[1]] = game.p1.turn ? 1 : 2;
                document.getElementById(t.id).getElementsByTagName("span")[0].classList.add("fa", simbolo);
            }
            game.update_board();
            // console.log(t.id);
        }
    }
}

function load(){
    let p1 = new Player("Player 1", true, "fa-times");
    let p2 = new Player("Player 2", false, "fa-circle");
    let game = new Game(p1, p2);
    game.start_game();
    // let p = new Player("Jugador 1", false);
    // console.log(p.get_turn());
}

function prueba(){

}

window.addEventListener("load", load);