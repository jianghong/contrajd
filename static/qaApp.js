var qaApp = angular.module('qaApp', []);
qaApp.controller('mainController', function($scope) {

    $scope.suggestions = {
      "staffPicks": [
        "Staff Picks: Suggestion 1",
        "Staff Picks: Suggestion 2",
        "Staff Picks: Suggestion 3",
        "Staff Picks: Suggestion 4",
        "Staff Picks: Suggestion 5"
      ],
      "topPicks": [
        "Top Picks: Suggestion 1",
        "Top Picks: Suggestion 2",
        "Top Picks: Suggestion 3",
        "Top Picks: Suggestion 4",
        "Top Picks: Suggestion 5"
      ]
    };

  $scope.currentSuggestions = $scope.suggestions.staffPicks;
  $scope.currentPick = "staffPicks";
  $scope.pickedSuggestion = "";

  $scope.selectPick = function(pick) {
    $scope.currentPick = pick;
    $scope.currentSuggestions = $scope.suggestions[pick];
  };

  $scope.updateInput = function(suggestion) {
    $scope.pickedSuggestion = suggestion;
  };
});