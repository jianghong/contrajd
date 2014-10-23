qaApp.factory('suggestionEngineService', function(){
  return {
    getSuggestions: function() {
      var suggestions = {
        "staffPicks": [
          "What is cohabiting?",
          "What is a conjugal relationship?",
          "Can I apply for a work a work permit until sponsorship is finalized?",
          "What is a common law partner?",
          "What is a dependent?"
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