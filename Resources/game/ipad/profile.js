var myFacebookImage = IMAGE_PATH+'profile/user_noimage';
//The scoreData
var playerData = null;
var profileDataInfo = null;

//The view
var viewProfile = Ti.UI.createView({
	backgroundImage:IMAGE_PATH+'signin/background.jpg',
	opacity:0,
	top:0,
	bottom:0,
	left:0,
	right:0
});

//Load data event listener
viewProfile.addEventListener('myProfile', function(e) {
	Ti.API.info('Load data for myProfile event: player is '+e.player.facebook_id);
	
	var currentPlayer = e.player;
	if(currentPlayer.facebook_id == null || currentPlayer.facebook_id == ''){
		myFacebookImage = IMAGE_PATH+'profile/user_noimage.png';
	} else {
		myFacebookImage = 'http://graph.facebook.com/'+fbId+'/picture?height=130&width=130';
	}
	
	friendImage.image = myFacebookImage;
	playerData = e.profileHighScores;
	profileDataInfo = e.profileData;
	displayProfileData(playerData,profileDataInfo);
});

//Back button
var backHomeFromProfileButton = Titanium.UI.createButton({
	backgroundImage:IMAGE_PATH+'categories/back.png',
	left:30,
	top:25,
	width:55,
	height:55
});

//Back button event listener
backHomeFromProfileButton.addEventListener('click', function() {
	if(SOUNDS_MODE){
		audioBack.play();	
	}
	
	Ti.API.info('BACK to home clicked');
	destroyProfileView();
});
	
viewProfile.add(backHomeFromProfileButton);

//Profile view UI components
var iconImageProfile = null;
var barImageProfile = null;
var iconReflectionImageProfile = null;
var titleImageProfile = null;
var topBackground = null;
var nameLabelValue = null;
var friendImage = null;
var tagEpitixiaImage = null;
var tagParasimaImage = null;
var tagTopScoreImage = null;
var topScoreLabelValue = null;
var badgesLabelValue = null;
var successPercentageValue = null;
var tableViewDetails = null;
var highScoresLabel = null;

function buildProfileView(){
	var shouldCreateView = highScoresLabel == null;
	if(shouldCreateView){
		VIEWING_PROFILE = true;
		
		//title background bar
		profileTitleBackgroundBar = Titanium.UI.createView({
			backgroundColor:'0b4b7f',
			height:192,
			top:0
		});
		
		profileTitleBackgroundBar.add(backHomeFromProfileButton);
		
		//logo image
		var profileLogoImage = Titanium.UI.createImageView({
			image:IMAGE_PATH+'profile/profile_icon.png',
			top:20,
			right:28
		});
		profileTitleBackgroundBar.add(profileLogoImage);
		
		//Name Label value
		var profileTitleLabel = Titanium.UI.createLabel({
			text:'ΠΡΟΦΙΛ',
			color:'white',
			top:103,
			font:{fontSize:64, fontWeight:'bold', fontFamily:'Myriad Pro'}
		});
		profileTitleBackgroundBar.add(profileTitleLabel);
		
		viewProfile.add(profileTitleBackgroundBar);
		
		//Name Label value
		nameLabelValue = Titanium.UI.createLabel({
			text:'',
			color:'fb494a',
			top:255,
			font:{fontSize:68, fontWeight:'regular', fontFamily:'Myriad Pro'}
		});
		viewProfile.add(nameLabelValue);
		
		//middle background bar
		var profileMiddleBackgroundBar = Titanium.UI.createView({
			backgroundColor:'5e9fd5',
			height:173,
			top:353
		});
		viewProfile.add(profileMiddleBackgroundBar);
		
		//left sepparator on middle bar
		var profileLeftSepparator = Titanium.UI.createView({
			backgroundColor:'white',
			width:2,
			height:89,
			top:55,
			left:255
		});
		profileMiddleBackgroundBar.add(profileLeftSepparator);
		
		//right sepparator on middle bar
		var profileRightSepparator = Titanium.UI.createView({
			backgroundColor:'white',
			width:2,
			height:89,
			top:55,
			right:255
		});
		profileMiddleBackgroundBar.add(profileRightSepparator);
		
		//Games label
		var profileGamesLabel = Titanium.UI.createLabel({
			text:'ΠΑΙΧΝΙΔΙΑ',
			color:'white',
			textAlign:'left',
			left:55,
			top:25,
			font:{fontSize:30, fontWeight:'semibold', fontFamily:'Myriad Pro'}
		});
		profileMiddleBackgroundBar.add(profileGamesLabel);
		
		//left games background on middle bar
		var profileGamesBackground = Titanium.UI.createView({
			backgroundColor:'transparent',
			width:255,
			height:89,
			top:55,
			left:0
		});
		
		//Games played value
		var gamesLabelValue = Titanium.UI.createLabel({
			text:'0',
			color:'white',
			textAlign:'center',
			left:10,
			right:10,
			top:15,
			font:{fontSize:83, fontWeight:'bold', fontFamily:'Myriad Pro'}
		});
		profileGamesBackground.add(gamesLabelValue);
		
		profileMiddleBackgroundBar.add(profileGamesBackground);
		
		//Badges label
		var profileBadgesLabel = Titanium.UI.createLabel({
			text:'ΠΑΡΑΣΗΜΑ',
			color:'white',
			textAlign:'left',
			right:46,
			top:25,
			font:{fontSize:30, fontWeight:'semibold', fontFamily:'Myriad Pro'}
		});
		profileMiddleBackgroundBar.add(profileBadgesLabel);
		
		//left badges background on middle bar
		var profileBadgesBackground = Titanium.UI.createView({
			backgroundColor:'transparent',
			width:255,
			height:89,
			top:55,
			right:0
		});
		
		//Badges value
		badgesLabelValue = Titanium.UI.createLabel({
			text:'0',
			textAlign:'center',
			color:'white',
			left:10,
			right:10,
			top:15,
			font:{fontSize:83, fontWeight:'bold', fontFamily:'Myriad Pro'}
		});
		profileBadgesBackground.add(badgesLabelValue);
		
		profileMiddleBackgroundBar.add(profileBadgesBackground);
		
		//Top Score label
		var profileTopScoreLabel = Titanium.UI.createLabel({
			text:'TOP SCORE',
			color:'white',
			textAlign:'center',
			top:25,
			font:{fontSize:30, fontWeight:'semibold', fontFamily:'Myriad Pro'}
		});
		profileMiddleBackgroundBar.add(profileTopScoreLabel);
		
		//left badges background on middle bar
		var profileTopScoreBackground = Titanium.UI.createView({
			backgroundColor:'transparent',
			width:254,
			height:89,
			top:55
		});
		
		//Top score value
		topScoreLabelValue = Titanium.UI.createLabel({
			text:'0',
			color:'white',
			textAlign:'center',
			left:10,
			right:10,
			top:15,
			font:{fontSize:83, fontWeight:'bold', fontFamily:'Myriad Pro'}
		});
		profileTopScoreBackground.add(topScoreLabelValue);
		
		profileMiddleBackgroundBar.add(profileTopScoreBackground);
		
		//scores table
		tableViewDetails = Titanium.UI.createTableView({
			data:[],
			minRowHeight:120,
			backgroundColor:'transparent',
			separatorColor:'gray',
			top:526,
			bottom:10
		});
		
		viewProfile.add(tableViewDetails);
		
		//High scores label
		highScoresLabel = Titanium.UI.createLabel({
			text:'HIGH SCORES',
			color:'white',
			left:10,
			top:500,
			height:50,
			font:{fontSize:38, fontWeight:'bold', fontFamily:'321impact'}
		});
		
		//viewProfile.add(highScoresLabel);
	
		//Icon image
		iconImageProfile = Titanium.UI.createImageView({
			image:IMAGE_PATH+'profile/icon.png',
			top:16,
			right:15
		});
		
		//viewProfile.add(iconImageProfile);
		
		//Bar image
		barImageProfile = Titanium.UI.createImageView({
			image:IMAGE_PATH+'profile/bar.png',
			top:108
		});
		
		//viewProfile.add(barImageProfile);
		
		//Icon image reflection
		iconReflectionImageProfile = Titanium.UI.createImageView({
			image:IMAGE_PATH+'profile/icon_r.png',
			top:1,
			right:15
		});
		
		//barImageProfile.add(iconReflectionImageProfile);
		
		//Title image
		titleImageProfile = Titanium.UI.createImageView({
			image:IMAGE_PATH+'profile/title.png',
			top:49,
			zIndex:2
		});
		
		//viewProfile.add(titleImageProfile);
		
		//Info background
		topBackground = Titanium.UI.createImageView({
			image:IMAGE_PATH+'profile/top_bg.png',
			top:213
		});
		
		//viewProfile.add(topBackground);
		
		//topBackground.add(nameLabelValue);
		
		//My facebook image
		friendImage = Ti.UI.createImageView({
			image:myFacebookImage,
			defaultImage:IMAGE_PATH+'profile/user_noimage.png',
			left:33,
			top:80,
			borderColor:'white',
			borderWidth:2
		});
		
		//friendImage.addEventListener('click', goToSettings)
				
		//Success tag image
		tagEpitixiaImage = Titanium.UI.createImageView({
			image:IMAGE_PATH+'profile/tag_epitixia.png',
			top:80,
			left:553
		});
		
		//Success tag image event listener
		//tagEpitixiaImage.addEventListener('click', showStats);
		
		tagParasimaImage = Titanium.UI.createImageView({
			image:IMAGE_PATH+'profile/tag_parasima.png',
			top:80,
			left:368
		});
	
		//Top score tag image
		tagTopScoreImage = Titanium.UI.createImageView({
			image:IMAGE_PATH+'profile/tag_topscore.png',
			top:80,
			left:183
		});
		
		//Stats Success rate value
		successPercentageValue = Titanium.UI.createLabel({
			text:'100%',
			color:'white',
			left:553,
			width:181,
			top:140,
			textAlign:'center',
			height:70,
			font:{fontSize:50, fontWeight:'bold', fontFamily:'321impact'}
		});
		
		//topBackground.add(friendImage);
		//topBackground.add(tagEpitixiaImage);
		//topBackground.add(tagParasimaImage);
		//topBackground.add(tagTopScoreImage);
		//topBackground.add(topScoreLabelValue);
		//topBackground.add(badgesLabelValue);
		//topBackground.add(successPercentageValue);
		
		//Top score tag image event listener
		tagTopScoreImage.addEventListener('click', goToHighScores);
		//Top score label event listener
		topScoreLabelValue.addEventListener('click', goToHighScores);
		//Event listener for badges
		tagParasimaImage.addEventListener('click', 	goToBadges);
		badgesLabelValue.addEventListener('click', goToBadges);
		successPercentageValue.addEventListener('click', showStats);
		
		win.add(viewProfile);
		
	} else {
		Ti.API.warn('NOT building Profile view - already in progress');
	}
}

function destroyProfileView(){
	Ti.API.warn('destroyProfileView() called');
	VIEWING_PROFILE = false;
	
	viewProfile.animate(anim_out);
	
	//Top score tag image event listener
	tagTopScoreImage.removeEventListener('click', goToHighScores);
	//Top score label event listener
	topScoreLabelValue.removeEventListener('click', goToHighScores);
	//Event listener for badges
	tagParasimaImage.removeEventListener('click', 	goToBadges);
	badgesLabelValue.removeEventListener('click', goToBadges);
	successPercentageValue.removeEventListener('click', showStats);
	friendImage.removeEventListener('click', goToSettings);
	//Success tag image event listener
	tagEpitixiaImage.removeEventListener('click', showStats);
	
	topBackground.remove(nameLabelValue);
	topBackground.remove(friendImage);
	topBackground.remove(tagEpitixiaImage);
	topBackground.remove(tagParasimaImage);
	topBackground.remove(tagTopScoreImage);
	topBackground.remove(topScoreLabelValue);
	topBackground.remove(badgesLabelValue);
	topBackground.remove(successPercentageValue);
	
	barImageProfile.remove(iconReflectionImageProfile);
	viewProfile.remove(barImageProfile);
	viewProfile.remove(titleImageProfile);
	viewProfile.remove(topBackground);
	viewProfile.remove(iconImageProfile);
	viewProfile.remove(tableViewDetails);
	viewProfile.remove(highScoresLabel);
	
	highScoresLabel = null;
	//scores table
	tableViewDetails = null;
	//Bar image
	barImageProfile = null;
	//Icon image
	iconImageProfile = null;
	//Icon image reflection
	iconReflectionImageProfile = null;
	//Title image
	titleImageProfile = null;
	//Info background
	topBackground = null;
	//Name Label value
	nameLabelValue = null;
	//My facebook image
	friendImage = null;
	//Success tag image
	tagEpitixiaImage = null;
	tagParasimaImage = null;
	//Top score tag image
	tagTopScoreImage = null;
	//Top score value
	topScoreLabelValue = null;
	//Stats Success rate value
	successPercentageValue = null;
	//Badges value
	badgesLabelValue = null;
	
	win.remove(viewProfile);
}

//Shows the High Scores screen
function goToHighScores(){
	if(SOUNDS_MODE){
		audioClick.play();	
	}
	
	mtbImport("top_selection.js");
	buildTopSelectionView();
	viewTopCategorySelection.animate(anim_in);
}

/*Shows the Settings screen*/
function goToSettings(){
	if(SOUNDS_MODE){
		audioClick.play();	
	}
	
	//load data
	var player = getCurrentPlayer();
	
	mtbImport("settings.js");
	buildSettingsView();
	viewSettings.fireEvent('updateSettingsUI', {player:player});
	viewSettings.animate(anim_in);
}

/*Shows the Badges screen*/
function goToBadges(){
	if(SOUNDS_MODE){
		audioClick.play();	
	}
	
	//load data
	var player = getCurrentPlayer();
	getBadgeData(player.id);
	
	mtbImport("stars_scroll.js");
	buildBadgesListView();
}

//Stats popup UI components
var statsBackgroundImage = null;
var statsLabelImage = null;
var statsCorrectAnswerLabel = null;
var statsCorrectAnswerValue = null;
var statsGamesLabel = null;
var statsGamesValue = null;
var statsExplorationLabel = null;
var statsExplorationValue = null;
var statsCloseImage = null;

function buildStatsPopup(){
	//Stats background
	statsBackgroundImage = Ti.UI.createImageView({
		image:IPHONE5 ? IMAGE_PATH+'profile/stat_bg-568h@2x.png' : IMAGE_PATH+'profile/stat_bg.png',
		zIndex:10,
		transform:SCALE_ZERO
	});
	
	//Stats background label
	statsLabelImage = Ti.UI.createImageView({
		image:IMAGE_PATH+'profile/stats.png',
		top:IPHONE5? 120 : 210
	});
	
	//Stats correct answers label
	statsCorrectAnswerLabel = Ti.UI.createLabel({
		text:'ΣΩΣΤΕΣ ΑΠΑΝΤΗΣΕΙΣ',
		textAlign:'center',
		color:'white',
		top:IPHONE5? 190 : 380,
		font:{fontSize:25, fontWeight:'bold', fontFamily:'Myriad Pro'}
	});
	
	//Stats correct answers value
	statsCorrectAnswerValue = Ti.UI.createLabel({
		text:'32%',
		textAlign:'center',
		color:'#74a4e1',
		top:IPHONE5? 220 : 420,
		height:70,
		font:{fontSize:50, fontWeight:'bold', fontFamily:'321impact'}
	});
	
	//Stats number of games label
	statsGamesLabel = Ti.UI.createLabel({
		text:'ΣΥΝΟΛΙΚΑ ΠΑΙΧΝΙΔΙΑ',
		textAlign:'center',
		color:'white',
		top:IPHONE5? 270 : 500,
		font:{fontSize:25, fontWeight:'bold', fontFamily:'Myriad Pro'}
	});
	
	//Stats number of games value
	statsGamesValue = Ti.UI.createLabel({
		text:'12',
		textAlign:'center',
		color:'#74a4e1',
		top:IPHONE5? 300 : 540,
		height:70,
		font:{fontSize:50, fontWeight:'bold', fontFamily:'321impact'}
	});
	
	//Stats exploration label
	statsExplorationLabel = Ti.UI.createLabel({
		text:'ΕΞΕΡΕΥΝΗΣΗ ΠΑΙΧΝΙΔΙΟΥ',
		textAlign:'center',
		color:'white',
		top:IPHONE5 ? 350 : 620,
		font:{fontSize:25, fontWeight:'bold', fontFamily:'Myriad Pro'}
	});
	
	//Stats explorationvalue
	statsExplorationValue = Ti.UI.createLabel({
		text:'91%',
		textAlign:'center',
		color:'#74a4e1',
		top:IPHONE5 ? 380 : 660,
		height:70,
		font:{fontSize:50, fontWeight:'bold', fontFamily:'321impact'}
	});
	
	//Stats background close button
	statsCloseImage = Ti.UI.createButton({
		backgroundImage:IMAGE_PATH+'top/invite_x.png',
		top:IPHONE5 ? 90 : 140,
		right:115,
		width:78,
		height:76
	});
	
	setStatsPopupPlayerData(profileDataInfo);
	
	statsBackgroundImage.add(statsExplorationLabel);
	statsBackgroundImage.add(statsExplorationValue);
	statsBackgroundImage.add(statsGamesLabel);
	statsBackgroundImage.add(statsGamesValue);
	statsBackgroundImage.add(statsCorrectAnswerLabel);
	statsBackgroundImage.add(statsCorrectAnswerValue);
	statsBackgroundImage.add(statsLabelImage);
	statsBackgroundImage.add(statsCloseImage);
	
	//Stats background close button event listener
	statsCloseImage.addEventListener('click', closeStatsPopup);
		
	viewProfile.add(statsBackgroundImage);
}

/*Closes the stats popup and destroys the UI components*/
function closeStatsPopup(){
	statsBackgroundImage.transform = SCALE_ZERO;
	destroyStatsPopup();
}

function destroyStatsPopup(){
	Ti.API.warn('destroyStatsPopup() called');
	
	//Stats background close button event listener
	statsCloseImage.removeEventListener('click', closeStatsPopup);
		
	statsBackgroundImage.remove(statsExplorationLabel);
	statsBackgroundImage.remove(statsExplorationValue);
	statsBackgroundImage.remove(statsGamesLabel);
	statsBackgroundImage.remove(statsGamesValue);
	statsBackgroundImage.remove(statsCorrectAnswerLabel);
	statsBackgroundImage.remove(statsCorrectAnswerValue);
	statsBackgroundImage.remove(statsLabelImage);
	statsBackgroundImage.remove(statsCloseImage);
	
	viewProfile.remove(statsBackgroundImage);
	
	//Stats background
	statsBackgroundImage = null;
	//Stats background label
	statsLabelImage = null;
	//Stats correct answers label
	statsCorrectAnswerLabel = null;
	//Stats correct answers value
	statsCorrectAnswerValue = null;
	//Stats number of games label
	statsGamesLabel = null;
	//Stats number of games value
	statsGamesValue = null;
	//Stats exploration label
	statsExplorationLabel = null;
	//Stats explorationvalue
	statsExplorationValue = null;
	//Stats background close button
	statsCloseImage = null;
}

//Creates the UI components and animates the stats popup into view
function showStats(){
	buildStatsPopup();
	
	//Animate the stats background image
	statsBackgroundImage.animate({transform:SCALE_ONE, duration:400});
}

function buildRowsForScore(playerData){
	var data = [];
	var rowImage = '';
	var rowLabel = '';
	var rowScore = '-';
	var rowGames = '';
	
	for(var i=0; i < playerData.length; i++){
		//Ti.API.info('looping in buildRowsForScore()');
		rowScore = playerData[i].score != null ? playerData[i].score : 0;
		rowGames = playerData[i].games != null ? playerData[i].games : 0;
		
		if(playerData[i].category == CAT_EXFORGE){
			rowImage = IMAGE_PATH+'profile/exforge.png';
			rowLabel = 'EXFORGE';
		} else if(playerData[i].category == CAT_EPISTIMI){
			rowImage = IMAGE_PATH+'profile/science.png';
			rowLabel = 'ΕΠΙΣΤΗΜΗ';
		} else if(playerData[i].category == CAT_GEOGRAFIA){
			rowImage = IMAGE_PATH+'profile/geo.png';
			rowLabel = 'ΓΕΩΓΡΑΦΙΑ';
		} else if(playerData[i].category == CAT_ISTORIA){
			rowImage = IMAGE_PATH+'profile/history.png';
			rowLabel = 'ΙΣΤΟΡΙΑ';
		} else if(playerData[i].category == CAT_ATHLITIKA){
			rowImage = IMAGE_PATH+'profile/sports.png';
			rowLabel = 'ΑΘΛΗΤΙΚΑ';
		}
		
		var row = Ti.UI.createTableViewRow({
			height:145, 
			backgroundColor:'transparent',
			selectedBackgroundColor:'transparent',
			className:'scoreDetailsMyProfile'
		});
		
		var categoryImage = Titanium.UI.createImageView({
			image:rowImage,
			left:27,
			clickName:'epistimi'
		});
		
		var categoryLabel = Titanium.UI.createLabel({
			text:rowLabel,
			color:'0b4b7f',
			left:165,
			top:46,
			font:{fontSize:32, fontWeight:'regular', fontFamily:'Myriad Pro'}
		});
		
		var gamesLabelValue = '';
		if(rowGames == 1){
			 gamesLabelValue = rowGames + ' παιχνίδι';
		} else {
			 gamesLabelValue = rowGames + ' παιχνίδια';	
		}
		
		var gamesLabel = Titanium.UI.createLabel({
			text:gamesLabelValue,
			color:'gray',
			left:165,
			top:85,
			font:{fontSize:30, fontWeight:'regular', fontFamily:'Myriad Pro'}
		});
		
		var categoryScore = Titanium.UI.createLabel({
			text:rowScore,
			color:'0b4b7f',
			right:38,
			textAlign:'right',
			top:61,
			font:{fontSize:50, fontWeight:'bold', fontFamily:'Myriad Pro'}
		});
		
		row.add(categoryImage);
		row.add(categoryLabel);
		row.add(categoryScore);
		row.add(gamesLabel);
		data.push(row);
	}
	return data;
}

/*Updates the top part summary for the profile*/
function showInfo(d){
	if(d.name == null || d.name == ''){
		d.name = 'Φτιάξε ένα παίκτη!';
	}
	
	if(d.maxScore == null || d.maxScore == ''){
		d.maxScore = 0;
	}
	nameLabelValue.text = d.name;
	topScoreLabelValue.text = d.maxScore;
	badgesLabelValue.text = d.badges;
	successPercentageValue.text = d.successRate + '%';
}

function displayProfileData(playerData,profileDataInfo){
	tableViewDetails.setData(buildRowsForScore(playerData));	
	showInfo(profileDataInfo);
}

//Updates the stats popup values with the player data
function setStatsPopupPlayerData(d){
	//stats popup
	statsGamesValue.text = d.totalGames;
	statsCorrectAnswerValue.text = d.successRate + '%';
	statsExplorationValue.text = d.explorationRate + '%';
}