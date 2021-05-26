class Quiz {
  	constructor(){}

  	getState(){
    	var gameStateRef  = database.ref('gameState');
    	gameStateRef.on("value",function(data){
       		gameState = data.val();
    	})
  	}

  	update(state){
    	database.ref('/').update({
      		gameState: state
    	});
  	}

  	async start(){
    	if(gameState === 0){
      		contestant = new Contestant();
      		var contestantCountRef = await database.ref('contestantCount').once("value");
      		if(contestantCountRef.exists()){
        		contestantCount = contestantCountRef.val();
        		contestant.getCount();
      		}
      		question = new Question()
      		question.display();
    	}
  	}

  	play(){
		//write code here to hide question elements
		question.hide();
    	//write code to change the background color here
		background("yellow");
    	//write code to show a heading for showing the result of Quiz
		fill("blue");
		textFont("verdana")
		textSize(40);
		text("Results",325,55);
    	//call getContestantInfo( ) here
		Contestant.getContestantInfo();

    	//write condition to check if contestantInfor is not undefined
		if(allContestants !== undefined){
			//write code to add a note here
			fill("darkgrey");
			textSize(20);
			text("Constestants who answered correctly will be in green",130,230);
			//write code to highlight contest who answered correctly
			var display_position = 250;
			var correctAnswer = "2";
			for (var plr in allContestants){
			  	if (correctAnswer === allContestants[plr].answer)
					fill("green")
			  	else
					fill("red");
	  
				display_position+=20;
			  	textSize(15);
			  	text(allContestants[plr].name + ": " + allContestants[plr].answer, 170,display_position);
			}
		}
	}

}
