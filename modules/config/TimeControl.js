define([], function(require, exports, module) {

    function TimePanel(e, t, i) {
        this.map = e, 
        this.$el = t, 
        this.$progress = this.$el.find(".time-panel-progress"), 
        this.$btn = this.$el.find(".time-panel-btn"), 
        this.times = 0, 
        this.heatLayerMgr = i, 
        this.bindEvents(), 
        this.playing = !1, 
        this.currentTimes = 0, 
        this.interval = 30, 
        this.pace = 1, 
        this.progress = 0 
    }

    function TimeControl(e) { 
        //new NPMapLib.Control.call(this),
        //this.defaultOffset = new NPMapLib.Geometry.Size(10,10),
        this.heatLayerMgr = e.heatLayer
        //BMap.Control.call(this), 
        //this.defaultAnchor = BMAP_ANCHOR_TOP_RIGHT, 
        //this.defaultOffset = new BMap.Size(10, 10), 
        //this.heatLayerMgr = e.heatLayerManager 
    }

    $.extend(TimePanel.prototype, {
        setPace: function(e, t) { 
            t = parseInt(t), this.pace = t || this.pace, e = parseInt(e), 
            this.times = Math.ceil(e / t / 45), 
            this.backupTimes = this.times, 
            this.backupPace = this.pace 
        },

        bindEvents: function() {
            var e = this;
            this.$btn.on("click", function() { e.playing ? e.pause() : e.play() })
        },

        reset: function(e) { 
            this.playing = !1, 
            this.currentTimes = 0, 
            this.progress = 0, 
            this.$progress.css("left", "0"), 
            this.pause()
            //e && this.heatLayerMgr.reset() 
        },

        show: function(e) {
            var t = new Date,
                i = t.getFullYear(),
                a = t.getMonth() + 1,
                s = t.getDate(),
                n = t.getHours(),
                r = t.getMinutes();
            n = 10 > n ? "0" + n : n, r = 10 > r ? "0" + r : r, this.$el.find(".time-panel-date").text(i + "." + a + "." + s), this.$el.find(".time-panel-time").text(n + ":" + r);
            var o = [],
                p = '<span class="time-panel-progress-tick">%time%</span>';
            if ("hour" === e)
                for (var l = 7; l >= 0; l--) {
                    var m = new Date;
                    m.setTime(t - 36e5 * l), o.push(p.replace("%time%", m.getHours()))
                } else
                    for (var l = 6; l >= 0; l--) {
                        var m = new Date;
                        m.setTime(t - 864e5 * l), o.push(p.replace("%time%", m.getMonth() + 1 + "." + m.getDate()))
                    }
            this.$el.find(".time-panel-progress-text").html(o.join("")), this.$el.removeClass().addClass("time-panel-" + e), this.$el.show()
        },

        hide: function() { 
            this.pause(), 
            this.$el.hide() 
        },

        pause: function() { 
            clearTimeout(this.timeoutID), 
            this.playing = !1, 
            this.$btn.addClass("play") 
        },

        play: function() {
            var e = this;
            this.playing = !0, 
            this.$btn.removeClass("play"), 
            this.currentTimes >= this.times && (this.currentTimes = 0, 
            this.progress = 0, 
            this.$progress.css("left", "0")), 
            this.timeoutID = setTimeout(function() { e._tick() }, this.interval)
        },

        _tick: function() {
            var e = this,
               t = 244;
            this.progress < 1e3 ? (this.progress++, this.progress / 10 > this.currentTimes / this.times * 100 && (this.currentTimes++, this.heatLayerMgr.updateLayer((this.times - this.currentTimes - 1) * this.pace)), this.$progress.css("left", this.progress / 1e3 * t + "px"), this.timeoutID = setTimeout(function() { e._tick() }, this.interval)) : this.pause()
        }
    }),

    //TimeControl.prototype = new BMap.Control, 
    TimeControl.prototype = new NPMapLib.Control,
    $.extend(TimeControl.prototype, {
        initialize: function(map) {
            var style = "#time-control-btns{overflow:hidden}.time-control-btn{margin-left:5px;padding:5px 10px;border:1px solid #acb2bb;background:#fff;color:#000;text-decoration:none;float:left}.time-control-btn.active{background:#278df2;color:#fff}#time-panel{background:rgba(255,255,255,.8);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#CCFFFFFF, endColorstr=#CCFFFFFF);border:1px solid #acb2bb;padding:13px;margin-top:5px;width:295px;overflow:hidden;position:absolute;top:32px;right:0;display:none}.time-panel-title{font-weight:700;font-size:14px}.time-panel-title .time-panel-time{font-size:12px;font-weight:400;margin-left:10px}.time-panel-control{overflow:hidden}.time-panel-progress-container{float:left;width:252px}.time-panel-progress-bar{background:url(http://webmap0.map.bdstatic.com/newheatmap/static/index/images/time-progress-bar_3d8a295.png?__sprite) no-repeat right 0;width:252px;height:8px;position:relative;margin-top:10px}.time-panel-progress-text{overflow:hidden;margin-top:-3px;width:270px;position:relative;left:-5px}.time-panel-progress-tick{float:left;background:url(http://webmap0.map.bdstatic.com/newheatmap/static/index/images/tick_72211ea.png?__sprite) no-repeat 50% 0;padding-top:7px;width:12.5%;text-align:center;*width:12.4%}.time-panel-week .time-panel-progress-tick{width:14.28%;*width:14.2%}.time-panel-progress{background:url(http://webmap0.map.bdstatic.com/newheatmap/static/index/images/time-progress_cb28985.png?__sprite) no-repeat 0 0;width:16px;height:16px;position:absolute;top:-5px;left:0}.time-panel-btn{background:url(http://webmap0.map.bdstatic.com/newheatmap/static/index/images/time-btn-pause_8c55183.png?__sprite) no-repeat 0 0;width:33px;height:33px;float:right;cursor:pointer}.time-panel-btn.play{background:url(http://webmap0.map.bdstatic.com/newheatmap/static/index/images/time-btn-play_22fead8.png?__sprite) no-repeat 0 0}";
            //require.loadCss({ content: style });
            var template = [function(_template_object) {
                    var _template_fun_array = [],
                        fn = function(__data__) {
                            var _template_varName = "";
                            for (var name in __data__) _template_varName += "var " + name + '=__data__["' + name + '"];';
                            eval(_template_varName), _template_fun_array.push('<div id="time-control">    <div id="time-control-btns">        <a data-pace="1" data-minutes="480" id="time-control-8hours" class="time-control-btn active" href="javascript:void(0)" onclick="ccStat(\'show_8_hours\')">查看近8小时动态图</a>        <a data-pace="20" data-minutes="10080" id="time-control-week" class="time-control-btn" href="javascript:void(0)" onclick="ccStat(\'show_1_weeks\')">查看近1周动态图</a>    </div>    <div id="time-panel">        <div class="time-panel-title"><span class="time-panel-date"></span><span class="time-panel-time"></span></div>        <div class="time-panel-control">            <div class="time-panel-progress-container">                <div class="time-panel-progress-bar"><span class="time-panel-progress"></span></div>                <div class="time-panel-progress-text">                </div>            </div>            <div class="time-panel-btn"></div>        </div>    </div></div>'), _template_varName = null
                        }(_template_object);
                    return fn = null, _template_fun_array.join("")
                }][0],
                html = template();
                //debugger;
            this.$element = $(html);
            var element = this.$element[0];
            return map.getContainer().appendChild(element), this.timePanel = new TimePanel(map, $("#time-panel"), this.heatLayerMgr), this.bindEvents(), this.showTimePanel("hour", 480, 1), element
        },

        showTimePanel: function(e, t, i) { 
            this.timePanel.show(e), 
            this.timePanel.setPace(t, i), 
            this.timePanel.reset() 
        },
        hideTimePanel: function() { 
            this.timePanel.hide(), 
            this.timePanel.reset(!0) 
        },

        bindEvents: function() {
            var e = this,
                t = this.$element.find(".time-control-btn");
            t.on("click", function() {
                var i = $(this);
                return i.hasClass("active") ? (i.removeClass("active"), void e.hideTimePanel()) : (t.removeClass("active"), i.addClass("active"), e.showTimePanel("time-control-8hours" === this.id ? "hour" : "week", i.data("minutes"), i.data("pace")), void 0)
            })
        }
    });

    return TimeControl;
});
