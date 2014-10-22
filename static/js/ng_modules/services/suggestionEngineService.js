qaApp.factory('suggestionEngineService', function(){
  return {
    getSuggestions: function() {
      var suggestions = {
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

      return suggestions;
    }
  }
});