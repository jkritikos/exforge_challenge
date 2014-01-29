//About view
var viewAboutInfo = Ti.UI.createView({
	backgroundImage:IMAGE_PATH+'background.jpg',
	opacity:0,
	top:0,
	bottom:0,
	left:0,
	right:0
});

//back button
var backHomeAboutInfoButton = Titanium.UI.createButton({
	backgroundImage:IMAGE_PATH+'back.png',
	backgroundSelectedImage:IMAGE_PATH+'back_green.png',
	left:8,
	top:8,
	height:52,
	width:52
});

viewAboutInfo.add(backHomeAboutInfoButton);

//Back button event listener
backHomeAboutInfoButton.addEventListener('click', function() {
	if(SOUNDS_MODE){
		audioBack.play();
	}
	
	Ti.API.info('BACK to home clicked from about info.');
	destroyAboutInfo();
	viewAboutInfo.animate(anim_out);
});

//UI components
var iconImageAboutInfo = null;
var barImageAboutInfo = null;
var iconReflectionImageAboutInfo = null;
var titleImageAboutInfo = null;
var aboutInfoTableHeader = null;

var aboutTableInfo = null;
var aboutTableInfoData = null;

function buildAboutInfo(infoType){
	var shouldCreateView = iconImageAboutInfo == null;
	if(shouldCreateView){
	
		//Icon image
		iconImageAboutInfo = Titanium.UI.createImageView({
			image:IMAGE_PATH+'about/icon.png',
			top:16,
			right:15
		});
		
		viewAboutInfo.add(iconImageAboutInfo);
		
		//Bar image
		barImageAboutInfo = Titanium.UI.createImageView({
			image:IMAGE_PATH+'top/bar.png',
			top:108
		});
		
		viewAboutInfo.add(barImageAboutInfo);
		
		//Icon image reflection
		iconReflectionImageAboutInfo = Titanium.UI.createImageView({
			image:IMAGE_PATH+'about/icon_r.png',
			top:1,
			right:15
		});
		
		barImageAboutInfo.add(iconReflectionImageAboutInfo);
		
		//Title image
		titleImageAboutInfo = Titanium.UI.createImageView({
			image:IMAGE_PATH+'about/title.png',
			top:49,
			zIndex:2
		});
		
		viewAboutInfo.add(titleImageAboutInfo);
		
		//about info table
		aboutTableInfo = Titanium.UI.createTableView({
			data:[],
			backgroundColor:'transparent',
			separatorStyle:Ti.UI.iPhone.TableViewSeparatorStyle.NONE,
			top:340,
			bottom:20
		});
		
		aboutTableInfoData = [];
		
		var headerText = '';
		if(infoType == ABOUT_PAGE_HOWTO){
			aboutTableInfoData.push(buildAboutInfoTableRow(1, 'Επιλέγεις μια από τις 11 κατηγορίες γνώσεων\n για να παίξεις.\n\n'));
			aboutTableInfoData.push(buildAboutInfoTableRow(2, 'Προσπαθείς να απαντήσεις σε όσο το δυνατόν περισσότερες ερωτήσεις και όσο πιο γρήγορα μπορείς, για να κερδίσεις περισσότερους πόντους.\n\n'));
			aboutTableInfoData.push(buildAboutInfoTableRow(3, 'Έχεις μόνο τρεις ζωές για να σπαταλήσεις, άρα σου επιτρέπεται να κάνεις λάθος μόνο τρεις φορές.\n\n'));
			aboutTableInfoData.push(buildAboutInfoTableRow(4, 'Βάλε τα δυνατά σου για να κερδίσεις χρωματιστά παράσημα, που προσφέρονται σε κάθε κατηγορία.'));
		
			headerText = 'HOW TO PLAY';
		} else if(infoType == ABOUT_PAGE_TIPS){
			aboutTableInfoData.push(buildAboutInfoTableRow(1, 'Αν απαντήσεις σωστά σε 10 συνεχόμενες ερωτήσεις, κερδίζεις μια επιπλέον ζωή. Ο μέγιστος όμως αριθμός ζωών που μπορείς να έχεις είναι πέντε.'));
			aboutTableInfoData.push(buildAboutInfoTableRow(2, 'Όσο προχωράνε οι ερωτήσεις, τόσο αυξάνεται ο βαθμός δυσκολίας τους, αλλά τόσο αυξάνονται και οι πόντοι που θα κερδίσεις αν απαντήσεις σωστά.\n\n'));
			aboutTableInfoData.push(buildAboutInfoTableRow(3, 'Για ευνόητους λόγους, δεν υπάρχει pause στο παιχνίδι, αλλά μπορείς να κάνεις ένα break μεταξύ ερωτήσεων.'));
		
			headerText = 'TIPS & TRICKS';
		} else if(infoType == ABOUT_PAGE_BADGES){
			aboutTableInfoData.push(buildAboutInfoTableRow(1, 'Κάθε κατηγορία έχει το παράσημό της και κάθε παράσημο έχει από 1 έως 3 αστέρια για να κατακτήσεις.'));
			aboutTableInfoData.push(buildAboutInfoTableRow(2, 'Όσους περισσότερους πόντους κάνεις, τόσα περισσότερα αστέρια κερδίζεις σε κάθε παράσημο.\n\n'));
			aboutTableInfoData.push(buildAboutInfoTableRow(3, 'Υπάρχουν και παράσημα ειδικής κατηγορίας, όπως το \"Πιο Γρήγορο Δάχτυλο\", τα οποία κερδίζεις ανάλογα με την απόδοσή σου.'));
		
			headerText = 'WIN BADGES';
		} else if(infoType == ABOUT_PAGE_ABOUTUS){
			aboutTableInfoData.push(buildAboutInfoTableRow(1, 'Μια ομάδα Ελλήνων που αποφάσισε να μοιραστεί το πάθος της για γνώση και trivia games.\n\n'));
			aboutTableInfoData.push(buildAboutInfoTableRow(2, 'Νο.1 game στο Ελληνικό App Store, με χιλιάδες φανατικούς παίχτες να μας υποστηρίζουν καθημερινά.'));
			aboutTableInfoData.push(buildAboutInfoTableRow(3, 'ΟΛΕΣ οι ερωτήσεις δημιουργήθηκαν από την ομάδα του Mind the Buzz και αποτελούν copyright του παιχνιδιού.'));
			aboutTableInfoData.push(buildAboutInfoTableRow(4, 'Βρείτε την ομάδα πίσω από το Mind the Buzz και μιλήστε μαζί τους!'));
		
			headerText = 'ABOUT US';
		}
		
		aboutTableInfo.setData(aboutTableInfoData);
		viewAboutInfo.add(aboutTableInfo);
		
		//Table header
		aboutInfoTableHeader = Ti.UI.createLabel({
			text:headerText,
			color:'#fc0309',
			height:60,
			left:15,
			top:255,
			font:{fontSize:40, fontWeight:'bold', fontFamily:'321impact'}
		});
		
		viewAboutInfo.add(aboutInfoTableHeader);
		
		win.add(viewAboutInfo);
	} else {
		Ti.API.warn('NOT building AboutInfo view - already in progress');
	}
}

function destroyAboutInfo(){
	var shouldDestroyView = iconImageAboutInfo != null;
	if(shouldDestroyView){
		
		barImageAboutInfo.remove(iconReflectionImageAboutInfo);
		viewAboutInfo.remove(titleImageAboutInfo);
		viewAboutInfo.remove(aboutInfoTableHeader);
		viewAboutInfo.remove(barImageAboutInfo);
		viewAboutInfo.remove(iconImageAboutInfo);
		viewAboutInfo.remove(aboutTableInfo);
		
		//Icon image
		iconImageAboutInfo = null;
		//Bar image
		barImageAboutInfo = null;
		//Icon image reflection
		iconReflectionImageAboutInfo = null;
		//Title image
		titleImageAboutInfo = null;
		//about info table
		aboutTableInfo = null;
		aboutTableInfoData = null;
		aboutInfoTableHeader = null;
		
		win.remove(viewAboutInfo);
	}
}

function buildAboutInfoTableRow(i, rowText){
	var row1 = Ti.UI.createTableViewRow({
		height:'auto',
		width:'90%',
		className:'ABOUT_INFO_ROW',
	});
	
	var indexImage = Ti.UI.createImageView({
		image:IMAGE_PATH+'about/'+i+'.png',
		left:25,
		top:1
	});
	
	var textLabel = Ti.UI.createLabel({
		text:rowText,
		color:'white',
		left:95,
		right:55,
		top:1,
		font:{fontSize:25, fontWeight:'regular', fontFamily:'Myriad Pro'}
	});

	row1.add(indexImage);
	row1.add(textLabel);
	return row1;
}
