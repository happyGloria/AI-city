/**
*time:2013-1-17
*creater:liting
*content:u3d交互方法
*/
//日志记录
function Logger(paString){
 
} 
//得到当前视角的值
function getPos(paCallback){
	u.getUnity().SendMessage("Main Camera","U_GetView",paCallback);
}
//飞行到
function FlyToPoint(paPX,paPY,paPZ,paRX,paRY,paRZ,paRW,paDis){
	var json = '{"px":"'+paPX+'","py":"'+paPY+'","pz":"'+paPZ+'","rx":"'+paRX+'","ry":"'+paRY+'","rz":"'+paRZ+'","rw":"'+paRW+'","dis":"'+paDis+'"}';
	//var json = '{"px":"233.2309","py":"16","pz":"270.0734","rx":"-0.3816651","ry":"0.1756544","rz":"-0.04879199","rw":"-0.9061438","dis":"121.2363"}';
	u.getUnity().SendMessage("Main Camera","U_FlyTo",json); 	
}

//飞行到Obj
function FlyToObj(paName,paDis){
	var json = '{"paName":"'+paName+'","paDis":"'+paDis+'"}';
	u.getUnity().SendMessage("Main Camera","U_FlyToObj",json); 	
} 
//画点
function drawPoint(paCallBack){
	u.getUnity().SendMessage("Main Camera","U_DrawPoint",paCallBack); 	
}
//画线
function drawLine(paCallBack){
	u.getUnity().SendMessage("Main Camera","U_DrawLine",paCallBack);
}
//新画线
function drawLinenew(paCallBack){
	u.getUnity().SendMessage("Main Camera","U_DrawLinenew",paCallBack);
}
//删除新的画线
function clear_line(){
	u.getUnity().SendMessage("Main Camera","clear_Line","");
}
//画面
function drawPolygon(paCallBack){
	u.getUnity().SendMessage("Main Camera","U_DrawPolygon",paCallBack);
}
//画圆
function drawCircle(){

}
//扇面
function drawSector(){

}
//通过X,Y坐标获取该点的碰撞坐标X,Y
function getHitPos(paX,paY,paCallBack){
	var json = '{"x":"'+paX+'","y":"'+paY+'","callback":"'+paCallBack+'"}';
	u.getUnity().SendMessage("Main Camera","U_GetClickPos",json);
} 
//地下浏览 ,设置辅助高层		//15以下
function setFzPoy(paString){
	u.getUnity().SendMessage("Main Camera","U_SetFzPoy",paString);
}
//清除规划面
function clearGHM(){
	u.getUnity().SendMessage("Main Camera","U_clearArea","");
}

//显示地面透明度滚动条
function showBlockScroll(paShow){ 
	u.getUnity().SendMessage("Main Camera","U_showHorizontalSlider",paShow);
}
//修改地面透明度的值
function controlBlockTMD(paColornum){ 
	u.getUnity().SendMessage("Main Camera","SetAlahValue",paColornum);
}
//添加爆管
function addBaoG(paX,paY,paZ,paHeight,paName,paId,paCallBack){ 
	var json = '{"x":"'+paX+'","y":"'+paY+'","z":"'+paZ+'","name":"'+paName+'","id":"'+paId+'","height":"'+paHeight+'","callback":"'+paCallBack+'"}';
	//alert(json);
	u.getUnity().SendMessage("Main Camera","U3D_LoadBaoguan",json);
}
//水淹分析
function ShowWaterSlider(paShow){
	u.getUnity().SendMessage("Main Camera","showWaterSlider",paShow);
}
//两点通视
function SetStartHeight(paStartHeight){    //设定起点的高程     
	u.getUnity().SendMessage("Main Camera","U_SetStartHeight",paStartHeight);
}
function SetEndHeight(paEndHeight){    //设定终点的高程      
	u.getUnity().SendMessage("Main Camera","U_SetEndHeight",paEndHeight);
}
function VisibleAnas(){    //开始通视分析
	u.getUnity().SendMessage("Main Camera","U_VisibAnas","");
}
function DeleteResult(){   //删除结果  
    u.getUnity().SendMessage("Main Camera","U_DeleteResult","");
} 
//生成巡更线 
function CreateOfXGLine(paString){   
    u.getUnity().SendMessage("Main Camera","createLine",paString);
} 
//添加是否吸附功能
function isAbsorb(pastate){   
    u.getUnity().SendMessage("Main Camera","U_IsAdsorb",pastate);
}
//设置设备字体样式
function setFontS(paString){   
    u.getUnity().SendMessage("Main Camera","setSBFontStyle",paString);
}
//设置水池效果控制
function SetWaterEffectControll(){   
    u.getUnity().SendMessage("Main Camera","AddControllerToWater","");
}


