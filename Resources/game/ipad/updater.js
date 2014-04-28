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
var updaterPopupLabelProgress = null;
var updateDownloaderActivityIndicator = null;
var updateCompletedImage = null;
var updaterPlayNowBar = null;
var bottomBackgroundBar = null;
var topBar = null;
var updaterBottomRemindMeLabel = null;
var bottomBar = null;
var topBarLabel1 = null;
var updaterBackButton = null;
var updaterPlayNowLabelAttributes = null;
var updaterPlayNowLabel = null;

var updaterAnimationBox1, updaterAnimationBox2, updaterAnimationBox3, updaterAnimationBox4, updaterAnimationContainer = null;
var updaterAnimationRunning = false;

/*Creates and renders the popup for content update*/
function buildPopupContentUpdate(catId){
	var shouldCreateView = updaterPopupBackgroundImage == null;
	if(shouldCreateView){
		//popup background
		updaterPopupBackgroundImage = Ti.UI.createImageView({
			backgroundColor:'white',
            width:'100%',
            height:'100%',
            top:PLATFORM_HEIGHT + 100,
            bottom:0,
            left:0,
            right:0,
            zIndex:10
		});
		
		var updaterBottomColor = ''; 
		
		if(catId == CAT_EXFORGE){
			updaterBottomColor = 'fb494a'; 
		}else if(catId == CAT_EPISTIMI){
			updaterBottomColor = '6fb042'; 
		}else if(catId == CAT_GEOGRAFIA){
			updaterBottomColor = '569bd4'; 
		}else if(catId == CAT_ISTORIA){
			updaterBottomColor = 'fb9a01'; 
		}else if(catId == CAT_ATHLITIKA){
			updaterBottomColor = '9b52e7'; 
		}
		
		topBar = Ti.UI.createView({
            height:192,
            top:0,
            backgroundColor:'#0b4b7f'
        });
        
        bottomBackgroundBar = Ti.UI.createView({
            width:'100%',
            height:132,
            bottom:0,
            backgroundColor:'#0b4b7f'
        });
        bottomBackgroundBar.addEventListener('click', closePopupContentUpdate);
        
        updaterBottomRemindMeLabel = Ti.UI.createLabel({
			text:'ΥΠΕΝΘΥΜΙΣΗ ΓΙΑ ΑΡΓΟΤΕΡΑ',
			color:'white',
			textAlign:'center',
			font:{fontSize:36, fontWeight:'regular', fontFamily:'Myriad Pro'},
			top:33
		});
        
        bottomBar = Ti.UI.createView({
            width:'100%',
            height:35,
            bottom:0,
            backgroundColor:updaterBottomColor
        });
        
        topBarLabel1 = Ti.UI.createLabel({
            text:'ΝΕΕΣ ΕΡΩΤΗΣΕΙΣ!',
			color:'white',
			top:88,
			font:{fontSize:64, fontWeight:'bold', fontFamily:'Myriad Pro'}
        });
        
        //back button
		updaterBackButton = Titanium.UI.createButton({
			backgroundImage:IMAGE_PATH+'categories/back.png',
			left:30,
			top:25,
			width:55,
			height:55
		});
		updaterBackButton.addEventListener('click', closePopupContentUpdate);
		
		topBar.add(topBarLabel1);
		topBar.add(updaterBackButton);
		
		updaterPopupLabel1 = Ti.UI.createLabel({
			text:'MORE QUESTIONS',
			color:'#0b4b7f',
			textAlign:'center',
			font:{fontSize:35, fontWeight:'regular', fontFamily:'Myriad Pro'},
			top:278
		});
		
		updaterPopupLabel2 = Ti.UI.createLabel({
			text:'MORE PLAY',
			color:'#0b4b7f',
			textAlign:'center',
			font:{fontSize:54, fontWeight:'regular', fontFamily:'Myriad Pro'},
			top:318
		});
		
		updaterPopupLabel3 = Ti.UI.createLabel({
            text:'DOWNLOADING 0%',
            color:'#0b4b7f',
            textAlign:'center',
            width:'100%',
            visible:false,
            font:{fontSize:23, fontWeight:'regular', fontFamily:'Myriad Pro'},
            top:694
        });
        
        updaterPopupLabel4 = Ti.UI.createLabel({
            text:'PLEASE WAIT',
            color:'#0b4b7f',
            textAlign:'center',
            width:'100%',
            visible:false,
            font:{fontSize:21, fontWeight:'regular', fontFamily:'Myriad Pro'},
            top:723
        });
		
		updaterPopupDownloadButton = Ti.UI.createImageView({
			image:IMAGE_PATH+'updater/download.png',
			top:447
		});
		
		updateCompletedImage = Ti.UI.createImageView({
			image:IMAGE_PATH+'updater/answer_right.png',
			top:426
		});
		
		//activity indicator
		updaterAnimationContainer = Ti.UI.createView({
		    width:'100%',
		    height:40,
		    backgroundColor:'transparent',
		    opacity:0
		});
		
		updaterAnimationBox1 = Ti.UI.createView({
            backgroundColor:'fb494a',
            width:42,
            height:42,
            left:'32%',
            opacity:1
        });
        
        updaterAnimationBox2 = Ti.UI.createView({
            backgroundColor:'6fb042',
            width:42,
            height:42,
            left:'42%',
            opacity:1
        });
        
        updaterAnimationBox3 = Ti.UI.createView({
            backgroundColor:'569bd4',
            width:42,
            height:42,
            left:'52%',
            opacity:1
        });
        
        updaterAnimationBox4 = Ti.UI.createView({
            backgroundColor:'fb9a01',
            width:42,
            height:42,
            left:'62%',
            opacity:1
        });
        
        //play now bar
		updaterPlayNowBar = Titanium.UI.createView({
			backgroundColor:'0b4b7f',
			height:168,
			bottom:0,
			catId:catId
		});
		updaterPlayNowBar.addEventListener('click', handlePlayNowButton);
		
		//play now label attributes
		updaterPlayNowLabelAttributes = Titanium.UI.iOS.createAttributedString({
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
		updaterPlayNowLabel = Titanium.UI.createLabel({
			attributedString:updaterPlayNowLabelAttributes,
			font:{fontSize:67, fontWeight:'bold', fontFamily:'Arial'},
			catId:catId
		});
        
        updaterAnimationContainer.add(updaterAnimationBox1);
        updaterAnimationContainer.add(updaterAnimationBox2);
        updaterAnimationContainer.add(updaterAnimationBox3);
        updaterAnimationContainer.add(updaterAnimationBox4);
		//end activity indicator
		
		updaterPopupBackgroundImage.add(updaterAnimationContainer);
		updaterPopupBackgroundImage.add(topBar);
		bottomBackgroundBar.add(bottomBar);
		bottomBackgroundBar.add(updaterBottomRemindMeLabel);
		updaterPopupBackgroundImage.add(bottomBackgroundBar);
		updaterPopupBackgroundImage.add(updaterPopupLabel1);
		updaterPopupBackgroundImage.add(updaterPopupLabel2);
		updaterPopupBackgroundImage.add(updaterPopupLabel3);
		updaterPopupBackgroundImage.add(updaterPopupLabel4);
		updaterPopupBackgroundImage.add(updaterPopupDownloadButton);
		updaterPopupBackgroundImage.add(updateCompletedImage);
		updaterPlayNowBar.add(updaterPlayNowLabel);
		updaterPopupBackgroundImage.add(updaterPlayNowBar);
		
		updateCompletedImage.hide();
		updaterPlayNowBar.hide();
		
		updaterPopupDownloadButton.addEventListener('click', downloadUpdate);
		
		//Add it to the categories view
		viewCategories.add(updaterPopupBackgroundImage);
		updaterPopupBackgroundImage.animate({top:0, duration:300});
	} else {
		Ti.API.warn('NOT building UpdatePopup view - already in progress');
	}
	
}

/*Closes and destroys the popup for content update*/
function closePopupContentUpdate(){
	if(SOUNDS_MODE){
		audioBack.play();
	}
	
	NEW_CONTENT_POPUP_COUNTER++;
	
	updaterPopupBackgroundImage.animate({top:PLATFORM_HEIGHT+100, duration:300}, function(){
	   destroyPopupContentUpdate();    
	}); 
}


function updaterAnimationTask(){
    updaterAnimationContainer.animate({opacity:1, duration:200}, function(){
        updaterAnimationBox1.animate({transform:SCALE_UP, autoreverse:true, duration:200}, function(){
            updaterAnimationBox2.animate({transform:SCALE_UP, autoreverse:true, duration:200}, function(){
                updaterAnimationBox3.animate({transform:SCALE_UP, autoreverse:true, duration:200}, function(){
                    updaterAnimationBox4.animate({transform:SCALE_UP, autoreverse:true, duration:200}, function(){
                        if(updaterAnimationRunning){
                            updaterAnimationTask();
                        }
                    });
                });
            });
        });
    });
}

function downloadUpdate(){
    //begin animation
    updaterAnimationRunning = true;
    updaterAnimationTask();
    
    updaterPopupLabel3.show();
    updaterPopupLabel4.show();
	updaterPopupDownloadButton.hide();
	
	updaterPopupLabelProgress = Ti.UI.createLabel({
		text:'0%',
		color:'white',
		textAlign:'left',
		//width:150,
		//height:40,
		left:200,
		font:{fontSize:13, fontWeight:'bold', fontFamily:'Myriad Pro'},
		top:IPHONE5? 305:265
	});
	
	//updaterPopupBackgroundImage.add(updaterPopupLabelProgress);
	
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
		//components from download action
		if(updaterPopupLabelProgress != null){
			updaterPopupBackgroundImage.remove(updaterPopupLabelProgress);
		}
		
		topBar.remove(topBarLabel1);
		topBar.remove(updaterBackButton);
		updaterPopupBackgroundImage.remove(topBar);
		bottomBackgroundBar.remove(bottomBar);
		bottomBackgroundBar.remove(updaterBottomRemindMeLabel);
		updaterPopupBackgroundImage.remove(bottomBackgroundBar);
		bottomBackgroundBar.remove(bottomBar);
		updaterPopupBackgroundImage.remove(updateCompletedImage);
		updaterPlayNowBar.remove(updaterPlayNowLabel);
		updaterPopupBackgroundImage.remove(updaterPlayNowBar);
		
		//Event handlers
		updaterPopupDownloadButton.removeEventListener('click', downloadUpdate);
		bottomBackgroundBar.removeEventListener('click', closePopupContentUpdate);
		updaterBackButton.removeEventListener('click', closePopupContentUpdate);
		updaterPlayNowBar.removeEventListener('click', handlePlayNowButton);
		//Add it to the categories view
		viewCategories.remove(updaterPopupBackgroundImage);
		
		//destory components
		updaterPopupBackgroundImage = null;
		updaterPopupLabel1 = null;
		updaterPopupLabel2 = null;
		updaterPopupLabel3 = null;
		updaterPopupLabel4 = null;
		updaterPopupDownloadButton = null;
		updaterPopupLabelProgress = null;
		
		topBar = null;
		updaterBottomRemindMeLabel = null;
		bottomBar = null;
		topBarLabel1 = null;
		updaterBackButton = null;
		updaterPlayNowLabelAttributes = null;
		updaterPlayNowLabel = null;
		updateCompletedImage = null;
		bottomBackgroundBar = null;
		updaterPlayNowBar = null;
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
					percentageComplete = Math.round((i / questionsLength) * 100);
					
					if(percentageComplete < 100){
					    updaterPopupLabel3.text = 'DOWNLOADING '+percentageComplete+'%';
					} else if(percentageComplete == 100){
					    updaterPopupLabel3.text = 'DOWNLOADED 100%';
					    updaterPopupLabel4.text = 'UPDATE COMPLETE';
					    
					    updaterAnimationContainer.hide();;
					    
					    bottomBackgroundBar.hide();
					    updateCompletedImage.show();
						updaterPlayNowBar.show();
					}
					
					//updaterPopupLabelProgress.text = percentageComplete;
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
				//deleteOnlineScores();
				
				//Hide progress bar and update UI
				updaterAnimationRunning = false;
				updaterAnimationContainer.hide();
				
				updaterPopupLabel4.text = 'UPDATE COMPLETE!';
				
				Ti.API.info('loadOnlineQuestions() update complete ('+updates+' updates, '+inserts+' inserts) - questionsBeforeUpdate '+questionsBeforeUpdate+' questionsAfterUpdate='+questionsAfterUpdate);
			}
		};
		
		xhr.open('POST', API + 'updateQuestions'); 
		xhr.send({version:currentContentVersion, device:currentDeviceToken});
	}
}

function handlePlayNowButton(e){
	if(SOUNDS_MODE){
		audioClick.play();
	}
	
	var currentSoloPlayer = getCurrentPlayer();
	
	var tmpPlayerObj = {
		validated:true,
		name:currentSoloPlayer.name,
		player_id:currentSoloPlayer.id,
		playerIndex:0,
		avatarIndex:0
	};
	
	var tmpPlayerObjList = [];
	tmpPlayerObjList.push(tmpPlayerObj);
	gameSession.setTmpPlayerNames(tmpPlayerObjList);
	
	
	mtbImport("loader.js");
	
	var targetCategoryIcon = '';
	var targetCategoryLabel = '';
	var categoryId = e.source.catId;
	
	var categoryPropeties = getCategoryProperties(categoryId);
	targetCategoryIcon = categoryPropeties.loader;
	targetCategoryLabel = categoryPropeties.name;
    
	    	
    //START game
    viewLoader.fireEvent('loaderStart', {currentCategoryIcon:targetCategoryIcon, currentCategoryLabel:targetCategoryLabel, categoryId:categoryId});
    fadeIntroAudioOut();
    viewLoader.animate({opacity:1, duration:400}, function(){
		destroyPopupContentUpdate();
    	destroyCategoriesView();
    });
}