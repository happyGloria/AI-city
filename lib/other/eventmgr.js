/**
 * Created by lihouhua on 2016/12/15.
 */
/**
 * 事件托管控制
 */
    "use strict";

    /**
     * 获取对象类型
     * @param item - 对象
     * @returns {*}
     */
    var typeOf = function (item) {
        if (!item) {
            return "null";
        }
        if (item.$family) {
            return item.$family();
        }
        if (item.nodeName) {
            if (item.nodeType === 1) {
                return "element";
            }
            if (item.nodeType === 3) {
                return (/\S/).test(item.nodeValue) ? "textnode" : "whitespace";
            }
        } else if (typeof item.length === 'number') {
            if (item.callee) {
                return "arguments";
            }
            if ("item" in item) {
                return "collection";
            }
        }
        return typeof item;
    };

    var removeOn = function (string) {
        return string.replace(/^on([A-Z])/, function (full, first) {
            return first.toLowerCase();
        });
    };

    var isEnumerable = function (item) {
        return (item !== null && typeof item.length === 'number' && toString.call(item) !== '[object Function]');
    };

    /**
     * 拷贝类数组对象
     * @param item - 参数
     * @returns {*}
     */
    var arrFrom = function (item) {
        if (typeof item !== 'string' && this.isEnumerable(item) && this.typeOf(item) !== 'array') {
            var i = item.length,
                array = new Array(i);
            while (i--) {
                array[i] = item[i];
            }
            return array;
        }
        return this.arrFrom(item);
    };

    var Events = function () {
    };

    Events.prototype = {

        $events: {},

        addEvent: function (type, fn, internal) {
            type = removeOn(type);
            this.$events[type] = (this.$events[type] || []).include(fn);
            if (internal) {
                fn.internal = true;
            }
            return this;
        },

        addEvents: function (events) {
            for (var type in events) {
                this.addEvent(type, events[type]);
            }
            return this;
        },

        fireEvent: function (type, args, delay) {
            var self = this;
            type = removeOn(type);
            var events = self.$events[type];
            if (!events) {
                return self;
            }
            args = arrFrom(args);
            $.each(events, function (index, fn) {
                if (delay) {
                    fn.delay(delay, self, args);
                } else {
                    fn.apply(self, args);
                }
            });
            return self;
        },
        removeEvent: function (type, fn) {
            type = removeOn(type);
            var events = this.$events[type];
            if (events && !fn.internal) {
                var index = events.indexOf(fn);
                if (index !== -1) {
                    delete events[index];
                }
            }
            return this;
        },
        removeEvents: function (events) {
            var type;
            if (typeOf(events) === "object") {
                for (type in events) {
                    this.removeEvent(type, events[type]);
                }
                return this;
            }
            if (events) {
                events = removeOn(events);
            }
            for (type in this.$events) {
                if (events && events !== type) {
                    continue;
                }
                var fns = this.$events[type];
                for (var i = fns.length; i--;) {
                    if (i in fns) {
                        this.removeEvent(type, fns[i]);
                    }
                }
            }
            return this;
        }
    };
