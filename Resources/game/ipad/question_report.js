 //The view
 var viewQuestionReport = Ti.UI.createView({
 	backgroundImage:IMAGE_PATH+'signin/background.jpg',
 	opacity:0,
 	top:0,
 	bottom:0,
 	left:0,
 	right:0,
 	zIndex:52
 });

 //UI Components
var reportWin = null;
var questionReportBackground = null;
var questionReportButton1 = null;
var questionReportButtonLabel1 = null;
var questionReportButton2 = null;
var questionReportButtonLabel2 = null;
var questionReportButton3 = null;
var questionReportButtonLabel3 = null;
var questionReportButton4 = null;
var questionReportButtonLabel4 = null;
var questionReportButton5 = null;
var questionReportButtonLabel5 = null;
var questionReportSendReportButton = null;

//boolean to see if any choise checked
var questionReportcheck1 = false;
var questionReportcheck2 = false;
var questionReportcheck3 = false;
var questionReportcheck4 = false;
var questionReportcheck5 = false;
//offset for buttons and labels
var questionReportButtonOffset = null;

var questionReportUpperBackgroundBar = null;
var questionReportLowerBackgroundBar = null;

var questionReportSubmissionActIndicator = null;
var validateErrors = 0;
var isSelected = null;
var errors = [];
var questionReportSubmitClosesPopup = false;

function buildQuestionReportView(){
	var shouldCreateView = questionReportBackground == null;
	reportWin = Ti.UI.createWindow();
	
	if(shouldCreateView){
		//background
		questionReportBackground = Ti.UI.createImageView({
			image:IMAGE_PATH+'report/reportbox.png',
			top:20,
			zIndex:2
		});
	
		viewQuestionReport.add(questionReportBackground);
		
		questionReportUpperBackgroundBar = Ti.UI.createView({
			backgroundColor:'0b4b7f',
			height:152,
			top:0
		}); 
		viewQuestionReport.add(questionReportUpperBackgroundBar);
		
		//close view x button
		questionReportCloseImage = Ti.UI.createButton({
			backgroundImage:IMAGE_PATH+'top/invite_x.png',
			top:5,
			right:69,
			width:78,
			height:76,
			zIndex:3
		});
		
		viewQuestionReport.add(questionReportCloseImage);
		questionReportCloseImage.addEventListener('click', handleQuestionReportCloseButton);
		
		questionReportButtonOffset = 76;
		//button 1
		questionReportButton1 = Ti.UI.createImageView({
			image:IMAGE_PATH+'report/bullets/report_button1.png',
			top:361,
			left:93,
			button:1,
			isSelected:false
		});
		
		questionReportBackground.add(questionReportButton1);
		questionReportButton1.addEventListener('click', handleQuestionReportCheckButton);
		//Label 1
		questionReportButtonLabel1 = Ti.UI.createLabel({
			text:'Λάθος απάντηση.',
			textAlign:'center',
			color:'0b4b7f',
			top:376,
			left:184,
			font:{fontSize:28, fontWeight:'regular', fontFamily:'Myriad Pro'}
		});
		
		questionReportBackground.add(questionReportButtonLabel1);
		//Button 2 
		questionReportButton2 = Ti.UI.createImageView({
			image:IMAGE_PATH+'report/bullets/report_button2.png',
			top:questionReportButton1.top+questionReportButtonOffset,
			left:93,
			button:2,
			isSelected:false
		});
		
		questionReportBackground.add(questionReportButton2);
		questionReportButton2.addEventListener('click', handleQuestionReportCheckButton);
		//Label 2
		questionReportButtonLabel2 = Ti.UI.createLabel({
			text:'Ορθογραφικό λάθος.',
			textAlign:'center',
			color:'0b4b7f',
			top:questionReportButtonLabel1.top+questionReportButtonOffset,
			left:184,
			font:{fontSize:28, fontWeight:'regular', fontFamily:'Myriad Pro'}
		});
		
		questionReportBackground.add(questionReportButtonLabel2);
		//Button 3
		questionReportButton3 = Ti.UI.createImageView({
			image:IMAGE_PATH+'report/bullets/report_button3.png',
			top:questionReportButton2.top+questionReportButtonOffset,
			left:93,
			button:3,
			isSelected:false
		});
		
		questionReportBackground.add(questionReportButton3);
		questionReportButton3.addEventListener('click', handleQuestionReportCheckButton);
		//Label 3
		questionReportButtonLabel3 = Ti.UI.createLabel({
			text:'Ανήκει σε άλλη κατηγορία.',
			textAlign:'center',
			color:'0b4b7f',
			top:questionReportButtonLabel2.top+questionReportButtonOffset,
			left:184,
			font:{fontSize:28, fontWeight:'regular', fontFamily:'Myriad Pro'}
		});
		
		questionReportBackground.add(questionReportButtonLabel3);
		//Button 4
		questionReportButton4 = Ti.UI.createImageView({
			image:IMAGE_PATH+'report/bullets/report_button4.png',
			top:questionReportButton3.top+questionReportButtonOffset,
			left:93,
			button:4,
			isSelected:false
		});
		
		questionReportBackground.add(questionReportButton4);
		questionReportButton4.addEventListener('click', handleQuestionReportCheckButton);
		//Label 4
		questionReportButtonLabel4 = Ti.UI.createLabel({
			text:'Λάθος Wikipedia link.',
			textAlign:'center',
			color:'0b4b7f',
			top:questionReportButtonLabel3.top+questionReportButtonOffset,
			left:184,
			font:{fontSize:28, fontWeight:'regular', fontFamily:'Myriad Pro'}
		});
		
		questionReportBackground.add(questionReportButtonLabel4);
		//Button 5
		questionReportButton5 = Ti.UI.createImageView({
			image:IMAGE_PATH+'report/bullets/report_button5.png',
			top:questionReportButton4.top+questionReportButtonOffset,
			left:93,
			button:5,
			isSelected:false
		});
		
		questionReportBackground.add(questionReportButton5);
		questionReportButton5.addEventListener('click', handleQuestionReportCheckButton);
		//Label 5
		questionReportButtonLabel5 = Ti.UI.createLabel({
			text:'Άλλος λόγος...',
			textAlign:'center',
			color:'0b4b7f',
			top:questionReportButtonLabel4.top+questionReportButtonOffset,
			left:184,
			font:{fontSize:28, fontWeight:'regular', fontFamily:'Myriad Pro'}
		});
		
		questionReportBackground.add(questionReportButtonLabel5);
		
		questionReportLowerBackgroundBar = Ti.UI.createView({
			backgroundColor:'0b4b7f',
			height:257,
			bottom:0
		}); 
		viewQuestionReport.add(questionReportLowerBackgroundBar);
		
		//send report button
		questionReportSendReportButton = Ti.UI.createImageView({
			image:IMAGE_PATH+'report/sending/report2.png',
			bottom:33
		});
		
		questionReportLowerBackgroundBar.add(questionReportSendReportButton);
		questionReportSendReportButton.addEventListener('click', reportQuestion);
		
		questionReportSubmissionActIndicator = Ti.UI.createActivityIndicator({
			style:Titanium.UI.iPhone.ActivityIndicatorStyle.BIG,
			bottom:101,
			right:60
		});
		questionReportSendReportButton.add(questionReportSubmissionActIndicator);
		
		reportWin.add(viewQuestionReport);
		win.add(reportWin);
		
	}else{
		Ti.API.warn('NOT building QuestionReport view - already in progress');
	}
}

function destroyQuestionReportView(){
	var shouldDestroyView = questionReportBackground != null;
	
	if(shouldDestroyView){
		//event handlers
		questionReportCloseImage.removeEventListener('click', handleQuestionReportCloseButton);
		questionReportButton1.removeEventListener('click', handleQuestionReportCheckButton);
		questionReportButton2.removeEventListener('click', handleQuestionReportCheckButton);
		questionReportButton3.removeEventListener('click', handleQuestionReportCheckButton);
		questionReportButton4.removeEventListener('click', handleQuestionReportCheckButton);
		questionReportButton5.removeEventListener('click', handleQuestionReportCheckButton);
		if(questionReportSubmitClosesPopup){
			questionReportSendReportButton.removeEventListener('click', handleQuestionReportCloseButton);
		} else {
			questionReportSendReportButton.removeEventListener('click', reportQuestion);
		}
		
		viewQuestionReport.remove(questionReportBackground);
		viewQuestionReport.remove(questionReportCloseImage);
		questionReportBackground.remove(questionReportButton1);
		questionReportBackground.remove(questionReportButtonLabel1);
		questionReportBackground.remove(questionReportButton2);
		questionReportBackground.remove(questionReportButtonLabel2);
		questionReportBackground.remove(questionReportButton3);
		questionReportBackground.remove(questionReportButtonLabel3);
		questionReportBackground.remove(questionReportButton4);
		questionReportBackground.remove(questionReportButtonLabel4);
		questionReportBackground.remove(questionReportButton5);
		questionReportBackground.remove(questionReportButtonLabel5);
		questionReportLowerBackgroundBar.remove(questionReportSendReportButton);
		viewQuestionReport.remove(questionReportUpperBackgroundBar);
		viewQuestionReport.remove(questionReportLowerBackgroundBar);
		questionReportLowerBackgroundBar.remove(questionReportSendReportButton);
		questionReportSendReportButton.remove(questionReportSubmissionActIndicator);
		win.remove(reportWin);
		
		reportWin = null;
		questionReportBackground = null;
		questionReportButton1 = null;
		questionReportButtonLabel1 = null;
		questionReportButton2 = null;
		questionReportButtonLabel2 = null;
		questionReportButton3 = null;
		questionReportButtonLabel3 = null;
		questionReportButton4 = null;
		questionReportButtonLabel4 = null;
		questionReportButton5 = null;
		questionReportButtonLabel5 = null;
		questionReportSendReportButton = null;
		
		questionReportUpperBackgroundBar = null;
		questionReportLowerBackgroundBar = null;
		
		questionReportcheck1 = false;
		questionReportcheck2 = false;
		questionReportcheck3 = false;
		questionReportcheck4 = false;
		questionReportcheck5 = false;
		questionReportButtonOffset = null;

		questionReportSubmissionActIndicator = null;
		
		validateErrors = 0;
		errors = [];
		isSelected = false;
		questionReportButtonOffset = null;
		
	}else{
		Ti.API.warn('NOT destroying QuestionReport view - already in progress');
	}
}

function handleQuestionReportCheckButton(e){
	var buttonChosen = e.source.button;
	isSelected = e.source.isSelected;
	
	
	
	if(!isSelected){
		e.source.isSelected = true;
		e.source.image = IMAGE_PATH+'report/bullets/report_button'+buttonChosen+'_ok.png';
		errors[buttonChosen] = buttonChosen;
		validateErrors++;
	} else {
		e.source.isSelected = false;
		e.source.image = IMAGE_PATH+'report/bullets/report_button'+buttonChosen+'.png';
		errors[buttonChosen] = null;
		validateErrors--;
	}
	
	if(validateErrors > 0){
		questionReportSendReportButton.image = IMAGE_PATH+'report/sending/send.png';
	}else{
		questionReportSendReportButton.image = IMAGE_PATH+'report/sending/report2.png';
	}
	
	Ti.API.info(errors);
}

function handleQuestionReportCloseButton(){
	var curlUp = Titanium.UI.createAnimation();
	curlUp.transition = Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT;
	curlUp.duration = 800;
	curlUp.opacity = 0;
	
	reportWin.close(curlUp);
	destroyQuestionReportView();
}

function reportQuestion(){
	
	if(validateErrors != 0) {
		if (Titanium.Network.online == true && !BLACKLISTED){
			Ti.API.info('Sending user report!');
			//change UI accordingly while sending
			questionReportSendReportButton.image = IMAGE_PATH+'report/sending/sending.png';
			questionReportSubmissionActIndicator.show();
			
			var playerObject = getCurrentPlayer();
			var remotePlayerId = playerObject.player_id;
			if(remotePlayerId == null || remotePlayerId == '') remotePlayerId = 1;
			var facebook_id = playerObject.facebook_id;
		
			var xhr = Titanium.Network.createHTTPClient();
			xhr.setTimeout(NETWORK_TIMEOUT);
			
			errors = escape(JSON.stringify(errors));
			
			Ti.API.info('reporting for question '+questionReportQuestionId);
			
			var params = {
				error:errors,
				remotePlayerId:remotePlayerId,
				facebook_id:facebook_id,
				questionReportQuestionId:questionReportQuestionId
			};
			
			xhr.onload = function(e){
				Ti.API.info('reportQuestion() got back from server '+this.responseText);
				
				var jsonData = JSON.parse(this.responseText);
				
				questionReportSubmissionActIndicator.hide();
				
				if(jsonData.RESPONSE == '1'){
					if(SOUNDS_MODE){
						audioAccept.play();	
					}
				
					questionReportSendReportButton.image = IMAGE_PATH+'report/sending/sent.png';
					questionReportSendReportButton.removeEventListener('click', reportQuestion);
					questionReportSendReportButton.addEventListener('click', handleQuestionReportCloseButton);
					questionReportSubmitClosesPopup = true;
					
				}else{
					if(SOUNDS_MODE){
						audioError.play();	
					}
				
					questionReportSendReportButton.image = IMAGE_PATH+'report/sending/failed.png';
				}
			};	
			xhr.onerror = function(e){
				if(SOUNDS_MODE){
					audioError.play();	
				}
				
				Ti.API.info('reportQuestion() ERROR');
				questionReportSubmissionActIndicator.hide();
				questionReportSendReportButton.image = IMAGE_PATH+'report/sending/failed.png';
			};
			
			xhr.open('POST', API + 'reportQuestion');
			xhr.send(params);
		}else {
			Ti.API.warn('reportQuestion() offline. BLACKLISTED='+BLACKLISTED);
		}
	}
}