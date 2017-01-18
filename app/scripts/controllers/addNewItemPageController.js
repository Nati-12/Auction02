(function () {

    'use strict';

    angular.module('auctionApp')

        .controller('addNewItemPageController', ['$scope', '$state', '$timeout', '$log', 'auctionDataFactory',
            function ($scope, $state, $timeout, $log, auctionDataFactory) {
                $scope.message = "Загружаем слона ...";

                $scope.item = {};
                var time2ShowSpinner = 1500; //milliseconds

                $scope.submitNewItem = function () {
                    $log.info('New item submitted! :: ', $scope.item);
                    //document.querySelector('#filenameShowHere').style.display = 'none';
                    //document.querySelector('.add-new-item-form').reset();

                    $timeout(function () {
                        disableAllFormInputs('.add-new-item-form');
                        document.querySelector('.spinner').style.display = 'block';
                    }, 0);

                    auctionDataFactory.putSingleItem().createItemRecord($scope.item)
                        .$promise
                        .then(
                        function (response) {
                            var itemID = Object.values(response.toJSON()).join('');
                            $timeout(function () {
                                $timeout(function () {
                                    document.querySelector('.spinner').style.display = 'none';
                                    $log.info('item created successfully, item ID = ', itemID);
                                    $scope.message = 'Слон загружен! Код доступа: ' + itemID;
                                    $scope.buttonText = 'Смотреть';
                                    document.querySelector('.nospinner').style.display = 'block';
                                }, time2ShowSpinner);
                                $('.nospinner button').on('click', function () {
                                    $state.go('app.itemdetails', {'itemID': itemID});
                                });
                            }, 0);
                        },

                        function (response) {
                            $log.info('Promise not resolved after item create call, status = ' + response.status + ' ' + response.statusText);
                            $timeout(function () {
                                document.querySelector('.spinner').style.display = 'none';
                                $scope.message = 'Ошибка загрузки: ' + response.status;
                                $scope.buttonText = 'Повторить ввод';
                                document.querySelector('.nospinner').style.display = 'block';
                                $('.nospinner button').on('click', function () {
                                    $state.go($state.current, {}, {reload: true});
                                });
                            }, 0);
                        }
                    );

                };

                var fileInput = $('#addNewItemForm_FileInput');
                fileInput.on('change', function () {
                    var filename = this.value;
                    var slash = filename.lastIndexOf('\\');
                    filename = filename.slice(slash + 1);
                    $timeout(function () {
                        $scope.item.itemImageFilename = filename;
                        var showFileName;
                        !!filename.length ? showFileName = 'block' : showFileName = 'none';
                        $('#filenameShowHere').css('display', showFileName);
                    }, 0);

                });

                function disableAllFormInputs(formSelectorString) {
                    var form = document.querySelector(formSelectorString),
                        elements = form.elements;
                    for (var iloop = 0; iloop < elements.length; ++iloop) {
                        elements[iloop].disabled = true;
                    }
                }

            }]);
})();