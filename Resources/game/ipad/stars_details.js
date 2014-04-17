//The view
var viewStarsDetails = Ti.UI.createView({
	backgroundImage:IMAGE_PATH+'signin/background.jpg',
	opacity:0,
	top:0,
	bottom:0,
	left:0,
	right:0
});

//Load data event listener
viewStarsDetails.addEventListener('updateUI', function(e) {
	Ti.API.info('Updating badge details data ' + e.badge);
	
	buildBadgeDetailView();
	updateBadgeDetailsView(e.badge);
	viewStarsDetails.animate(anim_in);
});

//Back button
var backHomeFromStarsDetailsButton = Titanium.UI.createButton({
	backgroundImage:IMAGE_PATH+'categories/back.png',
	left:30,
	top:25,
	width:55,
	height:55
});

//Back button event listener
backHomeFromStarsDetailsButton.addEventListener('click', function() {
	if(SOUNDS_MODE){
		audioBack.play();	
	}
	
	Ti.API.info('BACK to home clicked');
	destroyBadgeDetailView();
});

viewStarsDetails.add(backHomeFromStarsDetailsButton);

//UI components
var barImageDetails = null;
var badgeDetail = null;
var badgeLabelDetail = null;
var badgeLabelDetailDescription = null;
var badgeLabelSubDetail = null;
var labelStarDetail1 = null;
var labelStarDetail2 = null;
var labelStarDetail3 = null;

var badgesDetailsSmallBar = null;
var badgesDetailsBanner = null;
var badgesDetails = null; 
var badgesDetailsDescription = null;

function buildBadgeDetailView(){
	var shouldCreateView = barImageDetails == null;
	if(shouldCreateView){
		
		//title background bar
		var badgesDetailsTitleBackgroundBar = Titanium.UI.createView({
			backgroundColor:'0b4b7f',
			height:115,
			top:0
		});
		
		badgesDetailsTitleBackgroundBar.add(backHomeFromStarsDetailsButton);
		
		badgesDetails = Titanium.UI.createLabel({
			color:'white',
			top:42,
			textAlign:'center',
			font:{fontSize:44, fontWeight:'bold', fontFamily:'Myriad Pro'}
		});
		
		badgesDetailsTitleBackgroundBar.add(badgesDetails);
		
		viewStarsDetails.add(badgesDetailsTitleBackgroundBar);
		
		badgesDetailsSmallBar = Titanium.UI.createView({
			height:18,
			top:115
		});
		
		viewStarsDetails.add(badgesDetailsSmallBar);
		
		badgesDetailsDescription = Titanium.UI.createLabel({
			color:'0b4b7f',
			top:199,
			width:450,
			textAlign:'center',
			font:{fontSize:33, fontWeight:'semibold', fontFamily:'Myriad Pro'}
		});
		viewStarsDetails.add(badgesDetailsDescription);
		
		var badgesDetailProveLabel = Titanium.UI.createLabel({
			text:'ΑΠΟΔΕΙΞΕ ΤΟ!',
			color:'0b4b7f',
			top:306,
			textAlign:'center',
			font:{fontSize:33, fontWeight:'semibold', fontFamily:'Myriad Pro'}
		});
		viewStarsDetails.add(badgesDetailProveLabel);
		
		var badgesDetailsMiddleBackgroundBox = Titanium.UI.createView({
			backgroundColor:'0b4b7f',
			height:322,
			width:477,
			top:459
		});
		
		var starsOffset = 64;
		var starLabelOffset = 62;
		
		//badge detail 1
		var badgeDetails1 = Titanium.UI.createImageView({
			image:IMAGE_PATH+'stars/star_1.png',
			top:106,
			left:39
		});
		badgesDetailsMiddleBackgroundBox.add(badgeDetails1);
	
		//badge detail 2
		var badgeDetails2 = Titanium.UI.createImageView({
			image:IMAGE_PATH+'stars/star_2.png',
			top:badgeDetails1.top+starsOffset,
			left:39
		});
		badgesDetailsMiddleBackgroundBox.add(badgeDetails2);
	
		//badge detail 3
		var badgeDetails3 = Titanium.UI.createImageView({
			image:IMAGE_PATH+'stars/star_3.png',
			top:badgeDetails2.top+starsOffset,
			left:39
		});
		badgesDetailsMiddleBackgroundBox.add(badgeDetails3);
		
		//label points 1
		labelStarDetail1 = Titanium.UI.createLabel({
			text:'500 πόντοι',
			color:'white',
			right:32,
			top:117,
			textAlign:'right',
			font:{fontSize:42, fontWeight:'bold', fontFamily:'Myriad Pro'}
		});
		badgesDetailsMiddleBackgroundBox.add(labelStarDetail1);
	
		//label points 2
		labelStarDetail2 = Titanium.UI.createLabel({
			text:'1500 πόντοι',
			color:'white',
			right:32,
			top:labelStarDetail1.top+starLabelOffset,
			textAlign:'right',
			font:{fontSize:42, fontWeight:'bold', fontFamily:'Myriad Pro'}
		});
		badgesDetailsMiddleBackgroundBox.add(labelStarDetail2);
	
		//label points 3
		labelStarDetail3 = Titanium.UI.createLabel({
			text:'3500 πόντοι',
			color:'white',
			right:32,
			top:labelStarDetail2.top+starLabelOffset,
			textAlign:'right',
			font:{fontSize:42, fontWeight:'bold', fontFamily:'Myriad Pro'}
		});
		badgesDetailsMiddleBackgroundBox.add(labelStarDetail3);
		
		viewStarsDetails.add(badgesDetailsMiddleBackgroundBox);
		
		badgesDetailsBanner = Ti.UI.createImageView({
			top:375,
			zIndex:2
		});
		viewStarsDetails.add(badgesDetailsBanner);
		
		var badgesDetailsBottomBackgroundBar = Titanium.UI.createView({
			backgroundColor:'0b4b7f',
			height:154,
			bottom:0
		});
		
		var badgesDetailsOkLabel = Titanium.UI.createLabel({
			text:'OK',
			color:'white',
			top:45,
			textAlign:'center',
			font:{fontSize:81, fontWeight:'bold', fontFamily:'Myriad Pro'}
		});
		badgesDetailsBottomBackgroundBar.add(badgesDetailsOkLabel);
		
		viewStarsDetails.add(badgesDetailsBottomBackgroundBar);
		badgesDetailsBottomBackgroundBar.addEventListener('click', handleOkButton);
		
		//Bar image
		barImageDetails = Titanium.UI.createImageView({
			image:IMAGE_PATH+'stars/fat_bar.png',
			top:118
		});
		
		//viewStarsDetails.add(barImageDetails);
	
		//Badge image 
		badgeDetail = Titanium.UI.createImageView({
			image:IMAGE_PATH+'stars/badges/n/badge1.png',
			top:30
		});
	
		//viewStarsDetails.add(badgeDetail);
	
		//Label for badge
		badgeLabelDetail = Titanium.UI.createLabel({
			text:BADGE1_LABEL,
			color:'white',
			top:235,
			textAlign:'center',
			width:'auto',
			height:'auto',
			font:{fontSize:24, fontWeight:'bold', fontFamily:'Myriad Pro'}
		});
		
		//viewStarsDetails.add(badgeLabelDetail);
	
		//Label description for badge
		badgeLabelDetailDescription = Titanium.UI.createLabel({
			text:BADGE1_DESCRIPTION,
			color:'white',
			top:365,
			//left:85,
			//right:85,
			textAlign:'center',
			width:400,
			height:'auto',
			font:{fontSize:24, fontWeight:'regular', fontFamily:'Myriad Pro'}
		});
		
		//viewStarsDetails.add(badgeLabelDetailDescription);
	
		//SubLabel for badge
		badgeLabelSubDetail = Titanium.UI.createLabel({
			text:BADGE_SUB_DESC_CATEGORIES,
			color:'white',
			top:560,
			textAlign:'center',
			width:'auto',
			height:'auto',
			font:{fontSize:24, fontWeight:'regular', fontFamily:'Myriad Pro'}
		});
		
		//viewStarsDetails.add(badgeLabelSubDetail);
		
		win.add(viewStarsDetails);
	} else {
		Ti.API.warn('NOT building StarDetails view - already in progress');
	}
}

function destroyBadgeDetailView(){
	Ti.API.warn('destroyBadgeDetailView() called');
	
	var shouldDestroyView = barImageDetails != null;
	if(shouldDestroyView){
		viewStarsDetails.animate(anim_out);
		
		viewStarsDetails.remove(labelStarDetail1);
		viewStarsDetails.remove(labelStarDetail2);
		viewStarsDetails.remove(labelStarDetail3);
		viewStarsDetails.remove(barImageDetails);
		viewStarsDetails.remove(badgeDetail);
		viewStarsDetails.remove(badgeLabelDetail);
		viewStarsDetails.remove(badgeLabelDetailDescription);
		viewStarsDetails.remove(badgeLabelSubDetail);
		viewStarsDetails.remove(badgesDetailsDescription);
		
		//Bar image
		barImageDetails = null;
		//Badge image 
		badgeDetail = null;
		//Label for badge
		badgeLabelDetail = null;
		//Label description for badge
		badgeLabelDetailDescription = null;
		//SubLabel for badge
		badgeLabelSubDetail = null;
		//label points 1
		labelStarDetail1 = null;
		//label points 2
		labelStarDetail2 = null;
		//label points 3
		labelStarDetail3 = null;
		
		badgesDetailsDescription = null;
		
		win.remove(viewStarsDetails);
	} else {
		Ti.API.warn('NOT destroying StarDetails view - already in progress');
	}
}

function handleOkButton(){
	if(SOUNDS_MODE){
		audioBack.play();	
	}
	
	Ti.API.info('BACK to home clicked');
	destroyBadgeDetailView();
}

/*Updates the UI with the appropriate data for this badge*/
function updateBadgeDetailsView(badgeId){
	var pointsLabel1 = '';
	var pointsLabel2 = '';
	var pointsLabel3 = '';
	
	if(badgeId == 1){
		badgesDetailsBanner.image = IMAGE_PATH+'game_over/icon_exforge.png';
		badgesDetailsSmallBar.backgroundColor = 'fb494a'; 
		badgesDetails.text = 'EXFORGE';
		badgesDetailsDescription.text = BADGE1_DESCRIPTION;
		
		labelStarDetail1.text = BADGE1_LEVEL1 + ' πόντοι';
		labelStarDetail2.text = BADGE1_LEVEL2 + ' πόντοι';
		labelStarDetail3.text = BADGE1_LEVEL3 + ' πόντοι';
	} else if(badgeId == 2){
		badgesDetailsBanner.image = IMAGE_PATH+'game_over/icon_science.png';
		badgesDetailsSmallBar.backgroundColor = '6fb042'; 
		badgesDetails.text = 'ΕΠΙΣΤΗΜΗ';
		badgesDetailsDescription.text = BADGE2_DESCRIPTION;
		
		labelStarDetail1.text = BADGE2_LEVEL1 + ' πόντοι';
		labelStarDetail2.text = BADGE2_LEVEL2 + ' πόντοι';
		labelStarDetail3.text = BADGE2_LEVEL3 + ' πόντοι';
	} else if(badgeId == 3){
		badgesDetailsBanner.image = IMAGE_PATH+'game_over/icon_geo.png';
		badgesDetailsSmallBar.backgroundColor = '569bd4'; 
		badgesDetails.text = 'ΓΕΩΓΡΑΦΙΑ';
		badgesDetailsDescription.text = BADGE3_DESCRIPTION;
		
		labelStarDetail1.text = BADGE3_LEVEL1 + ' πόντοι';
		labelStarDetail2.text = BADGE3_LEVEL2 + ' πόντοι';
		labelStarDetail3.text = BADGE3_LEVEL3 + ' πόντοι';
	} else if(badgeId == 4){
		badgesDetailsBanner.image = IMAGE_PATH+'game_over/icon_history.png';
		badgesDetailsSmallBar.backgroundColor = 'fb9a01'; 
		badgesDetails.text = 'ΙΣΤΟΡΙΑ';
		badgesDetailsDescription.text = BADGE4_DESCRIPTION;
		
		labelStarDetail1.text = BADGE4_LEVEL1 + ' πόντοι';
		labelStarDetail2.text = BADGE4_LEVEL2 + ' πόντοι';
		labelStarDetail3.text = BADGE4_LEVEL3 + ' πόντοι';
	} else if(badgeId == 5){
		badgesDetailsBanner.image = IMAGE_PATH+'game_over/icon_sports.png';
		badgesDetailsSmallBar.backgroundColor = '9b52e7'; 
		badgesDetails.text = 'ΑΘΛΗΤΙΚΑ';
		badgesDetailsDescription.text = BADGE5_DESCRIPTION;
		
		labelStarDetail1.text = BADGE5_LEVEL1 + ' πόντοι';
		labelStarDetail2.text = BADGE5_LEVEL2 + ' πόντοι';
		labelStarDetail3.text = BADGE5_LEVEL3 + ' πόντοι';
	}
}

