var BADGE_SUB_DESC_CATEGORIES = 'Πόσοι πόντοι χρειάζονται για κάθε αστέρι?';
var BADGE_SUB_DESC_SPEED = 'Πόσες γρήγορες απαντήσεις χρειάζονται?';
var BADGE_SUB_DESC_BADGES = 'Πόσα παράσημα χρειάζονται?';

//The view
var viewStars = Ti.UI.createView({
	backgroundImage:IMAGE_PATH+'background.jpg',
	opacity:0,
	top:0,
	bottom:0,
	left:0,
	right:0
});

//Load data event listener
viewStars.addEventListener('refreshBadges', function(e) {
	Ti.API.info('Updating badge data');
	updateBadgeView();
});

//Back button
var backHomeFromStarsButton = Titanium.UI.createButton({
	backgroundImage:IMAGE_PATH+'back.png',
	backgroundSelectedImage:IMAGE_PATH+'back_green.png',
	left:8,
	top:8,
	height:30,
	width:30
});
	
viewStars.add(backHomeFromStarsButton);
//Back button event listener
backHomeFromStarsButton.addEventListener('click', function() {
	if(SOUNDS_MODE){
		audioBack.play();	
	}
	
	Ti.API.info('BACK to home clicked');
	destroyBadgesListView();
});

//UI Components
var iconImageStars = null;
var barImageStars = null;
var iconReflectionImageStars = null;
var titleImageStars = null;
var badgeView1 = null;
var badge1 = null;
var star1 = null;
var badgeLabel1 = null;
var badge2 = null;
var star2 = null;
var badgeLabel2 = null;
var badge3 = null;
var star3 = null;
var badgeLabel3 = null;
var badge4 = null;
var star4 = null;
var badgeLabel4 = null;
var badge5 = null;
var star5 = null;
var badgeLabel5 = null;
var badge6 = null;
var star6 = null;
var badgeLabel6 = null;
var badge7 = null;
var star7 = null;
var badgeLabel7 = null;
var badge8 = null;
var star8 = null;
var badgeLabel8 = null;
var badge9 = null;
var star9 = null;
var badgeLabel9 = null;
var badge10 = null;
var star10 = null;
var badgeLabel10 = null;
var badge11 = null;
var star11 = null;
var badgeLabel11 = null;
var badge12 = null;
var star12 = null;
var badgeLabel12 = null;
var badge13 = null;
var star13 = null;
var badgeLabel13 = null;

function buildBadgesListView(){
	var shouldCreateView = iconImageStars == null;
	if(shouldCreateView){
		//Icon image
		iconImageStars = Titanium.UI.createImageView({
			image:IMAGE_PATH+'stars/icon.png',
			top:15,
			right:14
		});
		
		viewStars.add(iconImageStars);
		
		//Bar image
		barImageStars = Titanium.UI.createImageView({
			image:IMAGE_PATH+'stars/bar.png',
			top:58
		});
		
		viewStars.add(barImageStars);
		
		//Icon image reflection
		iconReflectionImageStars = Titanium.UI.createImageView({
			image:IMAGE_PATH+'stars/icon_r.png',
			top:0,
			right:14
		});
		
		barImageStars.add(iconReflectionImageStars);
		
		//Title image
		titleImageStars = Titanium.UI.createImageView({
			image:IMAGE_PATH+'stars/title.png',
			top:31,
			zIndex:2
		});
		
		viewStars.add(titleImageStars);
		
		///////BADGES///////////
		badgeView1 = Ti.UI.createScrollView({
			opacity:1,
			top:120,
			bottom:0,
			left:0,
			right:0,
			contentWidth: 'auto',
		  	contentHeight: 'auto',
		  	showVerticalScrollIndicator: true,
		  	showHorizontalScrollIndicator: true,
		  	height: '74%',
		  	width: '100%',
		});
	
		//Badge1 image 
		badge1 = Titanium.UI.createImageView({
			image:IMAGE_PATH+'stars/badges/g/badge1.png',
			top:27,
			left:17,
			badge:1
		});
		
		star1 = Titanium.UI.createImageView({
			image:IMAGE_PATH+'stars/star_1.png',
			top:5,
			left:27
		});
	
		//Label for badge1
		badgeLabel1 = Titanium.UI.createLabel({
			text:BADGE1_LABEL,
			color:'white',
			left:19,
			top:115,
			textAlign:'center',
			width:'80',
			height:'auto',
			font:{fontSize:13, fontWeight:'bold', fontFamily:'Myriad Pro'}
		});
	
		badge2 = Titanium.UI.createImageView({
			image:IMAGE_PATH+'stars/badges/g/badge2.png',
			top:27,
			left:117,
			badge:2
		});
		
		star2 = Titanium.UI.createImageView({
			image:IMAGE_PATH+'stars/star_1.png',
			top:5,
			left:127
		});
	
		//Label for badge2
		badgeLabel2 = Titanium.UI.createLabel({
			text:BADGE2_LABEL,
			color:'white',
			left:119,
			top:115,
			textAlign:'center',
			width:'80',
			height:'auto',
			font:{fontSize:13, fontWeight:'bold', fontFamily:'Myriad Pro'}
		});
	
		badge3 = Titanium.UI.createImageView({
			image:IMAGE_PATH+'stars/badges/g/badge3.png',
			top:27,
			left:217,
			badge:3
		});
	
		star3 = Titanium.UI.createImageView({
			image:IMAGE_PATH+'stars/star_1.png',
			top:5,
			left:227
		});
	
		//Label for badge3
		badgeLabel3 = Titanium.UI.createLabel({
			text:BADGE3_LABEL,
			color:'white',
			left:219,
			top:115,
			textAlign:'center',
			width:'80',
			height:'auto',
			font:{fontSize:13, fontWeight:'bold', fontFamily:'Myriad Pro'}
		});
	
		badge4 = Titanium.UI.createImageView({
			image:IMAGE_PATH+'stars/badges/g/badge4.png',
			top:190,
			left:17,
			badge:4
		});
	
		star4 = Titanium.UI.createImageView({
			image:IMAGE_PATH+'stars/star_1.png',
			top:168,
			left:27
		});
	
		//Label for badge4
		badgeLabel4 = Titanium.UI.createLabel({
			text:BADGE4_LABEL,
			color:'white',
			left:19,
			top:278,
			textAlign:'center',
			width:'80',
			height:'auto',
			font:{fontSize:13, fontWeight:'bold', fontFamily:'Myriad Pro'}
		});
	
		badge5 = Titanium.UI.createImageView({
			image:IMAGE_PATH+'stars/badges/g/badge5.png',
			top:190,
			left:117,
			badge:5
		});
		
		star5 = Titanium.UI.createImageView({
			image:IMAGE_PATH+'stars/star_1.png',
			top:168,
			left:127
		});
	
		//Label for badge5
		badgeLabel5 = Titanium.UI.createLabel({
			text:BADGE5_LABEL,
			color:'white',
			left:119,
			top:278,
			textAlign:'center',
			width:'80',
			height:'auto',
			font:{fontSize:13, fontWeight:'bold', fontFamily:'Myriad Pro'}
		});
	
		badge6 = Titanium.UI.createImageView({
			image:IMAGE_PATH+'stars/badges/g/badge6.png',
			top:190,
			left:217,
			badge:6
		});
	
		star6 = Titanium.UI.createImageView({
			image:IMAGE_PATH+'stars/star_1.png',
			top:168,
			left:227
		});
	
		//Label for badge6
		badgeLabel6 = Titanium.UI.createLabel({
			text:BADGE6_LABEL,
			color:'white',
			left:219,
			top:278,
			textAlign:'center',
			width:'80',
			height:'auto',
			font:{fontSize:13, fontWeight:'bold', fontFamily:'Myriad Pro'}
		});
		
		badge7 = Titanium.UI.createImageView({
			image:IMAGE_PATH+'stars/badges/g/badge7.png',
			top:353,
			left:17,
			badge:7
		});
	
		star7 = Titanium.UI.createImageView({
			image:IMAGE_PATH+'stars/star_1.png',
			top:331,
			left:27
		});
	
		//Label for badge7
		badgeLabel7 = Titanium.UI.createLabel({
			text:BADGE7_LABEL,
			color:'white',
			left:19,
			top:441,
			textAlign:'center',
			width:'80',
			height:'auto',
			font:{fontSize:13, fontWeight:'bold', fontFamily:'Myriad Pro'}
		});
	
		badge8 = Titanium.UI.createImageView({
			image:IMAGE_PATH+'stars/badges/g/badge8.png',
			top:353,
			left:117,
			badge:8
		});
	
		star8 = Titanium.UI.createImageView({
			image:IMAGE_PATH+'stars/star_1.png',
			top:331,
			left:127
		});
	
		//Label for badge8
		badgeLabel8 = Titanium.UI.createLabel({
			text:BADGE8_LABEL,
			color:'white',
			left:119,
			top:441,
			textAlign:'center',
			width:'80',
			height:'auto',
			font:{fontSize:13, fontWeight:'bold', fontFamily:'Myriad Pro'}
		});
	
		badge9 = Titanium.UI.createImageView({
			image:IMAGE_PATH+'stars/badges/g/badge9.png',
			top:353,
			left:217,
			badge:9
		});
	
		star9 = Titanium.UI.createImageView({
			image:IMAGE_PATH+'stars/star_1.png',
			top:331,
			left:227
		});
	
		//Label for badge9
		badgeLabel9 = Titanium.UI.createLabel({
			text:BADGE9_LABEL,
			color:'white',
			left:219,
			top:441,
			textAlign:'center',
			width:'80',
			height:'auto',
			font:{fontSize:13, fontWeight:'bold', fontFamily:'Myriad Pro'}
		});
	
		badge10 = Titanium.UI.createImageView({
			image:IMAGE_PATH+'stars/badges/g/badge10.png',
			top:516,
			left:17,
			badge:10
		});
	
		star10 = Titanium.UI.createImageView({
			image:IMAGE_PATH+'stars/star_1.png',
			top:494,
			left:27
		});
	
		//Label for badge10
		badgeLabel10 = Titanium.UI.createLabel({
			text:BADGE10_LABEL,
			color:'white',
			left:19,
			top:604,
			textAlign:'center',
			width:'80',
			height:'auto',
			font:{fontSize:13, fontWeight:'bold', fontFamily:'Myriad Pro'}
		});
	
		badge11 = Titanium.UI.createImageView({
			image:IMAGE_PATH+'stars/badges/g/badge11.png',
			top:516,
			left:117,
			badge:11
		});
	
		star11 = Titanium.UI.createImageView({
			image:IMAGE_PATH+'stars/star_1.png',
			top:494,
			left:127
		});
	
		//Label for badge11
		badgeLabel11 = Titanium.UI.createLabel({
			text:BADGE11_LABEL,
			color:'white',
			left:119,
			top:604,
			textAlign:'center',
			width:'80',
			height:'auto',
			font:{fontSize:13, fontWeight:'bold', fontFamily:'Myriad Pro'}
		});
	
		badge12 = Titanium.UI.createImageView({
			image:IMAGE_PATH+'stars/badges/g/badge12.png',
			top:516,
			left:217,
			badge:12
		});
	
		star12 = Titanium.UI.createImageView({
			image:IMAGE_PATH+'stars/star_1.png',
			top:494,
			left:227
		});
	
		//Label for badge12
		badgeLabel12 = Titanium.UI.createLabel({
			text:BADGE12_LABEL,
			color:'white',
			left:219,
			top:604,
			textAlign:'center',
			width:'80',
			height:'auto',
			font:{fontSize:13, fontWeight:'bold', fontFamily:'Myriad Pro'}
		});
		
		badge13 = Titanium.UI.createImageView({
			image:IMAGE_PATH+'stars/badges/g/badge13.png',
			top:679,
			left:17,
			badge:13
		});
	
		star13 = Titanium.UI.createImageView({
			image:IMAGE_PATH+'stars/star_1.png',
			top:657,
			left:27
		});
	
		//Label for badge13
		badgeLabel13 = Titanium.UI.createLabel({
			text:BADGE13_LABEL,
			color:'white',
			left:19,
			top:767,
			textAlign:'center',
			width:'80',
			height:'auto',
			font:{fontSize:13, fontWeight:'bold', fontFamily:'Myriad Pro'}
		});
		
		badgeView1.add(badge1);
		badgeView1.add(star1);
		badgeView1.add(badgeLabel1);
		badgeView1.add(badge2);
		badgeView1.add(star2);
		badgeView1.add(badgeLabel2);
		badgeView1.add(badge3);
		badgeView1.add(star3);
		badgeView1.add(badgeLabel3);
		badgeView1.add(badge4);
		badgeView1.add(star4);
		badgeView1.add(badgeLabel4);
		badgeView1.add(badge5);
		badgeView1.add(star5);
		badgeView1.add(badgeLabel5);
		badgeView1.add(badge6);
		badgeView1.add(star6);
		badgeView1.add(badgeLabel6);
		badgeView1.add(badge7);
		badgeView1.add(star7);
		badgeView1.add(badgeLabel7);
		badgeView1.add(badge8);
		badgeView1.add(star8);
		badgeView1.add(badgeLabel8);
		badgeView1.add(badge9);
		badgeView1.add(star9);
		badgeView1.add(badgeLabel9);
		badgeView1.add(badge10);
		badgeView1.add(star10);
		badgeView1.add(badgeLabel10);
		badgeView1.add(badge11);
		badgeView1.add(star11);
		badgeView1.add(badgeLabel11);
		badgeView1.add(badge12);
		badgeView1.add(star12);
		badgeView1.add(badgeLabel12);
		badgeView1.add(badge13);
		badgeView1.add(star13);
		badgeView1.add(badgeLabel13);
		
		//Badges event listeners
		badge1.addEventListener('click', handleBadgeClick);
		badge2.addEventListener('click', handleBadgeClick); 
		badge3.addEventListener('click', handleBadgeClick);
		badge4.addEventListener('click', handleBadgeClick);
		badge5.addEventListener('click', handleBadgeClick);
		badge6.addEventListener('click', handleBadgeClick);
		badge7.addEventListener('click', handleBadgeClick);
		badge8.addEventListener('click', handleBadgeClick);
		badge9.addEventListener('click', handleBadgeClick);
		badge10.addEventListener('click', handleBadgeClick);
		badge11.addEventListener('click', handleBadgeClick);
		badge12.addEventListener('click', handleBadgeClick);
		badge13.addEventListener('click', handleBadgeClick);
		
		updateBadgeView();
		
		viewStars.add(badgeView1);
		viewStars.animate(anim_in);
		
		win.add(viewStars);
		
	} else {
		Ti.API.warn('NOT building StarScroll view - already in progress');
	}
}

function destroyBadgesListView(){
	Ti.API.warn('destroyBadgesListView() called');
	var shouldDestroyView = barImageStars != null;
	if(shouldDestroyView){
		viewStars.animate({opacity:0, duration:400}, function(){
			Ti.API.warn('destroyBadgesListView() fade out complete - destroying UI');
		});
		
		badge1.removeEventListener('click', handleBadgeClick);
		badge2.removeEventListener('click', handleBadgeClick); 
		badge3.removeEventListener('click', handleBadgeClick);
		badge4.removeEventListener('click', handleBadgeClick);
		badge5.removeEventListener('click', handleBadgeClick);
		badge6.removeEventListener('click', handleBadgeClick);
		badge7.removeEventListener('click', handleBadgeClick);
		badge8.removeEventListener('click', handleBadgeClick);
		badge9.removeEventListener('click', handleBadgeClick);
		badge10.removeEventListener('click', handleBadgeClick);
		badge11.removeEventListener('click', handleBadgeClick);
		badge12.removeEventListener('click', handleBadgeClick);
		badge13.removeEventListener('click', handleBadgeClick);
		
		viewStars.remove(iconImageStars);
		barImageStars.remove(iconReflectionImageStars);
		viewStars.remove(titleImageStars);
		viewStars.remove(barImageStars);
		
		///////BADGES///////////
		badgeView1.remove(badge1);
		badgeView1.remove(star1);
		badgeView1.remove(badgeLabel1);
		badgeView1.remove(badge2);
		badgeView1.remove(star2);
		badgeView1.remove(badgeLabel2);
		badgeView1.remove(badge3);
		badgeView1.remove(star3);
		badgeView1.remove(badgeLabel3);
		badgeView1.remove(badge4);
		badgeView1.remove(star4);
		badgeView1.remove(badgeLabel4);
		badgeView1.remove(badge5);
		badgeView1.remove(star5);
		badgeView1.remove(badgeLabel5);
		badgeView1.remove(badge6);
		badgeView1.remove(star6);
		badgeView1.remove(badgeLabel6);
		badgeView1.remove(badge7);
		badgeView1.remove(star7);
		badgeView1.remove(badgeLabel7);
		badgeView1.remove(badge8);
		badgeView1.remove(star8);
		badgeView1.remove(badgeLabel8);
		badgeView1.remove(badge9);
		badgeView1.remove(star9);
		badgeView1.remove(badgeLabel9);
		badgeView1.remove(badge10);
		badgeView1.remove(star10);
		badgeView1.remove(badgeLabel10);
		badgeView1.remove(badge11);
		badgeView1.remove(star11);
		badgeView1.remove(badgeLabel11);
		badgeView1.remove(badge12);
		badgeView1.remove(star12);
		badgeView1.remove(badgeLabel12);
		badgeView1.remove(badge13);
		badgeView1.remove(star13);
		badgeView1.remove(badgeLabel13);
		
		//Bar image
		barImageStars = null;
		iconImageStars = null;
		//Icon image reflection
		iconReflectionImageStars = null;
		//Title image
		titleImageStars = null;
		
		//Badge1 image 
		badge1 = null;
		star1 = null;
		//Label for badge1
		badgeLabel1 = null;
		badge2 = null;
		star2 = null;
		//Label for badge2
		badgeLabel2 = null;
		badge3 = null;
		star3 = null;
		//Label for badge3
		badgeLabel3 = null;
		badge4 = null;
		star4 = null;
		//Label for badge4
		badgeLabel4 = null;
		badge5 = null;
		star5 = null;
		//Label for badge5
		badgeLabel5 = null;
		badge6 = null;
		star6 = null;
		//Label for badge6
		badgeLabel6 = null;
		badge7 = null;
		star7 = null;
		//Label for badge7
		badgeLabel7 = null;
		badge8 = null;
		star8 = null;
		//Label for badge8
		badgeLabel8 = null;
		badge9 = null;
		star9 = null;
		//Label for badge9
		badgeLabel9 = null;
		badge10 = null;
		star10 = null;
		//Label for badge10
		badgeLabel10 = null;
		badge11 = null;
		star11 = null;
		//Label for badge11
		badgeLabel11 = null;
		badge12 = null;
		star12 = null;
		//Label for badge12
		badgeLabel12 = null;
		badge13 = null;
		star13 = null;
		//Label for badge13
		badgeLabel13 = null;
		
		viewStars.remove(badgeView1);
		badgeView1 = null;
		
		win.remove(viewStars);
	} else {
		Ti.API.warn('NOT destroying StarScroll view - already in progress');
	}
}

//Event handler for badge click
function handleBadgeClick(e){
	if(SOUNDS_MODE){
		audioClick.play();	
	}
	
	Ti.API.warn('handleBadgeClick() for '+e.source.badge);
	
	mtbImport("stars_details.js");
	viewStarsDetails.fireEvent('updateUI', {badge:e.source.badge});
}

/*Updates the badges as loaded for the current player*/
function updateBadgeView(){
	if(userLevelBadge1 == 0){
		badge1.image = IMAGE_PATH+'stars/badges/g/badge1.png';
	} else {
		badge1.image = IMAGE_PATH+'stars/badges/n/badge1.png';
	}
		
	if(userLevelBadge1 == 0){
		star1.image = IMAGE_PATH+'stars/star_0.png';
	} else if(userLevelBadge1 == 1){
		star1.image = IMAGE_PATH+'stars/star_1.png';
	} else if(userLevelBadge1 == 2){
		star1.image = IMAGE_PATH+'stars/star_2.png';
	} else if(userLevelBadge1 == 3){
		star1.image = IMAGE_PATH+'stars/star_3.png';
	}
	
	if(userLevelBadge2 == 0){
		badge2.image = IMAGE_PATH+'stars/badges/g/badge2.png';
	} else {
		badge2.image = IMAGE_PATH+'stars/badges/n/badge2.png';
	}
	
	if(userLevelBadge2 == 0){
		star2.image = IMAGE_PATH+'stars/star_0.png';
	} else if(userLevelBadge2 == 1){
		star2.image = IMAGE_PATH+'stars/star_1.png';
	} else if(userLevelBadge2 == 2){
		star2.image = IMAGE_PATH+'stars/star_2.png';
	} else if(userLevelBadge2 == 3){
		star2.image = IMAGE_PATH+'stars/star_3.png';
	}
	
	if(userLevelBadge3 == 0){
		badge3.image = IMAGE_PATH+'stars/badges/g/badge3.png';
	} else {
		badge3.image = IMAGE_PATH+'stars/badges/n/badge3.png';
	}
	
	if(userLevelBadge3 == 0){
		star3.image = IMAGE_PATH+'stars/star_0.png';
	} else if(userLevelBadge3 == 1){
		star3.image = IMAGE_PATH+'stars/star_1.png';
	} else if(userLevelBadge3 == 2){
		star3.image = IMAGE_PATH+'stars/star_2.png';
	} else if(userLevelBadge3 == 3){
		star3.image = IMAGE_PATH+'stars/star_3.png';
	}
	
	if(userLevelBadge4 == 0){
		badge4.image = IMAGE_PATH+'stars/badges/g/badge4.png';
	} else {
		badge4.image = IMAGE_PATH+'stars/badges/n/badge4.png';
	}
	
	if(userLevelBadge4 == 0){
		star4.image = IMAGE_PATH+'stars/star_0.png';
	} else if(userLevelBadge4 == 1){
		star4.image = IMAGE_PATH+'stars/star_1.png';
	} else if(userLevelBadge4 == 2){
		star4.image = IMAGE_PATH+'stars/star_2.png';
	} else if(userLevelBadge4 == 3){
		star4.image = IMAGE_PATH+'stars/star_3.png';
	}
	
	if(userLevelBadge5 == 0){
		badge5.image = IMAGE_PATH+'stars/badges/g/badge5.png';
	} else {
		badge5.image = IMAGE_PATH+'stars/badges/n/badge5.png';
	}
	
	if(userLevelBadge5 == 0){
		star5.image = IMAGE_PATH+'stars/star_0.png';
	} else if(userLevelBadge5 == 1){
		star5.image = IMAGE_PATH+'stars/star_1.png';
	} else if(userLevelBadge5 == 2){
		star5.image = IMAGE_PATH+'stars/star_2.png';
	} else if(userLevelBadge5 == 3){
		star5.image = IMAGE_PATH+'stars/star_3.png';
	}
	
	if(userLevelBadge6 == 0){
		badge6.image = IMAGE_PATH+'stars/badges/g/badge6.png';
	} else {
		badge6.image = IMAGE_PATH+'stars/badges/n/badge6.png';
	}
	
	if(userLevelBadge6 == 0){
		star6.image = IMAGE_PATH+'stars/star_0.png';
	} else if(userLevelBadge6 == 1){
		star6.image = IMAGE_PATH+'stars/star_1.png';
	} else if(userLevelBadge6 == 2){
		star6.image = IMAGE_PATH+'stars/star_2.png';
	} else if(userLevelBadge6 == 3){
		star6.image = IMAGE_PATH+'stars/star_3.png';
	}
	
	if(userLevelBadge7 == 0){
		badge7.image = IMAGE_PATH+'stars/badges/g/badge7.png';
	} else {
		badge7.image = IMAGE_PATH+'stars/badges/n/badge7.png';
	}
	
	if(userLevelBadge7 == 0){
		star7.image = IMAGE_PATH+'stars/star_0.png';
	} else if(userLevelBadge7 == 1){
		star7.image = IMAGE_PATH+'stars/star_1.png';
	} else if(userLevelBadge7 == 2){
		star7.image = IMAGE_PATH+'stars/star_2.png';
	} else if(userLevelBadge7 == 3){
		star7.image = IMAGE_PATH+'stars/star_3.png';
	}
	
	if(userLevelBadge8 == 0){
		badge8.image = IMAGE_PATH+'stars/badges/g/badge8.png';
	} else {
		badge8.image = IMAGE_PATH+'stars/badges/n/badge8.png';
	}	
		
	if(userLevelBadge8 == 0){
		star8.image = IMAGE_PATH+'stars/star_0.png';
	} else if(userLevelBadge8 == 1){
		star8.image = IMAGE_PATH+'stars/star_1.png';
	} else if(userLevelBadge8 == 2){
		star8.image = IMAGE_PATH+'stars/star_2.png';
	} else if(userLevelBadge8 == 3){
		star8.image = IMAGE_PATH+'stars/star_3.png';
	}
	
	if(userLevelBadge9 == 0){
		badge9.image = IMAGE_PATH+'stars/badges/g/badge9.png';
	} else {
		badge9.image = IMAGE_PATH+'stars/badges/n/badge9.png';
	}
	
	if(userLevelBadge9 == 0){
		star9.image = IMAGE_PATH+'stars/star_0.png';
	} else if(userLevelBadge9 == 1){
		star9.image = IMAGE_PATH+'stars/star_1.png';
	} else if(userLevelBadge9 == 2){
		star9.image = IMAGE_PATH+'stars/star_2.png';
	} else if(userLevelBadge9 == 3){
		star9.image = IMAGE_PATH+'stars/star_3.png';
	}
	
	if(userLevelBadge10 == 0){
		badge10.image = IMAGE_PATH+'stars/badges/g/badge10.png';
	} else {
		badge10.image = IMAGE_PATH+'stars/badges/n/badge10.png';
	}
		
	if(userLevelBadge10 == 0){
		star10.image = IMAGE_PATH+'stars/star_0.png';
	} else if(userLevelBadge10 == 1){
		star10.image = IMAGE_PATH+'stars/star_1.png';
	} else if(userLevelBadge10 == 2){
		star10.image = IMAGE_PATH+'stars/star_2.png';
	} else if(userLevelBadge10 == 3){
		star10.image = IMAGE_PATH+'stars/star_3.png';
	}
	
	if(userLevelBadge11 == 0){
		badge11.image = IMAGE_PATH+'stars/badges/g/badge11.png';
	} else {
		badge11.image = IMAGE_PATH+'stars/badges/n/badge11.png';
	}
		
	if(userLevelBadge11 == 0){
		star11.image = IMAGE_PATH+'stars/star_0.png';
	} else if(userLevelBadge11 == 1){
		star11.image = IMAGE_PATH+'stars/star_1.png';
	} else if(userLevelBadge11 == 2){
		star11.image = IMAGE_PATH+'stars/star_2.png';
	} else if(userLevelBadge11 == 3){
		star11.image = IMAGE_PATH+'stars/star_3.png';
	}
	
	if(userLevelBadge12 == 0){
		badge12.image = IMAGE_PATH+'stars/badges/g/badge12.png';
	} else {
		badge12.image = IMAGE_PATH+'stars/badges/n/badge12.png';
	}
		
	if(userLevelBadge12 == 0){
		star12.image = IMAGE_PATH+'stars/star_0.png';
	} else if(userLevelBadge12 == 1){
		star12.image = IMAGE_PATH+'stars/star_1.png';
	} else if(userLevelBadge12 == 2){
		star12.image = IMAGE_PATH+'stars/star_2.png';
	} else if(userLevelBadge12 == 3){
		star12.image = IMAGE_PATH+'stars/star_3.png';
	}
	
	if(userLevelBadge13 == 0){
		badge13.image = IMAGE_PATH+'stars/badges/g/badge13.png';
	} else {
		badge13.image = IMAGE_PATH+'stars/badges/n/badge13.png';
	}
		
	if(userLevelBadge13 == 0){
		star13.image = IMAGE_PATH+'stars/star_0.png';
	} else if(userLevelBadge13 == 1){
		star13.image = IMAGE_PATH+'stars/star_1.png';
	} else if(userLevelBadge13 == 2){
		star13.image = IMAGE_PATH+'stars/star_2.png';
	} else if(userLevelBadge13 == 3){
		star13.image = IMAGE_PATH+'stars/star_3.png';
	}
	
}
