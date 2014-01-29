Ti.API.info('Got game module');

var players = [];
players.push('Jason');
players.push('Zou');

//Set 2 players
gameSession.setTmpPlayerNames(players);
var sessionPlayers = gameSession.getTmpPlayerNames();
for(var i=0; i < sessionPlayers.length; i++){
	Ti.API.info('Current player list has: '+sessionPlayers[i]);
}

//UI goes back, now we set 3 players
Ti.API.info('UI goes back, choosing new players');
players = [];
players.push('Vagelis');
players.push('Dimitris');
players.push('Anta');
gameSession.setTmpPlayerNames(players);
var sessionPlayers = gameSession.getTmpPlayerNames();
for(var i=0; i < sessionPlayers.length; i++){
	//Ti.API.info('Current player list has: '+sessionPlayers[i]);
}

//Ready to start playing, persist players
gameSession.saveTmpPlayers();

gameSession.setGameType(BUZZ_GAME_GROUP);
gameSession.setGameGroupType(BUZZ_GROUP_TYPE_PLAYERS);
gameSession.setGroupTurnType(BUZZ_GROUP_TURN_SWITCH);

//GAME START
var currentPlayer = gameSession.getCurrentPlayer();

//Current Player earns 80 points
gameSession.correctAnswer(80);
debugPlayer();

//Current Player earns 20 points
gameSession.correctAnswer(20);
debugPlayer();

//Player 1 wrong question
gameSession.wrongAnswer();
Ti.API.info('Current Player WRONG answer');
debugPlayer();
//GAME END





//helper functions
function debugPlayer(){
	currentPlayer = gameSession.getCurrentPlayer();
	Ti.API.info('Current player is '+currentPlayer.name+' with '+currentPlayer.score+' score, '+currentPlayer.lives+' lives and '+currentPlayer.consecutiveCorrect+' consecutive corrects');
}

function debugGameSession(){
	
}
