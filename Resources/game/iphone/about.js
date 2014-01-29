//About pages constants
var ABOUT_PAGE_HOWTO = 1;
var ABOUT_PAGE_TIPS = 2;
var ABOUT_PAGE_BADGES = 3;
var ABOUT_PAGE_ABOUTUS = 4;
var ABOUT_PAGE_CREDITS = 5;

//About view
var viewAbout = Ti.UI.createView({
	backgroundImage:IMAGE_PATH+'background.jpg',
	opacity:0,
	top:0,
	bottom:0,
	left:0,
	right:0
});

//back button
var backHomeAboutButton = Titanium.UI.createButton({
	backgroundImage:IMAGE_PATH+'back.png',
	backgroundSelectedImage:IMAGE_PATH+'back_green.png',
	left:8,
	top:8,
	height:30,
	width:30
});

viewAbout.add(backHomeAboutButton);

//Back button event listener
backHomeAboutButton.addEventListener('click', function() {
	if(SOUNDS_MODE){
		audioBack.play();
	}
	
	Ti.API.info('BACK to home clicked from about.');
	destroyAboutView();
	viewAbout.animate(anim_out);
});

//UI components
var iconImageAbout = null;
var barImageAbout = null;
var iconReflectionImageAbout = null;
var titleImageAbout = null;
var aboutMenuArrowImage = null;

var aboutTableMenu = null;
var aboutTableData = null;

function buildAboutView(){
	var shouldCreateView = iconImageAbout == null;
	if(shouldCreateView){
	
		//Icon image
		iconImageAbout = Titanium.UI.createImageView({
			image:IMAGE_PATH+'about/icon.png',
			top:20,
			right:15
		});
		
		viewAbout.add(iconImageAbout);
		
		//Bar image
		barImageAbout = Titanium.UI.createImageView({
			image:IMAGE_PATH+'top/bar.png',
			top:58
		});
		
		viewAbout.add(barImageAbout);
		
		//Icon image reflection
		iconReflectionImageAbout = Titanium.UI.createImageView({
			image:IMAGE_PATH+'about/icon_r.png',
			top:0,
			right:14
		});
		
		barImageAbout.add(iconReflectionImageAbout);
		
		//Title image
		titleImageAbout = Titanium.UI.createImageView({
			image:IMAGE_PATH+'about/title.png',
			top:27,
			zIndex:2
		});
		
		viewAbout.add(titleImageAbout);
		
		aboutMenuArrowImage = Titanium.UI.createImageView({
			image:IMAGE_PATH+'about/arrow.png',
			top:130
		});
		
		viewAbout.add(aboutMenuArrowImage);
		
		//top menu table
		aboutTableMenu = Titanium.UI.createTableView({
			data:[],
			backgroundColor:'transparent',
			separatorStyle:Ti.UI.iPhone.TableViewSeparatorStyle.NONE,
			top:160,
			bottom:20
		});
		
		aboutTableData = [];
		aboutTableData.push(buildAboutMenuTableRow(ABOUT_PAGE_HOWTO));
		aboutTableData.push(buildAboutMenuTableRow(ABOUT_PAGE_TIPS));
		aboutTableData.push(buildAboutMenuTableRow(ABOUT_PAGE_BADGES));
		aboutTableData.push(buildAboutMenuTableRow(ABOUT_PAGE_ABOUTUS));
		aboutTableData.push(buildAboutMenuTableRow(ABOUT_PAGE_CREDITS));
		aboutTableMenu.setData(aboutTableData);
		
		viewAbout.add(aboutTableMenu);
		aboutTableMenu.addEventListener('click', handleAboutMenuTableClick);
		
		win.add(viewAbout);
	} else {
		Ti.API.warn('NOT building About view - already in progress');
	}
}

function destroyAboutView(){
	var shouldDestroyView = iconImageAbout != null;
	if(shouldDestroyView){
		
		//Remove listeners
		aboutTableMenu.removeEventListener('click', handleAboutMenuTableClick);
		
		//Remove components
		barImageAbout.remove(iconReflectionImageAbout);
		viewAbout.remove(barImageAbout);
		viewAbout.remove(titleImageAbout);
		viewAbout.remove(iconImageAbout);
		viewAbout.remove(aboutMenuArrowImage);
		viewAbout.remove(aboutTableMenu);
		
		//Destroy components
		barImageAbout = null;
		iconImageAbout = null;
		//Icon image reflection
		iconReflectionImageAbout = null;	
		//Title image
		titleImageAbout = null;
		aboutMenuArrowImage = null;
		//top menu table
		aboutTableMenu = null;
		aboutTableData = null;
		
		win.remove(viewAbout);
	} else {
		Ti.API.warn('NOT destroying About view - already in progress');
	}
}

/*Creates and returns a table row for the about menu table*/
function buildAboutMenuTableRow(type){
	
	var rowTitle = '';
	if(type == ABOUT_PAGE_ABOUTUS){
		rowTitle = 'ABOUT US';
	} else if(type == ABOUT_PAGE_BADGES){
		rowTitle = 'WIN BADGES';
	} else if(type == ABOUT_PAGE_HOWTO){
		rowTitle = 'HOW TO PLAY';
	} else if(type == ABOUT_PAGE_TIPS){
		rowTitle = 'TIPS & TRICKS';
	} else if(type == ABOUT_PAGE_CREDITS){
		rowTitle = 'CREDITS';
	}
	
	var row1 = Ti.UI.createTableViewRow({
		width:'299',
		height:60, 
		selectedBackgroundColor:'white',
		className:'ABOUT_MENU',
		aboutType:type
	});
	
	//Create category image view
	var bgImage = Titanium.UI.createImageView({
		image:IMAGE_PATH+'top/rowbg.png'
	});
	
	var label = Titanium.UI.createLabel({
		text:rowTitle,
		color:'#fc0309',
		top:24,
		//shadowColor:'#000000',
	    //shadowOffset:{x:1,y:1},
		font:{fontSize:20, fontWeight:'bold', fontFamily:'321impact'}
	});
	
	row1.add(bgImage);
	row1.add(label);
	return row1;
}

//Event handler for the about main menu
function handleAboutMenuTableClick(e){
	Ti.API.info('handleAboutMenuTableClick() called for type '+e.row.aboutType);
	
	if(e.row.aboutType != ABOUT_PAGE_CREDITS){
		mtbImport('about_info.js');
		
		buildAboutInfo(e.row.aboutType);
		viewAboutInfo.animate(anim_in);
	} else {
		mtbImport('about_credits.js');
		
		buildAboutCredits();
		viewAboutCredits.animate(anim_in);
	}
}
