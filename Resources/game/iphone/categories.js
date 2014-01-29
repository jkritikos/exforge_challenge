var view = Ti.UI.createView({
	backgroundImage:IMAGE_PATH+'background.jpg',
	opacity:0,
	top:0,
	bottom:0,
	left:0,
	right:0,
	zIndex:50
});
	
var backButton = Titanium.UI.createButton({
	backgroundImage:IMAGE_PATH+'back.png',
	backgroundSelectedImage:IMAGE_PATH+'back_green.png',
	left:8,
	top:8,
	height:30,
	width:30
});

view.add(backButton);

backButton.addEventListener('click', function()	{
	if(SOUNDS_MODE){
		audioBack.play();
	}
	Ti.API.info('START clicked');
	
	destroyCategoriesView();
});
	
//UI components
var label = null;
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
var data = null;
var tableViewCategories = null;
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
var categoriesGetGroupType = null;

//boolean to see if it solo or not
var categorySoloBoolean = false;

//include gameSession
//TODO: is this needed or causing problems?
//var gameSession = require('game/game');

function buildCategoriesView(){
	var shouldCreateView = categoryTotalBuzz == null;
	if(shouldCreateView){
		//e.lapard start
		categoriesGetGameType = gameSession.getGameType();
		categoriesGetGroupType = gameSession.getGameGroupType();
		
		//check if SOLO, GROUP or TEAMS and give image and label
		if(categoriesGetGameType == BUZZ_GAME_SOLO){
			categoriesLogo = IMAGE_PATH+'categories/r/logo/solo.png';
			textTitleLabel = 'Ποια από τις 11 κατηγορίες \nθέλεις να παίξεις?';
			categorySoloBoolean = true;
		}else if(categoriesGetGameType == BUZZ_GAME_GROUP){
			if(categoriesGetGroupType == BUZZ_GROUP_TYPE_PLAYERS){
				categoriesLogo = IMAGE_PATH+'categories/r/logo/icon_group.png';
				textTitleLabel = 'Ποια από τις 11 κατηγορίες \nθέλετε να παίξετε?';
			}else if(categoriesGetGroupType == BUZZ_GROUP_TYPE_TEAMS) {
				categoriesLogo = IMAGE_PATH+'categories/r/logo/icon_group.png';
				textTitleLabel = 'Ποια από τις 11 κατηγορίες \nθέλετε να παίξετε?';
			}
		}
		
		categoriesLogoImage = Ti.UI.createImageView({
			image:categoriesLogo,
			right:categorySoloBoolean ? 6 : 6,
			top:categorySoloBoolean ? 6 : 5
		});
			
		view.add(categoriesLogoImage);
		//e.lapard end
		
		label = Titanium.UI.createLabel({
			text:textTitleLabel,
			color:'white',
			top:54,
			textAlign:'center',
			shadowColor:'#000000',
		    shadowOffset:{x:1,y:1},
			font:{fontSize:18, fontWeight:'bold', fontFamily:'Myriad Pro'}
		});
		
		view.add(label);
		
		//Create image views
		categoryTotalBuzz = Titanium.UI.createButton({
			backgroundImage:IS_FREE_APP == 0 ? IMAGE_PATH+'categories/r/totalbuzz.png' : IMAGE_PATH+'categories/d/totalbuzz.png',
			clickName:CAT_TOTALBUZZ,
			width:299,
			height:62,
			available:getCategoryProperties(CAT_TOTALBUZZ).available
		});
		
		//Create image views
		categoryScience = Titanium.UI.createButton({
			backgroundImage:IS_FREE_APP == 0 ? IMAGE_PATH+'categories/r/epistimi.png' : IMAGE_PATH+'categories/d/epistimi.png',
			width:299,
			height:62,
			clickName:CAT_EPISTIMI,
			available:getCategoryProperties(CAT_EPISTIMI).available
		});
	
		categoryCinema = Titanium.UI.createButton({
			backgroundImage:IMAGE_PATH+'categories/r/kinimatografos.png',
			width:299,
			height:62,
			clickName:CAT_KINIMATOGRAFOS,
			available:getCategoryProperties(CAT_KINIMATOGRAFOS).available
		});
	
		categoryGeography = Titanium.UI.createButton({
			backgroundImage:IS_FREE_APP == 0 ? IMAGE_PATH+'categories/r/geografia.png' : IMAGE_PATH+'categories/d/geografia.png',
			width:299,
			height:62,
			clickName:CAT_GEOGRAFIA,
			available:getCategoryProperties(CAT_GEOGRAFIA).available
		});
		
		categorySports = Titanium.UI.createButton({
			backgroundImage:IMAGE_PATH+'categories/r/athlitika.png',
			width:299,
			height:62,
			clickName:CAT_ATHLITIKA,
			available:getCategoryProperties(CAT_ATHLITIKA).available
		});
	
		categoryTech = Titanium.UI.createButton({
			backgroundImage:IS_FREE_APP == 0 ? IMAGE_PATH+'categories/r/texnologia.png' : IMAGE_PATH+'categories/d/texnologia.png',
			width:299,
			height:62,
			clickName:CAT_TEXNOLOGIA,
			available:getCategoryProperties(CAT_TEXNOLOGIA).available
		});
	
		categoryHistory = Titanium.UI.createButton({
			backgroundImage:IMAGE_PATH+'categories/r/istoria.png',
			width:299,
			height:62,
			clickName:CAT_ISTORIA,
			available:getCategoryProperties(CAT_ISTORIA).available
		});
		
		categoryMusic = Titanium.UI.createButton({
			backgroundImage:IS_FREE_APP == 0 ? IMAGE_PATH+'categories/r/mousiki.png' : IMAGE_PATH+'categories/d/mousiki.png',
			width:299,
			height:62,
			clickName:CAT_MOUSIKH,
			available:getCategoryProperties(CAT_MOUSIKH).available
		});
	
		categoryArts = Titanium.UI.createButton({
			backgroundImage:IS_FREE_APP == 0 ? IMAGE_PATH+'categories/r/texnes.png' : IMAGE_PATH+'categories/d/texnes.png',
			width:299,
			height:62,
			clickName:CAT_TEXNES,
			available:getCategoryProperties(CAT_TEXNES).available
		});
	
		categoryAnimals = Titanium.UI.createButton({
			backgroundImage:IS_FREE_APP == 0 ? IMAGE_PATH+'categories/r/zoafuta.png' : IMAGE_PATH+'categories/d/zoafuta.png',
			width:299,
			height:62,
			clickName:CAT_ZWAFUTA,
			available:getCategoryProperties(CAT_ZWAFUTA).available
		});
	
		categoryGossip = Titanium.UI.createButton({
			backgroundImage:IS_FREE_APP == 0 ? IMAGE_PATH+'categories/r/lifestyle.png' : IMAGE_PATH+'categories/d/lifestyle.png',
			width:299,
			height:62,
			clickName:CAT_LIFESTYLE,
			available:getCategoryProperties(CAT_LIFESTYLE).available
		});
		
		//create table view
		tableViewCategories = Titanium.UI.createTableView({
			data:[],
			minRowHeight:65,
			backgroundColor:'transparent',
			separatorStyle:Ti.UI.iPhone.TableViewSeparatorStyle.NONE,
			top:110,
			bottom:10
		});
		
		row0 = Ti.UI.createTableViewRow({
			height:'auto', 
			backgroundColor:'transparent',
			selectedBackgroundColor:'transparent'
		});
		
		row1 = Ti.UI.createTableViewRow({
			height:'auto', 
			backgroundColor:'transparent',
			selectedBackgroundColor:'transparent'
		});
	
		row2 = Ti.UI.createTableViewRow({
			height:'auto', 
			backgroundColor:'transparent',
			selectedBackgroundColor:'transparent'
		});
	
		row3 = Ti.UI.createTableViewRow({
			height:'auto', 
			backgroundColor:'transparent',
			selectedBackgroundColor:'transparent'
		});
	
		row4 = Ti.UI.createTableViewRow({
			height:'auto', 
			backgroundColor:'transparent',
			selectedBackgroundColor:'transparent'
		});
	
		row5 = Ti.UI.createTableViewRow({
			backgroundColor:'transparent',
			selectedBackgroundColor:'transparent'
		});
	
		row6 = Ti.UI.createTableViewRow({
			height:'auto', 
			backgroundColor:'transparent',
			selectedBackgroundColor:'transparent'
		});
	
		row7 = Ti.UI.createTableViewRow({
			height:'auto', 
			backgroundColor:'transparent',
			selectedBackgroundColor:'transparent'
		});
	
		row8 = Ti.UI.createTableViewRow({
			height:'auto', 
			backgroundColor:'transparent',
			selectedBackgroundColor:'transparent'
		});
	
		row9 = Ti.UI.createTableViewRow({
			height:'auto', 
			backgroundColor:'transparent',
			selectedBackgroundColor:'transparent'
		});
	
		row10 = Ti.UI.createTableViewRow({
			height:'auto', 
			backgroundColor:'transparent',
			selectedBackgroundColor:'transparent'
		});
		
		row0.add(categoryTotalBuzz);
		row1.add(categoryScience);
		row2.add(categoryCinema);
		row3.add(categoryGeography);
		row4.add(categorySports);
		row5.add(categoryTech);
		row6.add(categoryHistory);
		row7.add(categoryMusic);
		row8.add(categoryArts);
		row9.add(categoryAnimals);
		row10.add(categoryGossip);
		
		data = [];
		data.push(row0);
		data.push(row1);
		data.push(row2);
		data.push(row3);
		data.push(row4);
		data.push(row5);
		data.push(row6);
		data.push(row7);
		data.push(row8);
		data.push(row9);
		data.push(row10);
	
		tableViewCategories.setData(data);
		
		view.add(tableViewCategories);
		
		//Table view CLICK events
		tableViewCategories.addEventListener('click', handleCategorySelection);
		
		//Sync stuff from the server
		//sync();
		
		win.add(view);
	} else {
		Ti.API.warn('NOT building Categories view - already in progress');
	}
}

function destroyCategoriesView(){
	Ti.API.warn('destroyCategoriesView() called');
	
	view.animate(anim_out);
	
	//Table view CLICK events
	tableViewCategories.removeEventListener('click', handleCategorySelection);
	view.remove(tableViewCategories);
	tableViewCategories.setData(null);
	
	row0.remove(categoryTotalBuzz);
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
	view.remove(label);
	//Logo image 
	view.remove(categoriesLogoImage);
	
	data = null;
	
	label = null;
	
	//Create image views
	categoryTotalBuzz = null;
	categoryScience = null;
	categoryCinema = null;
	categoryGeography = null;
	categorySports = null;
	categoryTech = null;
	categoryHistory = null;
	categoryMusic = null;
	categoryArts = null;
	categoryAnimals = null;
	categoryGossip = null;
	
	//create table view
	//tableView = null;
	
	row0 = null;
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
	categorySoloBoolean = null;
	
	win.remove(view);
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
	
	//Prepare game session for SOLO
	if(gameSession.getGameType() == BUZZ_GAME_SOLO){
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
	}
	
	mtbImport("loader.js");
	
	var targetCategoryIcon = '';
	var targetCategoryLabel = '';
	var categoryId = e.source.clickName;
	
	var categoryPropeties = getCategoryProperties(categoryId);
	targetCategoryIcon = categoryPropeties.loader;
	targetCategoryLabel = categoryPropeties.name;

    var shouldRenderPopup = false;
	//if the popup has never been shown OR if you have played more times than we allow
	if(NEW_CONTENT_POPUP_COUNTER == 0 || (NEW_CONTENT_POPUP_COUNTER > 0 && NEW_CONTENT_POPUP_COUNTER >= NEW_CONTENT_POPUP_MAX_DECLINES_ALLOWED)){
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
		view.add(purchasePopup);
		purchasePopup.animate({transform:SCALE_ONE, duration:400});
	}
}