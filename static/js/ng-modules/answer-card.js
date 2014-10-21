function AnswerCard() {
  this.answer = 'Answer';
  this.confidence = '99%';
  this.sourceUrl = 'www.google.com';
}


var answerCardModule = angular.module('answerCard', []);

answerCardModule.controller('AnswerCardController', function($scope) {
  $scope.answerCards = [];

  $scope.addAnswer = function() {
      $scope.answerCards.push(new AnswerCard());
  }
})

answerCardModule.directive('myAnswers', function(){
  return {
      restrict: 'A',
      template: '<div class="answer-card">{{aCard.answer}} {{aCard.sourceUrl}}</div>',
      replace: true,
      transclude: false,
      scope: {
          aCard: '=myAnswers'
      }
  };
});