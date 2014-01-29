var INIT_BOTTOM_ANIMATION_LABEL = 118;
var INIT_BOTTOM_ANIMATION_ARROW = 106;

// create base UI tab and root window
var win = Titanium.UI.createWindow({  
    backgroundImage:IPHONE5 ? IMAGE_PATH+'menu/back-568h@2x.jpg' : IMAGE_PATH+'menu/back.jpg'
});

win.addEventListener('animateMenu', function(e){
	animateHomeMenu();
});

//Global property, used in question.js too
var tmpMatrix = Ti.UI.create2DMatrix();
tmpMatrix = tmpMatrix.scale(1.05);
var scaleAnimation = Ti.UI.createAnimation({transform:tmpMatrix,autoreverse:true,repeat:9000,duration:700});

function animateHomeMenu(){
	playButton.animate(scaleAnimation);
}

//play button
var playButton = Titanium.UI.createButton({
	backgroundImage:IMAGE_PATH+'login/play.png',
	backgroundSelectedImage:IMAGE_PATH+'login/play_pressed.png',
	bottom:IPHONE5 ? 198 : 170,
	width:127,
	height:127,
	opacity:1
});

win.add(playButton);

animateHomeMenu();

//Event listener for play button
playButton.addEventListener('click', function()	{
	
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
	
	mtbImport("game_selection.js");

	buildGameSelectionView();
	viewGameSelection.animate(anim_in);
});

//Bar image
var bar = Titanium.UI.createImageView({
	image:IMAGE_PATH+'menu/bar.png',
	bottom:0
});

//Settings icon reflection
var settingsReflectionImage = Titanium.UI.createImageView({
	image:IMAGE_PATH+'menu/settings_r.png',
	bottom:0,
	left:246
});

//Settings icon
var settingsImage = Titanium.UI.createButton({
	backgroundImage:IMAGE_PATH+'menu/settings.png',
	bottom:48,
	left:246,
	width:51,
	height:51
});

//Arrow for settings
var settingsArrowImage = Titanium.UI.createImageView({
	image:IMAGE_PATH+'menu/arrow.png',
	bottom:INIT_BOTTOM_ANIMATION_ARROW,
	left:262,
	opacity:1
});

win.add(settingsArrowImage);

//Label for settings
var settingsLabel = Titanium.UI.createLabel({
	text:'ΡΥΘΜΙΣΕΙΣ',
	color:'white',
	left:244,
	bottom:INIT_BOTTOM_ANIMATION_LABEL,
	opacity:1,
	font:{fontSize:11, fontWeight:'bold', fontFamily:'Myriad Pro'}
});

win.add(settingsLabel);

//Profile icon reflection
var profileReflectionImage = Titanium.UI.createImageView({
	image:IMAGE_PATH+'menu/profile_r.png',
	bottom:0,
	left:21
});

//Profile icon
var profileImage = Titanium.UI.createButton({
	backgroundImage:IMAGE_PATH+'menu/profile.png',
	bottom:48,
	left:21,
	width:51,
	height:51
});

//Arrow for profile
var profileArrowImage = Titanium.UI.createImageView({
	image:IMAGE_PATH+'menu/arrow.png',
	bottom:INIT_BOTTOM_ANIMATION_ARROW,
	left:37,
	opacity:1
});

win.add(profileArrowImage);

//Label for profile
var profileLabel = Titanium.UI.createLabel({
	text:'ΠΡΟΦΙΛ',
	color:'white',
	left:25,
	bottom:INIT_BOTTOM_ANIMATION_LABEL,
	opacity:1,
	font:{fontSize:11, fontWeight:'bold', fontFamily:'Myriad Pro'}
});

win.add(profileLabel);

//Badges icon reflection
var badgesReflectionImage = Titanium.UI.createImageView({
	image:IMAGE_PATH+'menu/badges_r.png',
	bottom:0,
	left:96
});

//Badges icon
var badgesImage = Titanium.UI.createButton({
	backgroundImage:IMAGE_PATH+'menu/badges.png',
	bottom:48,
	left:96,
	width:51,
	height:51
});

//Arrow for badges
var badgesArrowImage = Titanium.UI.createImageView({
	image:IMAGE_PATH+'menu/arrow.png',
	bottom:INIT_BOTTOM_ANIMATION_ARROW,
	left:112,
	opacity:1
});

win.add(badgesArrowImage);

//Label for badges
var badgesLabel = Titanium.UI.createLabel({
	text:'ΠΑΡΑΣΗΜΑ',
	color:'white',
	left:92,
	bottom:INIT_BOTTOM_ANIMATION_LABEL,
	opacity:1,
	font:{fontSize:11, fontWeight:'bold', fontFamily:'Myriad Pro'}
});

win.add(badgesLabel);

//Top10 icon reflection
var topReflectionImage = Titanium.UI.createImageView({
	image:IMAGE_PATH+'menu/top10_r.png',
	bottom:0,
	left:171
});

//Top10 icon
var topImage = Titanium.UI.createButton({
	backgroundImage:IMAGE_PATH+'menu/top10.png',
	bottom:48,
	left:171,
	width:51,
	height:51
});

//Arrow for TOP10
var topArrowImage = Titanium.UI.createImageView({
	image:IMAGE_PATH+'menu/arrow.png',
	bottom:INIT_BOTTOM_ANIMATION_ARROW,
	left:187,
	opacity:1
});

win.add(topArrowImage);

//Label for top10
var topLabel = Titanium.UI.createLabel({
	text:'TOP 10',
	color:'white',
	left:179,
	bottom:INIT_BOTTOM_ANIMATION_LABEL,
	opacity:1,
	font:{fontSize:11, fontWeight:'bold', fontFamily:'Myriad Pro'}
});

win.add(topLabel);

//Event listener for Top10 button
topImage.addEventListener('click', function(){
	if(SOUNDS_MODE){
		audioClick.play();	
	}
	
	mtbImport("top_selection.js");
	
	buildTopSelectionView();
	viewTopCategorySelection.animate(anim_in);
});

//Event listener for Profile button
profileImage.addEventListener('click', function() {
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

//Event listener for Badges button
badgesImage.addEventListener('click', function(){
	if(SOUNDS_MODE){
		audioClick.play();	
	}
	
	mtbImport("stars_scroll.js");
	
	//load data
	var player = getCurrentPlayer();
	getBadgeData(player.id);
	
	buildBadgesListView();
});

//Event listener for Settings button
settingsImage.addEventListener('click', function(){
	Ti.API.warn('CLICK on settings image');
	if(SOUNDS_MODE){
		audioClick.play();	
	}
	
	//load data
	var player = getCurrentPlayer();
	
	mtbImport("settings.js");
	
	buildSettingsView();
	viewSettings.fireEvent('updateSettingsUI', {player:player});
});

bar.add(settingsReflectionImage);
bar.add(profileReflectionImage);
bar.add(badgesReflectionImage);
bar.add(topReflectionImage);
win.add(bar);
win.add(settingsImage);
win.add(profileImage);
win.add(badgesImage);
win.add(topImage);

win.open({fullscreen:true});
