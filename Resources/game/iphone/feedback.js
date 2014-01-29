//UI components
var feedbackPopupBackgroundImage = null;
var feedbackPopupLabelImage = null;
var feedbackCloseImage = null;
var feedbackSendImage = null;
var feedbackTextfieldEmail = null;
var scrollViewFeedbackPopup = null;
var formValidationLabel = null;
var feedbackSubmitImage = null;
var feedbackSubmitionActIndicator = null;
var feedbackSubmitionContainer = null;
var feedbackSubmitClosesPopup = false;

function buildFeedbackPopup(){
	//feedback background
	feedbackPopupBackgroundImage = Ti.UI.createImageView({
		image:IPHONE5 ? IMAGE_PATH+'settings/feedback_bg-568h@2x.png' : IMAGE_PATH+'settings/feedback_bg.png',
		zIndex:30,
		transform:SCALE_ZERO
	});
	
	//feedback background label
	feedbackPopupLabelImage = Ti.UI.createImageView({
		image:IMAGE_PATH+'settings/write_us.png',
		top:IPHONE5? 65 : 25
	});
	
	//Stats background close button
	feedbackCloseImage = Ti.UI.createButton({
		backgroundImage:IMAGE_PATH+'top/invite_x.png',
		top:IPHONE5 ? 38 : 5,
		right:10,
		width:41,
		height:40
	});
	
	feedbackSendImage = Ti.UI.createImageView({
		image:IMAGE_PATH+'settings/send.png',
		bottom:IPHONE5 ? 142 : 112,
		right:77
	});
	
	feedbackSubmitImage = Ti.UI.createImageView({
		image:IMAGE_PATH+'settings/icon_feedback.png',
		bottom:IPHONE5 ? 46 : 16,
		zIndex:50
	});
	
	feedbackTextfieldEmail = Titanium.UI.createTextField({
		value:'',
		hintText:' Το email σου',
		textAlign: Ti.UI.TEXT_ALIGN_LEFT,
		verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
		height:34,
		top:IPHONE5 ? 125 : 90,
		width:200,
		backgroundColor:'white',
		paddingLeft:6,
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_NONE,
		font:{fontSize:15, fontWeight:'regular', fontFamily:'Myriad Pro'},
	});
	
	feedbackTextfieldBody = Titanium.UI.createTextArea({
		value:'',
		font:{fontSize:15, fontWeight:'regular', fontFamily:'Myriad Pro'},
		height:175,
		top: IPHONE5 ? 170 : 135,
		width:200,
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	
	formValidationLabel = Ti.UI.createLabel({
		font:{fontSize:12, fontWeight:'regular', fontFamily:'Myriad Pro'},
		color:'#deb400',
		bottom:IPHONE5 ? 199 : 146,
		left:59,
		visible:false
	});
	
	//activity indicator
	feedbackSubmitionActIndicator = Ti.UI.createActivityIndicator({
		style:Titanium.UI.iPhone.ActivityIndicatorStyle.BIG,
		top:17,
		left:22
	});
	
	feedbackSubmitImage.add(feedbackSubmitionActIndicator);
	
	feedbackPopupBackgroundImage.add(feedbackSubmitImage);
	feedbackPopupBackgroundImage.add(formValidationLabel);
	feedbackPopupBackgroundImage.add(feedbackSendImage);
	feedbackPopupBackgroundImage.add(feedbackTextfieldBody);
	feedbackPopupBackgroundImage.add(feedbackTextfieldEmail);
	feedbackPopupBackgroundImage.add(feedbackPopupLabelImage);
	feedbackPopupBackgroundImage.add(feedbackCloseImage);
	feedbackCloseImage.addEventListener('click', closeFeedbackPopup);
	
	feedbackSubmitImage.addEventListener('click', sendFeedback);
	
	scrollViewFeedbackPopup = Ti.UI.createScrollView({
		contentWidth: 'auto',
	  	contentHeight: 'auto',
	  	showVerticalScrollIndicator: true,
	  	showHorizontalScrollIndicator: true,
	  	height: '100%',
	  	width: '100%',
	  	bottom:0,
	  	top:0,
	  	zIndex:5
	});
	
	scrollViewFeedbackPopup.add(feedbackPopupBackgroundImage);
	
	//add to the settings view
	viewSettings.add(scrollViewFeedbackPopup);
	
	//hide the settings feedback bar
	if(settingsBottomBar != null){
		settingsBottomBar.opacity = 0;
	}
	
	//Animate the stats background image
	feedbackPopupBackgroundImage.animate({transform:SCALE_ONE, duration:400});
}

/*Closes the stats popup and destroys the UI components*/
function closeFeedbackPopup(){
	if(SOUNDS_MODE){
		audioClick.play();	
	}
	
	feedbackPopupBackgroundImage.transform = SCALE_ZERO;
	destroyFeedbackPopup();
}

function destroyFeedbackPopup(){
	
	//Destroy listeners
	if(feedbackSubmitClosesPopup){
		feedbackSubmitImage.removeEventListener('click', closeFeedbackPopup);
	} else {
		feedbackSubmitImage.removeEventListener('click', sendFeedback);
	}
	
	feedbackCloseImage.removeEventListener('click', closeFeedbackPopup);
	
	//Remove components
	feedbackSubmitImage.remove(feedbackSubmitionActIndicator);
	feedbackPopupBackgroundImage.remove(feedbackSubmitImage);
	feedbackPopupBackgroundImage.remove(formValidationLabel);
	feedbackPopupBackgroundImage.remove(feedbackSendImage);
	feedbackPopupBackgroundImage.remove(feedbackTextfieldBody);
	feedbackPopupBackgroundImage.remove(feedbackTextfieldEmail);
	feedbackPopupBackgroundImage.remove(feedbackPopupLabelImage);
	feedbackPopupBackgroundImage.remove(feedbackCloseImage);
	scrollViewFeedbackPopup.remove(feedbackPopupBackgroundImage);
	viewSettings.remove(scrollViewFeedbackPopup);
	
	//Destroy components
	feedbackPopupBackgroundImage = null;
	//feedback background label
	feedbackPopupLabelImage = null;
	//Stats background close button
	feedbackCloseImage = null;
	feedbackSendImage = null;
	feedbackSubmitImage = null;
	feedbackTextfieldEmail = null;
	feedbackTextfieldBody = null;
	formValidationLabel = null;
	//activity indicator
	feedbackSubmitionActIndicator = null;
	scrollViewFeedbackPopup = null;
	
	//hide the settings feedback bar
	if(settingsBottomBar != null){
		//settingsBottomBar.top = 430;
		settingsBottomBar.opacity = 1;
	}
}

//Validates and submits the feedback form
function sendFeedback(){
	if(validateFeedbackForm()){
		Ti.API.info('Sending user feedback!');
		
		//Change UI accordingly
		feedbackSubmitImage.image = IMAGE_PATH+'settings/icon_feedback_sending.png';
		feedbackSendImage.visible = false;
		feedbackSubmitionActIndicator.show();
		//End UI change
		
		var playerObject = getCurrentPlayer();
		var remotePlayerId = playerObject.player_id;
		
		var xhr = Ti.Network.createHTTPClient();
		xhr.setTimeout(NETWORK_TIMEOUT);
		
		xhr.onload = function(e) {
			Ti.API.info('sendFeedback() got back from server '+this.responseText); 	
			var jsonData = JSON.parse(this.responseText);
			
			//Change UI accordingly
			feedbackSubmitionActIndicator.hide();
			
			if(jsonData.RESPONSE == '1'){
				feedbackSubmitImage.image = IMAGE_PATH+'settings/icon_feedback_sent.png';
				feedbackSubmitImage.removeEventListener('click', sendFeedback);
				feedbackSubmitImage.addEventListener('click', closeFeedbackPopup);
				
				feedbackSubmitClosesPopup = true;
				
				if(SOUNDS_MODE){
					audioAccept.play();	
				}
			} else {
				if(SOUNDS_MODE){
					audioError.play();	
				}
				feedbackSubmitImage.image = IMAGE_PATH+'settings/icon_feedback_failed.png';
			}
		};
		
		xhr.onerror = function(e) {
			if(SOUNDS_MODE){
				audioError.play();	
			}
			
			Ti.API.info('sendFeedback() ERROR');
			feedbackSubmitionActIndicator.hide();
			feedbackSubmitImage.image = IMAGE_PATH+'settings/icon_feedback_failed.png';
		};
			
		xhr.open('POST', API + 'sendFeedback'); 
		xhr.send({
			email:feedbackTextfieldEmail.value,
			feedback:feedbackTextfieldBody.value,
			remotePlayerId:remotePlayerId,
			applicationTypeId:BUZZ_APP_TYPE
		});
		
	}
}

//Validates the feedback form
function validateFeedbackForm(){
	var userEmail = feedbackTextfieldEmail.value;
	var userFeedback = feedbackTextfieldBody.value;
	var emailValidationRegex = '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$';
	var errorMessage = null;
	
	if(userEmail != null && userEmail != ''){
		
		if(!userEmail.match(emailValidationRegex)){
			errorMessage = '* Το email δεν είναι σωστό.';
		}
		
		if(userFeedback != null && userFeedback != ''){
			
		} else {
			errorMessage = '* Το μήνυμα είναι κενό.';
		}
	} else {
		errorMessage = '* Δεν έβαλες email.';
	}
	
	if(errorMessage != null){
		if(SOUNDS_MODE){
			audioError.play();	
		}

		formValidationLabel.text = errorMessage;
		formValidationLabel.visible = true;
	} else {
		formValidationLabel.text = '';
		formValidationLabel.visible = false;
	}
	
	return errorMessage == null;
}