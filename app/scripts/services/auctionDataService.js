(function () {

    'use strict';

    angular.module('auctionApp')

        .constant('auctionDatabaseResourcePath', 'http://localhost:3000')

        .factory('auctionDataFactory', ['$resource', 'auctionDatabaseResourcePath',
            function ($resource, auctionDatabaseResourcePath) {
                return {

                    getAllAuctionItems: function () {
                        var filenameString = auctionDatabaseResourcePath + '/items/';
                        return $resource(filenameString);
                    },

                    putSingleItem: function () {
                        var filenameString = auctionDatabaseResourcePath + '/items/';
                        return $resource(filenameString, {}, {'createItemRecord': {method: 'POST'}});
                    },

                    getItemByID: function (IDString) {
                        var filenameString = auctionDatabaseResourcePath + '/items/' + IDString;
                        return $resource(filenameString);
                    },

                    updateItemByID: function (IDString) {
                        var filenameString = auctionDatabaseResourcePath + '/items/' + IDString;
                        return $resource(filenameString, {}, {'updateItemRecord': {method: 'PUT'}});
                    },

                    getImageFilesList: function () {
                        var filenameString = auctionDatabaseResourcePath + '/imagefilenames/';
                        return $resource(filenameString);
                    }

                };

            }]);
})();