Ti.API.warn('DEBUG 4');

var PRODUCTION_MODE = false;
//for building the free version
var IS_FREE_APP = 1;
//iphone=1, ipad=2
var BUZZ_APP_TYPE = 1; 
//The default content version
var CONTENT_VERSION = 2;
//Security flag, indicates whether the app is allowed to talk to the server
var BLACKLISTED = false;
//Secuirty flag, indicates whether this version of the app is allowed to play
var FORCE_BUZZ_UPDATE = false;

//Menu sounds
var audio = Ti.Media.createSound({url:'sounds/quiz-maintheme.caf', looping:true});
var audioClick = Ti.Media.createSound({url:'sounds/click4.caf', looping:false});
var audioBack = Ti.Media.createSound({url:'sounds/back.caf', looping:false});
var audioPlay = Ti.Media.createSound({url:'sounds/play.caf', looping:false});
var audioError = Ti.Media.createSound({url:'sounds/error.caf', looping:false});
var audioAccept = Ti.Media.createSound({url:'sounds/accepted.caf', looping:false});
Ti.API.info('Using CAF sounds');

var isIpad = (Ti.Platform.osname == 'ipad') ? true : false;
var IPHONE5 = false;
if(!isIpad && Ti.Platform.displayCaps.platformHeight == 568){
	IPHONE5 = true;	
}

var PLATFORM_HEIGHT = Ti.Platform.displayCaps.platformHeight;

var IMAGE_PATH = 'images/iphone/';
var BUZZ_PATH = 'game/iphone/';

if(isIpad){
	BUZZ_APP_TYPE = 2;
	IMAGE_PATH = 'images/ipad/';
	BUZZ_PATH = 'game/ipad/';
}

Ti.API.info('IPHONE5='+IPHONE5+' IPAD='+isIpad);
//End UI device handling

//Currently visible views
var VIEWING_HIGH_SCORES = false;
var VIEWING_SETTINGS = false;
var VIEWING_LOGIN = false;
var VIEWING_PROFILE = false;

//Import control flags
var LOADED_PROFILE_JS = false;
var LOADED_STARS_SCROLL_JS = false;
var LOADED_TOP_SELECTION_JS = false;
var LOADED_SETTINGS_JS = false;
var LOADED_TIPS_JS = false;
var LOADED_SIGNIN_JS = false;
var LOADED_CATEGORIES_JS = false;
var LOADED_LOADER_JS = false;
var LOADED_QUESTION_JS = false;
var LOADED_TOP_VIEW_JS = false;
var LOADED_INVITE_JS = false;
var LOADED_STARS_DETAILS_JS = false;
var LOADED_AWARD_BADGE_JS = false;
var LOADED_FEEDBACK_JS = false;
var LOADED_TIPS_DETAILS_JS = false;
var LOADED_ABOUT_CREDITS_JS = false;
var LOADED_GAME_SELECTION_JS = false;
var LOADED_GROUP_SELECTION_JS = false;
var LOADED_GROUP_PLAYER_SELECTION_JS = false;
var LOADED_PLAYER_NAMES_SELECTION_JS = false;
var LOADED_QUESTION_NEXT_JS = false;
var LOADED_QUESTION_REPORT_JS = false;

//Import files
var FILE_PROFILE_JS = "profile.js";
var FILE_STARS_SCROLL_JS = "stars_scroll.js";
var FILE_TOP_SELECTION_JS = "top_selection.js";
var FILE_SETTINGS_JS = "settings.js";
var FILE_TIPS_JS = "tips.js";
var FILE_SIGNIN_JS = "signin.js";
var FILE_CATEGORIES_JS = "categories.js";
var FILE_LOADER_JS = "loader.js";
var FILE_QUESTION_JS = "question.js";
var FILE_TOP_VIEW_JS = "top_view.js";
var FILE_INVITE_JS = "invite.js";
var FILE_STARS_DETAILS_JS = "stars_details.js";
var FILE_AWARD_BADGE_JS = "award_badge.js";
var FILE_FEEDBACK_JS = "feedback.js";
var FILE_TIPS_DETAILS_JS = "tips_details.js";
var FILE_ABOUT_CREDITS_JS = "about_credits.js";
var FILE_GAME_SELECTION_JS = "game_selection.js";
var FILE_GROUP_SELECTION_JS = "group_selection.js";
var FILE_GROUP_PLAYER_SELECTION_JS = "player_selection.js";
var FILE_PLAYER_NAMES_SELECTION_JS = "playernames_selection.js";
var FILE_QUESTION_NEXT_JS = "question_next.js";
var FILE_QUESTION_REPORT_JS ="question_report.js";

/*Imports the required resource ONCE*/
function mtbImport(file){
	if(file == FILE_PROFILE_JS){
		if(!LOADED_PROFILE_JS){
			Ti.include(BUZZ_PATH+file);
			LOADED_PROFILE_JS = true;
		}
	} else if(file == FILE_STARS_SCROLL_JS){
		if(!LOADED_STARS_SCROLL_JS){
			Ti.include(BUZZ_PATH+file);
			LOADED_STARS_SCROLL_JS = true;
		}
	} else if(file == FILE_TOP_SELECTION_JS){
		if(!LOADED_TOP_SELECTION_JS){
			Ti.include(BUZZ_PATH+file);
			LOADED_TOP_SELECTION_JS = true;
		}
	} else if(file == FILE_SETTINGS_JS){
		if(!LOADED_SETTINGS_JS){
			Ti.include(BUZZ_PATH+file);
			LOADED_SETTINGS_JS = true;
		}
	} else if(file == FILE_TIPS_JS){
		if(!LOADED_TIPS_JS){
			Ti.include(BUZZ_PATH+file);
			LOADED_TIPS_JS = true;
		}
	} else if(file == FILE_SIGNIN_JS){
		if(!LOADED_SIGNIN_JS){
			Ti.include(BUZZ_PATH+file);
			LOADED_SIGNIN_JS = true;
		}
	} else if(file == FILE_CATEGORIES_JS){
		if(!LOADED_CATEGORIES_JS){
			Ti.include(BUZZ_PATH+file);
			LOADED_CATEGORIES_JS = true;
		}
	} else if(file == FILE_LOADER_JS){
		if(!LOADED_LOADER_JS){
			Ti.include(BUZZ_PATH+file);
			LOADED_LOADER_JS = true;
		}
	} else if(file == FILE_QUESTION_JS){
		if(!LOADED_QUESTION_JS){
			Ti.include(file);
			LOADED_QUESTION_JS = true;
		}
	} else if(file == FILE_TOP_VIEW_JS){
		if(!LOADED_TOP_VIEW_JS){
			Ti.include(BUZZ_PATH+file);
			LOADED_TOP_VIEW_JS = true;
		}
	} else if(file == FILE_INVITE_JS){
		if(!LOADED_INVITE_JS){
			Ti.include(BUZZ_PATH+file);
			LOADED_INVITE_JS = true;
		}
	} else if(file == FILE_STARS_DETAILS_JS){
		if(!LOADED_STARS_DETAILS_JS){
			Ti.include(BUZZ_PATH+file);
			LOADED_STARS_DETAILS_JS = true;
		}
	} else if(file == FILE_AWARD_BADGE_JS){
		if(!LOADED_AWARD_BADGE_JS){
			Ti.include(BUZZ_PATH+file);
			LOADED_AWARD_BADGE_JS = true;
		}
	} else if(file == FILE_FEEDBACK_JS){
		if(!LOADED_FEEDBACK_JS){
			Ti.include(BUZZ_PATH+file);
			LOADED_FEEDBACK_JS = true;
		}
	} else if(file == FILE_TIPS_DETAILS_JS){
		if(!LOADED_TIPS_DETAILS_JS){
			Ti.include(BUZZ_PATH+file);
			LOADED_TIPS_DETAILS_JS = true;
		}
	} else if(file == FILE_ABOUT_CREDITS_JS){
		if(!LOADED_ABOUT_CREDITS_JS){
			Ti.include(BUZZ_PATH+file);
			LOADED_ABOUT_CREDITS_JS = true;
		}
	} else if(file == FILE_GAME_SELECTION_JS){
		if(!LOADED_GAME_SELECTION_JS){
			Ti.include(BUZZ_PATH+file);
			LOADED_GAME_SELECTION_JS = true;
		}
	} else if(file == FILE_GROUP_SELECTION_JS){
		if(!LOADED_GROUP_SELECTION_JS){
			Ti.include(BUZZ_PATH+file);
			LOADED_GROUP_SELECTION_JS = true;
		}
	} else if(file == FILE_GROUP_PLAYER_SELECTION_JS){
		if(!LOADED_GROUP_PLAYER_SELECTION_JS){
			Ti.include(BUZZ_PATH+file);
			LOADED_GROUP_PLAYER_SELECTION_JS = true;
		}
	} else if(file == FILE_PLAYER_NAMES_SELECTION_JS){
		if(!LOADED_PLAYER_NAMES_SELECTION_JS){
			Ti.include(BUZZ_PATH+file);
			LOADED_PLAYER_NAMES_SELECTION_JS = true;
		}
	} else if(file == FILE_QUESTION_NEXT_JS) {
		if(!LOADED_QUESTION_NEXT_JS){
			Ti.include(BUZZ_PATH+file);
			LOADED_QUESTION_NEXT_JS = true;
		}
	} else if(file == FILE_QUESTION_REPORT_JS) {
		if(!LOADED_QUESTION_REPORT_JS){
			Ti.include(BUZZ_PATH+file);
			LOADED_QUESTION_REPORT_JS = true;
		}
	}
}

//Ti.include('game/dao_purchase.js');
Ti.include('lib/aes.js');
Ti.include('lib/urbanairship.js');
Ti.include(BUZZ_PATH+'updater.js');
Ti.include('game/dao.js');
//Finally include the menu window
Ti.include(BUZZ_PATH+'menu.js');

//Ti.include('game/testGame.js');
//our game session
var gameSession = null;

//Application resume event listener
Titanium.App.addEventListener('resume', function(e){
	Ti.API.warn('RESUME app, gameInProgress='+isGameInProgress());
	//Quit game if in progress
	if(isGameInProgress() && LOADED_QUESTION_JS && timeBarFull2 != null){
		//Stop timebar
		stopTime();
	
		labelQuestion.opacity = 0.5;
		resultWrong.show();
				
		//Call wrongAnswer() from an app resume event
		wrongAnswer(true);
				
		//highlight correct answer
		currentCorrectAnswerImage.opacity = 1;
		currentCorrectAnswerImage.image = currentCorrectAnswerImagePath;
	} else {
		Ti.API.warn('RESUME app, gameInProgress='+isGameInProgress()+' but game view is null');
		if(MUSIC_MODE){
			//audio.reset();
			//audio.play();
		}
		
		//Sync if we're not coming back from a potential FB login action
		if(!VIEWING_SETTINGS && !VIEWING_LOGIN){
			setTimeout(function(){
				sync();
			}, 3000);
			
		} else {
			Ti.API.info('Not syncing due to potential FB login action');
		}
		
	}
});

//Init music and sounds
var MUSIC_MODE = getMusicMode();
var SOUNDS_MODE = getSoundsMode();

//Standard scale matrixes
var SCALE_ZERO = Ti.UI.create2DMatrix().scale(0);
var SCALE_ONE = Ti.UI.create2DMatrix().scale(1.0);

var SCALE_UP = Ti.UI.create2DMatrix().scale(1.1);

//Get persisted player, if exists
var playerObject = getCurrentPlayer();
var playerName = playerObject.name;

//Default the facebook id to empty
var fbId = playerObject.facebook_id;

//Facebook button
var defaultFacebookImage = IMAGE_PATH+'login/fb_connect.png';

//Network called removed, just a local hello()
hello();

//Sounds
var AUDIO_GAMEPLAY_LOADED = false;

//open win
if(MUSIC_MODE){
	audio.setVolume(1);
	audio.reset();
	audio.play();
}

audio.addEventListener('resume', function(){
	Ti.API.warn('AUDIO RESUMED');
	audio.reset();
	audio.play();
});

//Gameplay sounds
var audioBonusLife = null;
var audioGameplay = null;
var answerCorrect = null;
var answerWrong = null;
var gameOverSound = null;
var timeOverSound = null;
var scoreSound = null;
var nextQuestionSound = null;

//Load data event listener
win.addEventListener('playMainMusic', function(e) {
	Ti.API.info('*** EVENT playMainMusic received');
	
	setTimeout(function(){
    	if(MUSIC_MODE){
			audio.setVolume(1);
			audio.reset();
			audio.play();	
		}
	},250);
});

//Fade in animation
var anim_in = Titanium.UI.createAnimation();
anim_in.opacity=1;
anim_in.duration = 400;

//Fade out animation
var anim_out = Titanium.UI.createAnimation();
anim_out.opacity=0;
anim_out.duration = 400;

/*Facebook logout event handler*/
/*
Titanium.Facebook.addEventListener('logout', function(e) {
    Ti.API.info('Facebook LOGOUT event, VIEWING_LOGIN='+VIEWING_LOGIN+' VIEWING_SETTINGS='+VIEWING_SETTINGS);
    
    //Clear & unlock username textfields
    if(VIEWING_LOGIN){
    	if(tf1 != null){
	    	tf1.enabled = true;
	    	tf1.value = '';
	    }
	    if(fbButton != null){
			fbButton.image = IMAGE_PATH+'login/fb_connect.png';	
		}
    } else if(VIEWING_SETTINGS){
    	if(settingsTextfieldUsername != null){
	    	settingsTextfieldUsername.enabled = true;
	    	settingsTextfieldUsername.value = '';
	    }
	    if(fbButtonSettings != null){
			fbButtonSettings.image = IMAGE_PATH+'login/fb_connect.png';	
		}
    }
    
	//Clear persistance
	removePlayer();
	fbId = '';
});

/*Facebook login event handler*/
/*
Titanium.Facebook.addEventListener('login', function(e) {
	
	Ti.API.info('Facebook LOGIN event VIEWING_LOGIN='+VIEWING_LOGIN+' VIEWING_SETTINGS='+VIEWING_SETTINGS);
	
	if(Titanium.Facebook.loggedIn){
		
		//Change FB buttons to logout
		if(VIEWING_SETTINGS){
			if(fbButtonSettings != null){
				fbButtonSettings.image = IMAGE_PATH+'login/fb_disconnect.png';
			}
			if(settingsTextfieldUsername != null){
				settingsTextfieldUsername.enabled = false;
			}
		} else if(VIEWING_LOGIN){
			if(fbButton != null){
				fbButton.image = IMAGE_PATH+'login/fb_disconnect.png';
			}
			//Lock textfields
			if(tf1 != null){
				tf1.enabled = false;
			}
		}
		
		Titanium.Facebook.requestWithGraphPath('me', {}, 'GET', function(e) {
    		if (e.success) {
    			var jsonFBData = JSON.parse(e.result);
    			var fbName = jsonFBData.name;
    			var gender = jsonFBData.gender;
    			fbId = jsonFBData.id;
    			
    			//Fill the username textfields
    			if(VIEWING_LOGIN){
    				if(tf1 != null){
	    				tf1.value = fbName;
	    			}
    			} else if(VIEWING_SETTINGS){
    				if(settingsTextfieldUsername != null){
	    				settingsTextfieldUsername.value = fbName;
	    			}
    			}
    			
    			//Persist player
    			savePlayer(fbName, fbId, gender);
    			Ti.API.info('Player.js facebook name is '+fbName+' facebook id is '+fbId+' gender is '+gender);
    			
    			//Update the online scores. Get your friends first
    			facebookGetFriendsWithApp();
    			
    		} else if (e.error) {
        		//TODO handle error
        		alert(e.error);
    		} else {
    			//TODO handle unknown response
        		alert('Unknown response');
    		}
		});
		
	} else {
		Ti.API.info('USER **NOT** LOGGED IN TO FACEBOOK!');
	}	
});
*/

//Modify our schema if needed
//updateSchema();





//TMP DEBUG
//Ti.include('game/tester.js');
//testGroupScores();
//END TMP DEBUG