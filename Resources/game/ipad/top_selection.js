//The view
var viewTopCategorySelection = Ti.UI.createView({
	backgroundImage:IMAGE_PATH+'background.jpg',
	opacity:0,
	top:0,
	bottom:0,
	left:0,
	right:0
});

//Back button
var backHomeFromCSelectionButton = Titanium.UI.createButton({
	backgroundImage:IMAGE_PATH+'back.png',
	backgroundSelectedImage:IMAGE_PATH+'back_green.png',
	left:8,
	top:8,
	height:52,
	width:52
});

viewTopCategorySelection.add(backHomeFromCSelectionButton);

//Back button event listener
backHomeFromCSelectionButton.addEventListener('click', function() {
	if(SOUNDS_MODE){
		audioBack.play();	
	}
	
	Ti.API.info('BACK to home clicked');
	destroyTopSelectionView();
});
	
//UI components
var iconImageTopSelection = null;
var barImageTopSelection = null;
var iconReflectionImageTopSelection = null;
var titleImageTopSelection = null;
var topSelectionTableView = null;

var currentCategoryId = null;

//build TopSelectionView
function buildTopSelectionView(){
	var shouldCreateView = iconImageTopSelection == null;
	if(shouldCreateView){
		//Icon image
		iconImageTopSelection = Titanium.UI.createImageView({
			image:IMAGE_PATH+'top/icon.png',
			top:44,
			right:15
		});
		
		viewTopCategorySelection.add(iconImageTopSelection);
		
		//Bar image
		barImageTopSelection = Titanium.UI.createImageView({
			image:IMAGE_PATH+'top/bar.png',
			top:128
		});
		
		viewTopCategorySelection.add(barImageTopSelection);
		
		//Icon image reflection
		iconReflectionImageTopSelection = Titanium.UI.createImageView({
			image:IMAGE_PATH+'top/icon_r.png',
			top:0,
			right:15
		});
		
		barImageTopSelection.add(iconReflectionImageTopSelection);
		
		//Title image
		titleImageTopSelection = Titanium.UI.createImageView({
			image:IMAGE_PATH+'top/title.png',
			top:76
		});
		
		viewTopCategorySelection.add(titleImageTopSelection);
		
		//Label
		labelTopSelection = Titanium.UI.createLabel({
			text:'Δες την κατάταξη των σκορ σε Solo και Group!',
			color:'white',
			top:263,
			textAlign:'center',
			width:'auto',
			height:'auto',
			shadowColor:'#000000',
		    shadowOffset:{x:1,y:1},
			font:{fontSize:30, fontWeight:'bold', fontFamily:'Myriad Pro'}
		});
		
		viewTopCategorySelection.add(labelTopSelection);
		
		currentCategoryId = CAT_TOTALBUZZ;
		
		topSelectionTableView = Titanium.UI.createTableView({
			minRowHeight:335,
			data:populateTopSelectionTable(),
			backgroundColor:'transparent',
			separatorStyle:Ti.UI.iPhone.TableViewSeparatorStyle.NONE,
			top:315,
			bottom:10
		});
		
		viewTopCategorySelection.add(topSelectionTableView);
		topSelectionTableView.addEventListener('click', handleTopSelectionClick);
		
		win.add(viewTopCategorySelection);
	} else {
		Ti.API.warn('NOT building TopSelection view - already in progress');
	}
}
//destroy topSelectionView
function destroyTopSelectionView(){
	Ti.API.warn('destroyTopSelectionView() called');
	
	var shouldDestroyView = iconImageTopSelection != null;
	if(shouldDestroyView){
		viewTopCategorySelection.animate(anim_out);
		
		
		
		viewTopCategorySelection.remove(iconImageTopSelection);
		viewTopCategorySelection.remove(barImageTopSelection);
		barImageTopSelection.remove(iconReflectionImageTopSelection);
		viewTopCategorySelection.remove(titleImageTopSelection);
		viewTopCategorySelection.remove(labelTopSelection);
		viewTopCategorySelection.remove(topSelectionTableView);
		
		//Icon image
		iconImageTopSelection = null;
		//Bar image
		barImageTopSelection = null;
		//Icon image reflection
		iconReflectionImageTopSelection = null;
		//Title image
		titleImageTopSelection = null;
		//Label
		labelTopSelection = null;
		
		topSelectionTableView = null;
		
		currentCategoryId = null;
		
		
		win.remove(viewTopCategorySelection);
	} else {
		Ti.API.warn('NOT destroying TopSelection view - already in progress');
	}
}

//populate table
function populateTopSelectionTable(){
	var tableRows = [];
	
	var row1 = Ti.UI.createTableViewRow({
		className:'topSelectionRow',
		selectedBackgroundColor:'#a2c960',
		width:800,
		gameType:BUZZ_GAME_SOLO
	});
		
	//Create bg image view
	var bgImage = Titanium.UI.createImageView({
		image:IMAGE_PATH+'top/top_selection/solo.png'
	});
	
	var row2 = Ti.UI.createTableViewRow({
		className:'topSelectionRow',
		selectedBackgroundColor:'#a2c960',
		width:800,
		gameType:BUZZ_GAME_GROUP
	});
		
	//Create bg image view
	var bgImage2 = Titanium.UI.createImageView({
		image:IMAGE_PATH+'top/top_selection/group.png'
	});
	
	row2.add(bgImage2);
	row1.add(bgImage);
	
	tableRows.push(row1);
	tableRows.push(row2);
	
	return tableRows;
}

//Event handler for table row selection
function handleTopSelectionClick(e){
	if(SOUNDS_MODE){
		audioClick.play();	
	}
	
	var gameType = e.row.gameType; 
	
    //show loader view
    mtbImport("top_view.js");
    buildTopScoresView(currentCategoryId, gameType, false);
    //Load cached scores so the UI has something to display
    viewTopCategory.fireEvent('loadScore', {currentCategoryId:currentCategoryId, loadRemoteData:true});    
    viewTopCategory.animate(anim_in);
}