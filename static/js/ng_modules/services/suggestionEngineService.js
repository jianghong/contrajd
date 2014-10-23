qaApp.factory('suggestionEngineService', function(){
  return {
    getSuggestions: function() {
      var suggestions = {
        "staffPicks": [
          "What is cohabiting?",
          "What is a conjugal relationship?",
          "What is a common law partner?",
          "What is a dependent?",
          "Can I apply for a work permit until sponsorship is finalized?"
        ],
        "topPicks": [
          "How do I get a start-up visa?",
          "How do I qualify for sponsorship?",
          "If I live in Quebec, where do I send my application?",
          "What is the processing time for sponsorship application?",
          "What is Canada's objectives with respect to immigration?"
        ]
      };

      return suggestions;
    }
  }
});