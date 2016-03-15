var navbar_directive = require("./navbar/navbar.directive");
var sidebar_directive = require("./sidebar/sidebar.directive");

var searchInput_directive = require("./search/searchInput.directive");

var gmap_directive = require("./gmap/gmap.directive");
var gmap_controller = require("./gmap/gmap.controller");

var signup_directive = require("./signup/signupForm.directive");
var signup_service = require("./signup/signup.service");

var postjob_directive = require("./postjob/postjobForm.directive");
var postjob_service = require("./postjob/postjob.service");

var messenger_service = require("./messenger.service");

var main_controller = require("./main.controller");

window.init = function() {
	var app = angular.module('githired', ['ngResource', 'ngAnimate']);

	app
		.service('messenger_service', [messenger_service])
		.service('signup_service', ['$resource', '$rootScope', signup_service])
	;

	app
		.directive('ghNavbar', [navbar_directive])
		.directive('ghSidebar', [sidebar_directive])
		.directive('ghGmap', [gmap_directive])
		.directive('ghSearch', [searchInput_directive])
		.directive('ghSignupForm', [signup_directive])
		.directive('ghPostJobForm', [postjob_directive])
	;

	app
		.controller('main_controller', ['$scope', 'messenger_service', main_controller])
		.controller('gmapController', ['$scope', gmap_controller])
	;

	angular.bootstrap(document, ['githired']);

	$(window).resize(function() {
		var h = $(window).height();

		$('#gmap').css('height', h);
	}).resize();

};