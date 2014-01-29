//The view
var viewGroupPlayerSelection = Ti.UI.createView({
	backgroundImage:IMAGE_PATH+'background.jpg',
	opacity:0,
	top:0,
	bottom:0,
	left:0,
	right:0
});

//Back button
var backHomeFromGroupPlayerSelectionButton = Titanium.UI.createButton({
	backgroundImage:IMAGE_PATH+'back.png',
	backgroundSelectedImage:IMAGE_PATH+'back_green.png',
	left:8,
	top:8,
	height:30,
	width:30
});

//Back button event listener
backHomeFromGroupPlayerSelectionButton.addEventListener('click', function() {
	if(SOUNDS_MODE){
		audioBack.play();	
	}
	
	Ti.API.info('BACK to home clicked');
	destroyGroupPlayerSelectionView();
});

viewGroupPlayerSelection.add(backHomeFromGroupPlayerSelectionButton);

//UI components
var groupPlayerLogo = null;
var groupTypeLogo = null;
var groupPlayerTopBar = null;
var groupPlayerTopBarLabel = null;

var PLAYER_SELECTION_IPHONE5_OFFSET_HEIGHT = 40;

//Number images
var groupPlayerSelectArrows = null;
var groupPlayerSelect2 = null;
var groupPlayerSelect3 = null;
var groupPlayerSelect4 = null;
var groupPlayerSelect5 = null;
var groupPlayerSelect6 = null;
var groupPlayerSelect7 = null;
var groupPlayerSelect8 = null;
var groupPlayerSelect9 = null;

var topLabelText = null;
var groupGameIcon = null;
var secondTypeImage = null;

function buildGroupPlayerSelectionView(){
	var shouldCreateView = groupPlayerLogo == null;
	if(shouldCreateView){
		
		var gameGroupType = gameSession.getGameGroupType();
		var groupTurnType = gameSession.getGroupTurnType();
		
		//Players or for Teams choise
		if(gameGroupType == BUZZ_GROUP_TYPE_PLAYERS){
			topLabelText = 'Πόσοι παίκτες είστε στην παρέα?';
			groupGameIcon = IMAGE_PATH+'player_selection/icon_players.png';
			
			//Switch or chill choise
			if(groupTurnType == BUZZ_GROUP_TURN_SWITCH){
				secondTypeImage = IMAGE_PATH+'player_selection/mode_switch.png';
			} else if(groupTurnType == BUZZ_GROUP_TURN_CHILL){
				secondTypeImage = IMAGE_PATH+'player_selection/mode_chill.png';
			}
		} else if(gameGroupType == BUZZ_GROUP_TYPE_TEAMS){
			topLabelText = 'Πόσες ομάδες είστε στην παρέα?';
			groupGameIcon = IMAGE_PATH+'player_selection/icon_players.png';
			
			//Switch or chill choise
			if(groupTurnType == BUZZ_GROUP_TURN_SWITCH){
				secondTypeImage = IMAGE_PATH+'player_selection/mode_switch.png';
			} else if(groupTurnType == BUZZ_GROUP_TURN_CHILL){
				secondTypeImage = IMAGE_PATH+'player_selection/mode_chill.png';
			}
		}
		
		groupTypeLogo = Ti.UI.createImageView({
			image:secondTypeImage,
			right:0,
			top:8
		});
		
		viewGroupPlayerSelection.add(groupTypeLogo);
		
		groupPlayerLogo = Ti.UI.createImageView({
			top:IPHONE5? 30+PLAYER_SELECTION_IPHONE5_OFFSET_HEIGHT : 30,
			image:groupGameIcon
		});
		
		viewGroupPlayerSelection.add(groupPlayerLogo);
		
		groupPlayerTopBar = Ti.UI.createImageView({
			top:IPHONE5? 170+PLAYER_SELECTION_IPHONE5_OFFSET_HEIGHT : 170,
			image:IMAGE_PATH+'player_selection/bar.png'
		});
		
		groupPlayerTopBarLabel = Titanium.UI.createLabel({
			text:topLabelText,
			top:15,
			color:'white',
			textAlign:'center',
			shadowColor:'#000000',
		    shadowOffset:{x:1,y:1},
			font:{fontSize:18, fontWeight:'bold', fontFamily:'Myriad Pro'}
		});
		
		groupPlayerTopBar.add(groupPlayerTopBarLabel);
		viewGroupPlayerSelection.add(groupPlayerTopBar);
		
		var playerNumberButtonsOffset = 90;
		var playerNumberButtonsRow1Top = IPHONE5? 254+PLAYER_SELECTION_IPHONE5_OFFSET_HEIGHT : 235;
		var playerNumberButtonsRow2Top = IPHONE5? 339+PLAYER_SELECTION_IPHONE5_OFFSET_HEIGHT : 320;
		var playerNumberButtonsRow3Top = IPHONE5? 424+PLAYER_SELECTION_IPHONE5_OFFSET_HEIGHT : 405;
		
		groupPlayerSelectArrows = Ti.UI.createImageView({
			left:33+7,
			top:playerNumberButtonsRow1Top + 9,
			backgroundImage:IMAGE_PATH+'player_selection/arrows.png',
			width:55,
			height:51
		});
		
		groupPlayerSelect2 = Ti.UI.createButton({
			left:groupPlayerSelectArrows.left + playerNumberButtonsOffset -7,
			top:playerNumberButtonsRow1Top,
			backgroundImage:IMAGE_PATH+'player_selection/numbers_yel/no2.png',
			backgroundSelectedImage:IMAGE_PATH+'player_selection/numbers_select/no2_sel.png',
			width:71,
			height:71,
			players:2
		});
		
		groupPlayerSelect3 = Ti.UI.createButton({
			left:groupPlayerSelect2.left + playerNumberButtonsOffset,
			top:playerNumberButtonsRow1Top,
			backgroundImage:IMAGE_PATH+'player_selection/numbers_yel/no3.png',
			backgroundSelectedImage:IMAGE_PATH+'player_selection/numbers_select/no3_sel.png',
			width:71,
			height:71,
			players:3
		});
		
		groupPlayerSelect4 = Ti.UI.createButton({
			left:33,
			top:playerNumberButtonsRow2Top,
			backgroundImage:IMAGE_PATH+'player_selection/numbers_yel/no4.png',
			backgroundSelectedImage:IMAGE_PATH+'player_selection/numbers_select/no4_sel.png',
			width:71,
			height:71,
			players:4
		});
		
		groupPlayerSelect5 = Ti.UI.createButton({
			left:groupPlayerSelect4.left + playerNumberButtonsOffset,
			top:playerNumberButtonsRow2Top,
			backgroundImage:IMAGE_PATH+'player_selection/numbers_yel/no5.png',
			backgroundSelectedImage:IMAGE_PATH+'player_selection/numbers_select/no5_sel.png',
			width:71,
			height:71,
			players:5
		});
		
		groupPlayerSelect6 = Ti.UI.createButton({
			left:groupPlayerSelect5.left + playerNumberButtonsOffset,
			top:playerNumberButtonsRow2Top,
			backgroundImage:IMAGE_PATH+'player_selection/numbers_yel/no6.png',
			backgroundSelectedImage:IMAGE_PATH+'player_selection/numbers_select/no6_sel.png',
			width:71,
			height:71,
			players:6
		});
		
		groupPlayerSelect7 = Ti.UI.createButton({
			left:33,
			top:playerNumberButtonsRow3Top,
			backgroundImage:IMAGE_PATH+'player_selection/numbers_yel/no7.png',
			backgroundSelectedImage:IMAGE_PATH+'player_selection/numbers_select/no7_sel.png',
			width:71,
			height:71,
			players:7
		});
		
		groupPlayerSelect8 = Ti.UI.createButton({
			left:groupPlayerSelect7.left + playerNumberButtonsOffset,
			top:playerNumberButtonsRow3Top,
			backgroundImage:IMAGE_PATH+'player_selection/numbers_yel/no8.png',
			backgroundSelectedImage:IMAGE_PATH+'player_selection/numbers_select/no8_sel.png',
			width:71,
			height:71,
			players:8
		});
		
		groupPlayerSelect9 = Ti.UI.createButton({
			left:groupPlayerSelect8.left + playerNumberButtonsOffset,
			top:playerNumberButtonsRow3Top,
			backgroundImage:IMAGE_PATH+'player_selection/numbers_yel/no9.png',
			backgroundSelectedImage:IMAGE_PATH+'player_selection/numbers_select/no9_sel.png',
			width:71,
			height:71,
			players:9
		});
		
		viewGroupPlayerSelection.add(groupPlayerSelectArrows);
		viewGroupPlayerSelection.add(groupPlayerSelect2);
		viewGroupPlayerSelection.add(groupPlayerSelect3);
		viewGroupPlayerSelection.add(groupPlayerSelect4);
		viewGroupPlayerSelection.add(groupPlayerSelect5);
		viewGroupPlayerSelection.add(groupPlayerSelect6);
		viewGroupPlayerSelection.add(groupPlayerSelect7);
		viewGroupPlayerSelection.add(groupPlayerSelect8);
		viewGroupPlayerSelection.add(groupPlayerSelect9);
		
		groupPlayerSelect2.addEventListener('click', handlePlayerSelectionButton);
		groupPlayerSelect3.addEventListener('click', handlePlayerSelectionButton);
		groupPlayerSelect4.addEventListener('click', handlePlayerSelectionButton);
		groupPlayerSelect5.addEventListener('click', handlePlayerSelectionButton);
		groupPlayerSelect6.addEventListener('click', handlePlayerSelectionButton);
		groupPlayerSelect7.addEventListener('click', handlePlayerSelectionButton);
		groupPlayerSelect8.addEventListener('click', handlePlayerSelectionButton);
		groupPlayerSelect9.addEventListener('click', handlePlayerSelectionButton);
		
		win.add(viewGroupPlayerSelection);
			
	} else {
		Ti.API.warn('NOT building GroupPlaterSelection view - already in progress');
	}	
}

function destroyGroupPlayerSelectionView(){
	Ti.API.warn('destroyGroupPlayerSelectionView called');
	var shouldDestroyView = groupPlayerLogo != null;
	if(shouldDestroyView){
		
		groupPlayerSelect2.removeEventListener('click', handlePlayerSelectionButton);
		groupPlayerSelect3.removeEventListener('click', handlePlayerSelectionButton);
		groupPlayerSelect4.removeEventListener('click', handlePlayerSelectionButton);
		groupPlayerSelect5.removeEventListener('click', handlePlayerSelectionButton);
		groupPlayerSelect6.removeEventListener('click', handlePlayerSelectionButton);
		groupPlayerSelect7.removeEventListener('click', handlePlayerSelectionButton);
		groupPlayerSelect8.removeEventListener('click', handlePlayerSelectionButton);
		groupPlayerSelect9.removeEventListener('click', handlePlayerSelectionButton);
		
		viewGroupPlayerSelection.remove(groupTypeLogo);
		viewGroupPlayerSelection.remove(groupPlayerLogo);
		groupPlayerTopBar.remove(groupPlayerTopBarLabel);
		viewGroupPlayerSelection.remove(groupPlayerTopBar);
		
		viewGroupPlayerSelection.remove(groupPlayerSelectArrows);
		viewGroupPlayerSelection.remove(groupPlayerSelect2);
		viewGroupPlayerSelection.remove(groupPlayerSelect3);
		viewGroupPlayerSelection.remove(groupPlayerSelect4);
		viewGroupPlayerSelection.remove(groupPlayerSelect5);
		viewGroupPlayerSelection.remove(groupPlayerSelect6);
		viewGroupPlayerSelection.remove(groupPlayerSelect7);
		viewGroupPlayerSelection.remove(groupPlayerSelect8);
		viewGroupPlayerSelection.remove(groupPlayerSelect9);
		
		groupTypeLogo = null;
		groupPlayerLogo = null;
		groupPlayerTopBar = null;
		groupPlayerTopBarLabel = null;
		groupPlayerSelectArrows = null;
		groupPlayerSelect2 = null;
		groupPlayerSelect3 = null;
		groupPlayerSelect4 = null;
		groupPlayerSelect5 = null;
		groupPlayerSelect6 = null;
		groupPlayerSelect7 = null;
		groupPlayerSelect8 = null;
		groupPlayerSelect9 = null;
		
		win.remove(viewGroupPlayerSelection);

	}else {
		Ti.API.info('NOT destroying GroupSelectionView view - already in porgress');
	}
}

/*Event handler for player number selection*/
function handlePlayerSelectionButton(e){
	if(SOUNDS_MODE){
		audioClick.play();	
	}
	
	var numberOfPlayers = e.source.players;
	Ti.API.info('Selected '+numberOfPlayers);
	
	mtbImport("playernames_selection.js");
	buildGroupPlayerNameSelectionView(numberOfPlayers);
	viewGroupPlayerNamesSelection.animate(anim_in);	
}