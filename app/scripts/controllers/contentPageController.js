(function () {

    'use strict';

    angular.module('auctionApp')
        .controller('contentPageController', ['$scope', '$state', '$timeout', '$interval', '$log', 'auctionDataFactory',
            function ($scope, $state, $timeout, $interval, $log, auctionDataFactory) {

                $scope.dismissNewsDiv = function (event) {
                    // div item-container                     2nd parentNode
                    //                div dismiss-news        1st parentNode
                    //                        button ng-click='dismissNewsDiv($event)'
                    event.target.parentNode.parentNode.style.display = 'none';
                };
                $scope.showSiski = function () {
                    document.querySelector('.siski img').style.display = 'block';
                    document.querySelector('#siski-buttons').style.display = 'none';
                    document.querySelector('.siski p').style.display = 'none';
                    $timeout(function () {
                        document.querySelector('.siski').style.display = 'none';
                        $state.go($state.current, {}, {reload: true});
                    }, 1500);
                };

                var intervalPromise;
                (function checkNewsEmpty() {
                    intervalPromise = $interval(function () {
                        var allNews = document.querySelectorAll('.item-container');
                        var iNumNews = allNews.length;
                        for (var iloop = 0; iloop < iNumNews; iloop++) {
                            if (allNews[iloop].style.display != 'none') return;
                        }
                        document.querySelector('.siski + h1').style.display = 'none';
                        document.querySelector('.siski').style.display = 'block';
                        $interval.cancel(intervalPromise);
                    }, 3000);
                    $scope.$on('$destroy', function () {
                        $interval.cancel(intervalPromise);
                    });

                })();

                (function fillItemsDatabase(doIt) {
                    if (!doIt) return;

                    var namesArr1 = ['Василий Пупкин', 'Рабиндранат Тагор', 'Charley Root', 'John Dow', 'Dow Jones',
                            'Jogesh Muppala', 'Сидоров Кассир', 'Кассир Сидоров', 'Керниган Пайк Ричи', 'Луи Армстронг', 'Александр Сергеич',
                            'Василий Иванович', 'Королева Виктория', 'Джек Воробей', 'Захар', 'Тимур', 'Артур', 'Гайдар'],
                        namesArr2 = ['Сидор Иванович', 'Васька', 'Шарик', 'Луис', 'Шуня', 'Йоганн Четырнадцатый', 'Модэст', 'Вассерман',
                            'Мишлен', 'Цветочек', 'Пестик', 'Тычинка', 'Сухой как Лист', 'Шуберт', 'Бетховен', 'Ркацители',
                            'Шкаф', 'Диван', 'Иван Г', 'Телехобот', 'Пузо Николаевич', 'Халат', 'Мармелад', 'Шоколад', 'Лимонад', 'Буженина',
                            'Василий Табуретов', 'Хобот Петрович', 'Калбаса', 'Тучка', 'Медвед', 'Блоховоз', 'Великолепный Х'],
                        agesArr = ['Совсем новый', 'Староват', 'Красивый', 'Блестящий', 'Совсем как настоящий'],
                        descriptionBase = ' <br> <br> Характерным органом слона является хобот, образованный из носа и верхней губы. Расположенные на конце хобота ноздри служат органом обоняния; хобот служит органом хватания, позволяя слону подбирать мелкие предметы с земли и срывать плоды с высоко расположенных веток; при питье слон набирает воду в хобот, а затем выливает в рот. В центре стопы слона есть жировая подушка, которая каждый раз, когда слон опускает ногу, «расплющивается», увеличивая площадь опоры. У слонов либо 2 бивня в верхней челюсти, либо нет бивней вообще. Чтобы защититься от паразитов, слоны нередко обливаются грязью. Засохшая грязевая корочка служит хорошей защитой от насекомых.',
                        descriptionsArr = ['Дивное жывотное, кушает всё, трубит негромко. Не продавал бы, но хочю купить мопэд.',
                            'Элефант старый тёртый, был в разных переделках. Борозды не портил. К звукам флейты равнодушен. Рыбий жир не пробовал.',
                            'Вредный слон, продам недорого. Звонить вечером, спросить Ашота с раёна.',
                            'Не бит не крашен полный фарш кожа рожа брызговики спарцо бабушка по выходным ездила в синагогу.',
                            'Купила этого слоника совсем маленьким, думала так и останется карманным малюткой. А он вырос и не помещается в ванну! Продам срачно!!111',
                            'Портит борозду, характер скверный, ненавидит рыбий жир, мечтает реализовать себя в сексе. Смотрит на меня странно. Опасаюсь. Продам незамедлительно.',
                            'Слон импортный, без пробега. Оснащён защитой от четырёхсот дятлов, склеенных в ряд. Новый компактный мини-слон. Уникальное предложение. Звоните. Торг у хобота.'];

                    var iNumItems2Generate = 35, allItems = [], allFilenamesArr, iNumGenerated = 0;

                    auctionDataFactory.getImageFilesList().get().$promise.then(
                            function (response) {
                                allFilenamesArr = Object.values(response);
                                allFilenamesArr = allFilenamesArr.slice(0, allFilenamesArr.length-2);
                                for (iNumGenerated=0; iNumGenerated<iNumItems2Generate; iNumGenerated++) {
                                    pushSingleItem();
                                }
                            },
                            function (response) {
                                $log.info('Promise not resolved after item get by ID call, status = ' + response.status + ' ' + response.statusText);
                            }
                        );

                    function generateSingleItem() {
                        var deferred = $.Deferred();

                        var item = {
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
                        console.log('Generating item number ', iNumGenerated, '...');
                        item.itemImageFilename = allFilenamesArr[Object.keys(allFilenamesArr)[Math.floor(Math.random()
                            * Object.keys(allFilenamesArr).length)]]; // this picks random value from an object 'response',
                        // details at http://stackoverflow.com/questions/2532218/pick-random-property-from-a-javascript-object

                        item.sellerName = getRandomElementFromArray(namesArr1);
                        item.itemName = getRandomElementFromArray(namesArr2);
                        item.itemAge = getRandomElementFromArray(agesArr);
                        item.itemStartPrice = getRandomIntInclusive(10, 1000);
                        item.itemImmediatePrice = getRandomIntInclusive(item.itemStartPrice + 1, 9999);
                        item.startDate = randomDate(new Date(2017, 0, 1), new Date());
                        item.endDate = randomDate(new Date(), new Date(2018, 0, 1));
                        item.itemDescription = getRandomElementFromArray(descriptionsArr) + descriptionBase;
                        item.itemCurrentPrice = parseInt(item.itemStartPrice * 1.1, 10);

                        deferred.resolve(item);

                        return deferred.promise();
                    }

                    function pushSingleItem() {
                        var promise = generateSingleItem();
                        promise.then(function (item ) {

                            auctionDataFactory.putSingleItem().createItemRecord(item).$promise.then(
                                function (resp) {
                                    $log.info('item pushed successfully!', item);
                                },
                                function (resp) {
                                    $log.info('Promise not resolved when posting item to database, status = ' + resp.status);
                                });
                        });
                    }

                    function getRandomElementFromArray(array) {
                        return array[Math.floor(Math.random() * array.length)];
                    }

                    function getRandomIntInclusive(min, max) {
                        min = Math.ceil(min);
                        max = Math.floor(max);
                        return Math.floor(Math.random() * (max - min + 1)) + min;
                    }

                    function randomDate(start, end) {
                        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
                    }

                })(false);

            }]);
})();