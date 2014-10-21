var API = '';

if(!PRODUCTION_MODE){
	UrbanAirship.key='QcPHp0gxT3-3yj5Y9aLDpA';
	UrbanAirship.secret ='xUCXrw0xQq-8fCqXbf7NdA';
	UrbanAirship.master_secret='qK_-SzSeQP6NA_UQ8g-ENw';
	UrbanAirship.baseurl = 'https://go.urbanairship.com';
	//API = 'https://exforge.boomar.gr/api/';
	//API = 'https://exforge-challenge.gr/api/';
	API = 'http://exforge/api/';
} else {
	UrbanAirship.key='W1NHMmPjR56aHc3u6nu6iA';
	UrbanAirship.secret ='KBiUUr_mQwKYNmTXX5oVpQ';
	UrbanAirship.master_secret='0louzaRKRLmStWwb0qEHjw';
	UrbanAirship.baseurl = 'https://go.urbanairship.com';
	API = 'https://exforge-challenge.gr/api/';
}

var NETWORK_TIMEOUT = 20000;

//Types of games
var BUZZ_GAME_SOLO = 1;
var BUZZ_GAME_GROUP = 2;

//Types of group play
var BUZZ_GROUP_TYPE_PLAYERS = 1;
var BUZZ_GROUP_TYPE_TEAMS = 2;

//Types of group switching modes
var BUZZ_GROUP_TURN_SWITCH = 1;
var BUZZ_GROUP_TURN_CHILL = 2;

//File includes
var INCLUDED_ABOUT = false;

//Friend invites
var APPSTORE_URL = 'https://itunes.apple.com/gr/app/mind-the-buzz/id575291020?mt=8';
var INVITE_SUBJECT = 'Κούρδισε το μυαλό σου!';
var INVITE_BODY_FB = 'Πόσο διαβασμένος είσαι? Σε προκαλώ να παίξεις Mind The Buzz και να με περάσεις - αν τα καταφέρεις - στο σκορ! 10 κατηγορίες γνώσεων. Πάνω από 5000 ερωτήσεις. Κατέβασέ τώρα το Mind The Buzz στο παρακάτω link: '+APPSTORE_URL;
var INVITE_BODY_EMAIL = 'Πόσο διαβασμένος είσαι?<br>Σε προκαλώ να παίξεις <b>Mind The Buzz</b> και να με περάσεις - αν τα καταφέρεις - στο σκορ!<br>10 κατηγορίες γνώσεων. Πάνω από 5000 ερωτήσεις. Κατέβασέ τώρα το Mind The Buzz στο παρακάτω link: '+APPSTORE_URL;
var INVITE_BODY_SMS = 'Πόσο διαβασμένος είσαι? Σε προκαλώ να παίξεις Mind The Buzz και να με περάσεις - αν τα καταφέρεις - στο σκορ! 10 κατηγορίες γνώσεων. Πάνω από 5000 ερωτήσεις. Κατέβασέ τώρα το Mind The Buzz στο παρακάτω link: '+APPSTORE_URL;
var MAX_FB_INVITES = 20;

//Push notifications
var DEVICE_TOKEN = '';
var NOTIFICATION_OPTION_FRIEND_SCORE = 1;
var NOTIFICATION_OPTION_FRIEND_JOIN = 2;

//Categories
var CAT_EPISTIMI = 1;
var CAT_EXFORGE = 1000;
var CAT_GEOGRAFIA = 3;
var CAT_ATHLITIKA = 4;
var CAT_ISTORIA = 6;


var CAT_EVERYTHING = 0;

//Rest for badges
var CAT_SPEED = 11;
var CAT_ALL = 12;

//Default badges
DEFAULT_BADGES = 13;

//Badge limits
var BADGE1_LEVEL1 = 1000; //1000
var BADGE1_LEVEL2 = 3000; //3000
var BADGE1_LEVEL3 = 5000; //5000

var BADGE2_LEVEL1 = 1000;
var BADGE2_LEVEL2 = 3000;
var BADGE2_LEVEL3 = 5000;

var BADGE3_LEVEL1 = 1000;
var BADGE3_LEVEL2 = 3000;
var BADGE3_LEVEL3 = 5000;

var BADGE4_LEVEL1 = 1000;
var BADGE4_LEVEL2 = 3000;
var BADGE4_LEVEL3 = 5000;

var BADGE5_LEVEL1 = 1000;
var BADGE5_LEVEL2 = 3000;
var BADGE5_LEVEL3 = 5000;

var BADGE6_LEVEL1 = 1000;
var BADGE6_LEVEL2 = 3000;
var BADGE6_LEVEL3 = 5000;

var BADGE7_LEVEL1 = 1000;
var BADGE7_LEVEL2 = 3000;
var BADGE7_LEVEL3 = 5000;

var BADGE8_LEVEL1 = 1000;
var BADGE8_LEVEL2 = 3000;
var BADGE8_LEVEL3 = 5000;

var BADGE9_LEVEL1 = 1000;
var BADGE9_LEVEL2 = 3000;
var BADGE9_LEVEL3 = 5000;

var BADGE10_LEVEL1 = 1000;
var BADGE10_LEVEL2 = 3000;
var BADGE10_LEVEL3 = 5000;

//150,300,500
var BADGE11_LEVEL1 = 150;
var BADGE11_LEVEL2 = 300;
var BADGE11_LEVEL3 = 500;

//3,6,10
var BADGE12_LEVEL1 = 10;
var BADGE12_LEVEL2 = 20;
var BADGE12_LEVEL3 = 30;

var BADGE13_LEVEL1 = 1000;
var BADGE13_LEVEL2 = 3000;
var BADGE13_LEVEL3 = 5000;

//User badge levels
var userLevelBadge1 = 0;
var userLevelBadge2 = 0;
var userLevelBadge3 = 0;
var userLevelBadge4 = 0;
var userLevelBadge5 = 0;
var userLevelBadge6 = 0;
var userLevelBadge7 = 0;
var userLevelBadge8 = 0;
var userLevelBadge9 = 0;
var userLevelBadge10 = 0;
var userLevelBadge11 = 0;
var userLevelBadge12 = 0;
var userLevelBadge13 = 0;

var BADGE1_LABEL = 'IAΤΡΙΚΟ ΦΑΙΝΟΜΕΝΟ';
var BADGE1_DESCRIPTION = 'Έχεις τις γνώσεις για να γίνεις \"Ιατρικό Φαινόμενο\"?';

var BADGE2_LABEL = 'ΤΡΕΛΟΣ ΕΠΙΣΤΗΜΟΝΑΣ';
var BADGE2_DESCRIPTION = 'Έχεις τις γνώσεις για να γίνεις \"Τρελός Επιστήμονας\"?';

var BADGE3_LABEL = 'ΠΕΙΡΑΤΗΣ ΤΟΥ ΚΟΣΜΟΥ';
var BADGE3_DESCRIPTION = 'Έχεις τις γνώσεις για να γίνεις \"Πειρατής του κόσμου\"?';

var BADGE4_LABEL = 'ΙΣΤΟΡΙΚΟ ΠΑΙΧΤΡΟΝΙ';
var BADGE4_DESCRIPTION = 'Έχεις τις γνώσεις για να γίνεις \"Ιστορικό Παιχτρόνι\"?';

var BADGE5_LABEL = 'ΓΕΝΝΗΜΕΝΟΣ ΑΘΛΗΤΗΣ';
var BADGE5_DESCRIPTION = 'Έχεις τις γνώσεις για να γίνεις \"Γεννημένος Αθλητής\"?';

var BADGE6_LABEL = 'Ιστορικό Παιχτρόνι';
var BADGE6_DESCRIPTION = 'Γίνε \"Ιστορικό Παιχτρόνι\" κερδίζοντας όσους περισσότερους πόντους μπορείς στην κατηγορία Ιστορία!';

var BADGE7_LABEL = 'Πορωμένος Μουσικός';
var BADGE7_DESCRIPTION = 'Γίνε \"Πορωμένος Μουσικός\" κερδίζοντας όσους περισσότερους πόντους μπορείς στην κατηγορία Μουσική!';

var BADGE8_LABEL = 'Μπάμπης Κουλτούρας';
var BADGE8_DESCRIPTION = 'Γίνε \"Μπάμπης Κουλτούρας\" κερδίζοντας όσους περισσότερους πόντους μπορείς στην κατηγορία Τέχνες!';

var BADGE9_LABEL = 'Αγνός Φυσιολάτρης';
var BADGE9_DESCRIPTION = 'Γίνε \"Αγνός Φυσιολάτρης\" κερδίζοντας όσους περισσότερους πόντους μπορείς στην κατηγορία Ζώα & Φυτά!';

var BADGE10_LABEL = 'Παπαράτσι με Στυλ';
var BADGE10_DESCRIPTION = 'Γίνε \"Παπαράτσι με Στυλ\" κερδίζοντας όσους περισσότερους πόντους μπορείς στην κατηγορία Lifestyle!';

var BADGE11_LABEL = 'Πιο Γρήγορο Δάχτυλο';
var BADGE11_DESCRIPTION = 'Γίνε το \"Πιο Γρήγορο Δάχτυλο\" απαντώντας γρήγορα και σωστά σε όσες περισσότερες ερωτήσεις μπορείς!';

var BADGE12_LABEL = 'Απόλυτο Σαΐνι';
var BADGE12_DESCRIPTION = 'Γίνε \"Απόλυτο Σαΐνι\" κερδίζοντας παράσημα στις υπόλοιπες κατηγορίες!';

var BADGE13_LABEL = 'Total Buzzόβιος';
var BADGE13_DESCRIPTION = 'Γίνε \"Total Buzzόβιος\" κερδίζοντας όσους περισσότερους πόντους μπορείς στην κατηγορία Total Buzz!';

/*Displayed on the loader screen just before the game begins*/
var loaderTips = [];
loaderTips.push("Όσο πιο γρήγορα απαντήσεις, τόσους περισσότερους πόντους θα κερδίσεις!");
loaderTips.push("Απάντησε σωστά σε 10 συνεχόμενες ερωτήσεις και κέρδισε μια ζωή!");
loaderTips.push("Έχεις μόνο 3 ζωές σε κάθε παιχνίδι, για αυτό επέλεξε σοφά τις απαντήσεις σου!");
loaderTips.push("Πρόσεξε μην τελειώσει ο χρόνος όσο παίζεις, γιατί θα χάσεις μια ζωή!");
loaderTips.push("Φτάσε τους 1000 πόντους, και κέρδισε το πρώτο παράσημο της κατηγορίας!");

/*Displayed when a player looses in a multiplayer game*/
var looserTips = [];
looserTips.push("Eτοιμάσου για ρεβάνς!");
looserTips.push("Χρειάζεσαι προπόνηση!");
looserTips.push("Θα το αφήσεις έτσι?");
looserTips.push("Δεν τα πήγες άσχημα όμως!");
looserTips.push("Χρειάζεσαι κούρδισμα!");
looserTips.push("Σκέψου όμως πόσα έμαθες!");
looserTips.push("Μην απογοητεύσαι... έρχεται ρεβάνς!");
looserTips.push("Μήπως να δοκιμάσεις άλλη κατηγορία?");
looserTips.push("Δες το θετικά... σκόραρες καλά!");
looserTips.push("Παίζει ρόλο και η τύχη...");

//Application messages
var MSG_NO_INTERNET_CONNECTION = "Είσαι offline man...";
var MSG_FB_INVITE_SUCCESS = "Ελήφθη. Όβερ!";
var MSG_FB_INVITE_FAILURE = "Ουπς, κάτι δεν πήγε καλά...";
var MSG_FB_INVITE_IN_PROCESS = 'Η πρόσκληση σου διακτινίζεται...';
var FORCE_UPDATE_ALERT_MSG = "Πρέπει να κάνεις ένα γρήγορο update πρώτα και μετά είμαστε έτοιμοι για παιχνίδι.";

//Security server actions
var SECURITY_ACTION_BLACKLIST_APP = 1;
var SECURITY_ACTION_FORCE_UPDATE = 2;

//report errors
var WRONG_ANSWER = 1;
var WRONG_GRAMMAR = 2;
var DIFFERENT_CATEGORY = 3;
var WRONG_WIKI = 4;
var OTHER = 5;

//Constants for question retrieval
var QUESTION_GROUP_LOAD_EASY = 10; //10
var QUESTION_GROUP_LOAD_MEDIUM = 10; //10
var QUESTION_GROUP_LOAD_HARD = 1; //yes 1
var QUESTION_SOLO_LOAD_EASY = 10; //10
var QUESTION_SOLO_LOAD_MEDIUM = 10; //10
var QUESTION_SOLO_LOAD_HARD = 150; //150

var DUMMY_GROUP_PLAYER_ID = 999;

//Purchase popup components
var buyAppPopupBackgroundImage = null;
var buyAppPopupCloseImage = null;
var buyAppPopupMainLabel = null;
var buyAppButtonimage = null;

/*Used by the purchaseApplication popup*/
function openItunes(){
	Ti.Platform.openURL("itms-apps://itunes.apple.com/gr/app/mind-the-buzz/id575291020?mt=8");
}

function closePurchasePopup(){
	buyAppPopupBackgroundImage.transform = SCALE_ZERO;
}

function buildPurchaseApplicationPopup(){
	if(buyAppPopupBackgroundImage == null){
		//popup background
		buyAppPopupBackgroundImage = Ti.UI.createImageView({
			image:IPHONE5? IMAGE_PATH+'categories/purchase_popup/playmore-568h.png' : IMAGE_PATH+'categories/purchase_popup/playmore.png',
			transform:SCALE_ZERO,
			zIndex:300
		});
		
		//popup close button
		buyAppPopupCloseImage = Ti.UI.createButton({
			backgroundImage:IMAGE_PATH+'top/invite_x.png',
			top:isIpad ? 115 : IPHONE5? 85: 55,
			right:isIpad ? 85:19,
			width:isIpad ? 78:41,
			height:isIpad ? 76:40
		});
	
		//popup main label
		buyAppPopupMainLabel = Ti.UI.createLabel({
			text:'Ζήσε την απόλυτη\n εμπειρία του\n Mind the Buzz\n κατεβάζοντας το\n full version!',
			color:'white',
			textAlign:'center',
			width:isIpad? 300:150,
			font:{fontSize:isIpad?33:16, fontWeight:'bold', fontFamily:'Myriad Pro'},
			top:isIpad ? 450 : IPHONE5? 245: 210
		});
		
		//popup buy app button
		buyAppButtonimage = Ti.UI.createButton({
			backgroundImage:IMAGE_PATH+'categories/purchase_popup/download.png',
			bottom:isIpad ? 215 : IPHONE5? 150: 105,
			width:isIpad ? 286:128,
			height:isIpad ? 86:37
		});
		
		buyAppPopupBackgroundImage.add(buyAppButtonimage);
		buyAppPopupBackgroundImage.add(buyAppPopupMainLabel);
		buyAppPopupBackgroundImage.add(buyAppPopupCloseImage);
		
		buyAppButtonimage.addEventListener('click', openItunes);
		buyAppPopupCloseImage.addEventListener('click', closePurchasePopup);
	}
	
	//Return the popup to the caller so it can be added to the current view
	return buyAppPopupBackgroundImage;
}

/*Returns the properties of the specified category*/
function getCategoryProperties(id){
	var obj = null;
	if(id == CAT_EXFORGE){
		obj = {
			name:'EXFORGE',
			loader:IMAGE_PATH+'loader/exforge.png',
			banner:IMAGE_PATH+'question/categ_icons/exforge.png',
			tag:IMAGE_PATH+'top/tags/exforge.png',
			square:IMAGE_PATH+'top/categ_popup/exforge.png',
			available:true
		};
	} else if(id == CAT_EPISTIMI){
		obj = {
			name:'ΕΠΙΣΤΗΜΗ',
			loader:IMAGE_PATH+'loader/science.png',
			banner:IMAGE_PATH+'question/categ_icons/science.png',
			tag:IMAGE_PATH+'top/tags/epistimi.png',
			square:IMAGE_PATH+'top/categ_popup/epistimi.png',
			available:true
		};
	} else if(id == CAT_GEOGRAFIA){
		obj = {
			name:'ΓΕΩΓΡΑΦΙΑ',
			loader:IMAGE_PATH+'loader/geo.png',
			banner:IMAGE_PATH+'question/categ_icons/geo.png',
			tag:IMAGE_PATH+'top/tags/geo.png',
			square:IMAGE_PATH+'top/categ_popup/geo.png',
			available:true
		};
	} else if(id == CAT_ISTORIA){
		obj = {
			name:'ΙΣΤΟΡΙΑ',
			loader:IMAGE_PATH+'loader/history.png',
			banner:IMAGE_PATH+'question/categ_icons/history.png',
			tag:IMAGE_PATH+'top/tags/istoria.png',
			square:IMAGE_PATH+'top/categ_popup/istoria.png',
			available:true
		};
	} else if(id == CAT_ATHLITIKA){
		obj = {
			name:'ΑΘΛΗΤΙΚΑ',
			loader:IMAGE_PATH+'loader/sports.png',
			banner:IMAGE_PATH+'question/categ_icons/sports.png',
			tag:IMAGE_PATH+'top/tags/sports.png',
			square:IMAGE_PATH+'top/categ_popup/sports.png',
			available:true
		};
	} else if(id == CAT_EVERYTHING){
		obj = {
			name:'ΟΛΕΣ ΟΙ ΚΑΤΗΓΟΡΙΕΣ',
			tag:IMAGE_PATH+'top/tags/all.png',
			square:IMAGE_PATH+'top/categ_popup/all.png'
		};
	}
	
	return obj; 
}

/*Raises an alert and redirects to the appstore for the app update*/
function forceAppUpdate(){
	var dialog = Ti.UI.createAlertDialog({
	    message: FORCE_UPDATE_ALERT_MSG,
	    title: 'Update required'
	});

	dialog.addEventListener('click', function(e){
	    Ti.Platform.openURL("itms-apps://itunes.apple.com/gr/app/mind-the-buzz/id575291020?mt=8");
	});
	dialog.show();
}

function handleSecurityAction(jsonResponse){
	Ti.API.info('handleSecurityAction() called for '+jsonResponse);
	if(jsonResponse.SECURITY.action == SECURITY_ACTION_BLACKLIST_APP){
		
		//Blacklist this instance - no more talking to the server
		var flag = jsonResponse.SECURITY.flag == 1 ? true : false;
		setSecurityOption(SECURITY_ACTION_BLACKLIST_APP,flag);
		BLACKLISTED = flag;
		Ti.API.warn('handleSecurityAction() set BLACKLISTED='+BLACKLISTED);
		
	} else if(jsonResponse.SECURITY.action == SECURITY_ACTION_FORCE_UPDATE){
		
		//Force app update - no more playing
		var flag = jsonResponse.SECURITY.flag == 1 ? true : false;
		setSecurityOption(SECURITY_ACTION_FORCE_UPDATE,true);
		FORCE_BUZZ_UPDATE = flag;
		Ti.API.warn('handleSecurityAction() set FORCE_BUZZ_UPDATE='+FORCE_BUZZ_UPDATE);
	}
}

/*Returns the next loading tip to use (round-robin)*/
function getLoadingTip(){
	var tips = loaderTips.length;
	var targetIndex = 0;
	var lastPersistedIndex = Ti.App.Properties.getInt('LAST_TIP_LOADED');
	
	Ti.API.info('found '+tips+' tips lastPersistedIndex='+lastPersistedIndex);
	
	if(lastPersistedIndex != null){
		if(lastPersistedIndex == (tips-1)){
			Ti.API.info('setting index to 0');
			targetIndex = 0;
		} else {
			targetIndex = lastPersistedIndex + 1;
			Ti.API.info('else setting index to '+targetIndex);
		}
	} 
	
	Ti.App.Properties.setInt('LAST_TIP_LOADED', targetIndex);
	return loaderTips[targetIndex];
}

/*Returns the next looser tip to use (round-robin)*/
function getLooserTip(){
	var tips = looserTips.length;
	var targetIndex = 0;
	var lastPersistedIndex = Ti.App.Properties.getInt('LAST_LOOSER_TIP_LOADED');
	
	Ti.API.info('found '+tips+' tips lastPersistedIndex='+lastPersistedIndex);
	
	if(lastPersistedIndex != null){
		if(lastPersistedIndex == (tips-1)){
			Ti.API.info('setting index to 0');
			targetIndex = 0;
		} else {
			targetIndex = lastPersistedIndex + 1;
			Ti.API.info('else setting index to '+targetIndex);
		}
	} 
	
	Ti.App.Properties.setInt('LAST_LOOSER_TIP_LOADED', targetIndex);
	return looserTips[targetIndex];
}

var decrypt = function(message){
	message = decodeURI(message);
	//Ti.API.warn('decrypt() called for '+message);
	
    var key = CryptoJS.enc.Hex.parse(Ti.App.Properties.getString('AES_KEY'));
    var iv = CryptoJS.enc.Hex.parse(Ti.App.Properties.getString('AES_IV'));
    
    //Ti.API.warn('decrypted using key '+key+' and iv '+iv);
    
    var decrypted = CryptoJS.AES.decrypt(message, key, { iv: iv });      
    var decryptedText = (decrypted.toString(CryptoJS.enc.Utf8));  
    
    //Ti.API.warn('decrypted message to '+decryptedText);
    return decryptedText;
};

var encryptBuzz = function(message){
    var key = CryptoJS.enc.Hex.parse(Ti.App.Properties.getString('AES_KEY'));
    var iv = CryptoJS.enc.Hex.parse(Ti.App.Properties.getString('AES_IV'));
     
    message = CryptoJS.AES.encrypt(message, key, { iv: iv });
    message = encodeURI(message);
    
    return message;
};

/*Talks to the server to obtain config data*/
function hello(){
	
	var k1 = "57622f5";
	var k2 = "26916f52becfa91db932";
	var k3 = "acb0cbc2c0046fb30";
	var k4 = "fc41ab3502d5ac3b6d08";
	var v1 = "bba6707d3f";
	var v2 = "018b645166b47f";
	var v3 = "d9c5e83b";
	
	var k = k1+k2+k3+k4;
	var v = v1+v2+v3;
	Ti.App.Properties.setString("AES_KEY", k);
	Ti.App.Properties.setString("AES_IV", v);
	/*
	if (Titanium.Network.online == true){
		var xhr = Ti.Network.createHTTPClient();
			xhr.setTimeout(NETWORK_TIMEOUT);
			
			xhr.onload = function(e) {
				Ti.API.info('hello() got back from server '+this.responseText); 	
				var jsonData = JSON.parse(this.responseText);
				
				if(jsonData.APPSTORE_URL != null && jsonData.APPSTORE_URL != ''){
					INVITE_BODY_FB += ' Κατέβασέ τώρα το Mind The Buzz στο παρακάτω link: '+jsonData.APPSTORE_URL;
					INVITE_BODY_SMS += ' Κατέβασέ τώρα το Mind The Buzz στο παρακάτω link: '+jsonData.APPSTORE_URL;
					INVITE_BODY_EMAIL += ' Κατέβασέ τώρα το Mind The Buzz στο παρακάτω link: '+jsonData.APPSTORE_URL;
				}
				
				//Determine if a content update is needed
				isContentUpdateNeeded(jsonData.CONTENT_VERSION);
				Ti.API.info('hello() completes '); 
			};
			
			xhr.open('POST', API + 'hello'); 
			xhr.send();
	}
	*/
}

function setGameInProgress(v){
	Ti.API.warn('setGameInProgress() called with value '+v);
	Ti.App.Properties.setBool('GAME_IN_PROGRESS', v);
}

function isGameInProgress(){
	Ti.API.warn('isGameInProgress() called - value is '+Ti.App.Properties.getBool('GAME_IN_PROGRESS'));
	if(Ti.App.Properties.getBool('GAME_IN_PROGRESS') != null){
		return Ti.App.Properties.getBool('GAME_IN_PROGRESS');	
	} else {
		return false;
	}
}

function sortFBFriends(a, b){
	var aName = a.name.toLowerCase();
	var bName = b.name.toLowerCase();
	return ((aName < bName) ? -1 : ((aName > bName) ? 1: 0));
}

function registerPushNotifications(playerRemoteId){
	var alias = playerRemoteId;
	Ti.API.warn("registerPushNotifications trying to register for player: "+alias);
	if (Titanium.Network.online == true){
		Ti.Network.registerForPushNotifications({
			types: [
		    	Ti.Network.NOTIFICATION_TYPE_BADGE,
		    	Ti.Network.NOTIFICATION_TYPE_ALERT,
		    	Ti.Network.NOTIFICATION_TYPE_SOUND
		  	],
	  		success:function(e){
	    		var deviceToken = e.deviceToken;
	    		setDeviceToken(deviceToken);
	    		
	    		//Default the notification options online
	    		saveNotificationOptionsOnline();
	    		
			    Ti.API.info('successfully registered for apple device token with '+e.deviceToken);
			    var params = {
			      tags: ['version'+Ti.App.getVersion()],
			      alias: alias
			    };
			    UrbanAirship.register(params, function(data) {
	      			Ti.API.debug("registerUrban success: " + JSON.stringify(data));
	      			//alert('push success');
	    		}, function(errorregistration) {
	      			Ti.API.warn("Couldn't register for Urban Airship");
	      			//alert('push error');
	    		});
	  		},
	  		error:function(e) {
	  			//alert('push disabled '+e.toString);
	    		Ti.API.warn("push notifications disabled: "+e.toString);
	  		},
	  		callback:function(e) {
	    		/*
	    		var a = Ti.UI.createAlertDialog({
	      			title:'New Message',
	      			message:e.data.alert
	    		});
	    		a.show();
	    		*/
	  		}
		});
	}
}

/*Persists the device token*/
function setDeviceToken(t){
	Ti.API.info('setDeviceToken() '+t);
	Ti.App.Properties.setString('DEVICE_TOKEN', t);
}

/*Returns the persisted device token*/
function getDeviceToken(){
	return Ti.App.Properties.getString('DEVICE_TOKEN');
}

/*Persists the security flag*/
function setSecurityOption(type,value){
	var key = 'SECURITY_'+type;
	Ti.App.Properties.setBool(key, value);
}

/*Returns the persisted security option*/
function getSecurityOption(type){
	var key = 'SECURITY_'+type;
	var value = Ti.App.Properties.getBool(key);
	
	if(value == null){
		value = false;
	}
	return value;
}

/*Persists the notification option*/
function setNotificationOption(type, value){
	var key = 'NOTIFICATION_'+type;
	Ti.App.Properties.setString(key, value);
}

/*Returns the persisted notification option*/
function getNotificationOption(type){
	var key = 'NOTIFICATION_'+type;
	var value = Ti.App.Properties.getString(key);
	
	if(value == null){
		value = '1';
	}
	return value;
}

function saveNotificationOptionsOnline(){
	//Get data
	var token = getDeviceToken();
	var playerObject = getCurrentPlayer();
	var remotePlayerId = playerObject.player_id;
	
	var optionFriendScore = getNotificationOption(NOTIFICATION_OPTION_FRIEND_SCORE);
	var optionFriendJoin = getNotificationOption(NOTIFICATION_OPTION_FRIEND_JOIN);
	Ti.API.info('saveNotificationOptionsOnline() called. Notification options are '+optionFriendScore+' and '+optionFriendJoin);
	
	if(token != null && token != ''){
		if (Titanium.Network.online == true && !BLACKLISTED){
			
			Ti.API.info('saveNotificationOptionsOnline() saving token '+token+' with optionFriendScore='+optionFriendScore+' and optionFriendJoin='+optionFriendJoin+' for remotePlayerId='+remotePlayerId);
			var xhr = Ti.Network.createHTTPClient();
			xhr.setTimeout(NETWORK_TIMEOUT);
			
			xhr.onload = function(e) {
				Ti.API.info('saveNotificationOptionsOnline() got back from server '+this.responseText); 	
				var jsonData = JSON.parse(this.responseText);
				
				if(jsonData.RESPONSE == '1'){
					handleSecurityAction(jsonData);
				}
			};
			
			xhr.open('POST', API + 'saveNotificationOptions'); 
			xhr.send({
				token:token,
				notificationFriendScore:optionFriendScore,
				notificationFriendJoin:optionFriendJoin,
				remotePlayerId:remotePlayerId,
				applicationTypeId:BUZZ_APP_TYPE
			});
		} else {
			Ti.API.warn('saveNotificationOptionsOnline() offline. BLACKLISTED='+BLACKLISTED);
		}
	}
}

/*Persists the boolean for MUSIC mode*/
function setMusicMode(currentValue){
	Ti.App.Properties.setBool('MUSIC_MODE', currentValue);
}

/*Returns the persisted MUSIC mode*/
function getMusicMode(){
	var currentVal = Ti.App.Properties.getBool('MUSIC_MODE');
	if(currentVal != null){
		return currentVal;
	} else {
		return true;
	}
}

/*Persists the boolean for SOUNDS mode*/
function setSoundsMode(currentValue){
	Ti.App.Properties.setBool('SOUNDS_MODE', currentValue);
}

/*Returns the persisted SOUNDS mode*/
function getSoundsMode(){
	var currentVal = Ti.App.Properties.getBool('SOUNDS_MODE');
	if(currentVal != null){
		return currentVal;
	} else {
		return true;
	}
}

/*Persists the array of facebook friends*/
function saveFacebookFriends(data){
	Ti.App.Properties.setString('FACEBOOK_FRIENDS', data);
}

/*Returns the persisted array of facebook friends*/
function getFacebookFriends(){
	Ti.API.warn('DAO.getFacebookFriends() returns '+Ti.App.Properties.getString('FACEBOOK_FRIENDS'));
	return Ti.App.Properties.getString('FACEBOOK_FRIENDS');
}

/*Saves a game session*/
function saveGameSession(playerId, categoryId){
	Ti.API.warn('--- saveGameSession for player '+playerId+' for category '+categoryId);
	var db = Ti.Database.install('buzz_db.sqlite', 'db');
	db.execute('insert into GAME_SESSIONS(category_id,date_played,player_id) values (?,date(), ?)',categoryId,playerId);
	db.close();
}

/*Saves a group game session & the associated scores*/
function saveGroupGameSession(categoryId, gameSessionPlayerObjects,groupType){
	Ti.API.warn('--- saveGroupGameSession for category '+categoryId);
	var defaultSyncFlag = 0;
	var playersCount = gameSessionPlayerObjects != null ? gameSessionPlayerObjects.length : 0;
	
	var db = Ti.Database.install('buzz_db.sqlite', 'db');
	db.execute('BEGIN');
	db.execute('insert into GAME_SESSIONS_GROUP(category_id,date_played,group_type,num_players,sync) values (?,date(),?,?,?)',categoryId,groupType,playersCount,defaultSyncFlag);
	var gameId = db.lastInsertRowId;
	
	var groupScoresSaved = 0;
	if(gameSessionPlayerObjects != null){
		for(var i=0; i < gameSessionPlayerObjects.length; i++){
			//var tmpPlayerId = gameSessionPlayerObjects[i].id;
			var tmpPlayerId = gameSessionPlayerObjects[i].player_id;
			var tmpScore = gameSessionPlayerObjects[i].score;
			var tmpName = gameSessionPlayerObjects[i].name;
			var tmpAvatar = gameSessionPlayerObjects[i].avatarFile;
			db.execute('insert into scores_group(game_id,player_id,score,name,avatar_filename) values(?,?,?,?,?)',gameId,tmpPlayerId,tmpScore,tmpName,tmpAvatar);
			
			groupScoresSaved++;
		}
	}
	
	Ti.API.warn('--- saveGroupGameSession saved '+groupScoresSaved+' group scores for group game with id '+gameId);
	db.execute('COMMIT');
	db.close();
	
	//Convert to arrays
	var localSessionIdArr = [];
	localSessionIdArr.push(gameId);
	var categoryIdArr = [];
	categoryIdArr.push(categoryId);
	var groupTypeArr = [];
	groupTypeArr.push(groupType);
	var numPlayersArr = [];
	numPlayersArr.push(playersCount);
	//Save online
	saveGroupGameSessionOnline(localSessionIdArr,categoryIdArr, groupTypeArr, numPlayersArr);
}

/*Saves a group game session online*/
function saveGroupGameSessionOnline(localSessionIdArr,categoryIdArray, groupTypeArray, numPlayersArray){
	if (Titanium.Network.online == true && !BLACKLISTED){
		var xhr = Ti.Network.createHTTPClient();
		xhr.setTimeout(NETWORK_TIMEOUT);
		
		localSessionIdArr = escape(JSON.stringify(localSessionIdArr));
		categoryIdArray = escape(JSON.stringify(categoryIdArray));
		groupTypeArray = escape(JSON.stringify(groupTypeArray));
		numPlayersArray = escape(JSON.stringify(numPlayersArray));
		
		var params = {
			applicationTypeId:BUZZ_APP_TYPE,
			categoryId:categoryIdArray,
			groupType:groupTypeArray,
			numPlayers:numPlayersArray,
			localSession:localSessionIdArr
		};
		
		xhr.onload = function(e) {
			var db = Ti.Database.install('buzz_db.sqlite', 'db');
			
			Ti.API.info('saveGroupGameSessionOnline() got back from server '+this.responseText); 	
			var jsonData = JSON.parse(this.responseText);
				
			if(jsonData.RESPONSE == '1'){
				var processedObjects = jsonData.processed;
				for(var i=0; i < processedObjects.length; i++){
					Ti.API.info('saveGroupGameSessionOnline() server processed object '+processedObjects[i]);
					db.execute('update GAME_SESSIONS_GROUP set sync=1 where id=?', processedObjects[i]);
					Ti.API.info('saveGroupGameSessionOnline() updated sync flag for '+processedObjects[i]);
				}
			}
			
			db.close();
		};
		
		xhr.open('POST', API + 'saveGroupGameSession'); 
		xhr.send(params);
	} else {
		Ti.API.warn('saveGroupGameSessionOnline() offline. BLACKLISTED='+BLACKLISTED);
	}
}

/*Saves a player's answer to a question*/
function saveAnswer(questionId, playerId, correct, speed){
	var db = Ti.Database.install('buzz_db.sqlite', 'db');
	//var speedAnswer = speed == 1 ? true : false;
	var speedAnswer = speed ? 1 : 0;
	Ti.API.warn('--- saveAnswer() for question '+questionId+' player '+playerId+' correct '+correct+' speed '+speed);
	db.execute('insert into questions_player (question_id,player_id,correct,speed) values (?,?,?,?)', questionId,playerId,correct,speedAnswer);
	db.close();
}

/*Updates the local player with the specified remote id*/
function updatePlayerRemoteId(playerId, remotePlayerId){
	var db = Ti.Database.install('buzz_db.sqlite', 'db');
	Ti.API.info('DAO: updatePlayerRemoteId() called with remote id '+remotePlayerId+' for player_id '+playerId);
	db.execute('UPDATE PLAYERS SET PLAYER_ID=? WHERE ID=?', remotePlayerId, playerId);
	db.close();
	
	//tmp just to test
	var t = getCurrentPlayer();
}

/*Checks if the specified column exists in the specified table*/
function columnExists(table,column){
	var exists = false;
	
	var db = Ti.Database.install('buzz_db.sqlite', 'db');
	var rows = db.execute('PRAGMA table_info('+table+')');
	while (rows.isValidRow()){
		if(rows.field(1) == column){
			exists = true;
			break;
		}
		
		rows.next();
	}
	
	rows.close();
	db.close();
	
	Ti.API.info('columnExists() called for table '+table+' and column '+column+' and returns '+exists);
	return exists;
}

/*Checks if stuff exists, and modifies the schema*/
function updateSchema(){
	var currentDBVersion = Ti.App.Properties.getInt('DATABASE_VERSION');
	if(currentDBVersion == null) currentDBVersion = 0;
	
	Ti.API.info('updateSchema() called: currentDBVersion='+currentDBVersion);
	
	var db = Ti.Database.install('buzz_db.sqlite', 'db');
	
	//version 1.2 changes
	if(currentDBVersion < 1){
		var shouldCreateTotalBuzz = false;
	
		var sqlTotalBuzzCheck = "select count(*) from categories where id=13";
		var rows = db.execute(sqlTotalBuzzCheck);
		while (rows.isValidRow()){
			if(rows.field(0) == 0){
				shouldCreateTotalBuzz = true;
			}
			rows.next();
		}
		
		if(shouldCreateTotalBuzz){
			Ti.API.info('updateSchema() 1.2: creating TOTAL BUZZ');
			db.execute('INSERT INTO CATEGORIES (ID,NAME) VALUES (?,?)', 13, 'TOTALBUZZ');
		} else {
			Ti.API.info('updateSchema() 1.2: NOT creating TOTAL BUZZ - already exists');
		}
		
		currentDBVersion = 1;
	}
	//end version 1.2 changes
	
	//version 1.3 changes
	if(currentDBVersion < 2){
		//create group scores table if not exists
		Ti.API.info('updateSchema() 1.3: creating tables for GROUP games');
		db.execute('create table if not exists GAME_SESSIONS_GROUP (\"id\" INTEGER PRIMARY KEY AUTOINCREMENT,\"category_id\" integer,\"date_played\" real,\"group_type\" integer, \"num_players\" integer, \"sync\" integer)');
		db.execute('create table if not exists SCORES_GROUP (\"id\" INTEGER PRIMARY KEY AUTOINCREMENT,\"game_id\" integer,\"player_id\" integer,\"score\" integer, \"name\" varchar(128), \"avatar_filename\" varchar(128))');
		db.execute('create table if not exists PLAYERS_GROUP (\"id\" INTEGER PRIMARY KEY AUTOINCREMENT, \"name\" varchar(128), \"player_id\" integer,\"avatar_filename\" varchar(128))');
		
		//create indexes
		Ti.API.info('updateSchema() 1.3: creating indexes');
		db.execute('create index if not exists question_cat_value_index on questions (category_id,value)');
		db.execute('create index if not exists question_player_index on questions_player (question_id,player_id)');
		
		//add pack & wiki columns in the questions table
		Ti.API.info('updateSchema() creating WIKI & PACK support for questions');
		if(!columnExists('questions','wikipedia')){
			db.execute('alter table questions add column wikipedia varchar(768)');
		} else {
			Ti.API.info('updateSchema() NOT creating wikipedia column - already exists');
		}
		
		if(!columnExists('questions','pack_id')){
			db.execute('alter table questions add column pack_id integer default 0');
		} else {
			Ti.API.info('updateSchema() NOT creating pack_id column - already exists');
		}
		
		currentDBVersion = 2;
	}
	//end version 1.3 changes
	
	//Persist db version
	Ti.App.Properties.setInt('DATABASE_VERSION', currentDBVersion);
	
	db.close();
	Ti.API.info('updateSchema() ends');
}

/*Returns a set of questions of the specified difficulty to be played. Used when users run out of question*/
function getGameQuestionsHard(categoryId, playerId){
	var start = new Date().getTime();
	Ti.API.info('getGameQuestionsHard() for categoryId '+categoryId+' and player '+playerId);
	
	var db = Ti.Database.install('buzz_db.sqlite', 'db');
	var questions = [];
	
	var sql = ' SELECT * FROM (SELECT * FROM (';
	sql += ' SELECT ID, QUESTION, ANSWER_A, ANSWER_B, ANSWER_C, ANSWER_D, CORRECT, VALUE, CATEGORY_ID,WIKIPEDIA,QUESTION_ID,PLAYCOUNT FROM (';
	sql += ' SELECT q.ID, QUESTION, ANSWER_A, ANSWER_B, ANSWER_C, ANSWER_D, q.CORRECT, VALUE, CATEGORY_ID,WIKIPEDIA,q.QUESTION_ID, count(qp.question_id) playcount, ABS(RANDOM()) RANCOL';
	sql += ' FROM QUESTIONS q left join questions_player qp on (q.id=qp.question_id and qp.player_id=?)';
	sql += ' WHERE CATEGORY_ID = ? AND VALUE = 300 group by q.id order by playcount) ORDER BY PLAYCOUNT,RANCOL) LIMIT 200)';
	
	var i = 0;
	var rows = db.execute(sql, playerId,categoryId);
	while (rows.isValidRow()){
		i++;
		
		var id = rows.field(0);
		var question = rows.field(1);
		var answer_a = rows.field(2);
		var answer_b = rows.field(3);
		var answer_c = rows.field(4);
		var answer_d = rows.field(5);
		var correct = rows.field(6);
		var value = rows.field(7);
		var categoryId = rows.field(8);
		var wikipedia = rows.field(9);
		var question_id = rows.field(10);
		
		var obj = {
			id:id,
			question:question,
			answer_a:answer_a,
			answer_b:answer_b,
			answer_c:answer_c,
			answer_d:answer_d,
			correct:correct,
			value:value,
			category_id:categoryId,
			wikipedia:wikipedia,
			question_id:question_id
		};	
		
		questions.push(obj);
		rows.next();
	}
	
	rows.close();
	db.close();
	
	var returnObj = {data:questions};
	var end = new Date().getTime();
	var duration = end - start;
	Ti.API.info('getGameQuestionsHard() for categoryId '+categoryId+' and player '+playerId+' returns '+i+' in '+duration+' ms');
	return returnObj;
}

/*Returns a set of questions of the specified difficulty to be played. Used when users run out of question*/
function getRandomGameQuestionsHard(playerId){
	var start = new Date().getTime();
	Ti.API.info('getRandomGameQuestionsHard() for player '+playerId);
	
	var db = Ti.Database.install('buzz_db.sqlite', 'db');
	var questions = [];
	
	var sql = ' SELECT * FROM (SELECT * FROM (';
	sql += ' SELECT ID, QUESTION, ANSWER_A, ANSWER_B, ANSWER_C, ANSWER_D, CORRECT, VALUE, CATEGORY_ID,WIKIPEDIA,QUESTION_ID FROM (';
	sql += ' SELECT q.ID, QUESTION, ANSWER_A, ANSWER_B, ANSWER_C, ANSWER_D, q.CORRECT, VALUE, CATEGORY_ID,WIKIPEDIA,q.QUESTION_ID, count(qp.question_id) playcount, ABS(RANDOM()) RANCOL';
	sql += ' FROM QUESTIONS q left join questions_player qp on (q.id=qp.question_id and qp.player_id=?)';
	sql += ' WHERE VALUE = 300 group by q.id order by playcount) ORDER BY PLAYCOUNT,RANCOL,CATEGORY_ID) LIMIT 200)';
	
	var i = 0;
	var rows = db.execute(sql, playerId);
	while (rows.isValidRow()){
		i++;
		
		var id = rows.field(0);
		var question = rows.field(1);
		var answer_a = rows.field(2);
		var answer_b = rows.field(3);
		var answer_c = rows.field(4);
		var answer_d = rows.field(5);
		var correct = rows.field(6);
		var value = rows.field(7);
		var categoryId = rows.field(8);
		var wikipedia = rows.field(9);
		var question_id = rows.field(10);
		
		var obj = {
			id:id,
			question:question,
			answer_a:answer_a,
			answer_b:answer_b,
			answer_c:answer_c,
			answer_d:answer_d,
			correct:correct,
			value:value,
			category_id:categoryId,
			wikipedia:wikipedia,
			question_id:question_id
		};	
		
		questions.push(obj);
		rows.next();
	}
	
	rows.close();
	db.close();
	
	var returnObj = {data:questions};
	
	var end = new Date().getTime();
	var duration = end - start;
	
	Ti.API.info('getRandomGameQuestionsHard() for player '+playerId+' returns '+i+' in '+duration+' ms');
	return returnObj;
}

/*Returns a set of questions to be played, with random category (TOTAL_BUZZ)*/
function getRandomGameQuestions(playerId){
	var start = new Date().getTime();
	Ti.API.info('getRandomGameQuestions() for player '+playerId);
	
	var db = Ti.Database.install('buzz_db.sqlite', 'db');
	var questions = [];
	
	var sql = 'SELECT * FROM ( SELECT * FROM (SELECT ID, QUESTION, ANSWER_A, ANSWER_B, ANSWER_C, ANSWER_D, CORRECT, VALUE, CATEGORY_ID,WIKIPEDIA,QUESTION_ID FROM (';
	sql += ' SELECT q.ID, QUESTION, ANSWER_A, ANSWER_B, ANSWER_C, ANSWER_D, q.CORRECT, VALUE, CATEGORY_ID,WIKIPEDIA,q.QUESTION_ID, count(qp.question_id) playcount, ABS(RANDOM()) RANCOL'; 
	sql += ' FROM QUESTIONS q left join questions_player qp on (q.id=qp.question_id and qp.player_id=?)';
	sql += ' WHERE VALUE = 100 group by q.id order by playcount) ORDER BY PLAYCOUNT,RANCOL,CATEGORY_ID) LIMIT '+QUESTION_SOLO_LOAD_EASY+')'; 
	sql += ' UNION ALL ';
	sql += ' SELECT * FROM (SELECT * FROM (';
	sql += ' SELECT ID, QUESTION, ANSWER_A, ANSWER_B, ANSWER_C, ANSWER_D, CORRECT, VALUE, CATEGORY_ID,WIKIPEDIA,QUESTION_ID FROM (';
	sql += ' SELECT q.ID, QUESTION, ANSWER_A, ANSWER_B, ANSWER_C, ANSWER_D, q.CORRECT, VALUE, CATEGORY_ID,WIKIPEDIA,q.QUESTION_ID, count(qp.question_id) playcount, ABS(RANDOM()) RANCOL';
	sql += ' FROM QUESTIONS q left join questions_player qp on (q.id=qp.question_id and qp.player_id=?)';
	sql += ' WHERE VALUE = 200 group by q.id order by playcount) ORDER BY PLAYCOUNT,RANCOL,CATEGORY_ID) LIMIT '+QUESTION_SOLO_LOAD_MEDIUM+')'; 
	sql += ' UNION ALL ';
	sql += ' SELECT * FROM (SELECT * FROM (';
	sql += ' SELECT ID, QUESTION, ANSWER_A, ANSWER_B, ANSWER_C, ANSWER_D, CORRECT, VALUE, CATEGORY_ID,WIKIPEDIA,QUESTION_ID FROM (';
	sql += ' SELECT q.ID, QUESTION, ANSWER_A, ANSWER_B, ANSWER_C, ANSWER_D, q.CORRECT, VALUE, CATEGORY_ID,WIKIPEDIA,q.QUESTION_ID, count(qp.question_id) playcount, ABS(RANDOM()) RANCOL';
	sql += ' FROM QUESTIONS q left join questions_player qp on (q.id=qp.question_id and qp.player_id=?)';
	sql += ' WHERE VALUE = 300 group by q.id order by playcount) ORDER BY PLAYCOUNT,RANCOL,CATEGORY_ID) LIMIT '+QUESTION_SOLO_LOAD_HARD+')';
	
	var i = 0;
	var rows = db.execute(sql, playerId,playerId,playerId);
	while (rows.isValidRow()){
		i++;
		
		var id = rows.field(0);
		var question = rows.field(1);
		var answer_a = rows.field(2);
		var answer_b = rows.field(3);
		var answer_c = rows.field(4);
		var answer_d = rows.field(5);
		var correct = rows.field(6);
		var value = rows.field(7);
		var categoryId = rows.field(8);
		var wikipedia = rows.field(9);
		var question_id = rows.field(10);
		
		var obj = {
			id:id,
			question:question,
			answer_a:answer_a,
			answer_b:answer_b,
			answer_c:answer_c,
			answer_d:answer_d,
			correct:correct,
			value:value,
			category_id:categoryId,
			wikipedia:wikipedia,
			question_id:question_id
		};	
		
		questions.push(obj);
		rows.next();
	}
	
	rows.close();
	db.close();
	var returnObj = {data:questions};
	
	var end = new Date().getTime();
	var duration = end - start;
	
	Ti.API.info('getRandomGameQuestions() for player '+playerId+' returns '+i+' in '+duration+' ms');
	return returnObj;
}

/*Returns a set of questions to be played*/
function getGameQuestions(categoryId, playerId){
	var start = new Date().getTime();
	Ti.API.info('getGameQuestions() for categoryId '+categoryId+' and player '+playerId);
	
	var db = Ti.Database.install('buzz_db.sqlite', 'db');
	var questions = [];
	
	var sql = 'SELECT * FROM ( SELECT * FROM (SELECT ID, QUESTION, ANSWER_A, ANSWER_B, ANSWER_C, ANSWER_D, CORRECT, VALUE, CATEGORY_ID,WIKIPEDIA,QUESTION_ID,PLAYCOUNT FROM (';
	sql += ' SELECT q.ID, QUESTION, ANSWER_A, ANSWER_B, ANSWER_C, ANSWER_D, q.CORRECT, VALUE, CATEGORY_ID, WIKIPEDIA,q.QUESTION_ID,count(qp.question_id) playcount, ABS(RANDOM()) RANCOL'; 
	sql += ' FROM QUESTIONS q left join questions_player qp on (q.id=qp.question_id and qp.player_id=?)';
	sql += ' WHERE CATEGORY_ID = ? AND VALUE = 100 group by q.id order by playcount) ORDER BY PLAYCOUNT,RANCOL) LIMIT '+QUESTION_SOLO_LOAD_EASY+')'; 
	sql += ' UNION ALL ';
	sql += ' SELECT * FROM (SELECT * FROM (';
	sql += ' SELECT ID, QUESTION, ANSWER_A, ANSWER_B, ANSWER_C, ANSWER_D, CORRECT, VALUE, CATEGORY_ID,WIKIPEDIA,QUESTION_ID,PLAYCOUNT FROM (';
	sql += ' SELECT q.ID, QUESTION, ANSWER_A, ANSWER_B, ANSWER_C, ANSWER_D, q.CORRECT, VALUE, CATEGORY_ID,WIKIPEDIA,q.QUESTION_ID, count(qp.question_id) playcount, ABS(RANDOM()) RANCOL';
	sql += ' FROM QUESTIONS q left join questions_player qp on (q.id=qp.question_id and qp.player_id=?)';
	sql += ' WHERE CATEGORY_ID = ? AND VALUE = 200 group by q.id order by playcount) ORDER BY PLAYCOUNT,RANCOL) LIMIT '+QUESTION_SOLO_LOAD_MEDIUM+')'; 
	sql += ' UNION ALL ';
	sql += ' SELECT * FROM (SELECT * FROM (';
	sql += ' SELECT ID, QUESTION, ANSWER_A, ANSWER_B, ANSWER_C, ANSWER_D, CORRECT, VALUE, CATEGORY_ID,WIKIPEDIA,QUESTION_ID,PLAYCOUNT FROM (';
	sql += ' SELECT q.ID, QUESTION, ANSWER_A, ANSWER_B, ANSWER_C, ANSWER_D, q.CORRECT, VALUE, CATEGORY_ID,WIKIPEDIA,q.QUESTION_ID, count(qp.question_id) playcount, ABS(RANDOM()) RANCOL';
	sql += ' FROM QUESTIONS q left join questions_player qp on (q.id=qp.question_id and qp.player_id=?)';
	sql += ' WHERE CATEGORY_ID = ? AND VALUE = 300 group by q.id order by playcount) ORDER BY PLAYCOUNT,RANCOL) LIMIT '+QUESTION_SOLO_LOAD_HARD+')';
	
	var i = 0;
	var rows = db.execute(sql, playerId,categoryId,playerId,categoryId,playerId,categoryId);
	while (rows.isValidRow()){
		i++;
		
		var id = rows.field(0);
		var question = rows.field(1);
		var answer_a = rows.field(2);
		var answer_b = rows.field(3);
		var answer_c = rows.field(4);
		var answer_d = rows.field(5);
		var correct = rows.field(6);
		var value = rows.field(7);
		var categoryId = rows.field(8);
		var wikipedia = rows.field(9);
		var question_id = rows.field(10);
		var playCount = rows.field(11);
		
		var obj = {
			id:id,
			question:question,
			answer_a:answer_a,
			answer_b:answer_b,
			answer_c:answer_c,
			answer_d:answer_d,
			correct:correct,
			value:value,
			category_id:categoryId,
			wikipedia:wikipedia,
			question_id:question_id,
			play_count:playCount
		};	
		
		questions.push(obj);
		rows.next();
	}
	
	rows.close();
	db.close();
	
	var returnObj = {data:questions};
	
	var end = new Date().getTime();
	var duration = end - start;
	Ti.API.info('getGameQuestions() for categoryId '+categoryId+' and player '+playerId+' returns '+i+' in '+duration+' ms');
	return returnObj;
}

/*Returns a set of questions to be played for group games. */
function getGroupGameQuestionsInitial(categoryId, groupPlayerId, numPlayers){
	var start = new Date().getTime();
	Ti.API.info('getGroupGameQuestionsInitial() for categoryId '+categoryId+' and group player '+groupPlayerId+' for numPlayers='+numPlayers);
	
	var db = Ti.Database.install('buzz_db.sqlite', 'db');
	var questions = [];
	
	var easyQuestions = QUESTION_GROUP_LOAD_EASY * numPlayers;
	var mediumQuestions = QUESTION_GROUP_LOAD_MEDIUM * numPlayers;
	var hardQuestions = QUESTION_GROUP_LOAD_HARD * numPlayers;
	
	var sql = 'SELECT * FROM ( SELECT * FROM (SELECT ID, QUESTION, ANSWER_A, ANSWER_B, ANSWER_C, ANSWER_D, CORRECT, VALUE, CATEGORY_ID,WIKIPEDIA,QUESTION_ID,PLAYCOUNT FROM (';
	sql += ' SELECT q.ID, QUESTION, ANSWER_A, ANSWER_B, ANSWER_C, ANSWER_D, q.CORRECT, VALUE, CATEGORY_ID, WIKIPEDIA,q.QUESTION_ID,count(qp.question_id) playcount, ABS(RANDOM()) RANCOL'; 
	sql += ' FROM QUESTIONS q left join questions_player qp on (q.id=qp.question_id and qp.player_id=?)';
	sql += ' WHERE CATEGORY_ID = ? AND VALUE = 100 group by q.id order by playcount) ORDER BY PLAYCOUNT,RANCOL) LIMIT '+easyQuestions+')'; 
	sql += ' UNION ALL ';
	sql += ' SELECT * FROM (SELECT * FROM (';
	sql += ' SELECT ID, QUESTION, ANSWER_A, ANSWER_B, ANSWER_C, ANSWER_D, CORRECT, VALUE, CATEGORY_ID,WIKIPEDIA,QUESTION_ID,PLAYCOUNT FROM (';
	sql += ' SELECT q.ID, QUESTION, ANSWER_A, ANSWER_B, ANSWER_C, ANSWER_D, q.CORRECT, VALUE, CATEGORY_ID,WIKIPEDIA,q.QUESTION_ID, count(qp.question_id) playcount, ABS(RANDOM()) RANCOL';
	sql += ' FROM QUESTIONS q left join questions_player qp on (q.id=qp.question_id and qp.player_id=?)';
	sql += ' WHERE CATEGORY_ID = ? AND VALUE = 200 group by q.id order by playcount) ORDER BY PLAYCOUNT,RANCOL) LIMIT '+mediumQuestions+')'; 
	sql += ' UNION ALL ';
	sql += ' SELECT * FROM (SELECT * FROM (';
	sql += ' SELECT ID, QUESTION, ANSWER_A, ANSWER_B, ANSWER_C, ANSWER_D, CORRECT, VALUE, CATEGORY_ID,WIKIPEDIA,QUESTION_ID,PLAYCOUNT FROM (';
	sql += ' SELECT q.ID, QUESTION, ANSWER_A, ANSWER_B, ANSWER_C, ANSWER_D, q.CORRECT, VALUE, CATEGORY_ID,WIKIPEDIA,q.QUESTION_ID, count(qp.question_id) playcount, ABS(RANDOM()) RANCOL';
	sql += ' FROM QUESTIONS q left join questions_player qp on (q.id=qp.question_id and qp.player_id=?)';
	sql += ' WHERE CATEGORY_ID = ? AND VALUE = 300 group by q.id order by playcount) ORDER BY PLAYCOUNT,RANCOL) LIMIT '+hardQuestions+')';
	
	var i = 0;
	var rows = db.execute(sql, groupPlayerId,categoryId,groupPlayerId,categoryId,groupPlayerId,categoryId);
	while (rows.isValidRow()){
		i++;
		
		var id = rows.field(0);
		var question = rows.field(1);
		var answer_a = rows.field(2);
		var answer_b = rows.field(3);
		var answer_c = rows.field(4);
		var answer_d = rows.field(5);
		var correct = rows.field(6);
		var value = rows.field(7);
		var categoryId = rows.field(8);
		var wikipedia = rows.field(9);
		var question_id = rows.field(10);
		var playCount = rows.field(11);
		
		var obj = {
			id:id,
			question:question,
			answer_a:answer_a,
			answer_b:answer_b,
			answer_c:answer_c,
			answer_d:answer_d,
			correct:correct,
			value:value,
			category_id:categoryId,
			wikipedia:wikipedia,
			question_id:question_id,
			play_count:playCount
		};	
		
		questions.push(obj);
		rows.next();
	}
	
	rows.close();
	db.close();
	
	var returnObj = {data:questions};
	
	var end = new Date().getTime();
	var duration = end - start;
	Ti.API.info('getGroupGameQuestionsInitial() for categoryId '+categoryId+' and player '+groupPlayerId+' returns '+i+' in '+duration+' ms');
	return returnObj;
}

/*Returns an initial set of questions to be played, with random category (TOTAL_BUZZ)*/
function getGroupRandomGameQuestionsInitial(groupPlayerId, numPlayers){
	var start = new Date().getTime();
	Ti.API.info('getGroupRandomGameQuestionsInitial() for player '+groupPlayerId);
	
	var db = Ti.Database.install('buzz_db.sqlite', 'db');
	var questions = [];
	
	var easyQuestions = QUESTION_GROUP_LOAD_EASY * numPlayers;
	var mediumQuestions = QUESTION_GROUP_LOAD_MEDIUM * numPlayers;
	var hardQuestions = QUESTION_GROUP_LOAD_HARD * numPlayers;
	
	var sql = 'SELECT * FROM ( SELECT * FROM (SELECT ID, QUESTION, ANSWER_A, ANSWER_B, ANSWER_C, ANSWER_D, CORRECT, VALUE, CATEGORY_ID,WIKIPEDIA,QUESTION_ID FROM (';
	sql += ' SELECT q.ID, QUESTION, ANSWER_A, ANSWER_B, ANSWER_C, ANSWER_D, q.CORRECT, VALUE, CATEGORY_ID,WIKIPEDIA,q.QUESTION_ID, count(qp.question_id) playcount, ABS(RANDOM()) RANCOL'; 
	sql += ' FROM QUESTIONS q left join questions_player qp on (q.id=qp.question_id and qp.player_id=?)';
	sql += ' WHERE VALUE = 100 group by q.id order by playcount) ORDER BY PLAYCOUNT,RANCOL,CATEGORY_ID) LIMIT '+easyQuestions+')'; 
	sql += ' UNION ALL ';
	sql += ' SELECT * FROM (SELECT * FROM (';
	sql += ' SELECT ID, QUESTION, ANSWER_A, ANSWER_B, ANSWER_C, ANSWER_D, CORRECT, VALUE, CATEGORY_ID,WIKIPEDIA,QUESTION_ID FROM (';
	sql += ' SELECT q.ID, QUESTION, ANSWER_A, ANSWER_B, ANSWER_C, ANSWER_D, q.CORRECT, VALUE, CATEGORY_ID,WIKIPEDIA,q.QUESTION_ID, count(qp.question_id) playcount, ABS(RANDOM()) RANCOL';
	sql += ' FROM QUESTIONS q left join questions_player qp on (q.id=qp.question_id and qp.player_id=?)';
	sql += ' WHERE VALUE = 200 group by q.id order by playcount) ORDER BY PLAYCOUNT,RANCOL,CATEGORY_ID) LIMIT '+mediumQuestions+')'; 
	sql += ' UNION ALL ';
	sql += ' SELECT * FROM (SELECT * FROM (';
	sql += ' SELECT ID, QUESTION, ANSWER_A, ANSWER_B, ANSWER_C, ANSWER_D, CORRECT, VALUE, CATEGORY_ID,WIKIPEDIA,QUESTION_ID FROM (';
	sql += ' SELECT q.ID, QUESTION, ANSWER_A, ANSWER_B, ANSWER_C, ANSWER_D, q.CORRECT, VALUE, CATEGORY_ID,WIKIPEDIA,q.QUESTION_ID, count(qp.question_id) playcount, ABS(RANDOM()) RANCOL';
	sql += ' FROM QUESTIONS q left join questions_player qp on (q.id=qp.question_id and qp.player_id=?)';
	sql += ' WHERE VALUE = 300 group by q.id order by playcount) ORDER BY PLAYCOUNT,RANCOL,CATEGORY_ID) LIMIT '+hardQuestions+')';
	
	var i = 0;
	var rows = db.execute(sql, groupPlayerId,groupPlayerId,groupPlayerId);
	while (rows.isValidRow()){
		i++;
		
		var id = rows.field(0);
		var question = rows.field(1);
		var answer_a = rows.field(2);
		var answer_b = rows.field(3);
		var answer_c = rows.field(4);
		var answer_d = rows.field(5);
		var correct = rows.field(6);
		var value = rows.field(7);
		var categoryId = rows.field(8);
		var wikipedia = rows.field(9);
		var question_id = rows.field(10);
		
		var obj = {
			id:id,
			question:question,
			answer_a:answer_a,
			answer_b:answer_b,
			answer_c:answer_c,
			answer_d:answer_d,
			correct:correct,
			value:value,
			category_id:categoryId,
			wikipedia:wikipedia,
			question_id:question_id
		};	
		
		questions.push(obj);
		rows.next();
	}
	
	rows.close();
	db.close();
	var returnObj = {data:questions};
	
	var end = new Date().getTime();
	var duration = end - start;
	
	Ti.API.info('getGroupRandomGameQuestionsInitial() for player '+groupPlayerId+' returns '+i+' in '+duration+' ms');
	return returnObj;
}

/*Returns the number of correct fast answers for the specified player*/
function getNumberOfFastAnswers(playerId){
	var db = Ti.Database.install('buzz_db.sqlite', 'db');
	var rows = db.execute('select count(*) from questions_player where player_id=? and correct=1 and speed=1', playerId);
	
	var count = 0;
	while (rows.isValidRow()){
		count = rows.field(0);
		
		rows.next();
	}
	
	rows.close();
	db.close();
	
	return count;
}

/*Posts to my facebook wall*/
function facebookPost(msg){
	if (Titanium.Network.online == true){
		if(Titanium.Facebook.loggedIn){
			Titanium.Facebook.requestWithGraphPath('me/feed', {message: msg}, "POST", function(e) {
	    	if (e.success) {
	        	Ti.API.info('FACEBOOK - Success in posting message');
	    	} else {
	        	if (e.error) {
	         	   Ti.API.info('FACEBOOK - ERROR in posting message');
	        	} else {
	            	Ti.API.info('FACEBOOK - UNKNOWN response in posting message');
	        	}
	    	}
		});
		} else {
			Ti.API.info('FACEBOOK - NOT logged in');
		}
	}
}

function facebookGetAllFriends(){
	var data = {};
	
	if (Titanium.Network.online == true){
		Ti.API.warn('GETTING ALL FB FRIENDS');
		if(Titanium.Facebook.loggedIn){
			Titanium.Facebook.requestWithGraphPath('me/friends', data, "GET", function(e) {
		    	if (e.success) {
		        	
		        	var allFriends = JSON.parse(e.result);
		        	var allFriendsObject = allFriends.data;
		        	var allFriendsSize = allFriendsObject.length;
		        	
		        	allFriendsObject.sort(sortFBFriends);
		        	Ti.API.info('FACEBOOK - Success in getting ALL friends '+allFriendsSize);
		        	
		        	viewTopCategory.fireEvent('renderFacebookFriendsTable', {friends:allFriendsObject});
		        	
		    	} else {
		        	if (e.error) {
		         	   Ti.API.info('FACEBOOK - ERROR '+e.error+' in getting ALL friends');
		        	} else {
		            	Ti.API.info('FACEBOOK - UNKNOWN response in getting ALL friends');
		        	}
		    	}
			});
		} else {
			Ti.API.info('FACEBOOK - NOT logged in');
		}
	}
}

/*Gets the friends that have installed the app*/
function facebookGetFriendsWithApp(){
	if (Titanium.Network.online == true){
		Ti.API.warn('GETTING FB FRIENDS');
		
		var data = {};
		if(Titanium.Facebook.loggedIn){
			Titanium.Facebook.request('friends.getAppUsers', data,function(e) {
	    	if (e.success) {
	        	Ti.API.warn('FACEBOOK - Success in getting FB friends with MindTheBuzz :'+e.result);
	        	var friends = JSON.parse(e.result);
	        	
	        	var friendString = '';
	        	for(var i=0; i < friends.length; i++){
	        		friendString += friends[i];
	        		
	        		if(i < (friends.length -1)){
	        			friendString += ',';
	        		}
	        	}
	        	
	        	saveFacebookFriends(friendString);
	        	getOnlineHighScores(friendString);
	        	Ti.API.warn('FACEBOOK - Saved the FB friends list as '+friendString);
	    	} else {
	        	if (e.error) {
	         	   Ti.API.warn('FACEBOOK - ERROR in getting FB friends');
	        	} else {
	            	Ti.API.warn('FACEBOOK - UNKNOWN response in getting FB friends');
	        	}
	    	}
		});
		} else {
			Ti.API.warn('FACEBOOK - NOT logged in');
			getOnlineHighScores(null);
		}
	}
}

function fadeIntroAudioOut() {
  if (audio.volume > 0) {
    audio.setVolume(audio.volume - 0.1);
    setTimeout(fadeIntroAudioOut, 180);
  } else {
  	audio.stop();
  	audio.setVolume(1);
  }
}

/*Checks for network & need to sync. Syncs player and assigns remote id locally*/
function savePlayerOnline(playerId, name, facebook_id,gender){
	Ti.API.info('savePlayerOnline() called for playerId '+playerId+' name '+name+' facebook_id '+facebook_id+' gender '+gender); 	
	if (Titanium.Network.online == true && !BLACKLISTED){
		if(playerNeedsSync(playerId)){
			
			var xhr = Ti.Network.createHTTPClient();
			xhr.setTimeout(NETWORK_TIMEOUT);
			
			xhr.onload = function(e) {
				Ti.API.info('savePlayerOnline() got back from server '+this.responseText); 	
				var jsonData = JSON.parse(this.responseText);
				
				if(jsonData.RESPONSE == '1'){
					var remotePlayerId = jsonData.player_id;
		
					updatePlayerRemoteId(playerId, remotePlayerId);
					
					//Enable push notifications for PAID version
					/*
					if(IS_FREE_APP == 0){
						registerPushNotifications(remotePlayerId);
					}*/
					
					//Determine if a content update is needed
					isContentUpdateNeeded(jsonData.CONTENT_VERSION);
					
					handleSecurityAction(jsonData);
					
				}
			};
			
			xhr.open('POST', API + 'savePlayer'); 
			xhr.send({
				name:name,
				facebook_id:facebook_id,
				gender:gender,
				version:Ti.App.getVersion()
			});
		}
	} else {
		Ti.API.warn('savePlayerOfflie() offline. BLACKLISTED='+BLACKLISTED);
	}
}

/*Checks whether the specified player has been synced*/
function playerNeedsSync(playerId){
	var db = Ti.Database.install('buzz_db.sqlite', 'db');
	var rows = db.execute('select player_id from players where id=?', playerId);
	
	var response = true;
	while (rows.isValidRow()){
		if(rows.field(0) != null){
			response = false;
		}
		
		rows.next();
	}
	
	rows.close();
	db.close();
	
	Ti.API.info('playerNeedsSync() for player '+playerId+' returns '+response);
	return response;
}

/*Checks whether the specified score combo has been synced*/
function scoreNeedsSync(name, score, categoryId){
	var db = Ti.Database.install('buzz_db.sqlite', 'db');
	var rows = db.execute('select score from scores where name=? and score=? and category_id=?', name,score,categoryId);
	
	var response = true;
	while (rows.isValidRow()){
		if(rows.field(0) != null){
			response = false;
		}
		
		rows.next();
	}
	
	rows.close();
	db.close();
	
	//Ti.API.info('scoreNeedsSync() for name '+name+' / score '+score+' / categoryId '+categoryId+' returns '+response);
	return response;
}

/*Saves new players only, but always persists*/
function savePlayer(name, facebookId,gender){
	Ti.API.info('DAO savePlayer() called with name is '+name+' facebook id is '+facebookId+' gender is '+gender);
	
	var db = Ti.Database.install('buzz_db.sqlite', 'db');
	var alreadyExists = false;
	var localPlayerId = 0;
	
	//check if already on the db
	var rows = db.execute('select id from PLAYERS where name=? and facebook_id=?', name,facebookId);
	while (rows.isValidRow()){
		localPlayerId = rows.field(0);
		Ti.API.info('DAO: Check for '+name+' with facebook id '+facebookId+' returns id '+localPlayerId);
		rows.next();
		
		if(localPlayerId != null && localPlayerId > 0){
			alreadyExists = true;
			break;
		}
	}
	
	rows.close();
	
	//insert into db
	var newPlayerId = '';
	if(!alreadyExists){
		db.execute('INSERT INTO PLAYERS (NAME,FACEBOOK_ID,GENDER) VALUES(?,?,?)', name, facebookId,gender);
		localPlayerId = db.lastInsertRowId;
		Ti.API.info('DAO: Player '+name+' doesnt exist, saving into db and got id '+localPlayerId);
		initBadges(localPlayerId);
		
		//Save player online
		savePlayerOnline(localPlayerId, name, facebookId, gender);
	}
	
	//always persist property
	Ti.API.info('DAO: Player '+name+' persisted gender '+gender);
	Ti.App.Properties.setString('RECENT_GENDER', gender);
	Ti.App.Properties.setString('RECENT_PLAYER', name);
	Ti.App.Properties.setString('RECENT_FACEBOOK', facebookId);
	
	var tmpGender = Ti.App.Properties.getString('RECENT_GENDER');
	Ti.API.info('DAO savePlayer() after persistence  gender is '+tmpGender);
	
	db.close();
}

/*Removes the persisted player*/
function removePlayer(){
	Ti.App.Properties.removeProperty('RECENT_GENDER');
	Ti.App.Properties.removeProperty('RECENT_PLAYER');
	Ti.App.Properties.removeProperty('RECENT_FACEBOOK');
	Ti.App.Properties.removeProperty('FACEBOOK_FRIENDS');
}

/*Returns the current player object*/
function getCurrentPlayer(){
	var persistedPlayer = '';
	var persistedFacebookId = '';
	var persistedGender = '';
	var id = '';
	var playerId = '';
	var facebookId = '';
	
	persistedPlayer = Ti.App.Properties.getString('RECENT_PLAYER');
	persistedFacebookId = Ti.App.Properties.getString('RECENT_FACEBOOK');
	persistedGender = Ti.App.Properties.getString('RECENT_GENDER');
	
	Ti.API.info('DAO: getCurrentPlayer() returns persistedGender '+persistedGender+' and remote id '+playerId+' for player '+persistedPlayer);
	
	if(persistedPlayer != null){
		var db = Ti.Database.install('buzz_db.sqlite', 'db');
		//var rows = db.execute('select id,player_id,facebook_id from PLAYERS where name=? AND facebook_id=?', persistedPlayer,persistedFacebookId);
		var rows = db.execute('select id,player_id,facebook_id from PLAYERS where name=?', persistedPlayer);
		
		while (rows.isValidRow()){
			id = rows.field(0);
			playerId = rows.field(1);
			facebookId = rows.field(2);
			Ti.API.info('DAO: getCurrentPlayer() returns id '+id+' and remote id '+playerId+' for player '+persistedPlayer);
			rows.next();
		}
	
		rows.close();
		db.close();
	}
	
	var obj = {
		name:persistedPlayer,
		id:id,
		player_id:playerId,
		facebook_id:facebookId,
		gender:persistedGender
	};
	
	return obj;
}

/*Inserts a score entry*/
function saveScore(name, playerId, playerRemoteId, categoryId, score){
	var db = Ti.Database.install('buzz_db.sqlite', 'db');
	//db.execute('INSERT INTO SCORES (NAME,PLAYER_ID,CATEGORY_ID,SCORE) VALUES(?,?,?,?)', name,playerId,categoryId,score);
	db.execute('INSERT INTO SCORES (NAME,PLAYER_ID,CATEGORY_ID,SCORE) VALUES(?,?,?,?)', name,playerRemoteId,categoryId,score);
	var localScoreId = db.lastInsertRowId;
	Ti.API.info('DAO: Saved score '+score+' for player '+name+' with id '+playerId+' in category '+categoryId);
	
	//insert a row in the friends score so that it is immediately visible on the UI
	var facebookId = Ti.App.Properties.getString('RECENT_FACEBOOK');
	db.execute('INSERT INTO SCORES_FRIENDS (NAME,PLAYER_ID,CATEGORY_ID,SCORE,FACEBOOK_ID) VALUES (?,?,?,?,?)', name,playerRemoteId,categoryId,score,facebookId);
	Ti.API.info('DAO: Saved FRIEND score '+score+' for player '+name+' with id '+playerId+' and remote id '+playerRemoteId+' in category '+categoryId);
	db.close();
	
	//Convert to arrays
	var localScoreArr = [];
	localScoreArr.push(localScoreId);
	var categoryIdArr = [];
	categoryIdArr.push(categoryId);
	var scoreArr = [];
	scoreArr.push(score);
	
	saveScoreOnline(localScoreArr, playerRemoteId, categoryIdArr, scoreArr);
}

/*Saves the specified scores online and updates local rows with sync flag*/
function saveScoreOnline(lScore, playerRemoteId, categoryId, score){
	if (Titanium.Network.online == true && !BLACKLISTED){
		var xhr = Ti.Network.createHTTPClient();
		xhr.setTimeout(NETWORK_TIMEOUT);
		
		lScore = escape(JSON.stringify(lScore));
		categoryId = escape(JSON.stringify(categoryId));
		score = escape(JSON.stringify(score));
		playerRemoteId = escape(JSON.stringify(playerRemoteId));
		
		var facebookFriends = getFacebookFriends();
		var currentPlayerObj = getCurrentPlayer();
		var theGender = currentPlayerObj.gender;
		
		Ti.API.info('saveScoreOnline() called for player '+playerRemoteId+' gender '+theGender+' with lScore '+lScore+' score '+score); 
		
		var postData = 'player_id='+playerRemoteId+'&score='+score+'&category_id='+categoryId+'&local_score_id='+lScore+'&facebookFriends='+facebookFriends+'&persistedGender='+theGender+'&applicationTypeId='+BUZZ_APP_TYPE;
		//var encryptedPostData = encryptBuzz(postData);
		//Ti.API.info('saveScoreOnline() data: '+postData);
		//Ti.API.info('saveScoreOnline() encrypted data: '+encryptedPostData);
		
		var params = {
    		player_id:playerRemoteId,
			score:score,
			category_id:categoryId,
			local_score_id:lScore,
			facebookFriends:facebookFriends,
			persistedGender:theGender,
			applicationTypeId:BUZZ_APP_TYPE,
			version:Ti.App.getVersion()
		};
		
		xhr.onload = function(e) {
			var db = Ti.Database.install('buzz_db.sqlite', 'db');
			
			Ti.API.info('saveScoreOnline() got back from server '+this.responseText); 	
			var jsonData = JSON.parse(this.responseText);
				
			if(jsonData.RESPONSE == '1'){
				var processedObjects = jsonData.processed;
				for(var i=0; i < processedObjects.length; i++){
					Ti.API.info('saveScoreOnline() server processed object '+processedObjects[i]);
					
					db.execute('update scores set sync=1 where id=?', processedObjects[i]);
					Ti.API.info('saveScoreOnline() updated sync flag for '+processedObjects[i]);
				}
				
				//Determine if a content update is needed
				isContentUpdateNeeded(jsonData.CONTENT_VERSION);
				Ti.API.info('isContentUpdateNeeded() returns to dao.js');
			}
			
			handleSecurityAction(jsonData);
			db.close();
		};
			
		xhr.open('POST', API + 'saveScores'); 
		xhr.send(params);
	} else {
		Ti.API.warn('saveScoreOnline() offline. BLACKLISTED='+BLACKLISTED);
	}
}

//Checks whether there is new content on the server
function checkForContentUpdate(){
    Ti.API.info('checkForContentUpdate() called');
    
    if (Titanium.Network.online == true){
        var xhr = Ti.Network.createHTTPClient();
        xhr.setTimeout(NETWORK_TIMEOUT);
        
        xhr.onload = function(e) {
            Ti.API.info('checkForContentUpdate() got back from server '+this.responseText);   
            var jsonData = JSON.parse(this.responseText);
            
            //Determine if a content update is needed
            isContentUpdateNeeded(jsonData.CONTENT_VERSION);
        };
        
        xhr.open('POST', API + 'checkContent'); 
        xhr.send();
    }
}

/*Retrieve the online high sores and store them locally*/
function getOnlineHighScores(friendString){
    Ti.API.info('getOnlineHighScores() called with friendString='+friendString);
    
	if (Titanium.Network.online == true && !BLACKLISTED){
		
		//Update the scores UI if we're on that view
		if(VIEWING_HIGH_SCORES){
			viewTopCategory.fireEvent('startHighScoresAnimation');
		}
		
		//get persisted FB friends list
		var friends = friendString;
		
		//add SELF to friends list
		var playerObject = getCurrentPlayer();
		var currentFB = playerObject.facebook_id;
		if(currentFB != '' && friendString != '') friends += ','+currentFB;
		
		if(friends == null) {
			friends = "";
		}
		var params = {
			friends:friends,
			version:Ti.App.getVersion()
		};
		
		var xhr = Ti.Network.createHTTPClient();
		xhr.setTimeout(NETWORK_TIMEOUT);
		
		xhr.onload = function(e) {
			var db = Ti.Database.install('buzz_db.sqlite', 'db');
			
			Ti.API.info('getOnlineHighScores() got back from server '+this.responseText); 	
			var jsonData = JSON.parse(this.responseText);
				
			if(jsonData.RESPONSE == '1'){
				var scores = jsonData.scores;
			    
			    //Determine if a content update is needed
                isContentUpdateNeeded(jsonData.CONTENT_VERSION);
			    
				if(scores != null){
					
					clearHighScores();
					
					//Begin global scores transaction
					db.execute('BEGIN');
					
					//Ti.API.info('getOnlineHighScores() scores not null length is  '+scores.length);
					for(var i=0; i < scores.length; i++){
						var scoreEntries = scores[i];
						
						for(var z=0; z < scoreEntries.length; z++){
							var name = scoreEntries[z].name;
							var score = scoreEntries[z].score;
							var categoryId = scoreEntries[z].category_id;
							var playerId = scoreEntries[z].player_id;
						
							//Ti.API.info('getOnlineHighScores() looping score '+score+' from '+name+' category '+categoryId);
							
							if(scoreNeedsSync(name, score, categoryId)){
								//Ti.API.info('scoreNeedsSync() true so inserting score '+score+' from '+name+' category '+categoryId);
								db.execute('INSERT INTO SCORES (NAME,CATEGORY_ID,SCORE,SYNC,PLAYER_ID) VALUES(?,?,?,1,?)', name,categoryId,score,playerId);
							} else {
								//Ti.API.info('scoreNeedsSync() FALSE so NOT inserting score');
							}
						}
					}
					
					//Commit global scores transaction
					db.execute('COMMIT');
					
				} else {
					//Ti.API.info('getOnlineHighScores() SCORES IS NULL '+scores);
				}
				
				//Facebook friends scores
				var friendScores = jsonData.friend_scores;
				//Ti.API.warn('getOnlineHighScores() FRIENDS SCORES response is '+friendScores);
				
				if(friendScores != null){
					
					clearFriendScores();
					
					db.execute('BEGIN');
					for(var i=0; i < friendScores.length; i++){
						var scoreEntries = friendScores[i];
						
						for(var z=0; z < scoreEntries.length; z++){
							var name = scoreEntries[z].name;
							var score = scoreEntries[z].score;
							var categoryId = scoreEntries[z].category_id;
							var facebookId = scoreEntries[z].facebook_id;
						
							db.execute('INSERT INTO SCORES_FRIENDS (NAME,CATEGORY_ID,SCORE,FACEBOOK_ID) VALUES(?,?,?,?)', name,categoryId,score,facebookId);
							//Ti.API.info('getOnlineHighScores() saved FRIEND score '+score+' from '+name+' category '+categoryId);
						}
					}
					db.execute('COMMIT');
				}
				
				//Update scores UI if we're on that view
				if(VIEWING_HIGH_SCORES){
					Ti.API.info('Firing stopHighScoresAnimation event');
					viewTopCategory.fireEvent('stopHighScoresAnimation');	
				}
				
				handleSecurityAction(jsonData);
			}
			
			db.close();
		};
		
		xhr.open('POST', API + 'getHighScores'); 
		xhr.send(params);
	} else {
		Ti.API.warn('getOnlineHighScores() offline. BLACKLISTED='+BLACKLISTED);
	}
}

/*Returns the local friend high scores for the specified category id*/
function getFriendHighScores(categoryId){
	var db = Ti.Database.install('buzz_db.sqlite', 'db');
	var rows = db.execute('select max(score),name,facebook_id from scores_friends where category_id=? group by facebook_id order by score desc', categoryId);
	
	var highScores = [];
	var i = 0;
	while(rows.isValidRow()){
		i++;
		var score = rows.field(0);
		var name = rows.field(1);
		var facebookId = rows.field(2);
		
		var obj = {
			name:name,
			facebookId:facebookId,
			rank:i,
			score:score
		};
		
		highScores.push(obj);
		rows.next();
	}
	
	rows.close();
	db.close();
	
	return highScores;
}

/*Deletes all rows from the friend scores*/
function clearFriendScores(){
	var db = Ti.Database.install('buzz_db.sqlite', 'db');
	db.execute('delete from scores_friends');
	db.close();
}

/*Deletes all scores except for the players on this instance*/
function clearHighScores(){
	var db = Ti.Database.install('buzz_db.sqlite', 'db');
	db.execute('delete from scores where player_id not in(select player_id from players)');
	db.close();
	
	Ti.API.warn('clearHighScores() ends');
}

/*Retrieves and saves the online high scores, stores online the unsynced local scores and players*/
function sync(){
	Ti.API.warn('sync() STARTS');
	
	if (Titanium.Network.online == true && !BLACKLISTED){
		//get 10 unsynced players
		var db = Ti.Database.install('buzz_db.sqlite', 'db');
		var rows = db.execute('select id,facebook_id,name from players where player_id is null');
		while (rows.isValidRow()){
			var unsyncedPlayerId = rows.field(0);
			var unsyncedPlayerFacebookId = rows.field(1);
			var unsyncedplayerName = rows.field(2);
			
			Ti.API.warn('Trying to sync player id '+unsyncedPlayerId+' with name '+unsyncedplayerName);
			
			savePlayerOnline(unsyncedPlayerId, unsyncedplayerName, unsyncedPlayerFacebookId, null);
			
			rows.next();
		}
		
		rows.close();
		
		//get online scores - get friends first
		//facebookGetFriendsWithApp();
		getOnlineHighScores(null);
		
		//get 10 unsynced local scores for synced players
		rows = db.execute('select s.id, p.player_id, s.category_id, s.score from scores s inner join players p on (s.player_id=p.id) where s.sync is null and p.player_id is not null limit 10');
		
		var localScoreId = [];
		var remotePlayerId = [];
		var categoryId = [];
		var scores = [];
		
		while (rows.isValidRow()){
			localScoreId.push(rows.field(0));
			remotePlayerId.push(rows.field(1));
			categoryId.push(rows.field(2));
			scores.push(rows.field(3));
			
			rows.next();
		}
		
		rows.close();
		
		Ti.API.info('sync() found '+scores.length+' scores to sync online');
		
		if(scores.length > 0){
			saveScoreOnline(localScoreId, remotePlayerId, categoryId, scores);
		}
		
		//get 10 unsynced group scores
		rows = db.execute('select id,category_id,group_type,num_players from game_sessions_group where sync = ? limit 10', 0);
		
		//group objects
		var groupLocalSessionIdArr = [];
		var groupCategoryIdArr = [];
		var groupTypeArr = [];
		var groupNumPlayersArr = [];
		
		while (rows.isValidRow()){
			groupLocalSessionIdArr.push(rows.field(0));
			groupCategoryIdArr.push(rows.field(1));
			groupTypeArr.push(rows.field(2));
			groupNumPlayersArr.push(rows.field(3));
			rows.next();
		}
		
		rows.close();
		
		//Save group scores online
		Ti.API.info('sync() found '+groupLocalSessionIdArr.length+' group scores to sync online');
		if(groupLocalSessionIdArr.length > 0){
			saveGroupGameSessionOnline(groupLocalSessionIdArr,groupCategoryIdArr, groupTypeArr, groupNumPlayersArr);
		}
		
		db.close();
	} else {
		Ti.API.warn('sync() offline. BLACKLISTED='+BLACKLISTED);
	}
	
	
	Ti.API.warn('sync() ENDS');
}

/*Returns the top 10 group high scores for the specified category.
 The lastGameOnly flag indicates whether we're fetching scores over all time or just the latest game*/
function getGroupHighScores(categoryId, lastGameOnly){
	Ti.API.info('DAO.getGroupHighScores() called with lastGameOnly='+lastGameOnly);
	
	var numberOfResults = 10;
	var i = 0;
	var highScores = [];
	var db = Ti.Database.install('buzz_db.sqlite', 'db');
	var maxGameSessionId = null;
	
	if(lastGameOnly){
		
		var rows = db.execute('select max(g.id) from game_sessions_group g where g.category_id=?',categoryId);	
		while (rows.isValidRow()){
			maxGameSessionId = rows.field(0);
			rows.next();
		}
		
		rows.close();
		Ti.API.info('DAO.getGroupHighScores() found maxGameSessionId='+maxGameSessionId);
		
		if(maxGameSessionId != null){
			rows = db.execute('select s.score,s.name,s.avatar_filename from scores_group s where s.game_id=? order by s.score desc',maxGameSessionId);
			
			while (rows.isValidRow()){
				i++;
				
				var score = rows.field(0);
				var name = rows.field(1);
				var avatar = rows.field(2);
				
				var obj = {
					name:name,
					rank:i,
					score:score,
					avatar:avatar
				};
				
				highScores.push(obj);
				
				rows.next();
			}
		
		rows.close();
		}
		
	} else {
		var rows = db.execute('select max(s.score),s.name,s.avatar_filename from scores_group s inner join game_sessions_group g on (s.game_id=g.id) where g.category_id=? group by s.player_id order by s.score desc limit 10',categoryId);
			
		while (rows.isValidRow()){
			i++;
			
			var score = rows.field(0);
			var name = rows.field(1);
			var avatar = rows.field(2);
			
			var obj = {
				name:name,
				rank:i,
				score:score,
				avatar:avatar
			};
			
			highScores.push(obj);
			
			rows.next();
		}
		
		rows.close();
	}
	
	/*
	//At the end, fill up the remaining slots with empty dots (...)
	if(maxGameSessionId == null && highScores.length < numberOfResults){
		while(highScores.length < numberOfResults){
			
			i++;
			var obj = {
				name:'...',
				rank:i,
				score:'-',
				avatar:null
			};
		
			highScores.push(obj);
		}
	}*/
	
	db.close();
	
	return highScores;
}

/*Returns the top 10 high scores for the specified category id*/
function getHighScores(categoryId){
	var db = Ti.Database.install('buzz_db.sqlite', 'db');
	//var rows = db.execute('select p.name, s.score, s.name from scores s left join players p on(p.id=s.player_id) where s.category_id=? order by s.score desc limit 10', categoryId);
	//var rows = db.execute('select distinct(p.id), p.name, s.score, s.name from scores s left join players p on(p.id=s.player_id) where s.category_id=? group by p.id order by s.score desc limit 10', categoryId);
	
	//get scores from all categories if categoryId is 0
	if(categoryId == CAT_EVERYTHING){
		var rows = db.execute('select max(s.score), s.player_id, s.name from scores s group by s.player_id order by s.score desc limit 10');
	}else{
		var rows = db.execute('select max(s.score), s.player_id, s.name from scores s where s.category_id=? group by s.player_id order by s.score desc limit 10', categoryId);
	}
	
	
	var highScores = [];
	var i = 0;
	while (rows.isValidRow()){
		i++;
		var name = rows.field(2);
		var score = rows.field(0);
		var playerId = rows.field(1);
		
		//Ti.API.info('DAO: getHighScores() found  '+name+' for cat '+categoryId+' with score '+score+' and player id '+playerId);
		
		var obj = {
			name:name,
			rank:i,
			score:score
		};
		
		highScores.push(obj);
		rows.next();
	}
	
	rows.close();
	db.close();
	
	Ti.API.info('DAO: Loaded '+highScores.length+' entries of high scores for cat '+categoryId);
	
	if(highScores.length < 10){
		while(highScores.length < 10){
			
			i++;
			var obj = {
				name:'...',
				rank:i,
				score:'-'
			};
		
		highScores.push(obj);
		}
	}
	
	return highScores;
}

/*Returns the high scores for each category for the specified player*/
function getPlayerHighScores(pId, playerId){
	
	Ti.API.info('DAO: getPlayerHighScores called for player id '+playerId);
	var db = Ti.Database.install('buzz_db.sqlite', 'db');
	//var rows = db.execute('select max(score), category_id from scores where player_id=? group by category_id order by category_id', playerId);
	//var rows = db.execute('select c.id,max(s.score) as score from categories c left join scores s on (c.id=s.category_id and s.player_id=?) group by c.id order by score desc', playerId);
	//TODO Refactor this query as it DOESNT need to look up game_sessions any more
	var rows = db.execute('select c.id,max(s.score) as score, count(gs.category_id) from categories c left join scores s on (c.id=s.category_id and s.player_id=?) left join game_sessions gs on(c.id=gs.category_id and gs.player_id=?) group by c.id order by score desc', playerId,pId);
	
	var highScores = [];
	var gamesInCategory = 0;
	while (rows.isValidRow()){
		var score = rows.field(1);
		var categoryId = rows.field(0);
		
		var rows2 = db.execute('select count(*) from game_sessions where player_id=? and category_id=?',pId,categoryId);
		while(rows2.isValidRow()){
			gamesInCategory = rows2.field(0);
			rows2.next();
		}
		
		//var numberOfGames = rows.field(2);
		
		var obj = {
			score:score,
			category:categoryId,
			games:gamesInCategory
		};
		
		highScores.push(obj);
		rows.next();
	}
	
	rows.close();
	db.close();
	
	Ti.API.info('DAO: getPlayerHighScores returns '+highScores);
	return highScores;
}

/*Returns the player data for the profile page for the specified player*/
function getProfileData(playerId, remotePlayerId){
	Ti.API.info('DAO: getProfileData called for player id '+playerId+' with remote id '+remotePlayerId);
	var db = Ti.Database.install('buzz_db.sqlite', 'db');
	
	var playerObject = getCurrentPlayer();
	
	var name = playerObject.name;
	var maxScore = '';
	var badges = '';
	var totalGames = 0;
	var correctAnswers = 0;
	var wrongAnswers = 0;
	var totalQuestions = 0;
	
	var rows = db.execute('select max(score), p.name from players p left join scores s on (p.player_id=s.player_id) where p.player_id=?', remotePlayerId);
	while (rows.isValidRow()){
		if(rows.field(0) != null){
			maxScore = rows.field(0);
		}
		
		if(rows.field(1) != null){
			name = rows.field(1);	
		}
		
		rows.next();
	}
	
	rows.close();
	
	//count badges
	rows = db.execute('select count(*) from badges b where b.player_id=? and level > 0', playerId);
	while (rows.isValidRow()){
		badges = rows.field(0);
		rows.next();
	}
	
	rows.close();
	
	rows = db.execute('select count(*) from game_sessions s where s.player_id=?', playerId);
	while(rows.isValidRow()){
		totalGames = rows.field(0);
		rows.next();
	}
	
	rows.close();
	
	//count questions
	rows = db.execute('select count(*) from questions q');
	while (rows.isValidRow()){
		totalQuestions = rows.field(0);
		rows.next();
	}
	
	rows.close();
	
	//get answer rate
	rows = db.execute('select count(*), correct from questions_player q where player_id=? group by correct', playerId);
	while (rows.isValidRow()){
		if(rows.field(1) == 1){
			correctAnswers = rows.field(0);
		} else if(rows.field(1) == 0){
			wrongAnswers = rows.field(0);
		}
		
		rows.next();
	}
	
	var allUserAnswers = correctAnswers + wrongAnswers;
	
	var successRate = 0;
	if(allUserAnswers > 0){
		successRate = Math.round((correctAnswers / allUserAnswers) * 100);
	}
	 
	rows.close();
	
	//get user distinct answers
	var distinctUserAnswers = 0;
	rows = db.execute('select count(distinct q.question_id) from questions_player q where player_id=?', playerId);
	while(rows.isValidRow()){
		distinctUserAnswers = rows.field(0);
		rows.next();
	}
	
	rows.close();
		
	var explorationRate = Math.round((distinctUserAnswers / totalQuestions) * 100);
	
	var obj = {
		name:name,
		maxScore:maxScore,
		badges:badges,
		totalGames:totalGames,
		successRate:successRate,
		explorationRate:explorationRate
	};
	
	db.close();
	return obj;
}

/*Awards the specified badge/level to the specified user*/
function saveBadge(playerId, level, badgeId){
	Ti.API.info('DAO: awardBadge called for player id '+playerId+' badge id '+badgeId+' of level '+level);
	var db = Ti.Database.install('buzz_db.sqlite', 'db');
	db.execute('UPDATE BADGES SET LEVEL=? WHERE PLAYER_ID=? AND BADGE_ID=?', level,playerId,badgeId);
	
	if(badgeId == CAT_EXFORGE){
		userLevelBadge1 = level;
	} else if(badgeId == CAT_EPISTIMI){
		userLevelBadge2 = level;
	} else if(badgeId == CAT_GEOGRAFIA){
		userLevelBadge3 = level;
	} else if(badgeId == CAT_ISTORIA){
		userLevelBadge4 = level;
	} else if(badgeId == CAT_ATHLITIKA){
		userLevelBadge5 = level;
	}
	
	db.close();
}

/*Adds all badges at level 0 to the specified player*/
function initBadges(playerId){
	Ti.API.info('DAO: initBadges called for player id '+playerId);
	var db = Ti.Database.install('buzz_db.sqlite', 'db');
	
	var badgeId = 0;
	for(var i=0; i < DEFAULT_BADGES; i++){
		badgeId++;
		db.execute('INSERT INTO BADGES (PLAYER_ID,LEVEL, BADGE_ID) VALUES(?,?,?)', playerId,0,badgeId);
	}
	
	db.close();
}

/*Returns the number of badges for the specified player*/
function getPlayerBadgeCount(playerId){
	Ti.API.info('DAO: getPlayerBadgeCount called for player id '+playerId);
	var db = Ti.Database.install('buzz_db.sqlite', 'db');
	var rows = db.execute('select count(*) from badges b where b.player_id=? and level=3', playerId);
	
	var counter = 0;
	while (rows.isValidRow()){
		counter = rows.field(0);
		rows.next();
	}
	
	rows.close();
	db.close();
	
	return counter;
}

/*Returns the badge data for the specified player*/
function getBadgeData(playerId){
	Ti.API.info('DAO: getBadgeData called for player id '+playerId);
	var db = Ti.Database.install('buzz_db.sqlite', 'db');
	var rows = db.execute('select b.level, b.badge_id from badges b where b.player_id=?', playerId);
	
	while (rows.isValidRow()){
		var level = rows.field(0);
		var badgeId = rows.field(1);
		
		if(badgeId == CAT_EXFORGE){
			userLevelBadge1 = level;
		} else if(badgeId == CAT_EPISTIMI){
			userLevelBadge2 = level;
		} else if(badgeId == CAT_GEOGRAFIA){
			userLevelBadge3 = level;
		} else if(badgeId == CAT_ISTORIA){
			userLevelBadge4 = level;
		} else if(badgeId == CAT_ATHLITIKA){
			userLevelBadge5 = level;
		}
		
		rows.next();
	}
	
	rows.close();
	db.close();
}

/*Returns a list of all local players*/
function getGroupPlayers(){
	var db = Ti.Database.install('buzz_db.sqlite', 'db');
	var rows = db.execute('select id,name,player_id,avatar_filename from players_group order by name');
	
	var players = [];
	
	while (rows.isValidRow()){
		var obj = {
			id:rows.field(0),
			name:rows.field(1),
			player_id:rows.field(2),
			avatar_filename:rows.field(3)
		}
		
		players.push(obj);
		rows.next();
	}
	
	rows.close();
	db.close();
	
	return players;
}

function countQuestions(){
	var db = Ti.Database.install('buzz_db.sqlite', 'db');
	
	//count questions
	var cnt = 0;
	var rows = db.execute('select count(*) from questions');
	while (rows.isValidRow()){
		cnt = rows.field(0);
		rows.next();
	}	
	
	rows.close();
	db.close();
	
	return cnt;
}

//do a fix on orphan scores
function fixOrphanScores(){
    var currentPlayer = getCurrentPlayer();
    var name = currentPlayer.name;
    var playerId = currentPlayer.player_id;
    var orphanScores = 0;
    
    Ti.API.info('fixOrphanScores() for current player '+name);
    var db = Ti.Database.install('buzz_db.sqlite', 'db');
    var rows = db.execute('select count(*) from scores where name=? and player_id is null', name);
    while (rows.isValidRow()){
        var orphanScores = rows.field(0);
        rows.next();
    }
    
    rows.close();
    Ti.API.info('fixOrphanScores() for current player '+name+' with id '+playerId+' found '+orphanScores+' orphan scores');
    
    if(orphanScores > 0 && playerId != null && playerId != ''){
        db.execute('update scores set player_id=? where name=? and player_id is null',playerId,name);
        Ti.API.warn('fixOrphanScores() updated '+orphanScores+' orphan scores with remote player_id '+playerId);
    } else {
        Ti.API.info('fixOrphanScores() nothing to fix');
    }
    
    db.close();
}

//novartis fix for syncing unsynced player
function nvFixUnsyncedPlayer(){
    var currentPlayer = getCurrentPlayer();
    var name = currentPlayer.name;
    var playerId = currentPlayer.player_id;
    
    if(playerId == null || playerId == ''){
        Ti.API.warn('nvFixUnsyncedPlayer() found player '+name+' that has no remote ID');
    } else {
        Ti.API.info('nvFixUnsyncedPlayer() no need to sync');
    }
}

function debugScores(){
    var db = Ti.Database.install('buzz_db.sqlite', 'db');
    var rows = db.execute('select s.score, s.player_id, s.name, s.category_id, s.sync from scores s');
    
    var highScores = [];
    var i = 0;
    while (rows.isValidRow()){
        i++;
        var score = rows.field(0);
        var playerId = rows.field(1);
        var name = rows.field(2);
        var categoryId = rows.field(3);
        var sync = rows.field(4);
        
        Ti.API.info('DAO: debugScores() found  '+name+' for cat '+categoryId+' with score '+score+' and player id '+playerId+' and sync '+sync);
        
        rows.next();
    }
    
    rows.close();
    db.close();
}

function debugPlayers(){
    var db = Ti.Database.install('buzz_db.sqlite', 'db');
    var rows = db.execute('select id,facebook_id,name,player_id from players');
    while (rows.isValidRow()){
        var unsyncedPlayerId = rows.field(0);
        var unsyncedPlayerFacebookId = rows.field(1);
        var unsyncedplayerName = rows.field(2);
        var player_id = rows.field(3);
        
        Ti.API.warn('debugPlayers() found player id '+unsyncedPlayerId+' with name '+unsyncedplayerName+' player_id '+player_id);
        
        //savePlayerOnline(unsyncedPlayerId, unsyncedplayerName, unsyncedPlayerFacebookId, null);
        
        rows.next();
    }
    
    rows.close();
    db.close();
}

//novartis fix for syncing unsynced scores
function nvFixUnsyncedScores(){
    var currentPlayer = getCurrentPlayer();
    var name = currentPlayer.name;
    var playerId = currentPlayer.player_id;
    
    if(playerId != null && playerId != ''){
        
        var db = Ti.Database.install('buzz_db.sqlite', 'db');
        //get 10 unsynced local scores for synced players
        //var rows = db.execute('select s.id, p.player_id, s.category_id, s.score from scores s inner join players p on (s.player_id=p.id) where s.sync is null and p.player_id is not null limit 10');
        var rows = db.execute('select s.id, s.player_id, s.category_id, s.score from scores s where s.sync is null and s.player_id=? limit 10',playerId);
        
        var localScoreId = [];
        var remotePlayerId = [];
        var categoryId = [];
        var scores = [];
        
        while (rows.isValidRow()){
            localScoreId.push(rows.field(0));
            remotePlayerId.push(rows.field(1));
            categoryId.push(rows.field(2));
            scores.push(rows.field(3));
            
            rows.next();
        }
        
        rows.close();
        db.close();
        
        Ti.API.info('nvFixUnsyncedScores() found '+scores.length+' scores to sync online');
        
        if(scores.length > 0){
            saveScoreOnline(localScoreId, remotePlayerId, categoryId, scores);
        }
        //Ti.API.warn('nvFixUnsyncedPlayer() found player '+name+' that has no remote ID');
    } else {
        Ti.API.info('nvFixUnsyncedScores() no need to sync');
    }
}
