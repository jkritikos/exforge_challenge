//The view
var viewPlayer = Ti.UI.createView({
	backgroundImage:IMAGE_PATH+'background.jpg',
	opacity:0,
	top:0,
	bottom:0,
	left:0,
	right:0
});

//Refresh UI event listener
viewPlayer.addEventListener('updatePlayerUI', function(data){
	var name = data.player.name;
	tf1.value = name;
	Ti.API.info('---------Player event refreshing UI ENDS');
});

//Back button
var backHomeFromPlayerButton = Titanium.UI.createButton({
	backgroundImage:IMAGE_PATH+'back.png',
	backgroundSelectedImage:IMAGE_PATH+'back_green.png',
	left:8,
	top:8,
	height:30,
	width:30
});

//Back button event listener
backHomeFromPlayerButton.addEventListener('click', function() {
	if(SOUNDS_MODE){
		audioBack.play();	
	}
	
	Ti.API.info('BACK to home clicked from PLAYER win');
	tf1.blur();
	
	destroyPlayerLoginView();
});
	
viewPlayer.add(backHomeFromPlayerButton);

//UI components
var alertImageBg = IMAGE_PATH+'alert/alert_zoafuta.png';
var alertPlayerOK = IMAGE_PATH+'alert/yes.png';
var loginLabel = null;
var alertViewPlayer = null;
var alertPlayerLabel = null;
var alertViewPlayerButton = null;
var confirmationViewPlayer = null;
var confirmationPlayerLabel = null;
var confirmationViewPlayerButton = null;
var confirmationViewCancelButton = null;
var tf1 = null;
var buttonStart = null;
var fbButton = null;
var loginBarImage = null;
var barLabel = null;

function buildPlayerLoginView(){
	var shouldCreateView = loginLabel == null;
	if(shouldCreateView){
		VIEWING_LOGIN = true;
		
		loginLabel = Titanium.UI.createLabel({
			text:'Γράψε το όνομα που επιθυμείς να έχεις ή συνδέσου μέσω Facebook',
			color:'white',
			textAlign:'center',
			width:'80%',
			top:54,
			height:'auto',
			font:{fontSize:14, fontWeight:'regular', fontFamily:'Myriad Pro'}
		});
		
		viewPlayer.add(loginLabel);
		
		//Alert view
		alertViewPlayer = Titanium.UI.createImageView({
			image:alertImageBg,
			zIndex:12,
			visible:false
		});
			
		//Alert view score label
		alertPlayerLabel = Titanium.UI.createLabel({
			text:'Γράψε το όνομα σου ή συνδέσου μέσω Facebook για να παίξεις!',
			color:'white',
			textAlign:'center',
			top:31,
			left:45,
			right:45,
			font:{fontSize:16, fontWeight:'regular', fontFamily:'Myriad Pro'}
		});
			
		//Alert view score button
		alertViewPlayerButton = Titanium.UI.createImageView({
			image:alertPlayerOK,
			bottom:10,
			zIndex:12
		});
			
		alertViewPlayer.add(alertPlayerLabel);
		alertViewPlayer.add(alertViewPlayerButton);
		viewPlayer.add(alertViewPlayer);
		
		//Confirmation view
		confirmationViewPlayer = Titanium.UI.createImageView({
			image:alertImageBg,
			zIndex:12,
			visible:false
		});
	
		//Confirmation view score label
		confirmationPlayerLabel = Titanium.UI.createLabel({
			text:'Θέλεις να γίνει αποσύνδεση από το Facebook?',
			color:'white',
			textAlign:'center',
			top:31,
			left:45,
			right:45,
			width:'auto',
			height:'auto',
			font:{fontSize:16, fontWeight:'regular', fontFamily:'Myriad Pro'}
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
		confirmationViewPlayer.add(confirmationPlayerLabel);
		confirmationViewPlayer.add(confirmationViewPlayerButton);
		confirmationViewPlayer.add(confirmationViewCancelButton);
		viewPlayer.add(confirmationViewPlayer);
		
		tf1 = Titanium.UI.createTextField({
			value:playerName,
			hintText:'  Γράψε Όνομα',
			height:34,
			top:100,
			width:277,
			enabled: Titanium.Facebook.loggedIn ? false : true,
			borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
		});
	
		viewPlayer.add(tf1);
	
		//Play button
		buttonStart = Titanium.UI.createImageView({
			image:IMAGE_PATH+'login/play.png',
			bottom:IPHONE5 ? 198 : 170
		});
		
		viewPlayer.add(buttonStart);
		buttonStart.animate(scaleAnimation);
		
		//Event listener for play button
		buttonStart.addEventListener('click', handleButtonStartEvent);
		
		//Facebook button
		fbButton = Titanium.UI.createImageView({
			image:Titanium.Facebook.loggedIn ? IMAGE_PATH+'login/fb_disconnect.png' : IMAGE_PATH+'login/fb_connect.png',
			top:145,
			height:'auto',
			width:'auto'
		});
		
		viewPlayer.add(fbButton);
		
		//Facebook button event listener
		fbButton.addEventListener('click', handleFacebookClickEvent);
		
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
		
		viewPlayer.add(loginBarImage);
	
		barLabel = Titanium.UI.createLabel({
			text:'* Τα στοιχεία που δίνεις θα χρησιμοποιηθούν μόνο για χρήση βαθμολογίας του παιχνιδιού!',
			color:'white',
			textAlign:'center',
			width:'auto',
			top:5,
			height:'auto',
			font:{fontSize:11, fontWeight:'regular', fontFamily:'Myriad Pro'}
		});
		
		loginBarImage.add(barLabel);
		
		win.add(viewPlayer);
	} else {
		Ti.API.warn('NOT building PlayerLogin view - already in progress');
	}
	
}

function destroyPlayerLoginView(){
	Ti.API.warn('destroyPlayerLoginView() called');
	
	VIEWING_LOGIN = false;
	viewPlayer.animate(anim_out);
	
	//Facebook button event listener
	fbButton.removeEventListener('click', handleFacebookClickEvent);
	//Event listener for player alert OK button
	alertViewPlayerButton.removeEventListener('click', handleAlertViewPlayerOK);
	//FB disconnect OK event listener
	confirmationViewPlayerButton.removeEventListener('click', handleFacebookDisconnectOK);
	//FB disconnect cancel event listener
	confirmationViewCancelButton.removeEventListener('click', handleFacebookDisconnectCancel);
	//Event listener for play button
	buttonStart.removeEventListener('click', handleButtonStartEvent);
	
	//alertViewPlayer.hide();
	alertViewPlayer.remove(alertPlayerLabel);
	alertViewPlayer.remove(alertViewPlayerButton);
	viewPlayer.remove(alertViewPlayer);
	viewPlayer.remove(loginLabel);
	//confirmationViewPlayer.hide();
	confirmationViewPlayer.remove(confirmationPlayerLabel);
	confirmationViewPlayer.remove(confirmationViewPlayerButton);
	confirmationViewPlayer.remove(confirmationViewCancelButton);
	viewPlayer.remove(confirmationViewPlayer);
	viewPlayer.remove(tf1);
	viewPlayer.remove(buttonStart);
	viewPlayer.remove(fbButton);
	viewPlayer.remove(loginBarImage);
	loginBarImage.remove(barLabel);
	
	//Alert view
	alertViewPlayer = null;
	loginLabel = null;
	//Alert view score label
	alertPlayerLabel = null;
	//Alert view score button
	alertViewPlayerButton = null;
	//Confirmation view
	confirmationViewPlayer = null;
	//Confirmation view score label
	confirmationPlayerLabel = null;
	//FB disconect alert OK button
	confirmationViewPlayerButton = null;
	//FB disconnect alert CANCEL button
	confirmationViewCancelButton = null;
	tf1 = null;
	//Play button
	buttonStart = null;
	//Facebook button
	fbButton = null;	
	//Bar image
	loginBarImage = null;
	barLabel = null;
	
	win.remove(viewPlayer);
	win.fireEvent('animateMenu');
}

//Event handler for FB disconnect OK
function handleFacebookDisconnectOK(){
	confirmationViewPlayer.hide();
	backHomeFromPlayerButton.touchEnabled = true;
	playButton.touchEnabled = true;
	Titanium.Facebook.logout();
}

//Event handler for FB disconnect Cancel
function handleFacebookDisconnectCancel(){
	confirmationViewPlayer.hide();
	backHomeFromPlayerButton.touchEnabled = true;
	playButton.touchEnabled = true;
}

/*Displays the FB disconnect dialog and blocks the UI*/
function showFacebookDisconnectConfirmation(){
	confirmationViewPlayer.show();
	backHomeFromPlayerButton.touchEnabled = false;
	playButton.touchEnabled = false;
}

function handleAlertViewPlayerOK(){
	alertViewPlayer.hide();
	tf1.enabled = true;
	backHomeFromPlayerButton.touchEnabled = true;
	fbButton.touchEnabled = true;
}
	
Ti.API.info('Player.js persisted player is '+playerName + ' persisted facebook is '+fbId);

//Event handler for the PLAY button
function handleButtonStartEvent(){
	if(SOUNDS_MODE){
		audioClick.play();	
	}
	
	//buttonStart.image = IMAGE_PATH+'login/play_pressed.png';
	
	tf1.value = tf1.value.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
	if(tf1.value != ''){
		
		tf1.blur();
		savePlayer(tf1.value, fbId,null);
		Ti.API.info('player2.js: Player '+tf1.value+' enters game with fbId '+fbId);
		
		//Build and show the Categories view
		mtbImport("categories.js");
		buildCategoriesView();
		view.animate({opacity:1, duration:400}, function(){
			destroyPlayerLoginView();
		});
		
	} else {
		alertViewPlayer.show();
		tf1.enabled = false;
		backHomeFromPlayerButton.touchEnabled = false;
		fbButton.touchEnabled = false;
	}
	
	buttonStart.image = IMAGE_PATH+'login/play.png';
}
	
function handleFacebookClickEvent(){
	tf1.blur();
	
	if(!Titanium.Facebook.loggedIn){
		Ti.API.info('Facebook button clicked : NOT logged in, so logging in..');
		Titanium.Facebook.authorize();
	} else {
		//Show confirmation view for FB logout
		showFacebookDisconnectConfirmation();
		
		Ti.API.info('Facebook button clicked : IS logged in, confirm log out?');
	}
}
