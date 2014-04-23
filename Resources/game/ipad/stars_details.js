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
var labelStarDetail1 = null;
var labelStarDetail2 = null;
var labelStarDetail3 = null;

var badgesDetailsSmallBar = null;
var badgesDetailsBanner = null;
var badgesDetails = null; 
var badgesDetailsDescription = null;

var badgesDetailsTitleBackgroundBar = null;
var badgesDetailProveLabel = null;
var badgesDetailsMiddleBackgroundBox = null;
var badgeDetails1 = null;
var badgeDetails2 = null;
var badgeDetails3 = null;
var badgesDetailsBottomBackgroundBar = null;
var badgesDetailsOkLabel = null;

function buildBadgeDetailView(){
	var shouldCreateView = badgesDetails == null;
	if(shouldCreateView){
		
		//title background bar
		badgesDetailsTitleBackgroundBar = Titanium.UI.createView({
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
		
		badgesDetailProveLabel = Titanium.UI.createLabel({
			text:'ΑΠΟΔΕΙΞΕ ΤΟ!',
			color:'0b4b7f',
			top:306,
			textAlign:'center',
			font:{fontSize:33, fontWeight:'semibold', fontFamily:'Myriad Pro'}
		});
		viewStarsDetails.add(badgesDetailProveLabel);
		
		badgesDetailsMiddleBackgroundBox = Titanium.UI.createView({
			backgroundColor:'0b4b7f',
			height:322,
			width:477,
			top:459
		});
		
		var starsOffset = 64;
		var starLabelOffset = 62;
		
		//badge detail 1
		badgeDetails1 = Titanium.UI.createImageView({
			image:IMAGE_PATH+'stars/star_1.png',
			top:106,
			left:39
		});
		badgesDetailsMiddleBackgroundBox.add(badgeDetails1);
	
		//badge detail 2
		badgeDetails2 = Titanium.UI.createImageView({
			image:IMAGE_PATH+'stars/star_2.png',
			top:badgeDetails1.top+starsOffset,
			left:39
		});
		badgesDetailsMiddleBackgroundBox.add(badgeDetails2);
	
		//badge detail 3
		badgeDetails3 = Titanium.UI.createImageView({
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
		
		badgesDetailsBottomBackgroundBar = Titanium.UI.createView({
			backgroundColor:'0b4b7f',
			height:154,
			bottom:0
		});
		
		badgesDetailsOkLabel = Titanium.UI.createLabel({
			text:'OK',
			color:'white',
			top:45,
			textAlign:'center',
			font:{fontSize:81, fontWeight:'bold', fontFamily:'Myriad Pro'}
		});
		badgesDetailsBottomBackgroundBar.add(badgesDetailsOkLabel);
		
		viewStarsDetails.add(badgesDetailsBottomBackgroundBar);
		badgesDetailsBottomBackgroundBar.addEventListener('click', handleOkButton);
		
		win.add(viewStarsDetails);
	} else {
		Ti.API.warn('NOT building StarDetails view - already in progress');
	}
}

function destroyBadgeDetailView(){
	Ti.API.warn('destroyBadgeDetailView() called');
	
	var shouldDestroyView = badgesDetails != null;
	if(shouldDestroyView){
		viewStarsDetails.animate(anim_out);
		
		badgesDetailsBottomBackgroundBar.removeEventListener('click', handleOkButton);
		
		viewStarsDetails.remove(badgesDetailsDescription);
		badgesDetailsTitleBackgroundBar.remove(backHomeFromStarsDetailsButton);
		badgesDetailsTitleBackgroundBar.remove(badgesDetails);
		viewStarsDetails.remove(badgesDetailsTitleBackgroundBar);
		viewStarsDetails.remove(badgesDetailsSmallBar);
		viewStarsDetails.remove(badgesDetailProveLabel);
		
		badgesDetailsMiddleBackgroundBox.remove(badgeDetails1);
		badgesDetailsMiddleBackgroundBox.remove(badgeDetails2);
		badgesDetailsMiddleBackgroundBox.remove(badgeDetails3);
		badgesDetailsMiddleBackgroundBox.remove(labelStarDetail1);
		badgesDetailsMiddleBackgroundBox.remove(labelStarDetail2);
		badgesDetailsMiddleBackgroundBox.remove(labelStarDetail3);
		viewStarsDetails.remove(badgesDetailsMiddleBackgroundBox);
		
		viewStarsDetails.remove(badgesDetailsBanner);
		badgesDetailsBottomBackgroundBar.remove(badgesDetailsOkLabel);
		viewStarsDetails.remove(badgesDetailsBottomBackgroundBar);
		
		badgesDetailsTitleBackgroundBar = null;
		badgesDetailProveLabel = null;
		badgesDetailsMiddleBackgroundBox = null;
		badgeDetails1 = null;
		badgeDetails2 = null;
		badgeDetails3 = null;
		badgesDetailsBottomBackgroundBar = null;
		badgesDetailsOkLabel = null;
		badgesDetails = null;
		badgesDetailsBanner = null;
		
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

