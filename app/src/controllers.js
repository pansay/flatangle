var ngComponents = ngComponents || {};

ngComponents.listController = function (postsList) {

	var vm = this;
    vm.list = postsList;
    
};

ngComponents.detailsController = function (postDetails) {

    var vm = this;
    vm.details = postDetails;

};