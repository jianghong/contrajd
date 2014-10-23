stepsApp.controller('WalkthroughController', ['$scope', '$location', '$anchorScroll',
function($scope, $location, $anchorScroll) {

  var templateRoute = 'partials/additional_family_info/'

  $scope.templates = [
    {
      url: '1.html'
    },
    {
      url: '2.html'
    },
    {
      url: '3.html'
    },
    {
      url: '4.html'
    },
    {
      url: '5.html'
    }        
  ];
  $scope.currentAddressSameasBorn = false;

  $scope.getFullTemplateUrl = function(template) {
    return templateRoute + template.url;
  }

  $scope.changePage = function(direction) {
    if (direction === 'left') {
      $scope.currentPage -= 1;
    } else {
      $scope.currentPage += 1;
    }
    setCurrTemplate();
    setBackandNextVisiblity();
    backToTop();    
  }

  $scope.goToUploadTab = function() {
    $('a[href=#upload-panel]').click();
  }

  var backToTop = function() {
    $location.hash('top');
    $anchorScroll();    
  }
  var setCurrTemplate = function() {
    console.log($scope.getFullTemplateUrl($scope.templates[$scope.currentPage]));
    $scope.templateUrl = $scope.getFullTemplateUrl($scope.templates[$scope.currentPage]);
  } 

  var setBackandNextVisiblity = function() {
    $scope.hasBack = $scope.currentPage !== 0;
    $scope.hasNext = $scope.currentPage !== $scope.maxPages - 1;
  }

  $scope.maxPages = $scope.templates.length;
  $scope.currentPage = 0;
  setCurrTemplate();
  setBackandNextVisiblity();
}]);