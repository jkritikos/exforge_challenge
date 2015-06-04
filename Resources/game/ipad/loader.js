mtbImport("question.js");

var currentCategoryIcon = '';

var viewLoader = Ti.UI.createView({
	backgroundImage:IMAGE_PATH+'signin/background.jpg',
	opacity:0,
	top:0,
	bottom:0,
	left:0,
	right:0,
	zIndex:49
});

//Loader start listener
viewLoader.addEventListener('loaderStart', function(data){
	Ti.API.info('EVENT: loaderStart with data '+JSON.stringify(data));
	
    currentCategoryIcon = data.currentCategoryIcon;
    var currentCategoryLabel = data.currentCategoryLabel;
    loaderIcon.image = currentCategoryIcon;
    categoryLabel.text = currentCategoryLabel;
    
    var tipToDisplay = getLoadingTip();
	loaderTipLabel.text = tipToDisplay;
    
    //Always load the gameplay music - safe?
    //if(gameSession.getGameType() == BUZZ_GAME_GROUP){
    	//audioGameplay = Ti.Media.createSound({url:'sounds/group_loop.caf', looping:true});
    //} else {
    audioGameplay = Ti.Media.createSound({url:'sounds/gameplay.mp3', looping:true});
    //}
    
    if(!AUDIO_GAMEPLAY_LOADED){
		Ti.API.warn('Loading gameplay sounds');
		audioBonusLife = Ti.Media.createSound({url:'sounds/bonus.caf', looping:false});
		answerCorrect = Ti.Media.createSound({url:'sounds/quiz-correct.caf', looping:false});
		answerWrong = Ti.Media.createSound({url:'sounds/quiz-wrong.caf', looping:false});
		gameOverSound = Ti.Media.createSound({url:'sounds/quiz-stab.caf', looping:false});
		timeOverSound = Ti.Media.createSound({url:'sounds/quiz-reversestab.caf', looping:false});
		scoreSound = Ti.Media.createSound({url:'sounds/score.caf', looping:false});
		nextQuestionSound = Ti.Media.createSound({url:'sounds/whoosh.caf', looping:false});
		
		audioGameplay.addEventListener('resume', function(){
			Ti.API.warn('AUDIO RESUMED');
			audioGameplay.reset();
			audioGameplay.play();
		});
		
		AUDIO_GAMEPLAY_LOADED = true;
	}
    
    var categoryId = data.categoryId;
    var restartingGame = data.restartGame;
    
    //set category images for banner
    var categoryProperties = getCategoryProperties(categoryId);
    var targetCategoryIcon = categoryProperties.banner;

    var loadEvent = function(){
    	//Start in-game music
		if(MUSIC_MODE){
			audio.stop();
			audioGameplay.play();
		}
    	
    	Ti.API.info('Loader: Setting category banner to '+targetCategoryIcon);
    	gameSession.setCurrentCategoryBanner(targetCategoryIcon);
    	gameSession.setSelectedGameCategoryId(categoryId);
    	
    	//trelo workaround...
    	if(!restartingGame || gameSession.shouldRestartWithNewCategory()){
    		
    		if(gameSession.shouldRestartWithNewCategory()){
    			gameSession.restartGameSession();
    			gameSession.setRestartWithNewCategory(false);
    		} else {
    			Ti.API.info('SAVING tmp players');
    			gameSession.saveTmpPlayers();	
    		}
    	}
    	
    	//Start the game UI
		buildQuestionView(targetCategoryIcon);
	
    	//show questions view
		viewQuestion.fireEvent('gameStart');
		viewQuestion.animate(anim_in);
	};
    
    //prepare for game
    setTimeout (loadEvent, 2500);
});

//Loader tip
var loaderTipImage = Titanium.UI.createImageView({
	image:IMAGE_PATH+'loader/loading_tip.png',
	bottom:30
});

//Activity indicator
var actInd = Titanium.UI.createActivityIndicator({
	style:Titanium.UI.iPhone.ActivityIndicatorStyle.BIG,
	height:20,
	width:20,
	top:495
});
viewLoader.add(actInd);

//Loader icon
var loaderIcon = Titanium.UI.createImageView({
	image:IMAGE_PATH+'loader/sports.png',
	top:152
});
viewLoader.add(loaderIcon);

//Loader generic label
var genericLabel = Titanium.UI.createLabel({
	text:'Φόρτωση Κατηγορίας',
	color:'0b4b7f',
	textAlign:'left',
	top:536,
	font:{fontSize:33, fontWeight:'regular', fontFamily:'Myriad Pro'}
});
viewLoader.add(genericLabel);

//Loader category label
var categoryLabel = Titanium.UI.createLabel({
	color:'0b4b7f',
	top:588,
	textAlign:'left',
	font:{fontSize:39, fontWeight:'bold', fontFamily:'Myriad Pro'}
});
viewLoader.add(categoryLabel);

//tip background
var loaderTipBackground = Titanium.UI.createView({
	backgroundColor:'0b4b7f',
	bottom:0,
	height:193
});

//loader tip icon
var loaderTipIcon = Titanium.UI.createImageView({
	image:IMAGE_PATH+'loader/tip_icon.png',
	left:53
});
loaderTipBackground.add(loaderTipIcon);

//Loader tip label
var loaderTipLabel = Titanium.UI.createLabel({
	text:'',
	textAlign:'center',
	width:478,
	height:70,
	top:65,
	left:145,
	color:'white',
	font:{fontSize:29, fontWeight:'regular', fontFamily:'Myriad Pro'}
});
loaderTipBackground.add(loaderTipLabel);

viewLoader.add(loaderTipBackground);

win.add(viewLoader);

actInd.show();