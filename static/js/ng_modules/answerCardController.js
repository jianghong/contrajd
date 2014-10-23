function AnswerCard(aid, answerText, answerConfidence, answerSource) {
  this.id = aid;
  this.answer = answerText;
  this.confidence = answerConfidence;
  this.sourceUrl = answerSource ? answerSource : "CIC";
}

var answerCardModule = angular.module('answerCard', []);

answerCardModule.controller('AnswerCardController', ['$scope', '$http', function($scope, $http) {
  $scope.answerCards = [];
  var clearCards = function() {
    $scope.answerCards = [];
  };

  clearCards();

  $scope.watsonRoute = 'http://127.0.0.1:8000/ask';

  $scope.askWatson = function(question) {
    clearCards();

    var value = {
      confidence: 0.0003,
      id: 4,
      pipeline: "Descriptive",
      text: "Loss of residency criteria Paragraph 28(2)(a) of the Act reads: 28.(2)(a) a permanent resident complies with the residency obligation with respect to a five-year period if, on each of a total of at least 730 days in that five-year period, they are (i) physically present in Canada, (ii) outside Canada accompanying a Canadian citizen who is their spouse or common-law partner or, in the case of a child, their parent, (iii) outside Canada employed on a full-time basis by a Canadian business or in the public service of Canada or of a province, (iv) outside Canada accompanying a permanent resident who is their spouse or commonlaw partner or, in the case of a child, their parent and who is employed on a full-time basis by a Canadian business or in the public service of Canada or of a province, or (v) referred to in regulations providing for other means of compliance. Regulation 328 of the Immigration and Refugee Protection Regulations reads: 328. (1) A person who was a permanent resident immediately before the coming into force of this section is a permanent resident under the Immigration and Refugee Protection Act. (2) Any period spent outside Canada within the five years preceding the coming into force of this section by a permanent resident holding a returning resident permit is considered to be a period spent in Canada for the purpose of satisfying the residency obligation under section 28 of the Immigration and Refugee Protection Act if that period is included in the five-year period referred to in that section. (3)"
    };
    //$http.get($scope.watsonRoute, {params: {q: question}}).
    //success(function(data, status, headers, config) {
    // console.log(data.question.answers);
    // angular.forEach(data.question.answers, function(value, i) {
    //   $scope.answerCards.push(new AnswerCard(value.id, value.text, value.confidence));
    // });
    //}).
    //error(function(data, status, headers, config) {
    // console.error(data);
    //});

    $scope.answerCards.push(new AnswerCard(value.id, value.text, value.confidence));
    $scope.answerCards.push(new AnswerCard(value.id, value.text, value.confidence));
    $scope.answerCards.push(new AnswerCard(value.id, value.text, value.confidence));
    $scope.answerCards.push(new AnswerCard(value.id, value.text, value.confidence));
    $scope.answerCards.push(new AnswerCard(value.id, value.text, value.confidence));


    $scope.$parent.hideSuggestions();
  }

  $scope.resetQA = function() {
    clearCards();
    $scope.$parent.showSuggestions();
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
