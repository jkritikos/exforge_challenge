 
 //The view
 var viewGroupSelection = Ti.UI.createView({
 	backgroundImage:IMAGE_PATH+'background.jpg',
 	opacity:0,
 	top:0,
 	bottom:0,
 	left:0,
 	right:0
 });
 
 //Back button
 var backHomeFromGroupSelection = Titanium.UI.createButton({
 	backgroundImage:IMAGE_PATH+'back.png',
 	backgroundSelectedImage:IMAGE_PATH+'back_green.png',
 	left:8,
 	top:8,
 	width:52,
 	height:52,
 	zIndex:10
 });
 
 backHomeFromGroupSelection.addEventListener('click', function(){
 	if(SOUNDS_MODE){
 		audioBack.play();
 	}
 	
 	if(groupSelectionStep == 2){
 		groupSelectionStep1();
 		groupSelectionStep = 1;
 	} else {
 		destroyGroupSelectionView();
 	}
 	
 	Ti.API.info('BACK to game selection clicked');
 });
 
viewGroupSelection.add(backHomeFromGroupSelection);

//UI components
var groupSelectionTopBanner = null;
var groupSelectionBannerLabel = null;
var groupSelectionTopBanner = null;
var groupSelectionBannerLabel = null;
var groupPlayersImageView = null;
var groupTeamsImageView = null;
var groupSwitchImageView = null;
var groupChillImageView = null;
var iconGroupImage = null;

//Labels
var groupChillDescLabel = null;
var groupChillTitleLabel = null;
var groupSwitchDescLabel = null;
var groupSwitchTitleLabel = null;
var groupTeamsDescLabel = null;
var groupTeamsTitleLabel = null;
var groupPlayersDescLabel = null;
var groupPlayersTitleLabel = null;

//Checked image
var groupCheckTypeImage = null;
var groupCheckTeamsImage = null;
var groupCheckSwitchImage = null;
var groupCheckChillImage = null;

//Boolean for checked selection
var checkPlayers = false;
var checkTeams = false;
var checkSwitch = false;
var checkChill = false;

//SELECTION TYPE FOR PLAYER AND TEAMS
var firstSelectionType = null;
//SELECTION TYPE FOR SWITCH AND CHILL
var secondSelectionType = null;

//image faders
var groupSelectionTopFader = null;
var groupSelectionBottomFader = null;
var groupSelectionStep = null;

function buildGroupSelectionView(){
	
	//UI components
	groupSelectionTopBanner = null;
	groupSelectionBannerLabel = null;
	
	groupSelectionStep = 1;
	
	var shouldCreateView = groupSelectionTopBanner == null;
	if(shouldCreateView){
		
		groupSelectionBottomFader = Ti.UI.createImageView({
			image:IMAGE_PATH+'group_selection/black_screen1.png',
			bottom:0,
			zIndex:5
		});
		
		viewGroupSelection.add(groupSelectionBottomFader);
		
		groupSelectionTopFader = Ti.UI.createImageView({
			image:IMAGE_PATH+'group_selection/black_screen2.png',
			top:0,
			zIndex:5,
			visible:false
		});
		
		viewGroupSelection.add(groupSelectionTopFader);
		
		iconGroupImage = Ti.UI.createImageView({
			image:IMAGE_PATH+'group_selection/icon_group.png',
			top:10,
			right:10,
			zIndex:10
		});
		
		viewGroupSelection.add(iconGroupImage);
		
		groupSelectionTopBanner = Ti.UI.createView({
			backgroundColor:'black',
			width:'100%',
			height:100,
			top:108
		}); 
		
		groupSelectionBannerLabel = Ti.UI.createLabel({
			text:'Θα χωριστείτε σε παίκτες ή ομάδες?',
			color:'white',
			textAlign:'center',
			top:36,
			font:{fontSize:30, fontWeight:'bold', fontFamily:'Myriad Pro'}
		});
		
		groupSelectionTopBanner.add(groupSelectionBannerLabel);
		viewGroupSelection.add(groupSelectionTopBanner);
		
		groupPlayersImageView = Ti.UI.createImageView({
			image:IMAGE_PATH+'group_selection/players.png',
			top:208,
			left:0,
			groupType:1	
		});
		
		//Labels inside every selection
		groupPlayersTitleLabel = Ti.UI.createLabel({
			text:'PLAYERS',
			textAlign:'center',
			top:85,
			width:280,
			height:130,
			zIndex:2,
			groupType:1,
			font:{fontSize:67, fontWeight:'bold', fontFamily:'321impact'}
		});
		
		groupPlayersDescLabel = Ti.UI.createLabel({
			text:'Κάθε παίκτης μόνος του εναντίον των άλλων!',
			textAlign:'center',
			top:195,
			width:280,
			height:60,
			zIndex:2,
			groupType:1,
			shadowColor:'#000000',
			shadowOffset:{x:1,y:1},
			font:{fontSize:25, fontWeight:'regular', fontFamily:'Myriad Pro'}
		});
		
		groupPlayersImageView.add(groupPlayersTitleLabel);
		groupPlayersImageView.add(groupPlayersDescLabel);
		
		viewGroupSelection.add(groupPlayersImageView);
		//Player handlers
		groupPlayersImageView.addEventListener('click', handleGroupSelectionTypes);
		
		groupTeamsImageView = Ti.UI.createImageView({
			image:IMAGE_PATH+'group_selection/teams.png',
			top:208,
			right:0,
			groupType:2
		});
		
		groupTeamsTitleLabel = Ti.UI.createLabel({
			text:'TEAMS',
			textAlign:'center',
			top:85,
			width:280,
			height:130,
			zIndex:2,
			groupType:2,
			font:{fontSize:67, fontWeight:'bold', fontFamily:'321impact'}
		});
		
		groupTeamsDescLabel = Ti.UI.createLabel({
			text:'Η απόλυτη ομαδική αναμέτρηση!',
			textAlign:'center',
			top:195,
			width:280,
			height:60,
			zIndex:2,
			groupType:2,
			shadowColor:'#000000',
			shadowOffset:{x:1,y:1},
			font:{fontSize:25, fontWeight:'regular', fontFamily:'Myriad Pro'}
		});
		
		groupTeamsImageView.add(groupTeamsTitleLabel);
		groupTeamsImageView.add(groupTeamsDescLabel);
		
		viewGroupSelection.add(groupTeamsImageView);
		//Teams handlers
		groupTeamsImageView.addEventListener('click', handleGroupSelectionTypes);
		
		groupSelectionTopBanner2 = Ti.UI.createView({
			backgroundColor:'black',
			width:'100%',
			height:100,
			top:560
		});
		
		groupSelectionBannerLabel2 = Ti.UI.createLabel({
			text:'Θέλετε να παίζετε εναλλάξ ή με το πάσο σας?',
			color:'white',
			textAlign:'center',
			top:36,
			font:{fontSize:30, fontWeight:'bold', fontFamily:'Myriad Pro'}
		});
		
		groupSelectionTopBanner2.add(groupSelectionBannerLabel2);
		viewGroupSelection.add(groupSelectionTopBanner2);
		
		groupSwitchImageView = Ti.UI.createImageView({
			image:IMAGE_PATH+'group_selection/switch.png',
			top:660,
			left:0,
			turnType:1
		});
		
		groupSwitchTitleLabel = Ti.UI.createLabel({
			text:'SWITCH',
			textAlign:'center',
			top:85,
			width:280,
			height:130,
			zIndex:2,
			turnType:1,
			font:{fontSize:67, fontWeight:'bold', fontFamily:'321impact'}
		});
		
		groupSwitchDescLabel = Ti.UI.createLabel({
			text:'Εναλλαγή παίκτη σε κάθε ερώτηση!',
			textAlign:'center',
			top:195,
			width:280,
			height:60,
			zIndex:2,
			turnType:1,
			shadowColor:'#000000',
			shadowOffset:{x:1,y:1},
			font:{fontSize:25, fontWeight:'regular', fontFamily:'Myriad Pro'}
		});
		
		groupSwitchImageView.add(groupSwitchTitleLabel);
		groupSwitchImageView.add(groupSwitchDescLabel);
		
		viewGroupSelection.add(groupSwitchImageView);
		//Switch handlers
		groupSwitchImageView.addEventListener('click', handleGroupSelectionTypes);
		
		groupChillImageView = Ti.UI.createImageView({
			image:IMAGE_PATH+'group_selection/chill.png',
			top:660,
			right:0,
			turnType:2
		});
		
		groupChillTitleLabel = Ti.UI.createLabel({
			text:'CHILL',
			textAlign:'center',
			top:85,
			width:280,
			height:130,
			zIndex:2,
			turnType:2,
			font:{fontSize:67, fontWeight:'bold', fontFamily:'321impact'}
		});
		
		groupChillDescLabel = Ti.UI.createLabel({
			text:'Πασάρεις μόλις χάσεις την παρτίδα!',
			textAlign:'center',
			top:195,
			width:280,
			height:60,
			zIndex:2,
			turnType:2,
			shadowColor:'#000000',
			shadowOffset:{x:1,y:1},
			font:{fontSize:25, fontWeight:'regular', fontFamily:'Myriad Pro'}
		});
		
		groupChillImageView.add(groupChillTitleLabel);
		groupChillImageView.add(groupChillDescLabel);
		
		viewGroupSelection.add(groupChillImageView);
		//Chill handlers
		groupChillImageView.addEventListener('click', handleGroupSelectionTypes);
		
		//Check image hidden behind every selection
		groupCheckPlayersImage = Ti.UI.createImageView({
			image:IMAGE_PATH+'group_selection/selection.png'
		});
	
		groupPlayersImageView.add(groupCheckPlayersImage);
		groupCheckPlayersImage.hide();
		
		groupCheckTeamsImage = Ti.UI.createImageView({
			image:IMAGE_PATH+'group_selection/selection.png'
		});
	
		groupTeamsImageView.add(groupCheckTeamsImage);
		groupCheckTeamsImage.hide();
		
		groupCheckSwitchImage = Ti.UI.createImageView({
			image:IMAGE_PATH+'group_selection/selection.png'
		});
	
		groupSwitchImageView.add(groupCheckSwitchImage);
		groupCheckSwitchImage.hide();
		
		groupCheckChillImage = Ti.UI.createImageView({
			image:IMAGE_PATH+'group_selection/selection.png'
		});
	
		groupChillImageView.add(groupCheckChillImage);
		groupCheckChillImage.hide();
		
		
		win.add(viewGroupSelection);
	} else{
		Ti.API.warn('NOT building GroupSelection view - already in progress')
	}
	
}

//Destroy buildGroupSelection
function destroyGroupSelectionView(){
	Ti.API.warn('destroyGroupSelectionView called');
	var shouldDestroyView = groupSelectionTopBanner != null;
	if(shouldDestroyView){
		viewGroupSelection.animate(anim_out);
		
		//Event Listeners for each selection - Players
		groupPlayersImageView.removeEventListener('click', handleGroupSelectionTypes);
		//Teams
		groupTeamsImageView.removeEventListener('click', handleGroupSelectionTypes);
		//Switch
		groupSwitchImageView.removeEventListener('click', handleGroupSelectionTypes);
		//Chill
		groupChillImageView.removeEventListener('click', handleGroupSelectionTypes);
		
		//faders
		viewGroupSelection.remove(groupSelectionBottomFader);
		viewGroupSelection.remove(groupSelectionTopFader);
		
		groupSelectionBottomFader = null;
		groupSelectionTopFader = null;
		
		//icon Group
		viewGroupSelection.remove(iconGroupImage);
		//Top Banner
		groupSelectionTopBanner.remove(groupSelectionBannerLabel);
		viewGroupSelection.remove(groupSelectionTopBanner);
		//Players Selection
		groupPlayersImageView.remove(groupPlayersTitleLabel);
		groupPlayersImageView.remove(groupPlayersDescLabel);
		viewGroupSelection.remove(groupPlayersImageView);
		//Teams selection
		groupTeamsImageView.remove(groupTeamsTitleLabel);
		groupTeamsImageView.remove(groupTeamsDescLabel);
		viewGroupSelection.remove(groupTeamsImageView);
		//Second banner
		groupSelectionTopBanner2.remove(groupSelectionBannerLabel2);
		viewGroupSelection.remove(groupSelectionTopBanner2);
		//Switch Selection
		groupSwitchImageView.remove(groupSwitchTitleLabel);
		groupSwitchImageView.remove(groupSwitchDescLabel);
		viewGroupSelection.remove(groupSwitchImageView);
		//Chill Selection
		groupChillImageView.remove(groupChillTitleLabel);
		groupChillImageView.remove(groupChillDescLabel);
		viewGroupSelection.remove(groupChillImageView);
		//Checks inside selection
		groupPlayersImageView.remove(groupCheckPlayersImage);
		groupTeamsImageView.remove(groupCheckTeamsImage);
		groupSwitchImageView.remove(groupCheckSwitchImage);
		groupChillImageView.remove(groupCheckChillImage);
		
		//UI components
		groupSelectionTopBanner = null;
		groupSelectionBannerLabel = null;
		groupSelectionTopBanner = null;
		groupSelectionBannerLabel = null;
		groupPlayersImageView = null;
		groupTeamsImageView = null;
		groupSwitchImageView = null;
		groupChillImageView = null;
		iconGroupImage = null;
		
		
		//Labels
		groupChillDescLabel = null;
		groupChillTitleLabel = null;
		groupSwitchDescLabel = null;
		groupSwitchTitleLabel = null;
		groupTeamsDescLabel = null;
		groupTeamsTitleLabel = null;
		groupPlayersDescLabel = null;
		groupPlayersTitleLabel = null;
		
		//Checked image
		groupCheckTypeImage = null;
		groupCheckTeamsImage = null;
		groupCheckSwitchImage = null;
		groupCheckChillImage = null;
		
		//Boolean for checked selection
		checkPlayers = null;
		checkTeams = null;
		checkSwitch = null;
		checkChill = null;
		
		win.remove(viewGroupSelection);
		Ti.API.warn('destroyGroupSelectionView has been destroyed');
	} else {
		Ti.API.info('NOT destroying GroupSelectionView view - already in porgress');
	}
}

function groupSelectionStep1(){
	groupSelectionTopFader.animate({opacity:0, duration:800});
	groupSelectionBottomFader.opacity = 1;
	groupSelectionBottomFader.show();
	
	groupSelectionStep = 1;
	
	checkSwitch = false;
	groupCheckSwitchImage.hide();
	checkChill = false;
	groupCheckChillImage.hide();
}

function groupSelectionStep2(){
	groupSelectionBottomFader.animate({opacity:0, duration:800});
	groupSelectionTopFader.opacity = 1;
	groupSelectionTopFader.show();
	
	groupSelectionStep = 2;
}

//Handle for all types of choises
function handleGroupSelectionTypes(e){
	if(SOUNDS_MODE){
		audioClick.play();	
	}
	
	//groupTurn or TurnType
	var groupType = e.source.groupType;
	var turnType = e.source.turnType;
	
	/*If a group is chosen, show the check, hide the check on the other one,
	set the GameGroupType or GroupTurnType and make the chosen true and the 
	other one false*/
	if(groupType == BUZZ_GROUP_TYPE_PLAYERS && !checkPlayers){
		groupCheckPlayersImage.show();
		gameSession.setGameGroupType(BUZZ_GROUP_TYPE_PLAYERS);
		groupCheckTeamsImage.hide();
		groupSwitchDescLabel.text = 'Εναλλαγή παίκτη σε κάθε ερώτηση!';
		Ti.API.info('players chosen');
		checkPlayers = true;
		checkTeams = false;
		groupType = null;
		
		groupSelectionStep2();
	}else if(groupType == BUZZ_GROUP_TYPE_TEAMS && !checkTeams){
		groupCheckTeamsImage.show();
		gameSession.setGameGroupType(BUZZ_GROUP_TYPE_TEAMS);
		groupSwitchDescLabel.text = 'Εναλλαγή ομάδας σε κάθε ερώτηση!';
		groupCheckPlayersImage.hide();
		Ti.API.info('teams chosen');
		checkTeams = true;
		checkPlayers = false;
		groupType = null;
		
		groupSelectionStep2();
	}else if(turnType == BUZZ_GROUP_TURN_SWITCH && !checkSwitch){
		groupCheckSwitchImage.show();
		gameSession.setGroupTurnType(BUZZ_GROUP_TURN_SWITCH);
		groupCheckChillImage.hide();
		Ti.API.info('switch chosen');
		checkSwitch = true;
		checkChill = false;
		turnType = null;
	}else if(turnType == BUZZ_GROUP_TURN_CHILL && !checkChill){
		groupCheckChillImage.show();
		gameSession.setGroupTurnType(BUZZ_GROUP_TURN_CHILL);
		groupCheckSwitchImage.hide();
		Ti.API.info('chill chosen');
		checkChill = true;
		checkSwitch = false;
		turnType = null;
	}
	
	//mistake learned - 2 are required - one of each
	if((checkPlayers || checkTeams) && (checkSwitch || checkChill)){
		
		setTimeout(function(){
	    	mtbImport("player_selection.js");
			buildGroupPlayerSelectionView();
			viewGroupPlayerSelection.animate(anim_in);
		},250);
	}
}
