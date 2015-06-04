var viewCategories = Ti.UI.createView({
	backgroundImage:IMAGE_PATH+'signin/background.jpg',
	opacity:0,
	top:0,
	bottom:0,
	left:0,
	right:0
});
	
//UI components
var data = null;
var tableViewCategories = null;

var categoriesTitleBackgroundBar = null;
var categoriesBackButton = null;
var categoriesTitleLabel = null;

var CATEGORY_EPISTIMI = 1;
var CATEGORY_EXFORGE = 1000;
var CATEGORY_GEOGRAPHY = 3;
var CATEGORY_SPORT = 4;
var CATEGORY_HISTORY = 6;
var CATEGORY_LIFESTYLE = 10;

//include gameSession
//TODO: is this needed or causing problems?
//var gameSession = require('game/game');

function buildCategoriesView(){
    var start = new Date().getTime();
    
	var shouldCreateView = categoriesTitleLabel == null;
	if(shouldCreateView){
		//e.lapard start
		categoriesGetGameType = gameSession.getGameType();
		//categoriesGetGroupType = gameSession.getGameGroupType();
		
		//title background bar
		categoriesTitleBackgroundBar = Titanium.UI.createView({
			backgroundColor:'0b4b7f',
			height:164,
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
			text:'Ποιά από τις 6 κατηγορίες θέλεις να παίξεις?',
			color:'white',
			textAlign:'center',
			width:364,
			height:74,
			top:52,
			font:{fontSize:31, fontWeight:'semibold', fontFamily:'Myriad Pro'}
		});
		categoriesTitleBackgroundBar.add(categoriesTitleLabel);
		
		viewCategories.add(categoriesTitleBackgroundBar);
		
		//create table view
		tableViewCategories = Titanium.UI.createTableView({
			minRowHeight:100,
			backgroundColor:'transparent',
			separatorStyle:Ti.UI.iPhone.TableViewSeparatorStyle.NONE,
			top:165,
			bottom:0
		});
		
		data = [];
		data.push(createCategoriesRow(CATEGORY_EXFORGE));
		data.push(createCategoriesRow(CATEGORY_EPISTIMI));
		data.push(createCategoriesRow(CATEGORY_GEOGRAPHY));
		data.push(createCategoriesRow(CATEGORY_HISTORY));
		data.push(createCategoriesRow(CATEGORY_SPORT));
		data.push(createCategoriesRow(CATEGORY_LIFESTYLE));
	
		tableViewCategories.setData(data);
		
		viewCategories.add(tableViewCategories);
		
		//Table view CLICK events
		tableViewCategories.addEventListener('click', handleCategorySelection);
		
		//Sync stuff from the server
		//sync();//TODO ask to sync or not
		
		win.add(viewCategories);
		
	} else {
		Ti.API.warn('NOT building Categories view - already in progress');
	}
	
	var end = new Date().getTime();
    var duration = end - start;
    
    Ti.API.info('buildCategoriesView() returns in '+duration+' ms');
}

function destroyCategoriesView(){
	Ti.API.warn('destroyCategoriesView() called');
	
	viewCategories.animate(anim_out);
	
	//Table view CLICK events
	tableViewCategories.removeEventListener('click', handleCategorySelection);
	categoriesBackButton.removeEventListener('click', handleCategoriesBackButton);
	
	categoriesTitleBackgroundBar.remove(categoriesBackButton);
	categoriesTitleBackgroundBar.remove(categoriesTitleLabel);
	viewCategories.remove(categoriesTitleBackgroundBar);
	viewCategories.remove(tableViewCategories);
	tableViewCategories.setData(null);
	
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
	var currentCategoryObject = getCategoryProperties(cat);
	
	var row = Ti.UI.createTableViewRow({
		height:143, 
		backgroundColor:'transparent',
		selectedBackgroundColor:'transparent',
		available:currentCategoryObject.available,
		categoryId:cat
	});
	
	var logo, titleLabel;
	if(cat == CATEGORY_EXFORGE){
		backgroundImage = IMAGE_PATH+'categories/categ_back/exforge.png';
		logo = IMAGE_PATH+'categories/categ/1_exforge.png';
		titleLabel = 'EXFORGE';
		descriptionLabel = 'Η απόλυτη πρόκληση!';
	} else if(cat == CATEGORY_EPISTIMI){
		backgroundImage = IMAGE_PATH+'categories/categ_back/science.png';
		logo = IMAGE_PATH+'categories/categ/2_science.png';
		titleLabel = 'ΕΠΙΣΤΗΜΗ';
		descriptionLabel = 'Τί βαθμό είχες Φυσική και Χημεία?';
	} else if(cat == CATEGORY_GEOGRAPHY){
		backgroundImage = IMAGE_PATH+'categories/categ_back/geo.png';
		logo = IMAGE_PATH+'categories/categ/3_geo.png';
		titleLabel = 'ΓΕΩΓΡΑΦΙΑ';
		descriptionLabel = 'Όσο ταξιδεύεις, τόσο μαθαίνεις!';
	} else if(cat == CATEGORY_HISTORY){
		backgroundImage = IMAGE_PATH+'categories/categ_back/history.png';
		logo = IMAGE_PATH+'categories/categ/4_history.png';
		titleLabel = 'ΙΣΤΟΡΙΑ';
		descriptionLabel = 'Μπες στη μηχανή του χρόνου!';
	} else if(cat == CATEGORY_SPORT){
		backgroundImage = IMAGE_PATH+'categories/categ_back/sports.png';
		logo = IMAGE_PATH+'categories/categ/5_sports.png';
		titleLabel = 'ΑΘΛΗΤΙΚΑ';
		descriptionLabel = 'Σκόραρε και μπες στην 10άδα!';
	} else if(cat == CATEGORY_LIFESTYLE){
        backgroundImage = IMAGE_PATH+'categories/categ_back/lifestyle.png';
        logo = IMAGE_PATH+'categories/categ/6_lifestyle.png';
        titleLabel = 'LIFESTYLE';
        descriptionLabel = 'Πρόκληση με στυλ!';
    }
	
	var rowBackground =  Titanium.UI.createImageView({
		backgroundImage:backgroundImage,
		bottom:0,
		width:768,
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
    //if the popup has never been shown OR if you have played more times than we allow
	if(NEW_CONTENT_POPUP_COUNTER == 0 || (NEW_CONTENT_POPUP_COUNTER > 0 && NEW_CONTENT_POPUP_COUNTER >= NEW_CONTENT_POPUP_MAX_DECLINES_ALLOWED)){
		shouldRenderPopup = true;
	}
    	
	Ti.API.info('NEW_CONTENT_AVAILABLE='+NEW_CONTENT_AVAILABLE+' shouldRenderPopup is '+shouldRenderPopup+" because NEW_CONTENT_POPUP_COUNTER="+NEW_CONTENT_POPUP_COUNTER);
    
    if(e.row.available){
    	if(Titanium.Network.online == true && NEW_CONTENT_AVAILABLE && shouldRenderPopup){
			buildPopupContentUpdate(categoryId);
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
    }
}