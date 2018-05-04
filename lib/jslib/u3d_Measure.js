/**
*time:2013-1-17
*creater:liting
*content:u3d交互方法
*/ 
//空间量距方法
function lineSpace(paCallBack){
	u.getUnity().SendMessage("Main Camera","U_lineSpace",paCallBack);	
}
//垂直量距方法
function lineVer(paCallBack){
	u.getUnity().SendMessage("Main Camera","U_lineVer",paCallBack);
}
//水平量距方法
function lineHor(paCallBack){
	u.getUnity().SendMessage("Main Camera","U_lineHor",paCallBack);
}
//面积测量方法
function areaHor(paCallBack){
	var paCallBackAndColor = '{"paCallBack":"'+paCallBack+'","Color":{"r":"255","g":"0","b":"0","a":"180"}}';
	u.getUnity().SendMessage("Main Camera","U_areaHor",paCallBackAndColor);
}

//清除显示面积TextToU3d对象方法
function clear3DTextObj(paName){ 
	u.getUnity().SendMessage("Main Camera","U_clear3DTextObj",paName);
}

//清除方法
function clearAll(){ 
	u.getUnity().SendMessage("Main Camera","U_clearAll","");
}
//GL 水平量距
function GH_horizontal(){
	u.getUnity().SendMessage("Main Camera","GL_horizontal","");
}

//GL 垂直量距
function GH_verticle(){
	u.getUnity().SendMessage("Main Camera","GL_verticle","");
}

//GL 空间量距
function GH_space(){
	u.getUnity().SendMessage("Main Camera","GL_space","");
}
//GL 面积量算
function GH_area(){
	u.getUnity().SendMessage("Main Camera","GL_area","");
}
//GL 清除量测结果
function GH_clearSum(){
	u.getUnity().SendMessage("Main Camera","GL_clear","");
}