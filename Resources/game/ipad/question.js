//JSS properties
var answerFontSize = 28;
var answerLeft = 179;
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
var resultCorrect = null;
var resultWrong = null;
var labelQuestion = null;
var currentQuestionStatsPlaceholder = null;
var currentQuestionIndexLabel = null;
var currentQuestionPointsLabel = null;

var answerA = null;
var answerB = null;
var answerC = null;
var answerD = null;
var labelAnswerA = null;
var labelAnswerB = null;
var labelAnswerC = null;
var labelAnswerD = null;
var alertViewGameOver = null;

var selectedCategoryBanner = null;
var bg = null;
var heartIcon1 = null;
var heartIcon2 = null;
var heartIcon3 = null;
var heartIcon4 = null;
var heartIcon5 = null;
var timeBarFull = null;
var timeBarEmpty = null;
var questionTopLogo = null;
var questionScoreLabel = null;
var questionClockIcon = null;

var answerCharLabelA = null;
var answerCharLabelB = null;
var answerCharLabelC = null;
var answerCharLabelD = null;
var answerCharSepparator = null;

//Game Over UI components
var alertViewGameOverTitleBackground = null;
var alertViewGameOverTitle = null;
var alertViewGameOverMiddleBox = null;
var alertViewGameOverUpperBar = null;
var alertViewGameOverBottomBackground = null;
var gameOverPlayImage = null;
var gameOverArrowImage = null;
var gameOverScoreLabelValue = null;
var gameOverQuestionStats = null;
var gameOverCategoryBanner = null;

var continueBarAnimation = true;
var barLeft = 768;
var BAR_LEFT_DEFAULT = 768;

var tmpMatrixAnswer = Ti.UI.create2DMatrix();
tmpMatrixAnswer = tmpMatrixAnswer.scale(1.18);
var tmpMatrixAnswerInverse = Ti.UI.create2DMatrix();
tmpMatrixAnswerInverse = tmpMatrixAnswerInverse.scale(1);
var scaleAnimationAnswer = Ti.UI.createAnimation({opacity:1,transform:tmpMatrixAnswer,duration:100});
var scaleAnimationAnswerInverse = Ti.UI.createAnimation({transform:tmpMatrixAnswerInverse,duration:100});

//TMP BAR
var barImages = [];
var timeBarFull2 = null;

var ANSWERS_ENABLED = true;

function buildQuestionView(defaultQuestionBanner){
	Ti.API.warn('buildQuestionView() called');
	var IPAD_OFFSET = 50;
	
	var shouldCreateView = selectedCategoryBanner == null;
	if(shouldCreateView){
		
		questionTopLogo = Titanium.UI.createImageView({
			image:IMAGE_PATH+'question/logo.png',
			top:40
		});
		viewQuestion.add(questionTopLogo);
		
		//Score label
		questionScoreLabel = Titanium.UI.createLabel({
			text:'0',
			color:'0b4b7f',
			left:27,
			textAlign:'left',
			top:34,
			font:{fontSize:50, fontWeight:'bold', fontFamily:'Myriad Pro'}
		});
		viewQuestion.add(questionScoreLabel);
		
		//Selected category banner
		selectedCategoryBanner = Titanium.UI.createImageView({
			image:defaultQuestionBanner,
			top:20,
			right:20
		});
		
		viewQuestion.add(selectedCategoryBanner);
		
		var heartsOffset = 39;
		var heartImage = IMAGE_PATH+'question/heart_life.png';
		
		//Heart icon 1
		heartIcon1 = Ti.UI.createImageView({
			image:heartImage,
			top:82,
			left:27
		});
		
		//Heart icon 2
		heartIcon2 = Ti.UI.createImageView({
			image:heartImage,
			top:82,
			left:heartIcon1.left+heartsOffset
		});
		
		//Heart icon 3
		heartIcon3 = Ti.UI.createImageView({
			image:heartImage,
			top:82,
			left:heartIcon2.left+heartsOffset
		});
		
		//Heart icon 4
		heartIcon4 = Ti.UI.createImageView({
			image:heartImage,
			top:82,
			left:heartIcon3.left+heartsOffset,
			visible:false
		});
	
		//Heart icon 5
		heartIcon5 = Ti.UI.createImageView({
			image:heartImage,
			top:82,
			left:heartIcon4.left+heartsOffset,
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
			top:133,
			left:0,
			zIndex:2
		});
		
		viewQuestion.add(timeBarFull);
	
		//Time bar EMPTY
		timeBarEmpty = Titanium.UI.createImageView({
			image:IMAGE_PATH+'question/time_empty.png',
			width:768,
			height:31,
			top:133,
			left:barLeft,
			zIndex:3
		});
		
		viewQuestion.add(timeBarEmpty);
		
		//Time bar EMPTY
		questionClockIcon = Titanium.UI.createImageView({
			image:IMAGE_PATH+'question/time_icon.png',
			top:123,
			zIndex:3
		});
		
		viewQuestion.add(questionClockIcon);
		
		//Question bg
		bg = Titanium.UI.createImageView({
			image:IMAGE_PATH+'question/question_back.png',
			top:164
		});
		
		viewQuestion.add(bg);
		
		//Correct result
		resultCorrect = Titanium.UI.createImageView({
			image:IMAGE_PATH+'question/answer_right.png',
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
			color:'#5a3fa3',
			textAlign:'center',
		    zIndex:10,
		    left:30,
		    right:30,
			font:{fontSize:29, fontWeight:'semibold', fontFamily:'Myriad Pro'}
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
		
		//////////////////////////////////////Answers
		//Answer A
		answerA = Titanium.UI.createButton({
			backgroundImage:IMAGE_PATH+'question/answers/A.png',
			bottom:332,
			width:768,
			height:86
		});
		
		//Answer B
		answerB = Titanium.UI.createButton({
			backgroundImage:IMAGE_PATH+'question/answers/B.png',
			bottom:232,
			width:768,
			height:86
		});
		
		//Answer C
		answerC = Titanium.UI.createButton({
			backgroundImage:IMAGE_PATH+'question/answers/C.png',
			bottom:132,
			width:768,
			height:86
		});
		
		//Answer D
		answerD = Titanium.UI.createButton({
			backgroundImage:IMAGE_PATH+'question/answers/D.png',
			bottom:32,
			width:768,
			height:86
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
		
		//Answer A label
		answerCharLabelA = Titanium.UI.createLabel({
			text:'Α',
			color:'white',
			left:40,
			top:18,
			textAlign:'center',
			font:{fontSize:55, fontWeight:'bold', fontFamily:'Myriad Pro'}
		});
		
		//Answer B label
		answerCharLabelB = Titanium.UI.createLabel({
			text:'Β',
			color:'white',
			left:40,
			top:18,
			textAlign:'center',
			font:{fontSize:55, fontWeight:'bold', fontFamily:'Myriad Pro'}
		});
		
		//Answer C label
		answerCharLabelC = Titanium.UI.createLabel({
			text:'Γ',
			color:'white',
			left:40,
			top:18,
			textAlign:'center',
			font:{fontSize:55, fontWeight:'bold', fontFamily:'Myriad Pro'}
		});
		
		//Answer D label
		answerCharLabelD = Titanium.UI.createLabel({
			text:'Δ',
			color:'white',
			left:40,
			top:18,
			textAlign:'center',
			font:{fontSize:55, fontWeight:'bold', fontFamily:'Myriad Pro'}
		});
		
		answerCharSepparator = Titanium.UI.createView({
			backgroundColor:'white',
			bottom:32,
			left:116,
			width:13,
			height:387,
			zIndex:2
		});
		viewQuestion.add(answerCharSepparator);
		
		answerA.add(labelAnswerA);
		answerB.add(labelAnswerB);
		answerC.add(labelAnswerC);
		answerD.add(labelAnswerD);
		
		answerA.add(answerCharLabelA);
		answerB.add(answerCharLabelB);
		answerC.add(answerCharLabelC);
		answerD.add(answerCharLabelD);
		
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
		
		//Alert view for game over
		alertViewGameOver = Titanium.UI.createView({
			backgroundImage:IMAGE_PATH+'signin/background.jpg',
			top:0,
			bottom:0,
			left:0,
			right:0,
			zIndex:65,
			visible:false
		});
		
		//blue background of the title in game over
		alertViewGameOverTitleBackground = Ti.UI.createView({
			backgroundColor:'0b4b7f',
			height:193,
			top:0
		});
		
		//game over title label
		alertViewGameOverTitle = Titanium.UI.createLabel({
			text:'GAME OVER',
			color:'white',
			height:74,
			top:67,
			textAlign:'left',
			font:{fontSize:102, fontWeight:'bold', fontFamily:'Myriad Pro'}
		});
		alertViewGameOverTitleBackground.add(alertViewGameOverTitle);
		
		alertViewGameOver.add(alertViewGameOverTitleBackground);
		
		//blue box for the score
		alertViewGameOverMiddleBox = Ti.UI.createView({
			backgroundColor:'0b4b7f',
			height:311,
			width:478,
			top:351
		});
		
		//Gameover view label points value
		gameOverScoreLabelValue = Titanium.UI.createLabel({
			text:'0',
			color:'white',
			bottom:56,
			height:81,
			font:{fontSize:115, fontWeight:'bold', fontFamily:'Myriad Pro'}
		});
		alertViewGameOverMiddleBox.add(gameOverScoreLabelValue);
		
		//Game over question stats (12/23 erwtiseis)
		gameOverQuestionStats = Titanium.UI.createLabel({
			text:'',
			color:'white',
			textAlign:'center',
		    bottom:40,
		    height:34,
		    left:4,
		    right:4,
			font:{fontSize:34, fontWeight:'semibold', fontFamily:'Myriad Pro'}
		});
		alertViewGameOverMiddleBox.add(gameOverQuestionStats);
		
		alertViewGameOver.add(alertViewGameOverMiddleBox);
		
		var selectedCategId = gameSession.getSelectedGameCategoryId();
		var gameOverBannerImage = null;
		var gameOverUpperBarColor = null;
		
		if(selectedCategId == CAT_EXFORGE){
			gameOverBannerImage = IMAGE_PATH+'game_over/icon_exforge.png';
			gameOverUpperBarColor = 'fb494a'; 
		}else if(selectedCategId == CAT_EPISTIMI){
			gameOverBannerImage = IMAGE_PATH+'game_over/icon_science.png';
			gameOverUpperBarColor = '6fb042'; 
		}else if(selectedCategId == CAT_GEOGRAFIA){
			gameOverBannerImage = IMAGE_PATH+'game_over/icon_geo.png';
			gameOverUpperBarColor = '569bd4'; 
		}else if(selectedCategId == CAT_ISTORIA){
			gameOverBannerImage = IMAGE_PATH+'game_over/icon_history.png';
			gameOverUpperBarColor = 'fb9a01'; 
		}else if(selectedCategId == CAT_ATHLITIKA){
			gameOverBannerImage = IMAGE_PATH+'game_over/icon_sports.png';
			gameOverUpperBarColor = '9b52e7'; 
		}
		
		//game over bar which changes according to category played
		alertViewGameOverUpperBar = Ti.UI.createView({
			backgroundColor:gameOverUpperBarColor,
			height:29,
			top:193
		});
		alertViewGameOver.add(alertViewGameOverUpperBar);
		
		//Game over category banner
		gameOverCategoryBanner = Ti.UI.createImageView({
			image:gameOverBannerImage,
			top:268,
			zIndex:2
		});
		alertViewGameOver.add(gameOverCategoryBanner);
		
		//bottom background for the buttons
		alertViewGameOverBottomBackground = Ti.UI.createView({
			backgroundColor:'0b4b7f',
			height:257,
			bottom:0
		});
		
		//Game over play again button
		gameOverPlayImage = Ti.UI.createButton({
			backgroundImage:IMAGE_PATH+'game_over/button_playagain.png',
			top:45,
			width:205,
			height:185,
			left:83,
			bottom:36
		});
		alertViewGameOverBottomBackground.add(gameOverPlayImage);
		//Play again event listener
		gameOverPlayImage.addEventListener('click', handleGameOverPlayAgainClick);
		
		//Game over rankings button
		gameOverArrowImage = Ti.UI.createButton({
			backgroundImage:IMAGE_PATH+'game_over/button_rankings.png',
			top:45,
			width:205,
			height:185,
			right:83,
			bottom:36
		});
		alertViewGameOverBottomBackground.add(gameOverArrowImage);
		//Event listener for game over arrow image
		gameOverArrowImage.addEventListener('click', handleGameOverShowScoresClick);
		
		alertViewGameOver.add(alertViewGameOverBottomBackground);
		
		win.add(alertViewGameOver);
		
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
		
		viewQuestion.remove(questionScoreLabel);
		
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
		gameOverPlayImage.removeEventListener('click', handleGameOverPlayAgainClick);
		//Event listener for game over arrow image
		gameOverArrowImage.removeEventListener('click', handleGameOverShowScoresClick);
		
		alertViewGameOverBottomBackground.remove(gameOverArrowImage);
		alertViewGameOverBottomBackground.remove(gameOverPlayImage);
		
		//Gameover arrow image
		gameOverArrowImage = null;
		//Gameover playAgain image
		gameOverPlayImage = null;
		
		alertViewGameOver.remove(gameOverCategoryBanner);
		alertViewGameOverMiddleBox.remove(gameOverQuestionStats);
		alertViewGameOverMiddleBox.remove(gameOverScoreLabelValue);
		
		alertViewGameOverTitleBackground.remove(alertViewGameOverTitle);
		alertViewGameOver.remove(alertViewGameOverTitleBackground);
		
		alertViewGameOver.remove(alertViewGameOverMiddleBox);
		
		alertViewGameOver.remove(alertViewGameOverUpperBar);
		
		alertViewGameOver.remove(alertViewGameOverBottomBackground);
		
		answerCharLabelA = null;
		answerCharLabelB = null;
		answerCharLabelC = null;
		answerCharLabelD = null;
		answerCharSepparator = null;
		
		alertViewGameOverTitleBackground = null;
		alertViewGameOverTitle = null;
		alertViewGameOverMiddleBox = null;
		alertViewGameOverUpperBar = null;
		alertViewGameOverBottomBackground = null;
			
		//Game over category banner
		gameOverCategoryBanner = null;
		//Game over question stats
		gameOverQuestionStats = null;
		//Gameover view label points value
		gameOverScoreLabelValue = null;
		
		win.remove(alertViewGameOver);
		//Alert view for game over
		alertViewGameOver = null;	
		
		barImages = [];
		
		win.remove(viewQuestion);
	}
	
	Ti.API.warn('destroyQuestionView() ends');
}

//Animates the timebar
function animateBar(){
    
    barLeft = barLeft - 4;
    var targetLeft = barLeft;
    
    if(targetLeft == 0) {
        Ti.API.warn('STOP BAR');
        continueBarAnimation = false;
        
        stopTime();
    
        //Disable answers
        enableAnswersUI(false);
    
        /*if(SOUNDS_MODE){
            timeOverSound.play();   
        }*/
            
        if(currentCorrectAnswer == 'a'){
            //Fade remaining questions
            answerB.opacity = 0.3;
            answerC.opacity = 0.3;
            answerD.opacity = 0.3;
        } else if(currentCorrectAnswer == 'b'){
            //Fade remaining questions
            answerA.opacity = 0.3;
            answerC.opacity = 0.3;
            answerD.opacity = 0.3;
        } else if(currentCorrectAnswer == 'c'){
            //Fade remaining questions
            answerA.opacity = 0.3;
            answerB.opacity = 0.3;
            answerD.opacity = 0.3;
        } else if(currentCorrectAnswer == 'd'){
            //Fade remaining questions
            answerB.opacity = 0.3;
            answerC.opacity = 0.3;
            answerA.opacity = 0.3;
        }
        
        resultWrong.animate(scaleAnimationAnswer, function(){
            resultWrong.animate(scaleAnimationAnswerInverse);
        });
        
        wrongAnswer(false);
    }
    
    //Ti.API.warn('BAR to '+targetLeft);
    timeBarEmpty.animate({left:targetLeft, duration:80}, function(){
        if(continueBarAnimation){
            animateBar();
        }
    });
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
	questionScoreLabel.text = '0';
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
	
	//Reset time bar
	setTimeout(function(){
	    timeBarEmpty.left = BAR_LEFT_DEFAULT;
        barLeft = BAR_LEFT_DEFAULT;
        continueBarAnimation = true;
	}, 500);
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
	
	//Calculate animation duration
	var animationDuration = Math.round((pointsGained / defaultIncrements) * animationInterval);
	timeBarEmpty.animate({left:0,duration:animationDuration});
	
	var activeScoreAnimationInterval = setInterval(function(){
		var v = parseInt(questionScoreLabel.text);
		
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
				answerA.image = IMAGE_PATH+'question/answers/A.png';
				answerB.image = IMAGE_PATH+'question/answers/B.png';
				answerC.image = IMAGE_PATH+'question/answers/C.png';
				answerD.image = IMAGE_PATH+'question/answers/D.png';
				answerA.opacity = 1;
				answerB.opacity = 1;
				answerC.opacity = 1;
				answerD.opacity = 1;
			
				//hide right/wrong icon
				resultCorrect.hide();
				resultWrong.hide();
				
				bg.image = IMAGE_PATH+'question/question_back.png';
				
				showNextQuestionImage(false);
			}, 550);
			
		} else {
			v += defaultIncrements;
			questionScoreLabel.text = v;
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
			answerA.image = IMAGE_PATH+'question/answers/A.png';
			answerB.image = IMAGE_PATH+'question/answers/B.png';
			answerC.image = IMAGE_PATH+'question/answers/C.png';
			answerD.image = IMAGE_PATH+'question/answers/D.png';
			
			//hide right/wrong icon
			resultCorrect.hide();
			resultWrong.hide();
			
			bg.image = IMAGE_PATH+'question/question_back.png';
		
			showNextQuestionImage(fromResumeEvent);
		}, SHOW_SCORE_TIMER);
	} else {
		//Show gameover
		setTimeout(gameOverEvent, SHOW_SCORE_TIMER);
	}	
}

//Adds the score earned by the latest answer to the total score
function calculateScore(){
	var pointsWorth = Math.round((barLeft * currentQuestionPointsValue) / 768);
	Ti.API.info('calculateScore gives '+pointsWorth+' points');
	
	//Trigger the animation for the score counter
	incrementScoreCounter(pointsWorth);
}

//Stops the timebar animation
function stopTime(){
	continueBarAnimation = false;
}

//Starts the timebar animation
function startTime(){
	//animate timebar
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
	//Score
	questionScoreLabel.text = gameSession.getCurrentPlayer().score;
	
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
	bg.image = IMAGE_PATH+'question/question_back.png';
	timeBarFull.show();
	
	totalQuestionsPlayed++;
	
	currentQuestionStatsPlaceholder.animate({opacity:0.8, duration:500}, function(){
		
		//Delay the next question start
		setTimeout(function(){
			currentQuestionStatsPlaceholder.hide();
					
			//reset question images
			answerA.image = IMAGE_PATH+'question/answers/A.png';
			answerB.image = IMAGE_PATH+'question/answers/B.png';
			answerC.image = IMAGE_PATH+'question/answers/C.png';
			answerD.image = IMAGE_PATH+'question/answers/D.png';
		
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
								if(continueBarAnimation){
									animateBar();
								}
								
							});
						});
					});
				});
			});
			
			if(currentCorrectAnswer == 'a') {
				currentCorrectAnswerImage = answerA;
				currentCorrectAnswerImagePath = IMAGE_PATH+'question/answers/A.png';
			} else if(currentCorrectAnswer == 'b') {
				currentCorrectAnswerImage = answerB;
				currentCorrectAnswerImagePath = IMAGE_PATH+'question/answers/B.png';
			} else if(currentCorrectAnswer == 'c') {
				currentCorrectAnswerImage = answerC;
				currentCorrectAnswerImagePath = IMAGE_PATH+'question/answers/C.png';
			} else if(currentCorrectAnswer == 'd') {
				currentCorrectAnswerImage = answerD;
				currentCorrectAnswerImagePath = IMAGE_PATH+'question/answers/D.png';
			}
		},1500);
	});
}

//Displays the game over screen
function displayGameOver(){
	var winningPlayer = gameSession.getWinner();
	
	Ti.API.info('displayGameOver() called, winningPlayer='+winningPlayer);
	
	var gameOverStats = winningPlayer.totalCorrectAnswers + '/' + (winningPlayer.questionIndex) + ' ερωτήσεις';
	gameOverQuestionStats.text = gameOverStats;
	
	alertViewGameOver.show();
	setGameInProgress(false);
	gameSession.setGameStarted(false);
	
	//hide right/wrong icon
	resultCorrect.hide();
	resultWrong.hide();
	bg.image = IMAGE_PATH+'question/question_back.png';
	
	//hide question and answers
	labelQuestion.text = '';
	labelAnswerA.text = '';
	labelAnswerB.text = '';
	labelAnswerC.text = '';
	labelAnswerD.text = '';
	//reset answer views to default
	answerA.image = IMAGE_PATH+'question/answers/A.png';
	answerB.image = IMAGE_PATH+'question/answers/B.png';
	answerC.image = IMAGE_PATH+'question/answers/C.png';
	answerD.image = IMAGE_PATH+'question/answers/D.png';
	answerA.opacity = 1;
	answerB.opacity = 1;
	answerC.opacity = 1;
	answerD.opacity = 1;
	//reset score UI
	questionScoreLabel.text = 0;
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
	if(LOADED_SIGNIN_JS){
		viewSignin.opacity = 0;
	}
	
	viewCategories.opacity = 0;
	
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
	viewCategories.opacity = 0;
	
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
	viewQuestionNext.opacity = 0;
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
	//if(gameSession.getGameType() == BUZZ_GAME_SOLO){
		//Badges handling
		mtbImport("award_badge.js");
		var winningPlayer = gameSession.getWinner();
		
		var awardBadgeStats = winningPlayer.totalCorrectAnswers + '/' + (winningPlayer.questionIndex) + ' ερωτήσεις';
		
		awardBadgesNotification(playerId, gameSession.getSelectedGameCategoryId(), gameSession.getCurrentPlayer().score, awardBadgeStats);
		
		//Save game session
		saveGameSession(playerId, gameSession.getSelectedGameCategoryId());
		
		//Save score
		saveScore(playerName, playerId, playerRemoteId, gameSession.getSelectedGameCategoryId(), gameSession.getCurrentPlayer().score);
		highestScore = gameSession.getCurrentPlayer().score;
	//} else if(gameSession.getGameType() == BUZZ_GAME_GROUP){
		//Save game session and scores
		//saveGroupGameSession(gameSession.getSelectedGameCategoryId(), gameSession.getLostPlayers(), gameSession.getGameGroupType());
		//highestScore = gameSession.getMaxScore();
	//}
	
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
};

//Event handler for game over play again button
function handleGameOverPlayAgainClick(){
	if(SOUNDS_MODE){
		audioClick.play();	
	}
	
	mtbImport("categories.js");
	buildCategoriesView();
	viewCategories.animate({opacity:1, duration:200}, function(){
		
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
		viewCategories.opacity = 0;
		viewQuestion.opacity = 0;
		viewLoader.opacity = 0;
		
		if(LOADED_SIGNIN_JS){
			viewSignin.opacity = 0;
		}

		//close game over screen
		alertViewGameOver.hide();
		
		destroyQuestionView();
	});
}

//The question view
var viewQuestion = Ti.UI.createView({
	backgroundColor:'white',
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
			answerA.image = IMAGE_PATH+'question/answers/A.png';
			//Fade remaining questions
			answerB.opacity = 0.5;
			answerC.opacity = 0.5;
			answerD.opacity = 0.5;
		} else if(currentCorrectAnswer == 'b'){
			answerB.image = IMAGE_PATH+'question/answers/B.png';
			//Fade remaining questions
			answerA.opacity = 0.5;
			answerC.opacity = 0.5;
			answerD.opacity = 0.5;
		} else if(currentCorrectAnswer == 'c'){
			answerC.image = IMAGE_PATH+'question/answers/C.png';
			//Fade remaining questions
			answerA.opacity = 0.5;
			answerB.opacity = 0.5;
			answerD.opacity = 0.5;
		} else if(currentCorrectAnswer == 'd'){
			answerD.image = IMAGE_PATH+'question/answers/D.png';
			//Fade remaining questions
			answerB.opacity = 0.5;
			answerC.opacity = 0.5;
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
		
		answerA.image = IMAGE_PATH+'question/answers/pressed.png';
		
		//Blink the selected answer
		var blinkCounter = 0;
		var on = false;
		var timeout = setTimeout(function(){
				
			//mark user answer as correct/wrong and show outcome
			if(currentCorrectAnswer == 'a'){
				answerA.image = IMAGE_PATH+'question/answers/A.png';
				//labelQuestion.opacity = 0.5;
				
				answerB.opacity = 0.3;
				answerC.opacity = 0.3;
				answerD.opacity = 0.3;
				
				bg.image = IMAGE_PATH+'question/question_back2.png';
				resultCorrect.show();
				
				resultCorrect.animate(scaleAnimationAnswer, function(){
                    resultCorrect.animate(scaleAnimationAnswerInverse);
                });
				
				correctAnswer();
			} else {
				answerA.image = IMAGE_PATH+'question/answers/wrong.png';
				//labelQuestion.opacity = 0.5;
				
				bg.image = IMAGE_PATH+'question/question_back2.png';
				resultWrong.show();
				
				answerB.opacity = 0.3;
				answerC.opacity = 0.3;
				answerD.opacity = 0.3;
				
				resultWrong.animate(scaleAnimationAnswer, function(){
                    resultWrong.animate(scaleAnimationAnswerInverse);
                });
				
				wrongAnswer(false);
				
				//highlight correct answer
				currentCorrectAnswerImage.opacity = 1;
				currentCorrectAnswerImage.image = currentCorrectAnswerImagePath;
			}
			
		},1500);
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
		answerB.image = IMAGE_PATH+'question/answers/pressed.png';
		
		//Blink the selected answer
		var blinkCounter = 0;
		var on = false;
		var timeout = setTimeout(function(){
			
			//mark user answer as correct/wrong and show outcome
			if(currentCorrectAnswer == 'b'){
				answerB.image = IMAGE_PATH+'question/answers/B.png';
				
				answerA.opacity = 0.3;
				answerC.opacity = 0.3;
				answerD.opacity = 0.3;
				
				bg.image = IMAGE_PATH+'question/question_back2.png';
				resultCorrect.show();
				
				resultCorrect.animate(scaleAnimationAnswer, function(){
                    resultCorrect.animate(scaleAnimationAnswerInverse);
                });
                
				correctAnswer();
			} else {
				answerB.image = IMAGE_PATH+'question/answers/wrong.png';
				
				answerA.opacity = 0.3;
				answerC.opacity = 0.3;
				answerD.opacity = 0.3;
				
				bg.image = IMAGE_PATH+'question/question_back2.png';
				resultWrong.show();
				
				resultWrong.animate(scaleAnimationAnswer, function(){
                    resultWrong.animate(scaleAnimationAnswerInverse);
                });
                
				wrongAnswer(false);
				
				//highlight correct answer
				currentCorrectAnswerImage.opacity = 1;
				currentCorrectAnswerImage.image = currentCorrectAnswerImagePath;
			}
		},1500);
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
		answerC.image = IMAGE_PATH+'question/answers/pressed.png';
		
		//Blink the selected answer
		var blinkCounter = 0;
		var on = false;
		var timeout = setTimeout(function(){
			
			//mark user answer as correct/wrong and show outcome
			if(currentCorrectAnswer == 'c'){
				answerC.image = IMAGE_PATH+'question/answers/C.png';
				
				answerB.opacity = 0.3;
				answerA.opacity = 0.3;
				answerD.opacity = 0.3;					

				bg.image = IMAGE_PATH+'question/question_back2.png';
				resultCorrect.show();
				
				resultCorrect.animate(scaleAnimationAnswer, function(){
                    resultCorrect.animate(scaleAnimationAnswerInverse);
                });
                
				correctAnswer();
			} else {
				answerC.image = IMAGE_PATH+'question/answers/wrong.png';
				
				answerB.opacity = 0.3;
				answerA.opacity = 0.3;
				answerD.opacity = 0.3;
				
				bg.image = IMAGE_PATH+'question/question_back2.png';
				resultWrong.show();
				
				resultWrong.animate(scaleAnimationAnswer, function(){
                    resultWrong.animate(scaleAnimationAnswerInverse);
                });
                
				wrongAnswer(false);
				
				//highlight correct answer
				currentCorrectAnswerImage.opacity = 1;
				currentCorrectAnswerImage.image = currentCorrectAnswerImagePath;
			}
		},1500);
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
		answerD.image = IMAGE_PATH+'question/answers/pressed.png';
		
		//Blink the selected answer
		var blinkCounter = 0;
		var on = false;
		var timeout = setTimeout(function(){
			
			//mark user answer as correct/wrong and show outcome
			if(currentCorrectAnswer == 'd'){
				answerD.image = IMAGE_PATH+'question/answers/D.png';
				
				answerB.opacity = 0.3;
				answerC.opacity = 0.3;
				answerA.opacity = 0.3;
				
				bg.image = IMAGE_PATH+'question/question_back2.png';
				resultCorrect.show();
				
				resultCorrect.animate(scaleAnimationAnswer, function(){
                    resultCorrect.animate(scaleAnimationAnswerInverse);
                });
				
				correctAnswer();
			} else {
				answerD.image = IMAGE_PATH+'question/answers/wrong.png';
				
				answerB.opacity = 0.3;
				answerC.opacity = 0.3;
				answerA.opacity = 0.3;
				
				bg.image = IMAGE_PATH+'question/question_back2.png';
				resultWrong.show();
				
				resultWrong.animate(scaleAnimationAnswer, function(){
                    resultWrong.animate(scaleAnimationAnswerInverse);
                });
				
				wrongAnswer(false);
				
				//highlight correct answer
				currentCorrectAnswerImage.opacity = 1;
				currentCorrectAnswerImage.image = currentCorrectAnswerImagePath;
			}
		},1500);
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