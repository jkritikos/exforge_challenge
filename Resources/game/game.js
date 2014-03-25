//The type of game (group or solo)
var gameType;
//The type of group game (players or teams)
var gameGroupType;
//The type of group turn mode (switch or chill)
var gameGroupTurnType;
//The player objects for the current game instance
var gamePlayers = [];
//The player objects that have LOST in the current game instance
var gamePlayersLost = [];
//The player object that won
var gameWinner = null;
//The player currently playing
var currentPlayerIndex = 0;
//TMP holder for the player names defined in a multiplayer game just before the game starts
var tmpGamePlayerNames = [];
//Has the game started
var gameStarted = false;
//Gameplay category banner image
var gameCurrentCategoryBanner;
//Gameplay category id
var gameSelectedCategoryId;
//Game over
var gameOver = false;
//Last player who lost (for multiplayer games, the UI needs to know)
var lastLostPlayer = null;
//The global question index
var sessionQuestionIndex = 0;
//The wikipedia url to be displayed
var wikipediaURL = null;

var restartNewCategory = false;

/////////////////////////////////////////////////PRIVATE interfaces/////////////////////////////////////////////////
//Sets the game over flag
function _setGameOver(b){
	gameOver = b;
}

/*Moves current player pointer to the appropriate player*/
function _nextPlayer(){
	Ti.API.info('gameModule: nextPlayer() called with currentPlayerIndex='+currentPlayerIndex+' and gamePlayers.length='+gamePlayers.length);
	//Proceed to next player, or start over
	if(currentPlayerIndex < (gamePlayers.length -1)){
		currentPlayerIndex++;
	} else {
		//TODO this MIGHT not work if the first player has already LOST. You need to set the pointer to the first object
		currentPlayerIndex = 0;
	}
}

/*Sets a new set of players, with the specified index removed*/
function _removePlayer(playerIndex, playerLost, resetIndexFlag){
	Ti.API.info('removePlayer starts - players are now '+gamePlayers.length);
	var newGamePlayers = [];
	for(var i=0; i < gamePlayers.length; i++){
		//Ti.API.info('removePlayer playerIndex '+playerIndex+' and i '+i);
		if(i == playerIndex){
			
			if(playerLost){
				Ti.API.warn('Player '+i+' LOST - adding to the lost players list');
				gamePlayersLost.push(gamePlayers[i]);
			} else {
				Ti.API.warn('Player '+i+' QUIT - NOT adding to the lost players list');
				continue;
			}
			
		} else {
			//Ti.API.info('removePlayer adds player '+gamePlayers[i].name);
			newGamePlayers.push(gamePlayers[i]);
		}
	}
	
	gamePlayers = newGamePlayers;
	
	//Reset current player index if needed
	if(resetIndexFlag){
		currentPlayerIndex = 0;
	}
	
	Ti.API.info('removePlayer ends - players are now '+gamePlayers.length);
}

/*Sets the name of the last player that lost*/
function _setLastLostPlayer(s){
	lastLostPlayer = s;
}

/*Inserts a group player*/
function _saveGroupPlayer(data){
	var db = Ti.Database.install('buzz_db.sqlite', 'db');
	db.execute('insert into PLAYERS_GROUP (name,avatar_filename) values (?,?)', data.name, data.avatarFile);
	var playerId = db.lastInsertRowId;
	db.close();
	
	return playerId;
}

//Reloads questions and resets all indexes for each player
function _resetPlayerProperties(){
	//For group games, we load questions first
	if(gameSession.getGameType() == BUZZ_GAME_GROUP){
		if(gameSelectedCategoryId == CAT_TOTALBUZZ){
			questionSet = getGroupRandomGameQuestionsInitial(DUMMY_GROUP_PLAYER_ID, gamePlayers.length);
		} else {
			questionSet = getGroupGameQuestionsInitial(gameSelectedCategoryId, DUMMY_GROUP_PLAYER_ID, gamePlayers.length);
		}
		
		_distributeGroupQuestions(questionSet.data, false);
	}
	
	if(gamePlayers != null && gamePlayers.length > 0){
		for(var i=0; i < gamePlayers.length; i++){
			var player = gamePlayers[i];
			var playerId = player.player_id;
			
			player.score = 0;
			player.consecutiveCorrect = 0;
			player.questionIndex = 0;
			player.totalCorrectAnswers = 0;
			player.lives = 3;
			
			//Load questions for SOLO
			if(gameSession.getGameType() == BUZZ_GAME_SOLO){
				Ti.API.warn('LOADING QUESTIONS from _resetPlayerProperties()');
				if(gameSelectedCategoryId == CAT_TOTALBUZZ){
					player.questions = getRandomGameQuestions(playerId);
				} else {
					player.questions = getGameQuestions(gameSelectedCategoryId, playerId);
				}
			}
		}
	}
}

//Takes an array of questions and distributes (ADDs) it equally to the current list of players
exports.addMoreQuestionsToPlayers = function(data){
	var numPlayers = gamePlayers.length;
	var distributingForPlayerIndex = 0;
	
	Ti.API.info('Game.js: _addMoreQuestionsToPlayers() called with '+data.length+' elements - '+numPlayers+' players still playing');
	
	//init arrays
	var sortedData = new Array();
	for(var i=0; i < numPlayers; i++){
		sortedData[i] = new Array();
	}
	
	//iterate questions
	for(var i=0; i < data.length; i++){
		
		//reset player index to start over
		if(distributingForPlayerIndex == numPlayers){
			distributingForPlayerIndex = 0;
		}
		
		//Ti.API.info('Game.js: _addMoreQuestionsToPlayers() adding question for player '+distributingForPlayerIndex);
		sortedData[distributingForPlayerIndex].push(data[i]);
		distributingForPlayerIndex++;
	}
	
	//Set sorted questions
	Ti.API.info('Game.js: _addMoreQuestionsToPlayers() ready to set sorted questions:');
	for(var i=0; i < numPlayers; i++){
		var currentSet = gamePlayers[i].questions.data;
		Ti.API.info('Game.js: _addMoreQuestionsToPlayers() player '+i+' HAD '+currentSet.length+' questions. Will add now '+sortedData[i].length+' questions');
		
		currentSet = currentSet.concat(sortedData[i]);
		Ti.API.info('Game.js: _addMoreQuestionsToPlayers() player '+i+' NOW HAS '+currentSet.length+' questions');
		
		gamePlayers[i].questions = {data:currentSet};
	}
}

//Takes an array of questions and distributes it equally and in the proper order to the players
function _distributeGroupQuestions(data, useTmpPlayers){
	//Ti.API.info('Game.js: _distributeGroupQuestions() called with '+data.length+' elements');
	
	var playerObject = gamePlayers;
	if(useTmpPlayers){
		playerObject = tmpGamePlayerNames;
	}
	
	var numPlayers = playerObject.length;
	
	//init arrays
	var sortedData = new Array();
	for(var i=0; i < numPlayers; i++){
		sortedData[i] = new Array();
	}
	
	var distributingForPlayerIndex = 0;
	
	var EASY_QUESTIONS = QUESTION_GROUP_LOAD_EASY;
	var MEDIUM_QUESTIONS = QUESTION_GROUP_LOAD_MEDIUM;
	var HARD_QUESTIONS = QUESTION_GROUP_LOAD_HARD;
	
	var indexEasyStart = 0;
	var indexEasyEnd = (numPlayers * EASY_QUESTIONS);
	var indexMediumStart = indexEasyEnd;
	var indexMediumEnd = indexMediumStart + ((numPlayers * EASY_QUESTIONS));
	var indexHardStart = indexMediumEnd;
	
	//Ti.API.info('Game.js: _distributeGroupQuestions() EASY START:'+indexEasyStart);
	//Ti.API.info('Game.js: _distributeGroupQuestions() EASY END:'+indexEasyEnd);
	//Ti.API.info('Game.js: _distributeGroupQuestions() MED START:'+indexMediumStart);
	//Ti.API.info('Game.js: _distributeGroupQuestions() MED END:'+indexMediumEnd);
	//Ti.API.info('Game.js: _distributeGroupQuestions() HARD START:'+indexHardStart);
	
	var questionsEasy = data.slice(indexEasyStart, indexEasyEnd);
	var questionsMedium = data.slice(indexMediumStart, indexMediumEnd);
	var questionsHard = data.slice(indexHardStart);
	
	//Ti.API.info('Game.js: _distributeGroupQuestions() spliced arrays:');
	//Ti.API.info('Game.js: _distributeGroupQuestions() EASY:'+questionsEasy.length);
	//Ti.API.info('Game.js: _distributeGroupQuestions() MEDIUM:'+questionsMedium.length);
	//Ti.API.info('Game.js: _distributeGroupQuestions() HARD:'+questionsHard.length);
	
	//Ti.API.info('Game.js: SANITY CHECK');
	var addedQuestions = 0;
	for(var i=0; i < questionsEasy.length; i++){
		//Ti.API.info('Game.js: questionsEasy[i].value:'+questionsEasy[i].value);
		if(questionsEasy[i].value != 100){
			Ti.API.error('EASY QUESTIONS CONTAIN CRAP');
		}
		
		if(addedQuestions < EASY_QUESTIONS){
			//tmpGamePlayerNames[distributingForPlayerIndex].questionsTMP.push(questionsEasy[i]);
			sortedData[distributingForPlayerIndex].push(questionsEasy[i]);
			addedQuestions++;
		} else {
			distributingForPlayerIndex++;
			addedQuestions = 1;
			//tmpGamePlayerNames[distributingForPlayerIndex].questionsTMP.push(questionsEasy[i]);
			sortedData[distributingForPlayerIndex].push(questionsEasy[i]);
		}
	}
	
	//done with EASY, reset flags
	addedQuestions = 0;
	distributingForPlayerIndex = 0;
	
	for(var i=0; i < questionsMedium.length; i++){
		//Ti.API.info('Game.js: questionsMedium[i].value:'+questionsMedium[i].value);
		if(questionsMedium[i].value != 200){
			Ti.API.error('MEDIUM QUESTIONS CONTAIN CRAP');
		}
		
		if(addedQuestions < MEDIUM_QUESTIONS){
			sortedData[distributingForPlayerIndex].push(questionsMedium[i]);
			//tmpGamePlayerNames[distributingForPlayerIndex].questionsTMP.push(questionsMedium[i]);
			addedQuestions++;
		} else {
			distributingForPlayerIndex++;
			addedQuestions = 1;
			sortedData[distributingForPlayerIndex].push(questionsMedium[i]);
			//tmpGamePlayerNames[distributingForPlayerIndex].questionsTMP.push(questionsMedium[i]);
		}
	}
	
	//done with MEDIUM, reset flags
	addedQuestions = 0;
	distributingForPlayerIndex = 0;
	
	for(var i=0; i < questionsHard.length; i++){
		//Ti.API.info('Game.js: questionsHard[i].value:'+questionsHard[i].value);
		if(questionsHard[i].value != 300){
			Ti.API.error('HARD QUESTIONS CONTAIN CRAP');
		}
		
		//Ti.API.info('Game.js: adding hard question for distributingForPlayerIndex:'+distributingForPlayerIndex);
		//sortedData[distributingForPlayerIndex].push(questionsHard[i]);
		//distributingForPlayerIndex++;
		if(addedQuestions < HARD_QUESTIONS){
			sortedData[distributingForPlayerIndex].push(questionsHard[i]);
			//tmpGamePlayerNames[distributingForPlayerIndex].questionsTMP.push(questionsMedium[i]);
			addedQuestions++;
		} else {
			distributingForPlayerIndex++;
			addedQuestions = 1;
			sortedData[distributingForPlayerIndex].push(questionsHard[i]);
			//tmpGamePlayerNames[distributingForPlayerIndex].questionsTMP.push(questionsMedium[i]);
		}
	}
	
	//Set sorted questions
	for(var i=0; i < numPlayers; i++){
		playerObject[i].questions = {data:sortedData[i]};
	}
	
	//Ti.API.info('Game.js: completed, results are:');
	for(var i=0; i < numPlayers; i++){
		//Ti.API.info('Game.js: Player '+i+' has questions='+playerObject[i].questions.data.length);
	}
}

/////////////////////////////////////////////////PUBLIC interfaces/////////////////////////////////////////////////
//Workaround for SOLO-PLAY-AGAIN functionality
exports.shouldRestartWithNewCategory = function(){
	return restartNewCategory;
}

exports.setRestartWithNewCategory = function(s){
	restartNewCategory = s;
}
exports.setWikipediaURL = function(s){
	wikipediaURL = s;
}

exports.getWikipediaURL = function(){
	return wikipediaURL;
}

//Quits the game - destroys all vars
exports.quitGameSession = function(){
	gameType = null;
	gameGroupType = null;
	gameGroupTurnType = null;
	gamePlayers = [];
	gamePlayersLost = [];
	gameWinner = null;
	currentPlayerIndex = 0;
	tmpGamePlayerNames = [];
	gameStarted = false;
	gameCurrentCategoryBanner = null;
	gameSelectedCategoryId = null;
	gameOver = false;
	lastLostPlayer = null;
	sessionQuestionIndex = 0;
	restartNewCategory = false;
}

/*Restarts the game*/
exports.restartGameSession = function(){
	gamePlayersLost = [];
	gameWinner = null;
	currentPlayerIndex = 0;
	gameStarted = false;
	gameOver = false;
	lastLostPlayer = null;
	sessionQuestionIndex = 0;
	
	//reload questions, reset indexes etc
	_resetPlayerProperties();
}

//Returns the global question index
exports.getQuestionIndex = function(){
	return sessionQuestionIndex;
}

/*Returns the player object that won the current game*/
exports.getWinner = function(){
	return gameWinner;
}

/*Returns the highest score achieved in this game session*/
exports.getMaxScore = function(){
	var highScore = 0;
	for(var i=0; i < gamePlayersLost.length; i++){
		if(gamePlayersLost[i].score > highScore){
			highScore = gamePlayersLost[i].score;
		}
	}
	
	return highScore;
}

/*Returns the object representing the LOST players*/
exports.getLostPlayers = function(){
	return gamePlayersLost;
}

/*Moves pointer to the next player (simply calls the private method)*/
exports.nextPlayer = function(){
	Ti.API.info('gameModule: nextPlayer() called');
	
	var currentPlayer = gamePlayers[currentPlayerIndex];
	
	//Switch to the next player if in this mode or if a player in group mode just lost
	if((gameType == BUZZ_GAME_GROUP && gameGroupTurnType == BUZZ_GROUP_TURN_SWITCH) || currentPlayer.lives == -1){
		_nextPlayer();
	}
}

/*Resets the last lost player to null*/
exports.resetLastLostPlayer = function(){
	lastLostPlayer = null;
}

/*Returns the last player that lost*/
exports.getLastLostPlayer = function(){
	return lastLostPlayer;
}

/*Sets the selected game category id*/
exports.setSelectedGameCategoryId = function(s){
	gameSelectedCategoryId = s;
}

/*Returns the selected game category id*/
exports.getSelectedGameCategoryId = function(){
	return gameSelectedCategoryId;
}

/*Sets the category banner icon image path*/
exports.setCurrentCategoryBanner = function(s){
	gameCurrentCategoryBanner = s;
}

/*Returns the category banner icon image path*/
exports.getCurrentCategoryBanner = function(){
	return gameCurrentCategoryBanner;
}

/*Returns the game over flag*/
exports.isGameOver = function(){
	return gameOver;
}

/*Sets the game over flag*/
exports.setGameOver = function(b){
	_setGameOver(b);
}

/*Returns the state of the current game session*/
exports.hasGameStarted = function(){
	return gameStarted;
}

/*Sets the state of the current game session*/
exports.setGameStarted = function(b){
	gameStarted = b;
}

/*Called when a wrong answer is selected.*/
exports.wrongAnswer = function(){
	sessionQuestionIndex++;
	
	//fetch
	var currentPlayer = gamePlayers[currentPlayerIndex];
	
	var saveAnswerAsPlayer = currentPlayer.player_id;
	if(gameType == BUZZ_GAME_GROUP){
		saveAnswerAsPlayer = DUMMY_GROUP_PLAYER_ID;
	}
	
	//current question being answered
	var currentQuestion = currentPlayer.questions.data[currentPlayer.questionIndex].id;
	saveAnswer(currentQuestion, saveAnswerAsPlayer, 0, false);
	Ti.API.info('gameModule: wrongAnswer() called for question '+currentQuestion+' and player '+currentPlayer.player_id);
	
	//update
	currentPlayer.lives--;
	currentPlayer.consecutiveCorrect = 0;
	currentPlayer.questionIndex++;
	Ti.API.info('gameModule: reduces lives to '+currentPlayer.lives+' for player:'+currentPlayer.name);
	
	//persist
	gamePlayers[currentPlayerIndex] = currentPlayer;
	
	//For group games check if a player lost by loosing this life
	if(gameType == BUZZ_GAME_GROUP){
		if(currentPlayer.lives == -1){
			
			//If this is the last player, the game is over
			if(gamePlayers.length == 1){
				Ti.API.info('gameModule: gameOver');
				_setGameOver(true);
				gameWinner = currentPlayer;
			}
			
			//Mark the lost player so the UI can show it
			_setLastLostPlayer(currentPlayer);
			Ti.API.info('gameModule: player lost:'+currentPlayer.name);
			
			//By default we dont reset the player index flag when someone looses
			var resetPlayerIndexFlag = false;
			if(currentPlayerIndex == (gamePlayers.length -1)){
				Ti.API.warn('gameModule: RESETTING player index');
				resetPlayerIndexFlag = true;
			} 
			
			//player lost
			_removePlayer(currentPlayerIndex, true, resetPlayerIndexFlag);
		}	
	} else if(gameType == BUZZ_GAME_SOLO){
		//Always mark the one and only SOLO user as the winner
		gameWinner = currentPlayer;
		
		if(currentPlayer.lives == -1){
			Ti.API.info('gameModule: gameOver');
			_setGameOver(true);
		}
	}
};

exports.correctAnswer = function(pointsGained, isAnswerFast){
	sessionQuestionIndex++;
	
	//fetch
	var currentPlayer = gamePlayers[currentPlayerIndex];
	
	var saveAnswerAsPlayer = currentPlayer.player_id;
	if(gameType == BUZZ_GAME_GROUP){
		saveAnswerAsPlayer = DUMMY_GROUP_PLAYER_ID;
	}
	
	//save question being answered
	var currentQuestion = currentPlayer.questions.data[currentPlayer.questionIndex].id;
	saveAnswer(currentQuestion, saveAnswerAsPlayer, 1, isAnswerFast);
	Ti.API.info('gameModule: correctAnswer() called for question '+currentQuestion+' isAnswerFast= '+isAnswerFast+' and player '+currentPlayer.player_id+' gained '+pointsGained+' points');
	
	//update
	currentPlayer.score += pointsGained;
	currentPlayer.consecutiveCorrect++;
	currentPlayer.questionIndex++;
	currentPlayer.totalCorrectAnswers++;
	
	//persist
	gamePlayers[currentPlayerIndex] = currentPlayer;
	
	//Workaround for SOLO - mark the current player as the winner - it cant be anyone else anyway
	if(gameType == BUZZ_GAME_SOLO){
		gameWinner = currentPlayer;
	}
}

exports.incrementLives = function(){
	//fetch
	var currentPlayer = gamePlayers[currentPlayerIndex];
	//update
	currentPlayer.lives++;
	currentPlayer.consecutiveCorrect = 0;
	//persist
	gamePlayers[currentPlayerIndex] = currentPlayer;
}

exports.getCurrentPlayer = function(){
	//Ti.API.info('gameModule: getCurrentPlayer() called - index is '+currentPlayerIndex+' gamePlayers='+gamePlayers);
	
	return gamePlayers[currentPlayerIndex];
}

exports.saveTmpPlayers = function(){
	Ti.API.info('gameModule: saveTmpPlayers() called - found '+tmpGamePlayerNames.length+' tmpPlayers. Category is '+gameSelectedCategoryId);
	
	var playerId = 0;
	var questionSet = null;
	
	//For group games, we load questions first
	/*if(gameSession.getGameType() == BUZZ_GAME_GROUP){
		if(gameSelectedCategoryId == CAT_TOTALBUZZ){
			questionSet = getGroupRandomGameQuestionsInitial(DUMMY_GROUP_PLAYER_ID, tmpGamePlayerNames.length);
		} else {
			questionSet = getGroupGameQuestionsInitial(gameSelectedCategoryId, DUMMY_GROUP_PLAYER_ID, tmpGamePlayerNames.length);
		}
		
		_distributeGroupQuestions(questionSet.data, true);
	}*/
	
	for(var i=0; i<tmpGamePlayerNames.length; i++){
		if(tmpGamePlayerNames[i].player_id != null){
			Ti.API.info('gameModule: saveTmpPlayers() NO need to save player '+tmpGamePlayerNames[i].name);
			playerId = tmpGamePlayerNames[i].player_id;
		} else {
			Ti.API.info('gameModule: saveTmpPlayers() MUST save player '+tmpGamePlayerNames[i].name);
			playerId = _saveGroupPlayer(tmpGamePlayerNames[i]);
			Ti.API.info('gameModule: saveTmpPlayers() saved player '+tmpGamePlayerNames[i].name+' and got id '+playerId);
		}
		
		Ti.API.info('gameModule: saveTmpPlayers() found avatar file '+tmpGamePlayerNames[i].avatarFile+' with index '+tmpGamePlayerNames[i].avatarIndex);
		
		//Init game values for all players
		tmpGamePlayerNames[i].player_id = playerId;
		tmpGamePlayerNames[i].score = 0;
		tmpGamePlayerNames[i].consecutiveCorrect = 0;
		tmpGamePlayerNames[i].questionIndex = 0;
		tmpGamePlayerNames[i].totalCorrectAnswers = 0;
		tmpGamePlayerNames[i].lives = 3;
		
		//Load questions for SOLO
		//if(gameSession.getGameType() == BUZZ_GAME_SOLO){
		Ti.API.warn('LOADING QUESTIONS for category '+gameSelectedCategoryId);
		//if(gameSelectedCategoryId == CAT_TOTALBUZZ){
			//tmpGamePlayerNames[i].questions = getRandomGameQuestions(playerId);
		//} else {
		tmpGamePlayerNames[i].questions = getGameQuestions(gameSelectedCategoryId, playerId);
		//}
		//} 
	
		gamePlayers.push(tmpGamePlayerNames[i]);
	}
	Ti.API.info('gameModule: saveTmpPlayers() returns '+tmpGamePlayerNames.length+ ' players');
};

/*Sets the tmp player names*/
exports.setTmpPlayerNames = function(namesArray){
	Ti.API.info('gameModule: setTmpPlayerNames() called with '+namesArray.length+' elements');
	tmpGamePlayerNames = namesArray;
};

/*Returns the tmp player names*/
exports.getTmpPlayerNames = function(){
	Ti.API.info('gameModule: getTmpPlayerNames() returns '+tmpGamePlayerNames.length+' elements');
	return tmpGamePlayerNames;
}

/*Returns the game type for this instance*/
exports.getGameType = function(){
	return gameType;
};

/*Sets the game type for this instance*/
exports.setGameType = function(t){
	gameType = t;
};

/*Returns the game group type for this instance*/
exports.getGameGroupType = function(){
	return gameGroupType;
}

/*Sets the game group type for this instance*/
exports.setGameGroupType = function(t){
	gameGroupType = t;
}

/*Returns the game group turn type for this instance*/
exports.getGroupTurnType = function(){
	return gameGroupTurnType;
}

/*Sets the game group type for this instance*/
exports.setGroupTurnType = function(t){
	gameGroupTurnType = t;
}
