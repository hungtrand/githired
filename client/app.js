var navbar_directive = require("./navbar/navbar.directive");
var sidebar_directive = require("./sidebar/sidebar.directive");

var searchBar_controller = require("./search/searchBar.controller");
var searchInput_directive = require("./search/searchInput.directive");

var gmap_directive = require("./gmap/gmap.directive");
var gmap_controller = require("./gmap/gmap.controller");

var messenger_service = require("./messenger.service");

var main_controller = require("./main.controller");

window.init = function() {
	var app = angular.module('githired', ['ngResource']);

	app
		.service('messenger_service', [messenger_service])

	app
		.directive('ghNavbar', [navbar_directive])
		.directive('ghSidbar', [sidebar_directive])
		.directive('ghGmap', [gmap_directive])
		.directive('ghSearch', [searchInput_directive]);

	app
		.controller('main_controller', ['$scope', main_controller])
		.controller('gmapController', ['$scope', gmap_controller])
		.controller('searchBarController', ['$scope', searchBar_controller]);

	angular.bootstrap(document, ['githired']);

	$(window).resize(function() {
		var h = $(window).height();

		$('#gmap').css('height', h);
	}).resize();

};