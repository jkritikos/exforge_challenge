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
