function AnswerCard(aid, answerText, answerConfidence, answerSource) {
  this.id = aid;
  this.answer = answerText;
  this.confidence = answerConfidence;
  this.sourceUrl = answerSource ? answerSource : "CIC";
}

var answerCardModule = angular.module('answerCard', []);

answerCardModule.controller('AnswerCardController', ['$scope', '$http', function($scope, $http) {
  $scope.answerCards = [];
  $scope.isLoading = false;

  var clearCards = function() {
    $scope.answerCards = [];
  };

  var HIDE_SUGGESTION = function() {
    if($scope.$parent.hideSuggestions && typeof $scope.$parent.hideSuggestions === 'function') {
      $scope.$parent.hideSuggestions();
      console.log("There is a parent with hideSuggestions");
    } else {
      console.log("No parent with hideSuggestions");
    }
  };

  var SHOW_SUGGESTION = function() {
    if($scope.$parent.showSuggestions && typeof $scope.$parent.showSuggestions === 'function') {
      $scope.$parent.showSuggestions();
      console.log("There is a parent with hideSuggestions");
    } else {
      console.log("No parent with hideSuggestions");
    }
  };

  clearCards();

  $scope.watsonRoute = 'http://54.69.43.163/ask';

  $scope.askWatson = function(question) {
    if ($scope.isLoading || !question) {
      return;
    }

    $scope.isLoading = true;
    clearCards();

    $http.get($scope.watsonRoute, {params: {q: question}}).
    success(function(data, status, headers, config) {
      angular.forEach(data.question.answers, function(value, i) {
        $scope.answerCards.push(new AnswerCard(value.id, value.text, value.confidence));
        $scope.isLoading = false;
      });
    }).
    error(function(data, status, headers, config) {
      console.error(data);
      $scope.isLoading = false;
    });

    HIDE_SUGGESTION();
  }

  $scope.resetQA = function() {
    clearCards();
    SHOW_SUGGESTION();
  }
}]);

answerCardModule.directive('myAnswers', function(){
  var answerCardTemplate = '<div class="aCard"><div class="row">' +
                                '<div class="large-8 columns large-centered">' +
                                    '<div class="answer-card-container">' +
                                        '<div class="answer-card-examine">' +
                                             '<a href="javascript:void(0);" data-modal-id={{aCard.id}} onclick="toggleModal(this)">' + 
                                                 '<i class="fa fa-eye"></i>' +
                                              '</a>' + 
                                        '</div>' +
                                        '<div class="answer-card">' +
                                            '<div class="answer-card-text"> {{aCard.answer}} </div>' +
                                        '</div>' +
                                        '<div class="answer-card-confidence"> {{aCard.sourceUrl}} </div>' +
                                        '<div class="answer-card-source-url"> {{aCard.confidence}} </div>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                            '<div id=card-modal-{{aCard.id}} class="reveal-modal" data-reveal>' +
                                '<h3>Answer: </h3>' +
                                '<hr />' +
                                '<p>{{aCard.answer}}</p>' +
                                '<a class="close-reveal-modal">&#215;</a>' +
                            '</div></div>';
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
