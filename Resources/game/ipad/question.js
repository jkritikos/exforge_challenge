//JSS properties
var answerFontSize = 28;
var answerLeft = 120;
var numberOfBlinks = 5;

//Timer properties
var SHOW_SCORE_TIMER = 1200;

//Game UI properties
var totalQuestionsPlayed = 0;
var totalCorrectAnswers = 0;
var questions = null;
//Array pointer
var currentQIndex = 0;
//Pointer for label
var currentQuestionLabel = 0;
var currentQuestionId = '';
var currentCorrectAnswer = '';
var currentCorrectAnswerImage = '';
var currentCorrectAnswerImagePath = '';
var currentTimeBarFrame;
var QUESTION_FADE_IN_TIMER = 500;

//Game mechanics
var currentCategoryId = '';
var questionReportQuestionId = null;
var CONSECUTIVE_ANSWERS_GAIN_LIFE = 10;
var MAX_LIVES_ALLOWED = 5;
var gameOver = false;
var gameOverNoMoreQuestions = false;
var currentQuestionPointsValue = 100;

//UI components
var bg = null;
var resultCorrect = null;
var resultWrong = null;
var labelQuestion = null;
var currentQuestionStatsPlaceholder = null;
var currentQuestionIndexLabel = null;
var currentQuestionPointsLabel = null;

var currentPlayerNameLabel = null;
var currentPlayerNameIcon = null;

var scoreIconImage = null;
var scoreValueLabel = null;
var heartIcon1 = null;
var heartIcon2 = null;
var heartIcon3 = null;
var heartIcon4 = null;
var heartIcon5 = null;
var selectedCategoryBanner = null;
var timeBarFull = null;
var timeBarEmpty = null;
var answerA = null;
var answerB = null;
var answerC = null;
var answerD = null;
var labelAnswerA = null;
var labelAnswerB = null;
var labelAnswerC = null;
var labelAnswerD = null;
var alertViewGameOver = null;
var gameOverCategoryBanner = null;
var gameOverImage = null;
var gameOverQuestionStats = null;
var gameOverScoreLabelValue = null;
var gameOverArrowImage = null;
var gameOverScoresLabel = null;
var gameOverPlayImage = null;
var gameOverPlayLabel = null;
var gameOverGroupRankingsImage = null;
var gameOverTopScoreLabel = null;
var gameOverTopScoreLabelUnderscore = null;
//TMP BAR
var barImages = [];
var timeBarFull2 = null;

var ANSWERS_ENABLED = true;

function buildQuestionView(defaultQuestionBanner){
	Ti.API.warn('buildQuestionView() called');
	var IPAD_OFFSET = 50;
	
	var shouldCreateView = selectedCategoryBanner == null;
	if(shouldCreateView){
		
		//Selected category banner
		selectedCategoryBanner = Titanium.UI.createImageView({
			image:defaultQuestionBanner,
			top:0
		});
		
		viewQuestion.add(selectedCategoryBanner);
		
		//Question bg
		bg = Titanium.UI.createImageView({
			image:IPHONE5 ? IMAGE_PATH+'question/bg-568h@2x.png' : IMAGE_PATH+'question/bg.png' ,
			top:IPHONE5 ? 115 : 185,
			left:0,
			right:0
		});
		
		viewQuestion.add(bg);
		
		//Correct result
		resultCorrect = Titanium.UI.createImageView({
			image:IMAGE_PATH+'question/answer_correct.png',
			zIndex:11,
			visible:false
		});
		
		bg.add(resultCorrect);
	
		//Wrong result
		resultWrong = Titanium.UI.createImageView({
			image:IMAGE_PATH+'question/answer_wrong.png',
			zIndex:11,
			visible:false
		});
		
		bg.add(resultWrong);
		
		//The question
		labelQuestion = Titanium.UI.createLabel({
			opacity:0,
			color:'white',
			shadowColor:'#000000',
			textAlign:'center',
		    shadowOffset:{x:1,y:1},
		    zIndex:10,
		    left:30,
		    right:30,
			font:{fontSize:32, fontWeight:'bold', fontFamily:'Myriad Pro'}
		});
		
		bg.add(labelQuestion);
		
		//Placeholder view for the current question number & points labels
		currentQuestionStatsPlaceholder = Ti.UI.createView({
			width:495,
			height:180
		});
		
		//The question number label (ERWTHSH 1)
		currentQuestionIndexLabel = Ti.UI.createLabel({
			visible:true,
			text:'',
			color:'gray',
			textAlign:'center',
			opacity:0.8,
			top:20,
			width:350,
			font:{fontSize:48, fontWeight:'regular', fontFamily:'Myriad Pro'}
		});
	
		//The question points label (PONTOI 100)
		currentQuestionPointsLabel = Ti.UI.createLabel({
			visible:true,
			text:'',
			color:'gray',
			textAlign:'center',
			opacity:0.8,
			top:75,
			font:{fontSize:37, fontWeight:'regular', fontFamily:'Myriad Pro'}
		});
	
		currentQuestionStatsPlaceholder.add(currentQuestionIndexLabel);
		currentQuestionStatsPlaceholder.add(currentQuestionPointsLabel);
		bg.add(currentQuestionStatsPlaceholder);
		
		//Score icon
		scoreIconImage = Titanium.UI.createImageView({
			image:IMAGE_PATH+'question/score.png',
			top: IPHONE5 ? 60 : 100,
			left:10
		});
		
		viewQuestion.add(scoreIconImage);
		
		//Score value label
		scoreValueLabel = Titanium.UI.createLabel({
			text:'0',
			color:'white',
			left:73,
			textAlign:'left',
			top:IPHONE5 ? 58 : 100,
			shadowColor:'#000000',
		    shadowOffset:{x:1,y:1},
			font:{fontSize:50, fontWeight:'bold', fontFamily:'Myriad Pro'}
		});
		
		viewQuestion.add(scoreValueLabel);
		
		//For group games we also show the current player
		if(gameSession.getGameType() == BUZZ_GAME_GROUP){
			
			currentPlayerNameIcon = Ti.UI.createImageView({
				image:IMAGE_PATH+'player_selection/avatars_q/'+gameSession.getCurrentPlayer().avatarFile,
				top:12,
				left:10,
				zIndex:52
			});
			
			viewQuestion.add(currentPlayerNameIcon);
			
			//DO NOT DELETE
			/*
			currentPlayerNameLabel = Titanium.UI.createLabel({
				text:gameSession.getCurrentPlayer().name,
				color:'#fee600',
				left:87,
				textAlign:'left',
				top:30,
				width:145,
				height:40,
				minimumFontSize:22,
				font:{fontSize:30, fontWeight:'regular', fontFamily:'Myriad Pro'}
			});*/
			
			//viewQuestion.add(currentPlayerNameLabel);
		}
		
		//Heart icon 1
		heartIcon1 = Ti.UI.createImageView({
			image:IMAGE_PATH+'question/heart.png',
			top:IPHONE5 ? 59 : 99,
			right:10
		});
		
		//Heart icon 2
		heartIcon2 = Ti.UI.createImageView({
			image:IMAGE_PATH+'question/heart.png',
			top:IPHONE5 ? 59 : 99,
			right:70
		});
		
		//Heart icon 3
		heartIcon3 = Ti.UI.createImageView({
			image:IMAGE_PATH+'question/heart.png',
			top:IPHONE5 ? 59 : 99,
			right:130
		});
		
		//Heart icon 4
		heartIcon4 = Ti.UI.createImageView({
			image:IMAGE_PATH+'question/heart.png',
			top:IPHONE5 ? 59 : 99,
			right:190,
			visible:false
		});
	
		//Heart icon 5
		heartIcon5 = Ti.UI.createImageView({
			image:IMAGE_PATH+'question/heart.png',
			top:IPHONE5 ? 59 : 99,
			right:250,
			visible:false
		});
	
		viewQuestion.add(heartIcon1);
		viewQuestion.add(heartIcon2);
		viewQuestion.add(heartIcon3);
		viewQuestion.add(heartIcon4);
		viewQuestion.add(heartIcon5);
		
		//Time bar
		timeBarFull = Titanium.UI.createImageView({
			image:IMAGE_PATH+'question/time_full.png',
			top:IPHONE5 ? 101 : 181,
			left:0,
			zIndex:20
		});
		
		viewQuestion.add(timeBarFull);
	
		//Time bar EMPTY
		timeBarEmpty = Titanium.UI.createImageView({
			image:IMAGE_PATH+'question/time_empty.png',
			top:IPHONE5 ? 101 : 181,
			left:0,
			zIndex:1
		});
		
		viewQuestion.add(timeBarEmpty);
		
		//////////////////////////////////////Answers
		//Answer A
		answerA = Titanium.UI.createButton({
			backgroundImage:IMAGE_PATH+'question/r/a.png',
			top: IPHONE5 ? 330 : 583,
			width:739,
			height:95
		});
		
		//Answer B
		answerB = Titanium.UI.createButton({
			backgroundImage:IMAGE_PATH+'question/r/b.png',
			top:IPHONE5 ? 390 : 693,
			width:739,
			height:95
		});
		
		//Answer C
		answerC = Titanium.UI.createButton({
			backgroundImage:IMAGE_PATH+'question/r/c.png',
			top:IPHONE5 ? 450 : 803,
			width:739,
			height:95
		});
		
		//Answer D
		answerD = Titanium.UI.createButton({
			backgroundImage:IMAGE_PATH+'question/r/d.png',
			top:IPHONE5 ? 510 : 913,
			width:739,
			height:95
		});
		
		//Answer A label
		labelAnswerA = Titanium.UI.createLabel({
			opacity:0,
			color:'white',
			left:answerLeft,
			top:35,
			textAlign:'left',
			font:{fontSize:answerFontSize, fontWeight:'bold', fontFamily:'Myriad Pro'}
		});
		
		//Answer B label
		labelAnswerB = Titanium.UI.createLabel({
			opacity:0,
			color:'white',
			left:answerLeft,
			top:35,
			textAlign:'left',
			font:{fontSize:answerFontSize, fontWeight:'bold', fontFamily:'Myriad Pro'}
		});
		
		//Answer C label
		labelAnswerC = Titanium.UI.createLabel({
			opacity:0,
			color:'white',
			left:answerLeft,
			top:35,
			textAlign:'left',
			font:{fontSize:answerFontSize, fontWeight:'bold', fontFamily:'Myriad Pro'}
		});
		
		//Answer D label
		labelAnswerD = Titanium.UI.createLabel({
			opacity:0,
			color:'white',
			left:answerLeft,
			top:35,
			textAlign:'left',
			font:{fontSize:answerFontSize, fontWeight:'bold', fontFamily:'Myriad Pro'}
		});
		
		answerA.add(labelAnswerA);
		answerB.add(labelAnswerB);
		answerC.add(labelAnswerC);
		answerD.add(labelAnswerD);
		
		viewQuestion.add(answerA);
		viewQuestion.add(answerB);
		viewQuestion.add(answerC);
		viewQuestion.add(answerD);
		
		//Answer A event listener
		answerA.addEventListener('click', handleClickAnswerA);
		//Answer B event listener
		answerB.addEventListener('click', handleClickAnswerB);
		//Answer C event listener
		answerC.addEventListener('click', handleClickAnswerC);
		//Answer D event listener
		answerD.addEventListener('click', handleClickAnswerD);
		//////////////////////////////////////End answers
		
		//////////////////////////////////////Game over
		var GROUP_PLAY_GAMEOVER_HEIGHT_OFFSET = 50;
		
		//Alert view for game over
		alertViewGameOver = Titanium.UI.createView({
			backgroundImage:IMAGE_PATH+'background.jpg',
			top:0,
			bottom:0,
			zIndex:65,
			visible:false
		});
	
		//Game over category banner
		gameOverCategoryBanner = Titanium.UI.createImageView({
			image:IMAGE_PATH+'question/category_epistimi.png',
			top:0
		});
		
		alertViewGameOver.add(gameOverCategoryBanner);
	
		//Game over image for the game over view
		gameOverImage = Ti.UI.createImageView({
			image:IMAGE_PATH+'question/gameover.png'
		});
		
		alertViewGameOver.add(gameOverImage);
		
		//For group play we also show a top score label
		if(gameSession.getGameType() == BUZZ_GAME_GROUP){
			gameOverTopScoreLabel = Titanium.UI.createLabel({
				text:'TOPSCORE',
				color:'white',
				top:90,
				height:80,
				font:{fontSize:50, fontWeight:'regular', fontFamily:'321impact'},
				zIndex:10
			});
			
			alertViewGameOver.add(gameOverTopScoreLabel);
			
			gameOverTopScoreLabelUnderscore = Ti.UI.createView({
				backgroundColor:'white',
				height:2,
				top:159,
				width:217
			});
			
			alertViewGameOver.add(gameOverTopScoreLabelUnderscore);
		}
		
		//Game over question stats (12/23 erwtiseis)
		gameOverQuestionStats = Titanium.UI.createLabel({
			text:'',
			color:'white',
			shadowColor:'#000000',
			textAlign:'center',
		    shadowOffset:{x:1,y:1},
		    zIndex:10,
		    top:gameSession.getGameType() == BUZZ_GAME_GROUP ? (243+GROUP_PLAY_GAMEOVER_HEIGHT_OFFSET) : 243,
		    left:7,
		    right:7,
			font:{fontSize:34, fontWeight:'bold', fontFamily:'Myriad Pro'}
		});
		
		alertViewGameOver.add(gameOverQuestionStats);
	
		//Gameover view label points value
		gameOverScoreLabelValue = Titanium.UI.createLabel({
			text:'0',
			color:'#fee902',
			top:gameSession.getGameType() == BUZZ_GAME_GROUP ? (138+GROUP_PLAY_GAMEOVER_HEIGHT_OFFSET) : 138,
			height:130,
			font:{fontSize:90, fontWeight:'regular', fontFamily:'321impact'},
			zIndex:10
		});
		
		alertViewGameOver.add(gameOverScoreLabelValue);
		
		//Gameover bottom buttons
		if(gameSession.getGameType() == BUZZ_GAME_SOLO){
			//Gameover arrow image
			gameOverArrowImage = Ti.UI.createButton({
				backgroundImage:IMAGE_PATH+'question/gameoverarrow.png',
				bottom:120,
				right:100,
				width:135,
				height:135
			});
			
			alertViewGameOver.add(gameOverArrowImage);
			
			//Gameover playAgain label
			gameOverScoresLabel = Titanium.UI.createLabel({
				text:'HIGH SCORES',
				color:'white',
				shadowColor:'#000000',
				textAlign:'center',
			    shadowOffset:{x:1,y:1},
			    bottom:65,
			    right:90,
				font:{fontSize:28, fontWeight:'bold', fontFamily:'Myriad Pro'}
			});
		
			alertViewGameOver.add(gameOverScoresLabel);
		
			//Gameover playAgain image
			gameOverPlayImage = Ti.UI.createButton({
				backgroundImage:IMAGE_PATH+'question/gameover_play.png',
				bottom:120,
				left:100,
				width:135,
				height:135
			});
		
			//Play again event listener
			alertViewGameOver.add(gameOverPlayImage);
			gameOverPlayImage.addEventListener('click', handleGameOverPlayAgainClick);
			//Event listener for game over arrow image
			gameOverArrowImage.addEventListener('click', handleGameOverShowScoresClick);
		
			//Gameover playAgain label
			gameOverPlayLabel = Titanium.UI.createLabel({
				text:'ΠΑΙΞΕ ΞΑΝΑ',
				color:'white',
				shadowColor:'#000000',
				textAlign:'center',
			    shadowOffset:{x:1,y:1},
			    bottom:65,
			    left:92,
				font:{fontSize:28, fontWeight:'bold', fontFamily:'Myriad Pro'}
			});
			
			alertViewGameOver.add(gameOverPlayLabel);
		} else if(gameSession.getGameType() == BUZZ_GAME_GROUP){
			//Gameover group rankings image
			gameOverGroupRankingsImage = Ti.UI.createButton({
				backgroundImage:IMAGE_PATH+'question/rankings.png',
				bottom:97,
				width:536,
				height:177
			});
			
			alertViewGameOver.add(gameOverGroupRankingsImage);
			
			//Event listener for game over group rankings
			gameOverGroupRankingsImage.addEventListener('click', handleGameOverShowScoresClick);
		}
		
		
		win.add(alertViewGameOver);
		//////////////////////////////////////End game over
		barImages.push(IMAGE_PATH+'timer/time_full.png');
		
		for(var tt=195; tt>=0; tt--){
			var targetSlice = IMAGE_PATH+'timer/TIME-LINE'+tt+'.png';
			barImages.push(targetSlice);
		}
		
		barImages.push(IMAGE_PATH+'question/time_empty.png');
		
		//duration is 16seconds / number of files (195) 
		timeBarFull2 = Titanium.UI.createImageView({
			images:barImages,
			top:IPHONE5 ? 101 : 181,
			duration:82,
			repeatCount:1,
			left:0,
			zIndex:3
		});
		
		viewQuestion.add(timeBarFull2);
		
		//Timer frame change
		timeBarFull2.addEventListener('change', handleTimebarChange);
		win.add(viewQuestion);
		
		Ti.API.warn('buildQuestionView() ends');
	} else {
		Ti.API.warn('NOT building Question view - already in progress');
	}
}

function destroyQuestionView(){
	Ti.API.warn('destroyQuestionView() called');
	
	if(currentQuestionStatsPlaceholder != null){
		if(currentQuestionStatsPlaceholder != null){
			currentQuestionStatsPlaceholder.remove(currentQuestionIndexLabel);
			currentQuestionStatsPlaceholder.remove(currentQuestionPointsLabel);
		}
	
		//The question number label
		currentQuestionIndexLabel = null;
		//The question points label
		currentQuestionPointsLabel = null;
		
		if(bg != null){
			bg.remove(resultCorrect);
			bg.remove(resultWrong);
			bg.remove(labelQuestion);
			bg.remove(currentQuestionStatsPlaceholder);
			
			viewQuestion.remove(bg);
			
			//Question bg
			bg = null;
		}
	
		//Placeholder view for the current question number & points labels
		currentQuestionStatsPlaceholder = null;
		//Correct result
		resultCorrect = null;
		//Wrong result
		resultWrong = null;
		//The question
		labelQuestion = null;
		
		viewQuestion.remove(scoreIconImage);
		viewQuestion.remove(scoreValueLabel);
	
		//Score icon
		scoreIconImage = null;
		//Score value label
		scoreValueLabel = null;
		
		//Remove group-specific UI components
		if(gameSession.getGameType() == BUZZ_GAME_GROUP){
			//viewQuestion.remove(currentPlayerNameLabel);
			viewQuestion.remove(currentPlayerNameIcon);
			
			//currentPlayerNameLabel = null;
			currentPlayerNameIcon = null;
		}
		
		viewQuestion.remove(heartIcon1);
		viewQuestion.remove(heartIcon2);
		viewQuestion.remove(heartIcon3);
		viewQuestion.remove(heartIcon4);
		viewQuestion.remove(heartIcon5);
	
		//Heart icon 1
		heartIcon1 = null;
		//Heart icon 2
		heartIcon2 = null;
		//Heart icon 3
		heartIcon3 = null;
		//Heart icon 4
		heartIcon4 = null;
		//Heart icon 5
		heartIcon5 = null;
	
		viewQuestion.remove(selectedCategoryBanner);
		viewQuestion.remove(timeBarFull);
		viewQuestion.remove(timeBarEmpty);
		
		//Selected category banner
		selectedCategoryBanner = null;
		//Time bar
		timeBarFull = null;
		//Time bar EMPTY
		timeBarEmpty = null;
	
		//////////////////////////////////////Answers
		//Answer A event listener
		answerA.removeEventListener('click', handleClickAnswerA);
		//Answer B event listener
		answerB.removeEventListener('click', handleClickAnswerB);
		//Answer C event listener
		answerC.removeEventListener('click', handleClickAnswerC);
		//Answer D event listener
		answerD.removeEventListener('click', handleClickAnswerD);
		
		answerA.remove(labelAnswerA);
		answerB.remove(labelAnswerB);
		answerC.remove(labelAnswerC);
		answerD.remove(labelAnswerD);
		
		//Answer A label
		labelAnswerA = null;
		//Answer B label
		labelAnswerB = null;
		//Answer C label
		labelAnswerC = null;
		//Answer D label
		labelAnswerD = null;
		
		viewQuestion.remove(answerA);
		viewQuestion.remove(answerB);
		viewQuestion.remove(answerC);
		viewQuestion.remove(answerD);
	
		//Answer A
		answerA = null;
		//Answer B
		answerB = null;
		//Answer C
		answerC = null;
		//Answer D
		answerD = null;
		//////////////////////////////////////End answers
		
		//////////////////////////////////////Game over
		if(gameSession.getGameType() == BUZZ_GAME_SOLO){
			gameOverPlayImage.removeEventListener('click', handleGameOverPlayAgainClick);
			//Event listener for game over arrow image
			gameOverArrowImage.removeEventListener('click', handleGameOverShowScoresClick);
			
			alertViewGameOver.remove(gameOverArrowImage);
			alertViewGameOver.remove(gameOverPlayImage);
			alertViewGameOver.remove(gameOverScoresLabel);
			alertViewGameOver.remove(gameOverPlayLabel);
			
			//Gameover arrow image
			gameOverArrowImage = null;
			//Gameover playAgain label
			gameOverScoresLabel = null;
			//Gameover playAgain image
			gameOverPlayImage = null;
			//Gameover playAgain label
			gameOverPlayLabel = null;
			
		} else if(gameSession.getGameType() == BUZZ_GAME_GROUP){
			gameOverGroupRankingsImage.removeEventListener('click', handleGameOverShowScoresClick);
			
			alertViewGameOver.remove(gameOverTopScoreLabel);
			alertViewGameOver.remove(gameOverTopScoreLabelUnderscore);
			alertViewGameOver.remove(gameOverGroupRankingsImage);
			
			gameOverGroupRankingsImage = null;
			gameOverTopScoreLabel = null;
			gameOverTopScoreLabelUnderscore = null;
		}
		
		alertViewGameOver.remove(gameOverCategoryBanner);
		alertViewGameOver.remove(gameOverImage);
		alertViewGameOver.remove(gameOverQuestionStats);
		alertViewGameOver.remove(gameOverScoreLabelValue);
			
		//Game over category banner
		gameOverCategoryBanner = null;
		//Game over image for the game over view
		gameOverImage = null;
		//Game over question stats
		gameOverQuestionStats = null;
		//Gameover view label points value
		gameOverScoreLabelValue = null;
		
		win.remove(alertViewGameOver);
		//Alert view for game over
		alertViewGameOver = null;	
		//////////////////////////////////////End game over
	
		//Timer frame change
		timeBarFull2.removeEventListener('change', handleTimebarChange);
		
		viewQuestion.remove(timeBarFull2);
		barImages = [];
		timeBarFull2 = null;
		
		win.remove(viewQuestion);
	}
	
	Ti.API.warn('destroyQuestionView() ends');
}

/*Resets game mechanics*/
function newGame(category){
	//UI changes first to cope with slower devices
	heartIcon1.show();
	heartIcon2.show();
	heartIcon3.show();
	
	var currentPlayerObj = getCurrentPlayer();
	var playerId = currentPlayerObj.id;
	
	currentQIndex = 0;
	currentQuestionLabel = 0;
	scoreValueLabel.text = '0';
	totalQuestionsPlayed = 0;
	totalCorrectAnswers = 0;
	gameOver = false;
	gameOverNoMoreQuestions = false;
}

/*Determines whether the current answer was fast enough*/
function isAnswerFast(){
	var response = false;
	
	if(currentTimeBarFrame < 25){
		response = true;
	}
	
	return response;
}

/*Displays the next question image*/
function showNextQuestionImage(fromResumeEvent){
	Ti.API.warn('showNextQuestionImage() called with value '+fromResumeEvent);
	
	Ti.API.warn('currentQIndex='+currentQIndex+' and questions.data.length='+questions.data.length);
	
	var continueGame = true;
	
	//Run out of questions!
	if(currentQIndex == (questions.data.length -1)){
		Ti.API.warn('RUN OUT OF QUESTIONS');
		
		//For SOLO games, we show the game over - run out of questions view
		if(gameSession.getGameType() == BUZZ_GAME_SOLO){
			continueGame = false;
			
			var currentPlayerObjectForQ = getCurrentPlayer();
			var currentPlayerIdForQ = currentPlayerObjectForQ.id;
			
			//Show gameover
			gameOverNoMoreQuestions = true;
			setTimeout(gameOverEvent, 1);
			
		} 
		//For GROUP games, we fetch hard questions
		else if(gameSession.getGameType() == BUZZ_GAME_GROUP){
			
			var extraQuestions = null;
			
			if(gameSession.getSelectedGameCategoryId() == CAT_TOTALBUZZ){
				extraQuestions = getRandomGameQuestionsHard(DUMMY_GROUP_PLAYER_ID);
			} else {
				extraQuestions = getGameQuestionsHard(gameSession.getSelectedGameCategoryId(), DUMMY_GROUP_PLAYER_ID);
			}
			
			gameSession.addMoreQuestionsToPlayers(extraQuestions.data);
		}
		
	} 
	
	if(continueGame) {
		//Let the game module decide if we're switching players. If someone lost then we're already
		//pointing to the next player
		if(gameSession.getLastLostPlayer() == null){
			Ti.API.warn('question.js calls nextPlayer()');
			gameSession.nextPlayer();
		}
		
		mtbImport("question_next.js");
		buildQuestionNextView();
		viewQuestionNext.opacity = 1;
		
		//Update & display next question view
		updateQuestionNextView(fromResumeEvent);
		viewQuestionNext.show();
		
		//no need to make the app KILL-able
		setGameInProgress(false);	
	}
}

/*Performs the animation that increments the score counter*/
function incrementScoreCounter(pointsGained){
	if(SOUNDS_MODE){
		scoreSound.play();	
	}
	
	gameSession.correctAnswer(pointsGained, isAnswerFast());
	
	var animationSoundDuration = 800;
	var animationInterval = Math.round(animationSoundDuration / pointsGained);
	
	var defaultIncrements = 1;
	if(pointsGained > 100 && pointsGained < 201){
		defaultIncrements = 2;
		animationInterval = animationInterval * 2;
	} else if(pointsGained >= 201){
		defaultIncrements = 2;
		animationInterval = animationInterval * 2;
	}
	
	var activeScoreAnimationInterval = setInterval(function(){
		var v = parseInt(scoreValueLabel.text);
		
		if(v >= gameSession.getCurrentPlayer().score) {
			clearInterval(activeScoreAnimationInterval);
			
			//Play sound first
			setTimeout(function(){
				if(SOUNDS_MODE){
					nextQuestionSound.play();	
				}
				
			}, 350);
			
			//Show next question image after a delay
			setTimeout(function(){
				//hide question and answers
				labelQuestion.text = '';
				labelAnswerA.text = '';
				labelAnswerB.text = '';
				labelAnswerC.text = '';
				labelAnswerD.text = '';
				//reset answer views to default
				answerA.image = IMAGE_PATH+'question/r/a.png';
				answerB.image = IMAGE_PATH+'question/r/b.png';
				answerC.image = IMAGE_PATH+'question/r/c.png';
				answerD.image = IMAGE_PATH+'question/r/d.png';
				answerA.opacity = 1;
				answerB.opacity = 1;
				answerC.opacity = 1;
				answerD.opacity = 1;
			
				//hide right/wrong icon
				resultCorrect.hide();
				resultWrong.hide();
				
				showNextQuestionImage(false);
			}, 550);
			
		} else {
			v += defaultIncrements;
			scoreValueLabel.text = v;
			gameOverScoreLabelValue.text = v;
		}
		
	},animationInterval);	
}

//Earns life if enough consecutive
function correctAnswer(){
	if(SOUNDS_MODE){
		answerCorrect.play();	
	}
	
	//Do score animation after a delay
	setTimeout(function(){
		calculateScore();
		
		if(gameSession.getCurrentPlayer().consecutiveCorrect == CONSECUTIVE_ANSWERS_GAIN_LIFE){
			
			//Only earn a life if less than the max allowed
			var currentLives = gameSession.getCurrentPlayer().lives;
			if(currentLives != null && currentLives < MAX_LIVES_ALLOWED){
				earnLife();
			}
		}
	}, 900);
}

//Looses a life
function wrongAnswer(fromResumeEvent){
	Ti.API.info('Question.js wrongAnswer() called. gameSession.isGameOver()='+gameSession.isGameOver());
	if(SOUNDS_MODE){
		answerWrong.play();	
	}
	
	looseLife();
	gameSession.wrongAnswer();
	
	if(!gameSession.isGameOver()){
		//Show next question image after a delay
		setTimeout(function(){
			if(SOUNDS_MODE){
				nextQuestionSound.play();	
			}
			
		},950);
		
		setTimeout(function(){
			//hide question and answers
			labelQuestion.text = '';
			labelAnswerA.text = '';
			labelAnswerB.text = '';
			labelAnswerC.text = '';
			labelAnswerD.text = '';
			
			answerA.opacity = 1;
			answerB.opacity = 1;
			answerC.opacity = 1;
			answerD.opacity = 1;
			
			//reset answer views to default
			answerA.image = IMAGE_PATH+'question/r/a.png';
			answerB.image = IMAGE_PATH+'question/r/b.png';
			answerC.image = IMAGE_PATH+'question/r/c.png';
			answerD.image = IMAGE_PATH+'question/r/d.png';
			
			//hide right/wrong icon
			resultCorrect.hide();
			resultWrong.hide();
		
			showNextQuestionImage(fromResumeEvent);
		}, SHOW_SCORE_TIMER);
	} else {
		//Show gameover
		setTimeout(gameOverEvent, SHOW_SCORE_TIMER);
	}	
}

//Adds the score earned by the latest answer to the total score
function calculateScore(){
	var totalFrames = barImages.length;
	var framesLeft = totalFrames - currentTimeBarFrame;
	var pointsWorth = Math.round((framesLeft * currentQuestionPointsValue) / totalFrames);
	
	//Trigger the animation for the score counter
	incrementScoreCounter(pointsWorth);
}

//Stops the timebar animation
function stopTime(){
	timeBarFull2.stop();
}

//Starts the timebar animation
function startTime(){
	//animate timebar
	timeBarFull2.start();
	Ti.API.info('TIMER START');
}

//Add a life, update UI
function earnLife(){
	var currentLives = gameSession.getCurrentPlayer().lives;
	
	Ti.API.warn('GAINED life. Have '+currentLives);
	
	if(currentLives == 0){
		heartIcon1.show();
	} else if(currentLives == 1){
		heartIcon2.show();
	} else if(currentLives == 2){
		heartIcon3.show();
	} else if(currentLives == 3){
		heartIcon4.show();
	} else if(currentLives == 4){
		heartIcon5.show();
	} 
	
	gameSession.incrementLives();
	
	//Play sound
	if(SOUNDS_MODE){
		audioBonusLife.play();	
	}
}

//Subtract a life, update UI
function looseLife(){
	var currentLives = gameSession.getCurrentPlayer().lives;
	
	Ti.API.warn('LOST life. Have '+currentLives);
	if(currentLives > 0){
		//update UI
		var targetHeartImage = '';

		if(currentLives == 1){
			targetHeartImage = heartIcon1;
		} else if(currentLives == 2){
			targetHeartImage = heartIcon2;
		} else if(currentLives == 3){
			targetHeartImage = heartIcon3;
		} else if(currentLives == 4){
			targetHeartImage = heartIcon4;
		} else if(currentLives == 5){
			targetHeartImage = heartIcon5;
		} 
		
		targetHeartImage.hide();
	} else {
		gameOver = true;
	}
}

//Updates the score and the heart icons, according to the specified number of lives
function updateMultiplayerUI(){
	//Current player
	//currentPlayerNameLabel.text = gameSession.getCurrentPlayer().name;
	currentPlayerNameIcon.image = IMAGE_PATH+'player_selection/avatars_q/'+gameSession.getCurrentPlayer().avatarFile;
	
	//Score
	scoreValueLabel.text = gameSession.getCurrentPlayer().score;
	
	//Lives
	var numberOfLives = gameSession.getCurrentPlayer().lives;
	if(numberOfLives == 0){
		heartIcon1.hide();
		heartIcon2.hide();
		heartIcon3.hide();
		heartIcon4.hide();
		heartIcon5.hide();
	} else if(numberOfLives == 1){
		heartIcon1.show();
		heartIcon2.hide();
		heartIcon3.hide();
		heartIcon4.hide();
		heartIcon5.hide();	
	} else if(numberOfLives == 2){
		heartIcon1.show();
		heartIcon2.show();
		heartIcon3.hide();
		heartIcon4.hide();
		heartIcon5.hide();	
	} else if(numberOfLives == 3){
		heartIcon1.show();
		heartIcon2.show();
		heartIcon3.show();
		heartIcon4.hide();
		heartIcon5.hide();	
	} else if(numberOfLives == 4){
		heartIcon1.show();
		heartIcon2.show();
		heartIcon3.show();
		heartIcon4.show();
		heartIcon5.hide();	
	} else if(numberOfLives == 5){
		heartIcon1.show();
		heartIcon2.show();
		heartIcon3.show();
		heartIcon4.show();
		heartIcon5.show();	
	}
}

//Displays the next question
function nextQuestion(gameStart){
	//Disable answers
	enableAnswersUI(false);
	
	currentQIndex = gameSession.getCurrentPlayer().questionIndex;
	currentQuestionLabel = currentQIndex + 1;
	currentQuestionIndexLabel.text = 'ΕΡΩΤΗΣΗ ' + currentQuestionLabel;
	
	//retrieve questions from game module
	questions = gameSession.getCurrentPlayer().questions;
	
	var currentCategoryFromDB = questions.data[currentQIndex].category_id;
	
	gameSession.setWikipediaURL(questions.data[currentQIndex].wikipedia);
	questionReportQuestionId = questions.data[currentQIndex].question_id;
	currentQuestionPointsLabel.text = questions.data[currentQIndex].value + ' ΠΟΝΤΟΙ';
	currentQuestionStatsPlaceholder.show();
	
	Ti.API.info('currentCategoryFromDB='+currentCategoryFromDB+' AND questionReportQuestionId='+questionReportQuestionId);
	
	//Determine which category banner to use
	var currentCategoryProperties = getCategoryProperties(currentCategoryFromDB);
	selectedCategoryBanner.image = currentCategoryProperties.banner;
	
	setGameInProgress(true);
	
	//For multiplayer games we need to update the UI for the current player
	if(gameSession.getGameType() == BUZZ_GAME_GROUP){
		updateMultiplayerUI();
	}
	
	//hide outcome
	resultCorrect.hide();
	resultWrong.hide();
	timeBarFull.show();
	
	totalQuestionsPlayed++;
	
	currentQuestionStatsPlaceholder.animate({opacity:0.8, duration:500}, function(){
		
		//Delay the next question start
		setTimeout(function(){
			currentQuestionStatsPlaceholder.hide();
					
			//if not paused
			if(!timeBarFull2.paused){
				startTime();
			}
			
			//reset question images
			answerA.image = IMAGE_PATH+'question/r/a.png';
			answerB.image = IMAGE_PATH+'question/r/b.png';
			answerC.image = IMAGE_PATH+'question/r/c.png';
			answerD.image = IMAGE_PATH+'question/r/d.png';
		
			//reset opacity
			labelQuestion.opacity = 0;
			labelAnswerA.opacity = 0;
			labelAnswerB.opacity = 0;
			labelAnswerC.opacity = 0;
			labelAnswerD.opacity = 0;
			answerA.opacity = 1;
			answerB.opacity = 1;
			answerC.opacity = 1;
			answerD.opacity = 1;
		
			//Set question and answers
			labelQuestion.text = decrypt(questions.data[currentQIndex].question);
			labelAnswerA.text = decrypt(questions.data[currentQIndex].answer_a);
			labelAnswerB.text = decrypt(questions.data[currentQIndex].answer_b);
			labelAnswerC.text = decrypt(questions.data[currentQIndex].answer_c);
			labelAnswerD.text = decrypt(questions.data[currentQIndex].answer_d);
			currentCorrectAnswer = questions.data[currentQIndex].correct;
			currentQuestionPointsValue = questions.data[currentQIndex].value; 
			currentQuestionId = questions.data[currentQIndex].id;
			Ti.API.info('Question: '+labelQuestion.text+' has playcount of '+questions.data[currentQIndex].play_count);
			
			//Fade them in
			labelQuestion.animate({opacity:1,duration:QUESTION_FADE_IN_TIMER}, function(){
				labelAnswerA.animate({opacity:1,duration:QUESTION_FADE_IN_TIMER}, function(){
					//Enable for answering
					answerA.setTouchEnabled(true);
					ANSWERS_ENABLED = true;
					
					labelAnswerB.animate({opacity:1,duration:QUESTION_FADE_IN_TIMER}, function(){
						//Enable for answering
						answerB.setTouchEnabled(true);
						labelAnswerC.animate({opacity:1,duration:QUESTION_FADE_IN_TIMER}, function(){
							//Enable for answering	
							answerC.setTouchEnabled(true);
							labelAnswerD.animate({opacity:1,duration:QUESTION_FADE_IN_TIMER}, function(){
								//Enable for answering
								answerD.setTouchEnabled(true);	
								if(!timeBarFull2.animating){
									timeBarFull2.start();
								}
								
							});
						});
					});
				});
			});
			
			if(currentCorrectAnswer == 'a') {
				currentCorrectAnswerImage = answerA;
				currentCorrectAnswerImagePath = IMAGE_PATH+'question/indication/a.png';
			} else if(currentCorrectAnswer == 'b') {
				currentCorrectAnswerImage = answerB;
				currentCorrectAnswerImagePath = IMAGE_PATH+'question/indication/b.png';
			} else if(currentCorrectAnswer == 'c') {
				currentCorrectAnswerImage = answerC;
				currentCorrectAnswerImagePath = IMAGE_PATH+'question/indication/c.png';
			} else if(currentCorrectAnswer == 'd') {
				currentCorrectAnswerImage = answerD;
				currentCorrectAnswerImagePath = IMAGE_PATH+'question/indication/d.png';
			}
		},1500);
	})
}

//Displays the game over screen
function displayGameOver(){
	var winningPlayer = gameSession.getWinner();
	
	Ti.API.info('displayGameOver() called, winningPlayer='+winningPlayer);
	
	var gameOverStats = winningPlayer.totalCorrectAnswers + '/' + (winningPlayer.questionIndex) + ' ερωτήσεις';
	gameOverQuestionStats.text = gameOverStats;
	
	//Adjust Gameover UI
	if(gameOverNoMoreQuestions){
		gameOverImage.image = IMAGE_PATH+'question/gameover_termatismos.png';
	} else {
		gameOverImage.image = IMAGE_PATH+'question/gameover.png';
	}
	
	alertViewGameOver.show();
	setGameInProgress(false);
	gameSession.setGameStarted(false);
	
	//hide right/wrong icon
	resultCorrect.hide();
	resultWrong.hide();
	
	//hide question and answers
	labelQuestion.text = '';
	labelAnswerA.text = '';
	labelAnswerB.text = '';
	labelAnswerC.text = '';
	labelAnswerD.text = '';
	//reset answer views to default
	answerA.image = IMAGE_PATH+'question/r/a.png';
	answerB.image = IMAGE_PATH+'question/r/b.png';
	answerC.image = IMAGE_PATH+'question/r/c.png';
	answerD.image = IMAGE_PATH+'question/r/d.png';
	answerA.opacity = 1;
	answerB.opacity = 1;
	answerC.opacity = 1;
	answerD.opacity = 1;
	//reset score UI
	scoreValueLabel.text = 0;
	//reset lives UI
	heartIcon1.show();
	heartIcon2.show();
	heartIcon3.show();
	
	destroyQuestionNextView();
	
	//restart main music
	setTimeout(function(){
		if(MUSIC_MODE){
			win.fireEvent('playMainMusic');
		}
		
	}, 320);
}

/*Quit the current game, and restart by redirecting to the loader. 
 Reuseplayers determines whether the tmpPlayers of the gameSession should be saved again, or just used as they are.
 * */
function restartGame(reusePlayers){
	Ti.API.info('restartGame() called - currentCategoryId='+gameSession.getSelectedGameCategoryId());
	
	gameSession.restartGameSession();
	
	//reset question obj index
	currentQIndex = 0;
	
	//Stop the gameplay sound and play game over sound
	if(audioGameplay.playing){
		audioGameplay.stop();
	}
	
	var categoryProperties = getCategoryProperties(gameSession.getSelectedGameCategoryId());
	
	//RESTART game
    viewLoader.fireEvent('loaderStart', {
    	restartGame:reusePlayers,
    	currentCategoryIcon:categoryProperties.loader, 
    	currentCategoryLabel:categoryProperties.name, 
    	categoryId:gameSession.getSelectedGameCategoryId()
    });
    
    fadeIntroAudioOut();
    viewLoader.opacity = 1;

	//hide stacked views first
	if(LOADED_PLAYER2_JS){
		viewPlayer.opacity = 0;
	}
	
	view.opacity = 0;
	
	//finally, hide the actual game view
	viewQuestion.opacity = 0;
	
	setTimeout(function(){
		viewQuestionNext.opacity = 0;
		destroyQuestionNextView();
		
		if(LOADED_TOP_VIEW_JS){
			destroyTopScoresView();
		}
		
	}, 150);
}

/*Quit the current game, redirect to the home screen*/
function quitGame(){
	Ti.API.info('QUIT game');
	
	//restart main menu animation
	win.fireEvent('animateMenu');
	
	//hide stacked views first
	viewLoader.opacity = 0;
	view.opacity = 0;
	viewQuestionNext.opacity = 0;
	
	//reset question obj index
	currentQIndex = 0;
	
	//Stop the gameplay sound and play game over sound
	if(audioGameplay.playing){
		audioGameplay.stop();
	}
	
	if(SOUNDS_MODE){
		gameOverSound.play();	
	}
	
	//finally, hide the actual game view
	viewQuestion.opacity = 0;
	destroyQuestionView();
	destroyQuestionNextView();
	
	gameSession.quitGameSession();
	
	//restart main music
	setTimeout(function(){
		if(MUSIC_MODE){
			win.fireEvent('playMainMusic');
		}
		
	}, 280);
}

//Show game over event to be invoked by timer
var gameOverEvent = function(){
	//reset question obj index
	currentQIndex = 0;
	
	//TODO remove this and get it from newGame()
	var currentPlayerObj = getCurrentPlayer();
	var playerId = currentPlayerObj.id;
	var playerRemoteId = currentPlayerObj.player_id;
	var playerName = currentPlayerObj.name;
	
	var highestScore = 0;
	if(gameSession.getGameType() == BUZZ_GAME_SOLO){
		//Badges handling
		mtbImport("award_badge.js");
		awardBadgesNotification(playerId, gameSession.getSelectedGameCategoryId(), gameSession.getCurrentPlayer().score);
		
		//Save game session
		saveGameSession(playerId, gameSession.getSelectedGameCategoryId());
		
		//Save score
		saveScore(playerName, playerId, playerRemoteId, gameSession.getSelectedGameCategoryId(), gameSession.getCurrentPlayer().score);
		highestScore = gameSession.getCurrentPlayer().score;
	} else if(gameSession.getGameType() == BUZZ_GAME_GROUP){
		//Save game session and scores
		saveGroupGameSession(gameSession.getSelectedGameCategoryId(), gameSession.getLostPlayers(), gameSession.getGameGroupType());
		highestScore = gameSession.getMaxScore();
	}
	
	//Set the max score for the game over view
	gameOverScoreLabelValue.text = highestScore;
	
	//Stop the gameplay sound and play game over sound
	if(audioGameplay.playing){
		audioGameplay.stop();
	}
	
	if(SOUNDS_MODE){
		gameOverSound.play();
		//revert menu audio to standard volume
		audio.volume = 1;	
	}
	
	displayGameOver();    
}

//Event handler for game over play again button
function handleGameOverPlayAgainClick(){
	if(SOUNDS_MODE){
		audioClick.play();	
	}
	
	mtbImport("categories.js");
	buildCategoriesView();
	view.animate({opacity:1, duration:200}, function(){
		
		viewLoader.opacity=0;
		viewQuestion.opacity=0;
		alertViewGameOver.hide();
		
		destroyQuestionView();
		gameSession.setRestartWithNewCategory(true);
		
		if(MUSIC_MODE){
			audio.play();
		}
		
	});
}

//Event handler for game over show scores click
function handleGameOverShowScoresClick(){
	if(SOUNDS_MODE){
		audioClick.play();	
	}
	
	//fire event for score loading
	mtbImport("top_view.js");
	viewTopCategory.fireEvent('loadScore', {currentCategoryId:gameSession.getSelectedGameCategoryId()});
	buildTopScoresView(gameSession.getSelectedGameCategoryId(), gameSession.getGameType(), true);
	//show high score
	viewTopCategory.animate({opacity:1,duration:400}, function(){
	
		Ti.API.info('Show high scores - ANIM COMPLETE');
		//hide previous views
		view.opacity = 0;
		viewQuestion.opacity = 0;
		viewLoader.opacity = 0;
		
		if(LOADED_PLAYER2_JS){
			viewPlayer.opacity = 0;
		}

		//close game over screen
		alertViewGameOver.hide();
		
		destroyQuestionView();
	});
}

//The question view
var viewQuestion = Ti.UI.createView({
	backgroundImage:IMAGE_PATH+'background.jpg',
	opacity:0,
	top:0,
	bottom:0,
	left:0,
	right:0,
	zIndex:50
});

//Game start listener
viewQuestion.addEventListener('gameStart', function(data){
	Ti.API.info('EVENT: gameStart for category '+gameSession.getSelectedGameCategoryId()+' with banner '+gameSession.getCurrentCategoryBanner());
    selectedCategoryBanner.image = gameSession.getCurrentCategoryBanner();
    gameOverCategoryBanner.image = gameSession.getCurrentCategoryBanner();
	
	//Reset game mechanics
	newGame(gameSession.getSelectedGameCategoryId());
	gameSession.setGameStarted(true);
	
	//show current question
	nextQuestion(true);
});

//Event handler for timebar change event
function handleTimebarChange(e){
	currentTimeBarFrame = e.index;
	
	if(e.index == 0){
		timeBarFull2.pause();
	}
	
	if(e.index == 1){
		Ti.API.info('Time frame: '+e.index + ' - hiding full timebar');
		timeBarFull.hide();
	}
	
	if(e.index == 197){
		//Ti.API.info('OUT OF TIME Time frame: '+e.index);
		stopTime();
	
		//Disable answers
		enableAnswersUI(false);
	
		if(SOUNDS_MODE){
			timeOverSound.play();	
		}
			
		if(currentCorrectAnswer == 'a'){
			answerA.image = IMAGE_PATH+'question/correct/a.png';
			//Fade remaining questions
			answerB.image = IMAGE_PATH+'question/faded/b.png';
			answerB.opacity = 0.5;
			answerC.image = IMAGE_PATH+'question/faded/c.png';
			answerC.opacity = 0.5;
			answerD.image = IMAGE_PATH+'question/faded/d.png';
			answerD.opacity = 0.5;
		} else if(currentCorrectAnswer == 'b'){
			answerB.image = IMAGE_PATH+'question/correct/b.png';
			//Fade remaining questions
			answerA.image = IMAGE_PATH+'question/faded/a.png';
			answerA.opacity = 0.5;
			answerC.image = IMAGE_PATH+'question/faded/c.png';
			answerC.opacity = 0.5;
			answerD.image = IMAGE_PATH+'question/faded/d.png';
			answerD.opacity = 0.5;
		} else if(currentCorrectAnswer == 'c'){
			answerC.image = IMAGE_PATH+'question/correct/c.png';
			//Fade remaining questions
			answerA.image = IMAGE_PATH+'question/faded/a.png';
			answerA.opacity = 0.5;
			answerB.image = IMAGE_PATH+'question/faded/b.png';
			answerB.opacity = 0.5;
			answerD.image = IMAGE_PATH+'question/faded/d.png';
			answerD.opacity = 0.5;
		} else if(currentCorrectAnswer == 'd'){
			answerD.image = IMAGE_PATH+'question/correct/d.png';
			//Fade remaining questions
			answerB.image = IMAGE_PATH+'question/faded/b.png';
			answerB.opacity = 0.5;
			answerC.image = IMAGE_PATH+'question/faded/c.png';
			answerC.opacity = 0.5;
			answerA.image = IMAGE_PATH+'question/faded/a.png';
			answerA.opacity = 0.5;
		}
		
		resultWrong.show();
		wrongAnswer(false);
	}
}

//Event handler for answer A
function handleClickAnswerA(){
	//Stop timebar & disable UI for answering
	stopTime();
	enableAnswersUI(false);
	
	if(ANSWERS_ENABLED){
	
		//Fade remaining questions
		answerB.image = IMAGE_PATH+'question/faded/b.png';
		answerB.opacity = 0.5;
		answerC.image = IMAGE_PATH+'question/faded/c.png';
		answerC.opacity = 0.5;
		answerD.image = IMAGE_PATH+'question/faded/d.png';
		answerD.opacity = 0.5;
		
		//Blink the selected answer
		var blinkCounter = 0;
		var on = false;
		var interval = setInterval(function(){
			blinkCounter++;
			if(!on){
				on = true;
				answerA.image = IMAGE_PATH+'question/correct/a.png';
			} else {
				on = false;
				answerA.image = IMAGE_PATH+'question/r/a.png';
			}
			
			//after some blinks
			if(blinkCounter == numberOfBlinks){
				clearInterval(interval);
				
				//mark user answer as correct/wrong and show outcome
				if(currentCorrectAnswer == 'a'){
					answerA.image = IMAGE_PATH+'question/correct/a.png';
					labelQuestion.opacity = 0.5;
					resultCorrect.show();
					
					correctAnswer();
				} else {
					answerA.image = IMAGE_PATH+'question/wrong/a.png';
					labelQuestion.opacity = 0.5;
					resultWrong.show();
					
					wrongAnswer(false);
					
					//highlight correct answer
					currentCorrectAnswerImage.opacity = 1;
					currentCorrectAnswerImage.image = currentCorrectAnswerImagePath;
				}
			}
			
		},400);
		ANSWERS_ENABLED = false;
	}
}

//Event handler for answer B
function handleClickAnswerB(){
	//Stop timebar & disable UI for answering
	stopTime();
	enableAnswersUI(false);
	
	if(ANSWERS_ENABLED){
	
		//Fade remaining questions
		answerA.image = IMAGE_PATH+'question/faded/a.png';
		answerA.opacity = 0.5;
		answerC.image = IMAGE_PATH+'question/faded/c.png';
		answerC.opacity = 0.5;
		answerD.image = IMAGE_PATH+'question/faded/d.png';
		answerD.opacity = 0.5;
		
		//Blink the selected answer
		var blinkCounter = 0;
		var on = false;
		var interval = setInterval(function(){
			blinkCounter++;
			if(!on){
				on = true;
				answerB.image = IMAGE_PATH+'question/correct/b.png';
			} else {
				on = false;
				answerB.image = IMAGE_PATH+'question/r/b.png';
			}
			
			//after some blinks
			if(blinkCounter == numberOfBlinks){
				clearInterval(interval);
				
				//mark user answer as correct/wrong and show outcome
				if(currentCorrectAnswer == 'b'){
					answerB.image = IMAGE_PATH+'question/correct/b.png';
					labelQuestion.opacity = 0.5;
					resultCorrect.show();
					
					correctAnswer();
				} else {
					answerB.image = IMAGE_PATH+'question/wrong/b.png';
					labelQuestion.opacity = 0.5;
					resultWrong.show();
					
					wrongAnswer(false);
					
					//highlight correct answer
					currentCorrectAnswerImage.opacity = 1;
					currentCorrectAnswerImage.image = currentCorrectAnswerImagePath;
				}
			}
			
		},400);
		ANSWERS_ENABLED = false;
	}
}

//Event handler for answer C
function handleClickAnswerC(){
	//Stop timebar & disable UI for answering
	stopTime();
	enableAnswersUI(false);
	
	if(ANSWERS_ENABLED){
		
		//Fade remaining questions
		answerB.image = IMAGE_PATH+'question/faded/b.png';
		answerB.opacity = 0.5;
		answerA.image = IMAGE_PATH+'question/faded/a.png';
		answerA.opacity = 0.5;
		answerD.image = IMAGE_PATH+'question/faded/d.png';
		answerD.opacity = 0.5;
		
		//Blink the selected answer
		var blinkCounter = 0;
		var on = false;
		var interval = setInterval(function(){
			blinkCounter++;
			if(!on){
				on = true;
				answerC.image = IMAGE_PATH+'question/correct/c.png';
			} else {
				on = false;
				answerC.image = IMAGE_PATH+'question/r/c.png';
			}
			
			//after some blinks
			if(blinkCounter == numberOfBlinks){
				clearInterval(interval);
				
				//mark user answer as correct/wrong and show outcome
				if(currentCorrectAnswer == 'c'){
					answerC.image = IMAGE_PATH+'question/correct/c.png';
					labelQuestion.opacity = 0.5;
					resultCorrect.show();
					
					correctAnswer();
				} else {
					answerC.image = IMAGE_PATH+'question/wrong/c.png';
					labelQuestion.opacity = 0.5;
					resultWrong.show();
					
					wrongAnswer(false);
					
					//highlight correct answer
					currentCorrectAnswerImage.opacity = 1;
					currentCorrectAnswerImage.image = currentCorrectAnswerImagePath;
				}
			}
			
		},400);
		ANSWERS_ENABLED = false;
	}
}

//Event handler for answer D
function handleClickAnswerD(){
	//Stop timebar & disable UI for answering
	stopTime();
	enableAnswersUI(false);
	
	if(ANSWERS_ENABLED){
		
		//Fade remaining questions
		answerB.image = IMAGE_PATH+'question/faded/b.png';
		answerB.opacity = 0.5;
		answerC.image = IMAGE_PATH+'question/faded/c.png';
		answerC.opacity = 0.5;
		answerA.image = IMAGE_PATH+'question/faded/a.png';
		answerA.opacity = 0.5;
		
		//Blink the selected answer
		var blinkCounter = 0;
		var on = false;
		var interval = setInterval(function(){
			blinkCounter++;
			if(!on){
				on = true;
				answerD.image = IMAGE_PATH+'question/correct/d.png';
			} else {
				on = false;
				answerD.image = IMAGE_PATH+'question/r/d.png';
			}
			
			//after some blinks
			if(blinkCounter == numberOfBlinks){
				clearInterval(interval);
				
				//mark user answer as correct/wrong and show outcome
				if(currentCorrectAnswer == 'd'){
					answerD.image = IMAGE_PATH+'question/correct/d.png';
					labelQuestion.opacity = 0.5;
					resultCorrect.show();
					
					correctAnswer();
				} else {
					answerD.image = IMAGE_PATH+'question/wrong/d.png';
					labelQuestion.opacity = 0.5;
					resultWrong.show();
					
					wrongAnswer(false);
					
					//highlight correct answer
					currentCorrectAnswerImage.opacity = 1;
					currentCorrectAnswerImage.image = currentCorrectAnswerImagePath;
				}
			}
			
		},400);
		ANSWERS_ENABLED = false;
	}
}

/*Enables or disables the answer buttons*/
function enableAnswersUI(flag){
	Ti.API.warn('Questions.enableAnswersUI() called with '+flag);
	
	if( (flag) || (ANSWERS_ENABLED && !flag)){
		answerA.setTouchEnabled(flag);
		answerB.setTouchEnabled(flag);
		answerC.setTouchEnabled(flag);
		answerD.setTouchEnabled(flag);
	}
}