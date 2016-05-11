var navbar_directive = require("./navbar/navbar.directive");
var sidebar_directive = require("./sidebar/sidebar.directive");
var searchInput_directive = require("./search/searchInput.directive");
var gmap_directive = require("./gmap/gmap.directive");
var signin_directive = require("./signin/signin.directive");
var signup_directive = require("./signup/signupForm.directive");
var postjob_directive = require("./postjob/postjobForm.directive");
var mySkills_directive = require("./skills/mySkills.directive");
var jobWindow_directive = require("./jobs/jobWindow.directive");

var user_factory = require("./user.factory");
var joblist_factory = require("./jobs/joblist.factory");
var mySkills_factory = require("./skills/mySkills.factory");
var job_factory = require("./postjob/job.factory");
var bid_factory = require('./bids/bid.factory');

var gmap_controller = require("./gmap/gmap.controller");

var postjob_service = require("./postjob/postjob.service");
var messenger_service = require("./messenger.service");
var trendySkills_service = require("./skills/trendySkills.service");


var main_controller = require("./main.controller");

window.init = function() {
    var app = angular.module('githired', ['ngResource', 'ngAnimate', 'ui.bootstrap']);

    app
        .factory('user_factory', ['$resource', '$rootScope', 'mySkills_factory', 'bid_factory', user_factory])
        .factory('joblist_factory', ['$resource', joblist_factory])
        .factory('mySkills_factory', ['$resource', mySkills_factory])
        .factory('job_factory', ['$resource', '$rootScope', job_factory])
        .factory('bid_factory', ['$resource', bid_factory])
        ;

    app
        .service('messenger_service', ['$rootScope', 'user_factory', 'joblist_factory', 
                'job_factory', messenger_service])
        .service('trendySkills_service', ['$resource', trendySkills_service])
        ;

    app
        .directive('ghNavbar', [navbar_directive])
        .directive('ghSidebar', [sidebar_directive])
        .directive('ghGmap', ["$compile", "messenger_service", gmap_directive])
        .directive('ghSearch', [searchInput_directive])
        .directive('ghSigninModal', [signin_directive])
        .directive('ghSignupForm', [signup_directive])
        .directive('ghPostJobForm', [postjob_directive])
        .directive('ghMySkills', [mySkills_directive])
        .directive('ghJobWindow', ['messenger_service', jobWindow_directive])
        ;

    app
        .controller('main_controller', ['$scope', 'messenger_service', main_controller])
        ;

    angular.bootstrap(document, ['githired']);

    $(window).resize(function() {
        var h = $(window).height();

        $('#gmap').css('height', h);
    }).resize();

};
