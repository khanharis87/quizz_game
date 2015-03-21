'use strict';

angular.module("qanda",[])
	.controller('mainCtrl',['$scope','$http',function($scope,$http){
		$scope.testList = [];
		$scope.questions = [];
		$scope.solutions = [];
		$scope.currentQuestion = {};
		$scope.currentQuestionNum = 0;
		$scope.answersGiven = {};
		$scope.score = 0;
		$scope.showScore = true;

		$http.get('json/test.json').success(function(data){
			$scope.questions = data.questions;
			$scope.solutions = data.solution;
			$scope.currentQuestion = $scope.questions[0];
		});

		$scope.$watch('answersGiven', function(newVal) {
			console.log(newVal);
		}, true);

		$scope.submitAnswer = function() {
			// get the score from $scope.solutions
		
			var solution = $scope.solutions[$scope.currentQuestion.id];
			var potentialPoints = solution.value;
			var percentage = solution.answers[$scope.answersGiven[$scope.currentQuestion.id]];
			var questionScore = (potentialPoints /100)*percentage;
			$scope.score += questionScore;

			showNextQuestion();

		};
		// update the score by checking the score in $scope.testList.answers
		function showNextQuestion() {
				$scope.currentQuestionNum++;
				$scope.currentQuestion = $scope.questions[$scope.currentQuestionNum];
				if($scope.currentQuestionNum >= 4){
					$scope.showScore = false;
				}

		}

		// function showNextQuestion
		// $scope.currentQuestionNum++
		// if this is the last question, show the score instead
		// $sscope.currentQuestion = $scope.testList.questions[$scope.currentQuestionNum];
	}]);

