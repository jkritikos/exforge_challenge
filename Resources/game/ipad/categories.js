var viewCategories = Ti.UI.createView({
	backgroundImage:IMAGE_PATH+'signin/background.jpg',
	opacity:0,
	top:0,
	bottom:0,
	left:0,
	right:0
});
	
//UI components
/*var label = null;
var categoryTotalBuzz = null;
var categoryScience = null;
var categoryCinema = null;
var categoryGeography = null;
var categorySports = null;
var categoryTech = null;
var categoryHistory = null;
var categoryMusic = null;
var categoryArts = null;
var categoryAnimals = null;
var categoryGossip = null;

var row0 = null;
var row1 = null;
var row2 = null;
var row3 = null;
var row4 = null;
var row5 = null;
var row6 = null;
var row7 = null;
var row8 = null;
var row9 = null;
var row10 = null;
//new components
var textTitleLabel = null;
var categoriesLogoImage = null;
var categoriesLogo = null;
var categoriesGetGameType = null;
var categoriesGetGroupType = null;*/

var data = null;
var tableViewCategories = null;

var categoriesTitleBackgroundBar = null;
var categoriesBackButton = null;
var categoriesTitleLabel = null;

var CATEGORY_EPISTIMI = 1;
var CATEGORY_EXFORGE = 2;
var CATEGORY_GEOGRAPHY = 3;
var CATEGORY_SPORT = 4;
var CATEGORY_HISTORY = 6;

//boolean to see if it solo or not
var categorySoloBoolean = false;

//include gameSession
//TODO: is this needed or causing problems?
//var gameSession = require('game/game');

function buildCategoriesView(){
	var shouldCreateView = categoriesTitleLabel == null;
	if(shouldCreateView){
		//e.lapard start
		categoriesGetGameType = gameSession.getGameType();
		//categoriesGetGroupType = gameSession.getGameGroupType();
		
		//title background bar
		categoriesTitleBackgroundBar = Titanium.UI.createView({
			backgroundColor:'0b4b7f',
			height:192,
			top:0
		});
		
		//back button
		categoriesBackButton = Titanium.UI.createButton({
			backgroundImage:IMAGE_PATH+'categories/back.png',
			left:30,
			top:25,
			width:55,
			height:55
		});
		categoriesTitleBackgroundBar.add(categoriesBackButton);
		
		categoriesBackButton.addEventListener('click', handleCategoriesBackButton);
		
		categoriesTitleLabel = Titanium.UI.createLabel({
			text:'Ποιά από τις 4 κατηγορίες θες να παίξεις?',
			color:'white',
			textAlign:'center',
			width:364,
			height:74,
			top:60,
			font:{fontSize:31, fontWeight:'semibold', fontFamily:'Myriad Pro'}
		});
		categoriesTitleBackgroundBar.add(categoriesTitleLabel);
		
		viewCategories.add(categoriesTitleBackgroundBar);
		
		//check if SOLO, GROUP or TEAMS and give image and label
		/*if(categoriesGetGameType == BUZZ_GAME_SOLO){
			categoriesLogo = IMAGE_PATH+'categories/r/logo/solo.png';
			textTitleLabel = 'Ποια από τις 11 κατηγορίες θέλεις να παίξεις?';
			categorySoloBoolean = true;
		}else if(categoriesGetGameType == BUZZ_GAME_GROUP){
			if(categoriesGetGroupType == BUZZ_GROUP_TYPE_PLAYERS){
				categoriesLogo = IMAGE_PATH+'categories/r/logo/icon_group.png';
				textTitleLabel = 'Ποια από τις 11 κατηγορίες θέλετε να παίξετε?';
			}else if(categoriesGetGroupType == BUZZ_GROUP_TYPE_TEAMS) {
				categoriesLogo = IMAGE_PATH+'categories/r/logo/icon_teams.png';
				textTitleLabel = 'Ποια από τις 11 κατηγορίες θέλετε να παίξετε?';
			}
		}
		
		categoriesLogoImage = Ti.UI.createImageView({
			image:categoriesLogo,
			right:categorySoloBoolean ? 30 : 15,
			top:categorySoloBoolean ? 20 : 15
		});
			
		//viewCategories.add(categoriesLogoImage);
		//e.lapard end
		
		label = Titanium.UI.createLabel({
			text:textTitleLabel,
			color:'white',
			top:112,
			textAlign:'center',
			shadowColor:'#000000',
		    shadowOffset:{x:1,y:1},
			font:{fontSize:30, fontWeight:'bold', fontFamily:'Myriad Pro'}
		});*/
		
		//viewCategories.add(label);
		
		//Create image views
		/*categoryTotalBuzz = Titanium.UI.createButton({
			backgroundImage:IS_FREE_APP == 0 ? IMAGE_PATH+'categories/r/totalbuzz.png' : IMAGE_PATH+'categories/d/totalbuzz.png',
			clickName:CAT_TOTALBUZZ,
			width:564,
			height:121,
			available:getCategoryProperties(CAT_TOTALBUZZ).available
		});
		
		//Create image views
		categoryScience = Titanium.UI.createButton({
			backgroundImage:IS_FREE_APP == 0 ? IMAGE_PATH+'categories/r/epistimi.png' : IMAGE_PATH+'categories/d/epistimi.png',
			width:564,
			height:121,
			clickName:CAT_EPISTIMI,
			available:getCategoryProperties(CAT_EPISTIMI).available
		});
	
		categoryCinema = Titanium.UI.createButton({
			backgroundImage:IMAGE_PATH+'categories/r/kinimatografos.png',
			width:564,
			height:121,
			clickName:CAT_KINIMATOGRAFOS,
			available:getCategoryProperties(CAT_KINIMATOGRAFOS).available
		});
	
		categoryGeography = Titanium.UI.createButton({
			backgroundImage:IS_FREE_APP == 0 ? IMAGE_PATH+'categories/r/geografia.png' : IMAGE_PATH+'categories/d/geografia.png',
			width:564,
			height:121,
			clickName:CAT_GEOGRAFIA,
			available:getCategoryProperties(CAT_GEOGRAFIA).available
		});
		
		categorySports = Titanium.UI.createButton({
			backgroundImage:IMAGE_PATH+'categories/r/athlitika.png',
			width:564,
			height:121,
			clickName:CAT_ATHLITIKA,
			available:getCategoryProperties(CAT_ATHLITIKA).available
		});
	
		categoryTech = Titanium.UI.createButton({
			backgroundImage:IS_FREE_APP == 0 ? IMAGE_PATH+'categories/r/texnologia.png' : IMAGE_PATH+'categories/d/texnologia.png',
			width:564,
			height:121,
			clickName:CAT_TEXNOLOGIA,
			available:getCategoryProperties(CAT_TEXNOLOGIA).available
		});
	
		categoryHistory = Titanium.UI.createButton({
			backgroundImage:IMAGE_PATH+'categories/r/istoria.png',
			width:564,
			height:121,
			clickName:CAT_ISTORIA,
			available:getCategoryProperties(CAT_ISTORIA).available
		});
		
		categoryMusic = Titanium.UI.createButton({
			backgroundImage:IS_FREE_APP == 0 ? IMAGE_PATH+'categories/r/mousiki.png' : IMAGE_PATH+'categories/d/mousiki.png',
			width:564,
			height:121,
			clickName:CAT_MOUSIKH,
			available:getCategoryProperties(CAT_MOUSIKH).available
		});
	
		categoryArts = Titanium.UI.createButton({
			backgroundImage:IS_FREE_APP == 0 ? IMAGE_PATH+'categories/r/texnes.png' : IMAGE_PATH+'categories/d/texnes.png',
			width:564,
			height:121,
			clickName:CAT_TEXNES,
			available:getCategoryProperties(CAT_TEXNES).available
		});
	
		categoryAnimals = Titanium.UI.createButton({
			backgroundImage:IS_FREE_APP == 0 ? IMAGE_PATH+'categories/r/zoafuta.png' : IMAGE_PATH+'categories/d/zoafuta.png',
			width:564,
			height:121,
			clickName:CAT_ZWAFUTA,
			available:getCategoryProperties(CAT_ZWAFUTA).available
		});
	
		categoryGossip = Titanium.UI.createButton({
			backgroundImage:IS_FREE_APP == 0 ? IMAGE_PATH+'categories/r/lifestyle.png' : IMAGE_PATH+'categories/d/lifestyle.png',
			width:564,
			height:121,
			clickName:CAT_LIFESTYLE,
			available:getCategoryProperties(CAT_LIFESTYLE).available
		});*/
		
		//create table view
		tableViewCategories = Titanium.UI.createTableView({
			minRowHeight:100,
			backgroundColor:'transparent',
			separatorStyle:Ti.UI.iPhone.TableViewSeparatorStyle.NONE,
			top:193,
			bottom:16
		});
		
		/*row0 = Ti.UI.createTableViewRow({
			height:163, 
			backgroundColor:'transparent',
			selectedBackgroundColor:'transparent'
		});
		
		row1 = Ti.UI.createTableViewRow({
			height:163, 
			backgroundColor:'transparent',
			selectedBackgroundColor:'transparent'
		});
	
		row2 = Ti.UI.createTableViewRow({
			height:163, 
			backgroundColor:'transparent',
			selectedBackgroundColor:'transparent'
		});
	
		row3 = Ti.UI.createTableViewRow({
			height:163, 
			backgroundColor:'transparent',
			selectedBackgroundColor:'transparent'
		});
	
		row4 = Ti.UI.createTableViewRow({
			height:163, 
			backgroundColor:'transparent',
			selectedBackgroundColor:'transparent'
		});*/
		
		data = [];
		data.push(createCategoriesRow(CATEGORY_EXFORGE));
		data.push(createCategoriesRow(CATEGORY_EPISTIMI));
		data.push(createCategoriesRow(CATEGORY_GEOGRAPHY));
		data.push(createCategoriesRow(CATEGORY_HISTORY));
		data.push(createCategoriesRow(CATEGORY_SPORT));
	
		tableViewCategories.setData(data);
		
		viewCategories.add(tableViewCategories);
		
		//Table view CLICK events
		tableViewCategories.addEventListener('click', handleCategorySelection);
		
		//Sync stuff from the server
		//sync();
		
		win.add(viewCategories);
	} else {
		Ti.API.warn('NOT building Categories view - already in progress');
	}
}

function destroyCategoriesView(){
	Ti.API.warn('destroyCategoriesView() called');
	
	viewCategories.animate(anim_out);
	
	//Table view CLICK events
	tableViewCategories.removeEventListener('click', handleCategorySelection);
	
	categoriesTitleBackgroundBar.remove(categoriesBackButton);
	categoriesTitleBackgroundBar.remove(categoriesTitleLabel);
	viewCategories.remove(categoriesTitleBackgroundBar);
	viewCategories.remove(tableViewCategories);
	tableViewCategories.setData(null);
	
	/*row0.remove(categoryTotalBuzz);
	row1.remove(categoryScience);
	row2.remove(categoryCinema);
	row3.remove(categoryGeography);
	row4.remove(categorySports);
	row5.remove(categoryTech);
	row6.remove(categoryHistory);
	row7.remove(categoryMusic);
	row8.remove(categoryArts);
	row9.remove(categoryAnimals);
	row10.remove(categoryGossip);
	viewCategories.remove(label);*/
	//Logo image 
	//viewCategories.remove(categoriesLogoImage);
	
	//data = null;
	
	//label = null;
	
	//Create image views
	/*categoryTotalBuzz = null;
	categoryScience = null;
	categoryCinema = null;
	categoryGeography = null;
	categorySports = null;
	categoryTech = null;
	categoryHistory = null;
	categoryMusic = null;
	categoryArts = null;
	categoryAnimals = null;
	categoryGossip = null;*/
	
	//create table view
	//tableView = null;
	
	/*row0 = null;
	row1 = null;
	row2 = null;
	row3 = null;
	row4 = null;
	row5 = null;
	row6 = null;
	row7 = null;
	row8 = null;
	row9 = null;
	row10 = null;
	
	//new variables
	textTitleLabel = null;
	categoriesLogoImage = null;
	categoriesLogo = null;
	categoriesGetGameType = null;
	categoriesGetGroupType = null;
	categorySoloBoolean = null;*/
	
	data = null;
	tableViewCategories = null;
	
	categoriesTitleBackgroundBar = null;
	categoriesBackButton = null;
	categoriesTitleLabel = null;
	
	win.remove(viewCategories);
}

function handleCategoriesBackButton(){
	if(SOUNDS_MODE){
		audioBack.play();
	}
	Ti.API.info('START clicked');
	
	destroyCategoriesView();
}

//Creates a single row for the categories table
function createCategoriesRow(cat){
	
	var row = Ti.UI.createTableViewRow({
		height:163, 
		backgroundColor:'transparent',
		selectedBackgroundColor:'transparent',
		categoryId:cat
	});
	
	var logo, titleLabel;
	if(cat == CATEGORY_EXFORGE){
		backgroundColor = 'fb494a';
		logo = IMAGE_PATH+'categories/categ/1_exforge.png';
		titleLabel = 'EXFORGE';
		descriptionLabel = 'Η απόλυτη πρόκληση!';
	} else if(cat == CATEGORY_EPISTIMI){
		backgroundColor = '6fb042';
		logo = IMAGE_PATH+'categories/categ/2_science.png';
		titleLabel = 'ΕΠΙΣΤΗΜΗ';
		descriptionLabel = 'Τί βαθμό είχες Φυσική και Χημεία?';
	} else if(cat == CATEGORY_GEOGRAPHY){
		backgroundColor = '569bd4';
		logo = IMAGE_PATH+'categories/categ/3_geo.png';
		titleLabel = 'ΓΕΩΓΡΑΦΙΑ';
		descriptionLabel = 'Όσο ταξιδεύεις, τόσο μαθαίνεις!';
	} else if(cat == CATEGORY_HISTORY){
		backgroundColor = 'fb9a01';
		logo = IMAGE_PATH+'categories/categ/4_history.png';
		titleLabel = 'ΙΣΤΟΡΙΑ';
		descriptionLabel = 'Μπες στη μηχανή του χρόνου!';
	} else if(cat == CATEGORY_SPORT){
		backgroundColor = '9b52e7';
		logo = IMAGE_PATH+'categories/categ/5_sports.png';
		titleLabel = 'ΑΘΛΗΤΙΚΑ';
		descriptionLabel = 'Σκόραρε και μπες στην 10άδα!';
	}
	
	var rowBackground =  Titanium.UI.createView({
		backgroundColor:backgroundColor,
		bottom:0,
		height:145
	});
	
	var rowLogo =  Titanium.UI.createImageView({
		image:logo,
		left:13
	});
	rowBackground.add(rowLogo);
	
	var rowArrow =  Titanium.UI.createImageView({
		image:IMAGE_PATH+'categories/arrow.png',
		right:32
	});
	rowBackground.add(rowArrow);
	
	var rowTitleLabel = Titanium.UI.createLabel({
		text:titleLabel,
		color:'white',
		textAlign:'left',
		height:31,
		top:38,
		left:186,
		font:{fontSize:40, fontWeight:'bold', fontFamily:'Myriad Pro'}
	});
	rowBackground.add(rowTitleLabel);
	
	var rowDescriptionLabel = Titanium.UI.createLabel({
		text:descriptionLabel,
		color:'white',
		textAlign:'left',
		height:25,
		bottom:29,
		left:186,
		font:{fontSize:25, fontWeight:'semibold', fontFamily:'Myriad Pro'}
	});
	rowBackground.add(rowDescriptionLabel);
	
	row.add(rowBackground);
	
	return row;	
}

//Event handler for category selection
function handleCategorySelection(e){
	if(SOUNDS_MODE){
		audioClick.play();
	}
	
	//Force an update if we have to
	if(FORCE_BUZZ_UPDATE){
		forceAppUpdate();
	}
	
	var currentSoloPlayer = getCurrentPlayer();
	
	var tmpPlayerObj = {
		validated:true,
		name:currentSoloPlayer.name,
		player_id:currentSoloPlayer.id,
		playerIndex:0,
		avatarIndex:0
	};
	
	var tmpPlayerObjList = [];
	tmpPlayerObjList.push(tmpPlayerObj);
	gameSession.setTmpPlayerNames(tmpPlayerObjList);
	
	
	mtbImport("loader.js");
	
	var targetCategoryIcon = '';
	var targetCategoryLabel = '';
	var categoryId = e.row.categoryId;
	
	var categoryPropeties = getCategoryProperties(categoryId);
	targetCategoryIcon = categoryPropeties.loader;
	targetCategoryLabel = categoryPropeties.name;
	
    var shouldRenderPopup = false;
    
    //START game
    viewLoader.fireEvent('loaderStart', {currentCategoryIcon:targetCategoryIcon, currentCategoryLabel:targetCategoryLabel, categoryId:categoryId});
    fadeIntroAudioOut();
    viewLoader.animate({opacity:1, duration:400}, function(){
    	destroyCategoriesView();
    });
	//if the popup has never been shown OR if you have played more times than we allow
	/*if(NEW_CONTENT_POPUP_COUNTER == 0 || (NEW_CONTENT_POPUP_COUNTER > 0 && NEW_CONTENT_POPUP_COUNTER >= NEW_CONTENT_POPUP_MAX_DECLINES_ALLOWED)){
		shouldRenderPopup = true;
	}
    	
	Ti.API.info('NEW_CONTENT_AVAILABLE='+NEW_CONTENT_AVAILABLE+' shouldRenderPopup is '+shouldRenderPopup+" because NEW_CONTENT_POPUP_COUNTER="+NEW_CONTENT_POPUP_COUNTER);

	if( (IS_FREE_APP == 0) || (e.source.available && IS_FREE_APP==1) ){	
		if(Titanium.Network.online == true && NEW_CONTENT_AVAILABLE && shouldRenderPopup){
			buildPopupContentUpdate();
			NEW_CONTENT_POPUP_COUNTER = 0;
		} else {
			
			//Increment the content update bypass counter
			if(NEW_CONTENT_AVAILABLE){
				NEW_CONTENT_POPUP_COUNTER++;
			}
			
			//START game
		    viewLoader.fireEvent('loaderStart', {currentCategoryIcon:targetCategoryIcon, currentCategoryLabel:targetCategoryLabel, categoryId:categoryId});
		    fadeIntroAudioOut();
		    viewLoader.animate({opacity:1, duration:400}, function(){
		    	destroyCategoriesView();
		    });
		}
	} else {
		//Show the purchase application popup
		var purchasePopup = buildPurchaseApplicationPopup();
		viewCategories.add(purchasePopup);
		purchasePopup.animate({transform:SCALE_ONE, duration:400});
	}*/
}