//About pages constants
var TIPS_GAME = 1;
var TIPS_USEFUL = 2;
var TIPS_BADGES = 3;

//About view
var viewTips = Ti.UI.createView({
	backgroundImage:IMAGE_PATH+'signin/background.jpg',
	opacity:0,
	top:0,
	bottom:0,
	left:0,
	right:0
});

//back button
var backHomeTipsButton = Titanium.UI.createButton({
	backgroundImage:IMAGE_PATH+'categories/back.png',
	left:30,
	top:25,
	width:55,
	height:55
});

//Back button event listener
backHomeTipsButton.addEventListener('click', function() {
	if(SOUNDS_MODE){
		audioBack.play();
	}
	
	Ti.API.info('BACK to home clicked from tips.');
	destroyTipsView();
	viewTips.animate(anim_out);
});

//UI components
var iconImageAbout = null;
var barImageAbout = null;
var iconReflectionImageAbout = null;
var titleImageAbout = null;
var aboutMenuArrowImage = null;

var tipsTableMenu = null;
var aboutTableData = null;

function buildTipsView(){
	var shouldCreateView = iconImageAbout == null;
	if(shouldCreateView){
		
		//title background bar
		var tipsTitleBackgroundBar = Titanium.UI.createView({
			backgroundColor:'fb494a',
			height:192,
			top:0
		});
		
		tipsTitleBackgroundBar.add(backHomeTipsButton);
		
		//Name Label value
		var tipsTitleLabel = Titanium.UI.createLabel({
			text:'ΟΔΗΓΙΕΣ',
			color:'white',
			top:103,
			font:{fontSize:64, fontWeight:'bold', fontFamily:'Myriad Pro'}
		});
		tipsTitleBackgroundBar.add(tipsTitleLabel);
		
		viewTips.add(tipsTitleBackgroundBar);
		
		//top menu table
		tipsTableMenu = Titanium.UI.createTableView({
			data:[],
			backgroundColor:'transparent',
			separatorStyle:Ti.UI.iPhone.TableViewSeparatorStyle.NONE,
			top:278,
			bottom:20
		});
		
		tipsTableData = [];
		tipsTableData.push(buildTipsMenuTableRow(TIPS_GAME));
		tipsTableData.push(buildTipsMenuTableRow(TIPS_USEFUL));
		tipsTableData.push(buildTipsMenuTableRow(TIPS_BADGES));
		tipsTableMenu.setData(tipsTableData);
		
		viewTips.add(tipsTableMenu);
		tipsTableMenu.addEventListener('click', handleTipsMenuTableClick);
		
		//Icon image
		iconImageAbout = Titanium.UI.createImageView({
			image:IMAGE_PATH+'about/icon.png',
			top:16,
			right:15
		});
		
		//viewAbout.add(iconImageAbout);
		
		//Bar image
		barImageAbout = Titanium.UI.createImageView({
			image:IMAGE_PATH+'top/bar.png',
			top:108
		});
		
		//viewAbout.add(barImageAbout);
		
		//Icon image reflection
		iconReflectionImageAbout = Titanium.UI.createImageView({
			image:IMAGE_PATH+'about/icon_r.png',
			top:1,
			right:15
		});
		
		barImageAbout.add(iconReflectionImageAbout);
		
		//Title image
		titleImageAbout = Titanium.UI.createImageView({
			image:IMAGE_PATH+'about/title.png',
			top:49,
			zIndex:2
		});
		
		//viewAbout.add(titleImageAbout);
		
		aboutMenuArrowImage = Titanium.UI.createImageView({
			image:IMAGE_PATH+'about/arrow.png',
			top:250
		});
		
		//viewAbout.add(aboutMenuArrowImage);
		
		win.add(viewTips);
	} else {
		Ti.API.warn('NOT building Tips view - already in progress');
	}
}

function destroyTipsView(){
	var shouldDestroyView = iconImageAbout != null;
	if(shouldDestroyView){
		
		//Remove listeners
		tipsTableMenu.removeEventListener('click', handleTipsMenuTableClick);
		
		//Remove components
		barImageAbout.remove(iconReflectionImageAbout);
		//viewAbout.remove(barImageAbout);
		//viewAbout.remove(titleImageAbout);
		//viewAbout.remove(iconImageAbout);
		//viewAbout.remove(aboutMenuArrowImage);
		viewTips.remove(tipsTableMenu);
		
		//Destroy components
		barImageAbout = null;
		iconImageAbout = null;
		//Icon image reflection
		iconReflectionImageAbout = null;	
		//Title image
		titleImageAbout = null;
		aboutMenuArrowImage = null;
		//top menu table
		tipsTableMenu = null;
		aboutTableData = null;
		
		win.remove(viewTips);
	} else {
		Ti.API.warn('NOT destroying About view - already in progress');
	}
}

/*Creates and returns a table row for the about menu table*/
function buildTipsMenuTableRow(type){
	
	var rowTitle = '';
	var rowLogo = '';
	if(type == TIPS_GAME){
		rowTitle = 'ΟΔΗΓΙΕΣ ΠΑΙΧΝΙΔΙΟΥ';
		rowLogo = IMAGE_PATH+'settings/icon_odigies.png';
	} else if(type == TIPS_USEFUL){
		rowTitle = 'ΧΡΗΣΙΜΑ TIPS';
		rowLogo = IMAGE_PATH+'settings/icon_tips.png';
	} else if(type == TIPS_BADGES){
		rowTitle = 'ΠΑΡΑΣΗΜΑ';
		rowLogo = IMAGE_PATH+'settings/icon_badges.png';
	}
	
	var row1 = Ti.UI.createTableViewRow({
		width:800,
		height:162,
		selectedBackgroundColor:'transparent',
		className:'ABOUT_MENU',
		tipType:type
	});
	
	var rowBackground1 = Ti.UI.createView({
		height:145,
		bottom:0,
		backgroundColor:'0b4b7f'
	});
	
	var rowLogoImage1 = Ti.UI.createImageView({
		image:rowLogo,
		left:32
	});
	
	var rowArrowImage1 = Ti.UI.createImageView({
		image:IMAGE_PATH+'categories/arrow.png',
		right:33
	});
	
	var rowlabel1 = Titanium.UI.createLabel({
		text:rowTitle,
		top:55,
		left:154,
		color:'white',
		font:{fontSize:39, fontWeight:'bold', fontFamily:'Myriad Pro'}
	});
	
	rowBackground1.add(rowLogoImage1);
	rowBackground1.add(rowArrowImage1);
	rowBackground1.add(rowlabel1);
	row1.add(rowBackground1);
	
	return row1;
}

//Event handler for the about main menu
function handleTipsMenuTableClick(e){
	Ti.API.info('handleTipsMenuTableClick() called for type '+e.row.aboutType);
	
	mtbImport('tips_details.js');
	
	buildTipsDetails(e.row.tipType);
	viewTipsDetails.animate(anim_in);
}