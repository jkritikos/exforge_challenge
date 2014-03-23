//The signin view
var viewSignin = Ti.UI.createView({
	backgroundImage:IMAGE_PATH+'signin/background.jpg',
	opacity:0,
	top:0,
	bottom:0,
	left:0,
	right:0
});

//Refresh UI event listener
viewSignin.addEventListener('updatePlayerUI', function(data){
	var name = data.player.name;
	//signinTextField.value = name;
	Ti.API.info('---------Player event refreshing UI ENDS');
});

//Back button
var backHomeFromPlayerButton = Titanium.UI.createButton({
	backgroundImage:IMAGE_PATH+'back.png',
	backgroundSelectedImage:IMAGE_PATH+'back_green.png',
	left:8,
	top:8,
	height:52,
	width:52
});

viewSignin.add(backHomeFromPlayerButton);

//Back button event listener
backHomeFromPlayerButton.addEventListener('click', function() {
	if(SOUNDS_MODE){
		audioBack.play();	
	}
	
	Ti.API.info('BACK to home clicked from PLAYER win');
	signinTextField.blur();
	
	destroyPlayerLoginView();
});
	

//UI components
/*var alertImageBg = IMAGE_PATH+'alert/alert_zoafuta.png';
var alertPlayerOK = IMAGE_PATH+'alert/yes.png';
var loginLabel = null;
var alertViewPlayer = null;
var alertPlayerLabel = null;
var alertViewPlayerButton = null;
var confirmationViewPlayer = null;
var confirmationPlayerLabel = null;
var confirmationViewPlayerButton = null;
var confirmationViewCancelButton = null;
//var buttonStart = null;
var loginBarImage = null;
var barLabel = null;*/

var signinPlayNowBar = null;
var signinPlayNowLabel = null;
var signinPlayNowLabelAttributes = null;
var signinTitleBackgroundBar = null;
var signinTitleLabel = null;
var signinBackgroundLogo = null;
var signinTextFieldBar = null;
var signinTextfieldLogo = null;
var signinTextfieldSepparator = null;
var signinTextfieldHintText = null;
var signinTextField = null;

function buildPlayerLoginView(){
	var shouldCreateView = signinTitleLabel == null;
	if(shouldCreateView){
		VIEWING_LOGIN = true;
		
		//title background bar
		signinTitleBackgroundBar = Titanium.UI.createView({
			backgroundColor:'0b4b7f',
			height:192,
			top:0
		});
		
		signinTitleLabel = Titanium.UI.createLabel({
			text:'Διάλεξε το όνομα που επιθυμεις στο Exforge Challenge!',
			color:'white',
			textAlign:'center',
			width:446,
			height:77,
			top:60,
			font:{fontSize:31, fontWeight:'semibold', fontFamily:'Myriad Pro'}
		});
		signinTitleBackgroundBar.add(signinTitleLabel);
		
		viewSignin.add(signinTitleBackgroundBar);
		
		//textfield background bar
		signinTextFieldBar = Titanium.UI.createView({
			backgroundColor:'fb494a',
			height:110,
			top:236
		});
		
		//textfield logo
		signinTextfieldLogo = Titanium.UI.createImageView({
			image:IMAGE_PATH+'signin/profile.png',
			left:28
		});
		
		signinTextFieldBar.add(signinTextfieldLogo);
		
		//sepparator of profile avatar and textfield
		signinTextfieldSepparator = Titanium.UI.createView({
			backgroundColor:'white',
			width:1,
			left:117
		});
		
		signinTextFieldBar.add(signinTextfieldSepparator);
		
		signinTextField = Titanium.UI.createTextField({
			value:playerName,
			left:158,
			height:110,
			width:622,
			enabled: true,//Titanium.Facebook.loggedIn ? false : true,
			font:{fontSize:35, fontWeight:'regular'}
		});
		
		signinTextFieldBar.add(signinTextField);
		signinTextField.addEventListener('change', handleSigninTextFieldChange);
		
		//textfield hintText
		signinTextfieldHintText = Titanium.UI.createLabel({
			text:'Διάλεξε όνομα εδώ',
			textAlign:'left',
			width:'auto',
			height:27,
			top:40,
			left:158,
			color:'white',
			font:{fontSize:35, fontWeight:'regular', fontFamily:'Myriad Pro'}
		});
		
		signinTextFieldBar.add(signinTextfieldHintText);
		
		viewSignin.add(signinTextFieldBar);
		
		//background logo
		signinBackgroundLogo = Titanium.UI.createImageView({
			image:IMAGE_PATH+'signin/logo.png',
			top:398
		});
		
		viewSignin.add(signinBackgroundLogo);
		
		//play now bar
		signinPlayNowBar = Titanium.UI.createView({
			backgroundColor:'0b4b7f',
			height:168,
			bottom:0
		});
		
		viewSignin.add(signinPlayNowBar);
		
		//Event listener for play now button
		signinPlayNowBar.addEventListener('click', handleButtonStartEvent);
		
		//play now label attributes
		signinPlayNowLabelAttributes = Titanium.UI.iOS.createAttributedString({
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
		signinPlayNowLabel = Titanium.UI.createLabel({
			attributedString:signinPlayNowLabelAttributes,
			font:{fontSize:67, fontWeight:'bold', fontFamily:'Arial'}
		});
		
		signinPlayNowBar.add(signinPlayNowLabel);
		
		
		//Alert view
		/*alertViewPlayer = Titanium.UI.createImageView({
			image:alertImageBg,
			zIndex:12,
			visible:false
		});
			
		//Alert view score label
		alertPlayerLabel = Titanium.UI.createLabel({
			text:'Γράψε το όνομα σου για να παίξεις!',
			color:'white',
			textAlign:'center',
			top:65,
			left:35,
			right:35,
			width:415,
			font:{fontSize:30, fontWeight:'regular', fontFamily:'Myriad Pro'}
		});
			
		//Alert view score button
		alertViewPlayerButton = Titanium.UI.createImageView({
			image:alertPlayerOK,
			bottom:20,
			zIndex:12
		});
			
		alertViewPlayer.add(alertPlayerLabel);
		alertViewPlayer.add(alertViewPlayerButton);
		
		//Confirmation view
		confirmationViewPlayer = Titanium.UI.createImageView({
			image:alertImageBg,
			zIndex:12,
			visible:false
		});
	
		//FB disconect alert OK button
		confirmationViewPlayerButton = Titanium.UI.createImageView({
			image:IMAGE_PATH+'alert/yes.png',
			left:30,
			bottom:10,
			zIndex:12
		});
	
		//FB disconnect alert CANCEL button
		confirmationViewCancelButton = Titanium.UI.createImageView({
			image:IMAGE_PATH+'alert/no.png',
			bottom:10,
			right:30,
			zIndex:12
		});
		
		//FB disconnect OK event listener
		confirmationViewPlayerButton.addEventListener('click', handleFacebookDisconnectOK);
		
		//FB disconnect cancel event listener
		confirmationViewCancelButton.addEventListener('click', handleFacebookDisconnectCancel);
		
		//confirmationViewPlayer.hide();
		//confirmationViewPlayer.add(confirmationPlayerLabel);
		confirmationViewPlayer.add(confirmationViewPlayerButton);
		confirmationViewPlayer.add(confirmationViewCancelButton);
		
		
		//buttonStart.animate(scaleAnimation);
		
		//Event listener for player alert OK button
		alertViewPlayerButton.addEventListener('click', handleAlertViewPlayerOK);
		
		//Bar image
		loginBarImage = Titanium.UI.createImageView({
			image:IMAGE_PATH+'login/bar.png',
			right:0,
			bottom:30,
			height:'auto',
			width:'auto'
		});
		
	
		barLabel = Titanium.UI.createLabel({
			text:'* Τα στοιχεία που δίνεις θα χρησιμοποιηθούν μόνο για χρήση βαθμολογίας του παιχνιδιού!',
			color:'white',
			textAlign:'center',
			width:'auto',
			height:'auto',
			top:43,
			font:{fontSize:19, fontWeight:'regular', fontFamily:'Myriad Pro'}
		});
		
		loginBarImage.add(barLabel);*/
		
		win.add(viewSignin);
	} else {
		Ti.API.warn('NOT building PlayerLogin view - already in progress');
	}
}

function destroyPlayerLoginView(){
	Ti.API.warn('destroyPlayerLoginView() called');
	
	VIEWING_LOGIN = false;
	viewSignin.animate(anim_out);
	
	//Event listener for player alert OK button
	//alertViewPlayerButton.removeEventListener('click', handleAlertViewPlayerOK);
	//FB disconnect OK event listener
	//confirmationViewPlayerButton.removeEventListener('click', handleFacebookDisconnectOK);
	//FB disconnect cancel event listener
	//confirmationViewCancelButton.removeEventListener('click', handleFacebookDisconnectCancel);
	//Event listener for play button
	signinPlayNowBar.removeEventListener('click', handleButtonStartEvent);
	
	//alertViewPlayer.hide();
	//palertViewPlayer.remove(alertPlayerLabel);
	//alertViewPlayer.remove(alertViewPlayerButton);
	
	//confirmationViewPlayer.hide();
	//confirmationViewPlayer.remove(confirmationPlayerLabel);
	//confirmationViewPlayer.remove(confirmationViewPlayerButton);
	//confirmationViewPlayer.remove(confirmationViewCancelButton);
	//loginBarImage.remove(barLabel);
	
	//Alert view
	//alertViewPlayer = null;
	//loginLabel = null;
	//Alert view score label
	//alertPlayerLabel = null;
	//Alert view score button
	//alertViewPlayerButton = null;
	//Confirmation view
	//confirmationViewPlayer = null;
	//Confirmation view score label
	//confirmationPlayerLabel = null;
	//FB disconect alert OK button
	//confirmationViewPlayerButton = null;
	//FB disconnect alert CANCEL button
	//confirmationViewCancelButton = null;
	//Play button
	//buttonStart = null;
	//Facebook button
	//fbButton = null;	
	//Bar image
	loginBarImage = null;
	barLabel = null;
	
	win.remove(viewSignin);
	win.fireEvent('animateMenu');
}

//Event handler for the hintText when changed
function handleSigninTextFieldChange(){
	if(signinTextField.value != ''){
		signinTextfieldHintText.hide();
	}else {
		signinTextfieldHintText.show();
	}
}

//Event handler for FB disconnect OK
/*function handleFacebookDisconnectOK(){
	confirmationViewPlayer.hide();
	backHomeFromPlayerButton.touchEnabled = true;
	playButton.touchEnabled = true;
	//Titanium.Facebook.logout();
}

//Event handler for FB disconnect Cancel
function handleFacebookDisconnectCancel(){
	confirmationViewPlayer.hide();
	backHomeFromPlayerButton.touchEnabled = true;
	playButton.touchEnabled = true;
}

//Displays the FB disconnect dialog and blocks the UI
function showFacebookDisconnectConfirmation(){
	confirmationViewPlayer.show();
	backHomeFromPlayerButton.touchEnabled = false;
	playButton.touchEnabled = false;
}

function handleAlertViewPlayerOK(){
	alertViewPlayer.hide();
	signinTextField.enabled = true;
	backHomeFromPlayerButton.touchEnabled = true;
	//fbButton.touchEnabled = true;
}
	
Ti.API.info('Player.js persisted player is '+playerName + ' persisted facebook is '+fbId);*/

//Event handler for the PLAY button
function handleButtonStartEvent(){
	if(SOUNDS_MODE){
		audioClick.play();	
	}
	
	//buttonStart.image = IMAGE_PATH+'login/play_pressed.png';
	
	signinTextField.value = signinTextField.value.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
	if(signinTextField.value != ''){
		
		signinTextField.blur();
		savePlayer(signinTextField.value, null,null);
		Ti.API.info('signin.js: Player '+signinTextField.value+' enters game');
		
		//Build and show the Categories view
		mtbImport("categories.js");
		buildCategoriesView();
		view.animate({opacity:1, duration:400}, function(){
			destroyPlayerLoginView();
		});
		
	} else {
		alert('You need to choose a name!');
		//alertViewPlayer.show();
		//signinTextField.enabled = false;
		//backHomeFromPlayerButton.touchEnabled = false;
		//fbButton.touchEnabled = false;
	}
	
	//buttonStart.image = IMAGE_PATH+'login/play.png';
}
