(function () {

    'use strict';

    angular.module('auctionApp')
        .controller('itemDetailsController', ['$scope', '$state', '$stateParams', '$timeout', '$log', 'auctionDataFactory',
            function ($scope, $state, $stateParams, $timeout, $log, auctionDataFactory) {

                $scope.proposePriceSpinnerModalMessage = "Загрузка";
                var imagesDirectory = '../images/items/';
                var ID = $stateParams.itemID || '587d27094db18e140c2e49a1';

                $scope.item = {
                    '_id': ID,
                    'sellerName': null,
                    'itemName': null,
                    'itemAge': null,
                    'itemStartPrice': null,
                    'itemImmediatePrice': null,
                    'startDate': null,
                    'endDate': null,
                    'itemDescription': null,
                    'itemImageFilename': null,
                    'itemSold': null,
                    'itemCurrentPrice': null,
                    'buyerName': null
                };
                var itemLoaded = {};
                auctionDataFactory.getItemByID(ID).get()
                    .$promise
                    .then(
                        function (response) {

                            for (var itemProperty in response)
                                if (response.hasOwnProperty(itemProperty))
                                    if ($scope.item.hasOwnProperty(itemProperty))
                                        itemLoaded[itemProperty] = response[itemProperty];

                            if (itemLoaded.hasOwnProperty('startDate')) {
                                var dateStart = new Date(itemLoaded.startDate);
                                itemLoaded.startDate = dateStart.toLocaleString().slice(0, 10); //no hours-minutes, date only
                            }
                            var dateEnd = new Date(itemLoaded.endDate);
                            itemLoaded.endDate = dateEnd.toLocaleString().slice(0, 10);

                            itemLoaded.itemImageFilename = imagesDirectory + itemLoaded.itemImageFilename;

                            if (!itemLoaded.hasOwnProperty('itemCurrentPrice'))
                                itemLoaded.itemCurrentPrice = itemLoaded.itemStartPrice;

                            for (itemProperty in itemLoaded)
                                $scope.item[itemProperty] = itemLoaded[itemProperty];
                        },

                        function (response) {
                            $log.info('Promise not resolved after item get by ID call, status = ' + response.status + ' ' + response.statusText);
                        }
                    );

                $scope.showHidePriceModal = function (flag) {
                    var modal = $('.div-propose-price');
                    !!flag ? modal.css('display', 'block') : modal.css('display', 'none');
                };

                $scope.submitProposition = function () {
                    $scope.item.itemCurrentPrice = parseInt($scope.proposedPrice, 10);
                    auctionDataFactory.updateItemByID($scope.item._id)
                        .updateItemRecord({itemCurrentPrice: $scope.item.itemCurrentPrice})
                        .$promise
                        .then(
                            function (response) {
                                $timeout(function () {
                                    $('.div-propose-price-spinner').css('display', 'block');
                                    $timeout(function () {
                                        $log.info('item id = ',response._id, ' updated successfully. new price: ', response.itemCurrentPrice);
                                        $scope.showHidePriceModal(0);
                                        $state.go($state.current, {}, {reload: true});
                                    }, 1000);
                                }, 0);
                            },

                            function (response) {
                                $log.info('Promise not resolved after item update call, status = ' + response.status + ' ' + response.statusText);
                            }
                        )
                    ;

                };
            }]);
})();