//The view
var viewSettings = Ti.UI.createView({
	backgroundImage:IMAGE_PATH+'signin/background.jpg',
	opacity:0,
	top:0,
	bottom:0,
	left:0,
	right:0
});

//Back button
var backHomeSettingsButton = Titanium.UI.createButton({
	backgroundImage:IMAGE_PATH+'categories/back.png',
	left:30,
	top:25,
	width:55,
	height:55
});

//Back button event listener
backHomeSettingsButton.addEventListener('click', function() {
	
	if(SOUNDS_MODE){
		audioBack.play();	
	}
	
	Ti.API.info('BACK to home clicked from settings');
	
	destroySettingsView();
});
	
//UI components
var scrollViewSettings = null;

//Feedback bar
var settingsBottomBar = null;
var settingsBottomBarExpanded = false;
var settingsBottomBarLabel = null;
var settingsBottomBarIcon = null;
var settingsTitleBackgroundBar = null;
var settingsTitleLabel = null;
var settingsMusicBar = null;
var settingsMusicIcon = null;
var settingsMusicSepparator = null;
var switchMusicLabel = null;
var switchMusicSlash = null;
var settingsSoundsBar = null;
var settingsSoundsIcon = null;
var settingsSoundsSepparator = null;
var switchSoundsLabel = null;
var switchSoundsSlash = null;
var settingsPlayerDebugLabel = null;
var settingsVersionDebugLabel = null;

//Rotation matrixes
var tmpRotateMatrix = Ti.UI.create2DMatrix().rotate(180);
var tmpRotateAnimation = Ti.UI.createAnimation({transform:tmpRotateMatrix});
var tmpRotateMatrixInverse = Ti.UI.create2DMatrix().rotate(360);
var tmpRotateAnimationInverse = Ti.UI.createAnimation({transform:tmpRotateMatrixInverse});

var switchMusicON = null;
var switchMusicOFF = null;
var switchSoundON = null;
var switchSoundOFF = null;
var settingsLogoImage = null;

var COLOR_SWITCH_ON = 'a9e850';
var COLOR_SWITCH_OFF = 'a2a2a2';

function buildSettingsView(){
    checkForContentUpdate();
    
	var IPAD_OFFSET = 200;
	
	var shouldCreateView = settingsLogoImage == null;
	if(shouldCreateView){
		VIEWING_SETTINGS = true;
		
		//title background bar
		settingsTitleBackgroundBar = Titanium.UI.createView({
			backgroundColor:'0b4b7f',
			height:192,
			top:0
		});
		
		settingsTitleBackgroundBar.add(backHomeSettingsButton);
		
		//logo image
		settingsLogoImage = Titanium.UI.createImageView({
			image:IMAGE_PATH+'settings/settings_icon.png',
			top:25,
			right:33
		});
		settingsTitleBackgroundBar.add(settingsLogoImage);
		
		//Name Label value
		settingsTitleLabel = Titanium.UI.createLabel({
			text:'ΡΥΘΜΙΣΕΙΣ',
			color:'white',
			top:103,
			font:{fontSize:64, fontWeight:'bold', fontFamily:'Myriad Pro'}
		});
		settingsTitleBackgroundBar.add(settingsTitleLabel);
		
		viewSettings.add(settingsTitleBackgroundBar);
	
		scrollViewSettings = Ti.UI.createScrollView({
			contentWidth: 'auto',
		  	contentHeight: 'auto',
		  	showVerticalScrollIndicator: true,
		  	showHorizontalScrollIndicator: true,
		  	height: '95%',
		  	width: '100%',
		  	bottom:192,
		  	top:193
		});
		
		settingsMusicBar = Ti.UI.createView({
			backgroundColor:'0b4b7f',
		  	height:108,
		  	top:94
		});
		
		settingsMusicIcon = Ti.UI.createImageView({
			image:IMAGE_PATH+'settings/icon_music.png',
			left:29
		});
		settingsMusicBar.add(settingsMusicIcon);
		
		settingsMusicSepparator = Ti.UI.createView({
			backgroundColor:'white',
            opacity:0.5,
		  	height:108,
		  	left:130,
		  	width:2
		});
		settingsMusicBar.add(settingsMusicSepparator);
		
		switchMusicLabel = Ti.UI.createLabel({
			text:'ΜΟΥΣΙΚΗ',
			color:'white',
            left:171,
            top:41,
            font:{fontSize:33, fontWeight:'semibold', fontFamily:'Myriad Pro'}
        });
        settingsMusicBar.add(switchMusicLabel);
		
		switchMusicON = Ti.UI.createLabel({
            right:202,
            text:'ON',
            top:29,
            color:MUSIC_MODE ? COLOR_SWITCH_ON : COLOR_SWITCH_OFF,
            font:{fontSize:60, fontWeight:'bold', fontFamily:'Myriad Pro'},
            switch_flag:1
        });
        settingsMusicBar.add(switchMusicON);
        
        switchMusicSlash = Ti.UI.createLabel({
            right:154,
            text:'/',
            top:29,
            color:COLOR_SWITCH_OFF,
            font:{fontSize:60, fontWeight:'bold', fontFamily:'Myriad Pro'}
        });
        settingsMusicBar.add(switchMusicSlash);
        
        switchMusicOFF = Ti.UI.createLabel({
            right:26,
            text:'OFF',
            top:29,
            color:MUSIC_MODE ? COLOR_SWITCH_OFF : COLOR_SWITCH_ON,
            font:{fontSize:60, fontWeight:'bold', fontFamily:'Myriad Pro'},
            switch_flag:0
        });
        settingsMusicBar.add(switchMusicOFF);
        
        //switch event listener
        switchMusicON.addEventListener('click', handleMusicSwitchEvent);
        switchMusicOFF.addEventListener('click', handleMusicSwitchEvent);
		
		scrollViewSettings.add(settingsMusicBar);
		
		settingsSoundsBar = Ti.UI.createView({
			backgroundColor:'0b4b7f',
		  	height:108,
		  	top:220
		});
		
		settingsSoundsIcon = Ti.UI.createImageView({
			image:IMAGE_PATH+'settings/icon_sounds.png',
			left:28
		});
		settingsSoundsBar.add(settingsSoundsIcon);
		
		settingsSoundsSepparator = Ti.UI.createView({
			backgroundColor:'white',
            opacity:0.5,
		  	height:108,
		  	left:130,
		  	width:2
		});
		settingsSoundsBar.add(settingsSoundsSepparator);
		
		switchSoundsLabel = Ti.UI.createLabel({
			text:'ΗΧΟΙ',
			color:'white',
            left:171,
            top:41,
            font:{fontSize:33, fontWeight:'semibold', fontFamily:'Myriad Pro'}
        });
        settingsSoundsBar.add(switchSoundsLabel);
		
		switchSoundON = Ti.UI.createLabel({
            right:202,
            text:'ON',
            top:29,
            color:SOUNDS_MODE ? COLOR_SWITCH_ON : COLOR_SWITCH_OFF,
            font:{fontSize:60, fontWeight:'bold', fontFamily:'Myriad Pro'},
            switch_flag:1
        });
        settingsSoundsBar.add(switchSoundON);
        
        switchSoundsSlash = Ti.UI.createLabel({
            right:154,
            text:'/',
            top:29,
            color:COLOR_SWITCH_OFF,
            font:{fontSize:60, fontWeight:'bold', fontFamily:'Myriad Pro'}
        });
        settingsSoundsBar.add(switchSoundsSlash);
        
        switchSoundOFF = Ti.UI.createLabel({
            right:26,
            text:'OFF',
            top:29,
            color:SOUNDS_MODE ? COLOR_SWITCH_OFF : COLOR_SWITCH_ON,
            font:{fontSize:60, fontWeight:'bold', fontFamily:'Myriad Pro'},
            switch_flag:0
        });
        settingsSoundsBar.add(switchSoundOFF);
        
        switchSoundON.addEventListener('click', handleSoundsSwitchEvent);
        switchSoundOFF.addEventListener('click', handleSoundsSwitchEvent);
		
		scrollViewSettings.add(settingsSoundsBar);
		
		viewSettings.add(scrollViewSettings);
		
		//debug label for showing the player remote id
		var currentPlayer = getCurrentPlayer();
        var playerId = currentPlayer.player_id;
    
		settingsPlayerDebugLabel = Ti.UI.createLabel({
		    bottom:195,
		    right:5,
		    font:{fontSize:15, fontWeight:'bold', fontFamily:'Myriad Pro'},
		    color:'white',
		    text:playerId
		});
		
		viewSettings.add(settingsPlayerDebugLabel);
		
		var debugVersionString = "v " + Ti.App.getVersion() + ' c ' + CONTENT_VERSION;
		settingsVersionDebugLabel = Ti.UI.createLabel({
            bottom:195,
            left:5,
            font:{fontSize:15, fontWeight:'bold', fontFamily:'Myriad Pro'},
            color:'white',
            text:debugVersionString
        });
		
		viewSettings.add(settingsVersionDebugLabel);
		
		settingsBottomBar = Ti.UI.createView({
			bottom:0,
			height:192,
			backgroundColor:'fb494a'
		});
		settingsBottomBar.addEventListener('click', handleTipsClick);
		
		settingsBottomBarLabel = Titanium.UI.createLabel({
			text:'ΟΔΗΓΙΕΣ',
			color:'white',
			textAlign:'left',
			top:75,
			left:129,
			font:{fontSize:61, fontWeight:'bold', fontFamily:'Myriad Pro'}
		});
		settingsBottomBar.add(settingsBottomBarLabel);
		
		settingsBottomBarIcon = Ti.UI.createImageView({
			image:IMAGE_PATH+'settings/logo_exforge.png',
			top:79,
			right:132
		});
		settingsBottomBar.add(settingsBottomBarIcon);
		
		viewSettings.add(settingsBottomBar);
		
		win.add(viewSettings);
		
	} else {
		Ti.API.warn('NOT building Settings view - already in progress');
	}
}

function destroySettingsView(){
	var shouldDestroyView = settingsLogoImage != null;
	Ti.API.warn('destroySettingsView() called');
	
	if(shouldDestroyView){
		VIEWING_SETTINGS = false;
	
		viewSettings.animate(anim_out);
		
		switchMusicON.removeEventListener('click', handleMusicSwitchEvent);
		switchMusicOFF.removeEventListener('click', handleMusicSwitchEvent);
		switchSoundON.removeEventListener('click', handleSoundsSwitchEvent);
		switchSoundOFF.removeEventListener('click', handleSoundsSwitchEvent);
		settingsBottomBar.removeEventListener('click', handleTipsClick);
		
		settingsBottomBar.remove(settingsBottomBarLabel);
		settingsBottomBar.remove(settingsBottomBarIcon);
		viewSettings.remove(settingsBottomBar);
		
		settingsTitleBackgroundBar.remove(backHomeSettingsButton);
		settingsTitleBackgroundBar.remove(settingsTitleLabel);
		settingsTitleBackgroundBar.remove(settingsLogoImage);
		viewSettings.remove(settingsTitleBackgroundBar);
		
		scrollViewSettings.remove(settingsMusicBar);
		settingsMusicBar.remove(settingsMusicIcon);
		settingsMusicBar.remove(settingsMusicSepparator);
		settingsMusicBar.remove(switchMusicLabel);
		settingsMusicBar.remove(switchMusicON);
		settingsMusicBar.remove(switchMusicSlash);
		settingsMusicBar.remove(switchMusicOFF);
		scrollViewSettings.remove(settingsSoundsBar);
		settingsSoundsBar.remove(settingsSoundsIcon);
		settingsSoundsBar.remove(settingsSoundsSepparator);
		settingsSoundsBar.remove(switchSoundsLabel);
		settingsSoundsBar.remove(switchSoundON);
		settingsSoundsBar.remove(switchSoundsSlash);
		settingsSoundsBar.remove(switchSoundOFF);
		viewSettings.remove(scrollViewSettings);
		viewSettings.remove(settingsPlayerDebugLabel);
		
		settingsPlayerDebugLabel = null;
		settingsBottomBarLabel = null;
		settingsBottomBarIcon = null;
		settingsBottomBar = null;
		
		settingsTitleBackgroundBar = null;
		settingsTitleLabel = null;
		settingsMusicBar = null;
		settingsMusicIcon = null;
		settingsMusicSepparator = null;
		switchMusicLabel = null;
		switchMusicSlash = null;
		settingsSoundsBar = null;
		settingsSoundsIcon = null;
		settingsSoundsSepparator = null;
		switchSoundsLabel = null;
		switchSoundsSlash = null;
		
		//Facebook button
		scrollViewSettings = null;
		
		settingsLogoImage = null;
		
		win.remove(viewSettings);
	} else {
		Ti.API.warn('NOT destroying Settings view - already in progress');
	}
}

//Event handler for the MUSIC switch
function handleMusicSwitchEvent(e){
    var targetAction = e.source.switch_flag;
    Ti.API.info('handleMusicSwitchEvent() called with action '+targetAction);
    
	if(MUSIC_MODE){
		setMusicMode(false);
		MUSIC_MODE = false;
		
		if(audio.playing){
			audio.stop();
		}
		
		switchMusicON.color = COLOR_SWITCH_OFF;
		switchMusicOFF.color = COLOR_SWITCH_ON;
		
	} else {
		setMusicMode(true);
		MUSIC_MODE = true;
		
		if(!audio.playing){
			audio.reset();
			audio.play();
		}
		
		switchMusicON.color = COLOR_SWITCH_ON;
        switchMusicOFF.color = COLOR_SWITCH_OFF;
	}
}

//Event handler for the SOUNDS switch
function handleSoundsSwitchEvent(e){
    var targetAction = e.source.switch_flag;
    Ti.API.info('handleSoundsSwitchEvent() called with action '+targetAction);
    
	if(SOUNDS_MODE){
		setSoundsMode(false);
		SOUNDS_MODE = false;
		
		switchSoundON.color = COLOR_SWITCH_OFF;
        switchSoundOFF.color = COLOR_SWITCH_ON;
		
	} else {
		setSoundsMode(true);
		SOUNDS_MODE = true;
		
		switchSoundON.color = COLOR_SWITCH_ON;
        switchSoundOFF.color = COLOR_SWITCH_OFF;
	}
}

/*Handles the bottom bar animation*/
function handleSettingsBarSlide(){
	if(!settingsBottomBarExpanded){
		settingsBottomBar.animate({top:615,duration:250}, function(){
			settingsBottomBarExpanded = true;
			settingsBottomBarIcon.animate(tmpRotateAnimation);	
		});
	} else {
		settingsBottomBar.animate({top:970,duration:150}, function(){
			settingsBottomBarIcon.animate(tmpRotateAnimationInverse);
			settingsBottomBarExpanded = false;
		});
	}
}

/*Displays the FB disconnect dialog in the settings view and blocks the UI*/
function showFacebookDisconnectConfirmationSettings(){
	backHomeSettingsButton.touchEnabled = false;
}

//Event handler for OK on the FB disconnect alert
function facebookDisconnectAlertOK(){
	backHomeSettingsButton.touchEnabled = true;
	Titanium.Facebook.logout();
}

//Event handler for Cancel on the FB disconnect alert
function facebookDisconnectAlertCancel(){
	backHomeSettingsButton.touchEnabled = true;
}
	
//Refresh UI event listener
viewSettings.addEventListener('updateSettingsUI', function(data){
	Ti.API.info('---------Settings event: refreshing UI');
	
	var name = data.player.name;

	viewSettings.animate(anim_in);
});

//Event handler for the FB button
function handleSettingsFacebookButton(){
	if(!Titanium.Facebook.loggedIn){
		Ti.API.info('Facebook button clicked : NOT logged in, so logging in..');
		Titanium.Facebook.authorize();
	} else {
		//Show confirmation view
		showFacebookDisconnectConfirmationSettings();

		Ti.API.info('Facebook button clicked : IS logged in, so confirm log out?');
	}
}

//Event handler for the friends score switch
function handleFriendScoreSwitch(){
	var targetImage = '';
	var notificationOptionValue = 0;
	if(getNotificationOption(NOTIFICATION_OPTION_FRIEND_SCORE) == 1){
		targetImage = IMAGE_PATH+'settings/off.png';
		notificationOptionValue = 0;
	} else {
		targetImage = IMAGE_PATH+'settings/on.png';
		notificationOptionValue = 1;
	}
	
	//update UI image and persist locally
	setNotificationOption(NOTIFICATION_OPTION_FRIEND_SCORE, notificationOptionValue);
}

function handleFriendRegistrationSwitch(){
	var targetImage = '';
	var notificationOptionValue = 0;
	
	if(getNotificationOption(NOTIFICATION_OPTION_FRIEND_JOIN) == 1){
		targetImage = IMAGE_PATH+'settings/off.png';
		notificationOptionValue = 0;
	} else {
		targetImage = IMAGE_PATH+'settings/on.png';
		notificationOptionValue = 1;
	}
	
	//update UI image and persist locally
	setNotificationOption(NOTIFICATION_OPTION_FRIEND_JOIN, notificationOptionValue);
}

//Event handler for the info icon
function handleTipsClick(){
	if(SOUNDS_MODE){
		audioClick.play();	
	}
		
	Ti.API.info('Show Tips screen');
	
	mtbImport("tips.js");
	buildTipsView();
	viewTips.animate(anim_in);
}

//Event handler for the rate icon
function handleRateIcon(){
	if(SOUNDS_MODE){
		audioClick.play();	
	}
	
	Ti.Platform.openURL("itms-apps://ax.itunes.apple.com/WebObjects/MZStore.woa/wa/viewContentsUserReviews?type=Purple+Software&id=575291020");
}

//Event handler for the feedback icon
function handleFeedbackIcon(){
	if(SOUNDS_MODE){
		audioClick.play();	
	}
	
	mtbImport('feedback.js');
	buildFeedbackPopup();
}