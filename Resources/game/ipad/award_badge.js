//UI components
var badgeAwardBackground = null;
var badgeAwardCloseImage = null;
var badgeAwardHeader = null;
var badgeAwardLabel = null;
var awardedBadge1 = null;
var awardedBadge2 = null;
var awardedBadge3 = null;
var awardedBadge1Stars = null;
var awardedBadge2Stars = null;
var awardedBadge3Stars = null;
var awardedBadge1Label = null;
var awardedBadge2Label = null;
var awardedBadge3Label = null;

var badgeAwardQuestionStats = null;
var badgeAwardScoreLabelValue = null;

function buildAwardBadgePopup(){
	//Badge UI background
	//badgeAwardBackground = Ti.UI.createImageView({
		//image:IPHONE5 ? IMAGE_PATH+'profile/stat_bg-568h@2x.png' : IMAGE_PATH+'profile/stat_bg.png',
		//transform:SCALE_ZERO,
		//zIndex:210
	//});
	
	//Alert view for game over
	badgeAwardBackground = Titanium.UI.createView({
		backgroundImage:IMAGE_PATH+'signin/background.jpg',
		top:0,
		bottom:0,
		left:0,
		right:0,
		zIndex:210
	});
	
	//blue background of the title in badges award
	var badgeAwardTitleBackground = Ti.UI.createView({
		backgroundColor:'0b4b7f',
		height:193,
		top:29
	});
	
	//Badge UI label
	badgeAwardLabel = Ti.UI.createLabel({
		text:'ΜΟΛΙΣ ΚΕΡΔΙΣΕΣ 1 ΠΑΡΑΣΗΜΟ!',
		color:'white',
		textAlign:'center',
		top:33,
		font:{fontSize:35, fontWeight:'bold', fontFamily:'Myriad Pro'}
	});
	badgeAwardTitleBackground.add(badgeAwardLabel);
	
	//badge 1 stars
	awardedBadge1Stars = Ti.UI.createImageView({
		image:IMAGE_PATH+'stars/star_1.png',
		top:85
	});
	badgeAwardTitleBackground.add(awardedBadge1Stars);
	
	//badge 1 title
	awardedBadge1Label = Ti.UI.createLabel({
		text:'ΙΑΤΡΙΚΟ ΦΑΙΝΟΜΕΝΟ',
		color:'white',
		textAlign:'center',
		font:{fontSize:26, fontWeight:'bold', fontFamily:'Myriad Pro'},
		bottom:16
	});
	badgeAwardTitleBackground.add(awardedBadge1Label);

	badgeAwardBackground.add(badgeAwardTitleBackground);
	
	//blue box for the score
	var badgeAwardMiddleBox = Ti.UI.createView({
		backgroundColor:'0b4b7f',
		height:311,
		width:478,
		top:351
	});
	
	//badge award view label points value
	badgeAwardScoreLabelValue = Titanium.UI.createLabel({
		text:'0',
		color:'white',
		bottom:51,
		height:81,
		font:{fontSize:110, fontWeight:'bold', fontFamily:'Myriad Pro'}
	});
	badgeAwardMiddleBox.add(badgeAwardScoreLabelValue);
	
	//badge award question stats (12/23 erwtiseis)
	badgeAwardQuestionStats = Titanium.UI.createLabel({
		text:'',
		color:'white',
		textAlign:'center',
	    bottom:40,
	    height:34,
	    left:4,
	    right:4,
		font:{fontSize:34, fontWeight:'semibold', fontFamily:'Myriad Pro'}
	});
	badgeAwardMiddleBox.add(badgeAwardQuestionStats);
	
	badgeAwardBackground.add(badgeAwardMiddleBox);
	
	var selectedCategId = gameSession.getSelectedGameCategoryId();
	var badgeAwardBannerImage = null;
	var badgeAwardUpperBarColor = null;
		
	if(selectedCategId == 1){
		badgeAwardBannerImage = IMAGE_PATH+'game_over/icon_exforge.png';
		badgeAwardUpperBarColor = 'fb494a'; 
	}else if(selectedCategId == 2){
		badgeAwardBannerImage = IMAGE_PATH+'game_over/icon_science.png';
		badgeAwardUpperBarColor = '6fb042'; 
	}else if(selectedCategId == 3){
		badgeAwardBannerImage = IMAGE_PATH+'game_over/icon_geo.png';
		badgeAwardUpperBarColor = '569bd4'; 
	}else if(selectedCategId == 4){
		badgeAwardBannerImage = IMAGE_PATH+'game_over/icon_history.png';
		badgeAwardUpperBarColor = 'fb9a01'; 
	}else if(selectedCategId == 5){
		badgeAwardBannerImage = IMAGE_PATH+'game_over/icon_sports.png';
		badgeAwardUpperBarColor = '9b52e7'; 
	}
	
	//badge award bar which changes according to category played
	var badgeAwardUpperBar = Ti.UI.createView({
		backgroundColor:badgeAwardUpperBarColor,
		height:29,
		top:0
	});
	badgeAwardBackground.add(badgeAwardUpperBar);
	
	//badge award category banner
	var badgeAwardCategoryBanner = Ti.UI.createImageView({
		image:badgeAwardBannerImage,
		top:268,
		zIndex:2
	});
	badgeAwardBackground.add(badgeAwardCategoryBanner);
	
	//bottom background for the buttons
	var badgeAwardBottomBackground = Ti.UI.createView({
		backgroundColor:'0b4b7f',
		height:257,
		bottom:0
	});
	
	//Game over play again button
	var badgeAwardPlayImage = Ti.UI.createButton({
		backgroundImage:IMAGE_PATH+'game_over/button_playagain.png',
		top:45,
		width:205,
		height:185,
		left:83,
		bottom:36
	});
	badgeAwardBottomBackground.add(badgeAwardPlayImage);
	badgeAwardPlayImage.addEventListener('click', handleAwardBadgePlayAgainClick);
	
	//Game over rankings button
	var badgeAwardArrowImage = Ti.UI.createButton({
		backgroundImage:IMAGE_PATH+'game_over/button_rankings.png',
		top:45,
		width:205,
		height:185,
		right:83,
		bottom:36
	});
	badgeAwardBottomBackground.add(badgeAwardArrowImage);
	badgeAwardArrowImage.addEventListener('click', handleAwardBadgeShowScoresClick);
	
	badgeAwardBackground.add(badgeAwardBottomBackground);
	
	//Award badge background close button
	/*badgeAwardCloseImage = Ti.UI.createImageView({
		image:IMAGE_PATH+'top/invite_x.png',
		top:IPHONE5 ? 45 : 135,
		right:115
	});
	
	//Badge yeah image
	badgeAwardHeader = Ti.UI.createImageView({
		top:IPHONE5 ? 123 : 220,
		image:IMAGE_PATH+'various/yeah_epistimi.png'
	});
	
	//badge 1
	awardedBadge1 = Ti.UI.createImageView({
		image:IMAGE_PATH+'stars/badges/n/badge1.png',
		top:IPHONE5 ? 293 : 500
	});

	//badge 2
	awardedBadge2 = Ti.UI.createImageView({
		image:IMAGE_PATH+'stars/badges/n/badge1.png',
		top:IPHONE5 ? 293 : 500,
		visible:false,
		left:180
	});
	
	//badge 3 (for dual badges)
	awardedBadge3 = Ti.UI.createImageView({
		image:IMAGE_PATH+'stars/badges/n/badge1.png',
		top:IPHONE5 ? 293 : 500,
		right:180,
		visible:false
	});*/
	
	//badge 2 stars
	awardedBadge2Stars = Ti.UI.createImageView({
		image:IMAGE_PATH+'stars/star_1.png',
		top:85,
		left:200,
		visible:false
	});
	//badgeAwardTitleBackground.add(awardedBadge2Stars);
	
	//badge 3 stars
	awardedBadge3Stars = Ti.UI.createImageView({
		image:IMAGE_PATH+'stars/star_1.png',
		top:85,
		right:203,
		visible:false
	});
	//badgeAwardTitleBackground.add(awardedBadge3Stars);

	//badge 2 title
	awardedBadge2Label = Ti.UI.createLabel({
		text:'Πορωμένος Μουσικός',
		color:'white',
		textAlign:'center',
		width:180,
		font:{fontSize:25, fontWeight:'bold', fontFamily:'Myriad Pro'},
		top:IPHONE5 ? 383 : 705,
		left:180,
		visible:false
	});
	
	//badge 3 title
	awardedBadge3Label = Ti.UI.createLabel({
		text:'Πορωμένος Μουσικός',
		color:'white',
		textAlign:'center',
		width:180,
		font:{fontSize:25, fontWeight:'bold', fontFamily:'Myriad Pro'},
		top:IPHONE5 ? 383 : 705,
		right:180,
		visible:false
	});
	
	//badgeAwardBackground.add(badgeAwardCloseImage);
	//badgeAwardBackground.add(awardedBadge1);
	//badgeAwardBackground.add(awardedBadge1Stars);
	//badgeAwardBackground.add(awardedBadge1Label);
	
	//badgeAwardCloseImage.addEventListener('click', handleCloseBadgeAwardPopup);
		
	//badgeAwardBackground.add(awardedBadge2);
	//badgeAwardBackground.add(awardedBadge2Stars);
	//badgeAwardBackground.add(awardedBadge2Label);
	
	//badgeAwardBackground.add(awardedBadge3);
	//badgeAwardBackground.add(awardedBadge3Stars);
	//badgeAwardBackground.add(awardedBadge3Label);
	
	//badgeAwardBackground.add(badgeAwardLabel);
	//badgeAwardBackground.add(badgeAwardHeader);
	alertViewGameOver.add(badgeAwardBackground);
}

function destroyAwardBadgePopup(){
	Ti.API.warn('destroyAwardBadgePopup() called');
	
	//Remove event listener
	//badgeAwardCloseImage.removeEventListener('click', handleCloseBadgeAwardPopup);
	
	//badgeAwardBackground.remove(badgeAwardCloseImage);
	//badgeAwardBackground.remove(awardedBadge1);
	badgeAwardBackground.remove(awardedBadge1Stars);
	badgeAwardBackground.remove(awardedBadge1Label);
	
	//badgeAwardBackground.remove(awardedBadge2);
	badgeAwardBackground.remove(awardedBadge2Stars);
	badgeAwardBackground.remove(awardedBadge2Label);
	
	//badgeAwardBackground.remove(awardedBadge3);
	badgeAwardBackground.remove(awardedBadge3Stars);
	badgeAwardBackground.remove(awardedBadge3Label);
	
	badgeAwardBackground.remove(badgeAwardLabel);
	//badgeAwardBackground.remove(badgeAwardHeader);
	alertViewGameOver.remove(badgeAwardBackground);
	
	//Badge UI background
	badgeAwardBackground = null;
	
	//Award badge background close button
	badgeAwardCloseImage = null;
	
	//Badge yeah image
	badgeAwardHeader = null;
	
	//Badge UI label
	badgeAwardLabel = null;

	//badge 1
	awardedBadge1 = null;

	//badge 2
	awardedBadge2 = null;
	
	//badge 3 (for dual badges)
	awardedBadge3 = null;

	//badge 1 stars
	awardedBadge1Stars = null;

	//badge 2 stars
	awardedBadge2Stars = null;
	
	//badge 3 stars
	awardedBadge3Stars = null;

	//badge 1 title
	awardedBadge1Label = null;

	//badge 2 title
	awardedBadge2Label = null;
	
	//badge 3 title
	awardedBadge3Label = null;
}

//Event handler for badge award popup close
function handleCloseBadgeAwardPopup(){
	badgeAwardBackground.transform = SCALE_ZERO;
	
}

//Event handler for game over play again button
function handleAwardBadgePlayAgainClick(){
	if(SOUNDS_MODE){
		audioClick.play();	
	}
	
	mtbImport("categories.js");
	buildCategoriesView();
	viewCategories.animate({opacity:1, duration:200}, function(){
		
		viewLoader.opacity=0;
		viewQuestion.opacity=0;
		alertViewGameOver.hide();
		
		destroyQuestionView();
		destroyAwardBadgePopup();
		gameSession.setRestartWithNewCategory(true);
		
		if(MUSIC_MODE){
			audio.play();
		}
		
	});
}

//Event handler for game over show scores click
function handleAwardBadgeShowScoresClick(){
	if(SOUNDS_MODE){
		audioClick.play();	
	}
	
	//fire event for score loading
	mtbImport("top_view.js");
	viewTopCategory.fireEvent('loadScore', {currentCategoryId:gameSession.getSelectedGameCategoryId()});
	buildTopScoresView(gameSession.getSelectedGameCategoryId(), gameSession.getGameType(), true);
	//show high score
	viewTopCategory.animate({opacity:1,duration:400}, function(){
	
		Ti.API.info('Show high scores - ANIM COMPLETE');
		//hide previous views
		view.opacity = 0;
		viewQuestion.opacity = 0;
		viewLoader.opacity = 0;
		
		if(LOADED_PLAYER2_JS){
			viewPlayer.opacity = 0;
		}

		//close game over screen
		alertViewGameOver.hide();
		
		destroyQuestionView();
		destroyAwardBadgePopup();
	});
}

/*Awards badges and shows the notification UI*/
function awardBadgesNotification(playerId, currentCategoryId, currentScore, stats){
	var totalBadges = 0;
	var createdUI = false;
	
	if(!createdUI){
		buildAwardBadgePopup();
		badgeAwardScoreLabelValue.text = currentScore;
		badgeAwardQuestionStats.text = stats;
		Ti.API.info('score is: ' + currentScore + ' and stats is : ' + badgeAwardQuestionStats);
		createdUI = true;
	}
	
	var awaredCategoryBadge = awardBadges(playerId, currentCategoryId, currentScore);
	if(awaredCategoryBadge != null){
		totalBadges++;
		
		if(awaredCategoryBadge.megaBadgeAwarded){
			totalBadges++;
		}
		
		var categoryBadge = awaredCategoryBadge.category;
		var categoryBadgeLevel = awaredCategoryBadge.level;
		
		//Single badge, set up badge icon
		if(categoryBadge == CAT_EXFORGE){
			//awardedBadge1.image = IMAGE_PATH+'stars/badges/n/badge1.png';
			awardedBadge1Label.text = BADGE1_LABEL;
			
			awardedBadge2.image = IMAGE_PATH+'stars/badges/n/badge1.png';
			awardedBadge2Label.text = BADGE1_LABEL;
		} else if(categoryBadge == CAT_EPISTIMI){
			//awardedBadge1.image = IMAGE_PATH+'stars/badges/n/badge2.png';
			awardedBadge1Label.text = BADGE2_LABEL;
			
			awardedBadge2.image = IMAGE_PATH+'stars/badges/n/badge2.png';
			awardedBadge2Label.text = BADGE2_LABEL;
		} else if(categoryBadge == CAT_GEOGRAFIA){
			//awardedBadge1.image = IMAGE_PATH+'stars/badges/n/badge3.png';
			awardedBadge1Label.text = BADGE3_LABEL;
			
			awardedBadge2.image = IMAGE_PATH+'stars/badges/n/badge3.png';
			awardedBadge2Label.text = BADGE3_LABEL;
		} else if(categoryBadge == CAT_ISTORIA){
			//awardedBadge1.image = IMAGE_PATH+'stars/badges/n/badge4.png';
			awardedBadge1Label.text = BADGE4_LABEL;
			
			awardedBadge2.image = IMAGE_PATH+'stars/badges/n/badge4.png';
			awardedBadge2Label.text = BADGE4_LABEL;
		} else if(categoryBadge == CAT_ATHLITIKA){
			//awardedBadge1.image = IMAGE_PATH+'stars/badges/n/badge5.png';
			awardedBadge1Label.text = BADGE5_LABEL;
			
			awardedBadge2.image = IMAGE_PATH+'stars/badges/n/badge5.png';
			awardedBadge2Label.text = BADGE5_LABEL;
		}
		
		//Single badge, set up stars
		if(categoryBadgeLevel == 1){
			awardedBadge1Stars.image = IMAGE_PATH+'stars/1stars.png';
			awardedBadge2Stars.image = IMAGE_PATH+'stars/1stars.png';
		} else if(categoryBadgeLevel == 2){
			awardedBadge1Stars.image = IMAGE_PATH+'stars/2stars.png';
			awardedBadge2Stars.image = IMAGE_PATH+'stars/2stars.png';
		} else if(categoryBadgeLevel == 3){
			awardedBadge1Stars.image = IMAGE_PATH+'stars/3stars.png';
			awardedBadge2Stars.image = IMAGE_PATH+'stars/3stars.png';
		}
		
	}
	
	var awardedSpeedBadge = awardSpeedBadge(playerId);
	if(awardedSpeedBadge != null){
		totalBadges++;
		
		if(!createdUI){
			buildAwardBadgePopup();
			createdUI = true;
		}
		
		//Set the speed badge icon according to the number of badges won
		var targetBadgeIconForSpeedBadge = '';
		//var targetStarIconForSpeedBadge = '';
		var targetBadgeLabelForSpeedBadge = '';
		
		if(totalBadges == 1){
			//targetBadgeIconForSpeedBadge = awardedBadge1;
			targetStarIconForSpeedBadge = awardedBadge1Stars;
			targetBadgeLabelForSpeedBadge = awardedBadge1Label;
		} else if(totalBadges == 2){
			//targetBadgeIconForSpeedBadge = awardedBadge3;
			targetStarIconForSpeedBadge = awardedBadge3Stars;
			targetBadgeLabelForSpeedBadge = awardedBadge3Label;
		}
		
		if(awardedSpeedBadge == 1){
			targetStarIconForSpeedBadge.image = IMAGE_PATH+'stars/1stars.png';
		} else if(awardedSpeedBadge == 2){
			targetStarIconForSpeedBadge.image = IMAGE_PATH+'stars/2stars.png';
		} else if(awardedSpeedBadge == 3){
			targetStarIconForSpeedBadge.image = IMAGE_PATH+'stars/3stars.png';
		}
		//targetBadgeIconForSpeedBadge.image = IMAGE_PATH+'stars/badges/n/badge11.png';
		targetBadgeLabelForSpeedBadge.text = BADGE11_LABEL;
	}
	
	if(totalBadges == 1){
		badgeAwardLabel.text = 'ΚΕΡΔΙΣΕΣ 1 ΠΑΡΑΣΗΜΟ!';
		
		//awardedBadge1.show();
		awardedBadge1Stars.show();
		awardedBadge1Label.show();
		
		//awardedBadge2.hide();
		awardedBadge2Stars.hide();
		awardedBadge2Label.hide();

		//awardedBadge3.hide();
		awardedBadge3Stars.hide();
		awardedBadge3Label.hide();
	} else if(totalBadges == 2){
		badgeAwardLabel.text = 'ΚΕΡΔΙΣΕΣ 2 ΠΑΡΑΣΗΜΑ!';
		
		//awardedBadge1.hide();
		awardedBadge1Stars.hide();
		awardedBadge1Label.hide();
		
		//awardedBadge2.show();
		awardedBadge2Stars.show();
		awardedBadge2Label.show();

		//awardedBadge3.show();
		awardedBadge3Stars.show();
		awardedBadge3Label.show();
	}
	
	//Animate the badge background image
	if(totalBadges > 0){
		Ti.API.warn('totalBadges = '+totalBadges);
		
		//Set up notification UI
		/*if(currentCategoryId == CAT_EXFORGE){
			badgeAwardHeader.image = IMAGE_PATH+'various/yeah_epistimi.png';
		} else if(currentCategoryId == CAT_EPISTIMI){
			badgeAwardHeader.image = IMAGE_PATH+'various/yeah_kinimatografos.png';
		} else if(currentCategoryId == CAT_GEOGRAFIA){
			badgeAwardHeader.image = IMAGE_PATH+'various/yeah_geografia.png';
		} else if(currentCategoryId == CAT_ISTORIA){
			badgeAwardHeader.image = IMAGE_PATH+'various/yeah_athlitika.png';
		} else if(currentCategoryId == CAT_ATHLITIKA){
			badgeAwardHeader.image = IMAGE_PATH+'various/yeah_texnologia.png';
		}*/
		
		var a = Ti.UI.createAnimation();
		a.transform = SCALE_ONE;
		a.duration = 300;
		badgeAwardBackground.animate(a);
	} else {
		if(createdUI){
			destroyAwardBadgePopup();
		}
	}
}

/*Awards the appropriate badge, if goal achieved*/
function awardBadges(playerId, currentCategoryId, currentScore){
	Ti.API.info('Question: awardBadges called for player id '+playerId+' currentCategoryId='+currentCategoryId+' currentScore='+currentScore);
	var achievedLevel = 0;
	var badgeAwared = false;
	
	if(currentCategoryId == CAT_EXFORGE){
		if(currentScore >= BADGE1_LEVEL3) achievedLevel = 3;
		else if(currentScore >= BADGE1_LEVEL2 && currentScore < BADGE1_LEVEL3) achievedLevel = 2;
		else if(currentScore >= BADGE1_LEVEL1 && currentScore < BADGE1_LEVEL2) achievedLevel = 1;
		
		Ti.API.info('1	Question: Achieved level '+achievedLevel+' and badge1 level is '+userLevelBadge1);
		
		if(userLevelBadge1 < achievedLevel){
			badgeAwared = true;
			saveBadge(playerId, achievedLevel, CAT_EPISTIMI);
		}  
	} else if(currentCategoryId == CAT_EPISTIMI){
		if(currentScore >= BADGE2_LEVEL3) achievedLevel = 3;
		else if(currentScore >= BADGE2_LEVEL2 && currentScore < BADGE2_LEVEL3) achievedLevel = 2;
		else if(currentScore >= BADGE2_LEVEL1 && currentScore < BADGE2_LEVEL2) achievedLevel = 1;
		
		Ti.API.info('2	Question: Achieved level '+achievedLevel+' and badge2 level is '+userLevelBadge2);
		
		if(userLevelBadge2 < achievedLevel){
			badgeAwared = true;
			saveBadge(playerId, achievedLevel, CAT_KINIMATOGRAFOS);
		}  
	} else if(currentCategoryId == CAT_GEOGRAFIA){
		if(currentScore >= BADGE3_LEVEL3) achievedLevel = 3;
		else if(currentScore >= BADGE3_LEVEL2 && currentScore < BADGE3_LEVEL3) achievedLevel = 2;
		else if(currentScore >= BADGE3_LEVEL1 && currentScore < BADGE3_LEVEL2) achievedLevel = 1;
		
		Ti.API.info('3	Question: Achieved level '+achievedLevel+' and badge3 level is '+userLevelBadge3);
		
		if(userLevelBadge3 < achievedLevel){
			badgeAwared = true;
			saveBadge(playerId, achievedLevel, CAT_GEOGRAFIA);
		}  
	} else if(currentCategoryId == CAT_ISTORIA){
		if(currentScore >= BADGE4_LEVEL3) achievedLevel = 3;
		else if(currentScore >= BADGE4_LEVEL2 && currentScore < BADGE4_LEVEL3) achievedLevel = 2;
		else if(currentScore >= BADGE4_LEVEL1 && currentScore < BADGE4_LEVEL2) achievedLevel = 1;
		
		Ti.API.info('4	Question: Achieved level '+achievedLevel+' and badge4 level is '+userLevelBadge4);
		
		if(userLevelBadge4 < achievedLevel){
			badgeAwared = true;
			saveBadge(playerId, achievedLevel, CAT_ATHLITIKA);
		}  
	} else if(currentCategoryId == CAT_ATHLITIKA){
		if(currentScore >= BADGE5_LEVEL3) achievedLevel = 3;
		else if(currentScore >= BADGE5_LEVEL2 && currentScore < BADGE5_LEVEL3) achievedLevel = 2;
		else if(currentScore >= BADGE5_LEVEL1 && currentScore < BADGE5_LEVEL2) achievedLevel = 1;
		
		Ti.API.info('5	Question: Achieved level '+achievedLevel+' and badge5 level is '+userLevelBadge5);
		
		if(userLevelBadge5 < achievedLevel){
			badgeAwared = true;
			saveBadge(playerId, achievedLevel, CAT_TEXNOLOGIA);
		}  
	}
	
	//Check if mega buzz is achieved
	var megaBadgeAwarded = false;
	
	Ti.API.warn('about to check for mega badge - badgeAwared='+badgeAwared);
	
	var megaBadgeLevelAchieved = 0;
	if(badgeAwared){
		megaBadgeLevelAchieved = 0;
		
		var numberOfBadges = getPlayerBadgeCount(playerId);
		if(numberOfBadges >= BADGE12_LEVEL3) megaBadgeLevelAchieved = 3;
		else if(numberOfBadges >= BADGE12_LEVEL2 && numberOfBadges < BADGE12_LEVEL3) megaBadgeLevelAchieved = 2;
		else if(numberOfBadges >= BADGE12_LEVEL1 && numberOfBadges < BADGE12_LEVEL2) megaBadgeLevelAchieved = 1;
		
		Ti.API.info('Question: Achieved level '+megaBadgeLevelAchieved+' and badge12 level is '+userLevelBadge12);
		
		if(userLevelBadge12 < megaBadgeLevelAchieved){
			
			awardedBadge3.image = IMAGE_PATH+'stars/badges/n/badge12.png';
			awardedBadge3Label.text = BADGE12_LABEL;
			awardedBadge3Stars.image = IMAGE_PATH+'stars/star_'+megaBadgeLevelAchieved+'.png'; 
			
			megaBadgeAwarded = true;
			saveBadge(playerId, megaBadgeLevelAchieved, CAT_ALL);
		}
	}
	
	var awardedBudgesInfo = {
		category:currentCategoryId,
		level:achievedLevel,
		megaBadgeAwarded:megaBadgeAwarded,
		megaBadgeLevelAchieved:megaBadgeLevelAchieved
	};
	
	//Only return if we get a badge
	if(badgeAwared){
		return awardedBudgesInfo;
	} else {
		return null;
	}
}

/*Awards the speed badge, if goal achieved*/
function awardSpeedBadge(playerId){
	getBadgeData(playerId);
	var count = getNumberOfFastAnswers(playerId);
	var achievedLevel = 0;
	var badgeAwared = false;
	
	if(count >= BADGE11_LEVEL3) achievedLevel = 3;
	else if(count >= BADGE11_LEVEL2 && count < BADGE11_LEVEL3) achievedLevel = 2;
	else if(count >= BADGE11_LEVEL1 && count < BADGE11_LEVEL2) achievedLevel = 1;
	
	Ti.API.warn('user level badge for speed is '+userLevelBadge11);
	if(userLevelBadge11 < achievedLevel){
		badgeAwared = true;
		saveBadge(playerId, achievedLevel, CAT_SPEED);
	}
	
	Ti.API.info('awardSpeedBadge found level '+achievedLevel+' with count '+count+' for player '+playerId);
	if(badgeAwared){ 
		return achievedLevel;
	} else {
		return null;
	}
}