/**
*time:2013-1-17
*creater:liting
*content:u3d��������
*/
//����ѡ�������ģ��
function loadCarModel(carname){// paCarModel ����ѡ�����������
	u.getUnity().SendMessage("Main Camera","U_initCar",carname);
}
//ģ�����
function playTrack(paTrackMap,paMethod){//paTrackMap Ϊÿһ����ļ���[{"x":"","y":"","z":""},{"x":"","y":"","z":""}]
	u.getUnity().SendMessage("Main Camera","U_PalyTrack",paTrackMap);
}
//��ͣ����
function pauseTracking(){
	u.getUnity().SendMessage("Main Camera","U_suspend","");
} 
//��������
function resumeTracking(){
	u.getUnity().SendMessage("Main Camera","U_restart","");
} 
//ֹͣ����
function stopTracking(){
	u.getUnity().SendMessage("Main Camera","U_Stopcar","");
} 
//�ı�����ٶ�
function changeSpeedTrack(paTrackSpeed){
	u.getUnity().SendMessage("Main Camera","U_ChangeSpeed",paTrackSpeed);
} 

//�ֶ�Ѳ�� :��һ�˳�
function  LoadFirstPerson(){
	u.getUnity().SendMessage("Main Camera","U_LoadFirstPerson","");
	
}
//�ֶ�Ѳ��  �����˳���������
function  LoadThirdPerson(){
	u.getUnity().SendMessage("Main Camera","U_LoadThirdPerson","");	
}
//�ֶ�Ѳ��:����Ѳ��
function LoadCarView(){
	u.getUnity().SendMessage("Main Camera","U_LoadCar","");
}
//ģ��Ѳ�����
function TrackFinish(paStr){
	u.getUnity().SendMessage("Main Camera","U_TrackFinished",paStr);
}
//ģ��Ѳ�����
function SDObjectExit(paStr){
	u.getUnity().SendMessage("Main Camera","U_ObjectExit","");
}
//ģ��Ѳ�Ӹ߶ȵ���
function changeH(paStr){
	u.getUnity().SendMessage("Main Camera","U_changeHeight",paStr);
} 

function U_FlyToBuilding(){
	u.getUnity().SendMessage("Main Camera","FlyToBuilding","");
}

