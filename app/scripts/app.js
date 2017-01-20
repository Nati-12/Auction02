(function () {
    'use strict';
    angular.module('auctionApp', ['ui.router','ngResource', 'ngSanitize', 'ngMap'])
        .config(function($stateProvider, $urlRouterProvider) {
            $stateProvider
            // route for the home page
                .state('app', {
                    url:'/',
                    views: {
                        'header': {
                            templateUrl : 'views/header.html',
                            controller : 'headerController'
                        },
                        'sidemenu': {
                            templateUrl : 'views/sidemenu.html',
                            controller  : 'sideMenuController'
                        },

                        'content': {
                            templateUrl : 'views/content.html',
                            controller  : 'contentPageController'
                        },
                        'footer': {
                            templateUrl : 'views/footer.html',
                            controller  : 'footerController'
                        }
                    }
                })
                // route for the items selection page
                .state('app.selection', {
                    url:'selection',
                    views: {
                        'content@': {
                            templateUrl : 'views/selection.html',
                            controller  : 'selectionPageController'
                        }
                    }
                })
                // route for contacts page
                .state('app.contacts', {
                    url:'contacts',
                    views: {
                        'content@': {
                            templateUrl : 'views/contacts.html',
                            controller  : 'contactsPageController'
                        }
                    }
                })
                // route for the add new item page
                .state('app.addnewitem', {
                    url:'addnewitem',
                    views: {
                        'content@': {
                            templateUrl : 'views/addnewitem.html',
                            controller  : 'addNewItemPageController'
                        }
                    }
                })
                // route for the item's detail page
                .state('app.itemdetails', {
                    url: 'item/:id',
                    params : {itemID: null},
                    views: {
                        'content@': {
                            templateUrl : 'views/itemdetails.html',
                            controller  : 'itemDetailsController'
                        }
                    }
                });
            $urlRouterProvider.otherwise('/');
        });
})();
