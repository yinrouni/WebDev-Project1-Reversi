import React from "react";
import ReactDOM from "react-dom";
import Konva from 'konva';
import _ from "lodash";
import { Stage, Layer, Circle, Rect } from 'react-konva';
export default function game_init(root, channel, user) {
	ReactDOM.render(<Reversi channel={channel} user={user} />, root);
}


let OFFSET=40;
let RADIUS=26;
let SIZE=60;

function Tile(props){
  var x = (props.row + 0.5)*SIZE + OFFSET;
  var y = (props.column + 0.5)*SIZE +OFFSET;
  return <Circle radius={RADIUS} x={x} y={y} fill = {props.color} stroke = "black" strokeWidth={1} />;
}

function Square(props){
  return <Rect x={OFFSET + SIZE * props.row} y={OFFSET + SIZE * props.column} 
	width = {SIZE} height={SIZE} fill="green" stroke="black" strokeWidth={1} />; 
}

function Chat(props){
  return <div id ="chat">
		<div id="text">{props.text}</div>
		<br />
		<form>
  		<input type="datetime-local" name="bdaytime" />
 		 <input type="submit" value="Send" />
		</form>
		</div>;
}

function StatusButtons(props){
  if (props.gameStatus == "waiting"){
// Add onclick handler
    return <button id="join"> Join the Game </button>;
  }
  else {
    return <div>
		  <button id='resignation'>Resingnation</button>
	  	<button id='undo'>Undo</button>
	</div>;
  }
}

class Reversi extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {
	    present: this.initTiles(),
	    timeCount: 0,
	    turn: null,
	    text: "display",
	    player1: null, 
	    player2: null, 
	    players:[],
	    gameStatus:"waitin",
	    undoStack:[],
    };
  }

  initTiles(){
    var ret = [];
    for (var i = 0; i < 8; i++){
      var row = [];
      for (var j = 0; j < 8; j++){
        row.push(null);
      }
      ret.push(row);
    }
    ret[3][4] = "white";
    ret[4][3] = "white";
    ret[3][3] = "black";
    ret[4][4] = "black";

    return ret;
  }

  initialize(){
    var board =[];
    for (var i = 0; i < 8; i ++){
      for (var j = 0; j < 8; j++){
      	board.push(<Square row={i} column={j} key={i*8+j} />);
      }
    }
    for (var m = 3; m < 5; m ++){
      for (var n = 3; n < 5; n ++){
	if (m==n){
      	  board.push(<Tile color="black" row={m} column={n} key={m*8+n+64} />);
        }
	else {
	  board.push(<Tile color="white" row={m} column={n} key={m*8+n+64} />);
	}
      }
    }
    return board;
  }


  render() {
    return <div id="overall">
      <Stage width={600} height={600}>	
        <Layer>
          {this.initialize()}
	</Layer>
      </Stage>
      <StatusButtons gameStatus={this.state.gameStatus} />
      <Chat text={this.state.text} />
    </div>;
  }
}

/*
class Reversi extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [],
      on_going: true,
      current_player: "black",
      players: [],
      spectators: []
    };
    this.user=props.user
    this.channel = props.channel;
    this.channel.on("update", (game) => {
    this.setState(game);
    console.log("update");
    });
    this.channel
      .join()
      .receive("ok", this.init_state.bind(this))
      .receive("error", resp => {
        console.log(resp);
      });
  }

  init_state(props) {
    this.setState(props.game);
  }

  getPlayer(name) {
    for(var k in this.state.players) {
       if(this.state.players[k].name==name) {
         return k;
       }
    }
    return -1;
  }

  getSpectator(name) {
    for(var k in this.state.spectators) {
       if(this.state.spectators[k].name==name) {
         return k;
       }
    }
    return -1;
  }

  reset() {
   //only a player can reset the game
   if(this.getPlayer(this.user)>=0) {
      this.channel.push("reset", {}).receive("ok", this.init_state.bind(this));
   }
  }

  leave() {
    var type="";
    //check if this user is a player
    console.log("leave");
    if(this.getPlayer(this.user)>=0) {
      type="player";
    }
    else {
      type="spectator";
    }
    this.channel.push("leave", {type: type, user: this.user})
    window.location.replace("http://www.reversi.zy-peng.com")
  }

  click(x, y) {
    let idx = this.getPlayer(this.user);
    if(idx>=0) {
       if(this.state.players[idx].color==this.state.current_player) {
           this.channel.push("click", {x: x, y: y})
               .receive("ok", this.init_state.bind(this));
       }
    }
  }
	leave() {
	    var type="";
	    //check if this user is a player
	    console.log("leave");
	    if(this.getPlayer(this.user)>=0) {
	      type="player";
	    }
	    else {
	      type="spectator";
	    }
	    this.channel.push("leave", {type: type, user: this.user})
	    window.location.replace("http://127.0.0.1:4000")
	  }

	  click(x, y) {
	    let idx = this.getPlayer(this.user);
	    if(idx>=0) {
	       if(this.state.players[idx].color==this.state.current_player) {
	           this.channel.push("click", {x: x, y: y})
	               .receive("ok", this.init_state.bind(this));
	       }
	    }
	  }

	  render() {
	//     console.log(this.state.board)
	     var len=this.state.players.length;
	     var type = ((this.getPlayer(this.user)>0)? "player" : "spectator");
	     return (
				 <div>
				 <RenderWinner players={this.state.players} winner={this.state.winner} />
	       <div id="main">
	           <RenderBoard id="RenderBoard" board={this.state.board} click={this.click.bind(this)} />
						 <div id="list">
						 <h2>Players</h2>
						 <RenderPlayers players={this.state.players}/>
						 <h2>Spectators</h2>
						 <RenderSpectators spectators={this.state.spectators}/>
						 </div>
	      </div>
				<div>
				<button id = "btn" onClick={this.leave.bind(this)}>leave</button>
				<button id = "btn" onClick={this.reset.bind(this)}>reset</button>
	      </div>
				</div>
			 );
	  }
	}

	function RenderBoard(props) {
	   var result=[];
	   for(var x in props.board) {
	     var row=[];
	     for(var y in props.board[x]) {
	        var target=props.board[x][y];
	        if(target.color=="black") {
	           row.push(<td><button id="game_btn"><img id="btn-image" src="/images/black_button.png" alt="black_image"/>
						 </button></td>)
	        }
	        else if(target.color=="white") {
	           row.push(<td><button id="game_btn"><img src="/images/white_button.png"
						 alt="white_image"/></button></td>)
	        }
	        else {
	           let x_cp=x;
		         let y_cp=y;
	           row.push(<td><button id="game_btn" onClick={() => props.click(x_cp, y_cp)}>
						 <img id="empty-img" src="/images/empty_button.png" alt="empty_image"/>
						 </button></td>)
	        }
	     }
	      result.push(<tr>{row}</tr>)
	   }
	   return (
	     <tb className="board_table">{result}</tb>
	   );
	}


	function RenderPlayers(props) {
		var result = [];
		for(let i in props.players) {
			let target = props.players[i].name

			result.push(<p>{target}</p>)
		}
		return (
			<div>{result}</div>
		);
	}

	function RenderSpectators(props) {
		var result = [];
		for(let i in props.spectators) {
			let target = props.spectators[i].name

			result.push(<p>{target}</p>)
		}
		return (
			<div>{result}</div>
		);
	}

function RenderWinner(props) {
  if(props.players.length<2) {
    return (<p id="winner">Waiting for another player</p>);
  }
  switch(props.winner) {
	case "":
	  return (<p id="winner">In Game</p>);
	default:
	  return (<p id="winner">{props.winner} wins! </p>);
  }
}*/
