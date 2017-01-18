(function () {

    'use strict';

    angular.module('auctionApp')
        .controller('footerController', ['$scope', function ($scope) {
            $scope.message = "Loading ...";

            $scope.annihilateFooter = function(){
                var footer = document.querySelector('.footer');
                footer.style.display = 'none';
                var contentContainer = document.querySelector('.content-container');
                contentContainer.style.bottom = '0px';
            };


        }]);
})();