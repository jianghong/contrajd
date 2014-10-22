function AnswerCard(question) {
  this.answer = question;
  this.confidence = '99%';
  this.sourceUrl = 'www.google.com';
}

var answerCardModule = angular.module('answerCard', []);

answerCardModule.controller('AnswerCardController', ['$scope', '$http', function($scope, $http) {
  $scope.answerCards = [];
  $scope.watsonRoute = 'http://127.0.0.1:8000/ask';

  $scope.askWatson = function(question) {
    $scope.answerCards = []; // Reset
    $http.get($scope.watsonRoute, {params: {q: question}}).
    success(function(data, status, headers, config) {
      console.log(data);
    }).
    error(function(data, status, headers, config) {
      console.error(data);
    });
    $scope.answerCards.push(new AnswerCard(question));
    $scope.$parent.hideSuggestions();
  }

  $scope.resetQA = function() {
    $scope.answerCards = [];
    $scope.$parent.showSuggestions();
  }
}]);

answerCardModule.directive('myAnswers', function(){
  var answerCardTemplate = '<div class="row">' +
                                '<div class="large-12 columns">' + 
                                    '<div class="answer-card">' +
                                        '{{aCard.answer}} {{aCard.sourceUrl}}' + 
                                    '</div>' +
                                '</div>' + 
                            '</div>';
  return {
      restrict: 'A',
      template: answerCardTemplate,
      replace: true,
      transclude: false,
      scope: {
          aCard: '=myAnswers'
      }
  };
});
