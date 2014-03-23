//The View
var viewQuestionNext = Ti.UI.createView({
	backgroundImage:IMAGE_PATH+'background.jpg',
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
var questionNextLogo = null;
var questionNextButtonRestart = null;
var questionNextButtonReport = null;
var questionNextButtonQuit = null;
var questionNextButtonNext = null;
var questionNextLabelPlayerName = null;
var questionNextLabelPlayerNo = null;
var questionNextWikipedia = null;
var questionNextBackground = null;
var questionNextArrowLeft = null;
var questionNextArrowRight = null;

var questionNextButtonQuitPopup = null;
var questionNextButtonRestartPopup = null;
var questionNextWikipediaWebView = null;
var quitShown = false;
var restartShown = false;

var questionNextWikipediaView = null;
var nextQuestionPointsLabel = null;
var questionNextWikipedia2 = null;
var wikipediaURL = null;

var questionNextQuitPopupTable = null;
var questionNextRestartPopupTable = null;
var closeWikipediaButton = null;
var questionNextActivityInd = null;

//Group popup lost player
var questionNextPopupLostBackground = null;
var questionNextPopupLostAvatar = null;
var questionNextPopupLostNameLabel = null;
var questionNextPopupLostImage = null;
var questionNextPlayerLostLabel = null;
var questionNextPopupLostOKButton = null;
var loserAudio = null;

var questionNextPlayerLostScoreLabel = null;
var questionNextPlayerLostScoreValue = null;

//build
function buildQuestionNextView(){
	Ti.API.info('buildQuestionNextView started! - current player is '+gameSession.getCurrentPlayer());
	
	//Build the Player/Team 1 label
	var questionNextLabelPlayerText = '';
	var questionNextPlayImageButton = '';
	var questionNextLogoImg = '';
	
	if(gameSession.getGameType() == BUZZ_GAME_GROUP){
		if(gameSession.getGameGroupType() == BUZZ_GROUP_TYPE_PLAYERS){
			questionNextLabelPlayerText = 'Player ' + gameSession.getCurrentPlayer().playerIndex;
			questionNextLogoImg = IMAGE_PATH+'categories/r/logo/icon_group.png';
		} else if(gameSession.getGameGroupType() == BUZZ_GROUP_TYPE_TEAMS){
			questionNextLabelPlayerText = 'Team ' + gameSession.getCurrentPlayer().playerIndex;
			questionNextLogoImg = IMAGE_PATH+'categories/r/logo/icon_teams.png';
		}
	} else if(gameSession.getGameType() == BUZZ_GAME_SOLO){
		questionNextLogoImg = IMAGE_PATH+'categories/r/logo/solo.png';
	}
	
	
	var shouldCreateView = questionNextLogo == null;
	if(shouldCreateView){
		//Blue Background
		questionNextBackground = Ti.UI.createImageView({
			image:gameSession.getGameType() == BUZZ_GAME_SOLO ? IMAGE_PATH+'question_next/background_solo.png' : IMAGE_PATH+'question_next/background.png',
			top:0
		});
		
		viewQuestionNext.add(questionNextBackground);
		
		//Hands Logo
		questionNextLogo = Ti.UI.createImageView({
			image:questionNextLogoImg,
			right:15,
			top:15
		});
		
		viewQuestionNext.add(questionNextLogo);
	
		//Wikipedia image
		questionNextWikipedia = Ti.UI.createButton({
			backgroundImage:IMAGE_PATH+'question_next/button_wiki.png',
			top:25,
			width:201,
			height:60,
			clicked:'wikipedia',
			visible:false
		});
		
		viewQuestionNext.add(questionNextWikipedia);
		questionNextWikipedia.addEventListener('click', handleQuestionNextWikipedia);
		
		//Number of the player label
		questionNextLabelPlayerNo = Ti.UI.createLabel({
			text:questionNextLabelPlayerText,
			top:210,
			textAlign:'center',
			height:130,
			width:280,
			color:'yellow',
			font:{fontSize: 63, fontWeight: 'bold', fontFamily:'321Impact'}
		});
		
		questionNextBackground.add(questionNextLabelPlayerNo);
		
		if(gameSession.getGameType() == BUZZ_GAME_SOLO){
			questionNextPlayImageButton = IMAGE_PATH+'question_next/button_next.png';
			
			//The text we show in the next question image
			nextQuestionPointsLabel = Titanium.UI.createLabel({
				text:gameSession.getCurrentPlayer().questions.data[currentQIndex].value + ' Πόντοι',
				color:'white',
				shadowColor:'gray',
				textAlign:'center',
			    shadowOffset:{x:1,y:1},
			    zIndex:10,
			    top:300,
			    left:5,
			    right:5,
				font:{fontSize:33, fontWeight:'bold', fontFamily:'Myriad Pro'}
			});
			
			questionNextBackground.add(nextQuestionPointsLabel);
		} else {
			
			questionNextPlayImageButton = IMAGE_PATH+'player_selection/avatars_next/'+gameSession.getCurrentPlayer().avatarFile;
			
			//Name of the player label
			questionNextLabelPlayerName = Ti.UI.createLabel({
				text:gameSession.getCurrentPlayer().name,
				top:325,
				textAlign:'center',
				height:70,
				width:650,
				color:'white',
				font:{fontSize: 63, fontWeight: 'regular', fontFamily:'Myriad Pro'}
			});
			
			questionNextBackground.add(questionNextLabelPlayerName);
			
			//create left/right arrows surrounding the avatar icon
			questionNextArrowLeft = Ti.UI.createImageView({
				image:IMAGE_PATH+'question_next/arrow_r.png',
				top:600,
				left:206
			});
			
			viewQuestionNext.add(questionNextArrowLeft);
			
			questionNextArrowRight = Ti.UI.createImageView({
				image:IMAGE_PATH+'question_next/arrow_l.png',
				top:600,
				right:206
			});
			
			viewQuestionNext.add(questionNextArrowRight);
		}
		
		questionNextPlayerLostLabel = Ti.UI.createLabel({
			text:'',
			top:150,
			textAlign:'center',
			height:90,
			width:480,
			color:'white',
			font:{fontSize: 27, fontWeight: 'regular', fontFamily:'Myriad Pro'}
		});
		
		questionNextBackground.add(questionNextPlayerLostLabel);
		
		//Next animated button 
		questionNextButtonNext = Ti.UI.createButton({
			backgroundImage:questionNextPlayImageButton,
			top:gameSession.getGameType() == BUZZ_GAME_SOLO ? 400 : 465,
			width:256,
			height:256
		});
		
		viewQuestionNext.add(questionNextButtonNext);
		questionNextButtonNext.addEventListener('click', handleQuestionNextButtonNext);
		animateButtonNext();
		
		//Quit button
		questionNextButtonQuit = Ti.UI.createButton({
			backgroundImage:IMAGE_PATH+'question_next/button_quit.png',
			bottom:20,
			left:30,
			width:127,
			height:160
		});
		
		viewQuestionNext.add(questionNextButtonQuit);
		questionNextButtonQuit.addEventListener('click', handleQuestionNextButtonQuit);
		 
		 //Report Button
		questionNextButtonReport = Ti.UI.createButton({
			backgroundImage:IMAGE_PATH+'question_next/button_report.png',
			bottom:20,
			width:127,
			height:160,
			visible:false
		});
		
		viewQuestionNext.add(questionNextButtonReport);
		questionNextButtonReport.addEventListener('click', handleQuestionNextButtonReport);
		
		//Restart Button
		questionNextButtonRestart = Ti.UI.createButton({
			backgroundImage:IMAGE_PATH+'question_next/button_restart.png',
			bottom:20,
			right:30,
			width:127,
			height:160
		});
		
		viewQuestionNext.add(questionNextButtonRestart);
		questionNextButtonRestart.addEventListener('click', handleQuestionNextButtonRestart);
		
		//Quit popup
		questionNextButtonQuitPopup = Ti.UI.createImageView({
			image:IMAGE_PATH+'question_next/quit/quit_bubble.png',
			bottom:40,
			left:154
		});
		
		viewQuestionNext.add(questionNextButtonQuitPopup);
		questionNextButtonQuitPopup.hide();
		
		//Quit popup table
		questionNextQuitPopupTable = Titanium.UI.createTableView({
			backgroundColor:'transparent',
			data:populatePopupQuitTableData(),
			separatorStyle:Ti.UI.iPhone.TableViewSeparatorStyle.NONE,
			showVerticalScrollIndicator:false,
			minRowHeight:40,
			width:292,
			left:34,
			height:160
		});
		
		questionNextButtonQuitPopup.add(questionNextQuitPopupTable);
		questionNextQuitPopupTable.addEventListener('click', handleQuestionNextQuitPopupSelection);
		
		//Restart popup
		questionNextButtonRestartPopup = Ti.UI.createImageView({
			image:IMAGE_PATH+'question_next/restart/restart_bubble.png',
			bottom:40,
			right:154
		});
		
		viewQuestionNext.add(questionNextButtonRestartPopup);
		questionNextButtonRestartPopup.hide();
		
		//Restart popup table
		questionNextRestartPopupTable = Titanium.UI.createTableView({
			backgroundColor:'transparent',
			data:populatePopupRestartTableData(),
			separatorStyle:Ti.UI.iPhone.TableViewSeparatorStyle.NONE,
			showVerticalScrollIndicator:false,
			minRowHeight:40,
			width:292,
			right:34,
			height:160
		});
		
		questionNextButtonRestartPopup.add(questionNextRestartPopupTable);
		questionNextRestartPopupTable.addEventListener('click', handleQuestionNextRestartPopupSelection);
		
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
		
		//Move next player labels to fit the lost player msg
		questionNextLabelPlayerNo.top = questionNextLabelPlayerNo.top + QUESTION_NEXT_HEIGHT_OFFSET_FOR_LOST_PLAYER;
		questionNextLabelPlayerName.top = questionNextLabelPlayerName.top + QUESTION_NEXT_HEIGHT_OFFSET_FOR_LOST_PLAYER;
	}
	
	var questionNextLabelPlayerText = '';
	
	if(gameSession.getGameGroupType() == BUZZ_GROUP_TYPE_PLAYERS){
		questionNextLabelPlayerText = 'Player ' + gameSession.getCurrentPlayer().playerIndex;
	} else if(gameSession.getGameGroupType() == BUZZ_GROUP_TYPE_TEAMS){
		questionNextLabelPlayerText = 'Team ' + gameSession.getCurrentPlayer().playerIndex;
	}
	
	//Update player index and name
	if(gameSession.getGameType() == BUZZ_GAME_GROUP){
		questionNextLabelPlayerNo.text = questionNextLabelPlayerText;
		questionNextLabelPlayerName.text = gameSession.getCurrentPlayer().name;
		questionNextButtonNext.setBackgroundImage(IMAGE_PATH+'player_selection/avatars_next/'+gameSession.getCurrentPlayer().avatarFile);
	} else if(gameSession.getGameType() == BUZZ_GAME_SOLO){
		if(!fromResumeEvent){
			var tmpQuestionIdx = gameSession.getCurrentPlayer().questionIndex;
			nextQuestionPointsLabel.text = gameSession.getCurrentPlayer().questions.data[tmpQuestionIdx].value + ' Πόντοι';
		} else {
			nextQuestionPointsLabel.text = '(Hey, αυτό δεν είναι δίκαιο!)';
		}
	}
}

function destroyQuestionNextView(){
	Ti.API.info('destroyQuestionNextView started!');
	
	var shouldDestroyView = questionNextLogo != null;
	if(shouldDestroyView){
		
		questionNextWikipedia.removeEventListener('click', handleQuestionNextWikipedia);
		
		viewQuestionNext.remove(questionNextBackground);
		viewQuestionNext.remove(questionNextLogo);
		viewQuestionNext.remove(questionNextWikipedia);
		questionNextBackground.remove(questionNextLabelPlayerNo);
		
		if(gameSession.getGameType() == BUZZ_GAME_SOLO){
			questionNextBackground.remove(nextQuestionPointsLabel);
			//The text we show in the next question image
			nextQuestionPointsLabel = null;
		} else {
			questionNextBackground.remove(questionNextLabelPlayerName);
			//Name of the player label
			questionNextLabelPlayerName = null;
			
			//left/right arrows
			viewQuestionNext.remove(questionNextArrowLeft);
			viewQuestionNext.remove(questionNextArrowRight);
			
			questionNextArrowLeft = null;
			questionNextArrowRight = null;
		}
		
		questionNextButtonNext.removeEventListener('click', handleQuestionNextButtonNext);
		questionNextButtonQuit.removeEventListener('click', handleQuestionNextButtonQuit);
		questionNextButtonReport.removeEventListener('click', handleQuestionNextButtonReport);
		questionNextButtonRestart.removeEventListener('click', handleQuestionNextButtonRestart);
		questionNextQuitPopupTable.removeEventListener('click', handleQuestionNextQuitPopupSelection);
		questionNextRestartPopupTable.removeEventListener('click', handleQuestionNextRestartPopupSelection);
		closeWikipediaButton.removeEventListener('click', handleQuestionNextWikipedia);
		
		viewQuestionNext.remove(questionNextButtonNext);
		
		if(questionNextPlayerLostLabel != null){
			questionNextBackground.remove(questionNextPlayerLostLabel);
		}
		
		viewQuestionNext.remove(questionNextButtonQuit);
		viewQuestionNext.remove(questionNextButtonRestart);
		viewQuestionNext.remove(questionNextButtonQuitPopup);
		viewQuestionNext.remove(questionNextButtonReport);
		questionNextButtonQuitPopup.remove(questionNextQuitPopupTable);
		viewQuestionNext.remove(questionNextButtonRestartPopup);
		questionNextButtonRestartPopup.remove(questionNextRestartPopupTable);
		viewQuestionNext.remove(questionNextWikipediaView);
		questionNextWikipediaView.remove(questionNextWikipedia2);
		questionNextWikipediaView.remove(closeWikipediaButton);
		
		//Hands Logo
		questionNextLogo = null;
		//Blue Background
		questionNextBackground = null;
		//Wikipedia image
		questionNextWikipedia = null;
		//Number of the player label
		questionNextLabelPlayerNo = null;
		//Next animated button 
		questionNextButtonNext = null;
		questionNextPlayerLostLabel = null;
		//Quit button
		questionNextButtonQuit = null;
		 //Report Button
		questionNextButtonReport = null;
		//Restart Button
		questionNextButtonRestart = null;
		//Quit popup
		questionNextButtonQuitPopup = null;
		//Quit popup table
		questionNextQuitPopupTable = null;
		//Restart popup
		questionNextButtonRestartPopup = null;
		//Restart popup table
		questionNextRestartPopupTable = null;
		questionNextWikipediaView = null;
		questionNextWikipedia2 = null;
		closeWikipediaButton = null;
		
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
	questionNextButtonQuitPopup.hide();
 	quitShown=false;
 	questionNextButtonRestartPopup.hide();
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
	questionNextButtonQuitPopup.hide();
 	quitShown=false;
 	questionNextButtonRestartPopup.hide();
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
			questionNextLabelPlayerNo.top = questionNextLabelPlayerNo.top - QUESTION_NEXT_HEIGHT_OFFSET_FOR_LOST_PLAYER;
			questionNextLabelPlayerName.top = questionNextLabelPlayerName.top - QUESTION_NEXT_HEIGHT_OFFSET_FOR_LOST_PLAYER;
		}
	}, dummyTimeoutValue);	
	
} 

/*Handle the quit button (toggle the popup)*/
function handleQuestionNextButtonQuit(){
	if(SOUNDS_MODE){
 		audioClick.play();
 	}
	
	if(!quitShown){
		questionNextButtonQuitPopup.show();
		quitShown=true;
		questionNextButtonRestart.hide();
		questionNextButtonReport.hide();
	}else{
		questionNextButtonQuitPopup.hide();
	 	quitShown=false;
	 	questionNextButtonRestart.show();
	 	
	 	if(gameSession.getQuestionIndex() > 0){
			questionNextButtonReport.show();
		}
	}
}

/*Handle the selection of a quit option in the popup*/
function handleQuestionNextQuitPopupSelection(e){
	var selectedQuitOption = e.row.quitOption;
	
	//hide the popup
	questionNextButtonQuitPopup.hide();
 	quitShown=false;
 	
 	questionNextButtonRestart.show();
 	
 	if(gameSession.getQuestionIndex() > 0){
		questionNextButtonReport.show();
	}
	
	//and quit if needed
	if(selectedQuitOption == 1){
		quitGame();
	}
}

/*Handle the selection of a restart option in the popup*/
function handleQuestionNextRestartPopupSelection(e){
	var selectedRestartOption = e.row.restartOption;
	
	//hide the popup and show the other buttons again
	questionNextButtonRestartPopup.hide();
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
 	
	if(!restartShown){
		questionNextButtonRestartPopup.show();
		restartShown=true;
		questionNextButtonQuit.hide();
		questionNextButtonReport.hide();
	}else{
		questionNextButtonRestartPopup.hide();
	 	restartShown=false;
	 	questionNextButtonQuit.show();
	 	
	 	if(gameSession.getQuestionIndex() > 0){
			questionNextButtonReport.show();
		}
	}
}