(function () {

    'use strict';

    angular.module('auctionApp')
        .controller('selectionPageController', ['$scope', '$timeout', '$log', '$state', 'auctionDataFactory',
            function ($scope, $timeout, $log, $state, auctionDataFactory) {

                var imagesDirectory = '../images/items/';
                $scope.allItems = [];
                $scope.itemNumbersArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
                $scope.iNumItems = 0;

                $scope.currentPage = 1;
                $scope.iNumItemsPerPage = 10; // default: 10 items per page
                $scope.pageNamesArray = [];

                function fillItemsArray() {
                    var deferred = $.Deferred();
                    auctionDataFactory.getAllAuctionItems().query().$promise
                        .then(
                            function (response) {
                                $scope.iNumItems = response.length;
                                $scope.pageNamesArray = recalculatePagesNumbers($scope.iNumItems, $scope.iNumItemsPerPage);
                                $log.info('loading items... done');
                                for (var itemsIterator in response)
                                    if (response.hasOwnProperty(itemsIterator) && !isNaN(parseInt(itemsIterator))) { // only number-labeled properties
                                        pushSingleItem(response[itemsIterator]);
                                    }
                            },
                            function (response) {
                                $log.info('Promise not resolved after item getall items call, status = ' + response.status);
                            }
                        );
                    deferred.resolve();
                    return deferred.promise();
                }

                function generateSingleItem(item) {
                    var deferredPromise = $.Deferred();

                    var item2push = {
                        '_id': null,
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

                    for (var propertyIterator in item) {
                        if (item.hasOwnProperty(propertyIterator)) {
                            if (item2push.hasOwnProperty(propertyIterator))
                                item2push[propertyIterator] = item[propertyIterator];
                        }
                    }
                    item2push.itemImageFilename = imagesDirectory + item2push.itemImageFilename;
                    deferredPromise.resolve(item2push);
                    return deferredPromise.promise();
                }
                function pushSingleItem(item) {
                    var promise = generateSingleItem(item);
                    promise.then(function (itemGenerated) {
                        $timeout(function () { // $scope changed, restart digest!!
                            $scope.allItems.push(itemGenerated);
                        }, 0);
                    });
                }
                $scope.loadFirstPortion = function () {
                    var promise = fillItemsArray();
                    promise.then(function () {
                        $timeout(function () {
                            $scope.generatePageItemNumbers(1); // arg '1' means "first page"
                        }, 0);
                    });
                };
                $scope.loadNextPortion = function () {
                    $timeout(function () {
                        $scope.itemNumbersArray = getRandomChunk(0, $scope.iNumItems - 1, $scope.iNumItemsPerPage);
                    }, 0);
                };
                function getRandomChunk(min, max, count) {
                    var tempArr = [];
                    while (tempArr.length < count) {
                        var currNumber = Math.floor(Math.random() * (max - min + 1) + min);
                        if (tempArr.indexOf(currNumber) < 0) tempArr.push(currNumber);
                    }
                    return tempArr;
                }
                $scope.navigate2Item = function (itemID) {
                    $state.go('app.itemdetails', {'itemID': itemID});
                };
                $scope.generatePageItemNumbers = function(iPageNumber){
                    //console.log('loadPageData triggered, iPageNiumber==', iPageNumber);
                    $scope.currentPage = iPageNumber;
                    var iStartItem = (iPageNumber-1)*$scope.iNumItemsPerPage;
                    $scope.itemNumbersArray = [];
                    for (var iloop=0; iloop<$scope.iNumItemsPerPage; iloop++) {
                        if (iloop + iStartItem >= $scope.iNumItems) break;
                        $scope.itemNumbersArray[iloop] = iloop + iStartItem;
                    }
                };
                function recalculatePagesNumbers(num, numperpage){
                    var result = [];
                    var iNumPages = parseInt(num/numperpage, 10);
                    if (num % numperpage) iNumPages++;
                    for (var iloop=1; iloop<=iNumPages; iloop++){
                        result.push(iloop);
                    }
                    return result;
                }
                $scope.updatePagesNumbers = function(){
                    $scope.pageNamesArray = recalculatePagesNumbers($scope.iNumItems, $scope.iNumItemsPerPage);
                    $scope.currentPage = 1; // return to first page
                    $scope.generatePageItemNumbers($scope.currentPage); //and replot there new amount of items

                };
                $scope.markCurrentPage = function(page){
                    var style = {};
                    if (page == $scope.currentPage) style = {'font-weight': 'bold', 'background-color': '#e7e7e7'};
                    return style;
                };



                $scope.loadFirstPortion(); // start it, hallelujah!



            }]);
})();