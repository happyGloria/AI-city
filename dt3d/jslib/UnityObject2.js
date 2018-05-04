/**
 * @fileOverview
 * Defines UnityObject2
 */


//TODO: No need to polute the global space, just transfer this control to a 'static' variable insite unityObject! 
/**
 * @namespace
 */
//var unity = unity || {};
// We store all unityObject instances in a global scope, needed for IE firstFrameCallback and other internal tasks.
//unity.instances = [];
//unity.instanceNumber = 0;

/**
 * Object expected by the Java Installer. We can move those to UnityObject2 if we update the java Installer.
 */
var unityObject = {
    /**
     * Callback used bt the Java installer to notify the Install Complete.
     * @private
     * @param {String} id
     * @param {bool} success
     * @param {String} errormessage
     */
    javaInstallDone : function (id, success, errormessage) {

        var instanceId = parseInt(id.substring(id.lastIndexOf('_') + 1), 10);
        if (!isNaN(instanceId)) {

            // javaInstallDoneCallback must not be called directly because it deadlocks google chrome
            setTimeout(function () {

                UnityObject2.instances[instanceId].javaInstallDoneCallback(id, success, errormessage);
            }, 10);
        }
    }
};


/**
 *  @class
 *  @constructor
 */
var UnityObject2 = function (config) {

    /** @private */
    var logHistory = [],
        win = window,
        doc = document,
        nav = navigator,
        instanceNumber = null,
        //domLoaded = false,
        //domLoadEvents = [],
        embeddedObjects = [], //Could be removed?
        //listeners = [],
        //styleSheet = null,
        //styleSheetMedia = null,
        //autoHideShow = true,
        //fullSizeMissing = true,
        useSSL = (document.location.protocol == 'https:'),  //This will turn off enableUnityAnalytics, since enableUnityAnalytics don't have a https version.
        baseDomain = useSSL ? "https://ssl-webplayer.unity3d.com/" : "http://webplayer.unity3d.com/",
        triedJavaCookie = "_unity_triedjava",
        triedJavaInstall = _getCookie(triedJavaCookie),
        triedClickOnceCookie = "_unity_triedclickonce",
        triedClickOnce = _getCookie(triedClickOnceCookie),
        progressCallback = false,
        applets = [],
        //addedClickOnce = false,
        googleAnalyticsLoaded = false,
        googleAnalyticsCallback = null,
        latestStatus = null,
        lastType = null,
        //beginCallback = [],
        //preCallback = [],
        imagesToWaitFor = [],
        //referrer = null,
        pluginStatus = null,
        pluginStatusHistory = [],
        installProcessStarted = false, //not used anymore?
        kInstalled = "installed",
        kMissing = "missing",
        kBroken = "broken",
        kUnsupported = "unsupported",
        kReady = "ready", //not used anymore?
        kStart = "start",
        kError = "error",
        kFirst = "first",
        //kStandard = "standard",
        kJava = "java",
        kClickOnce = "clickonce", //not used anymore?
        wasMissing = false,             //identifies if this is a install attempt, or if the plugin was already installed
        unityObject = null,				//The <embed> or <object> for the webplayer. This can be used for webPlayer communication.
        //kApplet = "_applet",
        //kBanner = "_banner",

        cfg = {
            pluginName              : "Unity Player",
            pluginMimeType          : "application/vnd.unity",
            baseDownloadUrl         : baseDomain + "download_webplayer-3.x/",
            fullInstall             : false,
            autoInstall             : false,
            enableJava              : true,
            enableJVMPreloading     : false,
            enableClickOnce         : true,
            enableUnityAnalytics    : false,
            enableGoogleAnalytics   : true,
            params                  : {},
            attributes              : {},
            referrer                : null,
            debugLevel              : 0
        };

    // 第一个参数boolean代表是否进行深度拷贝
    cfg = jQuery.extend(true, cfg, config);

    if (cfg.referrer === "") {
        cfg.referrer = null;
    }
    //enableUnityAnalytics does not support SSL yet.
    if (useSSL) {
        cfg.enableUnityAnalytics = false;
    }

    /**
     * Get cookie value
     * @private
     * @param {String} name The param name
     * @return string or false if non-existing.
     */
    function _getCookie(name) {

        var e = new RegExp(escape(name) + "=([^;]+)");

        if (e.test(doc.cookie + ";")) {

            e.exec(doc.cookie + ";");
            return RegExp.$1;
        }

        return false;
    }

    /**
     * Sets session cookie
     * @private
     */
    function _setSessionCookie(name, value) {

        document.cookie = escape(name) + "=" + escape(value) + "; path=/";
    }

    /**
     * Converts unity version to number (used for version comparison)  将统一的版本号（用于版本比较）
     * @private
     */
    function _getNumericUnityVersion(version) {

        var result = 0,
            major,
            minor,
            fix,
            type,
            release;

        if (version) {

            var m = version.toLowerCase().match(/^(\d+)(?:\.(\d+)(?:\.(\d+)([dabfr])?(\d+)?)?)?$/);

            if (m && m[1]) {

                major = m[1];
                minor = m[2] ? m[2] : 0;
                fix = m[3] ? m[3] : 0;
                type = m[4] ? m[4] : 'r';
                release = m[5] ? m[5] : 0;
                result |= ((major / 10) % 10) << 28;
                result |= (major % 10) << 24;
                result |= (minor % 10) << 20;
                result |= (fix % 10) << 16;
                result |= {d: 2 << 12, a: 4 << 12, b: 6 << 12, f: 8 << 12, r: 8 << 12}[type];
                result |= ((release / 100) % 10) << 8;
                result |= ((release / 10) % 10) << 4;
                result |= (release % 10);
            }
        }

        return result;
    }

    /**
     * Gets plugin and unity versions (non-ie)   获取插件和统一的版本（非IE）
     * @private
     */
    function _getPluginVersion(callback, versions) {

        var b = doc.getElementsByTagName("body")[0];
        var ue = doc.createElement("object");
        var i = 0;

        if (b && ue) {
            ue.setAttribute("type", cfg.pluginMimeType);
            ue.style.visibility = "hidden";
            b.appendChild(ue);
            var count = 0;

            (function () {
                if (typeof ue.GetPluginVersion === "undefined") {

                    if (count++ < 10) {

                        setTimeout(arguments.callee, 10);
                    } else {

                        b.removeChild(ue);
                        callback(null);
                    }
                } else {

                    var v = {};

                    if (versions) {

                        for (i = 0; i < versions.length; ++i) {

                            v[versions[i]] = ue.GetUnityVersion(versions[i]);
                        }
                    }

                    v.plugin = ue.GetPluginVersion();
                    b.removeChild(ue);
                    callback(v);
                }
            })();

        } else {

            callback(null);
        }
    }

    /**
     * Retrieves windows installer name   获取Windows安装程序名称
     * @private
     */
    function _getWinInstall() {

        var url = cfg.fullInstall ? "UnityWebPlayerFull.exe" : "UnityWebPlayer.exe";

        if (cfg.referrer !== null) {

            url += "?referrer=" + cfg.referrer;
        }
        return url;
    }

    /**
     * Retrieves mac plugin package name   获取MAC插件包名
     * @private
     */
    function _getOSXInstall() {

        var url = "UnityPlayer.plugin.zip";

        if (cfg.referrer != null) {

            url += "?referrer=" + cfg.referrer;
        }
        return url;
    }

    /**
     * retrieves installer name   获取安装程序的名字
     * @private
     */
    function _getInstaller() {

        return cfg.baseDownloadUrl + (ua.win ? _getWinInstall() : _getOSXInstall() );
    }

    /**
     * sets plugin status   设置插件状态
     * @private
     */
    function _setPluginStatus(status, type, data, url) {

        if (status === kMissing){

            wasMissing = true;
            var $missingScreen = jQuery("#unityPlayer").find(".missing");
            $missingScreen.show();
        }

        //   debug('setPluginStatus() status:', status, 'type:', type, 'data:', data, 'url:', url);

        // only report to analytics the first time a status occurs.  报告分析状态发生的第一次。
        if ( jQuery.inArray(status, pluginStatusHistory) === -1 ) {

            //Only send analytics for plugins installs. Do not send if plugin is already installed.
            //仅发送Analytics（分析）的插件安装。如果已经安装了插件，不发送
            if (wasMissing) {
                _an.send(status, type, data, url);
                //var lobj_img=document.getElementById("u3dimg");
                //lobj_img.style.display="";
            }
            pluginStatusHistory.push(status);
        }

        pluginStatus = status;
    }


    /**
     *  Contains browser and platform properties  包含浏览器和平台属性
     *  @private
     */
    var ua = function () {

        var a = nav.userAgent, p = nav.platform;
        var chrome = /chrome/i.test(a);
        var ua = {
            w3 : typeof doc.getElementById != "undefined" && typeof doc.getElementsByTagName != "undefined" && typeof doc.createElement != "undefined",
            win : p ? /win/i.test(p) : /win/i.test(a),
            mac : p ? /mac/i.test(p) : /mac/i.test(a),
            ie : /msie/i.test(a) ? parseFloat(a.replace(/^.*msie ([0-9]+(\.[0-9]+)?).*$/i, "$1")) : false,
            ff : /firefox/i.test(a),
            op : /opera/i.test(a),
            ch : chrome,
            ch_v : /chrome/i.test(a) ? parseFloat(a.replace(/^.*chrome\/(\d+(\.\d+)?).*$/i, "$1")) : false,
            sf : /safari/i.test(a) && !chrome,
            wk : /webkit/i.test(a) ? parseFloat(a.replace(/^.*webkit\/(\d+(\.\d+)?).*$/i, "$1")) : false,
            x64 : /win64/i.test(a) && /x64/i.test(a),
            moz : /mozilla/i.test(a) ? parseFloat(a.replace(/^.*mozilla\/([0-9]+(\.[0-9]+)?).*$/i, "$1")) : 0,
            mobile: /ipad/i.test(p) || /iphone/i.test(p) || /ipod/i.test(p) || /android/i.test(a) || /windows phone/i.test(a)
        };

        ua.clientBrand = ua.ch ? 'ch' : ua.ff ? 'ff' : ua.sf ? 'sf' : ua.ie ? 'ie' : ua.op ? 'op' : '??';
        ua.clientPlatform = ua.win ? 'win' : ua.mac ? 'mac' : '???';

        // get base url
        var s = doc.getElementsByTagName("script");

        for (var i = 0; i < s.length; ++i) {

            var m = s[i].src.match(/^(.*)3\.0\/uo\/UnityObject2\.js$/i);

            if (m) {

                cfg.baseDownloadUrl = m[1];
                break;
            }
        }

        /**
         * compares two versions    比较两个版本
         * @private
         */
        function _compareVersions(v1, v2) {

            for (var i = 0; i < Math.max(v1.length, v2.length); ++i) {

                var n1 = (i < v1.length) && v1[i] ? new Number(v1[i]) : 0;
                var n2 = (i < v2.length) && v2[i] ? new Number(v2[i]) : 0;
                if (n1 < n2) return -1;
                if (n1 > n2) return 1;
            }

            return 0;
        };

        /**
         * detect java   检测Java
         */
        ua.java = function () {

            if (nav.javaEnabled()) {

                var wj = (ua.win && ua.ff);
                var mj = false;//(ua.mac && (ua.ff || ua.ch || ua.sf));

                if (wj || mj) {

                    if (typeof nav.mimeTypes != "undefined") {

                        var rv = wj ? [1, 6, 0, 12] : [1, 4, 2, 0];

                        for (var i = 0; i < nav.mimeTypes.length; ++i) {

                            if (nav.mimeTypes[i].enabledPlugin) {

                                var m = nav.mimeTypes[i].type.match(/^application\/x-java-applet;(?:jpi-)?version=(\d+)(?:\.(\d+)(?:\.(\d+)(?:_(\d+))?)?)?$/);

                                if (m != null) {

                                    if (_compareVersions(rv, m.slice(1)) <= 0) {

                                        return true;
                                    }
                                }
                            }
                        }
                    }
                } else if (ua.win && ua.ie) {

                    if (typeof ActiveXObject != "undefined") {

                        /**
                         * ActiveX Test
                         */
                        function _axTest(v) {

                            try {

                                return new ActiveXObject("JavaWebStart.isInstalled." + v + ".0") != null;
                            }
                            catch (ex) {

                                return false;
                            }
                        }

                        /**
                         * ActiveX Test 2
                         */
                        function _axTest2(v) {

                            try {

                                return new ActiveXObject("JavaPlugin.160_" + v) != null;
                            } catch (ex) {

                                return false;
                            }
                        }

                        if (_axTest("1.7.0")) {

                            return true;
                        }

                        if (ua.ie >= 8) {

                            if (_axTest("1.6.0")) {

                                // make sure it's 1.6.0.12 or newer. increment 50 to a larger value if 1.6.0.50 is released
                                for (var i = 12; i <= 50; ++i) {

                                    if (_axTest2(i)) {

                                        if (ua.ie == 9 && ua.moz == 5 && i < 24) {
                                            // when IE9 is not in compatibility mode require at least
                                            // Java 1.6.0.24: http://support.microsoft.com/kb/2506617
                                            continue;
                                        } else {

                                            return true;
                                        }
                                    }
                                }

                                return false;
                            }
                        } else {

                            return _axTest("1.6.0") || _axTest("1.5.0") || _axTest("1.4.2");
                        }
                    }
                }
            }

            return false;
        }();

        // detect clickonce  检测ClickOnce
        ua.co = function () {

            if (ua.win && ua.ie) {
                var av = a.match(/(\.NET CLR [0-9.]+)|(\.NET[0-9.]+)/g);
                if (av != null) {
                    var rv = [3, 5, 0];
                    for (var i = 0; i < av.length; ++i) {
                        var versionNumbers = av[i].match(/[0-9.]{2,}/g)[0].split(".");
                        if (_compareVersions(rv, versionNumbers) <= 0) {
                            return true;
                        }
                    }
                }
            }
            return false;

        }();

        return ua;
    }();


    /**
     * analytics  分析
     * @private
     */
    var _an = function () {
        var uid = function () {

            var now = new Date();
            var utc = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDay(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds());
            return utc.toString(16) + _getRandomInt().toString(16);
        }();
        var seq = 0;
        var _ugaq = window["_gaq"] = ( window["_gaq"] || [] );

        _setUpAnalytics();

        /**
         * generates random integer number  产生随机整数
         * @private
         */
        function _getRandomInt() {

            return Math.floor(Math.random() * 2147483647);
        }

        /**
         * Checks if there is a need to load analytics, by checking the existance of a _gaq object
         * 检查是否有需要加载的分析，通过检查套的_gaq对象的存在
         */
        function _setUpAnalytics() {

            var gaUrl = ('https:'   == document.location.protocol ? 'https://ssl'   : 'http://www') + '.google-analytics.com/ga.js';
            var ss = doc.getElementsByTagName("script");
            var googleAnalyticsLoaded = false;
            for (var i = 0; i < ss.length; ++i) {

                if (ss[i].src && ss[i].src.toLowerCase() == gaUrl.toLowerCase()) {

                    googleAnalyticsLoaded = true;
                    break;
                }
            }

            if (!googleAnalyticsLoaded) {
                var ga = doc.createElement("script");
                ga.type = "text/javascript";
                ga.async = true;
                ga.src = gaUrl;
                var s = document.getElementsByTagName("script")[0];
                s.parentNode.insertBefore(ga, s);
            }

            var gaAccount = (cfg.debugLevel === 0) ? 'UA-16068464-16' : 'UA-16068464-17';

            _ugaq.push(["unity._setDomainName", "none"]);
            _ugaq.push(["unity._setAllowLinker", true]);
            _ugaq.push(["unity._setReferrerOverride", ' '+this.location.toString()]);

            _ugaq.push(["unity._setAccount", gaAccount]);
            // $(GoogleRevisionPlaceholder)
        }

        /**
         * sends analytics data to unity  数据发送到unity
         * @private
         */
        function _sendUnityAnalytics(event, type, data, callback) {

            if (!cfg.enableUnityAnalytics) {

                if (callback) {

                    callback();
                }

                return;
            }

            var url = "http://unityanalyticscapture.appspot.com/event?u=" + encodeURIComponent(uid) + "&s=" + encodeURIComponent(seq) + "&e=" + encodeURIComponent(event);
            // $(UnityRevisionPlaceholder)

            if (cfg.referrer !== null) {

                url += "?r=" + cfg.referrer;
            }

            if (type) {

                url += "&t=" + encodeURIComponent(type);
            }

            if (data) {

                url += "&d=" + encodeURIComponent(data);
            }

            var img = new Image();

            if (callback) {

                img.onload = img.onerror = callback;
            }

            img.src = url;
        }

        /**
         * sends analytics data to google  数据发送到谷歌
         * @private
         */
        function _sendGoogleAnalytics(event, type, data, callback) {

            if (!cfg.enableGoogleAnalytics) {

                if (callback) {

                    callback();
                }

                return;
            }

            var url = "/webplayer/install/" + event;
            var join = "?";

            if (type) {

                url += join + "t=" + encodeURIComponent(type);
                join = "&";
            }

            if (data) {

                url += join + "d=" + encodeURIComponent(data);
                join = "&";
            }

            if (callback) {

                _ugaq.push(function () {
                    setTimeout(callback,1000);
                    //this.googleAnalyticsCallback = callback;
                });
            }

            //try to shorten the URL to fit into customVariable
            //it will try to replace the early directories to ..
            var gameUrl = cfg.src;
            if (gameUrl.length > 40) {
                gameUrl = gameUrl.replace("http://","");
                var paths = gameUrl.split("/");

                var gameUrlFirst = paths.shift();
                var gameUrlLast = paths.pop();
                gameUrl = gameUrlFirst + "/../"+ gameUrlLast;

                while(gameUrl.length < 40 && paths.length > 0) {
                    var nextpath = paths.pop();
                    if(gameUrl.length + nextpath.length + 5 < 40) {
                        gameUrlLast =  nextpath + "/" + gameUrlLast;
                    } else {
                        gameUrlLast =  "../" + gameUrlLast;
                    }
                    gameUrl = gameUrlFirst + "/../"+ gameUrlLast;
                }
            }
            _ugaq.push(['unity._setCustomVar',
                2,                   // This custom var is set to slot #1.  Required parameter.
                'GameURL',           // The name acts as a kind of category for the user activity.  Required parameter.
                gameUrl,             // This value of the custom variable.  Required parameter.
                3                    // Sets the scope to page-level.  Optional parameter.
            ]);
            _ugaq.push(['unity._setCustomVar',
                1,                      // This custom var is set to slot #1.  Required parameter.
                'UnityObjectVersion',   // The name acts as a kind of category for the user activity.  Required parameter.
                "2",                    // This value of the custom variable.  Required parameter.
                3                       // Sets the scope to page-level.  Optional parameter.
            ]);
            if (type) {
                _ugaq.push(['unity._setCustomVar',
                    3,                      // This custom var is set to slot #1.  Required parameter.
                    'installMethod',   // The name acts as a kind of category for the user activity.  Required parameter.
                    type,                    // This value of the custom variable.  Required parameter.
                    3                       // Sets the scope to page-level.  Optional parameter.
                ]);
            }
            _ugaq.push(["unity._trackPageview", url]);
        }

        return {
            /**
             * sends analytics data. optionally opens url once data has been sent
             * @public
             */
            send : function (event, type, data, url) {

                if (cfg.enableUnityAnalytics || cfg.enableGoogleAnalytics) {

                    debug('Analytics SEND', event, type, data, url);
                }

                ++seq;
                var count = 2;

                var callback = function () {

                    if (0 == --count) {

                        googleAnalyticsCallback = null;
                        window.location = url;
                    }
                }

                if (data === null || data === undefined) {
                    data = "";
                }

                _sendUnityAnalytics(event, type, data, url ? callback : null);
                _sendGoogleAnalytics(event, type, data, url ? callback : null);
            }
        };
    }();





    /* Java Install - BEGIN */

    /**
     * @private
     */
    function _createObjectElement(attributes, params, elementToReplace) {

        var i,
            at,
            pt,
            ue,
            pe;

        if (ua.win && ua.ie) {

            at = "";

            for (i in attributes) {

                at += ' ' + i + '="' + attributes[i] + '"';
            }

            pt = "";

            for (i in params) {

                pt += '<param name="' + i + '" value="' + params[i] + '" />';
            }

            elementToReplace.outerHTML = '<object' + at + '>' + pt + '</object>';

        } else {

            ue = doc.createElement("object");

            for (i in attributes) {

                ue.setAttribute(i, attributes[i]);
            }

            for (i in params) {

                pe = doc.createElement("param");
                pe.name = i;
                pe.value = params[i];
                ue.appendChild(pe);
            }

            elementToReplace.parentNode.replaceChild(ue, elementToReplace);
        }
    }

    /**
     * @private
     */
    function _checkImage(img) {

        // img element not in the DOM yet
        if (typeof img == "undefined") {

            return false;
        }

        if (!img.complete) {

            return false;
        }

        // some browsers always return true in img.complete, for those
        // we can check naturalWidth
        if (typeof img.naturalWidth != "undefined" && img.naturalWidth == 0) {

            return false;
        }

        // no other way of checking, assuming it is ok
        return true;
    }

    /**
     * @private
     */
    function _preloadJVMWhenReady(id) {

        var needToWait = false;

        for (var i = 0; i < imagesToWaitFor.length; i++) {
            if (!imagesToWaitFor[i]) {
                continue;
            }
            var img = doc.images[imagesToWaitFor[i]];
            if (!_checkImage(img)) {
                needToWait = true;
            }
            else {
                imagesToWaitFor[i] = null;
            }
        }
        if (needToWait) {
            // check again in 100ms
            setTimeout(arguments.callee, 100);
        }
        else {
            // preload after a small delay, to make sure
            // the images have actually rendered
            setTimeout(function () {
                _preloadJVM(id);
            }, 100);
        }
    }


    /**
     *  preloads the JVM and the Java Plug-in   预加载JVM和Java插件
     *  @private
     */
    function _preloadJVM(id) {

        var re = doc.getElementById(id);

        if (!re) {

            re = doc.createElement("div");
            var lastBodyElem = doc.body.lastChild;
            doc.body.insertBefore(re, lastBodyElem.nextSibling);
        }

        var codebase = cfg.baseDownloadUrl + "3.0/jws/";

        var a = {
            id : id,
            type : "application/x-java-applet",
            code : "JVMPreloader",
            width : 1,
            height : 1,
            name : "JVM Preloader"
        };

        var p = {
            context : id,
            codebase : codebase,
            classloader_cache : false,
            scriptable : true,
            mayscript : true
        };

        _createObjectElement(a, p, re);
        jQuery('#' + id).show();
        //setVisibility(id, true);
    }

    /**
     * launches java installer  启动Java安装程序
     * @private
     */
    function _doJavaInstall(id) {

        triedJavaInstall = true;
        _setSessionCookie(triedJavaCookie, triedJavaInstall);
        var re = doc.getElementById(id);
        var appletID = id + "_applet_" + instanceNumber;

        applets[appletID] = {
            attributes : cfg.attributes,
            params : cfg.params,
            callback : cfg.callback,
            broken : cfg.broken
        };

        var applet = applets[appletID];

        var a = {
            id : appletID,
            type : "application/x-java-applet",
            archive : cfg.baseDownloadUrl + "3.0/jws/UnityWebPlayer.jar",
            code : "UnityWebPlayer",
            width : 1,
            height : 1,
            name : "Unity Web Player"
        };

        if (ua.win && ua.ff) {

            a["style"] = "visibility: hidden;";
        }

        var p = {
            context : appletID,
            jnlp_href : cfg.baseDownloadUrl + "3.0/jws/UnityWebPlayer.jnlp",
            classloader_cache : false,
            installer : _getInstaller(),
            image : baseDomain + "installation/unitylogo.png",
            centerimage : true,
            boxborder : false,
            scriptable : true,
            mayscript : true
        };

        for (var i in applet.params) {

            if (i == "src") {

                continue;
            }

            if (applet.params[i] != Object.prototype[i]) {

                p[i] = applet.params[i];

                if (i.toLowerCase() == "logoimage") {

                    p["image"] = applet.params[i];
                }
                else if (i.toLowerCase() == "backgroundcolor") {

                    p["boxbgcolor"] = "#" + applet.params[i];
                }
                else if (i.toLowerCase() == "bordercolor") {

                    // there's no way to specify border color
                    p["boxborder"] = true;
                }
                else if (i.toLowerCase() == "textcolor") {

                    p["boxfgcolor"] = "#" + applet.params[i];
                }
            }
        }

        // Create a dummy div element in the unityPlayer div
        // so that it can be replaced with the 1x1 px applet.
        // The applet will be resized when it has fully loaded,
        // see appletStarted().
        var divToBeReplacedWithApplet = doc.createElement("div");
        re.appendChild(divToBeReplacedWithApplet);
        _createObjectElement(a, p, divToBeReplacedWithApplet);
        jQuery('#' + id).show();
        //setVisibility(appletID, true);
    }

    /**
     * @private
     */
    function _jvmPreloaded(id) {

        // timeout prevents crash on ie
        setTimeout(function () {

            var re = doc.getElementById(id);

            if (re) {
                re.parentNode.removeChild(re);
            }
        }, 0);
    }

    /**
     * @private
     */
    function _appletStarted(id) {
        // set the size of the applet to the one from cloned attributes
        var applet = applets[id],
            appletElement = doc.getElementById(id),
            childNode;

        // the applet might have already finished by now
        if (!appletElement) {

            return;
        }

        appletElement.width = applet.attributes["width"] || 600;
        appletElement.height = applet.attributes["height"] || 450;

        // remove all the siblings of the applet
        var parentNode = appletElement.parentNode;
        var childNodeList = parentNode.childNodes;

        for (var i = 0; i < childNodeList.length; i++) {

            childNode = childNodeList[i];
            // Compare the child node with our applet element only if
            // it has the same type. Doing the comparison in other cases just
            // jumps out of the loop.
            if (childNode.nodeType == 1 && childNode != appletElement) {

                parentNode.removeChild(childNode);
            }
        }
    }


    // java installation callback
    function _javaInstallDoneCallback(id, success, errormessage) {

        debug('_javaInstallDoneCallback', id, success, errormessage);
        //console.log('javaInstallDoneCallback', id, success, errormessage);

        if (!success) {

            //var applet = applets[id];
            _setPluginStatus(kError, kJava, errormessage);
            //createMissingUnity(id, applet.attributes, applet.params, applet.callback, applet.broken, kJava, errormessage);
        }
    }

    /* Java Install - END */


    /**
     * @private
     */
    function log() {

        logHistory.push(arguments);

        if ( cfg.debugLevel > 0 && window.console && window.console.log ) {

            console.log(Array.prototype.slice.call(arguments));
            //console.log.apply(console, Array.prototype.slice.call(arguments));
        }
    }

    /**
     * @private
     */
    function debug() {

        logHistory.push(arguments);

        if ( cfg.debugLevel > 1 && window.console && window.console.log ) {

            console.log(Array.prototype.slice.call(arguments));
            //console.log.apply(console, Array.prototype.slice.call(arguments));
        }
    }

    /**
     * appends px to the value if it's a plain number
     * @private
     */
    function _appendPX(value) {

        if (/^[-+]?[0-9]+$/.test(value)) {
            value += "px";
        }
        return value;
    }




    var publicAPI = /** @lends UnityObject2.prototype */ {

        /**
         * Get Debug Level (0=Disabled)
         * @public
         * @return {Number} Debug Level
         */
        getLogHistory: function () {

            return logHistory; // JSON.stringify()
        },


        /**
         * Get configuration object
         * @public
         * @return {Object} cfg
         */
        getConfig: function () {

            return cfg; // JSON.stringify()
        },


        /**
         * @public
         * @return {Object} detailed info about OS and Browser.
         * 返回对象的详细信息，操作系统和浏览器。
         */
        getPlatformInfo: function () {

            return ua;
        },


        /**
         * Initialize plugin config and proceed with attempting to start the webplayer.
         * 初始化插件的配置，并尝试启动WebPlayer也继续进行。
         * @public
         */
        initPlugin: function (targetEl, src) {
            //alert("initPlugin is running");
            cfg.targetEl = targetEl;
            cfg.src = src;
            debug('ua:', ua);
            //console.debug('initPlugin this:', this);
            this.detectUnity(this.handlePluginStatus);
        },


        /**
         * detects unity web player.   检测unity网页播放器
         * @public
         * callback - accepts two parameters.
         *            first one contains "installed", "missing", "broken" or "unsupported" value.
         *            second one returns requested unity versions. plugin version is included as well.
         * versions - optional array of unity versions to detect.
         */
        detectUnity: function (callback, versions) {

            // console.debug('detectUnity this:', this);
            var self = this;

            var status = kMissing;
            //var status = "";
            var data;
            nav.plugins.refresh();

            if (ua.clientBrand === "??" || ua.clientPlatform === "???" || ua.mobile ) {
                status = kUnsupported;
            } else if (ua.op && ua.mac) { // Opera on MAC is unsupported

                status = kUnsupported;
                data = "OPERA-MAC";
            } else if (
                typeof nav.plugins != "undefined"
                && nav.plugins[cfg.pluginName]
                && typeof nav.mimeTypes != "undefined"
                && nav.mimeTypes[cfg.pluginMimeType]
                && nav.mimeTypes[cfg.pluginMimeType].enabledPlugin
            ) {

                status = kInstalled;

                // make sure web player is compatible with 64-bit safari
                if (ua.sf && /Mac OS X 10_6/.test(nav.appVersion)) {

                    _getPluginVersion(function (version) {

                        if (!version || !version.plugin) {

                            status = kBroken;
                            data = "OSX10.6-SFx64";
                        }

                        _setPluginStatus(status, lastType, data);
                        callback.call(self, status, version);
                    }, versions);

                    return;
                } else if (ua.mac && ua.ch) { // older versions have issues on chrome

                    _getPluginVersion(function (version) {

                        if (version && (_getNumericUnityVersion(version.plugin) <= _getNumericUnityVersion("2.6.1f3"))) {
                            status = kBroken;
                            data = "OSX-CH-U<=2.6.1f3";
                        }

                        _setPluginStatus(status, lastType, data);
                        callback.call(self, status, version);
                    }, versions);

                    return;
                } else if (versions) {

                    _getPluginVersion(function (version) {

                        _setPluginStatus(status, lastType, data);
                        callback.call(self, status, version);
                    }, versions);
                    return;
                }
            } else if (typeof win.ActiveXObject != "undefined") {

                try {
                    var uo = new ActiveXObject("UnityWebPlayer.UnityWebPlayer.1");
                    var pv = uo.GetPluginVersion();

                    if (versions) {

                        var v = {};

                        for (var i = 0; i < versions.length; ++i) {

                            v[versions[i]] = uo.GetUnityVersion(versions[i]);
                        }

                        v.plugin = pv;
                    }

                    status = kInstalled;
                    // 2.5.0 auto update has issues on vista and later
                    if (pv == "2.5.0f5") {

                        var m = /Windows NT \d+\.\d+/.exec(nav.userAgent);

                        if (m && m.length > 0) {

                            var wv = parseFloat(m[0].split(' ')[2]);

                            if (wv >= 6) {

                                status = kBroken;
                                data = "WIN-U2.5.0f5";
                            }
                        }
                    }
                } catch (ex) {

                    if (ua.win && ua.ie && ua.x64) {

                        status = kUnsupported;
                        data = "WIN-IEx64";
                    }
                }
            }
            // alert("detectUnity is running");
            _setPluginStatus(status, lastType, data);
            callback.call(self, status, v);
        },



        /**
         * @public
         * @return {Object} with info about Unity WebPlayer plugin status (not installed, loading, running etc..)
         * 返回{对象}的UnityWeb播放器插件状态有关的信息（没有安装，加载，运行等。）
         */
        handlePluginStatus: function (status, versions) {

            // Store targetEl in the closure, to be able to get it back if setTimeout calls again.
            var targetEl = cfg.targetEl;

            var $targetEl = jQuery(targetEl);
            //   alert("$targetEl="+$targetEl);
            //   alert("status="+status);
            switch(status) {

                case kInstalled:

                    // @todo add support for alternate custom handlers.
                    this.notifyProgress($targetEl);
                    this.embedPlugin($targetEl, cfg.callback);
                    break;

                case kMissing:

                    this.notifyProgress($targetEl);
                    //this.installPlugin($targetEl);

                    var self = this;
                    var delayTime = (cfg.debugLevel === 0) ? 1000 : 8000;

                    // Do a delay and re-check for plugin   做一个延迟，并重新检查插件
                    setTimeout(function () {

                        cfg.targetEl = targetEl;
                        self.detectUnity(self.handlePluginStatus);
                    }, delayTime);

                    break;

                case kBroken:
                    // Browser needs to restart after install
                    this.notifyProgress($targetEl);
                    break;

                case kUnsupported:

                    this.notifyProgress($targetEl);
                    break;
            }

        },

        /**
         * @public
         * @return {Object} with detailed plugin info, version number and other info that can be retrieved from the plugin.
         * 返回{对象}详细的插件信息，版本号和其他信息可检索的插件。
         */
        /*getPluginInfo: function () {

        },*/

        /**
         * @public
         */
        getPluginURL: function () {
            alert("getPluginURL is running");
            var url = "http://unity3d.com/webplayer/";

            if (ua.win) {

                url = cfg.baseDownloadUrl + _getWinInstall();

            } else if (nav.platform == "MacIntel") {

                url = cfg.baseDownloadUrl + (cfg.fullInstall ? "webplayer-i386.dmg" : "webplayer-mini.dmg");

                if (cfg.referrer !== null) {

                    url += "?referrer=" + cfg.referrer;
                }

            } else if (nav.platform == "MacPPC") {

                url = cfg.baseDownloadUrl + (cfg.fullInstall ? "webplayer-ppc.dmg" : "webplayer-mini.dmg");

                if (cfg.referrer !== null) {

                    url += "?referrer=" + cfg.referrer;
                }
            }

            return url;
        },

        /**
         * @public
         */
        getClickOnceURL: function () {

            return cfg.baseDownloadUrl + "3.0/co/UnityWebPlayer.application?installer=" + encodeURIComponent(cfg.baseDownloadUrl + _getWinInstall());
        },

        /**
         * Embed the plugin into the DOM.   嵌入到DOM中的插件
         * @public
         */
        embedPlugin: function (targetEl, callback) {

            targetEl = jQuery(targetEl).empty();

            var src = cfg.src; //targetEl.data('src'),
            var width = cfg.width || "100%"; //TODO: extract those hardcoded values
            var height = cfg.height || "100%";
            var self = this;

            if (ua.win && ua.ie) {
                // ie, dom and object element do not mix & match

                var at = "";

                for (var i in cfg.attributes) {
                    if (cfg.attributes[i] != Object.prototype[i]) {
                        if (i.toLowerCase() == "styleclass") {
                            at += ' class="' + cfg.attributes[i] + '"';
                        }
                        else if (i.toLowerCase() != "classid") {
                            at += ' ' + i + '="' + cfg.attributes[i] + '"';
                        }
                    }
                }
                at+='codebase="http://webplayer.unity3d.com/download_webplayer-2.x/UnityWebPlayer.cab#version=2,0,0,0"';
                var pt = "";
                // we manually add SRC here, because its now defined on the target element.
                pt += '<param name="src" value="' + src + '" />';
                pt += '<param name="firstFrameCallback" value="UnityObject2.instances[' + instanceNumber + '].firstFrameCallback();" />';
                pt+='<param name="disableContextMenu" value="true"'+'" />';
                pt += '<param name="progressbarimage" value="imgs/progressbarimage.png"  />';
                pt += '<param name="progressframeimage" value="imgs/progressframeimage.png" />';
                pt += '<param name="logoimage" value="imgs/logo_unity.png" />';
                for (var i in cfg.params) {

                    if (cfg.params[i] != Object.prototype[i]) {

                        if (i.toLowerCase() != "classid") {

                            pt += '<param name="' + i + '" value="' + cfg.params[i] + '" />';
                        }
                    }
                }
                //var tmpHtml = '<div id="' + targetEl.attr('id') + '" style="width: ' + _appendPX(width) + '; height: ' + _appendPX(height) + ';"><object classid="clsid:444785F1-DE89-4295-863A-D46C3A781394" style="display: block; width: 100%; height: 100%;"' + at + '>' + pt + '</object></div>';
                var tmpHtml = '<object id="usearth" classid="clsid:444785F1-DE89-4295-863A-D46C3A781394" style="display: block; width: ' + _appendPX(width) + '; height: ' + _appendPX(height) + ';"' + at + '>' + pt + '</object>';
                var $object = jQuery(tmpHtml);
                targetEl.append( $object );
                embeddedObjects.push( targetEl.attr('id') );
                unityObject = $object[0];
                // alert("tmpHtml="+tmpHtml);
            } else {
                // Create and append embed element into DOM.
                var $embed = jQuery('<embed/>')
                    .attr({
                        src: src,
                        type: cfg.pluginMimeType,
                        width: width,
                        height: height,
                        disableContextMenu:true,
                        firstFrameCallback: 'UnityObject2.instances[' + instanceNumber + '].firstFrameCallback();'
                    })
                    .attr(cfg.attributes)
                    .attr(cfg.params)
                    .css({
                        display: 'block',
                        width: _appendPX(width),
                        height: _appendPX(height)
                    })
                    .appendTo( targetEl );
                unityObject = $embed[0];
            }

            //Auto focus the new object/embed, so players dont have to click it before using it.
            //setTimeout is here to workaround a chrome bug.
            //we should not invoke focus on safari on mac. it causes some Input bugs.
            if (!ua.sf || !ua.mac) {
                setTimeout(function() {
                    unityObject.focus();
                }, 100);
            }

            if (callback) {

                callback();
            }
        },

        /**
         * Determine which installation method to use on the current platform, and return an array with their identifiers (i.e. 'ClickOnceIE', 'JavaInstall', 'Manual')
         * Take into account which previous methods might have been attempted (and failed) and skip to next best method.
         * 确定在当前平台上使用的安装方法，并返回一个数组，它们的标识符（即“ClickOnceIE”，“JavaInstall'，'手动'）
         * 考虑到以前的方法已经尝试（失败），并跳到下一个最好的方法。
         * @public
         * @return {String}
         */
        getBestInstallMethod: function () {

            // Always fall back to good old manual (download) install.
            var method = 'Manual';

            // Is Java available and not yet attempted?
            if (cfg.enableJava && ua.java && triedJavaInstall === false) {

                method = 'JavaInstall';
            }
            // Is ClickOnce available and not yet attempted?
            else if (cfg.enableClickOnce && ua.co && triedClickOnce === false) {

                method = 'ClickOnceIE';
            }

            return method;
        },

        /**
         * Tries to install the plugin using the specified method.
         * If no method is passed, it will try to use this.getBestInstallMethod()
         * 尝试使用指定的方法安装插件。
         * 如果没有方法获得通过，它会尝试使用this.getBestInstallMethod（）
         * @public
         * @param {String} method The desired install method
         */
        installPlugin: function(method) {
            if (method == null || method == undefined) {
                method = this.getBestInstallMethod();
            }

            var urlToOpen = null;
            switch(method) {

                case "JavaInstall":
                    this.doJavaInstall(cfg.targetEl.id);
                    break;
                case "ClickOnceIE":
                    //urlToOpen = this.getClickOnceURL();
                    //window.location = urlToOpen;
                    var $iframe = jQuery("<iframe src='" + this.getClickOnceURL() + "' style='display:none;' />");
                    jQuery(cfg.targetEl).append($iframe);
                    break;
                default:
                case "Manual":
                    //doc.location = this.getPluginURL();
                    //urlToOpen = this.getPluginURL();
                    var $iframe = jQuery("<iframe src='" + this.getPluginURL() + "' style='display:none;' />");
                    jQuery(cfg.targetEl).append($iframe);
                    break;
            }

            lastType = method;
            _an.send(kStart, method, null, null);

        },

        /**
         * Trigger event using jQuery(document).trigger() 触发事件使用jQuery（文件）.触发（）
         * @public
         */
        //TODO: verify its use.
        trigger: function (event, params) {

            if (params) {

                debug('trigger("' + event + '")', params);

            } else {

                debug('trigger("' + event + '")');
            }

            jQuery(document).trigger(event, params);
        },

        /**
         * Notify observers about onProgress event 通知观察者关于进程事件
         * @public
         */
        notifyProgress: function (targetEl) {

            //debug('*** notifyProgress ***')
            //  alert("notifyProgress is running");
            if (typeof progressCallback !== "undefined" && typeof progressCallback === "function") {

                var payload = {

                    ua: ua,
                    pluginStatus: pluginStatus,
                    bestMethod: null,
                    lastType: lastType,
                    targetEl: cfg.targetEl,
                    unityObj: this
                };

                if (pluginStatus === kMissing) {

                    payload.bestMethod = this.getBestInstallMethod();
                }

                if (latestStatus !== pluginStatus) { //Execute only on state change
                    latestStatus = pluginStatus;

                    progressCallback(payload);
                }
            }
        },

        /**
         * Subscribe to onProgress notification   订阅onProgress通知
         * @public
         */
        observeProgress: function (callback) {

            progressCallback = callback;
        },


        /**
         * Callback made by the WebPlayer plugin when the first frame is rendered.
         * 返回由WebPlayer也当第一帧被渲染的插件。
         * @public
         */
        firstFrameCallback : function () {
            // alert("firstFrameCallback is running");
            //	alert(gs_CurrScreen+","+gs_CurrSys);
            /*
             if(gs_CurrScreen=="d" && gs_CurrSys=="ydqj"){
                 parent.leftFrameset.cols = "290,10,*,0,10,30%";
             }else{
                 parent.leftFrameset.cols = "290,10,*,0,10,0";
             }
                if(parent.MapFrame_E.usearth){
                 parent.MapFrame_E.usearth.Suicide();
             }
             */
            //parent.MapFrame_E.location.href="";
            //parent.MapFrame.focus();
            //document.focus();
            debug('*** firstFrameCallback (' + instanceNumber + ') ***');
            pluginStatus = kFirst;
            this.notifyProgress();

            /*
            // What?
            if (status == kFirst) {
                if (pluginStatus == null) {
                    return;
                }
            }
            */

            //Webplayer was already installed.
            //Should only log firstframes if it happened after a install.
            if (wasMissing === true) {
                _an.send(pluginStatus, lastType);
            }

            //setRunStatus(kFirst, lastType);
        },

        /**
         * Get a string from a session cookie or SessionStorage
         * @public
         * @return {String}
         */
        /*getSessionString: function (key) {

        },*/

        /**
         * Set a string via a session cookie or SessionStorage
         * @public
         */
        /* setSessionString: function (key, value) {

         },*/

        /**
         * Get a string from a persistent cookie
         * @public
         * @return {String}
         */
        /*getCookie: function (key) {

        },*/

        /**
         * Set a string to a persistent cookie
         * @public
         */
        /*setCookie: function (key, value, expiryDate) {

        },*/

        /**
         * Exposed private function  裸露的私有函数
         * @public
         */
        setPluginStatus: function (status, type, data, url) {

            _setPluginStatus(status, type, data, url);
        },

        /**
         * Exposed private function
         * @public
         */
        doJavaInstall : function (id) {

            _doJavaInstall(id);
        },

        /**
         * Exposed private function
         * @public
         */
        jvmPreloaded : function (id) {

            _jvmPreloaded(id);
        },

        /**
         * Exposed private function
         * @public
         */
        appletStarted : function (id) {

            _appletStarted(id);
        },

        /**
         * Exposed private function
         * @public
         */
        javaInstallDoneCallback : function (id, success, errormessage) {

            _javaInstallDoneCallback(id, success, errormessage);
        },

        getUnity: function() {
            return unityObject;
        }
    }

    // Internal store of each instance.   内部存储的每个实例
    instanceNumber = UnityObject2.instances.length;
    UnityObject2.instances.push(publicAPI);

    return publicAPI;

};

/**
 * @static
 **/
UnityObject2.instances = [];