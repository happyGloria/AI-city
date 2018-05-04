/**
 * Created by admin on 2016/9/1.
 */
define(['config/dataCollisionConfig'],
    function (dataCollisionConfig) {
        /**
         * paramObj{
         *  value: 检查的值
         *  type： 数据类型
         *  name: 字段名称
         *  isNull: 是否为空检查true false
         *  length: 长度
         * }
         */
        function checking(paramObj)
        {
            var _globalReg = null;
            if(paramObj.isNull)
            {
                if(paramObj.value != undefined && paramObj.value != '')
                {
                    var _type = dataCollisionConfig.fieldType[paramObj.name];

                    if(_type)
                    {
                        console.log('333333',_type.toString());
                        if(_type.toString() != 'DATE' && _type.toString() != 'DATETIME')
                        {
                            if(_type.toString() === 'INT')
                            {
                                _globalReg = /^[0-9]+$/;
                            }
                            else if(_type.toString() === 'FLOAT')
                            {
                                _globalReg = /^[0-9]+(\.[0-9]{1,2})?$/;
                            }
                        }
                        else
                        {

                            paramObj.isResult = true;
                            paramObj.type = 'DATE';
                        }
                    }
                    else
                    {
                        if(paramObj.name === 'sex' || dataCollisionConfig.referenceDirectory[paramObj.name] === undefined)
                        {
                            paramObj.isResult = true;
                            paramObj.type = 'SEX';
                        }
                        else {
                            var _length = dataCollisionConfig.referenceDirectory[paramObj.name][1];
                            if (paramObj.length > _length) {
                                paramObj.isResult = false;
                                paramObj.resultMessage = '字段长度超长！';
                            }
                            else {
                                _globalReg = dataCollisionConfig.referenceDirectory[paramObj.name][2];
                                if (_globalReg && !_globalReg.test(paramObj.value)) {
                                    paramObj.isResult = false;
                                    paramObj.resultMessage = dataCollisionConfig.referenceDirectory[paramObj.name][0];
                                }
                                else {
                                    paramObj.isResult = true;
                                }
                            }
                        }
                    }
                }
                else
                {
                    paramObj.isResult = false;
                    paramObj.resultMessage = '输入框不能为空！';
                }
            }
            else
            {
                if(paramObj.name === 'sex')
                {
                    paramObj.isResult = true;
                    paramObj.type = 'SEX';
                }
                else {
                    var _length = dataCollisionConfig.referenceDirectory[paramObj.name][1];
                    if (paramObj.length > _length) {
                        paramObj.isResult = false;
                        paramObj.resultMessage = '字段长度超长！';
                    }
                    else {
                        _globalReg = dataCollisionConfig.referenceDirectory[paramObj.name][2];
                        if (_globalReg && !_globalReg.test(paramObj.value)) {
                            paramObj.isResult = false;
                            paramObj.resultMessage = dataCollisionConfig.referenceDirectory[paramObj.name][0];
                        }
                        else {
                            paramObj.isResult = true;
                        }
                    }
                }
            }

            return paramObj;
        }

        return {
            checking : checking
        };
    }
);
