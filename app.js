var app = angular.module('quizzicle', ["checklist-model"]);

app.controller('quizController', ['$scope', function($scope){
	$scope.config = data;

	// Operate some add. info and stuff on the questions array
	(function(){
		if($scope.config.shuffle){
			// Randomize order of questions
			shuffle($scope.config.questionBank);
		}

		// Determine what type each question is
		// as well as the question number
		for(var i = 0; i < $scope.config.questionBank.length; ++i){
			var q = $scope.config.questionBank[i];

			var hasChoices = !!q.choices,
				hasAnswers = !!q.answers;
			
			// Todo: some checking to make sure values are acceptable
			if(hasChoices && hasAnswers){
				q.format = "multiple";
			}
			else if(hasChoices && !hasAnswers){
				q.format = "predetermined";
			}
			else{
				q.format = "text";
			}
			
			// The question number
			q.number = i + 1;

			// Shuffle the answers if set
			if($scope.config.shuffleChoices){
				if(hasChoices)
					shuffle(q.choices);
			}
		}
	})();

	$scope.error = false;
	$scope.TotalQuestions = $scope.config.questionBank.length;
	$scope.currentQuestionIndex = 0;
	$scope.correct = 0;

	$scope.stage = 1;

	$scope.formData ={
		currentAnswer: "",
		answers: []
	};

	// Whenever the index changes, we need to update with the relevant question
	$scope.$watch('currentQuestionIndex', function(){
		$scope.question = $scope.config.questionBank[$scope.currentQuestionIndex];
		$scope.completion = Math.floor((100 / $scope.TotalQuestions) * $scope.currentQuestionIndex);
	});



	/***
		FUNCTIONS
	***/
	$scope.beginQuestionaire = function(){
		// Add the leave-safe
		document.body.onbeforeunload = function(){
			return "Are you sure you want to leave this page? Your quiz answers won't be saved!";
		};

		$scope.stage = 2;
	};

	// answerIndex: for when we're using a choice type
	$scope.answer = function(answerIndex){
		var theirAnswer,
			currentQuestion = $scope.config.questionBank[$scope.currentQuestionIndex];

		// We + "" to ensure it's always a string
		// Notes: Only validates text answers. Multiple and predetermined isn't validated.
		switch(currentQuestion.format){
			case "text":
				theirAnswer = $scope.formData.currentAnswer + "";

				// Validation
				if(theirAnswer.replace(/^[\s\.]*/, '').replace(/[\s\.]*$/, '').length == 0){
					$scope.error = true;
					return;
				}
				break;
			case "predetermined":
				theirAnswer = $scope.config.questionBank[$scope.currentQuestionIndex].choices[answerIndex] + "";
				break;
			case "multiple":
				theirAnswer = $scope.formData.answers;
				break;
		}

		// Assign their answer to the question
		currentQuestion.theirAnswer = theirAnswer;

		// Check if there's a next question
		if($scope.config.questionBank[$scope.currentQuestionIndex + 1] != undefined){

			// Fetch the next question
			$scope.currentQuestionIndex++;

			// Resets
			$scope.formData.currentAnswer = "";
			$scope.formData.answers = [];
			$scope.error = false;
		}
		// Answered all questions.
		else{
			$scope.finish();
		}
	};

	$scope.finish = function(){
		// Utility used in multiple
		var inAnswers = function(value, arr){
			for(var i = 0, j = arr.length; i < j; ++i){
				if(value == clean(arr[i])){
					return true;
				}
			}
			return false;
		};

		var correctAnswers = 0;

		for(var i = 0; i < $scope.config.questionBank.length; ++i){
			var question = $scope.config.questionBank[i];

			question.isCorrect = false;

			if(question.format === 'text' || question.format === 'predetermined'){
				if(clean(question.theirAnswer) == clean(question.answer)){
					question.isCorrect = true;
				}
			}
			else if(question.format === "multiple"){
				// First we see if they got as many answers as the specification
				question.isCorrect = (question.theirAnswer.length === question.answers.length);

				// If they do, we can do more in-depth testing and check each answer
				if(question.isCorrect){
					for(var i2 = 0, j2 = question.theirAnswer.length; i2 < j2; ++i2){
						var answer = clean(question.theirAnswer[i2]);
						
						// Get the first instance of one wrong answer
						if(!inAnswers(answer, question.answers)){
							question.isCorrect = false;
							break;
						}
					}
				}
			}
			
			if(question.isCorrect)
				++correctAnswers;
		}

		$scope.correct = correctAnswers;
		$scope.stage = 3;

		// Don't need it anymore
		document.body.onbeforeunload = null;
	};
	
	// delete, we don't need it
	data = undefined;
}]);

/***
	UTILITIES
***/

// Fischer-Yates algorithym
function shuffle(array){
	var currentIndex = array.length, temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

// Tries to make answers as basic as they can for comparison
function clean(answer){
	if(typeof answer == 'string'){
		if(answer.match(/^\d+$/)){
			return parseInt(answer);
		}
		else{
			return answer.toLowerCase().replace(/^[\s\.]*/, '').replace(/[\s\.]*$/, '');
		}
	}
	else if(typeof answer == 'number'){
		return answer;
	}
	
	// Invalid entry
	throw "Input not valid";
};