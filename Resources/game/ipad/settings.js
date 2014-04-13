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
	settingsTextfieldUsername.blur();
	
	if(settingsTextfieldUsername.value != ''){
		savePlayer(settingsTextfieldUsername.value, fbId, null);
		Ti.API.info('Updated player object to '+settingsTextfieldUsername.value);
		
		playerObject = getCurrentPlayer();
		//Reload data for the MyProfile view if it's still open in the background
		if(VIEWING_PROFILE){
			var profileHighScores = getPlayerHighScores(playerObject.id,playerObject.player_id);
			var profileData = getProfileData(playerObject.id, playerObject.player_id);
	
			viewProfile.fireEvent('myProfile', {profileHighScores:profileHighScores, profileData:profileData, player:playerObject});
		}
	}
	
	if(SOUNDS_MODE){
		audioBack.play();	
	}
	
	saveNotificationOptionsOnline();
	
	Ti.API.info('BACK to home clicked from settings');
	
	destroySettingsView();
});
	
//UI components
var scrollViewSettings = null;
var fbDisconnectPlayerAlert = null;
var fbDisconnectPlayerLabel = null;
var fbDisconnectPlayerButton = null;
var fbDisconnectCancelButton = null;
var iconImageSettings = null;
var barImageSettings = null;
var iconReflectionImageSettings = null;
var titleImageSettings = null;
var playerLoginLabel = null;
var settingsTextfieldUsername = null;
var musicSoundsLabel = null;
var settingsMusicLabel = null;
var switchMusic = null;
var settingsSoundsLabel = null;
var switchSounds = null;
var notificationsLabel = null;
var notificationFriendScoreLabel = null;
var notificationInfoFriendScoreImage = null;
var notificationFriendScoreSwitch = null;
var notificationFriendRegistrationLabel = null;
var notificationInfoFriendRegistrationImage = null;
var notificationFriendRegistrationSwitch = null;
var fbButtonSettings = null;
var settingsTextfieldInfoLabel = null;
var settingsFBConnectInfoLabel = null;
var soundSettingInfoIcon = null;
var musicSettingInfoIcon = null;

//Feedback bar
var settingsBottomBar = null;
var settingsBottomBarExpanded = false;
var settingsBottomBarLabel = null;
var settingsBottomBarIcon = null;
//Feedback bar icons
var settingsIconAbout = null;
var settingsIconRate = null;
var settingsIconFeedback = null;

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
		var settingsTitleLabel = Titanium.UI.createLabel({
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
		
		var settingsMusicBar = Ti.UI.createView({
			backgroundColor:'0b4b7f',
		  	height:108,
		  	top:94
		});
		
		var settingsMusicIcon = Ti.UI.createImageView({
			image:IMAGE_PATH+'settings/icon_music.png',
			left:29
		});
		settingsMusicBar.add(settingsMusicIcon);
		
		var settingsMusicSepparator = Ti.UI.createView({
			backgroundColor:'white',
            opacity:0.5,
		  	height:108,
		  	left:130,
		  	width:2
		});
		settingsMusicBar.add(settingsMusicSepparator);
		
		var switchMusicLabel = Ti.UI.createLabel({
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
        
        var switchMusicSlash = Ti.UI.createLabel({
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
		
		var settingsSoundsBar = Ti.UI.createView({
			backgroundColor:'0b4b7f',
		  	height:108,
		  	top:220
		});
		
		var settingsSoundsIcon = Ti.UI.createImageView({
			image:IMAGE_PATH+'settings/icon_sounds.png',
			left:28
		});
		settingsSoundsBar.add(settingsSoundsIcon);
		
		var settingsSoundsSepparator = Ti.UI.createView({
			backgroundColor:'white',
            opacity:0.5,
		  	height:108,
		  	left:130,
		  	width:2
		});
		settingsSoundsBar.add(settingsSoundsSepparator);
		
		var switchSoundsLabel = Ti.UI.createLabel({
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
        
        var switchSoundsSlash = Ti.UI.createLabel({
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
		
		settingsIconAbout = Titanium.UI.createButton({
			backgroundImage:IMAGE_PATH+'settings/icon_about.png',
			bottom:10,
			left:20,
			width:177,
			height:242
		});
		
		settingsIconRate = Titanium.UI.createButton({
			backgroundImage:IMAGE_PATH+'settings/icon_rate.png',
			bottom:10,
			right:20,
			width:177,
			height:242
		});
		
		settingsIconFeedback = Titanium.UI.createButton({
			backgroundImage:IMAGE_PATH+'settings/icon_feedback.png',
			bottom:10,
			width:177,
			height:242
		});
		
		//settingsBottomBar.add(settingsBottomBarLabel);
		//settingsBottomBar.add(settingsIconAbout);
		//settingsBottomBar.add(settingsIconRate);
		//settingsBottomBar.add(settingsIconFeedback);
		//settingsBottomBar.add(settingsBottomBarIcon);
		
		//Bar icons event listener
		//settingsIconAbout.addEventListener('click', handleInfoIcon);
		settingsIconRate.addEventListener('click', handleRateIcon);
		settingsIconFeedback.addEventListener('click', handleFeedbackIcon);
		
		//settingsBottomBar.addEventListener('click', handleSettingsBarSlide);
		
		//FB disconnect player confirmation box
		fbDisconnectPlayerAlert = Titanium.UI.createImageView({
			image:IMAGE_PATH+'alert/alert_zoafuta.png',
			zIndex:12,
			visible:false
		});
		
		//viewSettings.add(fbDisconnectPlayerAlert);
	
		//Confirmation view score label
		fbDisconnectPlayerLabel = Titanium.UI.createLabel({
			text:'Θέλεις να κάνεις αποσύνδεση από το Facebook?',
			color:'white',
			textAlign:'center',
			top:60,
			left:45,
			right:45,
			width:400,
			height:'auto',
			font:{fontSize:31, fontWeight:'regular', fontFamily:'Myriad Pro'}
		});
	
		//fbDisconnectPlayerAlert.add(fbDisconnectPlayerLabel);
		
		//FB disconect alert OK button
		fbDisconnectPlayerButton = Titanium.UI.createImageView({
			image:IMAGE_PATH+'alert/yes.png',
			left:30,
			bottom:20,
			zIndex:12
		});
	
		//FB disconnect alert CANCEL button
		fbDisconnectCancelButton = Titanium.UI.createImageView({
			image:IMAGE_PATH+'alert/no.png',
			bottom:20,
			right:30,
			zIndex:12
		});
	
		//fbDisconnectPlayerAlert.add(fbDisconnectPlayerButton);
		//fbDisconnectPlayerAlert.add(fbDisconnectCancelButton);
		
		//FB disconnect OK event listener
		fbDisconnectPlayerButton.addEventListener('click', facebookDisconnectAlertOK);
		
		//FB disconnect cancel event listener
		fbDisconnectCancelButton.addEventListener('click', facebookDisconnectAlertCancel);
		
		//Icon image
		iconImageSettings = Titanium.UI.createImageView({
			image:IMAGE_PATH+'settings/icon.png',
			top:16,
			right:15
		});
		
		//viewSettings.add(iconImageSettings);
	
		//Bar image
		barImageSettings = Titanium.UI.createImageView({
			image:IMAGE_PATH+'settings/bar.png',
			top:108
		});
		
		//viewSettings.add(barImageSettings);
	
		//Icon image reflection
		iconReflectionImageSettings = Titanium.UI.createImageView({
			image:IMAGE_PATH+'settings/icon_r.png',
			top:1,
			right:15
		});
		
		//barImageSettings.add(iconReflectionImageSettings);
	
		//Title image
		titleImageSettings = Titanium.UI.createImageView({
			image:IMAGE_PATH+'settings/title.png',
			top:49,
			zIndex:2
		});
		
		//viewSettings.add(titleImageSettings);
		
		//High scores label
		playerLoginLabel = Titanium.UI.createLabel({
			text:'PLAYER LOGIN',
			color:'white',
			left:20,
			top:130,
			height:50,
			font:{fontSize:38, fontWeight:'bold', fontFamily:'321impact'}
		});
		
		//scrollViewSettings.add(playerLoginLabel);
	
		settingsTextfieldUsername = Titanium.UI.createTextField({
			value:'',
			hintText:'  Γράψε Όνομα',
			height:54,
			top:190,
			left:20,
			width:475,
			color:'gray',
			font:{fontSize:25, fontWeight:'regular'},
			enabled: true,
			borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
		});
		
		//scrollViewSettings.add(settingsTextfieldUsername);
	
		settingsTextfieldInfoLabel = Titanium.UI.createLabel({
			text:'(απλό παιχνίδι)',
			color:'gray',
			textAlign:'center',
			top:205,
			right:55,
			font:{fontSize:24, fontWeight:'regular', fontFamily:'Myriad Pro'}
		});
	
		//scrollViewSettings.add(settingsTextfieldInfoLabel);
		
		settingsFBConnectInfoLabel = Titanium.UI.createLabel({
			text:'(προκλητικό)',
			color:'gray',
			textAlign:'center',
			top:288,
			right:55,
			font:{fontSize:24, fontWeight:'regular', fontFamily:'Myriad Pro'}
		});
	
		//scrollViewSettings.add(settingsFBConnectInfoLabel);
	
		//Music section label
		musicSoundsLabel = Titanium.UI.createLabel({
			text:'MUSIC & SOUNDS',
			color:'white',
			left:20,
			top:193+IPAD_OFFSET,
			height:50,
			font:{fontSize:38, fontWeight:'bold', fontFamily:'321impact'}
		});
		
		//scrollViewSettings.add(musicSoundsLabel);
	
		//Music label
		settingsMusicLabel = Titanium.UI.createLabel({
			text:'ΜΟΥΣΙΚΗ',
			color:'white',
			textAlign:'center',
			top:459,
			left:50,
			font:{fontSize:22, fontWeight:'regular', fontFamily:'Myriad Pro'}
		});
		
		//scrollViewSettings.add(settingsMusicLabel);
		
		musicSettingInfoIcon = Ti.UI.createImageView({
			image:IMAGE_PATH+'settings/thunder.png',
			top:453,
			left:15
		});
		
		//scrollViewSettings.add(musicSettingInfoIcon);
	
		//MUSIC switch
		switchMusic = Titanium.UI.createImageView({
			image:getMusicMode() ? IMAGE_PATH+'settings/on.png' : IMAGE_PATH+'settings/off.png',
			right:55,
			top:440
		});
		
		//MUSIC switch event listener
		//scrollViewSettings.add(switchMusic);
	
		//Sounds label
		settingsSoundsLabel = Titanium.UI.createLabel({
			text:'ΗΧΟΙ',
			color:'white',
			textAlign:'center',
			top:528,
			left:50,
			font:{fontSize:22, fontWeight:'regular', fontFamily:'Myriad Pro'}
		});
		
		//scrollViewSettings.add(settingsSoundsLabel);
		
		soundSettingInfoIcon = Ti.UI.createImageView({
			image:IMAGE_PATH+'settings/thunder.png',
			top:523,
			left:15
		});
	
		//scrollViewSettings.add(soundSettingInfoIcon);
	
		//SOUNDS switch
		switchSounds = Titanium.UI.createImageView({
			image:getSoundsMode() ? IMAGE_PATH+'settings/on.png' : IMAGE_PATH+'settings/off.png',
			right:55,
			top:510
		});
		
		//scrollViewSettings.add(switchSounds);
		//SOUNDS switch event listener
		switchSounds.addEventListener('click', handleSoundsSwitchEvent);
		
		//Notifications section label
		notificationsLabel = Titanium.UI.createLabel({
			text:'NOTIFICATIONS',
			color:'white',
			left:20,
			top:623,
			height:50,
			font:{fontSize:38, fontWeight:'bold', fontFamily:'321impact'}
		});
		
		//scrollViewSettings.add(notificationsLabel);
	
		//Notification friends higher score label
		notificationFriendScoreLabel = Titanium.UI.createLabel({
			text:'Προσπέραση φίλων',
			color:'white',
			textAlign:'center',
			top:689,
			left:55,
			font:{fontSize:22, fontWeight:'regular', fontFamily:'Myriad Pro'}
		});
		
		//scrollViewSettings.add(notificationFriendScoreLabel);
	
		notificationInfoFriendScoreImage = Ti.UI.createImageView({
			image:IMAGE_PATH+'settings/thunder.png',
			top:747,
			left:15
		});
		
		//scrollViewSettings.add(notificationInfoFriendScoreImage);
		
		notificationFriendScoreSwitch = Titanium.UI.createImageView({
			image:getNotificationOption(NOTIFICATION_OPTION_FRIEND_SCORE) == '1' ? IMAGE_PATH+'settings/on.png' : IMAGE_PATH+'settings/off.png',
			right:55,
			top:665
		});
			
		//scrollViewSettings.add(notificationFriendScoreSwitch);
		notificationFriendScoreSwitch.addEventListener('click', handleFriendScoreSwitch);
		
		//Notification friends registration label
		notificationFriendRegistrationLabel = Titanium.UI.createLabel({
			text:'Εγγραφή νέων φίλων',
			color:'white',
			textAlign:'center',
			top:753,
			left:55,
			font:{fontSize:22, fontWeight:'regular', fontFamily:'Myriad Pro'}
		});
		
		//scrollViewSettings.add(notificationFriendRegistrationLabel);
	
		notificationInfoFriendRegistrationImage = Ti.UI.createImageView({
			image:IMAGE_PATH+'settings/thunder.png',
			top:686,
			left:15
		});
		
		//scrollViewSettings.add(notificationInfoFriendRegistrationImage);
		
		notificationFriendRegistrationSwitch = Titanium.UI.createImageView({
			image:getNotificationOption(NOTIFICATION_OPTION_FRIEND_JOIN) == '1' ? IMAGE_PATH+'settings/on.png' : IMAGE_PATH+'settings/off.png',
			right:55,
			top:735
		});
		
		//scrollViewSettings.add(notificationFriendRegistrationSwitch);
		//Event listener for notification switch friend registration switch
		notificationFriendRegistrationSwitch.addEventListener('click', handleFriendRegistrationSwitch);
		
		//Facebook button
		fbButtonSettings = Titanium.UI.createImageView({
			image:IMAGE_PATH+'login/fb_connect.png',
			top:263,
			left:20,
			height:'auto',
			width:'auto'
		});
		
		//scrollViewSettings.add(fbButtonSettings);
		//Facebook button event listener
		fbButtonSettings.addEventListener('click', handleSettingsFacebookButton);	
		
		win.add(viewSettings);
		
	} else {
		Ti.API.warn('NOT building Settings view - already in progress');
	}
}

function destroySettingsView(){
	var shouldDestroyView = scrollViewSettings != null;
	Ti.API.warn('destroySettingsView() called');
	
	if(shouldDestroyView){
		VIEWING_SETTINGS = false;
	
		viewSettings.animate(anim_out);
		
		//settings bar icons listener
		//settingsIconAbout.removeEventListener('click', handleInfoIcon);
		settingsIconRate.removeEventListener('click', handleRateIcon);
		settingsIconFeedback.removeEventListener('click', handleFeedbackIcon);
		//settings bar event listener
		settingsBottomBar.removeEventListener('click', handleSettingsBarSlide);
		//Facebook button event listener
		fbButtonSettings.removeEventListener('click', handleSettingsFacebookButton);
		//FB disconnect OK event listener
		fbDisconnectPlayerButton.removeEventListener('click', facebookDisconnectAlertOK);
		//FB disconnect cancel event listener
		fbDisconnectCancelButton.removeEventListener('click', facebookDisconnectAlertCancel);
		switchMusic.removeEventListener('click', handleMusicSwitchEvent);
		//SOUNDS switch event listener
		switchSounds.removeEventListener('click', handleSoundsSwitchEvent);
		notificationFriendScoreSwitch.removeEventListener('click', handleFriendScoreSwitch);
		//Event listener for notification switch friend registration switch
		notificationFriendRegistrationSwitch.removeEventListener('click', handleFriendRegistrationSwitch);
		
		//bottom bar
		settingsBottomBar.remove(settingsBottomBarLabel);
		//settingsBottomBar.remove(settingsIconAbout);
		settingsBottomBar.remove(settingsIconRate);
		settingsBottomBar.remove(settingsIconFeedback);
		settingsBottomBar.remove(settingsBottomBarIcon);
		viewSettings.remove(settingsBottomBar);
		
		fbDisconnectPlayerAlert.remove(fbDisconnectPlayerButton);
		fbDisconnectPlayerAlert.remove(fbDisconnectCancelButton);
		fbDisconnectPlayerAlert.remove(fbDisconnectPlayerLabel);
		
		scrollViewSettings.remove(fbButtonSettings);
		scrollViewSettings.remove(notificationFriendRegistrationSwitch);
		scrollViewSettings.remove(notificationInfoFriendRegistrationImage);
		scrollViewSettings.remove(notificationFriendRegistrationLabel);
		scrollViewSettings.remove(notificationFriendScoreSwitch);
		scrollViewSettings.remove(notificationInfoFriendScoreImage);
		scrollViewSettings.remove(notificationFriendScoreLabel);
		scrollViewSettings.remove(notificationsLabel);
		scrollViewSettings.remove(switchSounds);
		scrollViewSettings.remove(settingsSoundsLabel);
		scrollViewSettings.remove(switchMusic);
		scrollViewSettings.remove(settingsMusicLabel);
		scrollViewSettings.remove(musicSoundsLabel);
		scrollViewSettings.remove(settingsTextfieldUsername);
		scrollViewSettings.remove(playerLoginLabel);
		
		scrollViewSettings.remove(settingsTextfieldInfoLabel);
		scrollViewSettings.remove(settingsFBConnectInfoLabel);
		scrollViewSettings.remove(soundSettingInfoIcon);
		scrollViewSettings.remove(musicSettingInfoIcon);
		
		barImageSettings.remove(iconReflectionImageSettings);
		
		viewSettings.remove(titleImageSettings);
		viewSettings.remove(barImageSettings);
		viewSettings.remove(iconImageSettings);
		viewSettings.remove(fbDisconnectPlayerAlert);
		viewSettings.remove(scrollViewSettings);
		
		settingsBottomBarLabel = null;
		settingsIconAbout = null;
		settingsIconRate = null;
		settingsIconFeedback = null;
		settingsBottomBarIcon = null;
		settingsBottomBar = null;
		
		//FB disconnect player confirmation box
		fbDisconnectPlayerAlert = null;
		//Confirmation view score label
		fbDisconnectPlayerLabel = null;
		//FB disconect alert OK button
		fbDisconnectPlayerButton = null;
		//FB disconnect alert CANCEL button
		fbDisconnectCancelButton = null;
		//Icon image
		iconImageSettings = null;
		//Bar image
		barImageSettings = null;
		//Icon image reflection
		iconReflectionImageSettings = null;
		//Title image
		titleImageSettings = null;
		//High scores label
		playerLoginLabel = null;
		settingsTextfieldUsername = null;
		//Music section label
		musicSoundsLabel = null;
		//Music label
		settingsMusicLabel = null;
		//MUSIC switch
		switchMusic = null;
		//MUSIC switch event listener
		//Sounds label
		settingsSoundsLabel = null;
		//SOUNDS switch
		switchSounds = null;
		//Notifications section label
		notificationsLabel = null;
		//Notification friends higher score label
		notificationFriendScoreLabel = null;
		notificationInfoFriendScoreImage = null;
		notificationFriendScoreSwitch = null;
		//Notification friends registration label
		notificationFriendRegistrationLabel = null;
		notificationInfoFriendRegistrationImage = null;
		notificationFriendRegistrationSwitch = null;
		
		settingsTextfieldInfoLabel = null;
		settingsFBConnectInfoLabel = null;
		soundSettingInfoIcon = null;
		musicSettingInfoIcon = null;
		
		//Facebook button
		fbButtonSettings = null;
		scrollViewSettings = null;
		
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
	fbDisconnectPlayerAlert.show();
	backHomeSettingsButton.touchEnabled = false;
	switchSounds.touchEnabled = false;
	switchMusic.touchEnabled = false;
}

//Event handler for OK on the FB disconnect alert
function facebookDisconnectAlertOK(){
	fbDisconnectPlayerAlert.hide();
	backHomeSettingsButton.touchEnabled = true;
	switchSounds.touchEnabled = true;
	switchMusic.touchEnabled = true;
	Titanium.Facebook.logout();
}

//Event handler for Cancel on the FB disconnect alert
function facebookDisconnectAlertCancel(){
	fbDisconnectPlayerAlert.hide();
	backHomeSettingsButton.touchEnabled = true;
	switchSounds.touchEnabled = true;
	switchMusic.touchEnabled = true;
}
	
//Refresh UI event listener
viewSettings.addEventListener('updateSettingsUI', function(data){
	Ti.API.info('---------Settings event: refreshing UI');
	
	var name = data.player.name;
	settingsTextfieldUsername.value = name;

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
	notificationFriendScoreSwitch.image = targetImage;
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
	notificationFriendRegistrationSwitch.image = targetImage;
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