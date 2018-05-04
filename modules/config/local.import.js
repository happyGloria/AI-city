/**
 * 用于上传图片
 */
define([
    "jquery",
    "webuploader"
], function(jQuery, webuploader) {

    "use strict";

    return (function (scope, $) {

        var //上传文件对象
            _uploader = null,
            //参数对象
            _options = {
                url: "",
                param: "",
                btn: null,
                uploadBeforeSend: null,
                bigView: null,
                setTargetOnQueue: null,
                uploadSingleSuccess: null,
                uploadSingleFail: null,
                useThumb: true,
                autoUpload: false
            },
            //当前触发上传的dom元素对象
            _curTarget = "",
            /**
             * 初始化上传插件
             * @private
             */
            _init = function() {
                //上传参数配置
                var uploaderParam = {
                    fileSingleSizeLimit: 10 * 1024 * 1024, //单个文件大小限制不能超过10M
                    swf: '/lib/uploader/Uploader.swf',
                    server: _options.url,
                    fileVal: _options.param,
                    threads: 5, //允许5个并发上传
                    duplicate: true, //去重
                    disableGlobalDnd: true, //禁掉整个页面的拖拽功能
                    auto: _options.autoUpload,
                    accept: {
                        title: 'intoTypes',
                        extensions: 'jpg,jpeg,bmp,png',
                        mimeTypes: '.jpg,.jpeg,.bmp,.png'
                    },
                    thumb: {
                        width: 220,
                        height: 270,
                        // 是否允许放大，如果想要生成小图的时候不失真，此选项应该设置为false.
                        allowMagnify: false,
                        // 否则强制转换成指定的类型。
                        type: 'image/png'
                    }
                };
                //创建上传对象
                _uploader = webuploader.create(uploaderParam);
                //添加图片选择按钮
                $(_options.btn).each(function(index, item) {
                    _uploader.addButton({
                        id: "#" + $(item).attr("id"),
                        multiple: false //控制同时选择多个文件的功能
                    });
                });
                //绑定事件	诸如uploadsuccess那些
                _bindUploaderEvents();
            },
            /**
             * 绑定上传事件
             * @private
             */
            _bindUploaderEvents = function() {
                if(_options.useThumb) {
                    // 当有文件被添加进队列的时候
                    _uploader.on('fileQueued', function (file) {
                        _curTarget = this.target;
                        //处理缩略图
                        _uploader.makeThumb(file, function (error, ret) {
                            if (error) {
                                //$li.text('error');
                            } else {
                                //填充小图片区域, 人员上传时用
                                if (_options.setTargetOnQueue) {
                                    _options.setTargetOnQueue(_curTarget, ret, file.id);
                                }
                                //填充大图片区域
                                if (_options.bigView) {
                                    _options.bigView.attr("src", ret);
                                }
                            }
                        });
                    });
                }
                //文件上传前，对请求参数进行扩展
                _uploader.on('uploadBeforeSend', _options.uploadBeforeSend);
                //文件上传成功
                _uploader.on('uploadSuccess', function(file, res) {
                    _options.uploadSingleSuccess(file, res, _curTarget);
                });
                //文件上传失败
                _uploader.on('uploadError', _options.uploadSingleFail);
                //文件处理出错
                _uploader.on('error', scope.validateError);
            };

        /**
         * 文件校验失败情况下的事件回调
         * @param msg - 校验错误类型
         * @param file - 当前上传的图片对象[, file]
         */
        scope.validateError = function(msg) {
            if(msg === "Q_TYPE_DENIED") {
                notify.warn("图片类型须为.jpg,.jpeg,.bmp,.png");
            } else if(msg === "Q_EXCEED_SIZE_LIMIT") {
                notify.warn("图片大小不能超过10M");
            } else {
                notify.warn("图片校验失败，请重新上传");
            }
        };
        /**
         * 触发上传，提交数据
         */
        scope.startUpload = function() {
            _uploader.upload();
        };
        /**
         * 获取已选择的文件个数，用于保存
         * @returns {*}
         */
        scope.getSelectedFiles = function() {
            var selectFilesArr = _uploader.getFiles("queued", "inited");
            return selectFilesArr.length;
        };
        /**
         * 根据id删除队列中的已选图片
         * @param fileId - 文件id
         */
        scope.removeFile = function(fileId) {
            _uploader.removeFile(fileId, true);
        };
        /**
         * 销毁插件
         */
        scope.destroy = function() {
            if(_uploader) {
                _uploader.destroy();
                _uploader = null;
            }
        };
        /**
         * 初始化插件
         * @param options - 插件配置项
         */
        scope.init = function(options) {
            //存储参数
            $.extend(_options, options);
            //初始化上传插件
            _init();
        };

        return scope;

    }({}, jQuery));

});
