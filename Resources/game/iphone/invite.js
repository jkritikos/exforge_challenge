var enableFacebookSendInvitation = false;
var numberOfSelectedCheckboxes = 0;

//UI components
var inviteFriendsBackgroundImage = null;
var inviteFriendsBackgroundTextImage = null;
var inviteFriendsCloseImage = null;
var inviteFriendsFacebookImage = null;
var inviteFriendsFacebookLabel = null;
var inviteFriendsEmailImage = null;
var inviteFriendsEmailLabel = null;
var inviteFriendsSmsImage = null;
var inviteFriendsSmsLabel = null;
var inviteFriendsFacebookBackgroundImage = null;
var inviteFriendsFacebookBackgroundHeader = null;
var inviteFriendsFacebookCloseImage = null;
var fbFriendsActIndicator = null;
var fbFriendsInvitationActIndicator = null;
var sendFBInvitationLabel = null;
var tableViewFacebookFriends = null;

//Error alert components
var fbAlertImage = null;
var fbOKButton = null;
var fbAlertLabelText = null;

//Data components
var selectedFriendsForFBInvite = null;

function buildInviteFriendsPopup(){
	
	selectedFriendsForFBInvite = [];
	
	//Invite friends background
	inviteFriendsBackgroundImage = Ti.UI.createImageView({
		image:IPHONE5 ? IMAGE_PATH+'top/invite_bg-568h@2x.png' : IMAGE_PATH+'top/invite_bg.png' ,
		transform:SCALE_ZERO,
		zIndex:10
	});

	//Invite friends text
	inviteFriendsBackgroundTextImage = Ti.UI.createImageView({
		image:IMAGE_PATH+'top/invite_text.png',
		top:IPHONE5 ? 78 : 33
	});
	
	//Invite friends close button
	inviteFriendsCloseImage = Ti.UI.createButton({
		backgroundImage:IMAGE_PATH+'top/invite_x.png',
		top:IPHONE5 ? 45 : 0,
		right:IPHONE5? 10:5,
		width:41,
		height:40
	});
	
	//Invite friends by facebook icon
	inviteFriendsFacebookImage = Ti.UI.createButton({
		backgroundImage:IMAGE_PATH+'top/invite_fb.png',
		top:IPHONE5 ? 155 : 110,
		width:73,
		height:72
	});
	
	//Invite friends by facebook label
	inviteFriendsFacebookLabel = Ti.UI.createLabel({
		text:'FACEBOOK',
		color:'white',
		font:{fontSize:18, fontWeight:'bold', fontFamily:'Myriad Pro'},
		top:IPHONE5? 233 : 188
	});

	//Invite friends by email icon
	inviteFriendsEmailImage = Ti.UI.createButton({
		backgroundImage:IMAGE_PATH+'top/invite_email.png',
		top:IPHONE5? 267 : 222,
		width:73,
		height:72
	});
	
	//Invite friends by email label
	inviteFriendsEmailLabel = Ti.UI.createLabel({
		text:'EMAIL',
		color:'white',
		font:{fontSize:18, fontWeight:'bold', fontFamily:'Myriad Pro'},
		top:IPHONE5? 345 : 300
	});

	//Invite friends by sms icon
	inviteFriendsSmsImage = Ti.UI.createImageView({
		image:IMAGE_PATH+'top/invite_sms.png',
		top:IPHONE5? 377 : 332
	});
	    
	//Invite friends by SMS label
	inviteFriendsSmsLabel = Ti.UI.createLabel({
		text:'SMS',
		color:'white',
		font:{fontSize:18, fontWeight:'bold', fontFamily:'Myriad Pro'},
		top:IPHONE5? 455 : 410
	});

	//Pack the invitation view
	inviteFriendsBackgroundImage.add(inviteFriendsBackgroundTextImage);
	inviteFriendsBackgroundImage.add(inviteFriendsCloseImage);
	inviteFriendsBackgroundImage.add(inviteFriendsFacebookImage);
	inviteFriendsBackgroundImage.add(inviteFriendsFacebookLabel);
	inviteFriendsBackgroundImage.add(inviteFriendsEmailImage);
	inviteFriendsBackgroundImage.add(inviteFriendsEmailLabel);
	inviteFriendsBackgroundImage.add(inviteFriendsSmsImage);
	inviteFriendsBackgroundImage.add(inviteFriendsSmsLabel);
	
	viewTopCategory.add(inviteFriendsBackgroundImage);
	
	//Invite friends FB background
	inviteFriendsFacebookBackgroundImage = Ti.UI.createImageView({
		image:IPHONE5? IMAGE_PATH+'invite/invite_fb_bg-568h@2x.png' : IMAGE_PATH+'invite/invite_fb_bg.png' ,
		visible:false,
		zIndex:10
	});

	//header text
	inviteFriendsFacebookBackgroundHeader = Ti.UI.createImageView({
		image:IMAGE_PATH+'invite/invite_fb_text.png',
		zIndex:10,
		top:IPHONE5 ? 78 : 33
	});

	//Invite friends fb close button
	inviteFriendsFacebookCloseImage = Ti.UI.createImageView({
		image:IMAGE_PATH+'top/invite_x.png',
		top:IPHONE5? 45 : 0,
		right:5
	});

	//Invite friends fb loader
	fbFriendsActIndicator = Ti.UI.createActivityIndicator({
		style:Titanium.UI.iPhone.ActivityIndicatorStyle.BIG
	});
	
	//Invite friends fb select all label
	sendFBInvitationLabel = Ti.UI.createLabel({
		text:'SEND',
		color:'white',
		textAlign:'center',
		right:50,
		bottom:IPHONE5? 57 : 17,
		height:40,
		visible:false,
		font:{fontSize:30, fontWeight:'bold', fontFamily:'321impact'}
	});

	//The table for fb friends
	tableViewFacebookFriends = Titanium.UI.createTableView({
		data:[],
		backgroundColor:'transparent',
		showVerticalScrollIndicator:false,
		visible:false,
		top:IPHONE5? 150 : 105,
		bottom:105,
		left:38,
		right:33,
		width:240
	});
	
	inviteFriendsFacebookBackgroundImage.add(fbFriendsActIndicator);
	fbFriendsActIndicator.show();
	
	//Event listeners
	inviteFriendsFacebookBackgroundImage.add(inviteFriendsFacebookBackgroundHeader);
	inviteFriendsFacebookBackgroundImage.add(inviteFriendsFacebookCloseImage);
	inviteFriendsFacebookBackgroundImage.add(tableViewFacebookFriends);
	inviteFriendsFacebookBackgroundImage.add(sendFBInvitationLabel);
	viewTopCategory.add(inviteFriendsFacebookBackgroundImage);
	
	sendFBInvitationLabel.addEventListener('click', handleSendFBInvitation);
	
	//Event handler for facebook invite icon
	inviteFriendsFacebookImage.addEventListener('click', handleInviteFriendsFBSelection);
	//Invite friends close button event listener
	inviteFriendsCloseImage.addEventListener('click', handleInviteFriendsPopupClose);
	inviteFriendsEmailImage.addEventListener('click', handleInviteFriendsEmailSection);
	inviteFriendsSmsImage.addEventListener('click', handleInviteFriendsSMSSelection);
	inviteFriendsFacebookCloseImage.addEventListener('click', handleInviteFriendsFBClose);
	//Event listener for fb friends table
	tableViewFacebookFriends.addEventListener('click', handleFacebookFriendListClick);
}

function destroyInviteFriendsPopup(){
	Ti.API.warn('destroyInviteFriendsPopup() called');
	
	selectedFriendsForFBInvite = null;
	
	//Event handler for facebook invite icon
	sendFBInvitationLabel.removeEventListener('click', handleSendFBInvitation);
	inviteFriendsFacebookImage.removeEventListener('click', handleInviteFriendsFBSelection);
	//Invite friends close button event listener
	inviteFriendsCloseImage.removeEventListener('click', handleInviteFriendsPopupClose);
	inviteFriendsEmailImage.removeEventListener('click', handleInviteFriendsEmailSection);
	inviteFriendsSmsImage.removeEventListener('click', handleInviteFriendsSMSSelection);
	inviteFriendsFacebookCloseImage.removeEventListener('click', handleInviteFriendsFBClose);
	//Event listener for fb friends table
	tableViewFacebookFriends.removeEventListener('click', handleFacebookFriendListClick);
	
	//Pack the invitation view
	inviteFriendsBackgroundImage.remove(inviteFriendsBackgroundTextImage);
	inviteFriendsBackgroundImage.remove(inviteFriendsCloseImage);
	inviteFriendsBackgroundImage.remove(inviteFriendsFacebookImage);
	inviteFriendsBackgroundImage.remove(inviteFriendsFacebookLabel);
	inviteFriendsBackgroundImage.remove(inviteFriendsEmailImage);
	inviteFriendsBackgroundImage.remove(inviteFriendsEmailLabel);
	inviteFriendsBackgroundImage.remove(inviteFriendsSmsImage);
	inviteFriendsBackgroundImage.remove(inviteFriendsSmsLabel);

	viewTopCategory.remove(inviteFriendsBackgroundImage);
	
	inviteFriendsFacebookBackgroundImage.remove(fbFriendsActIndicator);
	fbFriendsActIndicator.hide();
	
	inviteFriendsFacebookBackgroundImage.remove(inviteFriendsFacebookBackgroundHeader);
	inviteFriendsFacebookBackgroundImage.remove(inviteFriendsFacebookCloseImage);
	inviteFriendsFacebookBackgroundImage.remove(tableViewFacebookFriends);
	inviteFriendsFacebookBackgroundImage.remove(sendFBInvitationLabel);
	viewTopCategory.remove(inviteFriendsFacebookBackgroundImage);
	
	//Invite friends background
	inviteFriendsBackgroundImage = null;
	//Invite friends text
	inviteFriendsBackgroundTextImage = null;
	//Invite friends close button
	inviteFriendsCloseImage = null;
	//Invite friends by facebook icon
	inviteFriendsFacebookImage = null;
	//Invite friends by facebook label
	inviteFriendsFacebookLabel = null;
	//Invite friends by email icon
	inviteFriendsEmailImage = null;
	//Invite friends by email label
	inviteFriendsEmailLabel = null;
	//Invite friends by sms icon
	inviteFriendsSmsImage = null;
	//Invite friends by SMS label
	inviteFriendsSmsLabel = null;
	//Invite friends FB background
	inviteFriendsFacebookBackgroundImage = null;
	//header text
	inviteFriendsFacebookBackgroundHeader = null;
	//Invite friends fb close button
	inviteFriendsFacebookCloseImage = null;
	//Invite friends fb loader
	fbFriendsActIndicator = null;
	//Invite friends fb select all label
	sendFBInvitationLabel = null;
	//The table for fb friends
	tableViewFacebookFriends = null;
}

//Event handler for popup close
function handleInviteFriendsPopupClose(){
	if(SOUNDS_MODE){
		audioClick.play();	
	}
	
	inviteFriendsBackgroundImage.transform = SCALE_ZERO;
	destroyInviteFriendsPopup();
	
	//iphone only - show the bar
	scoresBottomBar.opacity = 1;
	
	inviteFriendsIcon.show();
}

//Event handler for FB selection TODO refactor so it uses a common alert box
function handleInviteFriendsFBSelection(){
	if(SOUNDS_MODE){
		audioClick.play();	
	}
	
	if (Titanium.Network.online == true){
		//If we are connected to FB, proceed with friend retrieval
		if(Titanium.Facebook.loggedIn){
			facebookGetAllFriends();
			inviteFriendsBackgroundImage.hide();
			inviteFriendsFacebookBackgroundImage.show();
		} else {
			alertNoFacebookConnection.show();
		}
	} else {
		buildAlert(MSG_NO_INTERNET_CONNECTION);
	}
}

//Event handler for FB Invitation sending
function handleSendFBInvitation(){
	Ti.API.warn('handleSendFBInvitation() called');
	
	//revert to 0 so we can select more users after the invitations are sent
	numberOfSelectedCheckboxes = 0;
	
	if (Titanium.Network.online == true){
		
		fbAlertImage = Titanium.UI.createImageView({
			image:IMAGE_PATH+'alert/alert_zoafuta.png',
			zIndex:12
		});
		
		//act indicator for invite
		fbFriendsInvitationActIndicator = Ti.UI.createActivityIndicator({
			style:Titanium.UI.iPhone.ActivityIndicatorStyle.BIG
		});
		
		fbAlertImage.add(fbFriendsInvitationActIndicator);
		fbFriendsInvitationActIndicator.show();
		
		viewTopCategory.add(fbAlertImage);
		
		//Send invitation to FB
		
		//Prepare json object
		var batchRequests = [];
		for(var ele in selectedFriendsForFBInvite){ 
			Ti.API.warn('adding '+ele+' to batch request');
			var url = ele + "/feed";
			var body = "message="+INVITE_BODY_FB;
			var obj = {
				"method":"POST",
				"relative_url":url,
				"body":body
			};
				
			//Ti.API.warn('adding '+obj.method+' object to batch request');
			batchRequests.push(obj);
			//Ti.API.warn('added '+batchRequests[0].method+' object to batch request');
		}
		
		//send FB batch request
		var fbResult = "";
		Titanium.Facebook.requestWithGraphPath('', {batch:batchRequests}, "POST", function(e) {
	    	if (e.success) {
	        	Ti.API.warn('FACEBOOK - Success in posting multi-message! '+JSON.stringify(e));
	        	fbResult = MSG_FB_INVITE_SUCCESS;
	    	} else {
	        	if (e.error) {
	         	   Ti.API.warn('FACEBOOK - ERROR in posting multi-message '+e.error);
	        	} else {
	            	Ti.API.warn('FACEBOOK - UNKNOWN response in posting multi-message');
	        	}
	        	fbResult = MSG_FB_INVITE_FAILURE;
	    	}
	    	
	    	//Destroy activity indicator
			fbAlertImage.remove(fbFriendsInvitationActIndicator);
			fbFriendsInvitationActIndicator.hide();
			fbFriendsInvitationActIndicator = null;
	    	
	    	fbOKButton = Titanium.UI.createImageView({
				image:IMAGE_PATH+'alert/yes.png',
				zIndex:12,
				bottom:10,
				zIndex:12
			});
		
			fbAlertLabelText = Titanium.UI.createLabel({
				text:fbResult,
				color:'white',
				textAlign:'center',
				top:31,
				left:45,
				right:45,
				font:{fontSize:16, fontWeight:'regular', fontFamily:'Myriad Pro'}
			});
	    	
	    	fbAlertImage.add(fbOKButton);
			fbAlertImage.add(fbAlertLabelText);
			fbOKButton.addEventListener('click', dismissAlert);
	    	
		});
		//End FB invitation

	} else {
		buildAlert(MSG_NO_INTERNET_CONNECTION);
	}
}

//Event handler for EMAIL selection
function handleInviteFriendsEmailSection(){
	if(SOUNDS_MODE){
		audioClick.play();	
	}
	
	var emailDialog = Ti.UI.createEmailDialog();
	emailDialog.setBarColor('black');
	emailDialog.setHtml(true);
	emailDialog.setSubject(INVITE_SUBJECT);
	emailDialog.setMessageBody(INVITE_BODY_EMAIL);
	emailDialog.open();
}

//Event handler for SMS selection
function handleInviteFriendsSMSSelection(){
	if(SOUNDS_MODE){
		audioClick.play();	
	}
	
	var smsModule = require("com.omorandi");
	var smsDialog = smsModule.createSMSDialog({ 
	    messageBody: INVITE_BODY_SMS,
	    barColor: 'black'
	});

    smsDialog.open({animated: true});
	Titanium.UI.iPhone.hideStatusBar();
}

function handleInviteFriendsFBClose(){
	inviteFriendsBackgroundImage.show();
	inviteFriendsFacebookBackgroundImage.hide();
}

function handleFacebookFriendListClick(e){
	var row = e.row;
	var index = e.index;
	var fbId = row.facebookId;
	
	var checkboxImage = row.children[0];
	if(checkboxImage.image == IMAGE_PATH+'invite/tick_off.png'){
		numberOfSelectedCheckboxes++;
		
		if(numberOfSelectedCheckboxes > MAX_FB_INVITES){
			buildAlert('Μπορείς να επιλέξεις μέχρι 20 φίλους κάθε φορά.');
		} else {
			checkboxImage.image = IMAGE_PATH+'invite/tick_on.png';
			
			//Add selection to our collection
			selectedFriendsForFBInvite[fbId] = fbId;
		}
		
		
	} else {
		numberOfSelectedCheckboxes--;
		checkboxImage.image = IMAGE_PATH+'invite/tick_off.png';
		
		//Remove selection from our collection
		if(selectedFriendsForFBInvite[fbId] != undefined){
			delete selectedFriendsForFBInvite[fbId];
		}
	}
	
	//Show/hide the send button
	enableFacebookSendInvitation = numberOfSelectedCheckboxes > 0;
	if(enableFacebookSendInvitation){
		sendFBInvitationLabel.show();
	} else {
		sendFBInvitationLabel.hide();
	}
}

//Creates and shows the alert for the msg specified
function buildAlert(msg){
	fbAlertImage = Titanium.UI.createImageView({
		image:IMAGE_PATH+'alert/alert_zoafuta.png',
		zIndex:12
	});
	
	fbOKButton = Titanium.UI.createImageView({
		image:IMAGE_PATH+'alert/yes.png',
		zIndex:12,
		bottom:10,
		zIndex:12
	});
	
	fbAlertLabelText = Titanium.UI.createLabel({
		text:msg,
		color:'white',
		textAlign:'center',
		top:31,
		left:45,
		right:45,
		font:{fontSize:16, fontWeight:'regular', fontFamily:'Myriad Pro'}
	});
	
	fbAlertImage.add(fbAlertLabelText);
	fbAlertImage.add(fbOKButton);
	
	fbOKButton.addEventListener('click', dismissAlert);
			
	viewTopCategory.add(fbAlertImage);
}

//Closes and destroys the alert for max FB friends invited
function destroyAlert(){
	Ti.API.warn('destroyAlert() in invite.js called');
	
	fbOKButton.removeEventListener('click', dismissAlert);
	
	fbAlertImage.remove(fbAlertLabelText);
	fbAlertImage.remove(fbOKButton);
	
	viewTopCategory.remove(fbAlertImage);
	
	fbAlertImage = null;
	fbOKButton = null;
	fbAlertLabelText = null;
}

//Event handler for OK button on the FB alert
function dismissAlert(){
	if(SOUNDS_MODE){
		audioClick.play();	
	}
	
	destroyAlert();
}
	
function createFacebookFriendRow(name, id){
	var row1 = Ti.UI.createTableViewRow({
		height:45, 
		backgroundColor:'transparent',
		selectedBackgroundColor:'transparent',
		className:'FB_FRIENDS_LIST',
		facebookId:id
	});
	
	var name = Ti.UI.createLabel({
		text:name,
		color:'white',
		left:10,
		right:38,
		top:13,
		width:190,
		font:{fontSize:17, fontWeight:'regular', fontFamily:'Myriad Pro'}
	});
	
	var checkbox = Ti.UI.createImageView({
		image:IMAGE_PATH+'invite/tick_off.png',
		right:10
	});
	
	row1.add(checkbox);
	row1.add(name);
	return row1;
}

//Called with the fb friends
viewTopCategory.addEventListener('renderFacebookFriendsTable', function(data){
	fbFriendsActIndicator.hide();
	
	var tableData = [];
	for(var i=0; i < data.friends.length; i++){
		var fbFriendName = data.friends[i].name;
		var fbFriendId = data.friends[i].id;
		
		tableData.push(createFacebookFriendRow(fbFriendName, fbFriendId));
	}
	
	tableViewFacebookFriends.show();
	tableViewFacebookFriends.setData(tableData);
});
