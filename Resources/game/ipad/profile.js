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
	
	playerData = e.profileHighScores;
	profileDataInfo = e.profileData;
	displayProfileData(playerData,profileDataInfo);
	
	//number of games label
	gamesLabelValue.text = profileDataInfo.totalGames;
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
var nameLabelValue = null;
var topScoreLabelValue = null;
var badgesLabelValue = null;
var tableViewDetails = null;

var profileTitleBackgroundBar = null;
var profileLogoImage = null;
var profileTitleLabel = null;
var profileMiddleBackgroundBar = null;
var profileLeftSepparator = null;
var profileRightSepparator = null;
var profileGamesLabel = null;
var profileGamesBackground = null;
var gamesLabelValue = null;
var profileBadgesLabel = null;
var profileBadgesBackground = null;
var profileTopScoreLabel = null;
var profileTopScoreBackground = null;

function buildProfileView(){
	var shouldCreateView = profileLogoImage == null;
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
		profileLogoImage = Titanium.UI.createImageView({
			image:IMAGE_PATH+'profile/profile_icon.png',
			top:20,
			right:28
		});
		profileTitleBackgroundBar.add(profileLogoImage);
		
		//Name Label value
		profileTitleLabel = Titanium.UI.createLabel({
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
			active:0,
			font:{fontSize:68, fontWeight:'regular', fontFamily:'Myriad Pro'}
		});
		viewProfile.add(nameLabelValue);
		nameLabelValue.addEventListener('click', handleNameLabelClick);
		
		//middle background bar
		profileMiddleBackgroundBar = Titanium.UI.createView({
			backgroundColor:'5e9fd5',
			height:173,
			top:353
		});
		viewProfile.add(profileMiddleBackgroundBar);
		
		//left sepparator on middle bar
		profileLeftSepparator = Titanium.UI.createView({
			backgroundColor:'white',
			width:2,
			height:89,
			top:55,
			left:255
		});
		profileMiddleBackgroundBar.add(profileLeftSepparator);
		
		//right sepparator on middle bar
		profileRightSepparator = Titanium.UI.createView({
			backgroundColor:'white',
			width:2,
			height:89,
			top:55,
			right:255
		});
		profileMiddleBackgroundBar.add(profileRightSepparator);
		
		//Games label
		profileGamesLabel = Titanium.UI.createLabel({
			text:'ΠΑΙΧΝΙΔΙΑ',
			color:'white',
			textAlign:'left',
			left:55,
			top:25,
			font:{fontSize:30, fontWeight:'semibold', fontFamily:'Myriad Pro'}
		});
		profileMiddleBackgroundBar.add(profileGamesLabel);
		
		//left games background on middle bar
		profileGamesBackground = Titanium.UI.createView({
			backgroundColor:'transparent',
			width:255,
			height:89,
			top:55,
			left:0
		});
		
		//Games played value
		gamesLabelValue = Titanium.UI.createLabel({
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
		profileBadgesLabel = Titanium.UI.createLabel({
			text:'ΠΑΡΑΣΗΜΑ',
			color:'white',
			textAlign:'left',
			right:46,
			top:25,
			font:{fontSize:30, fontWeight:'semibold', fontFamily:'Myriad Pro'}
		});
		profileMiddleBackgroundBar.add(profileBadgesLabel);
		
		//left badges background on middle bar
		profileBadgesBackground = Titanium.UI.createView({
			backgroundColor:'transparent',
			width:255,
			height:89,
			top:55,
			right:0
		});
		profileBadgesBackground.addEventListener('click', goToBadges);
		
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
		profileTopScoreLabel = Titanium.UI.createLabel({
			text:'TOP SCORE',
			color:'white',
			textAlign:'center',
			top:25,
			font:{fontSize:30, fontWeight:'semibold', fontFamily:'Myriad Pro'}
		});
		profileMiddleBackgroundBar.add(profileTopScoreLabel);
		
		//left badges background on middle bar
		profileTopScoreBackground = Titanium.UI.createView({
			backgroundColor:'transparent',
			width:254,
			height:89,
			top:55
		});
		profileTopScoreBackground.addEventListener('click', goToHighScores);
		
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
		
		win.add(viewProfile);
		
	} else {
		Ti.API.warn('NOT building Profile view - already in progress');
	}
}

function destroyProfileView(){
	Ti.API.warn('destroyProfileView() called');
	VIEWING_PROFILE = false;
	
	viewProfile.animate(anim_out);
	
	//Top score label event listener
	profileTopScoreBackground.removeEventListener('click', goToHighScores);
	badgesLabelValue.removeEventListener('click', goToBadges);
	
	profileTitleBackgroundBar.remove(backHomeFromProfileButton);
	profileTitleBackgroundBar.remove(profileLogoImage);
	profileTitleBackgroundBar.remove(profileTitleLabel);
	viewProfile.remove(profileTitleBackgroundBar);
	
	viewProfile.remove(nameLabelValue);
	viewProfile.remove(profileMiddleBackgroundBar);
	
	profileMiddleBackgroundBar.remove(profileLeftSepparator);
	profileMiddleBackgroundBar.remove(profileRightSepparator);
	
	profileMiddleBackgroundBar.remove(profileGamesLabel);
	profileMiddleBackgroundBar.remove(profileGamesBackground);
	profileGamesBackground.remove(gamesLabelValue);
	
	profileMiddleBackgroundBar.remove(profileBadgesLabel);
	profileMiddleBackgroundBar.remove(profileBadgesBackground);
	profileBadgesBackground.remove(badgesLabelValue);
	
	profileMiddleBackgroundBar.remove(profileTopScoreLabel);
	profileMiddleBackgroundBar.remove(profileTopScoreBackground);
	profileTopScoreBackground.remove(topScoreLabelValue);
	
	viewProfile.remove(tableViewDetails);
	
	//scores table
	tableViewDetails = null;
	//Name Label value
	nameLabelValue = null;
	//Top score value
	topScoreLabelValue = null;
	//Badges value
	badgesLabelValue = null;
	
	profileTitleBackgroundBar = null;
	profileLogoImage = null;
	profileTitleLabel = null;
	profileMiddleBackgroundBar = null;
	profileLeftSepparator = null;
	profileRightSepparator = null;
	profileGamesLabel = null;
	profileGamesBackground = null;
	gamesLabelValue = null;
	profileBadgesLabel = null;
	profileBadgesBackground = null;
	profileTopScoreLabel = null;
	profileTopScoreBackground = null;
	
	win.remove(viewProfile);
}

function handleNameLabelClick(e){
	var active = e.source.active;
	
	if(active == 1){
		//load current player and fire an event to update the player UI
		var currentPlayer = getCurrentPlayer();
		
		mtbImport("signin.js");
		buildPlayerLoginView();
		viewSignin.fireEvent('updatePlayerUI', {player:currentPlayer});
		viewSignin.animate(anim_in);
		
		var timeout = setTimeout(function(){
			destroyProfileView();
		}, 1500);
	}
}

//Shows the High Scores screen
function goToHighScores(){
	if(SOUNDS_MODE){
		audioClick.play();	
	}
	var currentCategoryId = CAT_EVERYTHING;
	
    //show loader view
    mtbImport("top_view.js");
    buildTopScoresView(currentCategoryId, false);
    //Load cached scores so the UI has something to display
    viewTopCategory.fireEvent('loadScore', {currentCategoryId:currentCategoryId, loadRemoteData:true});    
    viewTopCategory.animate(anim_in);
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
	viewStars.animate(anim_in);
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
		} else if(playerData[i].category == CAT_LIFESTYLE){
            rowImage = IMAGE_PATH+'profile/lifestyle.png';
            rowLabel = 'LIFESTYLE';
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
		
		var gamesLabel = '';
		if(rowGames == 1){
			 gamesLabel = rowGames + ' παιχνίδι';
		} else {
			 gamesLabel = rowGames + ' παιχνίδια';	
		}
		
		var gamesLabel = Titanium.UI.createLabel({
			text:gamesLabel,
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
		nameLabelValue.active = 1;
	}
	
	if(d.maxScore == null || d.maxScore == ''){
		d.maxScore = 0;
	}
	nameLabelValue.text = d.name;
	topScoreLabelValue.text = d.maxScore;
	badgesLabelValue.text = d.badges;
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