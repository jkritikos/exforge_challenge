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

function buildAwardBadgePopup(){
	//Badge UI background
	badgeAwardBackground = Ti.UI.createImageView({
		image:IPHONE5 ? IMAGE_PATH+'profile/stat_bg-568h@2x.png' : IMAGE_PATH+'profile/stat_bg.png',
		transform:SCALE_ZERO,
		zIndex:210
	});
	
	//Award badge background close button
	badgeAwardCloseImage = Ti.UI.createImageView({
		image:IMAGE_PATH+'top/invite_x.png',
		top:IPHONE5 ? 90 : 57,
		right:15
	});
	
	//Badge yeah image
	badgeAwardHeader = Ti.UI.createImageView({
		top:IPHONE5 ? 123 : 90,
		image:IMAGE_PATH+'various/yeah_epistimi.png'
	});
	
	//Badge UI label
	badgeAwardLabel = Ti.UI.createLabel({
		text:'ΚΕΡΔΙΣΕΣ\n 1 ΠΑΡΑΣΗΜΟ!',
		color:'white',
		textAlign:'center',
		width:140,
		top:IPHONE5 ? 203 : 170,
		font:{fontSize:answerFontSize, fontWeight:'bold', fontFamily:'Myriad Pro'}
	});

	//badge 1
	awardedBadge1 = Ti.UI.createImageView({
		image:IMAGE_PATH+'stars/badges/n/badge1.png',
		top:IPHONE5 ? 293 : 260
	});

	//badge 2
	awardedBadge2 = Ti.UI.createImageView({
		image:IMAGE_PATH+'stars/badges/n/badge1.png',
		top:IPHONE5 ? 293 : 260,
		left:70,
		visible:false
	});
	
	//badge 3 (for dual badges)
	awardedBadge3 = Ti.UI.createImageView({
		image:IMAGE_PATH+'stars/badges/n/badge1.png',
		top:IPHONE5 ? 293 : 260,
		right:70,
		visible:false
	});

	//badge 1 stars
	awardedBadge1Stars = Ti.UI.createImageView({
		image:IMAGE_PATH+'stars/star_1.png',
		top:IPHONE5 ? 268 : 235
	});

	//badge 2 stars
	awardedBadge2Stars = Ti.UI.createImageView({
		image:IMAGE_PATH+'stars/star_1.png',
		top:IPHONE5 ? 268 : 235,
		left:80,
		visible:false
	});
	
	//badge 3 stars
	awardedBadge3Stars = Ti.UI.createImageView({
		image:IMAGE_PATH+'stars/star_1.png',
		top:IPHONE5 ? 268 : 235,
		right:80,
		visible:false
	});

	//badge 1 title
	awardedBadge1Label = Ti.UI.createLabel({
		text:'b1 Πορωμένος Μουσικός',
		color:'white',
		textAlign:'center',
		width:80,
		font:{fontSize:13, fontWeight:'bold', fontFamily:'Myriad Pro'},
		top:IPHONE5 ? 383 : 350
	});

	//badge 2 title
	awardedBadge2Label = Ti.UI.createLabel({
		text:'b2 Πορωμένος Μουσικός',
		color:'white',
		textAlign:'center',
		width:80,
		font:{fontSize:13, fontWeight:'bold', fontFamily:'Myriad Pro'},
		top:IPHONE5 ? 383 : 350,
		left:70,
		visible:false
	});
	
	//badge 3 title
	awardedBadge3Label = Ti.UI.createLabel({
		text:'b3 Πορωμένος Μουσικός',
		color:'white',
		textAlign:'center',
		width:80,
		font:{fontSize:13, fontWeight:'bold', fontFamily:'Myriad Pro'},
		top:IPHONE5 ? 383 : 350,
		right:70,
		visible:false
	});
	
	badgeAwardBackground.add(badgeAwardCloseImage);
	badgeAwardBackground.add(awardedBadge1);
	badgeAwardBackground.add(awardedBadge1Stars);
	badgeAwardBackground.add(awardedBadge1Label);
	
	badgeAwardCloseImage.addEventListener('click', handleCloseBadgeAwardPopup);
		
	badgeAwardBackground.add(awardedBadge2);
	badgeAwardBackground.add(awardedBadge2Stars);
	badgeAwardBackground.add(awardedBadge2Label);
	
	badgeAwardBackground.add(awardedBadge3);
	badgeAwardBackground.add(awardedBadge3Stars);
	badgeAwardBackground.add(awardedBadge3Label);
	
	badgeAwardBackground.add(badgeAwardLabel);
	badgeAwardBackground.add(badgeAwardHeader);
	alertViewGameOver.add(badgeAwardBackground);
}

function destroyAwardBadgePopup(){
	Ti.API.warn('destroyAwardBadgePopup() called');
	
	//Remove event listener
	badgeAwardCloseImage.removeEventListener('click', handleCloseBadgeAwardPopup);
	
	badgeAwardBackground.remove(badgeAwardCloseImage);
	badgeAwardBackground.remove(awardedBadge1);
	badgeAwardBackground.remove(awardedBadge1Stars);
	badgeAwardBackground.remove(awardedBadge1Label);
	
	badgeAwardBackground.remove(awardedBadge2);
	badgeAwardBackground.remove(awardedBadge2Stars);
	badgeAwardBackground.remove(awardedBadge2Label);
	
	badgeAwardBackground.remove(awardedBadge3);
	badgeAwardBackground.remove(awardedBadge3Stars);
	badgeAwardBackground.remove(awardedBadge3Label);
	
	badgeAwardBackground.remove(badgeAwardLabel);
	badgeAwardBackground.remove(badgeAwardHeader);
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
	destroyAwardBadgePopup();
}

/*Awards badges and shows the notification UI*/
function awardBadgesNotification(playerId, currentCategoryId, currentScore){
	var totalBadges = 0;
	var createdUI = false;
	
	if(!createdUI){
		buildAwardBadgePopup();
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
		if(categoryBadge == CAT_EPISTIMI){
			awardedBadge1.image = IMAGE_PATH+'stars/badges/n/badge1.png';
			awardedBadge1Label.text = BADGE1_LABEL;
			
			awardedBadge2.image = IMAGE_PATH+'stars/badges/n/badge1.png';
			awardedBadge2Label.text = BADGE1_LABEL;
		} else if(categoryBadge == CAT_KINIMATOGRAFOS){
			awardedBadge1.image = IMAGE_PATH+'stars/badges/n/badge2.png';
			awardedBadge1Label.text = BADGE2_LABEL;
			
			awardedBadge2.image = IMAGE_PATH+'stars/badges/n/badge2.png';
			awardedBadge2Label.text = BADGE2_LABEL;
		} else if(categoryBadge == CAT_GEOGRAFIA){
			awardedBadge1.image = IMAGE_PATH+'stars/badges/n/badge3.png';
			awardedBadge1Label.text = BADGE3_LABEL;
			
			awardedBadge2.image = IMAGE_PATH+'stars/badges/n/badge3.png';
			awardedBadge2Label.text = BADGE3_LABEL;
		} else if(categoryBadge == CAT_ATHLITIKA){
			awardedBadge1.image = IMAGE_PATH+'stars/badges/n/badge4.png';
			awardedBadge1Label.text = BADGE4_LABEL;
			
			awardedBadge2.image = IMAGE_PATH+'stars/badges/n/badge4.png';
			awardedBadge2Label.text = BADGE4_LABEL;
		} else if(categoryBadge == CAT_TEXNOLOGIA){
			awardedBadge1.image = IMAGE_PATH+'stars/badges/n/badge5.png';
			awardedBadge1Label.text = BADGE5_LABEL;
			
			awardedBadge2.image = IMAGE_PATH+'stars/badges/n/badge5.png';
			awardedBadge2Label.text = BADGE5_LABEL;
		} else if(categoryBadge == CAT_ISTORIA){
			awardedBadge1.image = IMAGE_PATH+'stars/badges/n/badge6.png';
			awardedBadge1Label.text = BADGE6_LABEL;
			
			awardedBadge2.image = IMAGE_PATH+'stars/badges/n/badge6.png';
			awardedBadge2Label.text = BADGE6_LABEL;
		} else if(categoryBadge == CAT_MOUSIKH){
			awardedBadge1.image = IMAGE_PATH+'stars/badges/n/badge7.png';
			awardedBadge1Label.text = BADGE7_LABEL;
			
			awardedBadge2.image = IMAGE_PATH+'stars/badges/n/badge7.png';
			awardedBadge2Label.text = BADGE7_LABEL;
		} else if(categoryBadge == CAT_TEXNES){
			awardedBadge1.image = IMAGE_PATH+'stars/badges/n/badge8.png';
			awardedBadge1Label.text = BADGE8_LABEL;
			
			awardedBadge2.image = IMAGE_PATH+'stars/badges/n/badge8.png';
			awardedBadge2Label.text = BADGE8_LABEL;
		} else if(categoryBadge == CAT_ZWAFUTA){
			awardedBadge1.image = IMAGE_PATH+'stars/badges/n/badge9.png';
			awardedBadge1Label.text = BADGE9_LABEL;
			
			awardedBadge2.image = IMAGE_PATH+'stars/badges/n/badge9.png';
			awardedBadge2Label.text = BADGE9_LABEL;
		} else if(categoryBadge == CAT_LIFESTYLE){
			awardedBadge1.image = IMAGE_PATH+'stars/badges/n/badge10.png';
			awardedBadge1Label.text = BADGE10_LABEL;
			
			awardedBadge2.image = IMAGE_PATH+'stars/badges/n/badge10.png';
			awardedBadge2Label.text = BADGE10_LABEL;
		} else if(categoryBadge == CAT_TOTALBUZZ){
			awardedBadge1.image = IMAGE_PATH+'stars/badges/n/badge13.png';
			awardedBadge1Label.text = BADGE13_LABEL;
			
			awardedBadge2.image = IMAGE_PATH+'stars/badges/n/badge13.png';
			awardedBadge2Label.text = BADGE13_LABEL;
		}
		
		
		
		//Single badge, set up stars
		if(categoryBadgeLevel == 1){
			awardedBadge1Stars.image = IMAGE_PATH+'stars/star_1.png';
			awardedBadge2Stars.image = IMAGE_PATH+'stars/star_1.png';
		} else if(categoryBadgeLevel == 2){
			awardedBadge1Stars.image = IMAGE_PATH+'stars/star_2.png';
			awardedBadge2Stars.image = IMAGE_PATH+'stars/star_2.png';
		} else if(categoryBadgeLevel == 3){
			awardedBadge1Stars.image = IMAGE_PATH+'stars/star_3.png';
			awardedBadge2Stars.image = IMAGE_PATH+'stars/star_3.png';
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
		var targetStarIconForSpeedBadge = '';
		var targetBadgeLabelForSpeedBadge = '';
		
		if(totalBadges == 1){
			targetBadgeIconForSpeedBadge = awardedBadge1;
			targetStarIconForSpeedBadge = awardedBadge1Stars;
			targetBadgeLabelForSpeedBadge = awardedBadge1Label;
		} else if(totalBadges == 2){
			targetBadgeIconForSpeedBadge = awardedBadge3;
			targetStarIconForSpeedBadge = awardedBadge3Stars;
			targetBadgeLabelForSpeedBadge = awardedBadge3Label;
		}
		
		if(awardedSpeedBadge == 1){
			targetStarIconForSpeedBadge.image = IMAGE_PATH+'stars/star_1.png';
		} else if(awardedSpeedBadge == 2){
			targetStarIconForSpeedBadge.image = IMAGE_PATH+'stars/star_2.png';
		} else if(awardedSpeedBadge == 3){
			targetStarIconForSpeedBadge.image = IMAGE_PATH+'stars/star_3.png';
		}
		targetBadgeIconForSpeedBadge.image = IMAGE_PATH+'stars/badges/n/badge11.png';
		targetBadgeLabelForSpeedBadge.text = BADGE11_LABEL;
	}
	
	if(totalBadges == 1){
		badgeAwardLabel.text = 'ΚΕΡΔΙΣΕΣ 1 ΠΑΡΑΣΗΜΟ!';
		
		awardedBadge1.show();
		awardedBadge1Stars.show();
		awardedBadge1Label.show();
		
		awardedBadge2.hide();
		awardedBadge2Stars.hide();
		awardedBadge2Label.hide();

		awardedBadge3.hide();
		awardedBadge3Stars.hide();
		awardedBadge3Label.hide();
	} else if(totalBadges == 2){
		badgeAwardLabel.text = 'ΚΕΡΔΙΣΕΣ 2 ΠΑΡΑΣΗΜΑ!';
		
		awardedBadge1.hide();
		awardedBadge1Stars.hide();
		awardedBadge1Label.hide();
		
		awardedBadge2.show();
		awardedBadge2Stars.show();
		awardedBadge2Label.show();

		awardedBadge3.show();
		awardedBadge3Stars.show();
		awardedBadge3Label.show();
	}
	
	//Animate the badge background image
	if(totalBadges > 0){
		Ti.API.warn('totalBadges = '+totalBadges);
		
		//Set up notification UI
		if(currentCategoryId == CAT_EPISTIMI){
			badgeAwardHeader.image = IMAGE_PATH+'various/yeah_epistimi.png';
		} else if(currentCategoryId == CAT_KINIMATOGRAFOS){
			badgeAwardHeader.image = IMAGE_PATH+'various/yeah_kinimatografos.png';
		} else if(currentCategoryId == CAT_GEOGRAFIA){
			badgeAwardHeader.image = IMAGE_PATH+'various/yeah_geografia.png';
		} else if(currentCategoryId == CAT_ATHLITIKA){
			badgeAwardHeader.image = IMAGE_PATH+'various/yeah_athlitika.png';
		} else if(currentCategoryId == CAT_TEXNOLOGIA){
			badgeAwardHeader.image = IMAGE_PATH+'various/yeah_texnologia.png';
		} else if(currentCategoryId == CAT_ISTORIA){
			badgeAwardHeader.image = IMAGE_PATH+'various/yeah_istoria.png';
		} else if(currentCategoryId == CAT_MOUSIKH){
			badgeAwardHeader.image = IMAGE_PATH+'various/yeah_mousiki.png';
		} else if(currentCategoryId == CAT_TEXNES){
			badgeAwardHeader.image = IMAGE_PATH+'various/yeah_texnes.png';
		} else if(currentCategoryId == CAT_ZWAFUTA){
			badgeAwardHeader.image = IMAGE_PATH+'various/yeah_zoafuta.png';
		} else if(currentCategoryId == CAT_LIFESTYLE){
			badgeAwardHeader.image = IMAGE_PATH+'various/yeah_lifestyle.png';
		} else if(currentCategoryId == CAT_TOTALBUZZ){
			badgeAwardHeader.image = IMAGE_PATH+'various/yeah_totalbuzz.png';
		}
		
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
	
	if(currentCategoryId == CAT_EPISTIMI){
		if(currentScore >= BADGE1_LEVEL3) achievedLevel = 3;
		else if(currentScore >= BADGE1_LEVEL2 && currentScore < BADGE1_LEVEL3) achievedLevel = 2;
		else if(currentScore >= BADGE1_LEVEL1 && currentScore < BADGE1_LEVEL2) achievedLevel = 1;
		
		Ti.API.info('1	Question: Achieved level '+achievedLevel+' and badge1 level is '+userLevelBadge1);
		
		if(userLevelBadge1 < achievedLevel){
			badgeAwared = true;
			saveBadge(playerId, achievedLevel, CAT_EPISTIMI);
		}  
	} else if(currentCategoryId == CAT_KINIMATOGRAFOS){
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
	} else if(currentCategoryId == CAT_ATHLITIKA){
		if(currentScore >= BADGE4_LEVEL3) achievedLevel = 3;
		else if(currentScore >= BADGE4_LEVEL2 && currentScore < BADGE4_LEVEL3) achievedLevel = 2;
		else if(currentScore >= BADGE4_LEVEL1 && currentScore < BADGE4_LEVEL2) achievedLevel = 1;
		
		Ti.API.info('4	Question: Achieved level '+achievedLevel+' and badge4 level is '+userLevelBadge4);
		
		if(userLevelBadge4 < achievedLevel){
			badgeAwared = true;
			saveBadge(playerId, achievedLevel, CAT_ATHLITIKA);
		}  
	} else if(currentCategoryId == CAT_TEXNOLOGIA){
		if(currentScore >= BADGE5_LEVEL3) achievedLevel = 3;
		else if(currentScore >= BADGE5_LEVEL2 && currentScore < BADGE5_LEVEL3) achievedLevel = 2;
		else if(currentScore >= BADGE5_LEVEL1 && currentScore < BADGE5_LEVEL2) achievedLevel = 1;
		
		Ti.API.info('5	Question: Achieved level '+achievedLevel+' and badge5 level is '+userLevelBadge5);
		
		if(userLevelBadge5 < achievedLevel){
			badgeAwared = true;
			saveBadge(playerId, achievedLevel, CAT_TEXNOLOGIA);
		}  
	} else if(currentCategoryId == CAT_ISTORIA){
		if(currentScore >= BADGE6_LEVEL3) achievedLevel = 3;
		else if(currentScore >= BADGE6_LEVEL2 && currentScore < BADGE6_LEVEL3) achievedLevel = 2;
		else if(currentScore >= BADGE6_LEVEL1 && currentScore < BADGE6_LEVEL2) achievedLevel = 1;
		
		Ti.API.info('6	Question: Achieved level '+achievedLevel+' and badge6 level is '+userLevelBadge6);
		
		if(userLevelBadge6 < achievedLevel){
			badgeAwared = true;
			saveBadge(playerId, achievedLevel, CAT_ISTORIA);
		}  
	} else if(currentCategoryId == CAT_MOUSIKH){
		if(currentScore >= BADGE7_LEVEL3) achievedLevel = 3;
		else if(currentScore >= BADGE7_LEVEL2 && currentScore < BADGE7_LEVEL3) achievedLevel = 2;
		else if(currentScore >= BADGE7_LEVEL1 && currentScore < BADGE7_LEVEL2) achievedLevel = 1;
		
		Ti.API.info('7	Question: Achieved level '+achievedLevel+' and badge7 level is '+userLevelBadge7);
		
		if(userLevelBadge7 < achievedLevel){
			badgeAwared = true;
			saveBadge(playerId, achievedLevel, CAT_MOUSIKH);
		}  
	} else if(currentCategoryId == CAT_TEXNES){
		if(currentScore >= BADGE8_LEVEL3) achievedLevel = 3;
		else if(currentScore >= BADGE8_LEVEL2 && currentScore < BADGE8_LEVEL3) achievedLevel = 2;
		else if(currentScore >= BADGE8_LEVEL1 && currentScore < BADGE8_LEVEL2) achievedLevel = 1;
		
		Ti.API.info('8	Question: Achieved level '+achievedLevel+' and badge8 level is '+userLevelBadge8);
		
		if(userLevelBadge8 < achievedLevel){
			badgeAwared = true;
			saveBadge(playerId, achievedLevel, CAT_TEXNES);
		}  
	} else if(currentCategoryId == CAT_ZWAFUTA){
		if(currentScore >= BADGE9_LEVEL3) achievedLevel = 3;
		else if(currentScore >= BADGE9_LEVEL2 && currentScore < BADGE9_LEVEL3) achievedLevel = 2;
		else if(currentScore >= BADGE9_LEVEL1 && currentScore < BADGE9_LEVEL2) achievedLevel = 1;
		
		Ti.API.info('9	Question: Achieved level '+achievedLevel+' and badge9 level is '+userLevelBadge9);
		
		if(userLevelBadge9 < achievedLevel){
			badgeAwared = true;
			saveBadge(playerId, achievedLevel, CAT_ZWAFUTA);
		}  
	} else if(currentCategoryId == CAT_LIFESTYLE){
		if(currentScore >= BADGE10_LEVEL3) achievedLevel = 3;
		else if(currentScore >= BADGE10_LEVEL2 && currentScore < BADGE10_LEVEL3) achievedLevel = 2;
		else if(currentScore >= BADGE10_LEVEL1 && currentScore < BADGE10_LEVEL2) achievedLevel = 1;
		
		Ti.API.info('10	Question: Achieved level '+achievedLevel+' and badge10 level is '+userLevelBadge10);
		
		if(userLevelBadge10 < achievedLevel){
			badgeAwared = true;
			saveBadge(playerId, achievedLevel, CAT_LIFESTYLE);
		}  
	} else if(currentCategoryId == CAT_TOTALBUZZ){
		if(currentScore >= BADGE13_LEVEL3) achievedLevel = 3;
		else if(currentScore >= BADGE13_LEVEL2 && currentScore < BADGE13_LEVEL3) achievedLevel = 2;
		else if(currentScore >= BADGE13_LEVEL1 && currentScore < BADGE13_LEVEL2) achievedLevel = 1;
		
		Ti.API.info('13	Question: Achieved level '+achievedLevel+' and badge13 level is '+userLevelBadge13);
		
		if(userLevelBadge13 < achievedLevel){
			badgeAwared = true;
			saveBadge(playerId, achievedLevel, CAT_TOTALBUZZ);
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
		
		Ti.API.info('	Question: Achieved level '+megaBadgeLevelAchieved+' and badge12 level is '+userLevelBadge12);
		
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