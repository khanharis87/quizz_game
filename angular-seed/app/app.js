'use strict';

angular.module("qanda",['ui.bootstrap'])
	.controller('mainCtrl',['$scope','$http',function($scope,$http){
		$scope.testList = [];
		$scope.questions = [];
		$scope.solutions = [];
		$scope.currentQuestion = {};
		$scope.currentQuestionNum = 0;
		$scope.answersGiven = {};
		$scope.score = 0;
		$scope.showScore = true;
		$scope.progressbarWidth = "20";

		//getting json
		$http.get('json/test.json').success(function(data){
			$scope.questions = data.questions;//storing questions
			$scope.solutions = data.solution;//soring solutions
			$scope.currentQuestion = $scope.questions[0]; //getting first question to show first
		});

		$scope.$watch('answersGiven', function(newVal) {
			console.log(newVal);
		}, true); //checking the answersGiven object behaviour 

		$scope.submitAnswer = function() {
			var solution = $scope.solutions[$scope.currentQuestion.id]; //getting solutionID
			var potentialPoints = solution.value; //getting total points
			var percentage = solution.answers[$scope.answersGiven[$scope.currentQuestion.id]]; //getting each answer ratio
			var questionScore = (potentialPoints /100)*percentage; //calculating score per question
			$scope.score += questionScore; //incrementing score

			showNextQuestion(); //show new question
			updateProgressbar();

		};

		function updateProgressbar(){
			$scope.progressbarWidth = parseInt($scope.progressbarWidth) + 20;
			$scope.progressbarWidth.toString();
		}

		function showNextQuestion() {
				$scope.currentQuestionNum++; 
				$scope.currentQuestion = $scope.questions[$scope.currentQuestionNum];
				if($scope.currentQuestionNum >= 4){
					$scope.showScore = false;
				}
		$scope.tryAgain = function(){
			window.location.reload();
		}		

		}
	}]);

