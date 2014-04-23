//About view
var viewTipsDetails = Ti.UI.createView({
	backgroundImage:IMAGE_PATH+'signin/background.jpg',
	opacity:0,
	top:0,
	bottom:0,
	left:0,
	right:0
});

//back button
var backHomeTipsDetailsButton = Titanium.UI.createButton({
	backgroundImage:IMAGE_PATH+'categories/back.png',
	left:30,
	top:25,
	width:55,
	height:55
});

//Back button event listener
backHomeTipsDetailsButton.addEventListener('click', function() {
	if(SOUNDS_MODE){
		audioBack.play();
	}
	
	Ti.API.info('BACK to home clicked from about info.');
	destroyTipsDetails();
	viewTipsDetails.animate(anim_out);
});

//UI components
var tipsDetailsLogoImage = null;
var tipsDetailsTable = null;
var tipsDetailsTableData = null;
var tipsDetailsTitleBackgroundBar = null;
var tipsDetailsTitleLabel = null;
var tipsDetailsTypeBackgroundBar = null;
var tipsDetailsTypeTitle = null;

function buildTipsDetails(tipType){
	var shouldCreateView = tipsDetailsLogoImage == null;
	if(shouldCreateView){
		
		var tipTitle = '';
		var tipLogo = '';
		
		if(tipType == TIPS_GAME){
			tipTitle = 'ΟΔΗΓΙΕΣ ΠΑΙΧΝΙΔΙΟΥ';
			tipLogo = IMAGE_PATH+'settings/icon_odigies_small.png';
		}else if(tipType == TIPS_USEFUL){
			tipTitle = 'ΧΡΗΣΙΜΑ TIPS';
			tipLogo = IMAGE_PATH+'settings/icon_tips_small.png';
		}else if(tipType == TIPS_BADGES){
			tipTitle = 'ΠΑΡΑΣΗΜΑ';
			tipLogo = IMAGE_PATH+'settings/icon_badges_small.png';
		}
		
		//title background bar
		tipsDetailsTitleBackgroundBar = Titanium.UI.createView({
			backgroundColor:'fb494a',
			height:192,
			top:0
		});
		
		tipsDetailsTitleBackgroundBar.add(backHomeTipsDetailsButton);
		
		//Name Label value
		tipsDetailsTitleLabel = Titanium.UI.createLabel({
			text:'ΟΔΗΓΙΕΣ',
			color:'white',
			top:103,
			font:{fontSize:64, fontWeight:'bold', fontFamily:'Myriad Pro'}
		});
		tipsDetailsTitleBackgroundBar.add(tipsDetailsTitleLabel);
		
		//Icon image
		tipsDetailsLogoImage = Titanium.UI.createImageView({
			image:tipLogo,
			top:20,
			right:25
		});
		tipsDetailsTitleBackgroundBar.add(tipsDetailsLogoImage);
		
		viewTipsDetails.add(tipsDetailsTitleBackgroundBar);
		
		tipsDetailsTypeBackgroundBar = Titanium.UI.createView({
			backgroundColor:'0b4b7f',
			height:86,
			top:192
		});
		
		tipsDetailsTypeTitle = Titanium.UI.createLabel({
			text:tipTitle,
			top:26,
			color:'white',
			font:{fontSize:39, fontWeight:'bold', fontFamily:'Myriad Pro'}
		});
		tipsDetailsTypeBackgroundBar.add(tipsDetailsTypeTitle);
		
		viewTipsDetails.add(tipsDetailsTypeBackgroundBar);
		
		//about info table
		tipsDetailsTable = Titanium.UI.createTableView({
			data:[],
			backgroundColor:'transparent',
			separatorStyle:Ti.UI.iPhone.TableViewSeparatorStyle.NONE,
			top:336,
			bottom:20
		});
		
		tipsDetailsTableData = [];
		
		if(tipType == TIPS_GAME){
			tipsDetailsTableData.push(buildTipsDetailsTableRow('Επιλέγεις μια από τις 5 κατηγορίες γνώσεων.'));
			tipsDetailsTableData.push(buildTipsDetailsTableRow('Προσπαθείς να απαντήσεις σε όσο το δυνατόν περισσότερες ερωτήσεις και όσο πιο γρήγορα μπορείς, για να κερδίσεις περισσότερους πόντους.'));
			tipsDetailsTableData.push(buildTipsDetailsTableRow('Έχεις μόνο τρεις ζωές για να σπαταλήσεις, για αυτό επέλεξε σοφά τις απαντήσεις σου.'));
			tipsDetailsTableData.push(buildTipsDetailsTableRow('Σε όλες τις κατηγορίες - εκτός της Exforge - μπορείς να μάθεις περισσότερα μετά από κάθε ερώτηση, ακολουθώντας το W (Wikipedia) link.'));
			tipsDetailsTableData.push(buildTipsDetailsTableRow('Βάλε τα δυνατά σου για να κερδίσεις παράσημα, αλλά και για να πετύχεις το υψηλότερο σκορ σε κάθε κατηγορία γνώσης!'));
		}else if(tipType == TIPS_USEFUL){
			tipsDetailsTableData.push(buildTipsDetailsTableRow('Αν απαντήσεις σωστά σε 10 συνεχόμενες ερωτήσεις, θα κερδίσεις μια επιπλέον ζωή!'));
			tipsDetailsTableData.push(buildTipsDetailsTableRow('Ο μέγιστος αριθμός ζωών που μπορείς να έχεις είναι πέντε.'));
			tipsDetailsTableData.push(buildTipsDetailsTableRow('Όσο προχωράνε οι ερωτήσεις, τόσο αυξάνεται ο βαθμός δυσκολίας τους, αλλά τόσο αυξάνονται και οι πόντοι που θα κερδίσεις αν απαντήσεις σωστά!'));
			tipsDetailsTableData.push(buildTipsDetailsTableRow('Πρόσεξε μην τελειώσει ο χρόνος όσο παίζεις, γιατί θα χάσεις μια ζωή!'));
			tipsDetailsTableData.push(buildTipsDetailsTableRow('Για ευνόητους λόγους, δεν υπάρχει “pause” στο παιχνίδι, αλλά μπορείς να κάνεις ένα break μεταξύ ερωτήσεων.'));
		}else if(tipType == TIPS_BADGES){
			tipsDetailsTableData.push(buildTipsDetailsTableRow('Σε κάθε κατηγορία αντιστοιχεί και ένα μοναδικό παράσημο για να κατακτήσεις.'));
			tipsDetailsTableData.push(buildTipsDetailsTableRow('Κάθε παράσημο περιλαμβάνει τρία επίπεδα δυσκολίας, που απεικονίζονται με ένα, δύο και τρία αστέρια αντίστοιχα.'));
			tipsDetailsTableData.push(buildTipsDetailsTableRow('Όσους περισσότερους πόντους κερδίσεις, τόσα περισσότερα αστέρια θα κατακτήσεις στην κατηγορία που επέλεξες.'));
			tipsDetailsTableData.push(buildTipsDetailsTableRow('Πάτα πάνω σε ένα παράσημο, για να μάθεις πόσους πόντους χρειάζεσαι για να κατακτήσεις κάθε αστέρι.'));
		}
		
		tipsDetailsTable.setData(tipsDetailsTableData);
		viewTipsDetails.add(tipsDetailsTable);
		
		win.add(viewTipsDetails);
	} else {
		Ti.API.warn('NOT building TipsDetails view - already in progress');
	}
}

function destroyTipsDetails(){
	var shouldDestroyView = tipsDetailsLogoImage != null;
	if(shouldDestroyView){
		
		tipsDetailsTitleBackgroundBar.remove(tipsDetailsTitleLabel);
		tipsDetailsTitleBackgroundBar.remove(tipsDetailsLogoImage);
		viewTipsDetails.remove(tipsDetailsTitleBackgroundBar);
		
		tipsDetailsTypeBackgroundBar.remove(tipsDetailsTypeTitle);
		viewTipsDetails.remove(tipsDetailsTypeBackgroundBar);
		viewTipsDetails.remove(tipsDetailsTable);
		tipsDetailsTable.setData(null);
		
		//Icon image
		tipsDetailsLogoImage = null;
		tipsDetailsTitleBackgroundBar = null;
		tipsDetailsTitleLabel = null;
		tipsDetailsTypeBackgroundBar = null;
		tipsDetailsTypeTitle = null;
		//about info table
		tipsDetailsTable = null;
		tipsDetailsTableData = null;
		
		win.remove(viewTipsDetails);
	}
}

function buildTipsDetailsTableRow(rowText){
	var row1 = Ti.UI.createTableViewRow({
		height:'auto',
		className:'TIPS_DETAILS_ROW',
	});
	
	var textLabel = Ti.UI.createLabel({
		text:rowText,
		color:'0b4b7f',
		textAlign:'center',
		left:90,
		right:90,
		top:33,
		font:{fontSize:25, fontWeight:'regular', fontFamily:'Myriad Pro'}
	});
	
	row1.height = textLabel.height + 20;

	row1.add(textLabel);
	return row1;
}
