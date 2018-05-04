/**
 * main.js
 *
 * */

require.config({
    paths: {
        "jquery": "/lib/angular/jquery-1.10.2.min",
        "angular": "/lib/angular/angular1.6.min",
        "bootstrap": "/lib/angular/bootstrap.min",
        "angularRoute": "/lib/angular/angular-route.min",
        'initMap': '/lib/map/v1.0.3.3/Init',
        'heatmap': '/lib/map/heatmap',
        'factory': '/lib/map/NpgisFactory',
        'mapUtil': '/lib/map/MapUtil',
        'cluster': '/lib/map/Cluster',
        'npgis2': '/lib/map/NPGIS2',
        "md5":"/lib/md5/md5",
        'yituFace':'/modules/controllers/common/yituFace'
    },
    shim: {
        webUpload:{
            deps:['jquery']
        },
        angular: {
            exports: "angular"
        },
        mapUtil: {
            deps: ["factory",'initMap']
        },
        cluster: {
            deps: ["mapUtil"]
        },
        factory:{
           deps: ["jquery"] 
        },
        npgis2: {
            deps: ["cluster"]
        },
        angularRoute: {
            deps: ["angular"]
        },
        initMap: {
            deps: ['heatmap']
        },
        md5:{
            exports: 'md5'
        },
        yituFace:{
            deps: ['jquery','angular','md5']
        }
    }
    , urlArgs: "bust=" + (new Date()).getTime()
});
require(['clean2dMap'], function (clean2dMap){
    //手动启动angular
    clean2dMap.initAngularFun();
    //初始化地图
    clean2dMap.initMap();
    //地图撒点
    // var pointList = sessionStorage.getItem("locationForPower")
    // clean2dMap.drawIconList("police",pointList);
});
