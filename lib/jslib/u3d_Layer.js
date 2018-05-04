/**
*time:2013-1-17
*creater:liting
*content:u3d交互方法
*/ 
function getLayersByTagName(paTagName,paCallBack){
	var paString ='{"tagname":"'+paTagName+'","callback":"'+paCallBack+'"}';
	u.getUnity().SendMessage("Main Camera","U_GetLayersByTagName",paString);
}
//传入Name和状态控制图层
function setLayerState_simple(paName,paState){
	var paString ='{"name":"'+paName+'","state":"'+paState+'"}';
	u.getUnity().SendMessage("Main Camera","U_SetLayerState",paString);
}
function cLayersByTagName(paName,paState){
    var paString ='{"name":"'+paName+'","stat":"'+paState+'"}';
    //alert(paString);
    u.getUnity().SendMessage("Main Camera","U_CLayersByTagName",paString);
}
//传入Name和状态控制图层 可以控制到其子图层
function setLayerState(paName,paState){
	var paString ='{"name":"'+paName+'","state":"'+paState+'"}';
	u.getUnity().SendMessage("Main Camera","U_SetChirdLayerState",paString);
}
//传入名称和回调函数得到图层状态
function getLayerState(paName,paCallBack){
	var paString ='{"name":"'+paName+'","callback":"'+paCallBack+'"}';
	u.getUnity().SendMessage("Main Camera","U_GetLayerState",paString);
}
//传入所有图层名称获得其图层状态
function getAllLayerState(paName){
	u.getUnity().SendMessage("Main Camera","U_GetAllLayerState",paName);
}
//传入所有控制到的图层NAME和状态
function setAllLayerState(paNameState){
	u.getUnity().SendMessage("Main Camera","U_SetLayerAllState",paNameState);
}

