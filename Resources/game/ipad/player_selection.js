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
	height:52,
	width:52
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
var groupPlayerBottomBar = null;

//Number images
var groupPlayerSelect2 = null;
var groupPlayerSelect3 = null;
var groupPlayerSelect4 = null;
var groupPlayerSelect5 = null;
var groupPlayerSelect6 = null;
var groupPlayerSelect7 = null;
var groupPlayerSelect8 = null;
var groupPlayerSelect9 = null;

var topLabelText = null;
var bottomLabelText = null;
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
			bottomLabelText = 'Kάθε παίκτης παίζει εναλλάξ σε κάθε ερώτηση. Στο τέλος του παιχνιδιού, αποκαλύπτεται η τελική κατάταξη!';
			groupGameIcon = IMAGE_PATH+'player_selection/icon_players.png';
			
			//Switch or chill choise
			if(groupTurnType == BUZZ_GROUP_TURN_SWITCH){
				bottomLabelText = 'Kάθε παίκτης παίζει εναλλάξ σε κάθε ερώτηση. Στο τέλος του παιχνιδιού, αποκαλύπτεται η τελική κατάταξη!';
				secondTypeImage = IMAGE_PATH+'player_selection/mode_switch.png';
			} else if(groupTurnType == BUZZ_GROUP_TURN_CHILL){
				bottomLabelText = 'Kάθε παίκτης παίζει μόνος μέχρι να τελειώσει η παρτίδα του. Στο τέλος του γύρου, αποκαλύπτεται η τελική κατάταξη!';
				secondTypeImage = IMAGE_PATH+'player_selection/mode_chill.png';
			}
			
		} else if(gameGroupType == BUZZ_GROUP_TYPE_TEAMS){
			topLabelText = 'Πόσες ομάδες είστε στην παρέα?';
			bottomLabelText = 'Kάθε ομάδα παίζει εναλλάξ σε κάθε ερώτηση. Στο τέλος του παιχνιδιού, αποκαλύπτεται η τελική κατάταξη!';
			groupGameIcon = IMAGE_PATH+'player_selection/icon_teams.png';
			
			//Switch or chill choise
			if(groupTurnType == BUZZ_GROUP_TURN_SWITCH){
				bottomLabelText = 'Kάθε ομάδα παίζει εναλλάξ σε κάθε ερώτηση. Στο τέλος του παιχνιδιού, αποκαλύπτεται η τελική κατάταξη!';
				secondTypeImage = IMAGE_PATH+'player_selection/mode_switch.png';
			} else if(groupTurnType == BUZZ_GROUP_TURN_CHILL){
				bottomLabelText = 'Kάθε ομάδα παίζει μόνη μέχρι να τελειώσει η παρτίδα της. Στο τέλος του γύρου, αποκαλύπτεται η τελική κατάταξη!';
				secondTypeImage = IMAGE_PATH+'player_selection/mode_chill.png';
			}
		}
		
		groupTypeLogo = Ti.UI.createImageView({
			image:secondTypeImage,
			right:0,
			top:30
		});
		
		viewGroupPlayerSelection.add(groupTypeLogo);
		
		groupPlayerLogo = Ti.UI.createImageView({
			top:70,
			image:groupGameIcon
		});
		
		viewGroupPlayerSelection.add(groupPlayerLogo);
		
		groupPlayerTopBar = Ti.UI.createImageView({
			top:370,
			image:IMAGE_PATH+'player_selection/barA.png'
		});
		
		groupPlayerTopBarLabel = Titanium.UI.createLabel({
			text:topLabelText,
			top:43,
			color:'white',
			textAlign:'center',
			shadowColor:'#000000',
		    shadowOffset:{x:1,y:1},
			font:{fontSize:30, fontWeight:'bold', fontFamily:'Myriad Pro'}
		});
		
		groupPlayerTopBar.add(groupPlayerTopBarLabel);
		viewGroupPlayerSelection.add(groupPlayerTopBar);
		
		var playerNumberButtonsOffset = 165;
		var playerNumberButtonsRow1Top = 535;
		var playerNumberButtonsRow2Top = 695;
		
		groupPlayerSelect2 = Ti.UI.createButton({
			left:70,
			top:playerNumberButtonsRow1Top,
			backgroundImage:IMAGE_PATH+'player_selection/numbers_yel/no2.png',
			backgroundSelectedImage:IMAGE_PATH+'player_selection/numbers_select/no2_sel.png',
			width:130,
			height:130,
			players:2
		});
		
		groupPlayerSelect3 = Ti.UI.createButton({
			left:groupPlayerSelect2.left + playerNumberButtonsOffset,
			top:playerNumberButtonsRow1Top,
			backgroundImage:IMAGE_PATH+'player_selection/numbers_yel/no3.png',
			backgroundSelectedImage:IMAGE_PATH+'player_selection/numbers_select/no3_sel.png',
			width:130,
			height:130,
			players:3
		});
		
		groupPlayerSelect4 = Ti.UI.createButton({
			left:groupPlayerSelect3.left + playerNumberButtonsOffset,
			top:playerNumberButtonsRow1Top,
			backgroundImage:IMAGE_PATH+'player_selection/numbers_yel/no4.png',
			backgroundSelectedImage:IMAGE_PATH+'player_selection/numbers_select/no4_sel.png',
			width:130,
			height:130,
			players:4
			
		});
		
		groupPlayerSelect5 = Ti.UI.createButton({
			left:groupPlayerSelect4.left + playerNumberButtonsOffset,
			top:playerNumberButtonsRow1Top,
			backgroundImage:IMAGE_PATH+'player_selection/numbers_yel/no5.png',
			backgroundSelectedImage:IMAGE_PATH+'player_selection/numbers_select/no5_sel.png',
			width:130,
			height:130,
			players:5
		});
		
		groupPlayerSelect6 = Ti.UI.createButton({
			left:70,
			top:playerNumberButtonsRow2Top,
			backgroundImage:IMAGE_PATH+'player_selection/numbers_yel/no6.png',
			backgroundSelectedImage:IMAGE_PATH+'player_selection/numbers_select/no6_sel.png',
			width:130,
			height:130,
			players:6
		});
		
		groupPlayerSelect7 = Ti.UI.createButton({
			left:groupPlayerSelect6.left + playerNumberButtonsOffset,
			top:playerNumberButtonsRow2Top,
			backgroundImage:IMAGE_PATH+'player_selection/numbers_yel/no7.png',
			backgroundSelectedImage:IMAGE_PATH+'player_selection/numbers_select/no7_sel.png',
			width:130,
			height:130,
			players:7
		});
		
		groupPlayerSelect8 = Ti.UI.createButton({
			left:groupPlayerSelect7.left + playerNumberButtonsOffset,
			top:playerNumberButtonsRow2Top,
			backgroundImage:IMAGE_PATH+'player_selection/numbers_yel/no8.png',
			backgroundSelectedImage:IMAGE_PATH+'player_selection/numbers_select/no8_sel.png',
			width:130,
			height:130,
			players:8
		});
		
		groupPlayerSelect9 = Ti.UI.createButton({
			left:groupPlayerSelect8.left + playerNumberButtonsOffset,
			top:playerNumberButtonsRow2Top,
			backgroundImage:IMAGE_PATH+'player_selection/numbers_yel/no9.png',
			backgroundSelectedImage:IMAGE_PATH+'player_selection/numbers_select/no9_sel.png',
			width:130,
			height:130,
			players:9
		});
		
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
		
		groupPlayerBottomBar = Ti.UI.createImageView({
			bottom:0,
			image:IMAGE_PATH+'player_selection/barB.png'
		});
		
		groupPlayerBottomBarLabel = Titanium.UI.createLabel({
			text:bottomLabelText,
			color:'white',
			top:50,
			width:640,
			textAlign:'center',
			shadowColor:'#000000',
		    shadowOffset:{x:1,y:1},
			font:{fontSize:25, fontWeight:'regular', fontFamily:'Myriad Pro'}
		});
		
		groupPlayerBottomBar.add(groupPlayerBottomBarLabel);
		viewGroupPlayerSelection.add(groupPlayerBottomBar);
		
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
		
		viewGroupPlayerSelection.remove(groupPlayerSelect2);
		viewGroupPlayerSelection.remove(groupPlayerSelect3);
		viewGroupPlayerSelection.remove(groupPlayerSelect4);
		viewGroupPlayerSelection.remove(groupPlayerSelect5);
		viewGroupPlayerSelection.remove(groupPlayerSelect6);
		viewGroupPlayerSelection.remove(groupPlayerSelect7);
		viewGroupPlayerSelection.remove(groupPlayerSelect8);
		viewGroupPlayerSelection.remove(groupPlayerSelect9);
		
		groupPlayerBottomBar.remove(groupPlayerBottomBarLabel);
		viewGroupPlayerSelection.remove(groupPlayerBottomBar);
		
		groupTypeLogo = null;
		groupPlayerLogo = null;
		groupPlayerTopBar = null;
		groupPlayerTopBarLabel = null;
		groupPlayerSelect2 = null;
		groupPlayerSelect3 = null;
		groupPlayerSelect4 = null;
		groupPlayerSelect5 = null;
		groupPlayerSelect6 = null;
		groupPlayerSelect7 = null;
		groupPlayerSelect8 = null;
		groupPlayerSelect9 = null;
		
		groupPlayerBottomBar = null;
		groupPlayerBottomBarLabel = null;
		
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