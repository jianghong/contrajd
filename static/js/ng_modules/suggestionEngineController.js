qaApp.controller('SuggestionEngineController', ['$scope', 'suggestionEngineService',function($scope, suggestionEngineService) {
  $scope.suggestions = suggestionEngineService.getSuggestions();

  $scope.currentSuggestions = $scope.suggestions.staffPicks;
  $scope.currentPick = "staffPicks";
  $scope.$parent.pickedSuggestion = "";

  $scope.selectPick = function(pick) {
    $scope.currentPick = pick;
    $scope.currentSuggestions = $scope.suggestions[pick];
  };

  $scope.updateInput = function(suggestion) {
    $scope.$parent.pickedSuggestion = suggestion;
  };
}]);