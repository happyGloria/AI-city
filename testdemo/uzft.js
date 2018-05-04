/*
* 2017-11-5
* lt
* 三维API封装
* */
function Logger(paVal) {


}
var gobj_Unity;

function uzft(paDivId, paUrl, paWidth, paHeight) {
    this.url = paUrl;
    this.divid = paDivId;
    this.width = paWidth;
    this.height = paHeight;
    gobj_Unity = null;
}

//初始化
uzft.prototype.init = function () {

    var config = {
        width: this.width,
        height: this.height
    };
    gobj_Unity = new UnityObject2(config);
    gobj_Unity.initPlugin(jQuery("#" + this.divid)[0], this.url);
}
//图层
uzft.prototype.layer = {
    addLayer: function (paLayerData) {//添加图层
        gobj_Unity.getUnity().SendMessage("Main Camera", "LoadAsset", paLayerData);
    },
    controlLayer: function (paName, paState) {//图层控保制开关
        var paString = '{"name":"' + paName + '","stat":"' + paState + '"}';
        var this_ = this.tu3dobj;
        gobj_Unity.getUnity().SendMessage("Main Camera", "U_CLayersByTagName", paString);
    }
}
//获取当前场景坐标
uzft.prototype.getViewPosition = function (paCallback) {
    gobj_Unity.getUnity().SendMessage("Main Camera", "U_GetView", paCallback);
}
/*//获取当前场景坐标
uzft.prototype.screenToWorldPoint = function (paStr) {
    //paStr {x,y,z,cb}callback
    gobj_Unity.getUnity().SendMessage("Main Camera", "U_GetClickPos", paCallback);
}*/
//飞行到指定位置
uzft.prototype.flyToPos = function (paPosJson) {
    //var json = '{"px":"' + paPX + '","py":"' + paPY + '","pz":"' + paPZ + '","rx":"' + paRX + '","ry":"' + paRY + '","rz":"' + paRZ + '","rw":"' + paRW + '","dis":"' + paDis + '"}';
    //{"px":"-14.69","py":"1","pz":"11.7","rx":"-0.4004439","ry":"0.465825","rz":"-0.3121203","rw":"-0.7247294","dis":"310.7"}
    //alert(paPosJson);
    gobj_Unity.getUnity().SendMessage("Main Camera", "U_FlyTo", paPosJson);
}
//飞行到指定对象，及飞行高度
uzft.prototype.flyToObj = function (paName, paDis) {
    var json = '{"paName":"' + paName + '","paDis":"' + paDis + '"}';
    gobj_Unity.getUnity().SendMessage("Main Camera", "U_FlyToObj", json);
}
//点击对象返回名称
uzft.prototype.pick = function (paCallBackMethod) {
    gobj_Unity.getUnity().SendMessage("Main Camera", "U_Pick", paCallBackMethod);
}
//点击对象返回名称
//{"name":"","callback":""}
uzft.prototype.getObjPName = function (paPosJson) {
    gobj_Unity.getUnity().SendMessage("Main Camera", "U_GetObjPname", paPosJson);
}

//高亮对象
uzft.prototype.highObj = function (paString) {
    //var paString = '{"Name":"' + paObjName + '","Color":{"r":"255","g":"230","b":"80","a":"100"}}';
    gobj_Unity.getUnity().SendMessage("Main Camera", "U_HighObj", paString);
}
//取消高亮，可以传空
uzft.prototype.hideLight = function (paObjName) {
    var paString = '{"Name":"' + paObjName + '","Color":{"r":"255","g":"230","b":"80","a":"100"}}';
    gobj_Unity.getUnity().SendMessage("Main Camera", "U_HideLight", paString);
}
//闪烁高亮
uzft.prototype.flashLightObj = function (paString) {
   // var paString = '{"Name":"' + paObjName + '","Color":{"r":"255","g":"230","b":"80","a":"100"}}';
    gobj_Unity.getUnity().SendMessage("Main Camera", "U_FlashClickObject", paString);
}
//闪烁高亮
uzft.prototype.controlObjMesh = function (paObjName, paState) {
    var paString = '{"name":"' + paObjName + '","state":"' + paState + '"}';
    gobj_Unity.getUnity().SendMessage("Main Camera", "U_SetChirdLayerState", paString);
}
//清除
uzft.prototype.clear = function (paObjName) {
    var paString = '{"Name":"' + paObjName + '","Color":{"r":"255","g":"0","b":"0","a":"100"}}';
    gobj_Unity.getUnity().SendMessage("Main Camera", "U_clearAll", "");
}
//添加数据，比如ICON、model、bubblebox
uzft.prototype.userData = {
    model: {
        init: function (paString) {
            //var iconStr = '{"x":"20","y":"0","z":"-20","name":"001","modelname":"","rx":"0","ry":"0","rz":"0","rw":"0","text":"第2个测试:50.3度"}';
            gobj_Unity.getUnity().SendMessage("Main Camera", "U3D_LoadModel", paString);
        }
    },
    bubbleBox: {
        init: function (paString) {
            //{"text":"加载全部","id":"123",""window":{"z":"80.42118","width":"150","height":"150","y":"0","x":"-75.34184"}}
            gobj_Unity.getUnity().SendMessage("Main Camera", "U_DrawBall", paString);
        },
        destroy: function (paId) {
            gobj_Unity.getUnity().SendMessage("Main Camera", "deleteCurrentBall", paId);
        },
        destroyAll: function () {
            gobj_Unity.getUnity().SendMessage("Main Camera", "U_DestoryAllBall", "");
        }
    }
}