var TEAM_MEMBER_JACE = 1;
var TEAM_MEMBER_ZOU = 2;
var TEAM_MEMBER_PANOS = 3;
var TEAM_MEMBER_ADA = 4;
var TEAM_MEMBER_KOUTSOUK = 5;
var TEAM_MEMBER_KAROLINA = 6;
var TEAM_MEMBER_OLYMPIOU = 7;

//About view
var viewAboutCredits = Ti.UI.createView({
	backgroundImage:IMAGE_PATH+'background.jpg',
	opacity:0,
	top:0,
	bottom:0,
	left:0,
	right:0
});

//back button
var backHomeAboutCreditsButton = Titanium.UI.createButton({
	backgroundImage:IMAGE_PATH+'back.png',
	backgroundSelectedImage:IMAGE_PATH+'back_green.png',
	left:8,
	top:8,
	width:52,
	height:52
});

viewAboutCredits.add(backHomeAboutCreditsButton);

//Back button event listener
backHomeAboutCreditsButton.addEventListener('click', function() {
	if(SOUNDS_MODE){
		audioBack.play();
	}
	
	Ti.API.info('BACK to home clicked from about credits.');
	destroyAboutCredits();
	viewAboutCredits.animate(anim_out);
});

//UI components
var iconImageAboutCredits = null;
var barImageAboutCredits = null;
var iconReflectionImageAboutCredits = null;
var titleImageAboutCredits = null;
var aboutCreditsTableHeader = null;

var aboutCreditsTeamTable = null;
var aboutCreditsTableData = null;

function buildAboutCredits(){
	var shouldCreateView = iconImageAboutCredits == null;
	if(shouldCreateView){
		//Icon image
		iconImageAboutCredits = Titanium.UI.createImageView({
			image:IMAGE_PATH+'about/icon.png',
			top:16,
			right:15
		});
		
		viewAboutCredits.add(iconImageAboutCredits);
		
		//Bar image
		barImageAboutCredits = Titanium.UI.createImageView({
			image:IMAGE_PATH+'top/bar.png',
			top:108
		});
		
		viewAboutCredits.add(barImageAboutCredits);
		
		//Icon image reflection
		iconReflectionImageAboutCredits = Titanium.UI.createImageView({
			image:IMAGE_PATH+'about/icon_r.png',
			top:1,
			right:15
		});
		
		barImageAboutCredits.add(iconReflectionImageAboutCredits);
		
		//Title image
		titleImageAboutCredits = Titanium.UI.createImageView({
			image:IMAGE_PATH+'about/title.png',
			top:49,
			zIndex:2
		});
		
		viewAboutCredits.add(titleImageAboutCredits);
		
		//Table header
		aboutCreditsTableHeader = Ti.UI.createLabel({
			text:'CREDITS',
			color:'#fc0309',
			height:60,
			left:15,
			top:255,
			font:{fontSize:40, fontWeight:'bold', fontFamily:'321impact'}
		});
		
		viewAboutCredits.add(aboutCreditsTableHeader);
		
		//team table
		aboutCreditsTeamTable = Titanium.UI.createTableView({
			minRowHeight:37,
			backgroundColor:'transparent',
			separatorStyle:Ti.UI.iPhone.TableViewSeparatorStyle.NONE,
			top:335,
			bottom:0,
		});
		
		aboutCreditsTableData = [];
		aboutCreditsTableData.push(createAboutCreditRow(TEAM_MEMBER_JACE));
		aboutCreditsTableData.push(createAboutCreditRow(TEAM_MEMBER_ZOU));
		aboutCreditsTableData.push(createAboutCreditRow(TEAM_MEMBER_PANOS));
		aboutCreditsTableData.push(createAboutCreditRow(TEAM_MEMBER_ADA));
		aboutCreditsTableData.push(createAboutCreditRow(TEAM_MEMBER_KOUTSOUK));
		aboutCreditsTableData.push(createAboutCreditRow(TEAM_MEMBER_KAROLINA));
		aboutCreditsTableData.push(createAboutCreditRow(TEAM_MEMBER_OLYMPIOU));
		aboutCreditsTeamTable.setData(aboutCreditsTableData);
		viewAboutCredits.add(aboutCreditsTeamTable);
		
		win.add(viewAboutCredits);
	} else {
		Ti.API.warn('NOT building AboutInfo view - already in progress');
	}
}

function destroyAboutCredits(){
	var shouldDestroyView = iconImageAboutCredits != null;
	if(shouldDestroyView){
		
		//Remove components
		barImageAboutCredits.remove(iconReflectionImageAboutCredits);
		viewAboutCredits.remove(iconImageAboutCredits);
		viewAboutCredits.remove(barImageAboutCredits);
		viewAboutCredits.remove(titleImageAboutCredits);
		viewAboutCredits.remove(aboutCreditsTableHeader);
		viewAboutCredits.remove(aboutCreditsTeamTable);
		
		//Destroy components
		iconImageAboutCredits = null;
		//Bar image
		barImageAboutCredits = null;
		//Icon image reflection
		iconReflectionImageAboutCredits = null;
		//Title image
		titleImageAboutCredits = null;
		//Table header
		aboutCreditsTableHeader = null;
		//team table
		aboutCreditsTeamTable = null;
		aboutCreditsTableData = null;
		
		win.remove(viewAboutCredits);
	} else {
		
	}
}

//Creates a table row object for the credits table
function createAboutCreditRow(teamMember){
	var avatarImage = null;
	var name = null;
	var job = null;
	var twitter = null;
	
	if(teamMember == TEAM_MEMBER_JACE){
		avatarImage = IMAGE_PATH+'about/avatars/jason.png';
		name = 'Jason Kritikos';
		job = 'Developer';
		twitter = '@sanosai';
	} else if(teamMember == TEAM_MEMBER_ZOU){
		avatarImage = IMAGE_PATH+'about/avatars/zou.png';
		name = 'Christina Sigala';
		job = 'Designer & Marketer';
		twitter = '@zounizou';
	} else if(teamMember == TEAM_MEMBER_PANOS){
		avatarImage = IMAGE_PATH+'about/avatars/meritzis.png';
		name = 'Panagiotis Meritzis';
		job = 'Content Manager';
		twitter = '@meritzianbank';
	} else if(teamMember == TEAM_MEMBER_ADA){
		avatarImage = IMAGE_PATH+'about/avatars/ada.png';
		name = 'Alexandra Psofaki';
		job = 'Content Editor';
		twitter = '@adapsofaki';
	} else if(teamMember == TEAM_MEMBER_KOUTSOUK){
		avatarImage = IMAGE_PATH+'about/avatars/koutsoukos.png';
		name = 'Kon/nos Koutsoukos';
		job = 'Content Editor';
		twitter = '';
	} else if(teamMember == TEAM_MEMBER_KAROLINA){
		avatarImage = IMAGE_PATH+'about/avatars/karolina.png';
		name = 'Karolina Thomoglou';
		job = 'Content Translator';
		twitter = '';
	} else if(teamMember == TEAM_MEMBER_OLYMPIOU){
		avatarImage = IMAGE_PATH+'about/avatars/giorgos.jpg';
		name = 'George Olymbiou';
		job = 'SQL Ninja';
		twitter = '';
	}
	
	var row1 = Ti.UI.createTableViewRow({
		height:145,
		width:'auto', 
		backgroundColor:'transparent',
		selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
		className:'ABOUT_CREDIT'
	});
	
	//Create bg image view
	var bgImage = Titanium.UI.createImageView({
		image:IMAGE_PATH+'about/avatars/avatarbar.png'
	});
	
	var avatar = Ti.UI.createImageView({
		image:avatarImage,
		left:15
	});
	
	var labelName = Titanium.UI.createLabel({
		text:name,
		color:'white',
		left:140,
		top:50,
		font:{fontSize:22, fontWeight:'bold', fontFamily:'Myriad Pro'}
	});
	
	var labelRole = Titanium.UI.createLabel({
		text:job,
		color:'gray',
		left:140,
		top:75,
		font:{fontSize:21, fontWeight:'regular', fontFamily:'Myriad Pro'}
	});
	
	row1.add(bgImage);
	row1.add(avatar);
	row1.add(labelName);
	row1.add(labelRole);
	
	return row1;
}