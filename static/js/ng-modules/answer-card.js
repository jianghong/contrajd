function AnswerCard() {
  this.answer = 'Just use google dipshit';
  this.confidence = '99%';
  this.sourceUrl = 'www.google.com';
}



var answerCardModule = angular.module('answerCard', []);

answerCardModule.controller('AnswerCardController', function($scope) {
  $scope.answerCards = [];

  $scope.addAnswer = function() {
      $scope.answerCards.push(new AnswerCard());
  }
});

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
