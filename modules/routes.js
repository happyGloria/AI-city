/**
 * routes.js
 */
define(['app', 'angularAMD'], function (app, angularAMD) {
    //静态路由设置，控制整个APP的跳转
    return app.config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('index', {
                url: '/index',
                views: {
                    '': {
                        templateUrl: 'template/html/index.html'
                    },
                    'topbar@index': angularAMD.route({
                        templateUrl: 'template/html/modules/navigation.html',
                        controllerUrl: 'controllers/common/navigationCtrl'
                    })
                },
                resolve: {}
            })
            .state('index.login', {
                url: '/login/',
                views: {
                    'topbar@index': {},
                    'main@index': angularAMD.route({
                        templateUrl: 'template/html/modules/login.html?v=',
                        controllerUrl: 'controllers/login/loginCtrl'
                    })
                },
                resolve: {}
            })
            .state('index.home', {
                url: '/home/',
                views: {
                    'main@index': angularAMD.route({
                        templateUrl: 'template/html/modules/home.html?v=',
                        controllerUrl: 'controllers/home/homeCtrl'
                    })
                },
                resolve: {}
            })
            .state('index.faceTrack', {
                url: '/trackShow/faceTrack/',
                views: {
                    'topbar@index': {},
                    'main@index': angularAMD.route({
                        templateUrl: 'template/html/modules/trackShow/faceTrack.html',
                        controllerUrl: 'controllers/trackShow/faceTrackCtrl'
                    })
                },
                resolve: {}
            })
            .state('index.carTrack', {
                url: '/trackShow/carTrack/',
                views: {
                    'main@index': angularAMD.route({
                        templateUrl: 'template/html/modules/trackShow/carTrack.html',
                        controllerUrl: 'controllers/trackShow/carTrackCtrl'
                    })
                },
                resolve: {}
            })

            .state('index.macTrack', {
                url: '/trackShow/macTrack/',
                views: {
                    'main@index': angularAMD.route({
                        templateUrl: 'template/html/modules/trackShow/macTrack.html',
                        controllerUrl: 'controllers/trackShow/macTrackCtrl'
                    })
                },
                resolve: {}
            })
            .state('index.community', {
                url: '/community/2/',
                views: {
                    'topbar@index': {},
                    'main@index': angularAMD.route({
                        templateUrl: 'template/html/modules/community/community.html',
                        controllerUrl: 'controllers/community/communityCtrl'
                    })
                },
                resolve: {}
            })
            .state('index.doorrecord', {
                url: '/doorrecord/:villageCode',
                views: {
                    'topbar@index': {},
                    'main@index': angularAMD.route({
                        templateUrl: 'template/html/modules/more/doorRecord.html',
                        controllerUrl: 'controllers/more/doorRecord'
                    })
                },
                resolve: {}
            })
            .state('index.communityAllNew', {
                url: '/communityAllNew/',
                views: {
                    'topbar@index': {},
                    'main@index': angularAMD.route({
                        templateUrl: 'template/html/modules/community/communityAllNew.html',
                        controllerUrl: 'controllers/community/communityAllNewCtrl'
                    })
                },
                resolve: {}
            })
            //----------------以下为陈皓用于测试
            .state('index.communityChen', {
                url: '/communityChen/',
                views: {
                    'topbar@index': angularAMD.route({
                        templateUrl: 'template/html/topbar.html',
                        controllerUrl: 'controllers/common/topbar'
                    }),
                    'main@index': angularAMD.route({
                        templateUrl: 'template/html/modules/community/communityChen.html',
                        controllerUrl: 'controllers/community/communityChenCtrl'
                    })
                },
                resolve: {}
            })
            //----------------以上为陈皓用于测试
            .state('index.communityPanel', {
                url: '/communityPanel/',
                views: {
                    'topbar@index': {},
                    'main@index': angularAMD.route({
                        templateUrl: 'template/html/modules/community/communityPanel.html',
                        controllerUrl: 'controllers/community/communityPanelCtrl'
                    })
                },
                resolve: {}
            })
            .state('index.2dmap', {
                url: '/2dmap/',
                views: {
                    'topbar@index': {},
                    'main@index': angularAMD.route({
                        templateUrl: 'template/html/modules/community/2dMap.html',
                        controllerUrl: 'controllers/community/2dMapCtrl'
                    })
                },
                resolve: {}
            })
            .state('index.communityAll', {
                url: '/community/:id',
                views: {
                    'topbar@index': {},
                    'main@index': angularAMD.route({
                        templateUrl: 'template/html/modules/community/community2d.html',
                        controllerUrl: 'controllers/community/community2dCtrl'
                    })
                },
                resolve: {}
            })
            .state('index.smoke', {
                url: '/smoke/:villageCode',
                views: {
                    'topbar@index': {},
                    'main@index': angularAMD.route({
                        templateUrl: 'template/html/modules/more/smokeMachine.html',
                        controllerUrl: 'controllers/more/smokeMachine'
                    })
                },
                resolve: {}
            })
            .state('index.ck', {
                url: '/ck/:villageCode',
                views: {
                    'topbar@index': {},
                    'main@index': angularAMD.route({
                        templateUrl: 'template/html/modules/more/ckList.html',
                        controllerUrl: 'controllers/more/ckList'
                    })
                },
                resolve: {}
            })
            .state('index.communityCar', {
                url: '/communityCar/:villageCode',
                views: {
                    'topbar@index': {},
                    'main@index': angularAMD.route({
                        templateUrl: 'template/html/modules/more/communityCar.html',
                        controllerUrl: 'controllers/more/communityCar'
                    })
                },
                resolve: {}
            })
            .state('index.communityNonMotor', {
                url: '/communityNonMotor/:villageCode',
                views: {
                    'topbar@index': {},
                    'main@index': angularAMD.route({
                        templateUrl: 'template/html/modules/more/communityNonMotor.html',
                        controllerUrl: 'controllers/more/communityNonMotor'
                    })
                },
                resolve: {}
            })
            .state('index.communityMac', {
                url: '/communityMac/:villageCode',
                views: {
                    'topbar@index': {},
                    'main@index': angularAMD.route({
                        templateUrl: 'template/html/modules/more/communityMac.html',
                        controllerUrl: 'controllers/more/communityMac'
                    })
                },
                resolve: {}
            })
            .state('index.camera', {
                url: '/camera/:villageCode',
                views: {
                    'topbar@index': {},
                    'main@index': angularAMD.route({
                        templateUrl: 'template/html/modules/more/camera.html',
                        controllerUrl: 'controllers/more/camera'
                    })
                },
                resolve: {}
            })
            .state('index.faceCameralist', {
                url: '/faceCameralist/:villageCode',
                views: {
                    'topbar@index': {},
                    'main@index': angularAMD.route({
                        templateUrl: 'template/html/modules/more/faceCameralist.html',
                        controllerUrl: 'controllers/more/faceCameralist'
                    })
                },
                resolve: {}
            })
            .state('index.factpeople', {
                url: '/factpeople/:villageCode',
                views: {
                    'topbar@index': {},
                    'main@index': angularAMD.route({
                        templateUrl: 'template/html/modules/more/factpeople.html',
                        controllerUrl: 'controllers/more/factpeople'
                    })
                },
                resolve: {}
            })
            .state('index.peoplefile', {
                url: '/peoplefile/:id/:villageCode',
                views: {
                    'topbar@index': {},
                    'main@index': angularAMD.route({
                        templateUrl: 'template/html/modules/more/peopleFile.html',
                        controllerUrl: 'controllers/more/peopleFile'
                    })
                },
                resolve: {}
            })
            .state('index.factPeopleChart', {
                url: '/factPeopleChart/:villageCode',
                views: {
                    'topbar@index': {},
                    'main@index': angularAMD.route({
                        templateUrl: 'template/html/modules/more/factPeopleChart.html',
                        controllerUrl: 'controllers/more/peopleChartCtrl'
                    })
                },
                resolve: {}
            })
            .state('index.waterElectricChart', {
                url: '/waterElectricChart/:villageCode',
                views: {
                    'topbar@index': {},
                    'main@index': angularAMD.route({
                        templateUrl: 'template/html/modules/more/waterElectricChart.html',
                        controllerUrl: 'controllers/more/waterElectricChart'
                    })
                },
                resolve: {}
            })
            .state('index.communityPower', {
                url: '/communityPower/',
                views: {
                    'topbar@index': {},
                    'main@index': angularAMD.route({
                        templateUrl: 'template/html/modules/more/communityPower.html',
                        controllerUrl: 'controllers/more/communityPowerCtrl'
                    })
                },
                resolve: {}
            })
            .state('index.warningList', {
                url: '/warningList/',
                views: {
                    'topbar@index': {},
                    'main@index': angularAMD.route({
                        templateUrl: 'template/html/modules/more/warningList.html',
                        controllerUrl: 'controllers/more/warningList'
                    })
                },
                resolve: {}
            })
            .state('index.factCompany', {
                url: '/factCompany/:villageCode',
                views: {
                    'topbar@index': {},
                    'main@index': angularAMD.route({
                        templateUrl: 'template/html/modules/more/factCompany.html',
                        controllerUrl: 'controllers/more/factCompany'
                    })
                },
                resolve: {}
            })
            .state('index.peopleDetail', {
                url: '/peopleDetail/:villageCode',
                views: {
                    'topbar@index': {},
                    'main@index': angularAMD.route({
                        templateUrl: 'template/html/modules/more/peopleDetail.html',
                        controllerUrl: 'controllers/more/peopleDetail'
                    })
                },
                resolve: {}
            })
            .state('index.securityPower', {
                url: '/securityPower/:type/:villageCode',
                views: {
                    'topbar@index': {},
                    'main@index': angularAMD.route({
                        templateUrl: 'template/html/modules/more/securityPower.html',
                        controllerUrl: 'controllers/more/securityPowerCtrl'
                    })
                },
                resolve: {}
            })
            .state('index.clickBuilding', {
                url: '/clickBuilding/:villageCode',
                views: {
                    'topbar@index': {},
                    'main@index': angularAMD.route({
                        templateUrl: 'template/html/modules/community/clickBuilding.html',
                        controllerUrl: 'controllers/community/clickBuildingCtrl'
                    })
                },
                resolve: {}
            })
            .state('index.clickResident', {
                url: '/clickResident/:villageCode',
                views: {
                    'topbar@index': {},
                    'main@index': angularAMD.route({
                        templateUrl: 'template/html/modules/community/clickResident.html',
                        controllerUrl: 'controllers/community/clickResidentCtrl'
                    })
                },
                resolve: {}
            })
            .state('index.communityNew', {
                url: '/communityNew/:id',
                views: {
                    'topbar@index': {},
                    'main@index': angularAMD.route({
                        templateUrl: 'template/html/modules/community/communityNew.html',
                        controllerUrl: 'controllers/community/communityNewCtrl'
                    })
                },
                resolve: {}
            })
            .state('index.factPower', {
                url: '/factPower/:villageCode',
                views: {
                    'topbar@index': {},
                    'main@index': angularAMD.route({
                        templateUrl: 'template/html/modules/more/factPower.html',
                        controllerUrl: 'controllers/more/factPower'
                    })
                },
                resolve: {}
            })
            .state('index.carStatus', {
                url: '/carStatus/',
                views: {
                    'topbar@index': {},
                    'main@index': angularAMD.route({
                        templateUrl: 'template/html/modules/more/carStatus.html',
                        controllerUrl: 'controllers/more/carStatus'
                    })
                },
                resolve: {}
            })
            .state('index.factEvent', {
                url: '/factEvent/:villageCode',
                views: {
                    'topbar@index': {},
                    'main@index': angularAMD.route({
                        templateUrl: 'template/html/modules/more/factEvent.html',
                        controllerUrl: 'controllers/more/factEvent'
                    })
                },
                resolve: {}
            })
            .state('index.communityRight', {
                url: '/communityRight/',
                views: {
                    'topbar@index': {},
                    'main@index': angularAMD.route({
                        templateUrl: 'template/html/modules/community/communityRightModule.html',
                        controllerUrl: 'controllers/community/communityRightModuleCtrl'
                    })
                },
                resolve: {}
            })
            .state('index.senseCar', {
                url: '/senseCar/:villageCode',
                views: {
                    'topbar@index': {},
                    'main@index': angularAMD.route({
                        templateUrl: 'template/html/modules/more/senseCar.html',
                        controllerUrl: 'controllers/more/senseCar'
                    })
                },
                resolve: {}
            })
            .state('index.yinjinggai', {
                url: '/yinjinggai/:villageCode',
                views: {
                    'topbar@index': {},
                    'main@index': angularAMD.route({
                        templateUrl: 'template/html/modules/more/yinjinggai.html',
                        controllerUrl: 'controllers/more/yinjinggai'
                    })
                },
                resolve: {}
            })
            .state('index.registerCar', {
                url: '/registerCar/',
                views: {
                    'topbar@index': {},
                    'main@index': angularAMD.route({
                        templateUrl: 'template/html/modules/more/registerCar.html',
                        controllerUrl: 'controllers/more/registerCar'
                    })
                },
                resolve: {}
            })
            .state('index.expressPeople', {
                url: '/expressPeople/:villageCode',
                views: {
                    'topbar@index': {},
                    'main@index': angularAMD.route({
                        templateUrl: 'template/html/modules/more/expressPeople.html',
                        controllerUrl: 'controllers/more/expressPeople'
                    })
                },
                resolve: {}
            })
            .state('index.expressPeopleList', {
                url: '/expressPeopleList/',
                views: {
                    'topbar@index': {},
                    'main@index': angularAMD.route({
                        templateUrl: 'template/html/modules/more/expressPeopleList.html',
                        controllerUrl: 'controllers/more/expressPeopleList'
                    })
                },
                resolve: {}
            })
            .state('index.fromCarToMac', {
                url: '/fromcartomac/',
                views: {
                    'topbar@index': {},
                    'main@index': angularAMD.route({
                        templateUrl: 'template/html/modules/more/fromCarToMac.html',
                        controllerUrl: 'controllers/more/MacCtrl'
                    })
                },
                resolve: {}
            })
            .state('index.platform', {
                url: '/platform/{moduleIndex}',
                views: {
                    'main@index': angularAMD.route({
                        templateUrl: 'template/html/modules/platform.html',
                        controllerUrl: 'controllers/platform/platformCtrl'
                    })
                },
                resolve: {}
            })
            .state('index.xiaofangzhan', {
                url: '/xiaofangzhan/:villageCode',
                views: {
                    'main@index': angularAMD.route({
                        templateUrl: 'template/html/modules/more/xiaofangzhan.html',
                        controllerUrl: 'controllers/more/xiaofangzhan'
                    })
                },
                resolve: {}
            })
            .state('index.dynamicAware', {
                url: '/dynamicAware/:villageCode',
                views: {
                    'main@index': angularAMD.route({
                        templateUrl: 'template/html/modules/more/dynamicAwareList.html',
                        controllerUrl: 'controllers/more/dynamicAwareList'
                    })
                },
                resolve: {}
            })
            .state('index.communityAllNewChart', {
                url: '/communityAllNewChart/:type',
                views: {
                    'main@index': angularAMD.route({
                        templateUrl: 'template/html/modules/community/communityAllNewChart.html',
                        controllerUrl: 'controllers/community/communityAllNewChart'
                    })
                },
                resolve: {}
            })
            .state('index.factHouse', {
                url: '/factHouse/:villageCode',
                views: {
                    'main@index': angularAMD.route({
                        templateUrl: 'template/html/modules/more/factHouse.html',
                        controllerUrl: 'controllers/more/factHouse'
                    })
                },
                resolve: {}
            })
            ;


        $urlRouterProvider.otherwise('/index/login/');
    });
});
