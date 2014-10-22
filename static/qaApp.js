var qaApp = angular.module('qaApp', ['answerCard']);
qaApp.controller('mainController', function($scope) {
  $scope.pickedSuggestion = "";
  $scope.isShowingSuggestion = true;

  $scope.hideSuggestions = function() {
    $scope.isShowingSuggestion = false;
  };

  $scope.showSuggestions = function() {
    $scope.isShowingSuggestion = true;
  };
});

