/**
*time:2013-1-17
*creater:liting
*content:u3d交互方法
*/ 
//对象点击事件
function pick(paCallBackMethod){
	u.getUnity().SendMessage("Main Camera","U_Pick",paCallBackMethod); 
}
//传入x y 和回调函数名称取到所在位置的对象paJsonString: 属性名称(x ,y, callback)  
function doSearchObj(paX,paY,paCallBack){
	var paString ='{"x":"'+paX+'","y":"'+paY+'","z":"0","callback":"'+paCallBack+'"}'; 
	u.getUnity().SendMessage("Main Camera","U_DoSearchModel",paString); 
}
//高亮方法
function highObjLight(paObjName){
	var paString = '{"Name":"'+paObjName+'","Color":{"r":"255","g":"0","b":"0","a":"100"}}';
	u.getUnity().SendMessage("Main Camera","U_HighObj",paString); 	
}
//取消高亮
function hideHightLight(paObjName){
	var paString = '{"Name":"'+paObjName+'","Color":{"r":"255","g":"0","b":"0","a":"100"}}';
	u.getUnity().SendMessage("Main Camera","U_HideLight",paString);
}

//高亮闪烁的方法
function FlashingCurrentObject(paObjName){
	var paString = '{"Name":"'+paObjName+'","Color":{"r":"255","g":"0","b":"0","a":"100"}}';
	u.getUnity().SendMessage("Main Camera","U_FlashClickObject",paString);
}
