/**
 * main.js
 *
 * */

require.config({
    paths: {
        "jquery": "../lib/angular/jquery-1.10.2.min",
        "angular": "../lib/angular/angular1.6.min",
        "bootstrap": "../lib/angular/bootstrap.min",
        "angularRoute": "../lib/angular/angular-route.min",
        "angularResource": "../lib/angular/angular-resource.min",
        "uiRoute": "../lib/angular/angular-ui-router",
        "angularAMD": "../lib/angular/angularAMD",
        "ngload": "../lib/angular/ngload",
        'angularCss': '../lib/angular/angular-css',
        "uiBootstrapTpls": "../lib/angular/ui-bootstrap-tpls",
        "prefixfree": "../lib/other/prefixfree.min",
        "d3": "../lib/other/d3",
        "d3.layout.cloud":"../lib/other/d3.layout.cloud",
        'echarts-all': '../lib/echart/echarts',
        'echarts-dark': '../lib/echart/theme/macarons',
        'macaronsTheme': '../lib/echart/theme/macarons',
        'echarts-blue':'../lib/echart/blue',
        'classie': '../lib/other/classie',
        'modernizr': '../lib/other/modernizr-2.6.2.min',
        'polyfills': '../lib/other/polyfills',
        'tween.min': '../lib/other/tween.min',
        'trackballControls': '../lib/other/TrackballControls',
        'css3DRenderer': '../lib/other/CSS3DRenderer',
        'jquery.reveal': '../lib/other/jquery.reveal',
        'odometer': '../lib/other/odometer',
        'initMap': '../lib/map/v1.0.3.3/Init',
        'layer': '../lib/layer/layer',
        'laydate': '../lib/layer/laydate',
        'datetimepicker': '../lib/other/jquery.datetimepicker',
        'scrollbar': '../lib/other/jquery.mCustomScrollbar.concat.min',
        'zTree': '../lib/zTree/jquery.ztree.core-3.5',
        'excheck': '../lib/zTree/jquery.ztree.excheck-3.5',
        'notify':'../lib/notify/jquery-notify.min',
        'dropdownlist':'../lib/dropdownlist/dropdownlist',
        'heatmap': '/lib/map/heatmap',
        'factory': '/lib/map/NpgisFactory',
        'mapUtil': '/lib/map/MapUtil',
        'cluster': '/lib/map/Cluster',
        'npgis2': '/lib/map/NPGIS2',
        'jquery.custom': '/lib/other/jquery-ui-1.10.4.custom',
        'common' : '/lib/tactics/common',
        'mint' : '/lib/tactics/mint',
        'checkDataType' : '/lib/tactics/checkDataType',
        'imgAreaSelect' : '/lib/imgAreaSelect/jquery.imgareaselect.pack',
        'darkTheme':'../lib/echart/theme/dark',
        'webUpload':'../lib/upload/webuploader.min',
        'moment': '../lib/other/moment',
        'eventmgr': '../lib/other/eventmgr',
        'player': '../lib/other/player',
        'webuploader': '../lib/other/webuploader',
        'md5': '../lib/other/md5.min',
        'configFile':'../lib/config/config',
        'select2':'../lib/select2/select2.min',
        "md5":"/lib/md5/md5",
        'yituFace':'/modules/controllers/common/yituFace'
        // 'UnityObject2':'../lib/jslib/UnityObject2',
        // 'uzft':'../lib/jslib/uzft'
    },
    shim: {
        webUpload:{
            deps:['jquery']
        },
        player: {
          deps: ['eventmgr']
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
        npgis2: {
            deps: ["cluster"]
        },
        angularRoute: {
            deps: ["angular"]
        },
        angularResource: {
            deps: ["angular"]
        },
        uiRoute: {
            deps: ["angular"]
        },
        "angularCSS": {
            deps: ["angular"]
        },
        "uiBootstrapTpls": {
            deps: ["angular"]
        },
        datetimepicker: {
            deps: ["jquery"]
        },
        scrollbar: {
            deps: ["jquery"]
        },
        zTree: {
            deps: ["jquery"]
        },
        excheck: {
            deps: ['zTree']
        },
        notify: {
            deps: ["jquery"],
            exports: "notify"
        },
        dropdownlist: {
            deps: ["jquery"]
        },
        'jquery.custom': {
            deps: ["jquery"]
        },
        public: {
            deps: ["jquery"]
        },
        macaronsTheme: {
            deps: ["echarts-all"]
        },
        'd3.layout.cloud': {
            deps: ['d3']
        },
        'initMap': {
            deps: ['heatmap']
        },
        mint: {
            exports: "Q"
        },
        darkTheme:{
            deps:['echarts-all']
        },
        select2: {
　　　　　　deps: ['jquery']
　　　　},
        md5:{
            exports: 'md5'
        },
        yituFace:{
            deps: ['jquery','angular','md5']
        }
        // UnityObject2:{
        //     deps:["jquery"]
        // },
        // uzft:{
        //     deps: ["UnityObject2"]
        // }
    }
    , urlArgs: "bust=" + (new Date()).getTime()
});

//angular
define(['angular', "routes"], function (angular, routes){
    //手动启动angular
    console.log(routes, 163)
    angular.bootstrap(document, [routes.name]);
});
//
window.console = window.console || {log: function (){}};
