//The view
var viewStarsDetails = Ti.UI.createView({
	backgroundImage:IMAGE_PATH+'background.jpg',
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
	backgroundImage:IMAGE_PATH+'back.png',
	backgroundSelectedImage:IMAGE_PATH+'back_green.png',
	left:8,
	top:8,
	width:30,
	height:30
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
var starDetails1 = null;
var starDetails2 = null;
var starDetails3 = null;
var labelStarDetail1 = null;
var labelStarDetail2 = null;
var labelStarDetail3 = null;

function buildBadgeDetailView(){
	var shouldCreateView = barImageDetails == null;
	if(shouldCreateView){
		//Bar image
		barImageDetails = Titanium.UI.createImageView({
			image:IMAGE_PATH+'stars/fat_bar.png',
			top:58
		});
		
		viewStarsDetails.add(barImageDetails);
	
		//Badge image 
		badgeDetail = Titanium.UI.createImageView({
			image:IMAGE_PATH+'stars/badges/n/badge1.png',
			top:10
		});
	
		viewStarsDetails.add(badgeDetail);
	
		//Label for badge
		badgeLabelDetail = Titanium.UI.createLabel({
			text:BADGE1_LABEL,
			color:'white',
			top:100,
			textAlign:'center',
			width:'auto',
			height:'auto',
			font:{fontSize:13, fontWeight:'bold', fontFamily:'Myriad Pro'}
		});
		
		viewStarsDetails.add(badgeLabelDetail);
	
		//Label description for badge
		badgeLabelDetailDescription = Titanium.UI.createLabel({
			text:BADGE1_DESCRIPTION,
			color:'white',
			top:165,
			left:15,
			right:15,
			textAlign:'center',
			width:'auto',
			height:'auto',
			font:{fontSize:17, fontWeight:'regular', fontFamily:'Myriad Pro'}
		});
		
		viewStarsDetails.add(badgeLabelDetailDescription);
	
		//SubLabel for badge
		badgeLabelSubDetail = Titanium.UI.createLabel({
			text:BADGE_SUB_DESC_CATEGORIES,
			color:'white',
			top:260,
			textAlign:'center',
			width:'auto',
			height:'auto',
			font:{fontSize:17, fontWeight:'regular', fontFamily:'Myriad Pro'}
		});
		
		viewStarsDetails.add(badgeLabelSubDetail);
	
		//star detail 1
		starDetails1 = Titanium.UI.createImageView({
			image:IMAGE_PATH+'stars/star_1.png',
			top:303,
			left:40
		});
	
		//star detail 2
		starDetails2 = Titanium.UI.createImageView({
			image:IMAGE_PATH+'stars/star_2.png',
			top:338,
			left:40
		});
	
		//star detail 3
		starDetails3 = Titanium.UI.createImageView({
			image:IMAGE_PATH+'stars/star_3.png',
			top:373,
			left:40
		});
	
		viewStarsDetails.add(starDetails1);
		viewStarsDetails.add(starDetails2);
		viewStarsDetails.add(starDetails3);
	
		//label points 1
		labelStarDetail1 = Titanium.UI.createLabel({
			text:'500 πόντοι',
			color:'white',
			right:40,
			top:304,
			textAlign:'right',
			font:{fontSize:19, fontWeight:'bold', fontFamily:'Myriad Pro'}
		});
	
		//label points 2
		labelStarDetail2 = Titanium.UI.createLabel({
			text:'1500 πόντοι',
			color:'white',
			right:40,
			top:339,
			textAlign:'right',
			font:{fontSize:19, fontWeight:'bold', fontFamily:'Myriad Pro'}
		});
	
		//label points 3
		labelStarDetail3 = Titanium.UI.createLabel({
			text:'3500 πόντοι',
			color:'white',
			right:40,
			top:374,
			textAlign:'right',
			font:{fontSize:19, fontWeight:'bold', fontFamily:'Myriad Pro'}
		});
	
		viewStarsDetails.add(labelStarDetail1);
		viewStarsDetails.add(labelStarDetail2);
		viewStarsDetails.add(labelStarDetail3);
		
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
	
		viewStarsDetails.remove(starDetails1);
		viewStarsDetails.remove(starDetails2);
		viewStarsDetails.remove(starDetails3);
		viewStarsDetails.remove(labelStarDetail1);
		viewStarsDetails.remove(labelStarDetail2);
		viewStarsDetails.remove(labelStarDetail3);
		viewStarsDetails.remove(barImageDetails);
		viewStarsDetails.remove(badgeDetail);
		viewStarsDetails.remove(badgeLabelDetail);
		viewStarsDetails.remove(badgeLabelDetailDescription);
		viewStarsDetails.remove(badgeLabelSubDetail);
		
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
		//star detail 1
		starDetails1 = null;
		//star detail 2
		starDetails2 = null;
		//star detail 3
		starDetails3 = null;
		//label points 1
		labelStarDetail1 = null;
		//label points 2
		labelStarDetail2 = null;
		//label points 3
		labelStarDetail3 = null;
		
		win.remove(viewStarsDetails);
	} else {
		Ti.API.warn('NOT destroying StarDetails view - already in progress');
	}
}

/*Updates the UI with the appropriate data for this badge*/
function updateBadgeDetailsView(badgeId){
	var pointsLabel1 = '';
	var pointsLabel2 = '';
	var pointsLabel3 = '';
	
	if(badgeId == 1){
		badgeDetail.image = IMAGE_PATH+'stars/badges/n/badge1.png';
		badgeLabelDetail.text = BADGE1_LABEL;
		badgeLabelDetailDescription.text = BADGE1_DESCRIPTION;
		
		labelStarDetail1.text = BADGE1_LEVEL1 + ' πόντοι';
		labelStarDetail2.text = BADGE1_LEVEL2 + ' πόντοι';
		labelStarDetail3.text = BADGE1_LEVEL3 + ' πόντοι';
	} else if(badgeId == 2){
		badgeDetail.image = IMAGE_PATH+'stars/badges/n/badge2.png';
		badgeLabelDetail.text = BADGE2_LABEL;
		badgeLabelDetailDescription.text = BADGE2_DESCRIPTION;
		
		labelStarDetail1.text = BADGE2_LEVEL1 + ' πόντοι';
		labelStarDetail2.text = BADGE2_LEVEL2 + ' πόντοι';
		labelStarDetail3.text = BADGE2_LEVEL3 + ' πόντοι';
	} else if(badgeId == 3){
		badgeDetail.image = IMAGE_PATH+'stars/badges/n/badge3.png';
		badgeLabelDetail.text = BADGE3_LABEL;
		badgeLabelDetailDescription.text = BADGE3_DESCRIPTION;
		
		labelStarDetail1.text = BADGE3_LEVEL1 + ' πόντοι';
		labelStarDetail2.text = BADGE3_LEVEL2 + ' πόντοι';
		labelStarDetail3.text = BADGE3_LEVEL3 + ' πόντοι';
	} else if(badgeId == 4){
		badgeDetail.image = IMAGE_PATH+'stars/badges/n/badge4.png';
		badgeLabelDetail.text = BADGE4_LABEL;
		badgeLabelDetailDescription.text = BADGE4_DESCRIPTION;
		
		labelStarDetail1.text = BADGE4_LEVEL1 + ' πόντοι';
		labelStarDetail2.text = BADGE4_LEVEL2 + ' πόντοι';
		labelStarDetail3.text = BADGE4_LEVEL3 + ' πόντοι';
	} else if(badgeId == 5){
		badgeDetail.image = IMAGE_PATH+'stars/badges/n/badge5.png';
		badgeLabelDetail.text = BADGE5_LABEL;
		badgeLabelDetailDescription.text = BADGE5_DESCRIPTION;
		
		labelStarDetail1.text = BADGE5_LEVEL1 + ' πόντοι';
		labelStarDetail2.text = BADGE5_LEVEL2 + ' πόντοι';
		labelStarDetail3.text = BADGE5_LEVEL3 + ' πόντοι';
	} else if(badgeId == 6){
		badgeDetail.image = IMAGE_PATH+'stars/badges/n/badge6.png';
		badgeLabelDetail.text = BADGE6_LABEL;
		badgeLabelDetailDescription.text = BADGE6_DESCRIPTION;
		
		labelStarDetail1.text = BADGE6_LEVEL1 + ' πόντοι';
		labelStarDetail2.text = BADGE6_LEVEL2 + ' πόντοι';
		labelStarDetail3.text = BADGE6_LEVEL3 + ' πόντοι';
	} else if(badgeId == 7){
		badgeDetail.image = IMAGE_PATH+'stars/badges/n/badge7.png';
		badgeLabelDetail.text = BADGE7_LABEL;
		badgeLabelDetailDescription.text = BADGE7_DESCRIPTION;
		
		labelStarDetail1.text = BADGE7_LEVEL1 + ' πόντοι';
		labelStarDetail2.text = BADGE7_LEVEL2 + ' πόντοι';
		labelStarDetail3.text = BADGE7_LEVEL3 + ' πόντοι';
	} else if(badgeId == 8){
		badgeDetail.image = IMAGE_PATH+'stars/badges/n/badge8.png';
		badgeLabelDetail.text = BADGE8_LABEL;
		badgeLabelDetailDescription.text = BADGE8_DESCRIPTION;
		
		labelStarDetail1.text = BADGE8_LEVEL1 + ' πόντοι';
		labelStarDetail2.text = BADGE8_LEVEL2 + ' πόντοι';
		labelStarDetail3.text = BADGE8_LEVEL3 + ' πόντοι';
	} else if(badgeId == 9){
		badgeDetail.image = IMAGE_PATH+'stars/badges/n/badge9.png';
		badgeLabelDetail.text = BADGE9_LABEL;
		badgeLabelDetailDescription.text = BADGE9_DESCRIPTION;
		
		labelStarDetail1.text = BADGE9_LEVEL1 + ' πόντοι';
		labelStarDetail2.text = BADGE9_LEVEL2 + ' πόντοι';
		labelStarDetail3.text = BADGE9_LEVEL3 + ' πόντοι';
	} else if(badgeId == 10){
		badgeDetail.image = IMAGE_PATH+'stars/badges/n/badge10.png';
		badgeLabelDetail.text = BADGE10_LABEL;
		badgeLabelDetailDescription.text = BADGE10_DESCRIPTION;
		
		labelStarDetail1.text = BADGE10_LEVEL1 + ' πόντοι';
		labelStarDetail2.text = BADGE10_LEVEL2 + ' πόντοι';
		labelStarDetail3.text = BADGE10_LEVEL3 + ' πόντοι';
	} else if(badgeId == 11){
		badgeDetail.image = IMAGE_PATH+'stars/badges/n/badge11.png';
		badgeLabelDetail.text = BADGE11_LABEL;
		badgeLabelDetailDescription.text = BADGE11_DESCRIPTION;
		
		badgeLabelSubDetail.text = BADGE_SUB_DESC_SPEED;
		
		labelStarDetail1.text = BADGE11_LEVEL1 + ' απαντήσεις';
		labelStarDetail2.text = BADGE11_LEVEL2 + ' απαντήσεις';
		labelStarDetail3.text = BADGE11_LEVEL3 + ' απαντήσεις';
	} else if(badgeId == 12){
		badgeDetail.image = IMAGE_PATH+'stars/badges/n/badge12.png';
		badgeLabelDetail.text = BADGE12_LABEL;
		badgeLabelDetailDescription.text = BADGE12_DESCRIPTION;
		
		badgeLabelSubDetail.text = BADGE_SUB_DESC_BADGES;
		
		labelStarDetail1.text = BADGE12_LEVEL1 + ' παράσημα';
		labelStarDetail2.text = BADGE12_LEVEL2 + ' παράσημα';
		labelStarDetail3.text = BADGE12_LEVEL3 + ' παράσημα';
	}
	
	else if(badgeId == 13){
		badgeDetail.image = IMAGE_PATH+'stars/badges/n/badge13.png';
		badgeLabelDetail.text = BADGE13_LABEL;
		badgeLabelDetailDescription.text = BADGE13_DESCRIPTION;
		
		labelStarDetail1.text = BADGE13_LEVEL1 + ' πόντοι';
		labelStarDetail2.text = BADGE13_LEVEL2 + ' πόντοι';
		labelStarDetail3.text = BADGE13_LEVEL3 + ' πόντοι';
	}
}

