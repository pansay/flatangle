var ngComponents = ngComponents || {};

ngComponents.mainController = function ($scope, texts) {
    $scope.texts = texts;
    $scope.title = texts.title;

};