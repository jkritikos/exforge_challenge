var INIT_BOTTOM_ANIMATION_LABEL = 250;
var INIT_BOTTOM_ANIMATION_ARROW = 225;

var PLAY_NOW_TEXT = 'PLAY NOW';

// create base UI tab and root window
var win = Titanium.UI.createWindow({  
    backgroundColor:'black'
});

//menu background image
var menuBackgroundImage = Titanium.UI.createView({
	backgroundImage:IMAGE_PATH+'menu/background.jpg',
	top:0,
	height:857
});

win.add(menuBackgroundImage);

//play now bar
var menuPlayNowBar = Titanium.UI.createView({
	backgroundColor:'0b4b7f',
	height:168,
	bottom:0
});

win.add(menuPlayNowBar);

//play now label attributes
var menuPlayNowLabelAttributes = Titanium.UI.iOS.createAttributedString({
	text:PLAY_NOW_TEXT,
	attributes:[
		{
			type: Titanium.UI.iOS.ATTRIBUTE_FOREGROUND_COLOR,
            value: "fb494a",
            range: [PLAY_NOW_TEXT.indexOf('NOW'), ('NOW').length]
		},
		{
			type: Titanium.UI.iOS.ATTRIBUTE_FOREGROUND_COLOR,
            value: "white",
            range: [PLAY_NOW_TEXT.indexOf('PLAY'), ('PLAY').length]
		}
		
	]
});

//play now label
var menuPlayNowLabel = Titanium.UI.createLabel({
	attributedString:menuPlayNowLabelAttributes,
	font:{fontSize:67, fontWeight:'bold', fontFamily:'Arial'}
});

menuPlayNowBar.add(menuPlayNowLabel);

//heart button
var menuHeartButton = Titanium.UI.createButton({
	backgroundImage:IMAGE_PATH+'menu/heart.png',
	top:28,
	right:40,
	height:75,
	width:105,
	clicked:false,
	zIndex:1
});

menuBackgroundImage.add(menuHeartButton);
menuHeartButton.addEventListener('click', handleHeartButton);

//heart menu
var menuHeartMenu = Titanium.UI.createImageView({
	image:IMAGE_PATH+'menu/menu.png',
	top:92,
	right:20,
	opacity:0
});

menuBackgroundImage.add(menuHeartMenu);

//heart menu icon profile background
var heartMenuProfileBackground = Titanium.UI.createView({
	height:138,
	width:146,
	top:19
});

menuHeartMenu.add(heartMenuProfileBackground);

//heart menu icon profile
var heartMenuIconProfile = Titanium.UI.createButton({
	backgroundImage:IMAGE_PATH+'menu/icon_profile.png',
	height:90,
	width:95,
	top:11,
	right:22
});

heartMenuProfileBackground.add(heartMenuIconProfile);

//heart menu icon badges background
var heartMenuBadgesBackground = Titanium.UI.createView({
	height:139,
	width:146,
	top:160
});

menuHeartMenu.add(heartMenuBadgesBackground);

//heart menu icon badges
var heartMenuIconBadges = Titanium.UI.createButton({
	backgroundImage:IMAGE_PATH+'menu/icon_badges.png',
	height:90,
	width:95,
	top:11,
	right:22
});

heartMenuBadgesBackground.add(heartMenuIconBadges);

//heart menu icon ranking background
var heartMenuRankingBackground = Titanium.UI.createView({
	height:139,
	width:146,
	top:302
});

menuHeartMenu.add(heartMenuRankingBackground);

//heart menu icon ranking
var heartMenuIconRanking = Titanium.UI.createButton({
	backgroundImage:IMAGE_PATH+'menu/icon_ranking.png',
	height:90,
	width:95,
	top:11,
	right:22
});

heartMenuRankingBackground.add(heartMenuIconRanking);

//heart menu icon settings background
var heartMenuSettingsBackground = Titanium.UI.createView({
	height:139,
	width:146,
	top:443
});

menuHeartMenu.add(heartMenuSettingsBackground);

//heart menu icon settings
var heartMenuIconSettings = Titanium.UI.createButton({
	backgroundImage:IMAGE_PATH+'menu/icon_settings.png',
	height:90,
	width:95,
	top:11,
	right:22
});

heartMenuSettingsBackground.add(heartMenuIconSettings);

//Event listener for Top10 button
heartMenuRankingBackground.addEventListener('click', function(){

	if(SOUNDS_MODE){
		audioClick.play();	
	}
	var currentCategoryId = CAT_EVERYTHING;
	
    //show loader view
    mtbImport("top_view.js");
    buildTopScoresView(currentCategoryId, false);
    //Load cached scores so the UI has something to display
    viewTopCategory.fireEvent('loadScore', {currentCategoryId:currentCategoryId, loadRemoteData:true});    
    viewTopCategory.animate(anim_in);
});

//Event listener for Badges button
heartMenuBadgesBackground.addEventListener('click', function(){
	if(SOUNDS_MODE){
		audioClick.play();	
	}
	
	mtbImport("stars_scroll.js");
	
	//load data
	var player = getCurrentPlayer();
	getBadgeData(player.id);
	
	buildBadgesListView();
	viewStars.animate(anim_in);
});

//Event listener for Profile button
heartMenuProfileBackground.addEventListener('click', function() {
	if(SOUNDS_MODE){
		audioClick.play();	
		}
	
	mtbImport("profile.js");
	
	//load data
	var player = getCurrentPlayer();
	var profileHighScores = getPlayerHighScores(player.id,player.player_id);
	var profileData = getProfileData(player.id, player.player_id);
	
	buildProfileView();
	
	viewProfile.fireEvent('myProfile', {profileHighScores:profileHighScores, profileData:profileData, player:player});
	viewProfile.animate(anim_in);
	
});

//Event listener for Settings button
heartMenuSettingsBackground.addEventListener('click', function(){
	if(SOUNDS_MODE){
		audioClick.play();	
	}
	
	//load data
	var player = getCurrentPlayer();
	
	mtbImport("settings.js");
	buildSettingsView();

	viewSettings.fireEvent('updateSettingsUI', {player:player});
});

//Event listener for play button
menuPlayNowBar.addEventListener('click', function()	{
    var start = new Date().getTime();
    
	if(SOUNDS_MODE){
		audioPlay.play();	
	}
	
	//Force an update if we have to
	if(FORCE_BUZZ_UPDATE){
		forceAppUpdate();
	}
	
	//Start a new game session
	gameSession = require('game/game');
	gameSession.quitGameSession();
	
	gameSession.setGameType(BUZZ_GAME_SOLO);
	
	//load current player and fire an event to update the player UI
	var currentPlayer = getCurrentPlayer();
	
	//If there is an active player, go straight to the category selection, otherwise to the player selection
	if(currentPlayer.name != null && currentPlayer.name != ''){
		
		//pass the persisted solo player to the game session
		var tmpPlayerArrayObj = [];
		tmpPlayerArrayObj.push(currentPlayer);
		gameSession.setTmpPlayerNames(tmpPlayerArrayObj);
		
		var end = new Date().getTime();
        var duration = end - start;
    
        Ti.API.info('play now() returns to IMPORT in '+duration+' ms');
		
		mtbImport("categories.js");
		buildCategoriesView();
		viewCategories.animate(anim_in);
	} else {
		mtbImport("signin.js");
		buildPlayerLoginView();
		viewSignin.fireEvent('updatePlayerUI', {player:currentPlayer});
		viewSignin.animate(anim_in);
	}
});

win.open({fullscreen:true});

function handleHeartButton(e){
	var clicked = e.source.clicked;
	Ti.API.info(clicked);
	
	if(clicked){
		menuHeartMenu.animate(anim_out);
		e.source.clicked = false;
	}else{
		menuHeartMenu.animate(anim_in);
		e.source.clicked = true;
	}
	
}
