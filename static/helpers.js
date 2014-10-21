var suggestions = {
  "staffPicks": [
    "How do I get a study permit in Canada?",
    "How do I get a study permit in Canada?",
    "How do I get a study permit in Canada?",
    "How do I get a study permit in Canada?",
    "How do I get a study permit in Canada?"
  ],
  "topPicks": [
    "How do I get a work permit in Canada?",
    "How do I get a work permit in Canada?",
    "How do I get a work permit in Canada?",
    "How do I get a work permit in Canada?",
    "How do I get a work permit in Canada?"
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