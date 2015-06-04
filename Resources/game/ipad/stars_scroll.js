var BADGE_SUB_DESC_CATEGORIES = 'Πόσοι πόντοι χρειάζονται για κάθε αστέρι?';
var BADGE_SUB_DESC_SPEED = 'Πόσες γρήγορες απαντήσεις χρειάζονται?';
var BADGE_SUB_DESC_BADGES = 'Πόσα παράσημα χρειάζονται?';

//The view
var viewStars = Ti.UI.createView({
	backgroundImage:IMAGE_PATH+'signin/background.jpg',
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
	backgroundImage:IMAGE_PATH+'categories/back.png',
	left:30,
	top:25,
	width:55,
	height:55
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
var BADGE_LABEL_FONTSIZE = 26;

var badgesTitleBackgroundBar = null;
var badgesLogoImage = null;
var badgesTitleLabel = null;
var badgeTransparentBackground1 = null;
var badgeTransparentBackground2 = null;
var badgeTransparentBackground3 = null;
var badgeTransparentBackground4 = null;
var badgeTransparentBackground5 = null;
var badgeTransparentBackground6 = null;

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

function buildBadgesListView(){
	var shouldCreateView = badgesLogoImage == null;
	if(shouldCreateView){
		
		//title background bar
		badgesTitleBackgroundBar = Titanium.UI.createView({
			backgroundColor:'0b4b7f',
			height:192,
			top:0
		});
		
		badgesTitleBackgroundBar.add(backHomeFromStarsButton);
		
		//logo image
		badgesLogoImage = Titanium.UI.createImageView({
			image:IMAGE_PATH+'badges/badges_icon.png',
			top:25,
			right:34
		});
		badgesTitleBackgroundBar.add(badgesLogoImage);
		
		//Name Label value
		badgesTitleLabel = Titanium.UI.createLabel({
			text:'ΠΑΡΑΣΗΜΑ',
			color:'white',
			top:103,
			font:{fontSize:64, fontWeight:'bold', fontFamily:'Myriad Pro'}
		});
		badgesTitleBackgroundBar.add(badgesTitleLabel);
		
		viewStars.add(badgesTitleBackgroundBar);
		
		///////BADGES///////////
		badgeView1 = Ti.UI.createScrollView({
			opacity:1,
			top:200,
			bottom:0,
			left:0,
			right:0,
			contentWidth: 'auto',
		  	contentHeight: 'auto',
		  	showVerticalScrollIndicator: true,
		  	showHorizontalScrollIndicator: true,
		  	height: '75%',
		  	width: '100%',
		});
		
		badgeTransparentBackground1 = Titanium.UI.createView({
			backgroundColor:'transparent',
			height:371,
			width:250,
			top:24,
			left:1
		});
		
		//Badge1 image 
		badge1 = Titanium.UI.createImageView({
			image:IMAGE_PATH+'badges/greyscale/exforge.png',
			top:68,
			badge:1
		});
		badgeTransparentBackground1.add(badge1);
		
		star1 = Titanium.UI.createImageView({
			image:IMAGE_PATH+'stars/star_1.png',
			top:5
		});
		badgeTransparentBackground1.add(star1);
	
		//Label for badge1
		badgeLabel1 = Titanium.UI.createLabel({
			text:BADGE1_LABEL,
			color:'0b4b7f',
			bottom:0,
			textAlign:'center',
			width:160,
			height:'auto',
			font:{fontSize:BADGE_LABEL_FONTSIZE, fontWeight:'bold', fontFamily:'Myriad Pro'}
		});
		badgeTransparentBackground1.add(badgeLabel1);
		
		badgeView1.add(badgeTransparentBackground1);
		
		badgeTransparentBackground2 = Titanium.UI.createView({
			backgroundColor:'transparent',
			height:371,
			width:250,
			top:24
			//left:386
		});
		
		//Badge2 image 
		badge2 = Titanium.UI.createImageView({
			image:IMAGE_PATH+'badges/greyscale/science.png',
			top:68,
			badge:2
		});
		badgeTransparentBackground2.add(badge2);
		
		star2 = Titanium.UI.createImageView({
			image:IMAGE_PATH+'stars/star_1.png',
			top:5
		});
		badgeTransparentBackground2.add(star2);
	
		//Label for badge2
		badgeLabel2 = Titanium.UI.createLabel({
			text:BADGE2_LABEL,
			color:'0b4b7f',
			bottom:0,
			textAlign:'center',
			width:186,
			height:'auto',
			font:{fontSize:BADGE_LABEL_FONTSIZE, fontWeight:'bold', fontFamily:'Myriad Pro'}
		});
		badgeTransparentBackground2.add(badgeLabel2);
		
		badgeView1.add(badgeTransparentBackground2);
		
		badgeTransparentBackground3 = Titanium.UI.createView({
			backgroundColor:'transparent',
			height:371,
			width:250,
			top:24,
			right:1
		});
		
		//Badge3 image 
		badge3 = Titanium.UI.createImageView({
			image:IMAGE_PATH+'badges/greyscale/geo.png',
			top:68,
			badge:3
		});
		badgeTransparentBackground3.add(badge3);
		
		star3 = Titanium.UI.createImageView({
			image:IMAGE_PATH+'stars/star_1.png',
			top:5
		});
		badgeTransparentBackground3.add(star3);
	
		//Label for badge3
		badgeLabel3 = Titanium.UI.createLabel({
			text:BADGE3_LABEL,
			color:'0b4b7f',
			bottom:0,
			textAlign:'center',
			width:175,
			height:'auto',
			font:{fontSize:BADGE_LABEL_FONTSIZE, fontWeight:'bold', fontFamily:'Myriad Pro'}
		});
		badgeTransparentBackground3.add(badgeLabel3);
		
		badgeView1.add(badgeTransparentBackground3);
		
		badgeTransparentBackground4 = Titanium.UI.createView({
			backgroundColor:'transparent',
			height:371,
			width:250,
			top:417,
			left:1
		});
		
		//Badge4 image 
		badge4 = Titanium.UI.createImageView({
			image:IMAGE_PATH+'badges/greyscale/history.png',
			top:68,
			badge:4
		});
		badgeTransparentBackground4.add(badge4);
		
		star4 = Titanium.UI.createImageView({
			image:IMAGE_PATH+'stars/star_1.png',
			top:5
		});
		badgeTransparentBackground4.add(star4);
	
		//Label for badge4
		badgeLabel4 = Titanium.UI.createLabel({
			text:BADGE4_LABEL,
			color:'0b4b7f',
			bottom:0,
			textAlign:'center',
			width:175,
			height:80,
			font:{fontSize:BADGE_LABEL_FONTSIZE, fontWeight:'bold', fontFamily:'Myriad Pro'}
		});
		badgeTransparentBackground4.add(badgeLabel4);
		
		badgeView1.add(badgeTransparentBackground4);
		
		badgeTransparentBackground5 = Titanium.UI.createView({
			backgroundColor:'transparent',
			height:371,
			width:250,
			top:417
			//right:1
		});
		
		//Badge5 image 
		badge5 = Titanium.UI.createImageView({
			image:IMAGE_PATH+'badges/greyscale/sports.png',
			top:68,
			badge:5
		});
		badgeTransparentBackground5.add(badge5);
		
		star5 = Titanium.UI.createImageView({
			image:IMAGE_PATH+'stars/star_1.png',
			top:5
		});
		badgeTransparentBackground5.add(star5);
	
		//Label for badge5
		badgeLabel5 = Titanium.UI.createLabel({
			text:BADGE5_LABEL,
			color:'0b4b7f',
			bottom:0,
			textAlign:'center',
			width:175,
			height:80,
			font:{fontSize:BADGE_LABEL_FONTSIZE, fontWeight:'bold', fontFamily:'Myriad Pro'}
		});
		badgeTransparentBackground5.add(badgeLabel5);
		
		badgeView1.add(badgeTransparentBackground5);
		
		badgeTransparentBackground6 = Titanium.UI.createView({
            backgroundColor:'transparent',
            height:371,
            width:250,
            top:417,
            right:1
        });
		
		//Badge6 image 
        badge6 = Titanium.UI.createImageView({
            image:IMAGE_PATH+'badges/greyscale/lifestyle.png',
            top:68,
            badge:6
        });
        badgeTransparentBackground6.add(badge6);
        
        star6 = Titanium.UI.createImageView({
            image:IMAGE_PATH+'stars/star_1.png',
            top:5
        });
        badgeTransparentBackground6.add(star6);
    
        //Label for badge5
        badgeLabel6 = Titanium.UI.createLabel({
            text:BADGE6_LABEL,
            color:'0b4b7f',
            bottom:0,
            textAlign:'center',
            width:175,
            height:80,
            font:{fontSize:BADGE_LABEL_FONTSIZE, fontWeight:'bold', fontFamily:'Myriad Pro'}
        });
        badgeTransparentBackground6.add(badgeLabel6);
        
        badgeView1.add(badgeTransparentBackground6);
		
		//end badges
		
		viewStars.add(badgeView1);
		
		//Badges event listeners
		badge1.addEventListener('click', handleBadgeClick);
		badge2.addEventListener('click', handleBadgeClick); 
		badge3.addEventListener('click', handleBadgeClick);
		badge4.addEventListener('click', handleBadgeClick);
		badge5.addEventListener('click', handleBadgeClick);
		badge6.addEventListener('click', handleBadgeClick);
		
		updateBadgeView();
		
		win.add(viewStars);
		
	} else {
		Ti.API.warn('NOT building StarScroll view - already in progress');
	}
}

function destroyBadgesListView(){
	Ti.API.warn('destroyBadgesListView() called');
	
	var shouldDestroyView = badgesLogoImage != null;
	if(shouldDestroyView){
		viewStars.animate({opacity:0, duration:400}, function(){
			Ti.API.warn('destroyBadgesListView() fade out complete - destroying UI');
		});
		
		badge1.removeEventListener('click', handleBadgeClick);
		badge2.removeEventListener('click', handleBadgeClick); 
		badge3.removeEventListener('click', handleBadgeClick);
		badge4.removeEventListener('click', handleBadgeClick);
		badge5.removeEventListener('click', handleBadgeClick);
		
		
		///////BADGES///////////
		badgesTitleBackgroundBar.remove(backHomeFromStarsButton);
		badgesTitleBackgroundBar.remove(badgesLogoImage);
		badgesTitleBackgroundBar.remove(badgesTitleLabel);
		viewStars.remove(badgesTitleBackgroundBar);
		
		badgeTransparentBackground1.remove(badge1);
		badgeTransparentBackground1.remove(star1);
		badgeTransparentBackground1.remove(badgeLabel1);
		badgeView1.remove(badgeTransparentBackground1);
		
		badgeTransparentBackground2.remove(badge2);
		badgeTransparentBackground2.remove(star2);
		badgeTransparentBackground2.remove(badgeLabel2);
		badgeView1.remove(badgeTransparentBackground2);
		
		badgeTransparentBackground3.remove(badge3);
		badgeTransparentBackground3.remove(star3);
		badgeTransparentBackground3.remove(badgeLabel3);
		badgeView1.remove(badgeTransparentBackground3);
		
		badgeTransparentBackground4.remove(badge4);
		badgeTransparentBackground4.remove(star4);
		badgeTransparentBackground4.remove(badgeLabel4);
		badgeView1.remove(badgeTransparentBackground4);
		
		badgeTransparentBackground5.remove(badge5);
		badgeTransparentBackground5.remove(star5);
		badgeTransparentBackground5.remove(badgeLabel5);
		badgeView1.remove(badgeTransparentBackground5);
		
		badgesTitleBackgroundBar = null;
		badgesLogoImage = null;
		badgesTitleLabel = null;
		badgeTransparentBackground1 = null;
		badgeTransparentBackground2 = null;
		badgeTransparentBackground3 = null;
		badgeTransparentBackground4 = null;
		badgeTransparentBackground5 = null;
		
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
		badge1.image = IMAGE_PATH+'badges/greyscale/exforge.png';
	} else {
		badge1.image = IMAGE_PATH+'badges/exforge.png';
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
		badge2.image = IMAGE_PATH+'badges/greyscale/science.png';
	} else {
		badge2.image = IMAGE_PATH+'badges/science.png';
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
		badge3.image = IMAGE_PATH+'badges/greyscale/geo.png';
	} else {
		badge3.image = IMAGE_PATH+'badges/geo.png';
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
		badge4.image = IMAGE_PATH+'badges/greyscale/history.png';
	} else {
		badge4.image = IMAGE_PATH+'badges/history.png';
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
		badge5.image = IMAGE_PATH+'badges/greyscale/sports.png';
	} else {
		badge5.image = IMAGE_PATH+'badges/sports.png';
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
	
	//lifestyle
	if(userLevelBadge6 == 0){
        badge6.image = IMAGE_PATH+'badges/greyscale/lifestyle.png';
    } else {
        badge6.image = IMAGE_PATH+'badges/lifestyle.png';
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
}
