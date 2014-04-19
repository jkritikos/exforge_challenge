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
	signinTextField.value = name;
	Ti.API.info('---------Player event refreshing UI ENDS');
});

//Back button
/*var backHomeFromPlayerButton = Titanium.UI.createButton({
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
});*/
	

//UI components
var signinPlayNowBar = null;
var signinPlayNowLabel = null;
var signinPlayNowLabelAttributes = null;
var signinTitleBackgroundBar = null;
var signinBackButton = null;
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
		
		signinBackButton = Titanium.UI.createButton({
			backgroundImage:IMAGE_PATH+'categories/back.png',
			left:30,
			top:25,
			width:55,
			height:55
		});
		
		signinTitleBackgroundBar.add(signinBackButton);
		
		signinBackButton.addEventListener('click', handleBackButton);
		
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
		
		win.add(viewSignin);
	} else {
		Ti.API.warn('NOT building PlayerLogin view - already in progress');
	}
}

function destroyPlayerLoginView(){
	Ti.API.warn('destroyPlayerLoginView() called');
	
	VIEWING_LOGIN = false;
	viewSignin.animate(anim_out);
	
	//Event listeners
	signinTextField.removeEventListener('change', handleSigninTextFieldChange);
	signinPlayNowBar.removeEventListener('click', handleButtonStartEvent);
	signinBackButton.removeEventListener('click', handleBackButton);
	
	signinTitleBackgroundBar.remove(signinTitleLabel);
	viewSignin.remove(signinTitleBackgroundBar);
	signinTitleBackgroundBar.remove(signinBackButton);
	signinTextFieldBar.remove(signinTextfieldLogo);
	signinTextFieldBar.remove(signinTextfieldSepparator);
	signinTextFieldBar.remove(signinTextField);
	signinTextFieldBar.remove(signinTextfieldHintText);
	viewSignin.remove(signinTextFieldBar);
	viewSignin.remove(signinBackgroundLogo);
	viewSignin.remove(signinPlayNowBar);
	signinPlayNowBar.remove(signinPlayNowLabel);
	
	signinPlayNowBar = null;
	signinPlayNowLabel = null;
	signinPlayNowLabelAttributes = null;
	signinTitleBackgroundBar = null;
	signinTitleLabel = null;
	signinBackgroundLogo = null;
	signinTextFieldBar = null;
	signinTextfieldLogo = null;
	signinTextfieldSepparator = null;
	signinTextfieldHintText = null;
	signinTextField = null;
	
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

//back button
function handleBackButton()	{
	if(SOUNDS_MODE){
		audioBack.play();	
	}
	
	Ti.API.info('BACK to home clicked from PLAYER win');
	signinTextField.blur();
	
	destroyPlayerLoginView();
}

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
		viewCategories.animate({opacity:1, duration:400}, function(){
			destroyPlayerLoginView();
		});
		
	} else {
		alert('You need to choose a name!');//TODO
	}
}
