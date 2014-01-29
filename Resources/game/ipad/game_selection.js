//The view
var viewGameSelection = Ti.UI.createView({
	backgroundImage:IMAGE_PATH+'background.jpg',
	opacity:0,
	top:0,
	bottom:0,
	left:0,
	right:0
});

//Back button
var backHomeFromGameSelectionButton = Titanium.UI.createButton({
	backgroundImage:IMAGE_PATH+'back.png',
	backgroundSelectedImage:IMAGE_PATH+'back_green.png',
	left:8,
	top:8,
	width:52,
	height:52
});

//Back button event listener
backHomeFromGameSelectionButton.addEventListener('click', function() {
	if(SOUNDS_MODE){
		audioBack.play();	
	}
	
	Ti.API.info('BACK to home clicked');
	destroyGameSelectionView();
});
	
viewGameSelection.add(backHomeFromGameSelectionButton);

//UI components
var gameSelectionTopBanner = null;
var gameSelectionBannerLabel = null;
var gameSelectionTableView = null;

function buildGameSelectionView(){
	var shouldCreateView = gameSelectionTopBanner == null;
	if(shouldCreateView){
		
		gameSelectionTopBanner = Ti.UI.createView({
			backgroundColor:'black',
			width:"100%",
			height:80,
			top:108
		});
	
		gameSelectionBannerLabel = Titanium.UI.createLabel({
			text:'Θέλεις να παίξεις σόλο ή με παρέα?',
			top:25,
			color:'white',
			textAlign:'center',
			shadowColor:'#000000',
		    shadowOffset:{x:1,y:1},
			font:{fontSize:30, fontWeight:'bold', fontFamily:'Myriad Pro'}
		});
		
		gameSelectionTopBanner.add(gameSelectionBannerLabel);
		viewGameSelection.add(gameSelectionTopBanner);
		
		gameSelectionTableView = Titanium.UI.createTableView({
			minRowHeight:385,
			data:populateGameSelectionTable(),
			backgroundColor:'transparent',
			separatorStyle:Ti.UI.iPhone.TableViewSeparatorStyle.NONE,
			top:210,
			bottom:10
		});
		
		viewGameSelection.add(gameSelectionTableView);
		gameSelectionTableView.addEventListener('click', handleGameSelectionClick);
		
		win.add(viewGameSelection);
	} else {
		Ti.API.warn('NOT building GameSelection view - already in progress');
	}
}

function destroyGameSelectionView(){
	var shouldDestroyView = gameSelectionTopBanner != null;
	if(shouldDestroyView){
		viewGameSelection.animate(anim_out);
		
		gameSelectionTableView.removeEventListener('click', handleGameSelectionClick);
		
		gameSelectionTopBanner.remove(gameSelectionBannerLabel);
		viewGameSelection.remove(gameSelectionTopBanner);
		viewGameSelection.remove(gameSelectionTableView);
		
		gameSelectionTopBanner = null;
		gameSelectionBannerLabel = null;
		gameSelectionTableView = null;
		
		win.remove(viewGameSelection);
		
	} else {
		Ti.API.warn('NOT destroying GameSelection view - already in progress');
	}
}

/*Creates and returns the table rows for the game selection table view*/
function populateGameSelectionTable(){
	var tableRows = [];
	
	var row1 = Ti.UI.createTableViewRow({
		className:'gameSelectionRow',
		selectedBackgroundColor:'#a2c960',
		width:800,
		gameType:BUZZ_GAME_SOLO
	});
		
	//Create bg image view
	var bgImage = Titanium.UI.createImageView({
		image:IMAGE_PATH+'game_selection/Solo.png'
	});
	
	var row2 = Ti.UI.createTableViewRow({
		className:'gameSelectionRow',
		selectedBackgroundColor:'#a2c960',
		width:800,
		gameType:BUZZ_GAME_GROUP
	});
		
	//Create bg image view
	var bgImage2 = Titanium.UI.createImageView({
		image:IMAGE_PATH+'game_selection/Group.png'
	});
	
	row2.add(bgImage2);
	row1.add(bgImage);
	
	tableRows.push(row1);
	tableRows.push(row2);
	
	return tableRows;
}

/*Event handler for game type selection*/
function handleGameSelectionClick(e){
	if(SOUNDS_MODE){
		audioClick.play();	
	}
	
	if(e.row.gameType == BUZZ_GAME_SOLO){
		Ti.API.info('SOLO game type selected');
		gameSession.setGameType(BUZZ_GAME_SOLO);
	
		//load current player and fire an event to update the player UI
		var currentPlayer = getCurrentPlayer();
		
		//If there is an active player, go straight to the category selection, otherwise to the player selection
		if(currentPlayer.name != null && currentPlayer.name != ''){
			
			//pass the persisted solo player to the game session
			var tmpPlayerArrayObj = [];
			tmpPlayerArrayObj.push(currentPlayer);
			gameSession.setTmpPlayerNames(tmpPlayerArrayObj);
			
			mtbImport("categories.js");
			buildCategoriesView();
			view.animate(anim_in);
		} else {
			mtbImport("player2.js");
			buildPlayerLoginView();
			viewPlayer.fireEvent('updatePlayerUI', {player:currentPlayer});
			viewPlayer.animate(anim_in);
		}
	
	} else if(e.row.gameType == BUZZ_GAME_GROUP){
		Ti.API.info('GROUP game type selected');
		gameSession.setGameType(BUZZ_GAME_GROUP);
		
		mtbImport("group_selection.js");
		buildGroupSelectionView();
		viewGroupSelection.animate(anim_in);
	}
}