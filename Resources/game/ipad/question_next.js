//The View
var viewQuestionNext = Ti.UI.createView({
	backgroundImage:IMAGE_PATH+'signin/background.jpg',
	opacity:0,
	top:0,
	bottom:0,
	left:0,
	right:0,
	zIndex:51
});

//UI positioning
var QUESTION_NEXT_HEIGHT_OFFSET_FOR_LOST_PLAYER = 52;

//UI components
var questionNextWikipediaWebView = null;
var quitShown = false;
var restartShown = false;
var wikipediaURL = null;
var questionNextActivityInd = null;

//Group popup lost player
var questionNextPopupLostBackground = null;//TODO remove lost player alert?
var questionNextPopupLostAvatar = null;
var questionNextPopupLostNameLabel = null;
var questionNextPopupLostImage = null;
var questionNextPlayerLostLabel = null;
var questionNextPopupLostOKButton = null;
var loserAudio = null;
var questionNextPlayerLostScoreLabel = null;
var questionNextPlayerLostScoreValue = null;


var questionNextWikipediaBackground = null;
var questionNextWikipedia = null;
var questionNextLowerBackgroundBar = null;
var questionNextButtonQuit = null;
var questionNextButtonReport = null;
var questionNextButtonRestart = null;
var nextQuestionLabel = null;
var nextQuestionPointsLabel = null;
var questionNextButtonNext = null;

var questionNextWikipediaView = null;
var questionNextWikipedia2 = null;
var closeWikipediaButton = null;

//build
function buildQuestionNextView(){
	Ti.API.info('buildQuestionNextView started! - current player is '+gameSession.getCurrentPlayer());
	
	//Build the Player/Team 1 label
	var questionNextLabelPlayerText = '';
	
	var shouldCreateView = questionNextWikipedia == null;
	if(shouldCreateView){
		
		questionNextWikipediaBackground = Ti.UI.createView({
			backgroundColor:'0b4b7f',
			height:152,
			top:0,
			clicked:'wikipedia'
		});
		
		//Wikipedia image
		questionNextWikipedia = Ti.UI.createImageView({
			image:IMAGE_PATH+'question_next/w.png',
			top:45,
			clicked:'wikipedia'
		});
		
		questionNextWikipediaBackground.add(questionNextWikipedia);
		viewQuestionNext.add(questionNextWikipediaBackground);
		questionNextWikipediaBackground.addEventListener('click', handleQuestionNextWikipedia);
		
		questionNextLowerBackgroundBar = Ti.UI.createView({
			backgroundColor:'0b4b7f',
			height:257,
			bottom:0
		}); 
		
		//Quit button
		questionNextButtonQuit = Ti.UI.createButton({
			backgroundImage:IMAGE_PATH+'question_next/quit.png',
			bottom:33,
			left:52,
			width:155,
			height:217
		});
		
		questionNextLowerBackgroundBar.add(questionNextButtonQuit);
		questionNextButtonQuit.addEventListener('click', handleQuestionNextButtonQuit);
		
		//Report Button
		questionNextButtonReport = Ti.UI.createButton({
			backgroundImage:IMAGE_PATH+'question_next/report.png',
			bottom:33,
			width:155,
			height:217,
			visible:false
		});
		
		questionNextLowerBackgroundBar.add(questionNextButtonReport);
		questionNextButtonReport.addEventListener('click', handleQuestionNextButtonReport);
		
		//Restart Button
		questionNextButtonRestart = Ti.UI.createButton({
			backgroundImage:IMAGE_PATH+'question_next/restart.png',
			bottom:33,
			right:49,
			width:155,
			height:217
		});
		
		questionNextLowerBackgroundBar.add(questionNextButtonRestart);
		questionNextButtonRestart.addEventListener('click', handleQuestionNextButtonRestart);
		
		viewQuestionNext.add(questionNextLowerBackgroundBar);
		
		nextQuestionLabel = Titanium.UI.createLabel({
			text:'ΕΠΟΜΕΝΗ ΕΡΩΤΗΣΗ',
			color:'0b4b7f',
			textAlign:'center',
		    top:250,
			font:{fontSize:47, fontWeight:'semibold', fontFamily:'Myriad Pro'}
		});
		viewQuestionNext.add(nextQuestionLabel);
		
		//The text we show in the next question image
		nextQuestionPointsLabel = Titanium.UI.createLabel({
			text:gameSession.getCurrentPlayer().questions.data[currentQIndex].value + ' ΠΟΝΤΟΙ',
			color:'0b4b7f',
			textAlign:'center',
		    top:322,
		    left:5,
		    right:5,
			font:{fontSize:33, fontWeight:'regular', fontFamily:'Myriad Pro'}
		});
		viewQuestionNext.add(nextQuestionPointsLabel);
		
		//Next animated button 
		questionNextButtonNext = Ti.UI.createButton({
			backgroundImage:IMAGE_PATH+'question_next/next.png',
			top:408,
			width:261,
			height:261
		});
		
		viewQuestionNext.add(questionNextButtonNext);
		questionNextButtonNext.addEventListener('click', handleQuestionNextButtonNext);
		animateButtonNext();
		
		questionNextWikipediaView = Ti.UI.createView({
			backgroundColor:'black',
			bottom:1020,
			zIndex:52
		});
		viewQuestionNext.add(questionNextWikipediaView);
		
		questionNextWikipedia2 = Ti.UI.createImageView({
			image:IMAGE_PATH+'question_next/button_wiki.png',
			top:25
		});
		
		questionNextWikipediaView.add(questionNextWikipedia2);
		
		closeWikipediaButton = Ti.UI.createButton({
			backgroundImage:IMAGE_PATH+'question_next/wikipedia/x.png',
			top:30,
			right:20,
			clicked:'x',
			width:38,
			height:32
		});
		
		questionNextWikipediaView.add(closeWikipediaButton);
		closeWikipediaButton.addEventListener('click', handleQuestionNextWikipedia);
				
		win.add(viewQuestionNext);
	}else {
		Ti.API.warn('NOT building QuestionNext view - already in progress');
	}
}

function handleWikipediaLoad(){
	Ti.API.info('WIKI LOADED');
	
	//destory activity indicator if needed
	if(questionNextActivityInd != null){
		questionNextWikipediaWebView.remove(questionNextActivityInd);
		questionNextActivityInd = null;
	}	
}

/*Creates and displays the popup when a player looses*/
function showQuestionNextPopupLost(){
	loserAudio = Ti.Media.createSound({url:'sounds/loser3.caf', looping:false, volume:1.0});
	
	questionNextButtonRestart.hide();
	questionNextButtonReport.hide();
	questionNextButtonQuit.hide();
	questionNextWikipedia.hide();
	
	questionNextPopupLostBackground = Ti.UI.createImageView({
		image:IMAGE_PATH+'question_next/lost/popup.png',
		transform:SCALE_ZERO,
		top:110
	});
	
	questionNextPopupLostAvatar = Ti.UI.createImageView({
		image:IMAGE_PATH+'player_selection/avatars/'+gameSession.getLastLostPlayer().avatarFile,
		top:1,
		zIndex:10
	});
	
	questionNextPopupLostNameLabel = Ti.UI.createLabel({
		text:gameSession.getLastLostPlayer().name,
		top:210,
		textAlign:'center',
		height:90,
		width:480,
		color:'white',
		font:{fontSize: 70, fontWeight: 'regular', fontFamily:'Myriad Pro'}
	});
	
	questionNextPopupLostImage = Ti.UI.createImageView({
		image:IMAGE_PATH+'question_next/lost/no_lives.png',
		top:305,
		zIndex:10
	});
	
	questionNextPlayerLostLabel = Ti.UI.createLabel({
		text:getLooserTip(),
		top:470,
		textAlign:'center',
		height:90,
		width:480,
		color:'white',
		font:{fontSize: 25, fontWeight: 'regular', fontFamily:'Myriad Pro'}
	});
	
	questionNextPopupLostOKButton = Ti.UI.createButton({
		backgroundImage:IMAGE_PATH+'question_next/lost/ok.png',
		bottom:60,
		width:189,
		height:71
	});
	
	questionNextPlayerLostScoreLabel = Ti.UI.createLabel({
		text:"SCORE:",
		bottom:100,
		textAlign:'center',
		height:90,
		width:200,
		color:'white',
		font:{fontSize: 38, fontWeight: 'bold', fontFamily:'Myriad Pro'}
	});
	
	questionNextPlayerLostScoreValue = Ti.UI.createLabel({
		text:gameSession.getLastLostPlayer().score,
		bottom:-5,
		textAlign:'center',
		height:120,
		width:300,
		color:'#fee902',
		font:{fontSize: 85, fontWeight: 'bold', fontFamily:'321Impact'}
	});
	
	questionNextPopupLostBackground.add(questionNextPopupLostAvatar);
	questionNextPopupLostBackground.add(questionNextPopupLostNameLabel);
	questionNextPopupLostBackground.add(questionNextPopupLostImage);
	questionNextPopupLostBackground.add(questionNextPlayerLostLabel);
	questionNextPopupLostBackground.add(questionNextPopupLostOKButton);
	viewQuestionNext.add(questionNextPlayerLostScoreLabel);
	viewQuestionNext.add(questionNextPlayerLostScoreValue);
	
	questionNextPopupLostOKButton.addEventListener('click', hideQuestionNextPopupLost);
	viewQuestionNext.add(questionNextPopupLostBackground);
	
	if(SOUNDS_MODE){
		loserAudio.play();
	}
	
	questionNextPopupLostBackground.animate({transform:SCALE_ONE, duration:300});
}

/*Destroys and hides the popup when a player looses*/
function hideQuestionNextPopupLost(){
	if(SOUNDS_MODE){
 		audioBack.play();
 	}
 	
	questionNextPopupLostOKButton.removeEventListener('click', hideQuestionNextPopupLost);
	
	viewQuestionNext.remove(questionNextPopupLostAvatar);
	questionNextPopupLostBackground.remove(questionNextPopupLostNameLabel);
	questionNextPopupLostBackground.remove(questionNextPopupLostImage);
	questionNextPopupLostBackground.remove(questionNextPlayerLostLabel);
	questionNextPopupLostBackground.remove(questionNextPopupLostOKButton);
	
	viewQuestionNext.remove(questionNextPlayerLostScoreLabel);
	viewQuestionNext.remove(questionNextPlayerLostScoreValue);
	
	questionNextPopupLostBackground.animate({transform:SCALE_ZERO, duration:300});
	
	questionNextButtonRestart.show();
	questionNextButtonReport.show();
	questionNextButtonQuit.show();
	questionNextWikipedia.show();
	viewQuestionNext.remove(questionNextPopupLostBackground);
	
	loserAudio = null;
	questionNextPopupLostBackground = null;
	questionNextPopupLostAvatar = null;
	questionNextPopupLostNameLabel = null;
	questionNextPopupLostImage = null;
	questionNextPlayerLostLabel = null;
	questionNextPopupLostOKButton = null;
	questionNextPlayerLostScoreLabel = null;
	questionNextPlayerLostScoreValue = null;
}

/*Updates the UI components to reflect the current state of the game (e.g. active player etc.)*/
function updateQuestionNextView(fromResumeEvent){
	
	questionNextWikipedia.show();
	questionNextButtonReport.show();
	
	//Show lost player, if any
	if(gameSession.getLastLostPlayer() != null){
		showQuestionNextPopupLost();
	}
	
	var questionNextLabelPlayerText = '';
	
	if(gameSession.getGameGroupType() == BUZZ_GROUP_TYPE_PLAYERS){
		questionNextLabelPlayerText = 'Player ' + gameSession.getCurrentPlayer().playerIndex;
	} else if(gameSession.getGameGroupType() == BUZZ_GROUP_TYPE_TEAMS){
		questionNextLabelPlayerText = 'Team ' + gameSession.getCurrentPlayer().playerIndex;
	}
	
	//Update player index and name
	if(!fromResumeEvent){
		var tmpQuestionIdx = gameSession.getCurrentPlayer().questionIndex;
		nextQuestionPointsLabel.text = gameSession.getCurrentPlayer().questions.data[tmpQuestionIdx].value + ' ΠΟΝΤΟΙ';
	} else {
		nextQuestionPointsLabel.text = '(Hey, αυτό δεν είναι δίκαιο!)';
	}
}

function destroyQuestionNextView(){
	Ti.API.info('destroyQuestionNextView started!');
	
	var shouldDestroyView = questionNextWikipedia != null;
	if(shouldDestroyView){
		
		questionNextWikipediaBackground.removeEventListener('click', handleQuestionNextWikipedia);
		closeWikipediaButton.removeEventListener('click', handleQuestionNextWikipedia);
		questionNextButtonNext.removeEventListener('click', handleQuestionNextButtonNext);
		questionNextButtonRestart.removeEventListener('click', handleQuestionNextButtonRestart);
		questionNextButtonQuit.removeEventListener('click', handleQuestionNextButtonQuit);
		questionNextButtonReport.removeEventListener('click', handleQuestionNextButtonReport);
		
		viewQuestionNext.remove(questionNextWikipedia);
		
		viewQuestionNext.remove(questionNextButtonNext);
		viewQuestionNext.remove(questionNextButtonQuit);
		viewQuestionNext.remove(questionNextButtonRestart);
		viewQuestionNext.remove(questionNextButtonReport);
		viewQuestionNext.remove(questionNextWikipediaView);
		questionNextWikipediaView.remove(questionNextWikipedia2);
		questionNextWikipediaView.remove(closeWikipediaButton);
		viewQuestionNext.remove(nextQuestionPointsLabel);
		viewQuestionNext.remove(nextQuestionLabel);
		viewQuestionNext.remove(questionNextWikipediaBackground);
		questionNextWikipediaBackground.remove(questionNextWikipedia);
		
		questionNextLowerBackgroundBar.remove(questionNextButtonQuit);
		questionNextLowerBackgroundBar.remove(questionNextButtonReport);
		questionNextLowerBackgroundBar.remove(questionNextButtonRestart);
		
		viewQuestionNext.remove(questionNextLowerBackgroundBar);
		
		//The text we show in the next question image
		nextQuestionPointsLabel = null;
		//Wikipedia image
		questionNextWikipedia = null;
		//Next animated button 
		questionNextButtonNext = null;
		//Quit button
		questionNextButtonQuit = null;
		 //Report Button
		questionNextButtonReport = null;
		//Restart Button
		questionNextButtonRestart = null;
		questionNextWikipediaView = null;
		questionNextWikipedia2 = null;
		closeWikipediaButton = null;
		questionNextWikipediaBackground = null;
		questionNextLowerBackgroundBar = null;
		nextQuestionLabel = null;
		
		win.remove(viewQuestionNext);
	}else {
		Ti.API.warn('NOT destroying QuestionNext view - already in progress');
	}
}
//animate next button
function animateButtonNext(){
	//questionNextButtonNext.animate(scaleAnimation);
}

function populatePopupQuitTableData(){
	var tableRows = [];
	var selectedRowColor = '#f42025';
	var rowClassname = 'replayButtonTable';
/*
	var row1 = Ti.UI.createTableViewRow({
		className:'replayButtonTable',
		height:75,
		selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE
	});
	
	var scoresReplayButtonDottedLine = Titanium.UI.createImageView({
		image:IMAGE_PATH+'question_next/quit/dotted_lines.png',
		bottom:0
	});*/
	
	var scoresReplayButtonDottedLine2 = Titanium.UI.createImageView({
		image:IMAGE_PATH+'question_next/quit/dotted_lines.png',
		bottom:0
	});
	
	var row2 = Ti.UI.createTableViewRow({
		className:rowClassname,
		selectedBackgroundColor:selectedRowColor,
		height:84,
		quitOption:1
	});
	
	var row3 = Ti.UI.createTableViewRow({
		className:rowClassname,
		height:80,
		selectedBackgroundColor:selectedRowColor,
		quitOption:-1
	});
	
	/*
	var replayLabel1 = Titanium.UI.createLabel({
		text:'ΑΠΟΧΩΡΗΣΗ ΠΑΙΧΤΗ',
		color:'white',
		textAlign:'center',
		width:140,
		top:7,
		font:{fontSize:23, fontWeight:'bold', fontFamily:'Myriad Pro'}
	});*/
	
	var replayLabel2 = Titanium.UI.createLabel({
		text:'ΚΛΕΙΣΙΜΟ ΠΑΡΤΙΔΑΣ',
		top:16,
		width:110,
		color:'white',
		textAlign:'center',
		font:{fontSize:23, fontWeight:'bold', fontFamily:'Myriad Pro'}
	});
	
	var replayLabel3 = Titanium.UI.createLabel({
		text:'ΑΚΥΡΟ /\nΕΠΙΣΤΡΟΦΗ',
		top:15,
		width:220,
		color:'white',
		textAlign:'center',
		font:{fontSize:23, fontWeight:'bold', fontFamily:'Myriad Pro'}
	});
	
	//row1.add(replayLabel1);
	row2.add(replayLabel2);
	row3.add(replayLabel3);
	//row1.add(scoresReplayButtonDottedLine);
	row2.add(scoresReplayButtonDottedLine2);
	//tableRows.push(row1);
	tableRows.push(row2);
	tableRows.push(row3);
	
	return tableRows;
}

function populatePopupRestartTableData(){
	var tableRows = [];
	var selectedRowColor = '#4a9b3c';
	var className = 'replayButtonTable';
	
	var row1 = Ti.UI.createTableViewRow({
		className:className,
		height:82,
		selectedBackgroundColor:selectedRowColor,
		restartOption:1
	});
	
	var scoresReplayButtonDottedLine = Titanium.UI.createImageView({
		image:IMAGE_PATH+'question_next/quit/dotted_lines.png',
		bottom:0
	});
	
	var row2 = Ti.UI.createTableViewRow({
		className:className,
		height:80,
		selectedBackgroundColor:selectedRowColor,
		restartOption:-1
	});
	
	var replayLabel1 = Titanium.UI.createLabel({
		text:'ΕΠΑΝΕΚΙΝΗΣΗ ΠΑΡΤΙΔΑΣ',
		color:'white',
		textAlign:'center',
		width:170,
		top:10,
		font:{fontSize:23, fontWeight:'bold', fontFamily:'Myriad Pro'}
	});
	
	var replayLabel2 = Titanium.UI.createLabel({
		text:'ΑΚΥΡΟ /\nΕΠΙΣΤΡΟΦΗ',
		top:18,
		width:170,
		color:'white',
		textAlign:'center',
		font:{fontSize:23, fontWeight:'bold', fontFamily:'Myriad Pro'}
	});
	
	row1.add(replayLabel1);
	row2.add(replayLabel2);
	row1.add(scoresReplayButtonDottedLine);
	tableRows.push(row1);
	tableRows.push(row2);
	
	return tableRows;
}

//handle wikipedia button
function handleQuestionNextWikipedia(e){
	
	//hide the popup
 	quitShown=false;
 	restartShown=false;
	
	var clickedButton = e.source.clicked;
	
	if(clickedButton == 'wikipedia'){
		
		//Show the wikipedia link if online
		if(Titanium.Network.online){
			var wikipediaURL = gameSession.getWikipediaURL();
			Ti.API.info('Try to show wiki url '+wikipediaURL);
			
			//recreate the webview
			if(questionNextWikipediaWebView == null){
				
				questionNextActivityInd = Ti.UI.createActivityIndicator({
					style:Titanium.UI.iPhone.ActivityIndicatorStyle.BIG
				});
				
				questionNextWikipediaWebView = Ti.UI.createWebView({
					top:114,
					left:10,
					right:10,
					bottom:10,
					backgroundColor:'black'
				});
				
				questionNextWikipediaWebView.add(questionNextActivityInd);
				questionNextActivityInd.show();
				
				questionNextWikipediaView.add(questionNextWikipediaWebView);
				questionNextWikipediaWebView.addEventListener('load', handleWikipediaLoad);
				questionNextWikipediaWebView.setUrl(wikipediaURL);
			}
			
			questionNextWikipediaView.animate({bottom:0, duration:280});
		} else {
			//TODO make this nicer
			alert(MSG_NO_INTERNET_CONNECTION);
		}
		
	}else if (clickedButton == 'x'){
		//destroy activity indicator if needed
		if(questionNextActivityInd != null){
			questionNextWikipediaWebView.remove(questionNextActivityInd);
			questionNextActivityInd = null;
		}
		
		//destroy wikipedia web view if needed
		if(questionNextWikipediaWebView != null){
			questionNextWikipediaWebView.removeEventListener('load', handleWikipediaLoad);
			questionNextWikipediaView.remove(questionNextWikipediaWebView);
			questionNextWikipediaWebView = null;
		}
		
		questionNextWikipediaView.animate({bottom:1020,duration:350});
	}
}

/*Handle the NEXT button*/
function handleQuestionNextButtonNext(){
	if(SOUNDS_MODE){
		audioClick.play();	
	}
	
	//hide the popup
 	quitShown=false;
 	restartShown=false;
	
	var dummyTimeoutValue = 0;
	
	buildQuestionView(gameSession.getCurrentCategoryBanner());
	
	if(!gameSession.hasGameStarted()){
		Ti.API.info('Game HASNT started so fire the event..');
		//show questions view
		viewQuestion.fireEvent('gameStart');
		viewQuestion.animate(anim_in);
		
		//hide the loader
		viewLoader.opacity = 0;
		dummyTimeoutValue = 400;
	} else {
		nextQuestion(false);
		dummyTimeoutValue = 0;
	}
		
	setTimeout(function(){
		//always hide next question view
		viewQuestionNext.opacity = 0;
		
		//Reposition the elements if needed
		if(gameSession.getLastLostPlayer() != null){
			//Reset the lost player so we wont show again until we need to
			gameSession.resetLastLostPlayer();
			
			//Move next player labels back to their original state
			if(questionNextPlayerLostLabel != null){
				questionNextPlayerLostLabel.text = '';
			}
		}
	}, dummyTimeoutValue);	
	
} 

/*Handle the quit button (toggle the popup)*/
function handleQuestionNextButtonQuit(){
	if(SOUNDS_MODE){
 		audioClick.play();
 	}
	
	if(gameSession.getQuestionIndex() > 0){
		questionNextButtonReport.show();
	}
	
	quitGame();
	
}

/*Handle the selection of a quit option in the popup*/
function handleQuestionNextQuitPopupSelection(e){
	var selectedQuitOption = e.row.quitOption;
	
	//hide the popup
 	quitShown=false;
 	
 	questionNextButtonRestart.show();
 	
}

/*Handle the selection of a restart option in the popup*/
function handleQuestionNextRestartPopupSelection(e){
	var selectedRestartOption = e.row.restartOption;
	
	//hide the popup and show the other buttons again
 	restartShown=false;
 	
 	questionNextButtonQuit.show();
 	
 	if(gameSession.getQuestionIndex() > 0){
 		questionNextButtonReport.show();
 	}
	
	//restart if needed
	if(selectedRestartOption == 1){
		restartGame(false);
	}
}

/*Handle the report button*/
function handleQuestionNextButtonReport(){
	if(SOUNDS_MODE){
 		audioClick.play();
 	}
 	
	mtbImport("question_report.js");
	buildQuestionReportView();
	
	var curlDown = Titanium.UI.createAnimation();
	curlDown.transition = Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT;
	curlDown.duration = 800;
	curlDown.opacity = 1;
	
	reportWin.open(curlDown);
	viewQuestionReport.opacity = 1;
}

/*Handle the restart button (toggle the popup)*/
function handleQuestionNextButtonRestart(){
	if(SOUNDS_MODE){
 		audioClick.play();
 	}
 	
	if(gameSession.getQuestionIndex() > 0){
 		questionNextButtonReport.show();
 	}
	
	restartGame(false);
}