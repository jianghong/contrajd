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

var clearPicks = function() {
  $("#contrajd-suggestions").empty();
};

var showStaffPicks = function() {
  var $suggestions = $("#contrajd-suggestions");

  for(var i = 0; i < suggestions.staffPicks.length; i++) {
    $suggestions.append("<h5><a class='contrajd-suggestion' href='javascript:void(0);'>" + suggestions.staffPicks[i] + "</a></h5>");
  }
};

var showTopPicks = function() {
  var $suggestions = $("#contrajd-suggestions");

  for(var j = 0; j < suggestions.topPicks.length; j++) {
    $suggestions.append("<h5><a class='contrajd-suggestion' href='javascript:void(0);'>" + suggestions.topPicks[j] + "</a></h5>");
  }
};

var askWatson = function() {

};