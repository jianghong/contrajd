//var init = function() {
//  showStaffPicks();
//
//  $(".contrajd-ask").click(function() {
//    var question = $(".contrajd-input-box").val();
//    askWatson(question); // <-- async
//  });
//
//  $(".contrajd-suggestion").unbind();
//  $(".contrajd-suggestion").click(function() {
//    var $this = this;
//    $(".contrajd-input-box").val($this.innerText);
//  });
//
//  $("#contrajd-picks, #contrajd-top").click(function(event) {
//    event.preventDefault();
//    var $this = $(this);
//
//    if($this.is("contrajd-current")) {
//      return;
//    } else {
//      if($this.attr("id") === "contrajd-picks") {
//        $this.addClass("contrajd-current");
//        $("#contrajd-top").removeClass("contrajd-current");
//
//        clearPicks();
//        showStaffPicks();
//      }
//      else if($this.attr("id") === "contrajd-top") {
//        $this.addClass("contrajd-current");
//        $("#contrajd-picks").removeClass("contrajd-current");
//
//        clearPicks();
//        showTopPicks();
//      }
//
//      $(".contrajd-suggestion").unbind();
//      $(".contrajd-suggestion").click(function() {
//        var $this = this;
//        $(".contrajd-input-box").val($this.innerText);
//      });
//    }
//  });
//};

// create the module and name it scotchApp
var qaApp = angular.module('qaApp', []);

// create the controller and inject Angular's $scope
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

  $scope.currentPick = "staffPicks";

  $scope.selectPick = function(pick) {
    $scope.currentPick = pick;
  }
});