function testDecryption(loops){
	var questions = getGameQuestions(1,1);
	
	for(var z=0; z < loops; z++){
		Ti.API.error('loop '+z);
		
		
		Ti.API.warn('EPISTIMI questions');
		for(var i=0; i < questions.data.length; i++){
			var questionDecrypted = decrypt(questions.data[i].question);
			Ti.API.info(questionDecrypted);
		}
		
		questions = getGameQuestions(4,1);
		Ti.API.warn('ATHLITIKA questions');
		for(var i=0; i < questions.data.length; i++){
			var questionDecrypted = decrypt(questions.data[i].question);
			Ti.API.info(questionDecrypted);
		}
	}
	
	
}

function testGroupScores(){
	var db = Ti.Database.install('buzz_db.sqlite', 'db');
	
	var groupPlayers = getGroupPlayers();
	if(groupPlayers != null){
		for(var i=0; i < groupPlayers.length; i++){
			var tmpName = groupPlayers[i].name;
			var id = groupPlayers[i].id;
			
			Ti.API.info('testGroupScores() found group player '+tmpName+' with id '+id);
		}
	} else {
		Ti.API.info('testGroupScores() found NO group players');
	}
	
	var rows = db.execute('select s.score,s.name,s.avatar_filename,s.game_id,s.player_id from scores_group s');
	while (rows.isValidRow()){
		var score = rows.field(0);
		var name = rows.field(1);
		var avatar = rows.field(2);
		var gameId = rows.field(3);
		var playerId = rows.field(4);
		
		Ti.API.info('testGroupScores() found score '+score+' from player '+name+' with id '+playerId+' on game id '+gameId);	
			
		rows.next();
	}
	
	rows.close();
	db.close();
}

function getRemoteQuestions(){
	var db = Ti.Database.install('buzz_db.sqlite', 'db');
	var rows = null;
	
	var a = '';
	var b = '';
	var c = '';
	var d = '';
	var e = '';
	var f = '';
	
	rows = db.execute('select q.question_id from questions q where question_id <= 1000');
	while (rows.isValidRow()){
		var id = rows.field(0);
		rows.next();
		a += id + ',';
	}
	
	rows.close();
	
	rows = db.execute('select q.question_id from questions q where question_id <= 2000 and question_id > 1000');
	while (rows.isValidRow()){
		var id = rows.field(0);
		rows.next();
		b += id + ',';
	}
	
	rows.close();
	
	rows = db.execute('select q.question_id from questions q where question_id <= 3000 and question_id > 2000');
	while (rows.isValidRow()){
		var id = rows.field(0);
		rows.next();
		c += id + ',';
	}
	
	rows.close();
	
	rows = db.execute('select q.question_id from questions q where question_id <= 4000 and question_id > 3000');
	while (rows.isValidRow()){
		var id = rows.field(0);
		rows.next();
		d += id + ',';
	}
	
	rows.close();
	
	rows = db.execute('select q.question_id from questions q where question_id <= 5000 and question_id > 4000');
	while (rows.isValidRow()){
		var id = rows.field(0);
		rows.next();
		e += id + ',';
	}
	
	rows.close();
	
	rows = db.execute('select q.question_id from questions q where question_id > 5000');
	while (rows.isValidRow()){
		var id = rows.field(0);
		rows.next();
		f += id + ',';
	}
	
	rows.close();
	
	//remove trailing ,
	a = a.substring(0, a.length-1);
	b = b.substring(0, b.length-1);
	c = c.substring(0, c.length-1);
	d = d.substring(0, d.length-1);
	e = e.substring(0, e.length-1);
	f = f.substring(0, f.length-1);
	
	Ti.API.info('a is '+a);
	Ti.API.info('b is '+b);
	Ti.API.info('c is '+c);
	Ti.API.info('d is '+d);
	Ti.API.info('e is '+e);
	Ti.API.info('f is '+f);
}


getRemoteQuestions();
