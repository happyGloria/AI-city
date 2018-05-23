/**
 * Created by jgx on 2016/5/12.
 */
define([''], function () {
    return {
        //手机号码
        phoneNumber: /^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/,
        phoneNumberBlur: /^1[3|4|5|7|8][\d][\d\?]{0,8}$/,

        phoneNumbers: /^((13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8})?(,(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}?)*$/,
        //QQ号
        qqNumber: /^[1-9][0-9]{5,9}$/,

        qqNumbers: /^([1-9][0-9]{5,9})?(,[1-9][0-9]{5,9}?)*$/,
        //车牌号
        plateNumber: /^[\u4E00-\u9FA5][\da-zA-Z]{6}$/,
        plateNumberBlur: /^[\u4eac\u6d25\u5180\u664b\u8499\u8fbd\u5409\u9ed1\u6caa\u82cf\u6d59\u7696\u95fd\u8d63\u9c81\u8c6b\u9102\u6e58\u7ca4\u6842\u743c\u6e1d\u5ddd\u8d35\u4e91\u85cf\u9655\u7518\u9752\u5b81\u65b0][a-zA-Z][\da-zA-Z\?]{0,5}$/,
        //plateNumberBlur: /^([\u4E00-\u9FA5]|\?){1}([\da-zA-Z]|\?)*$/,

        plateNumbers: /^([\u4E00-\u9FA5][\da-zA-Z]{6})?(,[\u4E00-\u9FA5][\da-zA-Z]{6}?)*$/,
        //身份证号码
        idCardNo: /^\d{15}(\d{2}(\d|x))?$/i,
        idCardNoBlur: /^(\d|\?){6,17}(\d|\?|x)?$/i,

        idCardNos: /^\d{15}(\d{2}(\d|x))?(,\d{15}(\d{2}(\d|x))?)*$/i,

        //警号6~7位数字
        policeNo: /^\d{6,7}$/,

        policeNos: /^(\d{6,7})?(,\d{6,7}?)*$/,

        //角色编码不为中文
        roleCode: /^[^\u4e00-\u9fa5]{0,32}$/,

        //ip地址
        ///^(([1-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5])))\.)((d|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5])))\.){2}([1-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5])))$/
        ip: /^((25[0-5])|(2[0-4]\d)|(1\d\d)|([1-9]\d)|\d)(\.((25[0-5])|(2[0-4]\d)|(1\d\d)|([1-9]\d)|\d)){3}$/,

        //端口号
        port: /^[\d]{1,5}$/,

        //是否为数字
        isNumber: /^[1-9]*[1-9][0-9]*$/,

        //人脸系统登录名和登录密码
        face_url: 'http://15.128.21.207/html/index.html',
        face_username: 'pbd',
        face_password: 'e10adc3949ba59abbe56e057f20f883e',
        //==================getUrl===============================
        getUrl:function(url){
            if(url){
        	    return '/zhsq/file/show?path='+url;
            }else{
                return null;
            }
        },
        //================================ datetimepicker 日历  ===========================
        //在固定日期上添加几天
        addDays: function (date, value) {
            date.setDate(date.getDate() + value);
            return date;
        },
        //在固定日期上添加几秒
        addSeconds: function (date, value) {
            date.setSeconds(date.getSeconds() + value);
            return date;
        },

        //将日期对象转换为字符串,格式为2016/05/05 12:05:24
        changeDateToString: function (DateIn) {
            var Year = 0;
            var Month = 0;
            var Day = 0;
            var Hour = 0;
            var Minute = 0;
            var Second = 0;
            var CurrentDate = "";

            //初始化时间
            Year = DateIn.getYear() + 1900;
            Month = DateIn.getMonth() + 1;
            Day = DateIn.getDate();
            Hour = DateIn.getHours();
            Minute = DateIn.getMinutes();
            Second = DateIn.getSeconds();

            CurrentDate = Year + "-";
            if (Month >= 10) {
                CurrentDate = CurrentDate + Month + "-";
            }
            else {
                CurrentDate = CurrentDate + "0" + Month + "-";
            }
            if (Day >= 10) {
                CurrentDate = CurrentDate + Day;
            }
            else {
                CurrentDate = CurrentDate + "0" + Day;
            }

            if (Hour >= 10) {
                CurrentDate = CurrentDate + " " + Hour;
            }
            else {
                CurrentDate = CurrentDate + " 0" + Hour;
            }

            if (Minute >= 10) {
                CurrentDate = CurrentDate + ":" + Minute;
            }
            else {
                CurrentDate = CurrentDate + ":0" + Minute;
            }

            if (Second >= 10) {
                CurrentDate = CurrentDate + ":" + Second;
            } else {
                CurrentDate = CurrentDate + ":0" + Second;
            }
            return CurrentDate;
        },
        //将日期对象转换为字符串,格式为2016年5月5日 12:05:24
        changeDaToString: function (DateIn) {
            var Year = 0;
            var Month = 0;
            var Day = 0;
            var Hour = 0;
            var Minute = 0;
            var Second = 0;
            var CurrentDate = "";

            //初始化时间
            Year = DateIn.getYear() + 1900;
            Month = DateIn.getMonth() + 1;
            Day = DateIn.getDate();
            Hour = DateIn.getHours();
            Minute = DateIn.getMinutes();
            Second = DateIn.getSeconds();

            CurrentDate = Year + "年";
            CurrentDate = CurrentDate + Month + "月";
            CurrentDate = CurrentDate + Day + "日";

            if (Hour >= 10) {
                CurrentDate = CurrentDate + " " + Hour;
            }
            else {
                CurrentDate = CurrentDate + " 0" + Hour;
            }

            if (Minute >= 10) {
                CurrentDate = CurrentDate + ":" + Minute;
            }
            else {
                CurrentDate = CurrentDate + ":0" + Minute;
            }

            if (Second >= 10) {
                CurrentDate = CurrentDate + ":" + Second;
            } else {
                CurrentDate = CurrentDate + ":0" + Second;
            }
            return CurrentDate;
        },

        //将日期对象转换为字符串,格式为2016-05-05(无时分秒)
        changeDayToString: function (DateIn, showHour) {
            var Year = 0;
            var Month = 0;
            var Day = 0;
            var Hour = 0;
            var Minute = 0;
            var Second = 0;
            var CurrentDate = "";

            //初始化时间
            Year = DateIn.getYear() + 1900;
            Month = DateIn.getMonth() + 1;
            Day = DateIn.getDate();
            Hour = DateIn.getHours();
            Minute = DateIn.getMinutes();
            Second = DateIn.getSeconds();

            CurrentDate = Year + "-";
            if (Month >= 10) {
                CurrentDate = CurrentDate + Month + "-";
            }
            else {
                CurrentDate = CurrentDate + "0" + Month + "-";
            }
            if (Day >= 10) {
                CurrentDate = CurrentDate + Day;
            }
            else {
                CurrentDate = CurrentDate + "0" + Day;
            }

            if (!!showHour) {
                if (Hour >= 10) {
                    CurrentDate = CurrentDate + " " + Hour;
                }
                else {
                    CurrentDate = CurrentDate + " 0" + Hour;
                }

                if (Minute >= 10) {
                    CurrentDate = CurrentDate + ":" + Minute;
                }
                else {
                    CurrentDate = CurrentDate + ":0" + Minute;
                }

                if (Second >= 10) {
                    CurrentDate = CurrentDate + ":" + Second;
                }
                else {
                    CurrentDate = CurrentDate + ":0" + Second;
                }
            }

            return CurrentDate;
        },

        //将日期对象转换为字符串,格式为2016.05.05 13:01
        changeDayToObject: function (DateIn) {
            var Year = 0;
            var Month = 0;
            var Day = 0;
            var Hour = 0;
            var Minute = 0;
            var Second = 0;
            var CurrentDate = "";
            debugger
            //初始化时间
            Year = DateIn.getYear() + 1900;
            Month = DateIn.getMonth() + 1;
            Day = DateIn.getDate();
            Hour = DateIn.getHours();
            Minute = DateIn.getMinutes();

            CurrentDate = Year + ".";
            CurrentDate = CurrentDate + Month + ".";
            CurrentDate = CurrentDate + Day;

            if (Hour >= 10) {
                CurrentDate = CurrentDate + " " + Hour;
            }
            else {
                CurrentDate = CurrentDate + " 0" + Hour;
            }

            if (Minute >= 10) {
                CurrentDate = CurrentDate + ":" + Minute;
            }
            else {
                CurrentDate = CurrentDate + ":0" + Minute;
            }


            return CurrentDate;
        },//将日期对象转换为字符串,格式为2016.05.05 13:01
        changeDayToObject: function (DateIn) {
            var Year = 0;
            var Month = 0;
            var Day = 0;
            var Hour = 0;
            var Minute = 0;
            var Second = 0;
            var CurrentDate = "";

            //初始化时间
            Year = DateIn.getYear() + 1900;
            Month = DateIn.getMonth() + 1;
            Day = DateIn.getDate();
            Hour = DateIn.getHours();
            Minute = DateIn.getMinutes();

            CurrentDate = Year + ".";
            CurrentDate = CurrentDate + Month + ".";
            CurrentDate = CurrentDate + Day;

            if (Hour >= 10) {
                CurrentDate = CurrentDate + " " + Hour;
            }
            else {
                CurrentDate = CurrentDate + " 0" + Hour;
            }

            if (Minute >= 10) {
                CurrentDate = CurrentDate + ":" + Minute;
            }
            else {
                CurrentDate = CurrentDate + ":0" + Minute;
            }


            return CurrentDate;
        },
        //将日期对象转换为字符串,格式为2016-05-05 13:01
        _changeDayToObject: function (DateIn) {
            var Year = 0;
            var Month = 0;
            var Day = 0;
            var Hour = 0;
            var Minute = 0;
            var Second = 0;
            var CurrentDate = "";

            //初始化时间
            Year = DateIn.getYear() + 1900;
            Month = DateIn.getMonth() + 1;
            Day = DateIn.getDate();
            Hour = DateIn.getHours();
            Minute = DateIn.getMinutes();

            CurrentDate = Year + "-";
            if (Month >= 10) {
                CurrentDate = CurrentDate + "" + Month;
            }
            else {
                CurrentDate = CurrentDate + "0" + Month;
            }
            CurrentDate = CurrentDate + "-";

            if (Day >= 10) {
                CurrentDate = CurrentDate + "" + Day;
            }
            else {
                CurrentDate = CurrentDate + "0" + Day;
            }

            if (Hour >= 10) {
                CurrentDate = CurrentDate + " " + Hour;
            }
            else {
                CurrentDate = CurrentDate + "0" + Hour;
            }

            if (Minute >= 10) {
                CurrentDate = CurrentDate + ":" + Minute;
            }
            else {
                CurrentDate = CurrentDate + ":0" + Minute;
            }


            return CurrentDate;
        },

        /* 说明：时间格式处理(年/月/日 时:分:秒)
         *  返回值类型：对象
         */
        formatDate: function (DateIn) {
            var Year = 0;
            var Month = 0;
            var Day = 0;
            var Hour = 0;
            var Minute = 0;
            var Second = 0;
            var CurrentDate = "";
            var CurrentHms = "";//当前时分秒

            //初始化时间
            Year = DateIn.getYear() + 1900;
            Month = DateIn.getMonth() + 1;
            Day = DateIn.getDate();
            Hour = DateIn.getHours();
            Minute = DateIn.getMinutes();
            Second = DateIn.getSeconds();

            CurrentDate = Year + "/";
            if (Month >= 10) {
                CurrentDate = CurrentDate + Month + "/";
            }
            else {
                CurrentDate = CurrentDate + "0" + Month + "/";
            }
            if (Day >= 10) {
                CurrentDate = CurrentDate + Day;
            }
            else {
                CurrentDate = CurrentDate + "0" + Day;
            }

            if (Hour >= 10) {
                CurrentDate = CurrentDate + " " + Hour;
                CurrentHms = CurrentHms + Hour;
            }
            else {
                CurrentDate = CurrentDate + " 0" + Hour;
                CurrentHms = CurrentHms + " 0" + Hour;
            }

            if (Minute >= 10) {
                CurrentDate = CurrentDate + ":" + Minute;
                CurrentHms = CurrentHms + ":" + Minute;
            }
            else {
                CurrentDate = CurrentDate + ":0" + Minute;
                CurrentHms = CurrentHms + ":0" + Minute;
            }

            if (Second >= 10) {
                CurrentDate = CurrentDate + ":" + Second;
                CurrentHms = CurrentHms + ":" + Second;
            } else {
                CurrentDate = CurrentDate + ":0" + Second;
                CurrentHms = CurrentHms + ":0" + Second;
            }
            return {
                CurrentDate: CurrentDate,// 年/月/日 时：分：秒
                CurrentHms: CurrentHms // 时：分：秒
            };
        },

        //输入框调用日期插件(年/月/日 时:分:秒)
        initDatePicker: function ($dateElement, param) {
            $dateElement.datetimepicker('destroy');
            var defaultParam = {
                lang: "ch",           //语言选择中文
                format: "Y-m-d H:i:s",      //格式化日期
                timepicker: false,    //关闭时间选项
                todayButton: false,   //关闭选择今天按钮
                scrollMonth: false,    //禁用滚轮事件
                scrollTime: false,
                scrollInput: false
            };

            $dateElement.datetimepicker($.extend(defaultParam, param));
        },

        initTwoDatePicker: function ($dateElement, param) {
            $dateElement.datetimepicker('destroy');
            var defaultParam = {
                lang: "ch",           //语言选择中文
                format: "Y-m-d H:i:s",      //格式化日期
                timepicker: true,    //关闭时间选项
                todayButton: false,   //关闭选择今天按钮
                scrollMonth: false,    //禁用滚轮事件
                scrollTime: false,
                scrollInput: false
            };

            $dateElement.datetimepicker($.extend(defaultParam, param));
        },

        initOneDatePicker: function ($dateElement, param) {
            $dateElement.datetimepicker('destroy');
            var defaultParam = {
                lang: "ch",           //语言选择中文
                format: "H:i",      //格式化日期
                timepicker: true,    //关闭时间选项
                todayButton: false,   //关闭选择今天按钮
                scrollMonth: false,    //禁用滚轮事件
                scrollTime: false,
                scrollInput: false
            };

            $dateElement.datetimepicker($.extend(defaultParam, param));
        },
        
        //输入框调用日期插件
        initDayPicker: function ($dateElement, param) {
            $dateElement.datetimepicker('destroy');
            var defaultParam = {
                lang: "ch",           //语言选择中文
                format: "Y-m-d",      //格式化日期
                timepicker: false,    //关闭时间选项
                //yearStart: 2000,     //设置最小年份
                //yearEnd: 2050,        //设置最大年份
                todayButton: false,   //关闭选择今天按钮
                scrollMonth: false,    //禁用滚轮事件
                scrollTime: false,
                scrollInput: false
            };
            $dateElement.datetimepicker($.extend(defaultParam, param));
        },

        //================================ CheckBox 复选框  ===========================
        /**
         * date 2016/5/16
         * @param $container - 一组复选框最外层容器（可以通过id或class等获得）
         * @param param - 回调函数或自定义参数
         *
         */
        CheckBox: function ($container, param) {
            //是否全选
            function isAll() {
                var length = $container.find(".checkbox:not(.checkall)").length;
                var curLength = $container.find(".checkbox.checked:not(.checkall)").length;
                var $checkall = $container.find(".checkbox.checkall");
                length == curLength ? $checkall.addClass("checked") : $checkall.removeClass("checked");
            }

            //isAll();

            //全选
            $container.on("click", ".checkbox.checkall", function () {
                var $this = $(this);
                var $checkbox = $container.find(".checkbox");
                $this.hasClass("checked") ? $checkbox.removeClass("checked") : $checkbox.addClass("checked");
                if (typeof param == 'function') {
                    return param();
                } else {
                    //可以自定义param
                    return;
                }
            });

            //单选
            $container.on("click", ".checkbox:not(.checkall)", function () {
                var $this = $(this);
                $this.hasClass("checked") ? $this.removeClass("checked") : $this.addClass("checked");
                isAll();
                if (typeof param == 'function') {
                    return param();
                } else {
                    //可以自定义param
                    return;
                }
            });
        },


        //带有父级全选判断的checkbox
        CheckBoxParent: function ($container, param) {
            var parentCheckAll = $container.find(".checkbox.parentCheckAll");

            //是否全选
            function isAll(myContainer) {
                if (myContainer) {
                    var length = myContainer.find(".checkbox:not(.checkall)").length;
                    var curLength = myContainer.find(".checkbox.checked:not(.checkall)").length;
                    var $checkall = myContainer.find(".checkbox.checkall");
                    length == curLength ? $checkall.addClass("checked") : $checkall.removeClass("checked");
                }

                var length2 = $container.find(".checkbox.checkall:not(.parentCheckAll)").length;
                var curLength2 = $container.find(".checkbox.checked.checkall:not(.parentCheckAll)").length;
                length2 == curLength2 ? parentCheckAll.addClass("checked") : parentCheckAll.removeClass("checked");
            }


            //父级全选
            $container.on("click", ".checkbox.checkall.parentCheckAll", function () {
                var $this = $(this);
                var $checkbox = $container.find(".checkbox");
                $this.hasClass("checked") ? $checkbox.removeClass("checked") : $checkbox.addClass("checked");
                if (typeof param == 'function') {
                    return param();
                } else {
                    //可以自定义param
                    return;
                }
            });

            //全选
            $container.on("click", ".checkbox.checkall:not(.parentCheckAll)", function () {
                var $this = $(this);
                var $checkbox = $this.closest(".check-wrap").find(".checkbox");
                $this.hasClass("checked") ? $checkbox.removeClass("checked") : $checkbox.addClass("checked");
                isAll();
                if (typeof param == 'function') {
                    return param();
                } else {
                    //可以自定义param
                    return;
                }
            });

            //单选
            $container.on("click", ".checkbox:not(.checkall)", function () {
                var $this = $(this);
                $this.hasClass("checked") ? $this.removeClass("checked") : $this.addClass("checked");
                isAll($this.closest(".check-wrap"));
                if (typeof param == 'function') {
                    return param();
                } else {
                    //可以自定义param
                    return;
                }
            });
        },

        checkAll: function ($container, myContainer) {

            if (jQuery.isArray(myContainer)) {
                for (var i = 0; i < myContainer.length; i++) {
                    var length = myContainer[i].find(".checkbox:not(.checkall)").length;
                    var curLength = myContainer[i].find(".checkbox.checked:not(.checkall)").length;
                    var $checkall = myContainer[i].find(".checkbox.checkall");
                    length == curLength ? $checkall.addClass("checked") : $checkall.removeClass("checked");
                }
            }
            var parentCheckAll = $container.find(".checkbox.parentCheckAll");
            var length2 = $container.find(".checkbox.checkall:not(.parentCheckAll)").length;
            var curLength2 = $container.find(".checkbox.checked.checkall:not(.parentCheckAll)").length;
            length2 == curLength2 ? parentCheckAll.addClass("checked") : parentCheckAll.removeClass("checked");
        },

        getMenusNameList: function () {
            var sessionUser = sessionStorage.USER;
            var sessionUserObj = sessionUser && JSON.parse(sessionUser);
            var menuList = sessionUserObj && sessionUserObj.menuList || [];
            return _.pluck(menuList, "menuName") || [];
        }


    }
});
