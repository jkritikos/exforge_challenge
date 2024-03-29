var hasFriendScoresToRender = false;
var selectedCategoryScores = '';

var tabAllSelected = IMAGE_PATH+'top/tabAllSelected.png';
var tabAllDeselected = IMAGE_PATH+'top/tabAllDeselected.png';
var tabFriendsSelected = IMAGE_PATH+'top/tabFriendsSelected.png';
var tabFriendsDeselected = IMAGE_PATH+'top/tabFriendsDeselected.png';

//The view
var viewTopCategory = Ti.UI.createView({
	backgroundImage:IMAGE_PATH+'background.jpg',
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
	backgroundImage:IMAGE_PATH+'back.png',
	backgroundSelectedImage:IMAGE_PATH+'back_green.png',
	left:8,
	top:8,
	height:30,
	width:30
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
var noFacebookConnectionOopsButton = null;
var noFacebookConnectionLabel = null;
var noFacebookConnectionButton = null;
var noFacebookConnectionView = null;
var noScoresConnectionView = null;
var noScoresOopsImage = null;
var noScoresLabel = null;
var noScoresPlayButton = null;
var tabAll = null;
var tabFriends = null;
var scoreCategoryBanner = null;
var iconImageTopView = null;
var barImageTopView = null;
var iconReflectionImageTopView = null;
var titleImageTopView = null;
var alertNoFacebookConnection = null;
var alertNoFacebookConnectionLabel = null;
var alertNoFacebookConnectionButton = null;

//Bottom bar components
var scoresBottomBar = null;
var scoresButtonCategory = null;
var scoresButtonReplay = null;
var scoresButtonDottedLine = null;
var scoresButtonHome = null;
var inviteFriendsIcon = null;
var scoresCategoryPopup = null;
var scoresCategoriesSelectionTable = null;
var scoresReplayPopup = null;
var scoresReplaySelectionTable = null;

//handle variables
var categoryScoresShown = false;
var replayShown = false;
var highScoresSelectedGameType = null;
var topViewAfterGameplay = null;

//Init table views to maintain them across instatiations
/*Table view for ALL highscores*/
var tableViewGlobalScores = Titanium.UI.createTableView({
	data:[],
	minRowHeight:37,
	backgroundColor:'transparent',
	separatorStyle:Ti.UI.iPhone.TableViewSeparatorStyle.NONE,
	top:135,
	bottom:50
});

/*Table view for FRIEND highscores*/
var tableViewFriendsScores = Titanium.UI.createTableView({
	data:[],
	minRowHeight:37,
	backgroundColor:'transparent',
	separatorStyle:Ti.UI.iPhone.TableViewSeparatorStyle.NONE,
	top:135,
	bottom:50,
	visible:false
});
	
//Add the tables to the view
viewTopCategory.add(tableViewGlobalScores);
viewTopCategory.add(tableViewFriendsScores);

//Data components
var selectedCategoryInHighScores = null;

function buildTopScoresView(currentCategoryId, gameType, afterGameplay){
	var shouldCreateView = noFacebookConnectionOopsButton == null;
	if(shouldCreateView){
		VIEWING_HIGH_SCORES = true;
		selectedCategoryInHighScores = currentCategoryId;
		highScoresSelectedGameType = gameType;
		topViewAfterGameplay = afterGameplay;
		
		Ti.API.warn('buildTopScoresView() called for '+currentCategoryId);
		
		var scoresIconPath = '';
		var scoresIconPathTop = 0;
		var scoresIconReflectionPath = '';
		var scoresTitleIconPath = '';
		
		if(gameType == BUZZ_GAME_SOLO){
			scoresIconPath = IMAGE_PATH+'top/icon.png';
			scoresIconPathTop = 20;
			scoresIconReflectionPath = IMAGE_PATH+'top/icon_r.png';
			scoresTitleIconPath = IMAGE_PATH+'top/title.png';
			
			//reuse the tabs (ALL, FRIENDS) for the group games as well
			tabAllSelected = IMAGE_PATH+'top/tabAllSelected.png';
			tabAllDeselected = IMAGE_PATH+'top/tabAllDeselected.png';
			tabFriendsSelected = IMAGE_PATH+'top/tabFriendsSelected.png';
			tabFriendsDeselected = IMAGE_PATH+'top/tabFriendsDeselected.png';
		} else if(gameType == BUZZ_GAME_GROUP){
			scoresIconPathTop = 12;
			scoresIconPath = IMAGE_PATH+'top/icon_group.png';
			scoresIconReflectionPath = IMAGE_PATH+'top/icon_r_group.png';
			scoresTitleIconPath = IMAGE_PATH+'top/title_group.png';
			
			//reuse the tabs (ALL, FRIENDS) for the group games as well
			tabAllSelected = IMAGE_PATH+'top/tabLastGameSelected.png';
			tabAllDeselected = IMAGE_PATH+'top/tabLastGameDeselected.png';
			tabFriendsSelected = IMAGE_PATH+'top/tabAllTimeSelected.png';
			tabFriendsDeselected = IMAGE_PATH+'top/tabAllTimeDeselected.png';
		}
		
		//Bottom bar components
		//the scores bar
		scoresBottomBar = Titanium.UI.createView({
		 	backgroundColor:'black',
		 	bottom:0,
		 	width:'100%',
		 	height:50,
		 	zIndex:100
		 });
		
		viewTopCategory.add(scoresBottomBar);
		
		//Choose category for scores
		scoresButtonCategory = Titanium.UI.createButton({
			backgroundImage:IMAGE_PATH+'top/bar/button_categ.png',
			left:10,
			height:42,
			width:50
		});
		
		scoresBottomBar.add(scoresButtonCategory);
		
		scoresButtonCategory.addEventListener('click', handleScoresCategorySelection);
		Ti.API.info('scoresButtonCategory starts');
		
		//Only show replay and home buttons if we landed here after a game session
		if(topViewAfterGameplay){
			//Replay Button
			scoresButtonReplay = Titanium.UI.createButton({
				backgroundImage:IMAGE_PATH+'top/bar/button_replay.png',
				left:108,
				width:50,
				height:42
			});
			
			scoresBottomBar.add(scoresButtonReplay);
			scoresButtonReplay.addEventListener('click', handleReplayButton); 
			
			//Dotted Line
			scoresButtonDottedLine = Titanium.UI.createImageView({
				image:IMAGE_PATH+'top/bar/dotted_line.png'
			});
			
			scoresBottomBar.add(scoresButtonDottedLine);
			
			//Button Home
			scoresButtonHome = Titanium.UI.createButton({
				backgroundImage:IMAGE_PATH+'top/bar/button_home.png',
				right:108,
				width:50,
				height:42
			});
			
			scoresBottomBar.add(scoresButtonHome);
			scoresButtonHome.addEventListener('click',handleHomeSelection);
			
			scoresReplayPopup = Titanium.UI.createImageView({
				image:IMAGE_PATH+'top/bar/replay_popup/popup_replay.png',
				left:71,
				bottom:50,
				zIndex:2,
				visible:false
			});
			
			viewTopCategory.add(scoresReplayPopup);
			
			scoresReplaySelectionTable = Titanium.UI.createTableView({
				backgroundColor:'transparent',
				data:populateScoresReplayTableData(),
				separatorStyle:Ti.UI.iPhone.TableViewSeparatorStyle.NONE,
				showVerticalScrollIndicator:false,
				minRowHeight:40,
				top:8,
				bottom:11,
				width:100,
				height:85
			});
			
			scoresReplayPopup.add(scoresReplaySelectionTable);
			scoresReplaySelectionTable.addEventListener('click', handleReplaySelection);
		}
		
		//Friends Invite
		inviteFriendsIcon = Titanium.UI.createButton({
			backgroundImage:IMAGE_PATH+'top/bar/button_friend.png',
			right:10,
			width:50,
			height:42
		});
		
		scoresBottomBar.add(inviteFriendsIcon);
		
		//Popup for category button
		scoresCategoryPopup = Titanium.UI.createImageView({
			image:IMAGE_PATH+'top/bar/popup/popup_categ.png',
			left:3,
			bottom:51,
			zIndex:2
		});
		
		viewTopCategory.add(scoresCategoryPopup);
		scoresCategoryPopup.hide();
		
		//Table view for scores Categories
		scoresCategoriesSelectionTable = Titanium.UI.createTableView({
			backgroundColor:'transparent',
			separatorStyle:Ti.UI.iPhone.TableViewSeparatorStyle.NONE,
			showVerticalScrollIndicator:false,
			minRowHeight:28,
			top:12,
			bottom:15,
			width:177,
			height:250
		});
		
		var scoresCategoriesTableData = [];
		scoresCategoriesTableData.push(buildScoresCategorySelectionTableData(CAT_TOTALBUZZ));
		scoresCategoriesTableData.push(buildScoresCategorySelectionTableData(CAT_EPISTIMI));
		scoresCategoriesTableData.push(buildScoresCategorySelectionTableData(CAT_KINIMATOGRAFOS));
		scoresCategoriesTableData.push(buildScoresCategorySelectionTableData(CAT_GEOGRAFIA));
		scoresCategoriesTableData.push(buildScoresCategorySelectionTableData(CAT_ATHLITIKA));
		scoresCategoriesTableData.push(buildScoresCategorySelectionTableData(CAT_TEXNOLOGIA));
		scoresCategoriesTableData.push(buildScoresCategorySelectionTableData(CAT_ISTORIA));
		scoresCategoriesTableData.push(buildScoresCategorySelectionTableData(CAT_MOUSIKH));
		scoresCategoriesTableData.push(buildScoresCategorySelectionTableData(CAT_TEXNES));
		scoresCategoriesTableData.push(buildScoresCategorySelectionTableData(CAT_ZWAFUTA));
		scoresCategoriesTableData.push(buildScoresCategorySelectionTableData(CAT_LIFESTYLE));
		scoresCategoriesSelectionTable.setData(scoresCategoriesTableData);
		
		scoresCategoryPopup.add(scoresCategoriesSelectionTable);
		
		scoresCategoriesSelectionTable.addEventListener('click', handleScoresCategoryType);
		//End of bottom bar components
		
		//No facebook connection button
		noFacebookConnectionOopsButton = Ti.UI.createImageView({
			image:IMAGE_PATH+'top/oops.png',
			top:IPHONE5 ? 87 : 40
		});
	
		//No facebook connection label
		noFacebookConnectionLabel = Ti.UI.createLabel({
			text:'Δεν έχεις συνδεθεί ακόμα μέσω Facebook. \nΤρέχα να συνδεθείς για να δεις τα σκορ των φίλων σου!',
			color:'white',
			textAlign:'center',
			left:50,
			right:50,
			font:{fontSize:17, fontWeight:'bold', fontFamily:'Myriad Pro'}
		});
	
		//No facebook connection button
		noFacebookConnectionButton = Ti.UI.createImageView({
			image:IMAGE_PATH+'top/connect.png',
			bottom: IPHONE5 ? 115 : 70
		});
		
		//No facebook connection wrapper view
		noFacebookConnectionView = Ti.UI.createView({
			top:115,
			visible:false
		});
	
		noFacebookConnectionView.add(noFacebookConnectionOopsButton);
		noFacebookConnectionView.add(noFacebookConnectionLabel);
		noFacebookConnectionView.add(noFacebookConnectionButton);
		
		//Event listener for no facebook connection button - takes you to the settings view
		noFacebookConnectionButton.addEventListener('click', handleNoFacebookConnectionButtonClick);
		
		viewTopCategory.add(noFacebookConnectionView);
		///////////////
		
		//No scores wrapper view
		noScoresConnectionView = Ti.UI.createView({
			top:115,
			visible:false
		});
	
		noScoresOopsImage = Ti.UI.createImageView({
			image:IMAGE_PATH+'top/oops.png',
			top:IPHONE5 ? 81 : 40
		});
	
		//No scores label
		noScoresLabel = Ti.UI.createLabel({
			text:'Δεν έχει παίξει κανένας αυτήν την κατηγορία!\n Παίξε πρώτος και πάρε προβάδισμα από τους φίλους σου!',
			color:'white',
			textAlign:'center',
			left:50,
			right:50,
			font:{fontSize:17, fontWeight:'bold', fontFamily:'Myriad Pro'}
		});
	
		//No scores play button
		noScoresPlayButton = Ti.UI.createImageView({
			image:IMAGE_PATH+'top/play.png',
			bottom: IPHONE5 ? 115 : 70
		});
		
		noScoresConnectionView.add(noScoresOopsImage);
		noScoresConnectionView.add(noScoresLabel);
		noScoresConnectionView.add(noScoresPlayButton);
		viewTopCategory.add(noScoresConnectionView);
		///////////////////
		
		/*All scores tab*/
		tabAll = Ti.UI.createImageView({
			image:tabAllSelected,
			top:106,
			left:0
		});
		
		/*Friends' scores tab'*/
		tabFriends = Ti.UI.createImageView({
			image:tabFriendsDeselected,
			top:106,
			right:0
		});
		
		viewTopCategory.add(tabAll);
		viewTopCategory.add(tabFriends);
		///////////////
		
		//Selected category banner
		scoreCategoryBanner = Titanium.UI.createImageView({
			image:'',
			top:0,
			left:90
		});
		
		viewTopCategory.add(scoreCategoryBanner);
	
		//Icon image
		iconImageTopView = Titanium.UI.createImageView({
			image:scoresIconPath,
			top:scoresIconPathTop,
			right:15
		});
		
		viewTopCategory.add(iconImageTopView);
	
		//Bar image
		barImageTopView = Titanium.UI.createImageView({
			image:IMAGE_PATH+'top/bar.png',
			top:58
		});
		
		viewTopCategory.add(barImageTopView);
	
		//Icon image reflection
		iconReflectionImageTopView = Titanium.UI.createImageView({
			image:scoresIconReflectionPath,
			top:0,
			right:14
		});
		
		barImageTopView.add(iconReflectionImageTopView);
	
		//Title image
		titleImageTopView = Titanium.UI.createImageView({
			image:scoresTitleIconPath,
			top:33,
			zIndex:2
		});
		
		viewTopCategory.add(titleImageTopView);
		////////////////////
		
		//Alert for no Facebook connection
		alertNoFacebookConnection = Titanium.UI.createImageView({
			image:IMAGE_PATH+'alert/alert_zoafuta.png',
			zIndex:12,
			visible:false
		});
	
		//Alert view score label
		alertNoFacebookConnectionLabel = Titanium.UI.createLabel({
			text:'Πρέπει να συνδεθείς μέσω Facebook πρώτα!',
			color:'white',
			textAlign:'center',
			top:31,
			left:45,
			right:45,
			font:{fontSize:16, fontWeight:'regular', fontFamily:'Myriad Pro'}
		});
	
		//Alert view score button
		alertNoFacebookConnectionButton = Titanium.UI.createImageView({
			image:IMAGE_PATH+'alert/yes.png',
			bottom:10,
			zIndex:12
		});
	
		alertNoFacebookConnection.add(alertNoFacebookConnectionLabel);
		alertNoFacebookConnection.add(alertNoFacebookConnectionButton);
		viewTopCategory.add(alertNoFacebookConnection);
	
		//Event handler for No facebook connection button
		alertNoFacebookConnectionButton.addEventListener('click', handleNoFacebookConnectionAlertButtonClick);
		//////////////////
		//Event listener for invite friends image
		inviteFriendsIcon.addEventListener('click', handleInviteButtonClick);
		
		//No scores play button event listener
		noScoresPlayButton.addEventListener('click', handleNoScoresPlayButtonClick);
		//Event listener for the ALL USERS tab
		tabAll.addEventListener('click', handleTabAllClick);
		//Event listener for the FRIENDS tab
		tabFriends.addEventListener('click', handleTabFriendsClick);
		
		//sync();
		win.add(viewTopCategory);
	} else {
		Ti.API.warn('NOT building TopView view - already in progress');
	}
	
}

function destroyTopScoresView(){
	Ti.API.warn('destroyTopScoresView() called');
	var shouldDestroyView = noFacebookConnectionOopsButton != null;
	
	if(shouldDestroyView){
		VIEWING_HIGH_SCORES = false;
	
		viewTopCategory.animate({opacity:0, duration:400}, function(){
			//Reset high score tables visibility
			tableViewGlobalScores.show();
			tableViewFriendsScores.hide();
		});
		
		
		//Event listener for invite friends image
		inviteFriendsIcon.removeEventListener('click', handleInviteButtonClick);
		//Event listener for no facebook connection button - takes you to the settings view
		noFacebookConnectionButton.removeEventListener('click', handleNoFacebookConnectionButtonClick);
		//No scores play button event listener
		noScoresPlayButton.removeEventListener('click', handleNoScoresPlayButtonClick);
		//Event listener for the ALL USERS tab
		tabAll.removeEventListener('click', handleTabAllClick);
		//Event listener for the FRIENDS tab
		tabFriends.removeEventListener('click', handleTabFriendsClick);
		//Event handler for No facebook connection button
		alertNoFacebookConnectionButton.removeEventListener('click', handleNoFacebookConnectionAlertButtonClick);
		
		//Event handler for scores category button
		scoresButtonCategory.removeEventListener('click', handleScoresCategorySelection);
		//Event handler for categories selected from scores popup
		scoresCategoriesSelectionTable.removeEventListener('click', handleScoresCategoryType);
		 
		//Only destroy the home/replay buttons if we landed here after a game session
		if(topViewAfterGameplay){
			//Event handle for replay button
			scoresButtonReplay.removeEventListener('click', handleReplayButton);	
			
			scoresReplaySelectionTable.removeEventListener('click', handleReplaySelection);
			scoresButtonHome.removeEventListener('click',handleHomeSelection);
		
			scoresBottomBar.remove(scoresButtonReplay);
			scoresBottomBar.remove(scoresButtonDottedLine);
			scoresBottomBar.remove(scoresButtonHome);
			
			scoresReplayPopup.remove(scoresReplaySelectionTable);
			viewTopCategory.remove(scoresReplayPopup);
		
			scoresReplayPopup = null;
			scoresReplaySelectionTable = null;
		
			scoresButtonReplay = null;
			scoresButtonDottedLine = null;
			scoresButtonHome = null;
		}
		
		viewTopCategory.remove(inviteFriendsIcon);
		viewTopCategory.remove(scoreCategoryBanner);
		viewTopCategory.remove(iconImageTopView);
		barImageTopView.remove(iconReflectionImageTopView);
		viewTopCategory.remove(barImageTopView);
		viewTopCategory.remove(titleImageTopView);
	
		//remove bottom bar completely
		scoresBottomBar.remove(scoresButtonCategory);
		scoresBottomBar.remove(inviteFriendsIcon);
		viewTopCategory.remove(scoresCategoryPopup);
		scoresCategoryPopup.remove(scoresCategoriesSelectionTable);
		//viewTopCategory.remove(scoresReplayPopup);
		//scoresReplayPopup.remove(scoresReplaySelectionTable);
	
		noFacebookConnectionView.remove(noFacebookConnectionOopsButton);
		noFacebookConnectionView.remove(noFacebookConnectionLabel);
		noFacebookConnectionView.remove(noFacebookConnectionButton);
		
		noScoresConnectionView.remove(noScoresOopsImage);
		noScoresConnectionView.remove(noScoresLabel);
		noScoresConnectionView.remove(noScoresPlayButton);
		
		alertNoFacebookConnection.remove(alertNoFacebookConnectionLabel);
		alertNoFacebookConnection.remove(alertNoFacebookConnectionButton);
		viewTopCategory.remove(alertNoFacebookConnection);
		
		viewTopCategory.remove(tabAll);
		viewTopCategory.remove(tabFriends);
		
		viewTopCategory.remove(noFacebookConnectionView);
		viewTopCategory.remove(noScoresConnectionView);
		
		//make bottom bar values null
		scoresBottomBar = null;
		scoresButtonCategory = null;
		inviteFriendsIcon = null;
		scoresCategoryPopup = null;
		scoresCategoriesSelectionTable = null;
		//scoresReplayPopup = null;
		//scoresReplaySelectionTable = null;
		
		//No facebook connection button
		noFacebookConnectionOopsButton = null;
		//No facebook connection label
		noFacebookConnectionLabel = null;
		//No facebook connection button
		noFacebookConnectionButton = null;
		//No facebook connection wrapper view
		noFacebookConnectionView = null;
		//No scores wrapper view
		noScoresConnectionView = null;
		noScoresOopsImage = null;
		//No scores label
		noScoresLabel = null;
		//No scores play button
		noScoresPlayButton = null;
		inviteFriendsIcon = null;
		
		/*All scores tab*/
		tabAll = null;
		/*Friends' scores tab'*/
		tabFriends = null;
		//Selected category banner
		scoreCategoryBanner = null;
		//Icon image
		iconImageTopView = null;
		//Bar image
		barImageTopView = null;
		//Icon image reflection
		iconReflectionImageTopView = null;
		//Title image
		titleImageTopView = null;
		//Alert for no Facebook connection
		alertNoFacebookConnection = null;
		//Alert view score label
		alertNoFacebookConnectionLabel = null;
		//Alert view score button
		alertNoFacebookConnectionButton = null;
		
		win.remove(viewTopCategory);
	} else {
		Ti.API.warn('NOT destroying TopView view - already in progress');
	}
}

function startHighScoresUpdateAnimation(){
	Ti.API.info('startHighScoresUpdateAnimation() starts');
	//Activity indicator
	highScoresActivityIndicator = Titanium.UI.createActivityIndicator({
		style:Titanium.UI.iPhone.ActivityIndicatorStyle.PLAIN,
		top:17,
		height:20,
		width:20
	});
	
	scoresBottomBar.add(highScoresActivityIndicator);
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
		//hide replay popup when category popup clicked
		if(scoresReplayPopup != null){
			scoresReplayPopup.hide();
		}
		
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
			if(scoresReplayPopup != null){
				scoresReplayPopup.show();
			}
			
			replayShown=true;
			//hide categories popup when replay popup clicked
			scoresCategoryPopup.hide();
		}else{
			if(scoresReplayPopup != null){
				scoresReplayPopup.hide();
			}
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
	
	if(scoresReplayPopup != null){
		scoresReplayPopup.hide();
	}
	
	scoresCategoryPopup.hide();
	
	//iphone only - hide the bar
	scoresBottomBar.animate({opacity:0,duration:280});
	
	mtbImport("invite.js");
	buildInviteFriendsPopup();
	
	//Animate the invite friends background image
	inviteFriendsBackgroundImage.animate({transform:SCALE_ONE, duration:400});
	
	inviteFriendsIcon.hide();
}

//Event handler for no-facebook-connection-button-click
function handleNoFacebookConnectionButtonClick(){
	mtbImport("settings.js");
	buildSettingsView();
	
	viewSettings.animate({opacity:1, duration:400}, function(){
		mtbImport('top_selection.js');
		mtbImport('top_view.js');

		destroyTopScoresView();
		destroyTopSelectionView();
	});
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
		
	    //START game
	  	mtbImport("loader.js");
	    
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
	
	//Hide other popups
	if(scoresReplayPopup != null){
		scoresReplayPopup.hide();
	}
	
	scoresCategoryPopup.hide();
	
	if(tabAll.image == tabAllSelected){
		//keep the same
		targetImage = tabAllSelected;
	} else {
		targetImage = tabAllSelected;
		tabFriends.image = tabFriendsDeselected;
		tableViewGlobalScores.show();
		tableViewFriendsScores.hide();
		noFacebookConnectionView.hide();
		noScoresConnectionView.hide();
	}
	
	tabAll.image = targetImage;
}
	
//Event handler for tabFriends-click
function handleTabFriendsClick(){
	var targetImage = '';
	
	//Hide other popups
	if(scoresReplayPopup != null){
		scoresReplayPopup.hide();
	}
	
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
			if(Titanium.Facebook.loggedIn){
				noFacebookConnectionView.hide();
				
				if(hasFriendScoresToRender){
					tableViewFriendsScores.show();
				} else {
					noScoresConnectionView.show();
				}
				
			} else {
				noFacebookConnectionView.show();
			}
		} else if(highScoresSelectedGameType == BUZZ_GAME_GROUP){
			noFacebookConnectionView.hide();
			tableViewFriendsScores.show();
		}	
	}
	
	tabFriends.image = targetImage;
}

//Event handler for No-facebook-connection-button click
function handleNoFacebookConnectionAlertButtonClick(){
	alertNoFacebookConnection.hide();
}

//Load score listener
viewTopCategory.addEventListener('loadScore', function(data){
	var currentCategoryId = data.currentCategoryId;
	var categoryProperties = getCategoryProperties(currentCategoryId);
	selectedCategoryScores = currentCategoryId;
	Ti.API.info('EVENT: loadScore for category '+currentCategoryId+' and gameType='+highScoresSelectedGameType);
    
    //Set banner image
    if(VIEWING_HIGH_SCORES){
    	scoreCategoryBanner.image = categoryProperties.banner;
    	
	    //Load high scores
	    if(highScoresSelectedGameType == BUZZ_GAME_SOLO){
	    	//global scores
	    	var highScores = getHighScores(currentCategoryId);
		    tableViewGlobalScores.setData(buildHighScoresData(highScores));
		    
		    //friend scores
		    var friendScores = getFriendHighScores(currentCategoryId);
		    hasFriendScoresToRender = friendScores.length > 0 ? true : false;
		    tableViewFriendsScores.setData(buildFriendHighScoresData(friendScores));
	    } else if(highScoresSelectedGameType == BUZZ_GAME_GROUP){
	    	//last game group scores
	    	var groupScoresLastGame = getGroupHighScores(currentCategoryId, true);
	    	tableViewGlobalScores.setData(buildFriendHighScoresData(groupScoresLastGame));
	    	
	    	//all time group scores
	    	var groupScoresAllTime = getGroupHighScores(currentCategoryId, false);
	    	hasFriendScoresToRender = groupScoresAllTime.length > 0 ? true : false;
	    	tableViewFriendsScores.setData(buildFriendHighScoresData(groupScoresAllTime));
	    }
	        
	    Ti.API.info('High scores UI updated');
	    
	    if(data.loadRemoteData){
	    	Ti.API.info('Remote high scores requested from loadScore event');
	    	sync();
	    }
    }
    
});

function populateScoresReplayTableData(){
	var selectedRowColor = '#f3b805';
	var tableRows = [];
	
	var row1 = Ti.UI.createTableViewRow({
		className:'replayButtonTable',
		height:43,
		selectedBackgroundColor:selectedRowColor,
		replayType:1
	});
	
	var scoresReplayButtonDottedLine = Titanium.UI.createImageView({
		image:IMAGE_PATH+'top/bar/replay_popup/dotted_lines.png',
		bottom:0
	});
	
	var row2 = Ti.UI.createTableViewRow({
		className:'replayButtonTable',
		height:43,
		selectedBackgroundColor:selectedRowColor,
		replayType:2
	});
	
	var replayLabel1 = Titanium.UI.createLabel({
		text:'ΠΑΜΕ ΓΙΑ ΡΕΒΑΝΣ',
		color:'white',
		textAlign:'center',
		width:110,
		font:{fontSize:14, fontWeight:'bold', fontFamily:'Myriad Pro'}
	});
	
	var replayLabel2 = Titanium.UI.createLabel({
		text:'ΝΕΑ ΠΑΡΤΙΔΑ',
		top:17,
		width:110,
		color:'white',
		textAlign:'center',
		font:{fontSize:14, fontWeight:'bold', fontFamily:'Myriad Pro'}
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
	var categorySquareImage=categoryProperties.square;
	
	var row1 = Ti.UI.createTableViewRow({
		height:40,
		selectedBackgroundColor:'#4a9b3c',
		clickName:categoryId
	});
	
	var coloredSquareCategory = Titanium.UI.createImageView({
		image:categorySquareImage,
		left:14
	});
	
	var categoryLabel = Titanium.UI.createLabel({
		text:categoryName,
		color:'white',
		left:41,
		bottom:8,
		font:{fontSize:14, fontWeight:'bold', fontFamily:'Myriad Pro'}
	});
	
	var dottedLineImage = Titanium.UI.createImageView({
		image:IMAGE_PATH+'top/bar/popup/dotted_line.png',
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
		
		var photoURL = 'http://graph.facebook.com/'+facebookId+'/picture';
		if(facebookId != null && facebookId != ''){
			photoURL = 'http://graph.facebook.com/'+facebookId+'/picture?height=50&width=50';
		} else if(avatar != null && avatar != ''){
			photoURL = IMAGE_PATH+'player_selection/popup_avatar/c/'+avatar;
		}
		
		var lastRankLeftPt = 20;
		if(i > 8){
			lastRankLeftPt = 6;
		}
		
		var row1 = Ti.UI.createTableViewRow({
			height:60,
			width:'299', 
			backgroundColor:'transparent',
			selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE
		});
		
		//Create bg image view
		var bgImage = Titanium.UI.createImageView({
			image:IMAGE_PATH+'top/rowbg.png'
		});
		
		var friendImage = Ti.UI.createImageView({
			image:photoURL,
			defaultImage:IMAGE_PATH+'profile/user_noimage_new100.png',
			left:50,
			height:50,
			width:50,
			borderColor:'white',
			borderWidth:2
		});

		var label1 = Titanium.UI.createLabel({
			text:rank,
			color:'white',
			left:lastRankLeftPt,
			top:20,
			height:35,
			font:{fontSize:bigFont, fontWeight:'bold', fontFamily:'321impact'}
		});

		var labelName1 = Titanium.UI.createLabel({
			text:name,
			color:'white',
			left:110,
			width:210,
			height:19,
			top:8,
			font:{fontSize:smallFont, fontWeight:'regular', fontFamily:'Myriad Pro'}
		});

		var labelScore1 = Titanium.UI.createLabel({
			text:score,
			color:'#fee902',
			left:110,
			top:28,
			height:35,
			textAlign:'right',
			font:{fontSize:bigFont, fontWeight:'bold', fontFamily:'321impact'}
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
		
		var lastRankLeftPt = 20;
		if(i == 9){
			lastRankLeftPt = 6;
		} 
		
		var row1 = Ti.UI.createTableViewRow({
			height:60,
			width:'299', 
			selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE
		});
		
		//Create bg image view
		var bgImage = Titanium.UI.createImageView({
			image:IMAGE_PATH+'top/rowbg.png'
		});
		
		var label1 = Titanium.UI.createLabel({
			text:rank,
			color:'white',
			left:lastRankLeftPt,
			top:20,
			height:35,
			font:{fontSize:bigFont, fontWeight:'bold', fontFamily:'321impact'}
		});

		var labelName1 = Titanium.UI.createLabel({
			text:name,
			color:'white',
			left:55,
			top:23,
			height:23,
			width:172,
			textAlign:'left',
			font:{fontSize:smallFont, fontWeight:'regular', fontFamily:'Myriad Pro'}
		});

		var labelScore1 = Titanium.UI.createLabel({
			text:score,
			color:'#fee902',
			right:15,
			top:16,
			height:39,
			textAlign:'right',
			font:{fontSize:25, fontWeight:'bold', fontFamily:'321impact'}
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