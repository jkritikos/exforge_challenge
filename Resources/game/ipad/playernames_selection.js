//The view
var viewGroupPlayerNamesSelection = Ti.UI.createView({
	backgroundImage:IMAGE_PATH+'background.jpg',
	opacity:0,
	top:0,
	bottom:0,
	left:0,
	right:0
});

//Back button
var backHomeFromGroupPlayerNamesSelectionButton = Titanium.UI.createButton({
	backgroundImage:IMAGE_PATH+'back.png',
	backgroundSelectedImage:IMAGE_PATH+'back_green.png',
	left:8,
	top:8,
	height:52,
	width:52
});

//Back button event listener
backHomeFromGroupPlayerNamesSelectionButton.addEventListener('click', function() {
	if(SOUNDS_MODE){
		audioBack.play();	
	}
	
	Ti.API.info('BACK to home clicked');
	destroyGroupPlayerNamesSelectionView();
});

viewGroupPlayerNamesSelection.add(backHomeFromGroupPlayerNamesSelectionButton);

//players UI components
var groupPlayerNameLogo = null;
var groupPlayerNameTopBar = null;
var groupPlayerNameTopBarLabel = null;
var playerTypeLogo = null;
var groupPlayerNameBottomBar = null;
var playerAvatarImagesView = null;

var noPlayers = null;
var topLabelText = '';
var groupGameIcon = '';
var textFieldLabel = '';
var groupTurnType = null;
var gameGroupType = null;
var playerTypeLogo = null;
var playerLabelOffset = null;

var playerIndex = null;

//Avatar popup UI components
var avatarPopupHintTextLabel = null;
var avatarPopupTextField = null;
var popupAvatarNamesPopupTable = null;
var avatarPopupLabel1 = null;
var avatarPopupAvatarView = null;
var avatarPopupBackgroundImage = null;
var avatarPopupLogo = null;
var avatarPopupCloseButton = null;
var avatarPopupArrowDownButton = null;
var avatarPopupOkButton = null;
var avatarPopupLeftArrowButton = null;
var avatarPopupRightArrowButton = null;
var avatarPopupLabel2 = null;
var playerAvatarVSImage = null;
var avatarLabelText = null;
var turnTypeImage = null;

//jason props
var configuredPlayers = null;
var avatarCircleImagePath = null;
var avatarPopupDefaultLogoImage = IMAGE_PATH+'player_selection/square.png';
var avatarPopupImageChanged = false;
//how many avatars per row
var AVATAR_ROW_COUNT = 12;
var playerNamesDropdownAvailable = false;
var playerNamesDropdownVisible = false;

//build GroupPlayerNameSelection View
function buildGroupPlayerNameSelectionView(numberOfPlayers){
	Ti.API.info('buildGroupPlayerNameSelectionView() called for numberOfPlayers='+numberOfPlayers);
	
	var shouldCreateView = groupPlayerNameLogo == null;
	if(shouldCreateView){
		
		//initialise validation object for players
		configuredPlayers = [];
		for(var z=0; z < numberOfPlayers; z++){
			
			var tmpPlayerIndex = z+1;
						
			var tmpPlayerObj = {
				validated:false,
				name:null,
				player_id:null,
				playerIndex:tmpPlayerIndex,
				avatarIndex:0
			};
			
			Ti.API.info('buildGroupPlayerNameSelectionView() adding player '+z+' with index '+tmpPlayerIndex+' to the configuredPlayers list');
			configuredPlayers.push(tmpPlayerObj);
 		}
 			
		topLabelText = '';
		groupGameIcon = '';
		textFieldLabel = '';
		
		noPlayers = numberOfPlayers;
		gameGroupType = gameSession.getGameGroupType();
		groupTurnType = gameSession.getGroupTurnType();
		
		if(gameGroupType == BUZZ_GROUP_TYPE_PLAYERS){
			topLabelText = 'Γράψτε ονόματα και διαλέξτε avatar!';
			groupGameIcon = IMAGE_PATH+'player_selection/icon_players.png';
			textFieldLabel = 'Player';
		} else if(gameGroupType == BUZZ_GROUP_TYPE_TEAMS){
			topLabelText = 'Γράψτε τα ονόματα των ομάδων και διαλέξτε avatar!';
			groupGameIcon = IMAGE_PATH+'player_selection/icon_players.png';
			textFieldLabel = 'Team';
		}
		
		if(groupTurnType == BUZZ_GROUP_TURN_SWITCH){
			turnTypeImage = IMAGE_PATH+'player_selection/mode_switch.png';
		}else if (groupTurnType == BUZZ_GROUP_TURN_CHILL){
			turnTypeImage = IMAGE_PATH+'player_selection/mode_chill.png';
		}
		
		playerTypeLogo = Ti.UI.createImageView({
			image:turnTypeImage,
			right:0,
			top:30
		});
		
		viewGroupPlayerNamesSelection.add(playerTypeLogo);
		
		groupPlayerNameLogo = Ti.UI.createImageView({
			top:70,
			image:groupGameIcon
		});
		
		viewGroupPlayerNamesSelection.add(groupPlayerNameLogo);
		
		groupPlayerNameTopBar = Ti.UI.createImageView({
			top:370,
			image:IMAGE_PATH+'player_selection/barA.png'
		});
		
		groupPlayerNameTopBarLabel = Titanium.UI.createLabel({
			text:topLabelText,
			top:43,
			color:'white',
			textAlign:'center',
			shadowColor:'#000000',
		    shadowOffset:{x:1,y:1},
			font:{fontSize:30, fontWeight:'bold', fontFamily:'Myriad Pro'}
		});
		
		groupPlayerNameTopBar.add(groupPlayerNameTopBarLabel);
		viewGroupPlayerNamesSelection.add(groupPlayerNameTopBar);
		
		groupPlayerNameBottomBar = Ti.UI.createButton({
			backgroundImage:IMAGE_PATH+'player_selection/goplay.png',
			backgroundSelectedImage:IMAGE_PATH+'player_selection/goplay_s.png',
			bottom:0,
			width:768,
			height:152
		});
		
		
		
		viewGroupPlayerNamesSelection.add(groupPlayerNameBottomBar);
		
		groupPlayerNameBottomBar.addEventListener('click', validateAvatarsComplete);
		
		playerAvatarImagesView = Ti.UI.createScrollView({
			opacity:1,
			top:550,
			bottom:150,
			left:10,
			right:10,
			showHorizontalScrollIndicator: true,
			contentWidth:'auto',
			contentHeight:300
		});
		viewGroupPlayerNamesSelection.add(playerAvatarImagesView);
		
		//Populate the scroll view with unset avatars & labels
		_populateAvatarScrollView(numberOfPlayers);
		
		win.add(viewGroupPlayerNamesSelection);
		
	} else {
		Ti.API.warn('NOT building GroupPlayerNamesSelection view - already in progress');
	}
}

/*Populates the avatar scrolling view dynamically*/
function _populateAvatarScrollView(players){
	var tmpLabel = null;
	var tmpAvatar = null;
	
	var avatarOffset = 220;
	var avatarTop = 45;
	var avatarLeft = 60;
	
	var playerLabelLeft = 85;
	var playerLabelOffset = 220;
	
	var playerTypeLabel = gameSession.getGameGroupType() == BUZZ_GROUP_TYPE_PLAYERS ? "ΠΑΙΚΤΗΣ" : "ΟΜΑΔΑ";
	
	//2 players requires different positioning + extra VS image
	if(players == 2){
		//avatar 1
		tmpAvatar = Ti.UI.createButton({
			backgroundImage:avatarPopupDefaultLogoImage,
			left:90,
			top:avatarTop,
			player:1,
			isAvatar:true,
			width:193,
			height:193
		});
		
		playerAvatarImagesView.add(tmpAvatar);
		tmpAvatar.addEventListener('touchend', handlePlayerAvatars);
		
		 //label1
		tmpLabel = Ti.UI.createLabel({
			text:playerTypeLabel + ' 1',
			color:'white',
			left:113,
			top:250,
			textAlign:'center',
			width:150,
			font:{fontSize:25, fontWeight:'bold', fontFamily:'Myriad Pro'}
		});
		
		playerAvatarImagesView.add(tmpLabel);
		
		//avatar 2
		tmpAvatar = Ti.UI.createButton({
			backgroundImage:avatarPopupDefaultLogoImage,
			left:470,
			top:avatarTop,
			player:2,
			isAvatar:true,
			width:193,
			height:193
		});
		
		playerAvatarImagesView.add(tmpAvatar);
		tmpAvatar.addEventListener('touchend', handlePlayerAvatars);
		
		//label2
		tmpLabel = Ti.UI.createLabel({
			text:playerTypeLabel + ' 2',
			color:'white',
			left:493,
			top:250,
			textAlign:'center',
			width:150,
			font:{fontSize:25, fontWeight:'bold', fontFamily:'Myriad Pro'}
		});
		
		playerAvatarImagesView.add(tmpLabel);
		
		playerAvatarVSImage = Ti.UI.createImageView({
			image:IMAGE_PATH+'player_selection/vs.png',
			left:287,
			top:50
		});
		
		playerAvatarImagesView.add(playerAvatarVSImage);
		
	} else {
		for(var q=1; q <= players; q++){
		
			if(q == 1){
				avatarLeft = 60;
				playerLabelLeft = 85;
			} else {
				avatarLeft += avatarOffset;
				playerLabelLeft += playerLabelOffset;
			}
			
			tmpAvatar = Ti.UI.createButton({
				backgroundImage:avatarPopupDefaultLogoImage,
				left:avatarLeft,
				top:avatarTop,
				player:q,
				isAvatar:true,
				width:193,
				height:193
			});
			
			tmpLabel = Ti.UI.createLabel({
				text:playerTypeLabel + ' '+q,
				color:'white',
				left:playerLabelLeft,
				top:250,
				textAlign:'center',
				width:150,
				font:{fontSize:25, fontWeight:'bold', fontFamily:'Myriad Pro'}
			});
			
			playerAvatarImagesView.add(tmpAvatar);
			playerAvatarImagesView.add(tmpLabel);
			
			tmpAvatar.addEventListener('touchend', handlePlayerAvatars);
		}
	}
}

//build buildAvatarPopupView
function buildAvatarPopupView(selectedPlayerIndex){
	var shouldCreateView = avatarPopupLogo == null;
	if(shouldCreateView){
		
		//reset validation label
		groupPlayerNameTopBarLabel.color = 'white';
		groupPlayerNameTopBarLabel.text = topLabelText;
		
		//background image
		avatarPopupBackgroundImage = Ti.UI.createImageView({
			image:IMAGE_PATH+'player_selection/popup_avatar/backpop.png',
			transform:SCALE_ZERO,
			zIndex:2
		});
		
		viewGroupPlayerNamesSelection.add(avatarPopupBackgroundImage);	
		
		//determine the popup avatar image
		var selectedPlayerObj = getConfiguredPlayerForIndex(selectedPlayerIndex);
		var selectedPlayerAvatar = null;
		if(selectedPlayerObj != null && selectedPlayerObj.avatarFile != null){
			selectedPlayerAvatar = IMAGE_PATH+'player_selection/avatars/'+selectedPlayerObj.avatarFile;
		} else {
			selectedPlayerAvatar = avatarPopupDefaultLogoImage;
		}
		
		avatarPopupLogo = Ti.UI.createImageView({
			image:selectedPlayerAvatar,
			top:18
		});
		
		avatarPopupBackgroundImage.add(avatarPopupLogo);
		
		avatarPopupCloseButton = Ti.UI.createButton({
			backgroundImage:IMAGE_PATH+'player_selection/popup_avatar/x.png',
			top:82,
			right:69,
			width:78,
			height:76
		});
		
		avatarPopupBackgroundImage.add(avatarPopupCloseButton);
		avatarPopupCloseButton.addEventListener('click', handleCloseAvatarPopup);    
		
		//Only add the dropdown arrow if we have group players to show
		var groupPlayerList = getGroupPlayers();
		if(groupPlayerList != null && groupPlayerList.length > 0){
			avatarPopupArrowDownButton = Ti.UI.createButton({
				backgroundImage:IMAGE_PATH+'player_selection/popup_avatar/arrow_down.png',
				top:333,
				right:149,
				width:50,
				height:50
			});
			
			avatarPopupBackgroundImage.add(avatarPopupArrowDownButton);    
			
			avatarPopupArrowDownButton.addEventListener('click', handleDropdownArrowClick);
		}

		avatarPopupOkButton = Ti.UI.createButton({
			backgroundImage:IMAGE_PATH+'player_selection/popup_avatar/ok_button.png',
			bottom:132,
			width:186,
			height:66
		});
		
		avatarPopupBackgroundImage.add(avatarPopupOkButton);
		avatarPopupOkButton.addEventListener('click', handleAvatarPopupOkButton);
		
		avatarPopupLeftArrowButton = Ti.UI.createImageView({
			image:IMAGE_PATH+'player_selection/popup_avatar/arrow_left.png',
			bottom:350,
			left:140
		});
		
		avatarPopupBackgroundImage.add(avatarPopupLeftArrowButton);
		
		avatarPopupRightArrowButton = Ti.UI.createImageView({
			image:IMAGE_PATH+'player_selection/popup_avatar/arrow_right.png',
			bottom:350,
			right:140
		});
		
		avatarPopupBackgroundImage.add(avatarPopupRightArrowButton);
		
		avatarPopupLabel1 = Ti.UI.createLabel({
			text:gameSession.getGameGroupType() == BUZZ_GROUP_TYPE_PLAYERS ? 'Player '+playerIndex : 'Team '+playerIndex,
			color:'yellow',
			textAlign:'center',
			top:210,
			width:200,
			height:100,
			font:{fontSize:46, fontWeight:'bold', fontFamily:'321Impact'}
		});
		
		avatarPopupBackgroundImage.add(avatarPopupLabel1);
		
		if(gameGroupType == BUZZ_GROUP_TYPE_PLAYERS){
			avatarLabelText = 'Διάλεξε το avatar σου!';
		} else if(gameGroupType == BUZZ_GROUP_TYPE_TEAMS){
			avatarLabelText = 'Διαλέξτε το avatar σας!';
		}
		
		avatarPopupLabel2 = Ti.UI.createLabel({
			text:avatarLabelText,
			color:'white',
			textAlign:'center',
			top:447,
			width:440,
			height:50,
			shadowColor:'#000000',
			shadowOffset:{x:2,y:2},
			font:{fontSize:24, fontWeight:'bold', fontFamily:'Myriad Pro'}
		});
		
		avatarPopupBackgroundImage.add(avatarPopupLabel2);
		
		avatarPopupTextField = Titanium.UI.createTextField({
			height:54,
			top:329,
			left:178,
			width:300,
			color:'black',
			font:{fontSize:25, fontWeight:'regular'}
		});
		
		avatarPopupBackgroundImage.add(avatarPopupTextField);
		avatarPopupTextField.addEventListener('focus', handleTextFieldFocus);
		avatarPopupTextField.addEventListener('blur', handleTextFieldBlur);
		
		avatarPopupHintTextLabel = Ti.UI.createLabel({
			text:'Κλικ εδώ για όνομα',
			color:'brown',
			textAlign:'center',
			top:340,
			left:143,
			width:300,
			hright:54,
			font:{fontSize:25, fontWeight:'bold'}
		});
		
		avatarPopupBackgroundImage.add(avatarPopupHintTextLabel);
			
		avatarPopupAvatarView = Ti.UI.createScrollView({
			opacity:1,
			top:525,
			bottom:234,
			width:404,
			showHorizontalScrollIndicator: true,
			contentWidth:'auto',
			contentHeight:258
		});
		
		avatarPopupBackgroundImage.add(avatarPopupAvatarView);
		
		populateAvatarView();
		
		popupAvatarNamesPopupTable = Titanium.UI.createTableView({
			backgroundColor:'black',
			data:populatePopupAvatarNamesTableData(),
			separatorStyle:Ti.UI.iPhone.TableViewSeparatorStyle.NONE,
			showVerticalScrollIndicator:false,
			//minRowHeight:40,
			top:400,
			width:500,
			height:1
		});
		avatarPopupBackgroundImage.add(popupAvatarNamesPopupTable);
		popupAvatarNamesPopupTable.addEventListener('click', handlePlayerNameDropdownClick);
	} else {
		Ti.API.warn('NOT building buildAvatarPopupView view - already in progress');
	}
}

//destroy avatarPopupView
function destroyAvatarPopupView(){
	
	var shouldDestroyView = avatarPopupLogo != null;
	if(shouldDestroyView){
		avatarPopupBackgroundImage.animate(anim_out);
		
		avatarPopupCloseButton.removeEventListener('click', handleCloseAvatarPopup); 
		avatarPopupOkButton.removeEventListener('click', handleAvatarPopupOkButton);
		avatarPopupTextField.removeEventListener('focus', handleTextFieldFocus);
		avatarPopupTextField.removeEventListener('blur', handleTextFieldBlur);
		popupAvatarNamesPopupTable.removeEventListener('click', handlePlayerNameDropdownClick);
		
		//Remove the dropdown arrow image if we created it
		if(avatarPopupArrowDownButton != null){
			avatarPopupArrowDownButton.removeEventListener('click', handleTextFieldFocus);
			avatarPopupBackgroundImage.remove(avatarPopupArrowDownButton);  
			avatarPopupArrowDownButton = null;
		}
		
		for(var q=0; q < avatarPopupAvatarView.children.length; q++){
			var tmpObj = avatarPopupAvatarView.children[q];
			if(tmpObj != null){
				avatarPopupAvatarView.children[q].removeEventListener('click', handlePopupAvatars);
			}	
		}
		
		viewGroupPlayerNamesSelection.remove(avatarPopupBackgroundImage);
		avatarPopupBackgroundImage.remove(avatarPopupLogo);
		avatarPopupBackgroundImage.remove(avatarPopupCloseButton);
		avatarPopupBackgroundImage.remove(avatarPopupOkButton);
		avatarPopupBackgroundImage.remove(avatarPopupLeftArrowButton);
		avatarPopupBackgroundImage.remove(avatarPopupRightArrowButton);
		avatarPopupBackgroundImage.remove(avatarPopupLabel1);
		avatarPopupBackgroundImage.remove(avatarPopupLabel2);
		avatarPopupBackgroundImage.remove(avatarPopupTextField);
		avatarPopupBackgroundImage.remove(avatarPopupHintTextLabel);
		avatarPopupBackgroundImage.remove(avatarPopupAvatarView);
		avatarPopupBackgroundImage.remove(popupAvatarNamesPopupTable);
		
		avatarPopupHintTextLabel = null;
		avatarPopupTextField = null;
		popupAvatarNamesPopupTable = null;
		avatarPopupLabel1 = null;
	    avatarPopupAvatarView = null;
		avatarPopupBackgroundImage = null;
		avatarPopupLogo = null;
		avatarPopupCloseButton = null;
		avatarPopupOkButton = null;
		avatarPopupLeftArrowButton = null;
		avatarPopupRightArrowButton = null;
		avatarPopupLabel2 = null;
		
		avatarLabelText = null;
	    turnTypeImage = null;
		playerIndex = null;
		
	} else {
		Ti.API.warn('NOT destroying destroyAvatarPopupView view - already in progress');
	}
}

//Destroy destroyGroupPlayerNamesSelectionView
function destroyGroupPlayerNamesSelectionView(){
	var shouldDestroyView = groupPlayerNameLogo != null;
	if(shouldDestroyView){
		
		groupPlayerNameBottomBar.removeEventListener('click', validateAvatarsComplete);
		
		viewGroupPlayerNamesSelection.remove(playerTypeLogo);
		viewGroupPlayerNamesSelection.remove(groupPlayerNameLogo);
		groupPlayerNameTopBar.remove(groupPlayerNameTopBarLabel);
		viewGroupPlayerNamesSelection.remove(groupPlayerNameTopBar);
		viewGroupPlayerNamesSelection.remove(groupPlayerNameBottomBar);
		viewGroupPlayerNamesSelection.remove(playerAvatarImagesView);
		
		//destroy scroller population
		if(playerAvatarVSImage != null){
			playerAvatarImagesView.remove(playerAvatarVSImage);
			playerAvatarVSImage = null;
		}
	
		for(var z=0; z<playerAvatarImagesView.children.length; z++){
			var child = playerAvatarImagesView.children[z];
			if(child != null){
				if(child.isAvatar){
					child.removeEventListener('touchend', handlePlayerAvatars);
				}
				
				playerAvatarImagesView.remove(child);
			} 
		}
		
		//clear validation object for players
		configuredPlayers = null;
		
 		//flags
		topLabelText = null;
		groupGameIcon = null;
		textFieldLabel = null;
		
		playerTypeLogo = null;
		groupPlayerNameLogo = null;
		groupPlayerNameTopBar = null;
		groupPlayerNameTopBarLabel = null;
		groupPlayerNameBottomBar = null;
		playerAvatarImagesView = null;
		
		//end destroy scroller population
			
		win.remove(viewGroupPlayerNamesSelection);
		
	} else {
		Ti.API.warn('NOT destroying destroyGroupPlayerNamesSelectionView view - already in progress');
	}
}

//Validate that all players have avatars and names
function validateAvatarsComplete(){
	var response = true;
	for(var z=0; z < noPlayers; z++){
		if(!configuredPlayers[z].validated){
			response = false;
			break;
		}
	}
	
	if(response){
		if(SOUNDS_MODE){
			audioClick.play();	
		}
		
		handleStartMultiPlayerGame();
	} else {
		if(SOUNDS_MODE){
			audioError.play();	
		}
		
		groupPlayerNameTopBarLabel.color = 'red';
		groupPlayerNameTopBarLabel.text = 'Πρέπει να επιλέξετε όλους τους παίκτες!';
	}
}

function handleStartMultiPlayerGame(){
	Ti.API.info('handleStartMultiPlayerGame() calling setTmpNames with '+configuredPlayers.length+' objects');
	gameSession.setTmpPlayerNames(configuredPlayers);
	
	mtbImport("categories.js");
	buildCategoriesView();
	view.animate(anim_in);
}

//populate avatar names dropdown table view
function populatePopupAvatarNamesTableData(){
	var tableRows = [];
	
	var playerList = getGroupPlayers();
	if(playerList != null && playerList.length > 0){
		
		playerNamesDropdownAvailable = true;
		
		for(var i=0; i < playerList.length; i++){
			
			var row1 = Ti.UI.createTableViewRow({
				className:'avatarNameTable',
				height:80,
				selectedBackgroundColor:'#4a9b3c',
				name:1,
				player_id:playerList[i].id,
				avatar_filename:playerList[i].avatar_filename
			});
			
			var playerAvatarDropdownImg = Ti.UI.createImageView({
				image:IMAGE_PATH+'player_selection/popup_avatar/c/'+playerList[i].avatar_filename,
				width:60,
				left:15
			})
			
			var avatarPopupNamesDottedLine = Titanium.UI.createImageView({
				image:IMAGE_PATH+'player_selection/popup_avatar/dotted_line.png',
				bottom:0
			});
			
			var nameLabel1 = Titanium.UI.createLabel({
				text:playerList[i].name,
				color:'white',
				textAlign:'left',
				width:370,
				top:27,
				left:85,
				font:{fontSize:28, fontWeight:'bold', fontFamily:'Myriad Pro'}
			});
			
			row1.add(nameLabel1);
			row1.add(playerAvatarDropdownImg);
			row1.add(avatarPopupNamesDottedLine);
			tableRows.push(row1);
		}	
	} else {
		playerNamesDropdownAvailable = false;
	}
	return tableRows;
}

//populate scrollView with avatar images
function populateAvatarView(){
	
	var avatarleftRowOffset = 138;
	var tmpAvatarImage = null;
	var avatarPath = null;
	var avatarCirclePath = null;
	var topLeft = 0;
	var bottomLeft = 0;
	var avatarDirectory = 'c';
	var avatarFile = '';
	
	var avatarIndex = 1;
	for(var q=1; q <= AVATAR_ROW_COUNT; q++){
		if(q == 1){
			topLeft = 0;
			bottomLeft = 0;
		} else {
			topLeft += avatarleftRowOffset;
			bottomLeft += avatarleftRowOffset;
		}
		
		//boys row
		avatarDirectory = isAvatarSelected(avatarIndex) ? 'b' : 'c';
		avatarPath = IMAGE_PATH+'player_selection/popup_avatar/'+avatarDirectory+'/boy'+q+'.png';
		avatarCirclePath = IMAGE_PATH+'player_selection/avatars/boy'+q+'.png';
		avatarFile = 'boy'+q+'.png';
		
		tmpAvatarImage = Ti.UI.createImageView({
			image:avatarPath,
			top:0,
			left:topLeft,
			avatar:avatarIndex,
			avatarCirclePath:avatarCirclePath,
			avatarFile:avatarFile
		});
		
		avatarPopupAvatarView.add(tmpAvatarImage);
		tmpAvatarImage.addEventListener('click', handlePopupAvatars);
		avatarIndex++;
		
		//girls row
		avatarDirectory = isAvatarSelected(avatarIndex) ? 'b' : 'c';
		avatarPath = IMAGE_PATH+'player_selection/popup_avatar/'+avatarDirectory+'/girl'+q+'.png';
		avatarCirclePath = IMAGE_PATH+'player_selection/avatars/girl'+q+'.png';
		avatarFile = 'girl'+q+'.png';
		
		tmpAvatarImage = Ti.UI.createImageView({
			image:avatarPath,
			bottom:0,
			left:bottomLeft,
			avatar:avatarIndex,
			avatarCirclePath:avatarCirclePath,
			avatarFile:avatarFile
		});
		
		avatarPopupAvatarView.add(tmpAvatarImage);
		tmpAvatarImage.addEventListener('click', handlePopupAvatars);
		avatarIndex++;
	}
}

//handle avatar images when clicked
function handlePopupAvatars(e){
	if(SOUNDS_MODE){
		audioClick.play();	
	}
	
	var avatarClicked = e.source.avatar;
	
	//Only allow the selection if this avatar is available
	if(!isAvatarSelected(avatarClicked)){
		avatarPopupImageChanged = true;
		
		//erase any other border and show border on the one chosen
		for(var q=0; q < avatarPopupAvatarView.children.length; q++){
			avatarPopupAvatarView.children[q].borderColor = null;
		}
		
		avatarCircleImagePath = e.source.avatarCirclePath;
		avatarPopupLogo.image = avatarCircleImagePath;
		var avatarFile = e.source.avatarFile;
		
		//persist the selected avatar index & file for the current player
		var tmpPlayerObj = getConfiguredPlayerForIndex(playerIndex);
		tmpPlayerObj.avatarIndex = avatarClicked;
		tmpPlayerObj.avatarFile = avatarFile;
		
		//Highlight the selected avatar
		var selectedAvatarObject = avatarPopupAvatarView.children[avatarClicked-1];
		selectedAvatarObject.borderColor = 'white';
		selectedAvatarObject.borderWidth = 3;
		selectedAvatarObject.borderRadius = 3;
		
		//hide the keyboard
		avatarPopupTextField.blur();
	}
}

function getConfiguredPlayerForIndex(z){
	//Ti.API.info('getConfiguredPlayerForIndex() called for playerIndex '+z);
	for(var a=0; a < configuredPlayers.length; a++){
		if(configuredPlayers[a].playerIndex == z){
			return configuredPlayers[a];
		}
	}
}

//Checks all the configured players for the specified avatar
function isAvatarSelected(a){
	var response = false;
	for(var i=0; i < noPlayers; i++){
		//Ti.API.info('isAvatarSelected() called for index '+a+' - looping against '+i);
		if(configuredPlayers[i].avatarIndex == a){
			response = true;
			break;
		}
	}
	
	return response;
}

//handle ok button in avatar popup
function handleAvatarPopupOkButton(){
	if(validateAvatarPopup()){
		if(SOUNDS_MODE){
			audioClick.play();	
		}
	
		setPlayerImagesLabels();
		destroyAvatarPopupView();
		avatarPopupImageChanged = false;
	} else {
		if(SOUNDS_MODE){
			audioError.play();	
		}
		
		avatarPopupLabel2.color = 'red';
		avatarPopupLabel2.text = 'Πρέπει να επιλέξεις όνομα και avatar..';
	}
}

//Validation function for player selection in popup
function validateAvatarPopup(){
	var response = false;
	if(avatarPopupTextField.value != '' && avatarPopupLogo.image != avatarPopupDefaultLogoImage){
		response = true;	
	}
	
	return response;
}

//Opens the popup for player selection
function handlePlayerAvatars(e){
	if(SOUNDS_MODE){
		audioClick.play();	
	}
	
	playerIndex = e.source.player;
	
	buildAvatarPopupView(playerIndex);
	
	//Animate the player selection popup 
	avatarPopupBackgroundImage.animate({transform:SCALE_ONE, duration:400});
	
	/*change the popup label to the player chosen and if the text is already
	set for the player, display it again and hide hintext*/
	var playerTypeLabel = gameSession.getGameGroupType() == BUZZ_GROUP_TYPE_PLAYERS ? "Player" : "Team";
	playerTypeLabel = playerTypeLabel + ' ' + playerIndex;
	
	//If this player is already selected, update the popup UI accordingly
	if(getConfiguredPlayerForIndex(playerIndex).validated){
		avatarPopupHintTextLabel.hide();
		avatarPopupTextField.value = getConfiguredPlayerForIndex(playerIndex).name;
	}
}
//destroy avatar popup
function handleCloseAvatarPopup(){
	if(SOUNDS_MODE){
		audioClick.play();	
	}
	
	destroyAvatarPopupView();
}

//handle textfield when focused
function handleTextFieldFocus(){
	avatarPopupHintTextLabel.hide();
}

//handle textfield when not focused
function handleTextFieldBlur(){
	if(avatarPopupTextField.value == ''){
		avatarPopupHintTextLabel.show();
	}
	
	if(playerNamesDropdownVisible){
		popupAvatarNamesPopupTable.animate({height:1,duration:100});
		playerNamesDropdownVisible = false;
	}

	avatarPopupTextField.blur();
}

/*Toggle the dropdown table*/
function handleDropdownArrowClick(e){
	avatarPopupImageChanged = true;
	
	//65 * players + 2
	
	if(!playerNamesDropdownVisible){
		popupAvatarNamesPopupTable.animate({height:400,duration:100});
		playerNamesDropdownVisible = true;
	} else {
		playerNamesDropdownVisible = false;
		popupAvatarNamesPopupTable.animate({height:1,duration:100});
	}	
}

//Event handler for clicking on the player names dropdown
function handlePlayerNameDropdownClick(e){
	avatarPopupTextField.value = e.row.children[0].text;
	avatarPopupTextField.player_id = e.row.player_id;
	
	//try to preselect the avatar too - shame on me for writing this shitty code ;)
	var avatarFile = e.row.avatar_filename;
	var avatarIndex = 1;
	
	if(avatarFile.charAt(0) == 'b'){
		if(avatarFile.length == 8){
			avatarIndex = parseInt(avatarFile.substr(3,1));
		} else {
			avatarIndex = parseInt(avatarFile.substr(3,2));
		}
		
		//hack
		avatarIndex = (avatarIndex * 2) -1;
	} else {
		if(avatarFile.length == 9){
			avatarIndex = parseInt(avatarFile.substr(4,1));
		} else {
			avatarIndex = parseInt(avatarFile.substr(4,2));
		}
		
		//hack
		avatarIndex = avatarIndex * 2;
	}
	
	//Only allow the selection if this avatar is available
	if(!isAvatarSelected(avatarIndex)){
		avatarPopupLogo.image = IMAGE_PATH+'player_selection/avatars/'+avatarFile;
		avatarCircleImagePath = IMAGE_PATH+'player_selection/avatars/'+avatarFile;
		
		//persist the selected avatar index & file for the current player
		var tmpPlayerObj = getConfiguredPlayerForIndex(playerIndex);
		tmpPlayerObj.avatarIndex = avatarIndex;
		tmpPlayerObj.avatarFile = avatarFile;
		
		//hide the keyboard
		avatarPopupTextField.blur();
	}
	
	//end avatar preselection (and shitty code)
	
	Ti.API.info('Try to preselect avatar '+avatarFile+' index is '+avatarIndex+' playerIndex='+playerIndex);
	
	avatarPopupHintTextLabel.hide();
	handleTextFieldBlur();	
}

//set avatar and name choice to empty avatar 
function setPlayerImagesLabels(){
	
	//update internal player object
	var playerObj = getConfiguredPlayerForIndex(playerIndex);
	playerObj.validated = true;
	playerObj.name = avatarPopupTextField.value;
	
	if(avatarPopupTextField.player_id != null){
		playerObj.player_id = avatarPopupTextField.player_id;
		Ti.API.info('not NULL');
	} else {
		Ti.API.info('NULL');
	}
	
	//Determine the player label to update and make it so
	var playerLabelIndex = (playerIndex * 2) - 1;
	var playerLabelObject = playerAvatarImagesView.children[playerLabelIndex];
	playerLabelObject.text = avatarPopupTextField.value;
	
	if(avatarPopupImageChanged){
		for(var i=0; i < playerAvatarImagesView.children.length; i++){
			var obj = playerAvatarImagesView.children[i];
			if(obj.isAvatar){
				if(obj.player == playerIndex){
					playerAvatarImagesView.children[i].image = avatarCircleImagePath;	
				}
			}
		}
	}
	
}