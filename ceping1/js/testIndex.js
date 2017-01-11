var app = angular.module('myApp', ['ui.router'])
    .constant("API",'http://evaluation.pu.lo/')
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('all', {
                url: "/all/?typeId",
                views: {
                    'tab': {
                        templateUrl: "templates/index.html",
                        controller:'indexController'
                    }
                }
            })
            
            .state('mentality', {
                url: "/mentality",
                views: {
                    'tab': {
                        templateUrl: "templates/mentality.html"
                    }
                }
            })        
            .state('zhiye', {
                url: "/zhiye",
                views: {
                    'tab': {
                        templateUrl: "templates/zhiye.html"
                    }
                }
            });
        $urlRouterProvider.otherwise("/all");

    }]);;
