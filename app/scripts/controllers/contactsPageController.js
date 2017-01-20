(function () {

    'use strict';

    angular.module('auctionApp')
        .controller('contactsPageController', ['$scope', '$log', function ($scope, $log) {

            $scope.auctionLocation = '48.3844444444, 28.8625';
            $scope.googleMapsUrl='https://maps.googleapis.com/maps/api/js?key=AIzaSyCkBXkSFNaXGnC2b5vEXQUVx3nqJn60BRI';
            $scope.markerIcon = '../images/marker4googlemaps.png'; //'http://localhost:3000/marker4googlemaps.png';


            var IE_Flag = (navigator.appVersion.indexOf("MSIE") != -1) && (parseInt(navigator.appVersion.charAt(0)) <= 9);
            if (IE_Flag) {
                $log.info('switching to IE mode ...');
                $('.google-map-wrapper').css('display', 'none');
                $('.static-map-wrapper').css('display', 'inline-block');
            }

            $scope.toggleMarkerBounce = function() {
                var obj = this;
                if (obj.getAnimation() !== null) {
                    obj.setAnimation(null);
                } else {
                    obj.setAnimation(google.maps.Animation.BOUNCE);
                }
            };



        }]);
})();