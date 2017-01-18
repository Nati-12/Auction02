(function () {

    'use strict';

    angular.module('auctionApp')
        .controller('headerController', ['$scope', function ($scope) {
            $scope.message = "Loading ...";

            makeCarousel('slider', 'img4Slider', 3000, 0.05);

        }]);
})();