/**
 * 人脸系统播放器业务控制对象
 */
    window.sTLicenseServerHost = '10.33.252.86';
    window.sTLicenseServerPort = 9012;
    window.ocxConfig = {"displayscale":"16:9","faceproperty":{"enable":false,"style":0,"color":16758826,"hitcolor":3378687,"alpha":0.6,"width":100,"height":60,"kfillcolor":0.5,"bevel":8,"bloder":1,"gap":1,"font":{"name":"宋体","size":12,"color":16777215}},"faceframe":{"enable":false,"style":0,"color":16758826,"hitcolor":3378687,"bevel":8,"linewidth":2,"alpha":1},"faceminmaxpix":{"enable":false,"style":0,"color":255,"linewidth":2,"alpha":1,"minfaceminlimit":60,"maxfacemaxlimit":100,"min":{"cx":100,"cy":100},"max":{"cx":200,"cy":200}},"detectionarea":{"enable":false,"style":0,"color":65280,"linewidth":2,"alpha":1,"widthminlimit":120,"heightminlimit":120,"range":{"x":0,"y":0,"w":1,"h":1}}};
    var Player = function (options) {
        var self = this;
        //初始化
        $.extend(self.options, options);
        //初始化播放器对象  xc:就是那个object标签节点
        self.playerObj = document.getElementById(self.options.ocxid);
        //初始化配置
        self.playerObj.SetConfig(JSON.stringify(window.ocxConfig));
        //绑定事件
        self.bindEvents();
    };
    //继承事件
    //Player.prototype = new Events();
    //扩展事件
    Player.prototype = $.extend({}, Player.prototype, {
        //当前的播放器对象
        playerObj: null,
        //配置参数
        options: {
            ocxid: "UIOCX",
            //播放参数
            playParam: {
                "ip": "192.168.60.209",
                "port": 2100,
                "user": "admin",
                "passwd": "admin",
                "path": "av/vs800/9"
            },
            //推送参数
            MQParam: {
                activeMQURL: "tcp://192.168.60.209:61616",
                topicName: "192.168.60.209:2100@av/vs800/9"
            },
            //回调
            callback: {
                playCallback: $.noop
            }
        },
        /**
         * 对外暴露事件接口
         * @param name - 事件的名字
         * @param fn - 事件的回调函数
         */
        on: function (name, fn) {
            var self = this;
            //构造别名
            var EventNames = {
                "click": "Click",
                "dblclick": "DblClick",
                "mouseleave": "MouseLeave",
                "mouseenter": "MouseEnter",
                "minmaxchanged": "MinMaxPixChanged",
                "detectionareachanged":"DetectionAreaChanged"
            };
            //匹配
            for (var x in EventNames) {
                if (EventNames.hasOwnProperty(x) && name === x) {
                    //获取ocx原生事件
                    name = EventNames[x];
                }
            }
            //给对象添加事件
            //self.addEvent(name, fn);
        },
        /**
         * 播放器对象事件
         */
        bindEvents: function () {
            var self = this;
            var EventList = [
                "Click",    //单击事件
                "DblClick", //双击事件
                "MouseLeave", //鼠标移出事件
                "MouseEnter", //鼠标移入事件
                "MinMaxPixChanged", //最小最大像素框变化事件
                "DetectionAreaChanged" //人脸检测区域变动事件
            ];
            /**
             * 事件绑定程序
             * @param name - 事件响应名字
             */
            var func = function (name) {
                return function() {
                    //在响应事件中触发自定义事件回调
                    Events.prototype.fireEvent(name, arguments);
                };
            };
            //遍历
            $.each(EventList, function(index) {
                var name = EventList[index] + "";
                if (self.playerObj.attachEvent) {
                    //取消绑定
                    self.playerObj.detachEvent("on" + name, func);
                    //绑定事件
                    self.playerObj.attachEvent("on" + name, func.call(self, name, arguments));
                } else {
                    //取消绑定
                    self.playerObj.removeEventListener(name, func, false);
                    //绑定事件
                    self.playerObj.addEventListener(name, func.call(self, name, arguments), false);
                }
            });
        },
        /**
         * 播放主函数
         */
        play: function () {
            var self = this,
                playParamStr = JSON.stringify(self.options.playParam);

            //先调用关闭接口
            self.stop();
            //调用播放接口
            self.playerObj.SetConfig(JSON.stringify(window.ocxConfig));
            self.playerObj.Play(playParamStr, self.options.MQParam.activeMQURL, self.options.MQParam.topicName, self.options.callback.playCallback, 0);
            return self;
        },
        /**
         * 关闭主函数
         */
        stop: function () {
            var self = this;
            try {
                var res = self.playerObj.Stop();
                if (res !== 0) {
                    consoles.log("关闭播放器失败");
                } else {
                    consoles.log("成功关闭播放器");
                }
            } catch (e) {}
        },
        /**
         * 设置ocx参数
         * @param data - 参数信息，json对象
         * @returns {Player}
         */
        setOptions: function (data) {
            var self = this;
            self.playerObj.SetOption(JSON.stringify(data));
            return self;
        }
    });

