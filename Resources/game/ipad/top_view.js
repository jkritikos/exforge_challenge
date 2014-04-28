var hasFriendScoresToRender = false;
var selectedCategoryScores = '';

var tabAllSelected = IMAGE_PATH+'top/tabAllSelected.png';
var tabAllDeselected = IMAGE_PATH+'top/tabAllDeselected.png';
var tabFriendsSelected = IMAGE_PATH+'top/tabFriendsSelected.png';
var tabFriendsDeselected = IMAGE_PATH+'top/tabFriendsDeselected.png';

//The view
var viewTopCategory = Ti.UI.createView({
	backgroundImage:IMAGE_PATH+'signin/background.jpg',
	opacity:0,
	top:0,
	bottom:0,
	left:0,
	right:0
});

viewTopCategory.addEventListener('startHighScoresAnimation', function(){
	startHighScoresUpdateAnimation();
});

viewTopCategory.addEventListener('stopHighScoresAnimation', function(){
	stopHighScoresUpdateAnimation();
});

//Back button
var backHomeFromTopButton = Titanium.UI.createButton({
	backgroundImage:IMAGE_PATH+'categories/back.png',
	left:30,
	top:25,
	width:55,
	height:55
});
	
viewTopCategory.add(backHomeFromTopButton);

//Back button event listener
backHomeFromTopButton.addEventListener('click', function() {
	handleHomeSelection();
});

//UI components (while updating scores)
var highScoresActivityIndicator = null;

//UI properties
var bigFont = 25;
var smallFont = 18;

//UI components
var noScoresConnectionView = null;
var noScoresOopsImage = null;
var noScoresLabel = null;
var noScoresPlayButton = null;
var rankingsCategoryTag = null;

//Bottom bar components
var scoresCategoryPopup = null;
var scoresCategoriesSelectionTable = null;

//handle variables
var categoryScoresShown = false;
var replayShown = false;
var highScoresSelectedGameType = null;
var topViewAfterGameplay = null;

var rankingsTitleBackgroundBar = null;
var rankingsLogoImage = null;
var rankingsTitleLabel = null;
var rankingsBottomBackgroundBar = null;
var rankingsCategorySelectionButton = null;

var rankingsReplayButton = null;
var rankingsButtonDottedLine = null;
var rankingsHomeButton = null;

//Init table views to maintain them across instatiations
/*Table view for ALL highscores*/
var tableViewGlobalScores = Titanium.UI.createTableView({
	data:[],
	minRowHeight:37,
	backgroundColor:'transparent',
	separatorStyle:Ti.UI.iPhone.TableViewSeparatorStyle.NONE,
	top:206,
	bottom:115
});

/*Table view for FRIEND highscores*/
var tableViewFriendsScores = Titanium.UI.createTableView({
	data:[],
	minRowHeight:37,
	backgroundColor:'transparent',
	separatorStyle:Ti.UI.iPhone.TableViewSeparatorStyle.NONE,
	top:290,
	bottom:75,
	visible:false
});
	
//Add the tables to the view
viewTopCategory.add(tableViewGlobalScores);

//Data components
var selectedCategoryInHighScores = null;

function buildTopScoresView(currentCategoryId, afterGameplay){
	var shouldCreateView = rankingsCategoryTag == null;
	
	if(shouldCreateView){
		VIEWING_HIGH_SCORES = true;
		selectedCategoryInHighScores = currentCategoryId;
		topViewAfterGameplay = afterGameplay;
		
		Ti.API.warn('buildTopScoresView() called for '+currentCategoryId);
		
		//title background bar
		rankingsTitleBackgroundBar = Titanium.UI.createView({
			backgroundColor:'0b4b7f',
			height:192,
			top:0
		});
		
		rankingsTitleBackgroundBar.add(backHomeFromTopButton);
		
		//Selected category banner
		rankingsCategoryTag = Titanium.UI.createImageView({
			image:'',
			top:-10
		});
		rankingsTitleBackgroundBar.add(rankingsCategoryTag);
		
		//logo image
		rankingsLogoImage = Titanium.UI.createImageView({
			image:IMAGE_PATH+'top/rankings_icon.png',
			top:20,
			right:31
		});
		rankingsTitleBackgroundBar.add(rankingsLogoImage);
		
		//Name Label value
		rankingsTitleLabel = Titanium.UI.createLabel({
			text:'ΚΑΤΑΤΑΞΗ',
			color:'white',
			top:103,
			font:{fontSize:64, fontWeight:'bold', fontFamily:'Myriad Pro'}
		});
		rankingsTitleBackgroundBar.add(rankingsTitleLabel);
		
		viewTopCategory.add(rankingsTitleBackgroundBar);
		
		rankingsBottomBackgroundBar = Titanium.UI.createView({
			backgroundColor:'0b4b7f',
			height:115,
			bottom:0
		});
		
		rankingsCategorySelectionButton = Titanium.UI.createButton({
			backgroundImage:IMAGE_PATH+'top/bottom-bar/icon_categ.png',
			left:29,
			width:75,
			height:60
		});
		
		rankingsBottomBackgroundBar.add(rankingsCategorySelectionButton);
		rankingsCategorySelectionButton.addEventListener('click', handleScoresCategorySelection);
		
		//Popup for category button
		scoresCategoryPopup = Titanium.UI.createImageView({
			image:IMAGE_PATH+'top/categ_popup/categ_popup.png',
			left:12,
			bottom:115,
			zIndex:2
		});
		
		//Table view for scores Categories
		scoresCategoriesSelectionTable = Titanium.UI.createTableView({
			backgroundColor:'transparent',
			separatorStyle:Ti.UI.iPhone.TableViewSeparatorStyle.NONE,
			showVerticalScrollIndicator:false,
			minRowHeight:37,
			top:17,
			width:286,
			height:407
		});
		
		var scoresCategoriesTableData = [];
		scoresCategoriesTableData.push(buildScoresCategorySelectionTableData(CAT_EVERYTHING));
		scoresCategoriesTableData.push(buildScoresCategorySelectionTableData(CAT_EXFORGE));
		scoresCategoriesTableData.push(buildScoresCategorySelectionTableData(CAT_EPISTIMI));
		scoresCategoriesTableData.push(buildScoresCategorySelectionTableData(CAT_GEOGRAFIA));
		scoresCategoriesTableData.push(buildScoresCategorySelectionTableData(CAT_ISTORIA));
		scoresCategoriesTableData.push(buildScoresCategorySelectionTableData(CAT_ATHLITIKA));
		scoresCategoriesSelectionTable.setData(scoresCategoriesTableData);
		
		scoresCategoryPopup.add(scoresCategoriesSelectionTable);
		
		scoresCategoriesSelectionTable.addEventListener('click', handleScoresCategoryType);
		
		viewTopCategory.add(scoresCategoryPopup);
		scoresCategoryPopup.hide();
		
		//Only show replay and home buttons if we landed here after a game session
		if(topViewAfterGameplay){
		
			rankingsReplayButton = Titanium.UI.createButton({
				backgroundImage:IMAGE_PATH+'top/bottom-bar/restart.png',
				right:160,
				width:45,
				height:50
			});
			
			rankingsBottomBackgroundBar.add(rankingsReplayButton);
			rankingsReplayButton.addEventListener('click', handleReplayButton); 
			
			//Dotted Line
			rankingsButtonDottedLine = Titanium.UI.createImageView({
				image:IMAGE_PATH+'top/bottom-bar/dotted.png',
				right:119	
			});
			rankingsBottomBackgroundBar.add(rankingsButtonDottedLine);
			
			rankingsHomeButton = Titanium.UI.createButton({
				backgroundImage:IMAGE_PATH+'top/bottom-bar/icon_home.png',
				right:27,
				width:60,
				height:50
			});
			
			rankingsBottomBackgroundBar.add(rankingsHomeButton);
			rankingsHomeButton.addEventListener('click', handleHomeSelection);
		}
		
		viewTopCategory.add(rankingsBottomBackgroundBar);
		
		///////////////NOT USED
		
		//No scores wrapper view
		noScoresConnectionView = Ti.UI.createView({//TODO
			top:115,
			visible:false
		});
	
		noScoresOopsImage = Ti.UI.createImageView({//TODO
			image:IMAGE_PATH+'top/oops.png',
			top: 210
		});
	
		//No scores label
		noScoresLabel = Ti.UI.createLabel({//TODO
			text:'Δεν έχει παίξει κανένας αυτήν την κατηγορία!\n Παίξε πρώτος και πάρε προβάδισμα από τους φίλους σου!',
			color:'white',
			textAlign:'center',
			width:270,
			top:410,
			font:{fontSize:27, fontWeight:'reguar', fontFamily:'Myriad Pro'}
		});
	
		//No scores play button
		noScoresPlayButton = Ti.UI.createImageView({
			image:IMAGE_PATH+'top/play.png',
			bottom: 190
		});
		
		//No scores play button event listener
		//noScoresPlayButton.addEventListener('click', handleNoScoresPlayButtonClick);
		
		//sync();
		
		////////////
		
		win.add(viewTopCategory);
	} else {
		Ti.API.warn('NOT building TopView view - already in progress');
	}
}

function destroyTopScoresView(){
	Ti.API.warn('destroyTopScoresView() called');
	var shouldDestroyView = rankingsCategoryTag != null;
	
	if(shouldDestroyView){
		VIEWING_HIGH_SCORES = false;
		
		viewTopCategory.animate({opacity:0, duration:400}, function(){
			//Reset high score tables visibility
			tableViewGlobalScores.show();
			tableViewFriendsScores.hide();
		});
		
		//No scores play button event listener
		//noScoresPlayButton.removeEventListener('click', handleNoScoresPlayButtonClick);
		//Event handler for categories selected from scores popup
		scoresCategoriesSelectionTable.removeEventListener('click', handleScoresCategoryType);
		rankingsCategorySelectionButton.removeEventListener('click', handleScoresCategorySelection);
		
		rankingsTitleBackgroundBar.remove(backHomeFromTopButton);
		rankingsTitleBackgroundBar.remove(rankingsCategoryTag);
		rankingsTitleBackgroundBar.remove(rankingsTitleLabel);
		
		viewTopCategory.remove(rankingsTitleBackgroundBar);
		rankingsTitleBackgroundBar.remove(rankingsTitleLabel);
		
		rankingsBottomBackgroundBar.remove(rankingsCategorySelectionButton);
		 
		//Only destroy the home/replay buttons if we landed here after a game session
		if(topViewAfterGameplay){
			rankingsReplayButton.removeEventListener('click', handleReplayButton); 
			rankingsHomeButton.removeEventListener('click', handleHomeSelection);
			rankingsBottomBackgroundBar.remove(rankingsReplayButton);
			rankingsBottomBackgroundBar.remove(rankingsButtonDottedLine);
			rankingsBottomBackgroundBar.remove(rankingsHomeButton);
		}
		
		viewTopCategory.remove(rankingsBottomBackgroundBar);
		
		rankingsTitleBackgroundBar.remove(rankingsCategoryTag);
		
		//remove bottom bar completely
		viewTopCategory.remove(scoresCategoryPopup);
		scoresCategoryPopup.remove(scoresCategoriesSelectionTable);
		
		noScoresConnectionView.remove(noScoresOopsImage);
		noScoresConnectionView.remove(noScoresLabel);
		noScoresConnectionView.remove(noScoresPlayButton);
		
		viewTopCategory.remove(noScoresConnectionView);
		
		scoresCategoryPopup = null;
		scoresCategoriesSelectionTable = null;
		
		//No scores wrapper view
		noScoresConnectionView = null;
		noScoresOopsImage = null;
		//No scores label
		noScoresLabel = null;
		//No scores play button
		noScoresPlayButton = null;
		
		//Selected category banner
		rankingsCategoryTag = null;
		
		rankingsTitleBackgroundBar = null;
		rankingsLogoImage = null;
		rankingsTitleLabel = null;
		rankingsBottomBackgroundBar = null;
		rankingsCategorySelectionButton = null;
		
		rankingsReplayButton = null;
		rankingsButtonDottedLine = null;
		rankingsHomeButton = null;
		
		win.remove(viewTopCategory);
	} else {
		Ti.API.warn('NOT destroying TopView view - already in progress');
	}
}

function startHighScoresUpdateAnimation(){
	Ti.API.info('startHighScoresUpdateAnimation() starts');
	//Activity indicator
	highScoresActivityIndicator = Titanium.UI.createActivityIndicator({
		style:Titanium.UI.iPhone.ActivityIndicatorStyle.BIG,
		top:28,
		height:20,
		width:20
	});
	
	highScoresActivityIndicator.show();
	Ti.API.info('startHighScoresUpdateAnimation() ends');
}

function stopHighScoresUpdateAnimation(){
	Ti.API.info('stopHighScoresUpdateAnimation() starts');
	
	if(highScoresActivityIndicator != null){
		highScoresActivityIndicator.hide();
		viewTopCategory.remove(highScoresActivityIndicator);
		highScoresActivityIndicator = null;
	}
	
	viewTopCategory.fireEvent("loadScore", {currentCategoryId:selectedCategoryInHighScores});
	Ti.API.info('stopHighScoresUpdateAnimation() ends');
}

//handle button for category selection (hide or show)
function handleScoresCategorySelection(){
	if(SOUNDS_MODE){
		audioClick.play();	
	}
	
	Ti.API.warn('handleScoresCategorySelection starts');
	if(!categoryScoresShown){
		scoresCategoryPopup.show();
		categoryScoresShown=true;
		
	}else{
		scoresCategoryPopup.hide();
	 	categoryScoresShown=false;
	}
}

//handle replay button
function handleReplayButton(){
	if(SOUNDS_MODE){
		audioClick.play();	
	}
	
	Ti.API.warn('handleReplayButton starts');
	if(gameSession.getGameType() == BUZZ_GAME_GROUP){
		if(!replayShown){
			
			replayShown=true;
			//hide categories popup when replay popup clicked
			scoresCategoryPopup.hide();
		}else{
		 	replayShown=false;
		}
	} else {
		//Restart immediately
		restartGame(false);
	}
}

//Handler when a category is chosen
function handleScoresCategoryType(e){
	if(SOUNDS_MODE){
		audioClick.play();	
	}
		
	var currentCategoryId = e.row.clickName;
	
	Ti.API.info(e.row.clickName +' has been chosen from the popup');
	
	viewTopCategory.fireEvent('loadScore', {currentCategoryId:currentCategoryId, loadRemoteData:false});
	
	categoryScoresShown = false;
	scoresCategoryPopup.hide();
}

/*Event handler for invite button click*/
function handleInviteButtonClick(){
	if(SOUNDS_MODE){
		audioClick.play();	
	}
	
	Ti.API.warn('Invite friends icon clicked');
	
	
	scoresCategoryPopup.hide();
	
	mtbImport("invite.js");
	buildInviteFriendsPopup();
	
	//Animate the invite friends background image
	inviteFriendsBackgroundImage.animate({transform:SCALE_ONE, duration:400});
}

//Event handler for no-scores-play-button-click
function handleNoScoresPlayButtonClick(){
	var targetCategoryIcon = '';
	var targetCategoryLabel = '';
	var categoryId = '';
	
	var categoryProperties = getCategoryProperties(selectedCategoryScores);
	targetCategoryIcon = categoryProperties.loader;
	targetCategoryLabel = categoryProperties.name;
	categoryId = selectedCategoryScores;
	
	//If we are allowed to play this category
	if( (IS_FREE_APP == 0) || (categoryProperties.available && IS_FREE_APP==1) ){
	
		//Start a new game session
		gameSession = require('game/game');
		gameSession.quitGameSession();
		gameSession.setGameType(BUZZ_GAME_SOLO);
		//load current player and fire an event to update the player UI
		var currentPlayer = getCurrentPlayer();
		//pass the persisted solo player to the game session
		var tmpPlayerArrayObj = [];
		tmpPlayerArrayObj.push(currentPlayer);
		gameSession.setTmpPlayerNames(tmpPlayerArrayObj);
	
		mtbImport("loader.js");
	
	    //START game
	    viewLoader.fireEvent('loaderStart', {currentCategoryIcon:targetCategoryIcon, currentCategoryLabel:targetCategoryLabel, categoryId:categoryId});
	    fadeIntroAudioOut();
	    viewLoader.animate({opacity:1, duration:400}, function(){
	    	//Safe?
	    	destroyTopSelectionView();
	    	destroyTopScoresView();
	    });  
	} else {
		//Show the purchase application popup
		var purchasePopup = buildPurchaseApplicationPopup();
		viewTopCategory.add(purchasePopup);
		purchasePopup.animate({transform:SCALE_ONE, duration:400});
	}
}

//Event handler for tabAll-click
function handleTabAllClick(){
	var targetImage = '';
	var targetImageOther = '';
	
	scoresCategoryPopup.hide();
	
	if(tabAll.image == tabAllSelected){
		//keep the same
		targetImage = tabAllSelected;
	} else {
		targetImage = tabAllSelected;
		tabFriends.image = tabFriendsDeselected;
		tableViewGlobalScores.show();
		tableViewFriendsScores.hide();
		noScoresConnectionView.hide();
	}
	
	tabAll.image = targetImage;
}
	
//Event handler for tabFriends-click
function handleTabFriendsClick(){
	var targetImage = '';
	
	scoresCategoryPopup.hide();
	
	if(tabFriends.image == tabFriendsSelected){
		//keep the same
		targetImage = tabFriendsSelected;
	} else {
		targetImage = tabFriendsSelected;
		tabAll.image = tabAllDeselected;
		tableViewGlobalScores.hide();
		
		//Only show the friends scores if we are connected to FB
		if(highScoresSelectedGameType == BUZZ_GAME_SOLO){
			if(hasFriendScoresToRender){
				tableViewFriendsScores.show();
			} else {
				noScoresConnectionView.show();
			}
		}	
	}
	
	tabFriends.image = targetImage;
}

//Event handler for No-facebook-connection-button click
function handleNoFacebookConnectionAlertButtonClick(){
	
}

//Load score listener
viewTopCategory.addEventListener('loadScore', function(data){
	var currentCategoryId = data.currentCategoryId;
	var categoryProperties = getCategoryProperties(currentCategoryId);
	selectedCategoryScores = currentCategoryId;
	Ti.API.info('EVENT: loadScore for category '+currentCategoryId);
    
    //Set banner image
    if(VIEWING_HIGH_SCORES){
    	
    	rankingsCategoryTag.image = categoryProperties.tag;
    	
	    //Load high scores
	    	
    	//global scores
    	var highScores = getHighScores(currentCategoryId);
    	Ti.API.info(highScores);
	    tableViewGlobalScores.setData(buildHighScoresData(highScores));
	    
	    //friend scores
	    var friendScores = getFriendHighScores(currentCategoryId);
	    hasFriendScoresToRender = friendScores.length > 0 ? true : false;
	    tableViewFriendsScores.setData(buildFriendHighScoresData(friendScores));
	   
	    
	    Ti.API.info('High scores UI updated');
	    
	    if(data.loadRemoteData){
	    	Ti.API.warn('Remote high scores requested from loadScore event');
	    	sync();
	    }
    }
});

function populateScoresReplayTableData(){
	var selectedRowColor = '#f3b805';
	var tableRows = [];
	
	var row1 = Ti.UI.createTableViewRow({
		className:'replayButtonTable',
		height:80,
		selectedBackgroundColor:selectedRowColor,
		replayType:1
	});
	
	var scoresReplayButtonDottedLine = Titanium.UI.createImageView({
		image:IMAGE_PATH+'top/bar/replay_popup/dotted_lines.png',
		bottom:0
	});
	
	var row2 = Ti.UI.createTableViewRow({
		className:'replayButtonTable',
		height:80,
		selectedBackgroundColor:selectedRowColor,
		replayType:2
	});
	
	var replayLabel1 = Titanium.UI.createLabel({
		text:'ΠΑΜΕ ΓΙΑ ΡΕΒΑΝΣ',
		color:'white',
		textAlign:'center',
		width:110,
		font:{fontSize:23, fontWeight:'bold', fontFamily:'Myriad Pro'}
	});
	
	var replayLabel2 = Titanium.UI.createLabel({
		text:'ΝΕΑ ΠΑΡΤΙΔΑ',
		top:17,
		width:110,
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

//Build for the categories selection row
function buildScoresCategorySelectionTableData(categoryId){
	var categoryProperties = getCategoryProperties(categoryId);
	var categoryName = categoryProperties.name;
	var categorySquareImage = categoryProperties.square;
	
	var row1 = Ti.UI.createTableViewRow({
		height:64,
		selectedBackgroundColor:'transparent',
		clickName:categoryId
	});
	
	var coloredSquareCategory = Titanium.UI.createImageView({
		image:categorySquareImage,
		left:5
	});
	
	var categoryLabel = Titanium.UI.createLabel({
		text:categoryName,
		color:'white',
		left:50,
		bottom:12,
		font:{fontSize:23, fontWeight:'bold', fontFamily:'Myriad Pro'}
	});
	
	var dottedLineImage = Titanium.UI.createImageView({
		image:IMAGE_PATH+'top/categ_popup/dotted_popup.png',
		bottom:0
	});
	
	row1.className = 'scoresPopupTable';
	row1.add(categoryLabel);
	row1.add(dottedLineImage);
	row1.add(coloredSquareCategory);
	
	return row1;
}

function buildFriendHighScoresData(scoresJsonArray){
	
	var tableData = [];
	for(var i=0; i < scoresJsonArray.length; i++){
		var rank = scoresJsonArray[i].rank + '.';
		var name = scoresJsonArray[i].name;
		var score = scoresJsonArray[i].score; 
		var facebookId = scoresJsonArray[i].facebookId; 
		var avatar = scoresJsonArray[i].avatar; 
		
		var photoURL = '';
		if(facebookId != null && facebookId != ''){
			photoURL = 'http://graph.facebook.com/'+facebookId+'/picture?height=110&width=110';
		} else if(avatar != null && avatar != ''){
			photoURL = IMAGE_PATH+'player_selection/popup_avatar/c/'+avatar;
		}
		 
		
		var lastRankLeftPt = 20;
		if(i > 8){
			lastRankLeftPt = 6;
		}
		
		var row1 = Ti.UI.createTableViewRow({
			height:130,
			width:800, 
			backgroundColor:'transparent',
			selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE
		});
		
		//Create bg image view
		var bgImage = Titanium.UI.createImageView({
			image:IMAGE_PATH+'top/rowbg.png'
		});
		
		var friendImage = Ti.UI.createImageView({
			image:photoURL,
			defaultImage:IMAGE_PATH+'profile/user_noimage220.png',
			left:70,
			borderColor:'white',
			borderWidth:2,
			width:110,
			height:110
		});

		var label1 = Titanium.UI.createLabel({
			text:rank,
			color:'white',
			left:lastRankLeftPt,
			top:40,
			height:55,
			font:{fontSize:37, fontWeight:'bold', fontFamily:'321impact'}
		});

		var labelName1 = Titanium.UI.createLabel({
			text:name,
			color:'white',
			left:200,
			top:25,
			font:{fontSize:34, fontWeight:'regular', fontFamily:'Myriad Pro'}
		});

		var labelScore1 = Titanium.UI.createLabel({
			text:score,
			color:'#fee902',
			left:200,
			top:68,
			height:55,
			textAlign:'right',
			font:{fontSize:39, fontWeight:'bold', fontFamily:'321impact'}
		});

		row1.className = 'scoreFriendsDetailsView';
		row1.add(bgImage);
		row1.add(label1);
		row1.add(labelName1);
		row1.add(labelScore1);
		row1.add(friendImage);
		
		//Ti.API.warn('Rendering friend high score for '+name);
		tableData.push(row1);
	}
	
	return tableData;
}

/*Builds an array with all the high score rows*/
function buildHighScoresData(scoresJsonArray){
	var tableData = [];
	
	for(var i=0; i < scoresJsonArray.length; i++){
		
		var rank = scoresJsonArray[i].rank + '.';
		var name = scoresJsonArray[i].name;
		var score = scoresJsonArray[i].score;
		
		var row1 = Ti.UI.createTableViewRow({
			height:130,
			width:800,
			selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE
		});
		
		//Create bg image view
		var bgImage = Titanium.UI.createView({
			backgroundColor:'0b4b7f',
			opacity:0.6,
			height:123,
			bottom:0
		});
		
		var label1 = Titanium.UI.createLabel({
			text:rank,
			color:'white',
			left:39,
			top:49,
			font:{fontSize:43, fontWeight:'bold', fontFamily:'Myriad Pro'}
		});

		var labelName1 = Titanium.UI.createLabel({
			text:name,
			color:'white',
			left:107,
			top:54,
			font:{fontSize:39, fontWeight:'regular', fontFamily:'Myriad Pro'}
		});

		var labelScore1 = Titanium.UI.createLabel({
			text:score,
			color:'white',
			right:36,
			top:54,
			textAlign:'right',
			font:{fontSize:48, fontWeight:'bold', fontFamily:'Myriad Pro'}
		});

		row1.className = 'scoreDetailsView';
		row1.add(bgImage);
		row1.add(label1);
		row1.add(labelName1);
		row1.add(labelScore1);
		
		tableData.push(row1);
	}
	
	return tableData;
}

//Event handler for a replay option
function handleReplaySelection(e){
	if(SOUNDS_MODE){
		audioClick.play();	
	}
	
	Ti.API.info('REPLAY option selected')
	
	if(e.row.replayType == 1){
		restartGame(false);
	} else if(e.row.replayType == 2){
		
		//Destroy the last session since we're starting over
		gameSession.quitGameSession();
		
		//Show the game selection screen
		buildGameSelectionView();
		viewGameSelection.animate({opacity:1,duration:400}, function(){
			Ti.API.info('Animation callback: destroyTopScoresView about to be called');
			//destroy the top scores view
			destroyTopScoresView();
		});
	}
}

//Event handler for the home button
function handleHomeSelection(){
	if(SOUNDS_MODE){
		audioBack.play();	
	}
	
	Ti.API.info('BACK to home clicked');
	destroyTopScoresView();
	
	if(gameSession != null){
		gameSession.quitGameSession();
	}
}
