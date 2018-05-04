/**
*time:2013-1-17
*creater:liting
*content:u3d交互方法
*/
//加载选择的汽车模型
function loadCarModel(carname){// paCarModel 接受选择的汽车名字
	u.getUnity().SendMessage("Main Camera","U_initCar",carname);
}
//模拟飞行
function playTrack(paTrackMap,paMethod){//paTrackMap 为每一个点的集合[{"x":"","y":"","z":""},{"x":"","y":"","z":""}]
	u.getUnity().SendMessage("Main Camera","U_PalyTrack",paTrackMap);
}
//暂停飞行
function pauseTracking(){
	u.getUnity().SendMessage("Main Camera","U_suspend","");
} 
//继续飞行
function resumeTracking(){
	u.getUnity().SendMessage("Main Camera","U_restart","");
} 
//停止飞行
function stopTracking(){
	u.getUnity().SendMessage("Main Camera","U_Stopcar","");
} 
//改变飞行速度
function changeSpeedTrack(paTrackSpeed){
	u.getUnity().SendMessage("Main Camera","U_ChangeSpeed",paTrackSpeed);
} 

//手动巡视 :第一人称
function  LoadFirstPerson(){
	u.getUnity().SendMessage("Main Camera","U_LoadFirstPerson","");
	
}
//手动巡视  第三人称人物行走
function  LoadThirdPerson(){
	u.getUnity().SendMessage("Main Camera","U_LoadThirdPerson","");	
}
//手动巡视:汽车巡视
function LoadCarView(){
	u.getUnity().SendMessage("Main Camera","U_LoadCar","");
}
//模拟巡视完成
function TrackFinish(paStr){
	u.getUnity().SendMessage("Main Camera","U_TrackFinished",paStr);
}
//模拟巡视完成
function SDObjectExit(paStr){
	u.getUnity().SendMessage("Main Camera","U_ObjectExit","");
}
//模拟巡视高度调节
function changeH(paStr){
	u.getUnity().SendMessage("Main Camera","U_changeHeight",paStr);
} 

function U_FlyToBuilding(){
	u.getUnity().SendMessage("Main Camera","FlyToBuilding","");
}

