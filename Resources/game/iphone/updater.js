//Determines whether there is new content available
var NEW_CONTENT_AVAILABLE = false;
//Number of times the update content popup has been rendered
var NEW_CONTENT_POPUP_COUNTER = 0;
//Number of times we will let the user decline the update
var NEW_CONTENT_POPUP_MAX_DECLINES_ALLOWED = 3;

//UI components
var updaterPopupBackgroundImage = null;
var updaterPopupLabel1 = null;
var updaterPopupLabel2 = null;
var updaterPopupLabel3 = null;
var updaterPopupLabel4 = null;
var updaterPopupDownloadButton = null;
var updaterPopupCloseButton = null;
var updaterPopupReadyButton = null;
var updaterPopupLabelProgress = null;
var updateDownloaderActivityIndicator = null;

/*Creates and renders the popup for content update*/
function buildPopupContentUpdate(){
	var shouldCreateView = updaterPopupBackgroundImage == null;
	if(shouldCreateView){
		//popup background
		updaterPopupBackgroundImage = Ti.UI.createImageView({
			image:IPHONE5? IMAGE_PATH+'updater/newcontent_background-568h@2x.png' : IMAGE_PATH+'updater/newcontent_background.png',
			transform:SCALE_ZERO,
			zIndex:10
		});
		
		updaterPopupLabel1 = Ti.UI.createLabel({
			text:'Νέες ερωτήσεις!',
			color:'white',
			textAlign:'center',
			width:150,
			font:{fontSize:20, fontWeight:'bold', fontFamily:'Myriad Pro'},
			top:IPHONE5? 205:165
		});
		
		updaterPopupLabel2 = Ti.UI.createLabel({
			text:'Έχουμε νέο υλικό για ακόμα περισσότερο παιχνίδι!',
			color:'white',
			textAlign:'center',
			width:190,
			font:{fontSize:15, fontWeight:'regular', fontFamily:'Myriad Pro'},
			top:IPHONE5? 240:200
		});
		
		updaterPopupLabel3 = Ti.UI.createLabel({
			text:'Πάμε τώρα?',
			color:'white',
			textAlign:'center',
			width:150,
			font:{fontSize:15, fontWeight:'regular', fontFamily:'Myriad Pro'},
			top:IPHONE5? 290:250
		});
		
		updaterPopupLabel4 = Ti.UI.createLabel({
			text:'ή λίγο αργότερα?',
			color:'white',
			textAlign:'center',
			width:190,
			font:{fontSize:15, fontWeight:'regular', fontFamily:'Myriad Pro'},
			top:IPHONE5? 365:325
		});
		
		updaterPopupDownloadButton = Ti.UI.createImageView({
			image:IMAGE_PATH+'updater/button_download.png',
			top:IPHONE5? 310:270
		});
		
		updaterPopupCloseButton = Ti.UI.createImageView({
			image:IMAGE_PATH+'updater/button_no.png',
			top:IPHONE5? 385:345
		});
		
		updaterPopupReadyButton = Ti.UI.createImageView({
			image:IMAGE_PATH+'updater/button_ready.png',
			top:IPHONE5? 290:250,
			visible:false
		});
		
		updaterPopupBackgroundImage.add(updaterPopupLabel1);
		updaterPopupBackgroundImage.add(updaterPopupLabel2);
		updaterPopupBackgroundImage.add(updaterPopupLabel3);
		updaterPopupBackgroundImage.add(updaterPopupLabel4);
		updaterPopupBackgroundImage.add(updaterPopupDownloadButton);
		updaterPopupBackgroundImage.add(updaterPopupCloseButton);
		updaterPopupBackgroundImage.add(updaterPopupReadyButton);
		
		//Event handlers
		updaterPopupCloseButton.addEventListener('click', closePopupContentUpdate);
		updaterPopupDownloadButton.addEventListener('click', downloadUpdate);
		updaterPopupReadyButton.addEventListener('click', closePopupContentUpdateAfterDownload);
		//Add it to the categories view
		view.add(updaterPopupBackgroundImage);
		
		//Animate the updater background image
		updaterPopupBackgroundImage.animate({transform:SCALE_ONE, duration:400});
	} else {
		Ti.API.warn('NOT building UpdatePopup view - already in progress');
	}
	
}

/*Closes and destroys the popup for content update*/
function closePopupContentUpdate(){
	NEW_CONTENT_POPUP_COUNTER++;
	
	updaterPopupBackgroundImage.transform = SCALE_ZERO;
	destroyPopupContentUpdate();
}

/*Closes/destroys the popup and marks the update as complete*/
function closePopupContentUpdateAfterDownload(){
	updaterPopupBackgroundImage.transform = SCALE_ZERO;
	destroyPopupContentUpdate();
}

function downloadUpdate(){
	updaterPopupLabel2.hide();
	updaterPopupLabel3.hide();
	updaterPopupLabel4.hide();
	updaterPopupDownloadButton.hide();
	updaterPopupCloseButton.hide();
	
	updaterPopupLabelProgress = Ti.UI.createLabel({
		text:'DOWNLOADING...',
		color:'white',
		textAlign:'center',
		width:150,
		height:40,
		font:{fontSize:18, fontWeight:'bold', fontFamily:'321impact'},
		top:IPHONE5? 245:205
	});
	
	//Activity indicator
	updateDownloaderActivityIndicator = Titanium.UI.createActivityIndicator({
		style:Titanium.UI.iPhone.ActivityIndicatorStyle.BIG,
		height:20,
		width:20,
		top:IPHONE5? 290:250
	});
	
	updaterPopupBackgroundImage.add(updaterPopupLabelProgress);
	updaterPopupBackgroundImage.add(updateDownloaderActivityIndicator);
	updateDownloaderActivityIndicator.show();
	
	loadOnlineQuestions();
	
}

/*Destroys the popup for content update*/
function destroyPopupContentUpdate(){
	var shouldDestroyView = updaterPopupBackgroundImage != null;
	if(shouldDestroyView){
		updaterPopupBackgroundImage.remove(updaterPopupLabel1);
		updaterPopupBackgroundImage.remove(updaterPopupLabel2);
		updaterPopupBackgroundImage.remove(updaterPopupLabel3);
		updaterPopupBackgroundImage.remove(updaterPopupLabel4);
		updaterPopupBackgroundImage.remove(updaterPopupDownloadButton);
		updaterPopupBackgroundImage.remove(updaterPopupCloseButton);
		updaterPopupBackgroundImage.remove(updaterPopupReadyButton);
		//components from download action
		if(updaterPopupLabelProgress != null){
			updaterPopupBackgroundImage.remove(updaterPopupLabelProgress);
		}
		
		//Event handlers
		updaterPopupCloseButton.removeEventListener('click', closePopupContentUpdate);
		updaterPopupDownloadButton.removeEventListener('click', downloadUpdate);
		updaterPopupReadyButton.removeEventListener('click', closePopupContentUpdateAfterDownload);
		//Add it to the categories view
		view.remove(updaterPopupBackgroundImage);
		
		//destory components
		updaterPopupBackgroundImage = null;
		updaterPopupLabel1 = null;
		updaterPopupLabel2 = null;
		updaterPopupLabel3 = null;
		updaterPopupLabel4 = null;
		updaterPopupDownloadButton = null;
		updaterPopupCloseButton = null;
		updaterPopupReadyButton = null;
		updaterPopupLabelProgress = null;
	} else {
		Ti.API.warn('NOT destroying ContentPopup view - already in progress');
	}
}

/*Persists the content version*/
function setContentVersion(v){
	Ti.API.info('setContentVersion() called with '+v);
	Ti.App.Properties.setInt('CONTENT_VERSION', v);
}

/*Returns the content version*/
function getContentVersion(){
	var version = 0;
	if(Ti.App.Properties.getInt('CONTENT_VERSION') != null){
		Ti.API.info('1getContentVersion returning '+Ti.App.Properties.getInt('CONTENT_VERSION')); 	
		version = Ti.App.Properties.getInt('CONTENT_VERSION');
	} else {
		Ti.API.info('2getContentVersion returning '+CONTENT_VERSION); 
		version = CONTENT_VERSION;
	}
	
	return version;
}

function isContentUpdateNeeded(latestContentVersion){
	Ti.API.info('isContentUpdateNeeded cheching for '+latestContentVersion); 	
	var currentContentVersion = getContentVersion();
	if(latestContentVersion != null && currentContentVersion != null && latestContentVersion > currentContentVersion){
		Ti.API.info('isContentUpdateNeeded() setting to true');
		NEW_CONTENT_AVAILABLE = true;
	} else {
		Ti.API.info('isContentUpdateNeeded() setting to false');
		NEW_CONTENT_AVAILABLE = false;
	}
	
	Ti.API.warn('Checking for new content from device version '+currentContentVersion+' against server version '+latestContentVersion+' - NEW_CONTENT_AVAILABLE = '+NEW_CONTENT_AVAILABLE);
}

/*Retrieves all the player ids on this device and deletes their scores*/
function deleteOnlineScores(){
	var db = Ti.Database.install('buzz_db.sqlite', 'db');
	var rows = db.execute('select player_id from players where player_id is not null');
	
	var remotePlayerId = [];
	while (rows.isValidRow()){
		remotePlayerId.push(rows.field(0));
		rows.next();	
	}
	
	db.close();
	
	//convert to json
	remotePlayerId = escape(JSON.stringify(remotePlayerId));
	Ti.API.info('deleteOnlineScores() found players for delete: '+remotePlayerId);
	
	if(remotePlayerId != null && Titanium.Network.online == true){
		var xhr = Ti.Network.createHTTPClient();
		xhr.setTimeout(NETWORK_TIMEOUT);
		
		xhr.onload = function(e) {
			var jsonData = JSON.parse(this.responseText);
			Ti.API.info('deleteOnlineScores() got back data from server '+jsonData.RESPONSE);
		};
		
		xhr.open('POST', API + 'deleteOnlineScores'); 
		xhr.send({players:remotePlayerId});
	} 
	
	Ti.API.info('deleteOnlineScores() returns after deletion of: '+remotePlayerId);
}

/*Retrieves the updated content, updates questions, marks the new local device version and deletes online scores :)*/
function loadOnlineQuestions(){
	var xhr = Ti.Network.createHTTPClient();
	xhr.setTimeout(NETWORK_TIMEOUT);
	
	var updates = 0;
	var inserts = 0;
	var updateProgress = 0;
	var questionsLength = 0;
	var percentageComplete = 0;
	var rowsAffected = 0;
	var currentContentVersion = getContentVersion();
	var currentDeviceToken = getDeviceToken();
	var latestContentVersion = 0;
	
	if (Titanium.Network.online == true){
		
		xhr.onload = function(e) { 	
			var jsonData = JSON.parse(this.responseText);
				
			if(jsonData.RESPONSE == '1'){
				latestContentVersion = jsonData.CONTENT_VERSION;
				
				var questions = jsonData.questions;
				questionsLength = questions.length;
				Ti.API.info('loadOnlineQuestions() got back data from server '+questionsLength+' questions'); 
				
				var db = Ti.Database.install('buzz_db.sqlite', 'db');
				db.execute('create index if not exists question_index on questions (question_id)');
				db.execute('BEGIN');
				
				var questionsBeforeUpdate = countQuestions();
				
				for(var i=0; i < questionsLength; i++){
					
					var id = questions[i].id;
					var question = questions[i].question;
					var categoryId = questions[i].category_id;
					var answer_a = questions[i].answer_a;
					var answer_b = questions[i].answer_b;
					var answer_c = questions[i].answer_c;
					var answer_d = questions[i].answer_d;
					var correct = questions[i].correct;
					var value = questions[i].value;
					var wikipedia = questions[i].wikipedia;
					
					//convert correct answer from int to chars
					if(correct == 1) {
						correct = 'a';
					} else if(correct == 2)  {
						correct = 'b';
					} else if(correct == 3) {
						correct = 'c';
					} else if(correct == 4) {
						correct = 'd';
					}
					
					
					db.execute('update questions set category_id=?, question=?, answer_a=?, answer_b=? ,answer_c=?, answer_d=?, correct=?, value=?,wikipedia=? where question_id=?', categoryId, question, answer_a, answer_b, answer_c, answer_d, correct, value, wikipedia,id);
					rowsAffected = db.getRowsAffected();
					
					if(rowsAffected == 0){
						db.execute('insert into questions (category_id,question,answer_a, answer_b,answer_c,answer_d,correct,value,question_id,wikipedia) values (?,?,?,?,?,?,?,?,?,?)', categoryId, question, answer_a, answer_b, answer_c, answer_d, correct, value, id,wikipedia);
						inserts++;
					} else {
						updates++;
					}
					
					//Calculate percentage
					percentageComplete = Math.round((i / questionsLength) * 100) + '%';
					updaterPopupLabelProgress.text = percentageComplete;
					//Ti.API.info('Done with question '+i+' - percentage is '+percentageComplete);
				}
				
				db.execute('COMMIT');
				db.close();
				var questionsAfterUpdate = countQuestions();
				
				//Save the updated device version
				setContentVersion(latestContentVersion);
				//Reset the new content flags
				NEW_CONTENT_AVAILABLE = false;
				NEW_CONTENT_POPUP_COUNTER = 0;
				//Delete online scores
				deleteOnlineScores();
				
				//Hide progress bar and update UI
				updateDownloaderActivityIndicator.hide();
				updaterPopupBackgroundImage.remove(updateDownloaderActivityIndicator);
				updateDownloaderActivityIndicator = null;
				updaterPopupLabelProgress.text = 'Update complete!';
				updaterPopupReadyButton.show();
				
				Ti.API.info('loadOnlineQuestions() update complete ('+updates+' updates, '+inserts+' inserts) - questionsBeforeUpdate '+questionsBeforeUpdate+' questionsAfterUpdate='+questionsAfterUpdate);
			}
		};
		
		xhr.open('POST', API + 'updateQuestions'); 
		xhr.send({version:currentContentVersion, device:currentDeviceToken});
	}
}