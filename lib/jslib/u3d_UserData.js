/**
*time:2013-1-17
*creater:liting
*content:u3d交互方法
*/ 
function U_AddIcon(paString){
	//alert(paName);
	//var paString ='{"x":"'+paX+'","y":"'+paY+'","z":"'+paZ+'","name":"'+paName+'"}';
	u.getUnity().SendMessage("Main Camera","U3D_LoadModel",paString);
}
//传入经纬度，生成地标
function setIcon(paX,paY,paZ,paName,paModelName,paRX,paRY,paRZ,paRW,paText){//碰撞点坐标
	//alert(paName);
	var paString ='{"x":"'+paX+'","y":"'+paY+'","z":"'+paZ+'","name":"'+paName+'","modelname":"'+paModelName+'","rx":"'+paRX+'","ry":"'+paRY+'","rz":"'+paRZ+'","rw":"'+paRW+'","text":"'+paText+'"}';
	//alert(paString);
    u.getUnity().SendMessage("Main Camera","U3D_LoadModel",paString);
}
//
function setIconName(paX,paY,paZ,paName,paModelName,paRX,paRY,paRZ,paRW,paText){//碰撞点坐标
	var paString ='{"x":"'+paX+'","y":"'+paY+'","z":"'+paZ+'","name":"'+paName+'","modelname":"'+paModelName+'","rx":"'+paRX+'","ry":"'+paRY+'","rz":"'+paRZ+'","rw":"'+paRW+'","text":"'+paText+'"}';
	u.getUnity().SendMessage("Main Camera","setIconImage",paString);
}
function Change3DTextByName(paName,paText){
	var paString ='{"name":"'+paName+'","text":"'+paText+'"}'; 
	u.getUnity().SendMessage("Main Camera","U_Change3DTextByName",paString);
}
//在U3D上写入中文字体
function addTextToU3d(paName,paText,paFontSize,paPx,paPy,paPz,paRx,paRy,paRz,paRw,paColor_R,paColor_G,paColor_B,paColor_A){
	if(paColor_R=="" || paColor_R==null){
		paColor_R = "255";
	}
	if(paColor_G=="" || paColor_G==null){
		paColor_G = "255";
	}
	if(paColor_B=="" || paColor_B==null){
		paColor_B = "255";
	}
	if(paColor_A=="" || paColor_A==null){
		paColor_A = "180";
	}			
	var ls_Json='{"Color":{"r":"'+paColor_R+'","g":"'+paColor_G+'","b":"'+paColor_B+'","a":"'+paColor_A+'"},"name":"'+paName+'","text":"'+paText+'","fontsize":"'+paFontSize+'","px":"'+paPx+'","py":"'+paPy+'","pz":"'+paPz+'","rx":"'+paRx+'","ry":"'+paRy+'","rz":"'+paRz+'","rw":"'+paRw+'"}';	
	//alert(ls_Json);
	u.getUnity().SendMessage("Main Camera","U_AddText",ls_Json);
}
//在U3D上写入中文字体2
function createTextToU3d(paString){
	u.getUnity().SendMessage("Main Camera","U3D_LoadModel",paString);
}
//生成规划划区面
function showPolygon(paString){
	u.getUnity().SendMessage("Main Camera","U_PointsToPolygon",paString);//渲染规划面	
}
//生成规划面外框线
function showPolygonLine(paString){
	u.getUnity().SendMessage("Main Camera","U_linerenderer",paString);//渲染规划面外框线
}
//销毁对象
function destoryObj(paName){
	u.getUnity().SendMessage("Main Camera","U_DestoryObj",paName);
}
//还原摄像机操作
function hyCamera(){
	u.getUnity().SendMessage("Main Camera","U_InitCamera","");
} 
//选择对象
function selectObj(paCallback){
	u.getUnity().SendMessage("Main Camera","U_ClickObj",paCallback);
}
//移动对象
function moveObj(paCallback){
	u.getUnity().SendMessage("Main Camera","U_MoveObj",paCallback);
}
//旋转对象
function RotateObj(paCallback){
	u.getUnity().SendMessage("Main Camera","U_RotateObj",paCallback);
}
//退出编辑
function ExitEdit(){
	u.getUnity().SendMessage("Main Camera","U_ExitControl","");
}
function SetwaterGC(paStr){
	u.getUnity().SendMessage("Main Camera","U_SetWaterFzGc",paStr);
}
//闪烁
function flashUserObj(paName,paFlashCount){
	if(paName){
		setLayerState(paName,false);
		//paIconObj.Visibility = false;
		setTimeout(function (){setLayerState(paName,true);},500);
		if(paFlashCount>0){
			setTimeout(function (){flashUserObj(paName,paFlashCount-1);},1000);
		}
	}
}
//设置爆管出水的高度
function SetBaoGuanHeight(paString){
	u.getUnity().SendMessage("Main Camera","U_ChangeVelocity",paString);
}
//开始移动设备
function StartMove(paStr){
	u.getUnity().SendMessage("Main Camera","U_IsMovement",paStr);
}
//获取设备名称
function GetSBName(paStr){
	u.getUnity().SendMessage("Main Camera","U_SetCallbackMethod1",paStr);
}
//加载模型数据
function PrefabLoad(pajson){
   u.getUnity().SendMessage("Main Camera","LoadAsset",pajson);
}
//传入坐标，生成巡更线
function getXGLX(pajson){//碰撞点坐标
	u.getUnity().SendMessage("Main Camera","AddGPSIcon",pajson);
}
//传入名字完成管线闪烁
function shanshuoP(paStr){
	u.getUnity().SendMessage("Main Camera","U_FindTags",paStr);
}
//关闭闪烁
function closeP(){
	u.getUnity().SendMessage("Main Camera","U_closeA","");
}